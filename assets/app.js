(function () {
  const data = window.COC_CONTENT;
  if (!data) return;

  const $ = (sel) => document.querySelector(sel);
  const create = (tag, text) => {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    return el;
  };

  function optionFill(select, values) {
    if (!select) return;
    values.forEach((v) => {
      const opt = document.createElement("option");
      if (typeof v === "string") {
        opt.value = v;
        opt.textContent = v;
      } else {
        opt.value = v.value || v.key;
        opt.textContent = v.label;
      }
      select.appendChild(opt);
    });
  }

  function token(value) {
    return (value || "").split(/\s-\s/)[0].trim();
  }

  function conciseLabel(value) {
    return typeof value === "string" ? token(value) : value;
  }

  function matchesEeSelection(medication, selectedEe) {
    const eeToken = token(selectedEe);
    return !eeToken || eeToken === "any" || medication.ee === eeToken || (eeToken === "30-35 mcg" && (medication.ee === "30 mcg" || medication.ee === "35 mcg"));
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
    return data.medications.filter((medication) => (
      matchesEeSelection(medication, filters.ee)
      && matchesProgestinSelection(medication, filters.pro)
      && matchesCycleSelection(medication, filters.cycle)
    ));
  }

  function renderAlternatives() {
    const ul = create("ul");
    data.contraindications.alternatives.forEach((a) => ul.appendChild(create("li", a)));
    return ul;
  }

  function renderBulletSection(container, heading, items) {
    const section = create("div");
    section.appendChild(create("h4", heading));
    const ul = create("ul");
    (items || []).forEach((item) => ul.appendChild(create("li", item)));
    section.appendChild(ul);
    container.appendChild(section);
  }

  function renderResults(container, state) {
    if (!container) return;
    container.innerHTML = "";
    if (state.cat4 === "Yes") {
      container.appendChild(create("div", "HARD STOP"));
      container.appendChild(create("p", data.contraindications.hardStopText));
      container.appendChild(renderAlternatives());
      return;
    }

    if (state.cat3 === "Yes") {
      const caution = create("div", "CAUTION: Category 3 condition present.");
      caution.className = "banner warning";
      container.appendChild(caution);
      data.contraindications.cat3Counseling.forEach((t) => container.appendChild(create("p", t)));
      container.appendChild(renderAlternatives());
    }

    const list = filterMedications(state);

    const h = create("h4", "Suggested options");
    container.appendChild(h);
    if (!list.length) {
      container.appendChild(create("p", "No matches for current filter."));
    } else {
      const ul = create("ul");
      list.forEach((m) => {
        ul.appendChild(create("li", `${m.name} - ${m.detail} (${m.cycle})${m.note ? ` - ${m.note}` : ""}`));
      });
      container.appendChild(ul);
    }

    renderBulletSection(container, "How to order in Epic systems", data.recommendationOutput?.epicOrderingPlaceholder);

    if (state.pro === "drospirenone") {
      container.appendChild(create("p", data.progestin.drospirenoneNote));
    }
  }

  function renderBullets(items) {
    const ul = create("ul");
    (items || []).forEach((item) => ul.appendChild(create("li", item)));
    return ul;
  }

  function renderSdmSection(container) {
    if (!container) return;
    container.innerHTML = "";

    container.appendChild(create("p", data.sdm.audienceLabel));

    const whySection = create("div");
    whySection.className = "inline-guide";
    whySection.appendChild(create("h4", data.sdm.whyThisMattersHeading));
    whySection.appendChild(create("p", data.sdm.whyThisMattersIntro));
    if (data.sdm.whyThisMatters?.length) {
      whySection.appendChild(renderBullets(data.sdm.whyThisMatters));
    }
    data.sdm.whyThisMattersParagraphs.forEach((paragraph) => whySection.appendChild(create("p", paragraph)));
    container.appendChild(whySection);

    const approachSection = create("div");
    approachSection.className = "inline-guide";
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

  function makeInlineGuidesCollapsible() {
    document.querySelectorAll(".inline-guide").forEach((guide) => {
      const heading = guide.querySelector("h4");
      if (!heading || guide.querySelector("details")) return;
      const details = create("details");
      const summary = create("summary", heading.textContent);
      details.appendChild(summary);

      Array.from(guide.children).forEach((child) => {
        if (child !== heading) details.appendChild(child);
      });

      guide.innerHTML = "";
      guide.appendChild(details);
    });
  }

  function initShared() {
    const step1Sdm = document.querySelector('.wizard-step[data-step="1"] #wiz-sdm-content');
    renderSdmSection(step1Sdm);

    const cat4 = $("#cat4-list");
    if (cat4) {
      cat4.innerHTML = "";
      data.contraindications.category4.forEach((x) => cat4.appendChild(create("li", x)));
    }

    const cat3 = $("#cat3-list");
    if (cat3) {
      cat3.innerHTML = "";
      data.contraindications.category3.forEach((x) => cat3.appendChild(create("li", x)));
    }

    const c3 = $("#cat3-counsel");
    if (c3) {
      c3.innerHTML = "";
      data.contraindications.cat3Counseling.forEach((x) => c3.appendChild(create("p", x)));
    }
  }

  function initWizard() {
    if (document.body.dataset.page !== "wizard") return;
    makeInlineGuidesCollapsible();
    const wizEe = $("#wiz-ee");
    const wizProgestin = $("#wiz-progestin");
    const wizCycle = $("#wiz-cycle");
    const step3Next = document.querySelector('.wizard-step[data-step="3"] [data-next="4"]');

    optionFill(wizEe, data.estrogen.options.map((x) => ({ value: x, label: conciseLabel(x) })));
    optionFill(wizProgestin, data.progestin.categories);
    optionFill(wizCycle, data.cyclePatterns.categories);

    const hasCompleteStep3Selection = () => (
      !!wizEe?.value
      && !!wizProgestin?.value
      && !!wizCycle?.value
    );

    const syncStep3NextState = () => {
      if (step3Next) {
        step3Next.disabled = !hasCompleteStep3Selection();
      }
    };

    [wizEe, wizProgestin, wizCycle].forEach((select) => {
      select?.addEventListener("change", syncStep3NextState);
    });
    syncStep3NextState();

    const wizCat4 = $("#wiz-step-cat4-guide");
    if (wizCat4) {
      const ul = create("ul");
      data.contraindications.category4.forEach((x) => ul.appendChild(create("li", x)));
      wizCat4.appendChild(ul);
    }

    const wizCat3 = $("#wiz-step-cat3-guide");
    if (wizCat3) {
      const ul = create("ul");
      data.contraindications.category3.forEach((x) => ul.appendChild(create("li", x)));
      wizCat3.appendChild(ul);
    }

    const eeTips = $("#wiz-ee-guide");
    if (eeTips) {
      const ul = create("ul");
      data.estrogen.options.forEach((x) => ul.appendChild(create("li", typeof x === "string" ? x : x.label)));
      eeTips.appendChild(ul);
      (data.estrogen.pearls || []).forEach((text) => eeTips.appendChild(create("p", text)));
    }

    const proTips = $("#wiz-progestin-guide");
    if (proTips) {
      const ul = create("ul");
      (data.progestin.guideBullets || []).forEach((x) => ul.appendChild(create("li", x)));
      proTips.appendChild(ul);
      (data.progestin.guideNotes || []).forEach((text) => proTips.appendChild(create("p", text)));
    }

    const cycleTips = $("#wiz-cycle-guide");
    if (cycleTips) {
      cycleTips.appendChild(create("p", data.cyclePatterns.guideIntro));
      const ul = create("ul");
      (data.cyclePatterns.guideBullets || []).forEach((x) => ul.appendChild(create("li", x)));
      cycleTips.appendChild(ul);
      (data.cyclePatterns.guideNotes || []).forEach((text) => cycleTips.appendChild(create("p", text)));
    }

    const showWizardStep = (targetStep) => {
      document.querySelectorAll(".wizard-step").forEach((s) => s.classList.add("hidden"));
      document.querySelector(`[data-step="${targetStep}"]`)?.classList.remove("hidden");
    };

    document.querySelectorAll("[data-next]").forEach((btn) => btn.addEventListener("click", () => {
      const next = btn.dataset.next;
      if (next === "4" && !hasCompleteStep3Selection()) {
        syncStep3NextState();
        return;
      }
      const cat4Value = $("#wiz-cat4")?.value || "No";
      let targetStep = next;
      if (next === "3" && cat4Value === "Yes") {
        targetStep = "4";
      }

      showWizardStep(targetStep);

      const resultsContainer = $("#wizard-results");
      if (targetStep === "4" || resultsContainer) {
        renderResults(resultsContainer, {
          cat4: $("#wiz-cat4")?.value || "No",
          cat3: $("#wiz-cat3")?.value || "No",
          ee: $("#wiz-ee")?.value || "",
          pro: $("#wiz-progestin")?.value || "",
          cycle: $("#wiz-cycle")?.value || ""
        });
      }
    }));

    document.querySelectorAll("[data-prev]").forEach((btn) => btn.addEventListener("click", () => {
      const prev = btn.dataset.prev;
      showWizardStep(prev);
    }));
  }

  function initPicks() {
    if (document.body.dataset.page !== "picks") return;
    const ees = [...new Set(data.medications.map((m) => m.ee))];
    optionFill($("#pick-ee"), ees);
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
      ["Medication", "Estrogen", "Progestin", "Cycle", "Details / Notes"].forEach((label) => headRow.appendChild(create("th", label)));
      thead.appendChild(headRow);
      table.appendChild(thead);

      const tbody = create("tbody");
      rows.forEach((m) => {
        const tr = create("tr");
        [m.name, m.ee, m.progestin, m.cycle, `${m.detail}${m.note ? ` - ${m.note}` : ""}`].forEach((text) => tr.appendChild(create("td", text)));
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      box.appendChild(table);
    };

    ["#pick-ee", "#pick-progestin", "#pick-cycle"].forEach((id) => $(id).addEventListener("change", render));
    render();
  }

  initShared();
  initWizard();
  initPicks();
})();
