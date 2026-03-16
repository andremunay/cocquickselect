window.COC_CONTENT = {
  siteName: "Combined Oral Contraceptive Pill Selection",
  wizard: {
    introCopy: "Use this for a fast COC starting point during a visit.",
    introChecklist: [
      "Confirm a combined pill still fits the visit goal.",
      "Screen safety before narrowing formulation details.",
      "Use the result as a starting point for counseling."
    ],
    introNext: [
      "Step 2 checks Category 4 and Category 3 risk.",
      "Step 3 narrows goals only if needed.",
      "Step 4 shows ranked starting options."
    ],
    safetyCopy: "If Category 4 is present, stop and choose a non-COC option.",
    goalsCopy: "Leave filters broad unless a detail matters for this patient.",
    hardStopHeading: "Combined pills are unsafe to start today.",
    hardStopBody: "A Category 4 condition is present. Do not prescribe a COC. Use the alternatives below.",
    cautionHeading: "Use caution with combined pills.",
    cautionBody: "A Category 3 condition is present. Discuss alternatives first and use a COC only if no better fit exists after counseling.",
    alternativesHeading: "Preferred next move",
    recommendationHeading: "Ranked starting options",
    recommendationEmpty: "No pills match the current goals. Broaden a filter and review again.",
    surveyHeading: "Resident comfort survey"
  },
  sdm: {
    heading: "Shared Decision-Making in Contraceptive Counseling",
    audienceLabel: "For the resident clinician",
    whyThisMattersHeading: "Why This Matters",
    whyThisMattersIntro: "Contraceptive counseling is not just about pregnancy prevention.",
    whyThisMatters: [],
    whyThisMattersParagraphs: [
      "Patients seek contraception for many reasons, including pregnancy prevention, menstrual suppression, treatment of heavy bleeding or dysmenorrhea, management of endometriosis symptoms, acne, hirsutism, PMDD, or simply greater control over their reproductive lives.",
      "Access to contraception is also a matter of health equity and reproductive autonomy. When patients cannot reliably control if and when they become pregnant, the effects can extend beyond medical outcomes to physical and mental health, educational opportunities, employment, financial stability, and overall quality of life.",
      "In primary care, we are often the most accessible clinicians for contraceptive care. Our comfort and competence in contraceptive counseling can reduce barriers to care, prevent unnecessary referrals, and meaningfully improve patient outcomes."
    ],
    approachHeading: "Approach: Patient-Centered, Evidence-Based",
    approachIntro: "The CDC and ACOG emphasize that contraceptive counseling should be:",
    approachBullets: [
      "Patient-centered and non-directive",
      "Grounded in reproductive autonomy",
      "Free of coercion and judgment",
      "Clear about risks, benefits, and alternatives",
      "Aligned with both patient goals and medical safety"
    ],
    roleStatement: 'Your role is not to "pick the best pill."',
    roleBullets: [
      "Medically safe",
      "Consistent with their priorities",
      "Realistic for their lifestyle",
      "Acceptable and sustainable for them"
    ],
    roleIntro: "Your role is to help the patient choose a method that is:",
    roleClosing: "The best contraceptive method is not the one with the highest efficacy on paper - it is the one that is safe, desired, and workable in the context of the patient's real life."
  },
  contraindications: {
    category4: [
      "Age >=35 and smoking >=15 cigarettes/day",
      "Multiple cardiovascular risk factors (e.g., older age, smoking, diabetes, hypertension)",
      "Hypertension >=160/100 mmHg",
      "Venous thromboembolism (unless on full anticoagulation)",
      "Known ischemic heart disease",
      "History of stroke",
      "Complicated valvular heart disease (pulmonary HTN, atrial fibrillation, or endocarditis risk)",
      "Current breast cancer",
      "Severe decompensated cirrhosis",
      "Hepatocellular adenoma or malignant hepatoma",
      "Migraine with aura",
      "Diabetes >20 years or with complications (nephropathy, retinopathy, neuropathy)",
      "Known thrombogenic variants (e.g., Factor V Leiden) - generally contraindicated; may consider only in mild cases without personal or family VTE history"
    ],
    category3: [
      "Age >=35 and smoking <15 cigarettes/day",
      "Hypertension (SBP 140-159 or DBP 90-99)",
      "Hypertension controlled on meds",
      "Past breast cancer (>5 years, no current disease)",
      "Malabsorptive bariatric surgery (decreased absorption; recommend non-oral methods)",
      "Superficial venous thrombosis (current or history)",
      "Inflammatory bowel disease with VTE risk factors (active disease, surgery, immobilization, corticosteroids, vitamin deficiencies, dehydration)"
    ],
    cat3Counseling: [
      "COCs are generally not recommended because risks usually outweigh benefits; may be considered only if no better alternatives after thorough counseling on potential risks.",
      "Ongoing follow-up is recommended to ensure continued safety."
    ],
    hardStopText: "Do NOT prescribe COCs. Consider alternative contraception options.",
    alternatives: ["POP (placeholder)", "IUD (placeholder)", "Implant (placeholder)", "Shot (placeholder)"]
  },
  estrogen: {
    intro: [
      "All modern low-dose COCs (<=35 mcg EE) are similarly effective at preventing pregnancy.",
      "Starting with 20 mcg EE is reasonable when concerned about side effects.",
      "Increase to 30-35 mcg if breakthrough bleeding persists.",
      "Estrogen side effects: nausea, breast tenderness, headaches, bloating, melasma, increased vaginal discharge; risk tends to increase with higher estrogen exposure.",
      "Providers can prioritize tolerability when selecting EE dose without compromising contraceptive effectiveness."
    ],
    options: [
      {
        key: "10 mcg",
        label: "10 mcg",
        helpText: "Ultra-low dose",
        detail: "Lowest estrogen exposure; more breakthrough bleeding and less predictable cycles."
      },
      {
        key: "20 mcg",
        label: "20 mcg",
        helpText: "Low dose",
        detail: "Common starting point; often well tolerated, with more spotting than higher-dose pills."
      },
      {
        key: "30-35 mcg",
        label: "30-35 mcg",
        helpText: "Standard dose",
        detail: "Often improves bleeding predictability, with more noticeable estrogen-related side effects."
      }
    ],
    pearls: [
      "Clinical pearl: Lower EE doses are often better tolerated but more likely to cause unscheduled bleeding; 30-35 mcg EE may be a better fit when cycle predictability is a priority or breakthrough bleeding occurs.",
      "Clinical pearl: Estrogen dose matters for VTE risk overall - older 50 mcg EE pills have higher VTE risk than modern low-dose pills. However, within currently used low-dose formulations (20 vs 30-35 mcg EE), evidence that lower EE meaningfully reduces VTE risk is limited; in practice, dose selection is usually driven more by bleeding profile, tolerability, and overall CHC eligibility/risk factors than by small presumed VTE differences."
    ]
  },
  progestin: {
    categories: [
      {
        key: "norethindrone",
        label: "Norethindrone",
        helpText: "1st gen - lower potency; practical if estrogen-sensitive; more BTB"
      },
      {
        key: "levonorgestrel",
        label: "Levonorgestrel",
        helpText: "2nd gen - strong cycle control; heavy bleeding; may be slightly lower VTE risk"
      },
      {
        key: "third-gen",
        label: "3rd gen (Norgestimate/Desogestrel)",
        helpText: "Less androgenic; acne/hirsutism; fewer androgenic side effects"
      },
      {
        key: "drospirenone",
        label: "Drospirenone",
        helpText: "4th gen - anti-androgenic + anti-mineralocorticoid; PMDD/bloating/acne/weight or mood concerns; may increase VTE risk vs LNG"
      }
    ],
    guideBullets: [
      "Norethindrone: common, practical starting option; inexpensive and widely available",
      "Levonorgestrel: common, practical default option; well-studied and often used as a straightforward starting point",
      "3rd gen (Norgestimate or Desogestrel): less androgenic; often a good choice if acne is a concern",
      "Drospirenone: may be helpful for acne, bloating/fluid retention, or PMDD-type symptoms"
    ],
    guideNotes: [
      "Clinical pearl: Most combined pills are similarly effective for contraception. In practice, progestin choice is most useful for symptom goals (such as acne or PMDD-type symptoms) and side-effect counseling, rather than because one progestin is dramatically better than another. If VTE risk is a major counseling concern in an otherwise CHC-eligible patient, levonorgestrel-containing pills are often used as a lower-risk reference option, but overall CHC eligibility (US MEC) and patient risk factors matter more than small formulation differences.",
      'US MEC (U.S. Medical Eligibility Criteria): A safety framework for contraceptive prescribing. For combined hormonal contraception, the key question is: "Can this patient safely use estrogen?"'
    ],
    drospirenoneNote: "Potassium monitoring is only recommended during the first month if the patient is taking other medications that increase potassium (spironolactone, ACE-I, ARBs, or other K-sparing meds)."
  },
  cyclePatterns: {
    categories: [
      {
        key: "21-7",
        label: "21/7",
        helpText: "Standard regimen with a monthly withdrawal bleed"
      },
      {
        key: "24-4",
        label: "24/4",
        helpText: "Shorter hormone-free interval; may reduce withdrawal symptoms and lighten bleeding"
      },
      {
        key: "extended",
        label: "Extended cycling",
        helpText: "Fewer scheduled bleeds, including 84/7-style regimens and monophasic pills used for suppression"
      },
      {
        key: "continuous",
        label: "Continuous cycling",
        helpText: "No scheduled withdrawal bleed when using a continuous-eligible monophasic COC"
      }
    ],
    guideIntro: "What do the numbers mean?",
    guideBullets: [
      "21/7: 21 active pills + 7 placebo/hormone-free days -> monthly withdrawal bleed",
      "24/4: 24 active pills + 4 placebo/hormone-free days -> monthly withdrawal bleed with a shorter hormone-free interval; may reduce withdrawal symptoms and may result in lighter bleeding",
      "Extended cycling (e.g., 84/7): 84 active pills + 7 placebo/hormone-free days -> fewer scheduled bleeds (often every 3 months)",
      "Continuous cycling: no placebo/hormone-free interval -> no scheduled withdrawal bleed; safe and commonly used"
    ],
    guideNotes: [
      "Clinical pearl: The bleed during placebo days is a withdrawal bleed, not a medically necessary period. Extended and continuous regimens are safe options for patients who want fewer periods, menstrual suppression, or less cyclic pain, headache, or bloating.",
      "Monophasic = each active pill contains the same hormone dose. This site generally recommends monophasic COCs because they are easier to prescribe, easier to troubleshoot, and the simplest option for extended or continuous cycling.",
      "Multiphasic (including biphasic, triphasic, or quadriphasic) pills vary hormone dose throughout the pack; they can work well for some patients, but are usually less straightforward to prescribe, troubleshoot, or use continuously than monophasic pills.",
      "Practical tip: Any monophasic COC can usually be used continuously by skipping placebo pills and starting the next pack right away."
    ]
  },
  missedPill: [
    "Miss 1: Take ASAP, continue as usual.",
    "Miss >=2: Follow catch-up rules + use back-up x7 days."
  ],
  recommendationOutput: {
    sideEffectsPlaceholder: [
      "[Placeholder] Add common side effects counseling bullets tailored to selected formulation.",
      "[Placeholder] Add red-flag symptoms that should prompt urgent follow-up.",
      "[Placeholder] Add expected timeline for side-effect improvement after initiation."
    ],
    startingMedicationPlaceholder: [
      "[Placeholder] Add Sunday-start and quick-start instructions with backup duration.",
      "[Placeholder] Add guidance for same-day start when reasonably certain not pregnant.",
      "[Placeholder] Add practical adherence tips (daily timing, reminders, refill planning)."
    ],
    epicOrderingPlaceholder: [
      "[Placeholder] Add Epic order set name/path for combined oral contraceptive prescriptions.",
      "[Placeholder] Add default quantity/refill workflow for common starter prescriptions.",
      "[Placeholder] Add documentation smartphrase or counseling checklist for visit notes."
    ]
  },
  medications: [
    {
      name: "Lo Loestrin Fe",
      ee: "10",
      progestin: "Norethindrone",
      cycle: "24/4",
      note: "Pack contains 24 combo active tablets (norethindrone acetate + EE 10 mcg), then 2 EE-only tablets (10 mcg), then 2 inert/iron tablets."
    },
    {
      name: "Afirmelle-28; Aubra-28; Aubra EQ-28; Aviane-28; Falmina-28; Larissia-28; Lessina-28; Lutera-28; Orsythia-28; Vienva-28; generic levonorgestrel and ethinyl estradiol 0.1/0.02",
      ee: "20",
      progestin: "Levonorgestrel",
      cycle: "21/7",
      note: "Standard 28-day regimen: 21 active + 7 placebo."
    },
    {
      name: "Tyblume",
      ee: "20",
      progestin: "Levonorgestrel",
      cycle: "21/7",
      note: "Chewable; 21 active + 7 placebo."
    },
    {
      name: "Balcoltra",
      ee: "20",
      progestin: "Levonorgestrel",
      cycle: "21/7",
      note: "21 active tablets (levonorgestrel/EE) + 7 inactive tablets containing ferrous bisglycinate."
    },
    {
      name: "Minzoya",
      ee: "20",
      progestin: "Levonorgestrel",
      cycle: "21/7",
      note: "Generic equivalent of Balcoltra's regimen; 21 active + 7 inert/iron."
    },
    {
      name: "Altavera-28; Ayuna-28; Chateal-28; Chateal EQ-28; Kurvelo-28; Levora-28; Lillow-28; Marlissa-28; Portia-28; generic levonorgestrel and ethinyl estradiol 0.15/0.03",
      ee: "30",
      progestin: "Levonorgestrel",
      cycle: "21/7",
      note: "Standard 28-day regimen: 21 active + 7 placebo."
    },
    {
      name: "Aurovela FE; Blisovi FE; Hailey FE; Junel FE; Larin FE; Loestrin FE; Microgestin FE; Noreth-Estrad-Fe 1-0.02(21)-75; Tarina FE; Tarina FE 1-20 EQ",
      ee: "20",
      progestin: "Norethindrone",
      cycle: "21/7",
      note: "21 active pills + 7 ferrous fumarate placebo pills."
    },
    {
      name: "Aurovela FE; Blisovi FE; Hailey FE; Junel FE; Larin FE; Loestrin FE; Microgestin FE",
      ee: "30",
      progestin: "Norethindrone",
      cycle: "21/7",
      note: "21 active pills + 7 ferrous fumarate placebo pills."
    },
    {
      name: "Balziva-28; Briellyn; Philith; Vyfemla; Wymzya FE; Noret-Estra-Fe 0.4-0.035(21)-75",
      ee: "35",
      progestin: "Norethindrone",
      cycle: "21/7",
      note: "Includes standard tablets and chewable/iron variants."
    },
    {
      name: "Necon; Nortrel; Wera",
      ee: "35",
      progestin: "Norethindrone",
      cycle: "21/7",
      note: "Standard 28-day regimen."
    },
    {
      name: "Alyacen; Dasetta; Nortrel; Pirmella",
      ee: "35",
      progestin: "Norethindrone",
      cycle: "21/7",
      note: "28-day products in the 1 mg/35 mcg family."
    },
    {
      name: "Aurovela 1 mg-20 mcg; Junel 1 mg-20 mcg; Larin 21 1-20; Loestrin 21 1-20; Microgestin 21 1-20; Norethind-Eth Estrad 1-0.02",
      ee: "20",
      progestin: "Norethindrone",
      cycle: "21/7",
      note: "21-tablet packs; no inert tablets included."
    },
    {
      name: "Aurovela 21 1.5-30; Junel 1.5 mg-30 mcg; Hailey 21 1.5 mg-30 mcg; Larin 1.5 mg-30 mcg; Loestrin 21 1.5-30; Microgestin 21 1.5-30; Norethin-EE 1.5-0.03 (21)",
      ee: "30",
      progestin: "Norethindrone",
      cycle: "21/7",
      note: "21-tablet packs; no inert tablets included."
    },
    {
      name: "Estarylla; Femynor-28; Mili; Mono-Linyah-28; Nymyo; Previfem; Sprintec-28; Vylibra-28; generic norgestimate and ethinyl estradiol 0.25/0.035",
      ee: "35",
      progestin: "Norgestimate",
      cycle: "21/7",
      note: "Standard 28-day regimen: 21 active + 7 placebo."
    },
    {
      name: "Ortho Tri-Cyclen; Tri-Sprintec; Tri-Estarylla; Tri-Femynor; Tri-Nymyo; Tri-VyLibra",
      ee: "35",
      progestin: "Norgestimate",
      cycle: "21/7",
      note: "Triphasic norgestimate dosing with EE 35 mcg."
    },
    {
      name: "Apri-28; Cyred-28; Cyred EQ-28; Emoquette-28; Enskyce-28; Isibloom-28; Juleber-28; Kalliga-28; Reclipsen-28; generic desogestrel/ethinyl estradiol 0.15/0.03",
      ee: "30",
      progestin: "Desogestrel",
      cycle: "21/7",
      note: "Standard 28-day regimen: 21 active + 7 placebo."
    },
    {
      name: "Azurette 28; Bekyree 28; Kariva 28; Mircette 28; Pimtrea; Simuya 28; Viorele 28; Volnea 0.15-0.02-0.01",
      ee: "20 (then 10)",
      progestin: "Desogestrel",
      cycle: "21/7",
      note: "21 desogestrel/EE 20 mcg tablets followed by EE-only 10 mcg tablets in the tail end of the pack."
    },
    {
      name: "Yasmin-28; Ocella; Syeda-28; Zarah; Zumandimine 3-0.03; Safyral; Tydemy 3-0.03-0.451",
      ee: "30",
      progestin: "Drospirenone",
      cycle: "21/7",
      note: "3 mg drospirenone / 30 mcg EE family."
    },
    {
      name: "Yaz; Gianvi; Jasmiel; Nikki; Loryna; Lo-Zumandimine; Beyaz",
      ee: "20",
      progestin: "Drospirenone",
      cycle: "24/4",
      note: "24 active + 4 inert."
    },
    {
      name: "Aurovela 24 FE; Blisovi 24; Charlotte 24 FE; Gemmily; Hailey 24 FE; Junel FE 24; Larin 24 FE; Melodetta 24 FE; Merzee; Mibelas; Microgestin 24 FE; Minastrin 24 FE; Noreth-Estrad-FE 1-0.02(24)-75; Tarina 24 FE; Taytulla",
      ee: "20",
      progestin: "Norethindrone",
      cycle: "24/4",
      note: "24 active hormone days + 4 placebo/iron days."
    },
    {
      name: "LoSeasonique; Amethia Lo; Camrese Lo; Lojaimiess; Lo Simpesse",
      ee: "20 (then 10)",
      progestin: "Levonorgestrel",
      cycle: "Extended cycling",
      note: "84 active tablets of levonorgestrel/EE 0.1/0.02 followed by 7 tablets of EE 0.01."
    },
    {
      name: "Introvale; Iclevia; Jolessa; Setlakin",
      ee: "30",
      progestin: "Levonorgestrel",
      cycle: "Extended cycling",
      note: "84 active levonorgestrel/EE 0.15/0.03 tablets plus 7 inert tablets."
    },
    {
      name: "Seasonique; Amethia; Ashlyna; Camrese; Daysee; Jaimiess; Simpesse",
      ee: "30 (then 10)",
      progestin: "Levonorgestrel",
      cycle: "Extended cycling",
      note: "84 active levonorgestrel/EE 0.15/0.03 tablets followed by 7 tablets of EE 0.01."
    },
    {
      name: "Amethyst; generic equivalents",
      ee: "20",
      progestin: "Levonorgestrel",
      cycle: "Continuous cycling",
      note: "Continuous daily active tablets; no planned hormone-free interval."
    }
  ]
};
