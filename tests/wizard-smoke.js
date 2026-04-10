const fs = require("fs");
const vm = require("vm");

class FakeClassList {
  constructor(owner) {
    this.owner = owner;
    this.values = new Set();
  }

  sync() {
    this.owner.className = Array.from(this.values).join(" ");
  }

  add(...tokens) {
    tokens.forEach((token) => this.values.add(token));
    this.sync();
  }

  remove(...tokens) {
    tokens.forEach((token) => this.values.delete(token));
    this.sync();
  }

  toggle(token, force) {
    if (force === undefined) {
      if (this.values.has(token)) this.values.delete(token);
      else this.values.add(token);
    } else if (force) {
      this.values.add(token);
    } else {
      this.values.delete(token);
    }
    this.sync();
    return this.values.has(token);
  }

  contains(token) {
    return this.values.has(token);
  }
}

class FakeElement {
  constructor(tagName = "div") {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.dataset = {};
    this.className = "";
    this.classList = new FakeClassList(this);
    this.attributes = {};
    this.textContent = "";
    this._innerHTML = "";
    this.value = "";
    this.disabled = false;
    this.listeners = {};
  }

  get innerHTML() {
    return this._innerHTML;
  }

  set innerHTML(value) {
    this._innerHTML = value;
    this.children = [];
    this.textContent = "";
  }

  appendChild(child) {
    if (child) {
      child.parentNode = this;
      this.children.push(child);
    }
    return child;
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  addEventListener(type, handler) {
    this.listeners[type] = handler;
  }

  click() {
    if (this.listeners.click) this.listeners.click({ target: this });
  }

  focus() {}

  closest(selector) {
    if (selector === ".wizard-step") return this.parentNode;
    return this.parentNode;
  }

  querySelector(selector) {
    if (selector.includes(":checked")) {
      return this.children.find((child) => child.checked) || null;
    }
    return null;
  }

  querySelectorAll() {
    return [];
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function collectText(node) {
  if (!node) return "";
  return `${node.textContent || ""}${node.children.map((child) => collectText(child)).join("")}`;
}

function assertIncludes(source, text, message) {
  assert(source.includes(text), message);
}

function assertExcludes(source, text, message) {
  assert(!source.includes(text), message);
}

function createLocalStorageMock() {
  const store = new Map();

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    }
  };
}

function createEnvironment(options = {}) {
  const page = options.page || "wizard";
  const storage = options.storage || createLocalStorageMock();
  const selectors = new Map();
  const selectorLists = new Map();
  const create = (tag) => new FakeElement(tag);

  function setSelector(selector, element) {
    selectors.set(selector, element);
  }

  function setList(selector, elements) {
    selectorLists.set(selector, elements);
  }

  const body = create("body");
  body.dataset.page = page;

  const step1 = create("section");
  step1.dataset.step = "1";
  const step2 = create("section");
  step2.dataset.step = "2";
  step2.classList.add("hidden");
  const step3 = create("section");
  step3.dataset.step = "3";
  step3.classList.add("hidden");
  const step4 = create("section");
  step4.dataset.step = "4";
  step4.classList.add("hidden");

  const h1 = create("h3");
  const h2 = create("h3");
  const h3 = create("h3");
  const h4 = create("h3");

  [
    ["#wizard-safety-feedback", create("div")],
    ["#wizard-results", create("div")],
    ["#wizard-reset", create("button")],
    ["#wizard-goal-errors", create("div")],
    ["#qi-survey", create("div")],
    [".wizard-step[data-step=\"1\"] #wiz-sdm-content", create("div")],
    ["#wiz-step-cat4-guide", create("div")],
    ["#wiz-step-cat3-guide", create("div")],
    ["#wiz-ee-guide", create("div")],
    ["#wiz-progestin-guide", create("div")],
    ["#wiz-cycle-guide", create("div")],
    ["#wiz-cat4-choices", create("div")],
    ["#wiz-cat3-choices", create("div")],
    ["#wiz-ee-choices", create("div")],
    ["#wiz-progestin-choices", create("div")],
    ["#wiz-cycle-choices", create("div")],
    [".wizard-step[data-step=\"1\"] h3", h1],
    [".wizard-step[data-step=\"2\"] h3", h2],
    [".wizard-step[data-step=\"3\"] h3", h3],
    [".wizard-step[data-step=\"4\"] h3", h4],
    ["#cat4-list", null],
    ["#cat3-list", null],
    ["#cat3-counsel", null]
  ].forEach(([selector, element]) => setSelector(selector, element));

  const next1 = create("button");
  next1.dataset.next = "2";
  next1.parentNode = step1;
  const next2 = create("button");
  next2.dataset.next = "3";
  next2.parentNode = step2;
  const next3 = create("button");
  next3.dataset.next = "4";
  next3.parentNode = step3;

  const prev2 = create("button");
  prev2.dataset.prev = "1";
  prev2.parentNode = step2;
  const prev3 = create("button");
  prev3.dataset.prev = "2";
  prev3.parentNode = step3;
  const prev4 = create("button");
  prev4.dataset.prev = "3";
  prev4.parentNode = step4;

  setList(".wizard-step", [step1, step2, step3, step4]);
  setList("[data-next]", [next1, next2, next3]);
  setList("[data-prev]", [prev2, prev3, prev4]);
  setList(".wizard-stepper-item", []);

  const document = {
    body,
    createElement: (tag) => create(tag),
    querySelector: (selector) => selectors.has(selector) ? selectors.get(selector) : null,
    querySelectorAll: (selector) => selectorLists.get(selector) || []
  };

  const sandbox = { window: {}, document, console, localStorage: storage };
  sandbox.window = sandbox;
  sandbox.localStorage = storage;

  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("assets/content.js", "utf8"), sandbox, { filename: "assets/content.js" });
  vm.runInContext(fs.readFileSync("assets/app.js", "utf8"), sandbox, { filename: "assets/app.js" });

