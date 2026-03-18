(function () {
  const data = window.COC_CONTENT;
  if (!data) return;

  const surveyQuestions = [
    { id: "helpful_confidence", label: "Did this site help you and increase your confidence in prescribing COCs?" },
    { id: "knowledge", label: "Did this site increase your birth control knowledge?" },
    { id: "reuse", label: "How likely are you to use this site again?" },
    { id: "recommend", label: "How likely are you to recommend this site to a colleague?" }
  ];

  let surveyState = { status: "idle", answers: null };

  const $ = (sel) => document.querySelector(sel);
  const create = (tag, text) => {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    return el;
  };

  function token(value) {
    return (value || "").split(/\s-\s/)[0].trim();
  }

  function optionValue(option) {
    if (typeof option === "string") return option;
    return option.value || option.key || option.label;
  }

  function optionLabel(option) {
    if (typeof option === "string") return token(option);
    return option.label || optionValue(option);
  }

  function optionFill(select, values) {
    if (!select) return;
    values.forEach((value) => {
      const opt = document.createElement("option");
      opt.value = optionValue(value);
      opt.textContent = optionLabel(value);
      select.appendChild(opt);
    });
  }

  function normalizeEeBucket(value) {
    const raw = (value || "").trim();
    if (raw.startsWith("10")) return "10 mcg";
    if (raw.startsWith("20")) return "20 mcg";
    if (raw.startsWith("30") || raw.startsWith("35")) return "30-35 mcg";
    return raw;
  }

  function normalizeProgestinCategory(value) {
    const key = (value || "").trim().toLowerCase();
    if (key === "norethindrone") return "norethindrone";
    if (key === "levonorgestrel") return "levonorgestrel";
    if (key === "desogestrel" || key === "norgestimate") return "third-gen";
    if (key === "drospirenone") return "drospirenone";
    return key;
  }

  function normalizeCycleCategoryKeys(value) {
    if (value === "21/7") return ["21-7"];
    if (value === "24/4") return ["24-4"];
    if (value === "Extended cycling") return ["extended"];
    if (value === "Continuous cycling") return ["continuous"];
    return [];
  }

  function matchesNamePrefix(medication, prefix) {
    return (medication.name || "").startsWith(prefix);
  }

  function normalizeContinuousEligibility(medication) {
    if (matchesNamePrefix(medication, "Lo Loestrin Fe")) return false;
    if (matchesNamePrefix(medication, "Azurette 28;")) return false;
    if (matchesNamePrefix(medication, "Ortho Tri-Cyclen;")) return false;
    if (matchesNamePrefix(medication, "LoSeasonique;")) return false;
    if (matchesNamePrefix(medication, "Seasonique;")) return false;
    if (medication.cycle === "Continuous cycling") return true;
    if (medication.cycle === "Extended cycling") return matchesNamePrefix(medication, "Introvale;");
    return medication.cycle === "21/7" || medication.cycle === "24/4";
  }

  function normalizeHasGenericOption(medication) {
    return /generic/i.test(`${medication.name || ""} ${medication.note || ""}`);
  }

  function normalizeMedication(medication) {
    return {
      ...medication,
      eeBucket: normalizeEeBucket(medication.ee),
      progestinCategory: normalizeProgestinCategory(medication.progestin),
      cycleCategoryKeys: normalizeCycleCategoryKeys(medication.cycle),
      continuousEligible: normalizeContinuousEligibility(medication),
      hasGenericOption: normalizeHasGenericOption(medication)
    };
  }

  function formatEeDisplay(value) {
    if (!value) return "";
    return /mcg/i.test(value) ? value : `${value} mcg`;
  }

  const medications = (data.medications || []).map(normalizeMedication);

  function matchesEeSelection(medication, selectedEe) {
    const eeToken = token(selectedEe);
    return !eeToken || eeToken === "any" || medication.eeBucket === eeToken;
  }

  function matchesProgestinSelection(medication, selectedProgestin) {
    return !selectedProgestin || selectedProgestin === "any" || medication.progestinCategory === selectedProgestin;
  }

  function matchesCycleSelection(medication, selectedCycle) {
    if (!selectedCycle || selectedCycle === "any") return true;
    const categories = medication.cycleCategoryKeys || [];
    if (selectedCycle === "continuous") return !!medication.continuousEligible;
    if (selectedCycle === "extended") return categories.includes("extended") || !!medication.continuousEligible;
    return categories.includes(selectedCycle);
  }

  function filterMedications(filters) {
    return medications.filter((medication) => (
      matchesEeSelection(medication, filters.ee)
      && matchesProgestinSelection(medication, filters.pro)
      && matchesCycleSelection(medication, filters.cycle)
    ));
  }

  function renderBullets(items) {
    const ul = create("ul");
    (items || []).forEach((item) => ul.appendChild(create("li", item)));
    return ul;
  }

  function renderAlternativesList() {
    const ul = create("ul");
    data.contraindications.alternatives.forEach((item) => ul.appendChild(create("li", item)));
    return ul;
  }

  function renderSdmSection(container) {
    if (!container) return;
    container.innerHTML = "";

    container.appendChild(create("p", data.sdm.audienceLabel));

    const whySection = create("div");
    whySection.className = "wizard-detail-block";
    whySection.appendChild(create("h4", data.sdm.whyThisMattersHeading));
    whySection.appendChild(create("p", data.sdm.whyThisMattersIntro));
    if (data.sdm.whyThisMatters?.length) {
      whySection.appendChild(renderBullets(data.sdm.whyThisMatters));
    }
    data.sdm.whyThisMattersParagraphs.forEach((paragraph) => whySection.appendChild(create("p", paragraph)));
    container.appendChild(whySection);

    const approachSection = create("div");
    approachSection.className = "wizard-detail-block";
    approachSection.appendChild(create("h4", data.sdm.approachHeading));
    approachSection.appendChild(create("p", data.sdm.approachIntro));
    if (data.sdm.approachBullets?.length) {
      approachSection.appendChild(renderBullets(data.sdm.approachBullets));
    }
    approachSection.appendChild(create("p", data.sdm.roleStatement));
    approachSection.appendChild(create("p", data.sdm.roleIntro));
    if (data.sdm.roleBullets?.length) {
      approachSection.appendChild(renderBullets(data.sdm.roleBullets));
    }
    if (data.sdm.roleClosing) {
      approachSection.appendChild(create("p", data.sdm.roleClosing));
    }
    container.appendChild(approachSection);
  }

  function renderStep4Survey(container) {
    if (!container) return;
    container.innerHTML = "";

    const section = create("section");
    section.className = "survey-block";
    section.appendChild(create("h4", data.wizard?.surveyHeading || "Resident comfort survey"));

    if (surveyState.status === "submitted") {
      const note = create("p", "Responses recorded locally for this session. Thank you.");
      note.className = "survey-thanks";
      section.appendChild(note);
      container.appendChild(section);
      return;
    }

    if (surveyState.status === "skipped") {
      const note = create("p", "Survey hidden for this session. Prescribing guidance remains available above.");
      note.className = "survey-thanks";
      section.appendChild(note);
      container.appendChild(section);
      return;
    }

    const intro = create("p", "Four quick questions. 1 = low, 5 = high.");
    intro.className = "survey-intro";
    section.appendChild(intro);

    const form = create("form");
    form.className = "survey-form";
    form.noValidate = true;

    surveyQuestions.forEach((question) => {
      const fieldset = create("fieldset");
      fieldset.className = "survey-question";

      const legend = create("legend", question.label);
      fieldset.appendChild(legend);

      const scale = create("div");
      scale.className = "survey-scale";

      ["1", "2", "3", "4", "5"].forEach((value) => {
        const choice = create("label");
        choice.className = "survey-choice";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = question.id;
        input.value = value;
        choice.appendChild(input);
        choice.appendChild(create("span", value));
        scale.appendChild(choice);
      });

      fieldset.appendChild(scale);
      form.appendChild(fieldset);
    });

    const error = create("p", "Please answer all 4 questions.");
    error.className = "survey-error hidden";
    form.appendChild(error);

    const actions = create("div");
    actions.className = "row";

    const submit = create("button", "Submit survey");
    submit.type = "submit";
    submit.className = "btn btn-primary";
    actions.appendChild(submit);

    const skip = create("button", "Hide survey");
    skip.type = "button";
    skip.className = "btn";
    skip.addEventListener("click", () => {
      surveyState = { status: "skipped", answers: null };
      renderStep4Survey(container);
    });
    actions.appendChild(skip);

    form.appendChild(actions);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const answers = {};
      let complete = true;

      surveyQuestions.forEach((question) => {
        const selected = form.querySelector(`input[name="${question.id}"]:checked`);
        if (!selected) {
          complete = false;
          return;
        }
        answers[question.id] = selected.value;
      });

      error.classList.toggle("hidden", complete);
      if (!complete) return;

      surveyState = { status: "submitted", answers };
      renderStep4Survey(container);
    });

    section.appendChild(form);
    container.appendChild(section);
  }

  function renderBulletSection(container, heading, items) {
    const section = create("section");
    section.className = "wizard-detail-block";
    section.appendChild(create("h4", heading));
    section.appendChild(renderBullets(items));
    container.appendChild(section);
  }

  function renderResultCard(medication, reasons, scoreLabel) {
    const article = create("article");
    article.className = "wizard-result-card";

    const header = create("div");
    header.className = "wizard-result-header";

    const titleWrap = create("div");
    titleWrap.appendChild(create("h4", medication.name));
    const meta = create("p", `Estrogen: ${formatEeDisplay(medication.ee)} | Progestin: ${medication.progestin} | Cycle: ${medication.cycle}`);
    meta.className = "wizard-result-meta";
    titleWrap.appendChild(meta);
    header.appendChild(titleWrap);

    if (scoreLabel) {
      const badge = create("span", scoreLabel);
      badge.className = "wizard-score-badge";
      header.appendChild(badge);
    }

    article.appendChild(header);

    const reasonList = create("ul");
    reasonList.className = "wizard-result-reasons";
    reasons.forEach((reason) => reasonList.appendChild(create("li", reason)));
    article.appendChild(reasonList);

    if (medication.note) {
      const note = create("p", medication.note);
      note.className = "wizard-result-note";
      article.appendChild(note);
    }

    if (medication.progestinCategory === "drospirenone") {
      const caution = create("p", data.progestin.drospirenoneNote);
      caution.className = "wizard-inline-note";
      article.appendChild(caution);
    }

    return article;
  }

  function initShared() {
    const step1Sdm = document.querySelector('.wizard-step[data-step="1"] #wiz-sdm-content');
    renderSdmSection(step1Sdm);

    const cat4 = $("#cat4-list");
    if (cat4) {
      cat4.innerHTML = "";
      data.contraindications.category4.forEach((item) => cat4.appendChild(create("li", item)));
    }

    const cat3 = $("#cat3-list");
    if (cat3) {
      cat3.innerHTML = "";
      data.contraindications.category3.forEach((item) => cat3.appendChild(create("li", item)));
    }

    const c3 = $("#cat3-counsel");
    if (c3) {
      c3.innerHTML = "";
      data.contraindications.cat3Counseling.forEach((item) => c3.appendChild(create("p", item)));
    }
  }

  function initWizard() {
    if (document.body.dataset.page !== "wizard") return;

    const surveyContainer = $("#wizard-survey");
    const safetyFeedback = $("#wizard-safety-feedback");
    const resultsContainer = $("#wizard-results");
    const safetyNext = $("#wizard-safety-next");
    const goalErrors = $("#wizard-goal-errors");
    const stepperButtons = Array.from(document.querySelectorAll(".wizard-stepper-item"));
    const wizardPanels = Array.from(document.querySelectorAll(".wizard-step"));
    const resetButton = $("#wizard-reset");

    const wizardState = {
      currentStep: 1,
      unlockedSteps: new Set([1]),
      selections: {
        cat4: "No",
        cat3: "No",
        ee: "any",
        pro: "any",
        cycle: "any"
      }
    };

    const eeOptions = data.estrogen.options;
    const progestinOptions = data.progestin.categories;
    const cycleOptions = data.cyclePatterns.categories;
    const choiceGroups = new Map();
    const goalMountFailures = [];

    function mountBulletGuide(container, items, paragraphs) {
      if (!container) return;
      container.innerHTML = "";
      if (items?.length) container.appendChild(renderBullets(items));
      (paragraphs || []).forEach((paragraph) => container.appendChild(create("p", paragraph)));
    }

    mountBulletGuide($("#wiz-step-cat4-guide"), data.contraindications.category4);
    mountBulletGuide($("#wiz-step-cat3-guide"), data.contraindications.category3, data.contraindications.cat3Counseling);
    mountBulletGuide(
      $("#wiz-ee-guide"),
      eeOptions.map((option) => `${option.label}: ${option.helpText}. ${option.detail}`),
      data.estrogen.pearls
    );
    mountBulletGuide(
      $("#wiz-progestin-guide"),
      progestinOptions.map((option) => `${option.label}: ${option.helpText}.`),
      data.progestin.guideNotes
    );
    mountBulletGuide(
      $("#wiz-cycle-guide"),
      data.cyclePatterns.guideBullets,
      data.cyclePatterns.guideNotes
    );

    function registerGoalMountFailure(label) {
      goalMountFailures.push(label);
    }

    function createChoiceGroup(container, config) {
      if (!container) {
        if (config.isGoalGroup) registerGoalMountFailure(config.label);
        return;
      }

      container.innerHTML = "";
      const buttons = new Map();
      const showDescriptions = config.showDescriptions !== false;

      config.options.forEach((option) => {
        const value = optionValue(option);
        const button = create("button");
        button.type = "button";
        button.className = "wizard-choice";
        if (!showDescriptions) button.classList.add("wizard-choice-simple");
        button.dataset.stateKey = config.stateKey;
        button.dataset.value = value;
        button.setAttribute("aria-pressed", String(wizardState.selections[config.stateKey] === value));

        const title = create("span", optionLabel(option));
        title.className = "wizard-choice-title";
        button.appendChild(title);

        if (showDescriptions && option.helpText) {
          const help = create("span", option.helpText);
          help.className = "wizard-choice-help";
          button.appendChild(help);
        }

        if (showDescriptions && option.detail) {
          const detail = create("span", option.detail);
          detail.className = "wizard-choice-detail";
          button.appendChild(detail);
        }

        button.addEventListener("click", () => {
          wizardState.selections[config.stateKey] = value;
          updateChoiceGroupState(config.stateKey);
          refreshDerivedState();
        });

        buttons.set(value, button);
        container.appendChild(button);
      });

      choiceGroups.set(config.stateKey, { buttons, stateKey: config.stateKey });
      updateChoiceGroupState(config.stateKey);
    }

    function updateChoiceGroupState(stateKey) {
      const group = choiceGroups.get(stateKey);
      if (!group) return;

      group.buttons.forEach((button, value) => {
        const isSelected = wizardState.selections[stateKey] === value;
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
      });
    }

    function renderGoalMountFailures() {
      if (!goalErrors) return;
      goalErrors.innerHTML = "";

      if (!goalMountFailures.length) {
        goalErrors.classList.add("hidden");
        return;
      }

      goalErrors.classList.remove("hidden");
      const issue = renderStatusCard(
        "neutral",
        "Some formulation choices did not load.",
        "Refresh the page before relying on this step. The missing sections are listed below."
      );
      issue.appendChild(renderBullets(goalMountFailures));
      goalErrors.appendChild(issue);
    }

    [
      {
        container: $("#wiz-cat4-choices"),
        stateKey: "cat4",
        label: "Category 4 hard stop",
        showDescriptions: false,
        options: [
          { value: "No", label: "No", helpText: "Proceed with the rest of the screen." },
          { value: "Yes", label: "Yes", helpText: "Stop COC prescribing and review alternatives." }
        ]
      },
      {
        container: $("#wiz-cat3-choices"),
        stateKey: "cat3",
        label: "Category 3 caution",
        showDescriptions: false,
        options: [
          { value: "No", label: "No", helpText: "Usual COC selection flow can continue." },
          { value: "Yes", label: "Yes", helpText: "Continue cautiously and counsel about alternatives." }
        ]
      },
      {
        container: $("#wiz-ee-choices"),
        stateKey: "ee",
        label: "Ethinyl estradiol dose",
        isGoalGroup: true,
        showDescriptions: false,
        options: [
          { value: "any", label: "Keep broad", helpText: "Only narrow if dose matters." },
          ...eeOptions
        ]
      },
      {
        container: $("#wiz-progestin-choices"),
        stateKey: "pro",
        label: "Progestin goal",
        isGoalGroup: true,
        showDescriptions: false,
        options: [
          { value: "any", label: "Keep broad", helpText: "Use any practical progestin." },
          ...progestinOptions
        ]
      },
      {
        container: $("#wiz-cycle-choices"),
        stateKey: "cycle",
        label: "Cycle pattern",
        isGoalGroup: true,
        showDescriptions: false,
        options: [
          { value: "any", label: "Keep broad", helpText: "Allow any cycle pattern." },
          ...cycleOptions
        ]
      }
    ].forEach((groupConfig) => createChoiceGroup(groupConfig.container, groupConfig));
    renderGoalMountFailures();

    function getProgestinOption(value) {
      return progestinOptions.find((option) => option.key === value);
    }

    function getCycleOption(value) {
      return cycleOptions.find((option) => option.key === value);
    }

    function getEeOption(value) {
      return eeOptions.find((option) => option.key === value);
    }

    function buildSelectionSummary() {
      const summary = [];
      const ee = wizardState.selections.ee;
      const pro = wizardState.selections.pro;
      const cycle = wizardState.selections.cycle;

      if (ee !== "any") summary.push(`EE: ${optionLabel(getEeOption(ee))}`);
      if (pro !== "any") summary.push(`Progestin: ${optionLabel(getProgestinOption(pro))}`);
      if (cycle !== "any") summary.push(`Cycle: ${optionLabel(getCycleOption(cycle))}`);

      if (!summary.length) {
        summary.push("Broad search: any EE dose, any progestin, any cycle.");
      }

      return summary;
    }

    function getCurrentHeading() {
      return document.querySelector(`.wizard-step[data-step="${wizardState.currentStep}"] h3`);
    }

    function buildMatchReasons(medication) {
      const reasons = [];
      const { ee, pro, cycle } = wizardState.selections;

      if (ee !== "any") {
        reasons.push(`Matches the selected EE goal (${ee}).`);
      }

      if (pro !== "any") {
        const selectedPro = getProgestinOption(pro);
        reasons.push(`Matches the selected progestin goal (${selectedPro?.label || pro}).`);
      }

      if (cycle !== "any") {
        if (cycle === "continuous") {
          reasons.push("Can be used continuously by skipping placebo pills.");
        } else {
          const selectedCycle = getCycleOption(cycle);
          reasons.push(`Supports the selected cycle pattern (${selectedCycle?.label || cycle}).`);
        }
      }

      if (!reasons.length && medication.hasGenericOption) {
        reasons.push("Includes common generic options for practical prescribing.");
      }

      if (reasons.length < 2 && medication.continuousEligible) {
        reasons.push("Monophasic continuous use is practical if the patient later wants fewer scheduled bleeds.");
      }

      if (reasons.length < 2) {
        reasons.push("Stays within the current safety screen while keeping options practical.");
      }

      return reasons.slice(0, 3);
    }

    function getMatchScore(medication) {
      let score = 0;
      const { ee, pro, cycle } = wizardState.selections;

      if (ee !== "any" && matchesEeSelection(medication, ee)) score += 1;
      if (pro !== "any" && matchesProgestinSelection(medication, pro)) score += 1;
      if (cycle !== "any" && matchesCycleSelection(medication, cycle)) score += 1;
      if (medication.hasGenericOption) score += 0.25;
      if (medication.continuousEligible) score += 0.1;

      return score;
    }

    function getScoreLabel(score) {
      if (score >= 3) return "Strong match";
      if (score >= 2) return "Focused match";
      if (score >= 1) return "Goal-aligned";
      return "Broad fit";
    }

    function getRankedMedications() {
      return filterMedications(wizardState.selections)
        .map((medication, index) => ({
          medication,
          score: getMatchScore(medication),
          index
        }))
        .sort((left, right) => {
          if (right.score !== left.score) return right.score - left.score;
          return left.index - right.index;
        });
    }

    function renderStatusCard(tone, heading, body) {
      const card = create("section");
      card.className = `wizard-status ${tone}`;
      card.appendChild(create("h4", heading));
      card.appendChild(create("p", body));
      return card;
    }

    function updateSafetyFeedback() {
      safetyFeedback.innerHTML = "";

      if (wizardState.selections.cat4 !== "Yes" && wizardState.selections.cat3 === "Yes") {
        const caution = renderStatusCard("warning", data.wizard.cautionHeading, data.wizard.cautionBody);
        data.contraindications.cat3Counseling.forEach((item) => caution.appendChild(create("p", item)));
        safetyFeedback.appendChild(caution);
      }

      safetyNext.textContent = "Continue to formulation goals";
    }

    function renderSelectionPills(container) {
      if (!container) return;
      container.innerHTML = "";
      buildSelectionSummary().forEach((item) => {
        const pill = create("span", item);
        pill.className = "wizard-selection-pill";
        container.appendChild(pill);
      });
    }

    function renderRecommendationCards(container, limit) {
      if (!container) return;
      container.innerHTML = "";

      if (wizardState.selections.cat4 === "Yes") {
        const stop = renderStatusCard("danger", data.wizard.hardStopHeading, data.wizard.hardStopBody);
        container.appendChild(stop);
        renderBulletSection(container, data.wizard.alternativesHeading, data.contraindications.alternatives);
        return;
      }

      const ranked = getRankedMedications();

      if (!ranked.length) {
        container.appendChild(renderStatusCard("neutral", "No current matches", data.wizard.recommendationEmpty));
        return;
      }

      ranked.slice(0, limit || ranked.length).forEach(({ medication, score }) => {
        container.appendChild(renderResultCard(medication, buildMatchReasons(medication), getScoreLabel(score)));
      });
    }

    function renderResults() {
      resultsContainer.innerHTML = "";

      if (wizardState.selections.cat4 === "Yes") {
        renderRecommendationCards(resultsContainer);
        return;
      }

      if (wizardState.selections.cat3 === "Yes") {
        const caution = renderStatusCard("warning", data.wizard.cautionHeading, data.wizard.cautionBody);
        resultsContainer.appendChild(caution);
      }

      const summary = create("div");
      summary.className = "wizard-selection-summary";
      renderSelectionPills(summary);
      resultsContainer.appendChild(summary);

      const grid = create("div");
      grid.className = "wizard-result-grid";
      resultsContainer.appendChild(grid);
      renderRecommendationCards(grid);

      renderBulletSection(resultsContainer, "How to order in Epic systems", data.recommendationOutput?.epicOrderingPlaceholder);
    }

    function canAccessStep(step) {
      const numericStep = Number(step);
      if (numericStep === 1) return true;
      if (numericStep === 2) return wizardState.unlockedSteps.has(2);
      if (numericStep === 3) return wizardState.unlockedSteps.has(3) && wizardState.selections.cat4 !== "Yes";
      if (numericStep === 4) return wizardState.unlockedSteps.has(4);
      return false;
    }

    function syncPanels() {
      wizardPanels.forEach((panel) => {
        panel.classList.toggle("hidden", Number(panel.dataset.step) !== wizardState.currentStep);
      });
    }

    function updateStepper() {
      stepperButtons.forEach((button) => {
        const step = Number(button.dataset.stepTarget);
        const isCurrent = step === wizardState.currentStep;
        const isUnlocked = canAccessStep(step);
        const isCompleted = isUnlocked && step < wizardState.currentStep;
        const isSkipped = step === 3 && wizardState.selections.cat4 === "Yes" && wizardState.unlockedSteps.has(4);

        button.classList.toggle("is-active", isCurrent);
        button.classList.toggle("is-completed", isCompleted);
        button.classList.toggle("is-skipped", isSkipped);
        button.disabled = !isUnlocked && !isCurrent;
        button.setAttribute("aria-current", isCurrent ? "step" : "false");
      });
    }

    function syncCurrentStep(options) {
      syncPanels();
      updateStepper();
      if (wizardState.currentStep === 4) {
        renderResults();
        renderStep4Survey(surveyContainer);
      }
      if (options?.focusHeading !== false) {
        getCurrentHeading()?.focus();
      }
    }

    function goToStep(step, options) {
      if (!canAccessStep(step)) return;
      wizardState.currentStep = Number(step);
      syncCurrentStep(options);
    }

    function refreshDerivedState() {
      updateChoiceGroupState("cat4");
      updateChoiceGroupState("cat3");
      updateChoiceGroupState("ee");
      updateChoiceGroupState("pro");
      updateChoiceGroupState("cycle");
      updateSafetyFeedback();
      if (wizardState.currentStep === 4) {
        renderResults();
      }

      if (wizardState.selections.cat4 === "Yes" && wizardState.currentStep === 3) {
        wizardState.unlockedSteps.add(4);
        goToStep(4);
        return;
      }

      updateStepper();
    }

    function advanceFrom(currentStep) {
      if (currentStep === 1) {
        wizardState.unlockedSteps.add(2);
        goToStep(2);
        return;
      }

      if (currentStep === 2) {
        if (wizardState.selections.cat4 === "Yes") {
          wizardState.unlockedSteps.add(4);
          goToStep(4);
          return;
        }
        wizardState.unlockedSteps.add(3);
        goToStep(3);
        return;
      }

      if (currentStep === 3) {
        wizardState.unlockedSteps.add(4);
        goToStep(4);
      }
    }

    function retreatFrom(currentStep) {
      if (currentStep === 2) {
        goToStep(1);
        return;
      }

      if (currentStep === 3) {
        goToStep(2);
        return;
      }

      if (currentStep === 4) {
        goToStep(wizardState.selections.cat4 === "Yes" ? 2 : 3);
      }
    }

    document.querySelectorAll("[data-next]").forEach((button) => {
      button.addEventListener("click", () => {
        const currentStep = Number(button.closest(".wizard-step")?.dataset.step || wizardState.currentStep);
        advanceFrom(currentStep);
      });
    });

    document.querySelectorAll("[data-prev]").forEach((button) => {
      button.addEventListener("click", () => {
        const currentStep = Number(button.closest(".wizard-step")?.dataset.step || wizardState.currentStep);
        retreatFrom(currentStep);
      });
    });

    stepperButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetStep = Number(button.dataset.stepTarget);
        if (!canAccessStep(targetStep)) return;
        goToStep(targetStep);
      });
    });

    resetButton?.addEventListener("click", () => {
      wizardState.unlockedSteps = new Set([1]);
      wizardState.selections = {
        cat4: "No",
        cat3: "No",
        ee: "any",
        pro: "any",
        cycle: "any"
      };
      wizardState.currentStep = 1;
      surveyState = { status: "idle", answers: null };
      refreshDerivedState();
      syncCurrentStep();
    });

    refreshDerivedState();
    syncCurrentStep({ focusHeading: false });
  }

  function initPicks() {
    if (document.body.dataset.page !== "picks") return;
    optionFill($("#pick-ee"), data.estrogen.options);
    optionFill($("#pick-progestin"), data.progestin.categories);
    optionFill($("#pick-cycle"), data.cyclePatterns.categories);

    const render = () => {
      const ee = $("#pick-ee").value;
      const pro = $("#pick-progestin").value;
      const cyc = $("#pick-cycle").value;
      const rows = filterMedications({ ee, pro, cycle: cyc });
      const box = $("#picks-results");
      box.innerHTML = "";
      if (!rows.length) {
        box.appendChild(create("p", "No medications match these filters."));
        return;
      }

      const table = create("table");
      table.className = "results-table";
      const thead = create("thead");
      const headRow = create("tr");
      ["Medication", "Estrogen (mcg)", "Progestin", "Cycle", "Details / Notes"].forEach((label) => headRow.appendChild(create("th", label)));
      thead.appendChild(headRow);
      table.appendChild(thead);

      const tbody = create("tbody");
      rows.forEach((medication) => {
        const tr = create("tr");
        [medication.name, medication.ee, medication.progestin, medication.cycle, medication.note || ""]
          .forEach((text) => tr.appendChild(create("td", text)));
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      box.appendChild(table);
    };

    ["#pick-ee", "#pick-progestin", "#pick-cycle"].forEach((id) => $(id).addEventListener("change", render));
    render();
  }

  window.__COC_TESTING__ = {
    normalizeMedication,
    getNormalizedMedications: () => medications.slice(),
    filterMedications,
    formatEeDisplay
  };

  initShared();
  initWizard();
  initPicks();
})();
