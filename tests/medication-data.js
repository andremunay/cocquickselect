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

  focus() {}

  closest() {
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

function loadSandbox(document) {
  const sandbox = { window: {}, document, console };
  sandbox.window = sandbox;

  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("assets/content.js", "utf8"), sandbox, { filename: "assets/content.js" });
  vm.runInContext(fs.readFileSync("assets/app.js", "utf8"), sandbox, { filename: "assets/app.js" });

  return sandbox;
}

function collectText(node) {
  if (!node) return "";
  return `${node.textContent || ""}${node.children.map((child) => collectText(child)).join("")}`;
}

function createPicksSandbox() {
  const selectors = new Map();
  const create = (tag) => new FakeElement(tag);
  const body = create("body");
  body.dataset.page = "picks";

  selectors.set("#pick-ee", create("select"));
  selectors.set("#pick-progestin", create("select"));
  selectors.set("#pick-cycle", create("select"));
  selectors.set("#picks-results", create("div"));

  const document = {
    body,
    createElement: (tag) => create(tag),
    querySelector: (selector) => selectors.get(selector) || null,
    querySelectorAll: () => []
  };

  const sandbox = loadSandbox(document);
  return {
    sandbox,
    results: selectors.get("#picks-results")
  };
}

function createWizardSandbox() {
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
    [".wizard-step[data-step=\"1\"] h3", create("h3")],
    [".wizard-step[data-step=\"2\"] h3", create("h3")],
    [".wizard-step[data-step=\"3\"] h3", create("h3")],
    [".wizard-step[data-step=\"4\"] h3", create("h3")],
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

  const sandbox = loadSandbox(document);
  return {
    sandbox,
    nextButtons: selectorLists.get("[data-next]"),
    proChoices: selectors.get("#wiz-progestin-choices"),
    proGuide: selectors.get("#wiz-progestin-guide"),
    results: selectors.get("#wizard-results")
  };
}

const expectedOrder = [
  "Lo Loestrin Fe",
  "Aviane / Vienva / Lessina / Lutera",
  "Levora / Portia / Marlissa / Kurvelo",
  "LoSeasonique / Camrese Lo",
  "Seasonique / Camrese / Daysee",
  "Introvale / Jolessa / Setlakin",
  "Amethyst",
  "Loestrin Fe 1/20 / Junel Fe 1/20 / Blisovi Fe 1/20 / Microgestin Fe 1/20",
  "Loestrin Fe 1.5/30 / Junel Fe 1.5/30 / Blisovi Fe 1.5/30 / Microgestin Fe 1.5/30",
  "Loestrin 24 Fe / Junel Fe 24 / Blisovi 24 Fe / Taytulla",
  "Cryselle / Elinest / Low-Ogestrel",
  "Sprintec / Estarylla / Mili",
  "Apri / Enskyce / Isibloom",
  "Yaz / Gianvi / Nikki / Loryna",
  "Yasmin / Ocella / Syeda"
];

const baseSandbox = loadSandbox({
  body: { dataset: { page: "index" } },
  createElement: (tag) => new FakeElement(tag),
  querySelector: () => null,
  querySelectorAll: () => []
});

const api = baseSandbox.window.__COC_TESTING__;
const normalizedMedications = api.getNormalizedMedications();

assert(normalizedMedications.length === 15, "Expected 15 medication rows.");
assert(JSON.stringify(normalizedMedications.map((medication) => medication.name)) === JSON.stringify(expectedOrder), "Medication rows should preserve the provided order.");

assert(normalizedMedications[0].eeBucket === "10 mcg", "Lo Loestrin Fe should normalize to 10 mcg.");
assert(normalizedMedications[1].eeBucket === "20 mcg", "Aviane family should normalize to 20 mcg.");
assert(normalizedMedications[10].eeBucket === "30-35 mcg", "Sprintec family should normalize 35 mcg to 30-35 mcg.");
assert(normalizedMedications[14].eeBucket === "30-35 mcg", "Yasmin family should normalize 30 mcg to 30-35 mcg.");

assert(normalizedMedications[0].progestinCategory === "norethindrone", "Norethindrone rows should normalize correctly.");
assert(normalizedMedications[1].progestinCategory === "levonorgestrel", "Levonorgestrel rows should normalize correctly.");
assert(normalizedMedications[10].progestinCategory === "norgestrel", "Norgestrel rows should normalize correctly.");
assert(normalizedMedications[11].progestinCategory === "third-gen", "Norgestimate rows should normalize to third-gen.");
assert(normalizedMedications[12].progestinCategory === "third-gen", "Desogestrel rows should normalize to third-gen.");
assert(normalizedMedications[13].progestinCategory === "drospirenone", "Drospirenone rows should normalize correctly.");

const continuousNames = api.filterMedications({ ee: "any", pro: "any", cycle: "continuous" }).map((medication) => medication.name);
assert(continuousNames.includes("Aviane / Vienva / Lessina / Lutera"), "Continuous filter should include standard monophasic levonorgestrel rows.");
assert(continuousNames.includes("Amethyst"), "Continuous filter should include Amethyst.");
assert(continuousNames.includes("Lo Loestrin Fe"), "Continuous filter should include Lo Loestrin Fe.");
assert(continuousNames.includes("Introvale / Jolessa / Setlakin"), "Continuous filter should include Introvale-family rows.");
assert(!continuousNames.includes("LoSeasonique / Camrese Lo"), "Continuous filter should exclude LoSeasonique-family rows.");
assert(!continuousNames.includes("Seasonique / Camrese / Daysee"), "Continuous filter should exclude Seasonique-family rows.");

const picksEnv = createPicksSandbox();
assert(!collectText(picksEnv.results).includes("undefined"), "Quick Picks should not render undefined text.");

const wizardEnv = createWizardSandbox();
wizardEnv.nextButtons[0].listeners.click({ target: wizardEnv.nextButtons[0] });
wizardEnv.nextButtons[1].listeners.click({ target: wizardEnv.nextButtons[1] });
wizardEnv.nextButtons[2].listeners.click({ target: wizardEnv.nextButtons[2] });
assert(!collectText(wizardEnv.results).includes("undefined"), "Wizard results should not render undefined text.");
assert(collectText(wizardEnv.proChoices).includes("Norgestimate/Desogestrel"), "Wizard progestin choices should use the simplified Norgestimate/Desogestrel label.");
assert(!collectText(wizardEnv.proChoices).includes("3rd gen"), "Wizard progestin choices should not render the old 3rd gen label.");
assert(collectText(wizardEnv.proGuide).includes("Norgestimate/Desogestrel"), "Wizard progestin guide should use the simplified Norgestimate/Desogestrel label.");
assert(!collectText(wizardEnv.proGuide).includes("3rd gen"), "Wizard progestin guide should not render the old 3rd gen label.");

console.log("medication data regression test passed");
