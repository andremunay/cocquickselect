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
    ["#wiz-intro-copy", create("p")],
    ["#wiz-intro-list", create("ul")],
    ["#wiz-intro-next", create("ul")],
    ["#wiz-safety-copy", create("p")],
    ["#wiz-goals-copy", create("p")],
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
    results: selectors.get("#wizard-results")
  };
}

const expectedOrder = [
  "Lo Loestrin Fe",
  "Afirmelle-28; Aubra-28; Aubra EQ-28; Aviane-28; Falmina-28; Larissia-28; Lessina-28; Lutera-28; Orsythia-28; Vienva-28; generic levonorgestrel and ethinyl estradiol 0.1/0.02",
  "Tyblume",
  "Balcoltra",
  "Minzoya",
  "Altavera-28; Ayuna-28; Chateal-28; Chateal EQ-28; Kurvelo-28; Levora-28; Lillow-28; Marlissa-28; Portia-28; generic levonorgestrel and ethinyl estradiol 0.15/0.03",
  "Aurovela FE; Blisovi FE; Hailey FE; Junel FE; Larin FE; Loestrin FE; Microgestin FE; Noreth-Estrad-Fe 1-0.02(21)-75; Tarina FE; Tarina FE 1-20 EQ",
  "Aurovela FE; Blisovi FE; Hailey FE; Junel FE; Larin FE; Loestrin FE; Microgestin FE",
  "Balziva-28; Briellyn; Philith; Vyfemla; Wymzya FE; Noret-Estra-Fe 0.4-0.035(21)-75",
  "Necon; Nortrel; Wera",
  "Alyacen; Dasetta; Nortrel; Pirmella",
  "Aurovela 1 mg-20 mcg; Junel 1 mg-20 mcg; Larin 21 1-20; Loestrin 21 1-20; Microgestin 21 1-20; Norethind-Eth Estrad 1-0.02",
  "Aurovela 21 1.5-30; Junel 1.5 mg-30 mcg; Hailey 21 1.5 mg-30 mcg; Larin 1.5 mg-30 mcg; Loestrin 21 1.5-30; Microgestin 21 1.5-30; Norethin-EE 1.5-0.03 (21)",
  "Estarylla; Femynor-28; Mili; Mono-Linyah-28; Nymyo; Previfem; Sprintec-28; Vylibra-28; generic norgestimate and ethinyl estradiol 0.25/0.035",
  "Ortho Tri-Cyclen; Tri-Sprintec; Tri-Estarylla; Tri-Femynor; Tri-Nymyo; Tri-VyLibra",
  "Apri-28; Cyred-28; Cyred EQ-28; Emoquette-28; Enskyce-28; Isibloom-28; Juleber-28; Kalliga-28; Reclipsen-28; generic desogestrel/ethinyl estradiol 0.15/0.03",
  "Azurette 28; Bekyree 28; Kariva 28; Mircette 28; Pimtrea; Simuya 28; Viorele 28; Volnea 0.15-0.02-0.01",
  "Yasmin-28; Ocella; Syeda-28; Zarah; Zumandimine 3-0.03; Safyral; Tydemy 3-0.03-0.451",
  "Yaz; Gianvi; Jasmiel; Nikki; Loryna; Lo-Zumandimine; Beyaz",
  "Aurovela 24 FE; Blisovi 24; Charlotte 24 FE; Gemmily; Hailey 24 FE; Junel FE 24; Larin 24 FE; Melodetta 24 FE; Merzee; Mibelas; Microgestin 24 FE; Minastrin 24 FE; Noreth-Estrad-FE 1-0.02(24)-75; Tarina 24 FE; Taytulla",
  "LoSeasonique; Amethia Lo; Camrese Lo; Lojaimiess; Lo Simpesse",
  "Introvale; Iclevia; Jolessa; Setlakin",
  "Seasonique; Amethia; Ashlyna; Camrese; Daysee; Jaimiess; Simpesse",
  "Amethyst; generic equivalents"
];

