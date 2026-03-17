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

function createEnvironment() {
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
  body.dataset.page = "wizard";

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
    ["#wizard-survey", create("div")],
    ["#wizard-safety-feedback", create("div")],
    ["#wizard-results", create("div")],
    ["#wizard-nav-hint", create("p")],
    ["#wizard-safety-next", create("button")],
    ["#wizard-reset", create("button")],
    ["#wizard-goal-errors", create("div")],
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

  const stepper1 = create("button");
  stepper1.dataset.stepTarget = "1";
  const stepper2 = create("button");
  stepper2.dataset.stepTarget = "2";
  stepper2.disabled = true;
  const stepper3 = create("button");
  stepper3.dataset.stepTarget = "3";
  stepper3.disabled = true;
  const stepper4 = create("button");
  stepper4.dataset.stepTarget = "4";
  stepper4.disabled = true;

  setList(".wizard-step", [step1, step2, step3, step4]);
  setList("[data-next]", [next1, next2, next3]);
  setList("[data-prev]", [prev2, prev3, prev4]);
  setList(".wizard-stepper-item", [stepper1, stepper2, stepper3, stepper4]);

  const document = {
    body,
    createElement: (tag) => create(tag),
    querySelector: (selector) => selectors.has(selector) ? selectors.get(selector) : null,
    querySelectorAll: (selector) => selectorLists.get(selector) || []
  };

  const sandbox = { window: {}, document, console };
  sandbox.window = sandbox;

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
    stepper2,
    stepper3,
    stepper4,
    cat4Choices: selectors.get("#wiz-cat4-choices"),
    cat3Choices: selectors.get("#wiz-cat3-choices"),
    eeChoices: selectors.get("#wiz-ee-choices"),
    proChoices: selectors.get("#wiz-progestin-choices"),
    cycleChoices: selectors.get("#wiz-cycle-choices"),
    eeGuide: selectors.get("#wiz-ee-guide"),
    proGuide: selectors.get("#wiz-progestin-guide"),
    cycleGuide: selectors.get("#wiz-cycle-guide"),
    results: selectors.get("#wizard-results"),
    safetyFeedback: selectors.get("#wizard-safety-feedback")
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
  assert(env.stepper2.classList.contains("is-active"), "Stepper should activate Step 2 after advancing from Intro.");
  assertChoiceLabels(env.cat4Choices, ["No", "Yes"], "Category 4 choices should render Yes/No labels.");
  assertChoiceLabels(env.cat3Choices, ["No", "Yes"], "Category 3 choices should render Yes/No labels.");

  env.next2.click();
  assert(!env.step3.classList.contains("hidden"), "Step 3 should be visible after continuing from Safety.");
  assert(env.stepper3.classList.contains("is-active"), "Stepper should activate Step 3 after continuing from Safety.");
  assert(env.eeChoices.children.length > 0, "EE choice cards should be rendered.");
  assert(env.proChoices.children.length > 0, "Progestin choice cards should be rendered.");
  assert(env.cycleChoices.children.length > 0, "Cycle choice cards should be rendered.");
  assertChoiceLabels(env.eeChoices, ["Keep broad", "10 mcg", "20 mcg", "30-35 mcg"], "EE choices should render title-only labels.");
  assertChoiceLabels(
    env.proChoices,
    ["Keep broad", "Norethindrone", "Levonorgestrel", "Norgestimate/Desogestrel", "Drospirenone"],
    "Progestin choices should render simplified labels."
  );
  assertChoiceLabels(
    env.cycleChoices,
    ["Keep broad", "21/7", "24/4", "Extended cycling", "Continuous cycling"],
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
  assert(env.stepper4.classList.contains("is-active"), "Stepper should activate Step 4 after continuing from Goals.");
}

function runCategory4SkipAssertions(env) {
  env.next1.click();
  assert(env.cat4Choices.children.length >= 2, "Safety choice cards should be rendered.");
  env.cat4Choices.children[1].click();
  assert(env.safetyFeedback.children.length === 0, "Category 4 should not render an in-step warning card.");
  env.next2.click();
  assert(!env.step4.classList.contains("hidden"), "Category 4 should skip directly to Step 4.");
  assert(env.results.children.length > 0, "Step 4 should render hard-stop content after Category 4 skip.");
}

function runSafetyFeedbackAssertions(env) {
  env.next1.click();
  assert(env.safetyFeedback.children.length === 0, "Default safety state should render no feedback cards.");
  env.cat3Choices.children[1].click();
  assert(env.safetyFeedback.children.length === 1, "Category 3 should render one caution card.");
  assert(
    env.safetyFeedback.children[0].children[0].textContent === "Use caution with combined pills.",
    "Category 3 caution card should use the existing caution heading."
  );
  env.cat4Choices.children[1].click();
  assert(env.safetyFeedback.children.length === 0, "Category 4 should suppress the in-step caution card.");
}

const happyPathEnv = createEnvironment();
runHappyPathAssertions(happyPathEnv);

const category4Env = createEnvironment();
runCategory4SkipAssertions(category4Env);

const safetyFeedbackEnv = createEnvironment();
runSafetyFeedbackAssertions(safetyFeedbackEnv);

console.log("wizard smoke test passed");