  return {
    step1,
    step2,
    step3,
    step4,
    next1,
    next2,
    next3,
    cat4Choices: selectors.get("#wiz-cat4-choices"),
    cat3Choices: selectors.get("#wiz-cat3-choices"),
    eeChoices: selectors.get("#wiz-ee-choices"),
    proChoices: selectors.get("#wiz-progestin-choices"),
    cycleChoices: selectors.get("#wiz-cycle-choices"),
    eeGuide: selectors.get("#wiz-ee-guide"),
    proGuide: selectors.get("#wiz-progestin-guide"),
    cycleGuide: selectors.get("#wiz-cycle-guide"),
    qiSurvey: selectors.get("#qi-survey"),
    results: selectors.get("#wizard-results"),
    safetyFeedback: selectors.get("#wizard-safety-feedback"),
    storage,
    testing: sandbox.__COC_TESTING__
  };
}

function assertChoiceLabels(container, expectedLabels, message) {
  const actualLabels = container.children.map((button) => collectText(button));
  assert(JSON.stringify(actualLabels) === JSON.stringify(expectedLabels), message);
  assert(
    container.children.every((button) => button.children.length === 1),
    "Simplified choice cards should render title text only."
  );
}

function runHappyPathAssertions(env) {
  assert(!env.step1.classList.contains("hidden"), "Step 1 should be visible at init.");
  env.next1.click();
  assert(!env.step2.classList.contains("hidden"), "Step 2 should be visible after starting safety screen.");
  assertChoiceLabels(env.cat4Choices, ["No", "Yes"], "Category 4 choices should render Yes/No labels.");
  assertChoiceLabels(env.cat3Choices, ["No", "Yes"], "Category 3 choices should render Yes/No labels.");

  env.next2.click();
  assert(!env.step3.classList.contains("hidden"), "Step 3 should be visible after continuing from Safety.");
  assert(env.eeChoices.children.length > 0, "EE choice cards should be rendered.");
  assert(env.proChoices.children.length > 0, "Progestin choice cards should be rendered.");
  assert(env.cycleChoices.children.length > 0, "Cycle choice cards should be rendered.");
  assertChoiceLabels(env.eeChoices, ["All", "10 mcg", "20 mcg", "30-35 mcg"], "EE choices should render title-only labels.");
  assertChoiceLabels(
    env.proChoices,
    ["All", "Norethindrone", "Levonorgestrel", "Norgestrel", "Norgestimate/Desogestrel", "Drospirenone"],
    "Progestin choices should render simplified labels."
  );
  assertChoiceLabels(
    env.cycleChoices,
    ["All", "21/7", "24/4", "Extended cycling", "Continuous cycling"],
    "Cycle choices should render title-only labels."
  );
  assert(collectText(env.eeGuide).includes("Ultra-low dose"), "EE guide should retain the explanatory copy.");
  assert(
    collectText(env.proGuide).includes("Norgestimate/Desogestrel: Less androgenic"),
    "Progestin guide should retain the explanatory copy for Norgestimate/Desogestrel."
  );
  assert(!collectText(env.proGuide).includes("3rd gen"), "Progestin guide should not render the old 3rd gen label.");
  assert(
    collectText(env.cycleGuide).includes("monthly withdrawal bleed"),
    "Cycle guide should retain the explanatory copy."
  );

  env.next3.click();
  assert(!env.step4.classList.contains("hidden"), "Step 4 should be visible after continuing from Goals.");
}