const baseSandbox = loadSandbox({
  body: { dataset: { page: "index" } },
  createElement: (tag) => new FakeElement(tag),
  querySelector: () => null,
  querySelectorAll: () => []
});

const api = baseSandbox.window.__COC_TESTING__;
const normalizedMedications = api.getNormalizedMedications();

assert(normalizedMedications.length === 24, "Expected 24 medication rows.");
assert(JSON.stringify(normalizedMedications.map((medication) => medication.name)) === JSON.stringify(expectedOrder), "Medication rows should preserve the provided order.");

assert(normalizedMedications[0].eeBucket === "10 mcg", "Lo Loestrin Fe should normalize to 10 mcg.");
assert(normalizedMedications[1].eeBucket === "20 mcg", "Levonorgestrel 20 row should normalize to 20 mcg.");
assert(normalizedMedications[16].eeBucket === "20 mcg", "Azurette family should normalize 20 (then 10) to 20 mcg.");
assert(normalizedMedications[22].eeBucket === "30-35 mcg", "Seasonique family should normalize 30 (then 10) to 30-35 mcg.");

assert(normalizedMedications[0].progestinCategory === "norethindrone", "Norethindrone rows should normalize correctly.");
assert(normalizedMedications[1].progestinCategory === "levonorgestrel", "Levonorgestrel rows should normalize correctly.");
assert(normalizedMedications[13].progestinCategory === "third-gen", "Norgestimate rows should normalize to third-gen.");
assert(normalizedMedications[15].progestinCategory === "third-gen", "Desogestrel rows should normalize to third-gen.");
assert(normalizedMedications[17].progestinCategory === "drospirenone", "Drospirenone rows should normalize correctly.");

const continuousNames = api.filterMedications({ ee: "any", pro: "any", cycle: "continuous" }).map((medication) => medication.name);
assert(continuousNames.includes("Afirmelle-28; Aubra-28; Aubra EQ-28; Aviane-28; Falmina-28; Larissia-28; Lessina-28; Lutera-28; Orsythia-28; Vienva-28; generic levonorgestrel and ethinyl estradiol 0.1/0.02"), "Continuous filter should include standard monophasic rows.");
assert(continuousNames.includes("Amethyst; generic equivalents"), "Continuous filter should include Amethyst.");
assert(!continuousNames.includes("Lo Loestrin Fe"), "Continuous filter should exclude Lo Loestrin Fe.");
assert(!continuousNames.includes("Ortho Tri-Cyclen; Tri-Sprintec; Tri-Estarylla; Tri-Femynor; Tri-Nymyo; Tri-VyLibra"), "Continuous filter should exclude triphasic norgestimate rows.");
assert(!continuousNames.includes("Azurette 28; Bekyree 28; Kariva 28; Mircette 28; Pimtrea; Simuya 28; Viorele 28; Volnea 0.15-0.02-0.01"), "Continuous filter should exclude Azurette-family rows.");
assert(!continuousNames.includes("LoSeasonique; Amethia Lo; Camrese Lo; Lojaimiess; Lo Simpesse"), "Continuous filter should exclude LoSeasonique-family rows.");
assert(!continuousNames.includes("Seasonique; Amethia; Ashlyna; Camrese; Daysee; Jaimiess; Simpesse"), "Continuous filter should exclude Seasonique-family rows.");

const picksEnv = createPicksSandbox();
assert(!collectText(picksEnv.results).includes("undefined"), "Quick Picks should not render undefined text.");

const wizardEnv = createWizardSandbox();
wizardEnv.nextButtons[0].listeners.click({ target: wizardEnv.nextButtons[0] });
wizardEnv.nextButtons[1].listeners.click({ target: wizardEnv.nextButtons[1] });
wizardEnv.nextButtons[2].listeners.click({ target: wizardEnv.nextButtons[2] });
assert(!collectText(wizardEnv.results).includes("undefined"), "Wizard results should not render undefined text.");

console.log("medication data regression test passed");
