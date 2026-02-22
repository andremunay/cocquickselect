window.COC_CONTENT = {
  siteName: 'COC QuickSelect',
  sdm: {
    heading: 'Shared Decision-Making for COC Selection',
    audienceLabel: 'Use this section as a counseling framework during COC selection visits.',
    whyThisMatters: [
      'Engage patient in choosing a COC based on safety, lifestyle, and non-contraceptive benefits.',
      'ACOG emphasizes counseling should be patient-centered and support reproductive autonomy.'
    ],
    equityParagraphs: [
      'Use a nonjudgmental, trauma-informed, and culturally responsive approach so each patient can identify the option that best fits their goals and context.',
      'Ask about access barriers (cost, transportation, pharmacy access, privacy, language, and follow-up feasibility) and incorporate these realities into method selection.'
    ],
    approachIntro: 'A practical approach for initial prescribing is to prioritize simplicity first, then tailor to symptom and cycle goals.',
    approachBullets: [
      'Offer monophasic COCs first — easiest to use and simplest for continuous or extended cycling.',
      'Always review CDC/WHO/ACOG Medical Eligibility Criteria before initiation.'
    ],
    roleStatement: 'Clinician role: provide clear risk/benefit counseling and recommendation options while preserving patient choice.',
    roleBullets: [
      'Confirm understanding with teach-back and shared plan documentation.',
      'Arrange follow-up for side effects, bleeding changes, blood pressure checks, and adherence troubleshooting.'
    ],
  },
  contraindications: {
    category4: [
      'Age ≥35 and smoking ≥15 cigarettes/day',
      'Multiple cardiovascular risk factors (e.g., older age, smoking, diabetes, hypertension)',
      'Hypertension ≥160/100 mmHg',
      'Venous thromboembolism (unless on full anticoagulation)',
      'Known ischemic heart disease',
      'History of stroke',
      'Complicated valvular heart disease (pulmonary HTN, atrial fibrillation, or endocarditis risk)',
      'Current breast cancer',
      'Severe decompensated cirrhosis',
      'Hepatocellular adenoma or malignant hepatoma',
      'Migraine with aura',
      'Diabetes >20 years or with complications (nephropathy, retinopathy, neuropathy)',
      'Known thrombogenic variants (e.g., Factor V Leiden) — generally contraindicated; may consider only in mild cases without personal or family VTE history'
    ],
    category3: [
      'Age ≥35 and smoking <15 cigarettes/day',
      'Hypertension (SBP 140–159 or DBP 90–99)',
      'Hypertension controlled on meds',
      'Past breast cancer (>5 years, no current disease)',
      'Malabsorptive bariatric surgery (decreased absorption; recommend non-oral methods)',
      'Superficial venous thrombosis (current or history)',
      'Inflammatory bowel disease with VTE risk factors (active disease, surgery, immobilization, corticosteroids, vitamin deficiencies, dehydration)'
    ],
    cat3Counseling: [
      'COCs are generally not recommended because risks usually outweigh benefits; may be considered only if no better alternatives after thorough counseling on potential risks.',
      'Ongoing follow-up is recommended to ensure continued safety.'
    ],
    hardStopText: 'Do NOT prescribe COCs. Consider alternative contraception options.',
    alternatives: ['POP (placeholder)', 'IUD (placeholder)', 'Implant (placeholder)', 'Shot (placeholder)']
  },
  estrogen: {
    intro: [
      'All modern low-dose COCs (≤35 mcg EE) are similarly effective at preventing pregnancy.',
      'Starting with 20 mcg EE is reasonable when concerned about side effects.',
      'Increase to 30–35 mcg if breakthrough bleeding persists.',
      'Estrogen side effects: nausea, breast tenderness, headaches, bloating, melasma, increased vaginal discharge; risk tends to increase with higher estrogen exposure.',
      'Providers can prioritize tolerability when selecting EE dose without compromising contraceptive effectiveness.'
    ],
    options: [
      '10 mcg — Ultra-low dose (minimizes estrogen side effects; highest BTB risk; less predictable cycles)',
      '20 mcg — Low dose (preferred starting dose; fewer estrogen side effects; moderate unscheduled bleeding esp. first 3–6 months)',
      '30–35 mcg — Standard dose (best cycle control; fewer BTB issues; more estrogen-related side effects)'
    ]
  },
  progestin: {
    options: [
      '1st gen — Norethindrone (lower potency; good if estrogen-sensitive; more BTB)',
      '2nd gen — Levonorgestrel (strong cycle control; heavy bleeding; may be slightly lower VTE risk)',
      '3rd gen — Desogestrel or Norgestimate (less androgenic; acne/hirsutism; fewer androgenic side effects)',
      '4th gen — Drospirenone (anti-androgenic + anti-mineralocorticoid; PMDD/bloating/acne/weight or mood concerns; may ↑ VTE risk vs LNG)'
    ],
    drospirenoneNote: 'Potassium monitoring is only recommended during the first month if the patient is taking other medications that increase potassium (spironolactone, ACE-I, ARBs, or other K-sparing meds).'
  },
  cyclePatterns: [
    '21/7 — Standard regimen, monthly withdrawal bleed',
    '24/4 — May result in lighter bleeding and fewer hormone withdrawal symptoms',
    '84/7 — Bleeding every 3 months; good for menstrual suppression',
    'Continuous — No placebo/hormone-free interval; no scheduled withdrawal bleeding; safe for endometrial stability if using a monophasic COC'
  ],
  missedPill: [
    'Miss 1: Take ASAP, continue as usual.',
    'Miss ≥2: Follow catch-up rules + use back-up x7 days.'
  ],
  medications: [
    {name: 'Lo Loestrin Fe', ee: '10 mcg', progestin: '1st gen', cycle: '24/2/2', detail: 'EE 10 mcg / Norethindrone 1 mg', note: 'ultra-low dose EE; no generic'},
    {name: 'Loestrin 1/20', ee: '20 mcg', progestin: '1st gen', cycle: '21/7', detail: 'EE 20 mcg / Norethindrone 1 mg', note: 'Generics: Junel Fe 1/20, Blisovi Fe 1/20, Microgestin Fe 1/20'},
    {name: 'Loestrin 24 Fe', ee: '20 mcg', progestin: '1st gen', cycle: '24/4', detail: 'EE 20 mcg / Norethindrone 1 mg', note: 'Generics: Blisovi 24 Fe, Junel Fe 24, Hailey 24 Fe'},
    {name: 'Femlyv (ODT)', ee: '20 mcg', progestin: '1st gen', cycle: '24/4', detail: 'EE 20 mcg / Norethindrone acetate 1 mg', note: 'Orally disintegrating tablet (ODT) for difficulty swallowing'},
    {name: 'Aviane', ee: '20 mcg', progestin: '2nd gen', cycle: '21/7 or 24/4', detail: 'EE 20 mcg / LNG 0.1 mg', note: 'Generic: Lessina'},
    {name: 'Levora / Nordette / Marlissa', ee: '30 mcg', progestin: '2nd gen', cycle: '21/7', detail: 'EE 30 mcg / LNG 0.15 mg'},
    {name: 'Seasonale', ee: '30 mcg', progestin: '2nd gen', cycle: '84/7', detail: 'EE 30 mcg / LNG 0.15 mg', note: 'Generic: Jolessa'},
    {name: 'Seasonique', ee: '30 mcg', progestin: '2nd gen', cycle: '84/7', detail: 'EE 30 mcg / LNG 0.15 mg', note: 'Listed as biphasic in the document. Generics: Amethia, Camrese'},
    {name: 'Desogen', ee: '30 mcg', progestin: '3rd gen', cycle: '21/7', detail: 'EE 30 mcg / Desogestrel 0.15 mg', note: 'Generics: Apri, Reclipsen'},
    {name: 'Ortho-Cept', ee: '30 mcg', progestin: '3rd gen', cycle: '21/7', detail: 'EE 30 mcg / Desogestrel 0.15 mg', note: 'Generics: Isibloom, Caziant'},
    {name: 'Ortho-Cyclen', ee: '35 mcg', progestin: '3rd gen', cycle: '21/7', detail: 'EE 35 mcg / Norgestimate 0.25 mg', note: 'Generics: Sprintec, MonoNessa, Estarylla'},
    {name: 'Yaz', ee: '20 mcg', progestin: '4th gen', cycle: '24/4', detail: 'EE 20 mcg / Drospirenone 3 mg', note: 'Generics: Loryna, Vestura, Nikki. FDA-approved for PMDD and moderate acne'},
    {name: 'Yasmin', ee: '30 mcg', progestin: '4th gen', cycle: '21/7', detail: 'EE 30 mcg / Drospirenone 3 mg', note: 'Generics: Ocella, Syeda, Zarah'},
    {name: 'Beyaz', ee: '20 mcg', progestin: '4th gen', cycle: '24/4', detail: 'EE 20 mcg / Drospirenone 3 mg + levomefolate calcium'},
    {name: 'Safyral', ee: '30 mcg', progestin: '4th gen', cycle: '21/7', detail: 'EE 30 mcg / Drospirenone 3 mg + levomefolate calcium'}
  ]
};
