window.COC_CONTENT = {
  siteName: "Combined Oral Contraceptive Pill Selection",
  wizard: {
    hardStopHeading: "Category 4: Do NOT Use CHC",
    hardStopBody: "A Category 4 condition is present. Do not start estrogen (pill, patch, or ring).",
    cautionHeading: "Usually avoid estrogen.",
    cautionBody: "A Category 3 condition is present. Estrogen is usually not first-line; prefer a progestin-only or nonhormonal method and review the current U.S. MEC if estrogen is still being considered.",
    alternativesHeading: "Choose a progestin-only or nonhormonal method instead:",
    recommendationEmpty: "No pills match the current goals. Broaden a filter and review again.",
    surveyHeading: "Resident Survey"
  },
  sdm: {
    heading: "Shared Decision-Making in Contraceptive Counseling",
    audienceLabel: "For the Resident Clinician",
    whyThisMattersHeading: "Why This Matters",
    whyThisMattersIntro: "Contraceptive counseling is not just about pregnancy prevention.",
    whyThisMatters: [],
    whyThisMattersParagraphs: [
      "Patients may seek contraception for pregnancy prevention, menstrual suppression, treatment of heavy bleeding or dysmenorrhea, endometriosis symptom control, acne, hirsutism, PMDD, or greater reproductive control.",
      "Access to contraception is also a matter of health equity and reproductive autonomy. In primary care, we are often the most accessible clinicians for contraceptive care. Thoughtful counseling can reduce barriers, avoid unnecessary referrals, and improve timely access to treatment."
    ],
    approachHeading: "Counseling Principles",
    approachIntro: "Contraceptive counseling should be:",
    approachBullets: [
      "Patient-centered",
      "Grounded in reproductive autonomy",
      "Free of coercion and judgment",
      "Clear about risks, benefits, and alternatives",
      "Aligned with patient goals and medical safety"
    ],
    roleStatement: "",
    roleBullets: [],
    roleIntro: "",
    roleClosing: ""
  },
  contraindications: {
    mecLink: {
      href: "https://www.cdc.gov/contraception/hcp/usmec/combined-hormonal-contraceptives.html",
      label: "CDC U.S. MEC Appendix D: Combined Hormonal Contraceptives"
    },
    category4Lead: [
      "If YES -> do not start estrogen (combined oral pill, patch, or ring).",
      "Use a progestin-only or nonhormonal method instead. If the history is complex or unclear, check the current CDC U.S. MEC (Appendix D: Combined Hormonal Contraceptives) before prescribing."
    ],
    category4ListHeading: "Common Category 4 Conditions",
    category4Guide: [
      {
        title: "Age >=35 and smoking >=15 cigarettes/day",
        details: []
      },
      {
        title: "Hypertension >=160/100 mmHg",
        details: []
      },
      {
        title: "Hypertension with vascular disease",
        details: ["Examples: CAD, PAD, prior stroke/TIA, diabetic nephropathy/retinopathy, or other clinically significant vascular complications."]
      },
      {
        title: "Current DVT/PE",
        details: ["Active clot = estrogen contraindicated."]
      },
      {
        title: "History of DVT/PE with high recurrence risk",
        details: ["Examples: estrogen-associated VTE, pregnancy-associated VTE, idiopathic VTE, recurrent VTE, active cancer, or known thrombophilia."]
      },
      {
        title: "Known thrombophilia / thrombogenic mutation",
        details: ["Examples: Factor V Leiden, prothrombin mutation, protein C or S deficiency, antithrombin deficiency, antiphospholipid syndrome."]
      },
      {
        title: "Known ischemic heart disease",
        details: ["Examples: prior MI, angina, or known CAD."]
      },
      {
        title: "History of stroke or TIA"
      },
      {
        title: "Complicated valvular heart disease",
        details: ["Examples: pulmonary hypertension, risk for atrial fibrillation, or history/risk of endocarditis."]
      },
      {
        title: "Migraine with aura",
        details: ["Aura = focal neurologic symptoms (for example: visual changes, numbness, speech symptoms)."]
      },
      {
        title: "Current breast cancer"
      },
      {
        title: "Severe decompensated cirrhosis"
      },
      {
        title: "Hepatocellular adenoma or malignant liver tumor"
      },
      {
        title: "Diabetes with nephropathy, retinopathy, neuropathy, other vascular disease, or duration >20 years"
      },
      {
        title: "<21 days postpartum"
      },
      {
        title: "Major surgery with prolonged immobilization"
      },
      {
        title: "SLE with positive or unknown antiphospholipid antibodies"
      }
    ],
    category4ReminderHeading: "Clinical Reminder",
    category4Reminder: [
      "Category 4 = unacceptable health risk. Do not use CHC.",
      "If the patient still wants estrogen-containing contraception, stop and re-check the U.S. MEC before prescribing. The CDC summary chart is a subset only; the full U.S. MEC should be used for nuanced cases."
    ],
    category3Lead: [
      "If YES -> estrogen (pill/patch/ring) is usually not first-line.",
      "Prefer a progestin-only or nonhormonal method. If estrogen is still being considered, review the current U.S. MEC and document counseling."
    ],
    category3Guide: [
      {
        title: "Age >=35 and smoking <15 cigarettes/day",
        details: ["Estrogen usually not recommended; safer alternatives preferred."]
      },
      {
        title: "Hypertension (SBP 140-159 or DBP 90-99)"
      },
      {
        title: "Hypertension that is adequately controlled on medication",
        details: ["Even when \"controlled,\" estrogen may still increase cardiovascular risk."]
      },
      {
        title: "History of DVT/PE at lower risk for recurrence",
        details: ["Not all prior VTE is Category 4. Lower-risk prior VTE is often Category 3 - if the history is unclear, check the full U.S. MEC."]
      },
      {
        title: "Superficial venous thrombosis (current or history)",
        details: ["May signal increased VTE risk."]
      },
      {
        title: "Past breast cancer (>5 years disease-free)",
        details: ["Usually avoid hormonal methods if acceptable alternatives exist; check full MEC if considering hormones."]
      },
      {
        title: "Malabsorptive bariatric surgery (oral pills only)",
        details: [
          "May reduce absorption of oral pills. Prefer non-oral or non-estrogen methods.",
          "Note: This applies to oral contraceptive pills, not patch or ring."
        ]
      },
      {
        title: "Inflammatory bowel disease with increased VTE risk",
        details: ["Examples: active disease, recent surgery, immobilization, corticosteroid use, dehydration, or other VTE risk factors."]
      },
      {
        title: "Postpartum 21-42 days with VTE risk factors",
        details: ["Not a Category 4 hard stop, but usually avoid estrogen during this window."]
      },
      {
        title: "SLE without antiphospholipid antibodies (depending on clinical context)",
        details: ["Can be nuanced - check U.S. MEC if lupus history is complex."]
      }
    ],
    category3ReminderHeading: "Clinical Reminder",
    category3Reminder: [
      "Category 3 = risks usually outweigh benefits.",
      "This does not always mean \"never,\" but estrogen should generally be avoided unless there is a strong reason and safer alternatives are not acceptable."
    ],
    category4: [
      "Age >=35 and smoking >=15 cigarettes/day",
      "Hypertension >=160/100 mmHg",
      "Hypertension with vascular disease",
      "Current DVT/PE",
      "History of DVT/PE with high recurrence risk",
      "Known thrombophilia / thrombogenic mutation",
      "Known ischemic heart disease",
      "History of stroke or TIA",
      "Complicated valvular heart disease",
      "Migraine with aura",
      "Current breast cancer",
      "Severe decompensated cirrhosis",
      "Hepatocellular adenoma or malignant liver tumor",
      "Diabetes with nephropathy, retinopathy, neuropathy, other vascular disease, or duration >20 years",
      "<21 days postpartum",
      "Major surgery with prolonged immobilization",
      "SLE with positive or unknown antiphospholipid antibodies"
    ],
    category3: [
      "Age >=35 and smoking <15 cigarettes/day",
      "Hypertension (SBP 140-159 or DBP 90-99)",
      "Hypertension that is adequately controlled on medication",
      "History of DVT/PE at lower risk for recurrence",
      "Superficial venous thrombosis (current or history)",
      "Past breast cancer (>5 years disease-free)",
      "Malabsorptive bariatric surgery (oral pills only)",
      "Inflammatory bowel disease with increased VTE risk",
      "Postpartum 21-42 days with VTE risk factors",
      "SLE without antiphospholipid antibodies (depending on clinical context)"
    ],
    cat3Counseling: [
      "Category 3 = risks usually outweigh benefits.",
      "This does not always mean \"never,\" but estrogen should generally be avoided unless there is a strong reason and safer alternatives are not acceptable."
    ],
    hardStopText: "A Category 4 condition is present. Do not start estrogen (pill, patch, or ring).",
    alternatives: [
      "POP - daily pill, no estrogen",
      "Hormonal IUD - lighter periods, highly effective",
      "Copper IUD - hormone-free, highly effective",
      "Implant - long-acting, low maintenance",
      "DMPA shot - every 3 months, no estrogen"
    ]
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
        detail: "Lowest estrogen exposure. May reduce estrogen-related side effects, but has the highest rate of breakthrough bleeding (BTB) and less predictable cycle control."
      },
      {
        key: "20 mcg",
        label: "20 mcg",
        helpText: "Low dose",
        detail: "Common starting dose for many patients. Often well tolerated, but unscheduled spotting/BTB is still more common than with 30-35 mcg pills, especially in the first few months, and generally improves with time."
      },
      {
        key: "30-35 mcg",
        label: "30-35 mcg",
        helpText: "High-standard dose",
        detail: "Often provides better cycle control and less BTB, but may be associated with more estrogen-related side effects (for example nausea, breast tenderness, and headaches) in some patients."
      }
    ],
    pearls: [
      "Clinical pearl: EE dose is usually chosen based on bleeding profile and tolerability, not VTE risk alone. Lower-dose pills (10-20 mcg) may be better tolerated but are more likely to cause unscheduled bleeding. If a patient prioritizes predictable bleeding or is having persistent BTB on a lower-dose pill, a 20-35 mcg EE pill may be a better fit if otherwise medically eligible.",
      "VTE pearl: Estrogen dose does matter for overall thrombotic risk, particularly with older 50 mcg EE formulations, which carry higher VTE risk than modern low-dose pills. However, among currently used lower-dose COCs (20 vs 30-35 mcg EE), evidence that lower EE meaningfully reduces VTE risk is limited or inconsistent. In practice, dose selection is usually driven more by CDC MEC eligibility, patient risk factors, bleeding goals, and side-effect profile than by small presumed VTE differences between modern low-dose options."
    ]
  },
  progestin: {
    categories: [
      {
        key: "norethindrone",
        label: "Norethindrone",
        helpText: "1st generation; common, practical option. If BTB is more noticeable, this is usually driven more by the EE dose and formulation than by the progestin itself."
      },
      {
        key: "levonorgestrel",
        label: "Levonorgestrel",
        helpText: "2nd generation; often chosen when cycle control and endometrial stability are priorities, and often used as a lower-VTE-risk reference formulation."
      },
      {
        key: "norgestrel",
        label: "Norgestrel",
        helpText: "2nd generation; older but still commonly encountered in generic formulations and often used when cycle control is a priority."
      },
      {
        key: "third-gen",
        label: "Norgestimate/Desogestrel",
        helpText: "3rd generation; generally less androgenic. Can be helpful when minimizing acne, oily skin, hirsutism, or other androgenic side effects is a priority."
      },
      {
        key: "drospirenone",
        label: "Drospirenone",
        helpText: "4th generation; anti-androgenic plus anti-mineralocorticoid. Often considered for acne, bloating or fluid retention, or PMDD-type symptoms."
      }
    ],
    guideBullets: [
      "Norethindrone / norethindrone acetate (1st generation): Common, practical options with many widely used formulations. Often paired with lower-dose EE pills. If breakthrough bleeding (BTB) is more noticeable, this is usually driven more by the lower estrogen dose and formulation than by the progestin itself.",
      "Levonorgestrel (2nd generation): Often chosen when cycle control and endometrial stability are priorities. Commonly used as a lower-VTE-risk reference formulation among COCs, although evidence is mixed or inconsistent that risk is meaningfully lower compared with other modern progestins.",
      "Norgestrel (2nd generation): Older but still commonly encountered in some widely used generic formulations. Like levonorgestrel, it is often thought of as a practical option when cycle control is a priority.",
      "Norgestimate/Desogestrel: Less androgenic than older progestins. These third-generation options can be helpful when minimizing androgenic side effects is a priority, for example acne, oily skin, or hirsutism, though individual response varies.",
      "Drospirenone (4th generation): Anti-androgenic plus anti-mineralocorticoid. Often considered when patients prioritize acne improvement, less bloating or fluid retention, or PMDD-type symptoms. Some studies suggest a possible small increase in VTE risk compared with levonorgestrel, but evidence is mixed or inconsistent, so patient-specific VTE risk factors and overall CHC eligibility matter more than progestin choice alone."
    ],
    guideNotes: [
      "Clinical pearl: For most patients, progestin choice is driven more by symptom goals and side-effect counseling than by major differences in contraceptive efficacy. Most COCs are similarly effective when taken correctly. In practice, progestin selection is most useful for matching the pill to the patient's priorities, such as cycle control, acne, PMDD-type symptoms, bloating, or minimizing androgenic effects.",
      "VTE / safety pearl: If VTE risk is a major counseling concern in an otherwise CHC-eligible patient, levonorgestrel-containing pills are often used as a lower-risk reference option. However, evidence for clinically meaningful VTE differences between modern low-dose COCs by progestin is not strong enough to outweigh the bigger question: can this patient safely use estrogen at all? In practice, overall CHC eligibility (US MEC) and patient-specific risk factors matter much more than small formulation differences."
    ],
    drospirenoneNote: "Potassium monitoring is only recommended during the first month if the patient is taking other medications that increase potassium (spironolactone, ACE-I, ARBs, or other K-sparing meds)."
  },
  cyclePatterns: {
    categories: [
      {
        key: "21-7",
        label: "21/7",
        helpText: "21 active pills plus 7 placebo or hormone-free days, with a monthly withdrawal bleed."
      },
      {
        key: "24-4",
        label: "24/4",
        helpText: "24 active pills plus 4 placebo or hormone-free days, with a shorter withdrawal interval that may reduce symptoms and improve cycle control."
      },
      {
        key: "extended",
        label: "Extended cycling",
        helpText: "84 active pills plus a short placebo or low-dose EE interval, or similar regimens that give fewer scheduled bleeds."
      },
      {
        key: "continuous",
        label: "Continuous cycling",
        helpText: "No scheduled hormone-free interval, so there is no scheduled withdrawal bleed."
      }
    ],
    guideIntro: "What do the numbers mean?",
    guideBullets: [
      "21/7: 21 active pills plus 7 placebo or hormone-free days -> monthly withdrawal bleed. Traditional and familiar, but the longer hormone-free interval may allow more withdrawal symptoms such as headache, bloating, or pelvic pain.",
      "24/4: 24 active pills plus 4 placebo or hormone-free days -> monthly withdrawal bleed with a shorter hormone-free interval; may reduce withdrawal symptoms and improve cycle control.",
      "24/2/2 (for example Lo Loestrin Fe): 24 active combination pills plus 2 EE-only pills plus 2 placebo or iron pills -> very short withdrawal interval with continued low-dose estrogen exposure; bleeding may be lighter, less predictable, or absent.",
      "Extended cycling (for example 84/7): 84 active pills plus 7 placebo or hormone-free days -> fewer scheduled bleeds, often every 3 months. Some extended regimens use low-dose EE instead of placebo during the interval.",
      "Continuous cycling: no scheduled hormone-free interval -> no scheduled withdrawal bleed. Safe and commonly used for menstrual suppression and for patients who want fewer hormone-withdrawal symptoms.",
      "Other shortened hormone-free interval regimens (less common, for example 26/2): more active days and fewer placebo days; generally intended to reduce withdrawal symptoms and improve cycle control. These are less common and are not the primary focus of this tool."
    ],
    guideNotes: [
      "Clinical pearl: The bleed during placebo days is a withdrawal bleed, not a medically necessary period. It is safe to have fewer periods, or no scheduled bleeding at all, on COCs. Patients do not need a monthly bleed for the pill to clean out the uterus or to make the pill safer.",
      "Practical pearl: Most monophasic COCs can usually be used in an extended or continuous fashion by skipping placebo pills and starting the next pack right away, even if packaged as a traditional cyclic pill. In practice, the formulation matters more than the package instructions.",
      "Counseling pearl: Breakthrough bleeding is common early with extended or continuous use and usually improves over time. If BTB becomes bothersome, first check adherence. Then consider whether the EE dose, formulation, or a shorter hormone-free break may help."
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
      progestin: "Norethindrone acetate",
      cycle: "24/2/2",
      note: "24/2/2; can also be prescribed in extended or continuous fashion"
    },
    {
      name: "Aviane / Vienva / Lessina / Lutera",
      ee: "20",
      progestin: "Levonorgestrel",
      cycle: "21/7",
      note: "21/7; can also be prescribed in extended or continuous fashion"
    },
    {
      name: "Levora / Portia / Marlissa / Kurvelo",
      ee: "30",
      progestin: "Levonorgestrel",
      cycle: "21/7",
      note: "21/7; can also be prescribed in extended or continuous fashion"
    },
    {
      name: "LoSeasonique / Camrese Lo",
      ee: "20",
      progestin: "Levonorgestrel",
      cycle: "Extended cycling",
      note: "Extended (84/7); already packaged for extended cycling"
    },
    {
      name: "Seasonique / Camrese / Daysee",
      ee: "30",
      progestin: "Levonorgestrel",
      cycle: "Extended cycling",
      note: "Extended (84/7); already packaged for extended cycling"
    },
    {
      name: "Introvale / Jolessa / Setlakin",
      ee: "30",
      progestin: "Levonorgestrel",
      cycle: "Extended cycling",
      note: "Extended (84/7); already packaged for extended cycling"
    },
    {
      name: "Amethyst",
      ee: "20",
      progestin: "Levonorgestrel",
      cycle: "Continuous cycling",
      note: "Continuous; already packaged for continuous use"
    },
    {
      name: "Loestrin Fe 1/20 / Junel Fe 1/20 / Blisovi Fe 1/20 / Microgestin Fe 1/20",
      ee: "20",
      progestin: "Norethindrone",
      cycle: "21/7",
      note: "21/7; can also be prescribed in extended or continuous fashion"
    },
    {
      name: "Loestrin Fe 1.5/30 / Junel Fe 1.5/30 / Blisovi Fe 1.5/30 / Microgestin Fe 1.5/30",
      ee: "30",
      progestin: "Norethindrone",
      cycle: "21/7",
      note: "21/7; can also be prescribed in extended or continuous fashion"
    },
    {
      name: "Loestrin 24 Fe / Junel Fe 24 / Blisovi 24 Fe / Taytulla",
      ee: "20",
      progestin: "Norethindrone acetate",
      cycle: "24/4",
      note: "24/4; can also be prescribed in extended or continuous fashion"
    },
    {
      name: "Cryselle / Elinest / Low-Ogestrel",
      ee: "30",
      progestin: "Norgestrel",
      cycle: "21/7",
      note: "21/7; can also be prescribed in extended or continuous fashion"
    },
    {
      name: "Sprintec / Estarylla / Mili",
      ee: "35",
      progestin: "Norgestimate",
      cycle: "21/7",
      note: "21/7; can also be prescribed in extended or continuous fashion"
    },
    {
      name: "Apri / Enskyce / Isibloom",
      ee: "30",
      progestin: "Desogestrel",
      cycle: "21/7",
      note: "21/7; can also be prescribed in extended or continuous fashion"
    },
    {
      name: "Yaz / Gianvi / Nikki / Loryna",
      ee: "20",
      progestin: "Drospirenone",
      cycle: "24/4",
      note: "24/4; can also be prescribed in extended or continuous fashion"
    },
    {
      name: "Yasmin / Ocella / Syeda",
      ee: "30",
      progestin: "Drospirenone",
      cycle: "21/7",
      note: "21/7; can also be prescribed in extended or continuous fashion"
    }
  ]
};