function runCategory4SkipAssertions(env) {
  env.next1.click();
  assert(env.cat4Choices.children.length >= 2, "Safety choice cards should be rendered.");
  env.cat4Choices.children[1].click();
  assert(env.safetyFeedback.children.length > 0, "Category 4 should render in-step hard-stop feedback.");
  env.next2.click();
  assert(!env.step4.classList.contains("hidden"), "Category 4 should skip directly to Step 4.");
  assert(env.results.children.length > 0, "Step 4 should render hard-stop content after Category 4 skip.");
}

function runSafetyFeedbackAssertions(env) {
  env.next1.click();
  assert(env.safetyFeedback.children.length === 0, "Default safety state should render no feedback cards.");
  env.cat3Choices.children[1].click();
  assert(env.safetyFeedback.children.length === 0, "Category 3 should not render an in-step status panel.");
  env.cat4Choices.children[1].click();
  assert(env.safetyFeedback.children.length > 0, "Category 4 should render the hard-stop feedback block.");
  const feedbackText = collectText(env.safetyFeedback);
  assert(feedbackText.includes("Category 4: Do NOT Use CHC"), "Category 4 feedback should use the updated hard-stop heading.");
  assert(feedbackText.includes("Do not start estrogen (pill, patch, or ring)."), "Category 4 feedback should use the updated estrogen warning.");
  assert(feedbackText.includes("POP - daily pill, no estrogen"), "Category 4 feedback should list the updated alternatives.");
}

function runStep4InteractionAssertions(env) {
  env.next1.click();
  env.next2.click();
  env.next3.click();

  const resultsText = collectText(env.results);
  assert(!resultsText.includes("How to order in Epic systems"), "Step 4 should not render the Epic ordering placeholder before a card is selected.");
  assert(!resultsText.includes("Broad fit"), "Step 4 should no longer render the Broad fit label.");

  const initialGrid = env.results.children[0];
  assert(initialGrid && initialGrid.children.length > 0, "Step 4 should render recommendation cards.");

  initialGrid.children[0].click();

  const updatedGrid = env.results.children[0];
  const selectedCard = updatedGrid.children[0];
  assert(selectedCard.classList.contains("is-selected"), "Clicking a Step 4 card should visibly select it.");
  assert(
    collectText(selectedCard).includes("How to order in Epic systems"),
    "Selecting a Step 4 card should open the inline Epic ordering placeholder."
  );
}

function runSurveyPersistenceAssertions() {
  const storage = createLocalStorageMock();
  const qiEnv = createEnvironment({ page: "qi", storage });
  const surveyStorageKey = qiEnv.testing.getSurveyStorageKey();

  storage.setItem(surveyStorageKey, JSON.stringify({
    status: "submitted",
    answers: {
      helpful_confidence: "5",
      knowledge: "4",
      reuse: "5",
      recommend: "5"
    }
  }));

  const hydratedSubmittedEnv = createEnvironment({ page: "qi", storage });
  assert(
    collectText(hydratedSubmittedEnv.qiSurvey).includes("Responses saved on this browser. Thank you."),
    "Saved submitted survey state should rehydrate on the QI page."
  );

  storage.setItem(surveyStorageKey, JSON.stringify({ status: "skipped", answers: null }));

  const hydratedSkippedEnv = createEnvironment({ page: "qi", storage });
  assert(
    collectText(hydratedSkippedEnv.qiSurvey).includes("Survey hidden on this browser."),
    "Saved skipped survey state should rehydrate on the QI page."
  );
}

function runMarkupAssertions() {
  const wizardHtml = fs.readFileSync("wizard.html", "utf8");
  const qiHtml = fs.readFileSync("qi.html", "utf8");
  const contraindicationsHtml = fs.readFileSync("contraindications.html", "utf8");
  const contentJs = fs.readFileSync("assets/content.js", "utf8");

  assertIncludes(wizardHtml, "Step 1: Shared Decision-Making in Contraceptive Counseling", "Step 1 should use the older heading tone.");
  assertIncludes(wizardHtml, "Step 2: Contraindication Screen", "Step 2 should use the older heading tone.");
  assertIncludes(wizardHtml, "Step 3: Dose, Progestin, Cycle", "Step 3 should use the older heading tone.");
  assertIncludes(wizardHtml, "Step 4: Suggested Options", "Step 4 should use the older heading tone.");
  assertIncludes(wizardHtml, "Choose an EE dose.</p>", "Step 3 should remove the keep it broad copy from the EE card.");
  assertIncludes(wizardHtml, "Choose a progestin goal.</p>", "Step 3 should remove the keep it broad copy from the progestin card.");
  assertIncludes(wizardHtml, "Choose a cycle pattern.</p>", "Step 3 should remove the keep it broad copy from the cycle card.");
  assertIncludes(wizardHtml, "<summary>Category 4 Quick Guide (Do NOT Use CHC)</summary>", "Step 2 should restore the Category 4 quick guide label.");
  assertIncludes(wizardHtml, "<summary>Category 3 quick guide</summary>", "Step 2 should restore the Category 3 quick guide label.");
  assertIncludes(wizardHtml, "<summary>EE dose quick guide</summary>", "Step 3 should restore the EE quick guide label.");
  assertIncludes(wizardHtml, "<summary>Progestin goal quick guide</summary>", "Step 3 should restore the progestin quick guide label.");
  assertIncludes(wizardHtml, "<summary>Cycle pattern quick guide</summary>", "Step 3 should restore the cycle quick guide label.");
  assertIncludes(wizardHtml, '>Next</button>', "Wizard should restore the old Next CTA language.");
  assertExcludes(wizardHtml, "keep it broad", "Step 3 should no longer mention keep it broad.");

  assertExcludes(wizardHtml, "wizard-stepper", "Dedicated stepper markup should be removed.");
  assertExcludes(fs.readFileSync("assets/styles.css", "utf8"), ".wizard-stepper", "Dedicated stepper CSS should be removed.");

  assertIncludes(qiHtml, "<h2>QI Goals</h2>", "QI should rename Targets to Goals.");
  assertIncludes(qiHtml, "<summary>Why this matters and how success will be measured</summary>", "QI explainer content should be collapsible.");
  assertIncludes(qiHtml, "<h3>Resident Survey</h3>", "QI should rename the resident survey heading.");
  assertIncludes(contentJs, 'surveyHeading: "Resident Survey"', "Shared survey heading should be renamed.");
  assertExcludes(qiHtml, '<details class="wizard-details" open>', "QI collapsible sections should start collapsed.");

  assertIncludes(contraindicationsHtml, "<summary>Category 4 Quick Guide (Do NOT Use CHC)</summary>", "Contraindications should make Category 4 collapsible.");
  assertIncludes(contraindicationsHtml, "<summary>Category 3 quick guide</summary>", "Contraindications should make Category 3 collapsible.");
  assertExcludes(contraindicationsHtml, '<details class="wizard-details" open>', "Contraindications quick guides should start collapsed.");
  assertIncludes(contraindicationsHtml, '<summary>Category 4 Quick Guide (Do NOT Use CHC)</summary>\n          <div id="cat4-intro"></div>', "Category 4 intro should live inside the collapsible quick guide.");
  assertIncludes(contraindicationsHtml, '<div id="cat3-intro"></div>', "Category 3 intro should live inside the collapsible quick guide.");
}

const happyPathEnv = createEnvironment();
runHappyPathAssertions(happyPathEnv);

const category4Env = createEnvironment();
runCategory4SkipAssertions(category4Env);

const safetyFeedbackEnv = createEnvironment();
runSafetyFeedbackAssertions(safetyFeedbackEnv);

const step4InteractionEnv = createEnvironment();
runStep4InteractionAssertions(step4InteractionEnv);

runSurveyPersistenceAssertions();
runMarkupAssertions();

console.log("wizard smoke test passed");
