window.COC_CONTENT = {
  siteName: 'Combined Oral Contraceptive Pill Selection',
  sdm: {
    heading: 'Shared Decision-Making in Contraceptive Counseling',
    audienceLabel: 'For the resident clinician',
    whyThisMattersHeading: 'Why This Matters',
    whyThisMattersIntro: 'Contraceptive counseling is not just about pregnancy prevention.',
    whyThisMatters: [],
    whyThisMattersParagraphs: [
      'Patients seek contraception for many reasons, including pregnancy prevention, menstrual suppression, treatment of heavy bleeding or dysmenorrhea, management of endometriosis symptoms, acne, hirsutism, PMDD, or simply greater control over their reproductive lives.',
      'Access to contraception is also a matter of health equity and reproductive autonomy. When patients cannot reliably control if and when they become pregnant, the effects can extend beyond medical outcomes to physical and mental health, educational opportunities, employment, financial stability, and overall quality of life.',
      'In primary care, we are often the most accessible clinicians for contraceptive care. Our comfort and competence in contraceptive counseling can reduce barriers to care, prevent unnecessary referrals, and meaningfully improve patient outcomes.'
    ],
    approachHeading: 'Approach: Patient-Centered, Evidence-Based',
    approachIntro: 'The CDC and ACOG emphasize that contraceptive counseling should be:',
    approachBullets: [
      'Patient-centered and non-directive',
      'Grounded in reproductive autonomy',
      'Free of coercion and judgment',
      'Clear about risks, benefits, and alternatives',
      'Aligned with both patient goals and medical safety'
    ],
    roleStatement: 'Your role is not to "pick the best pill."',
    roleBullets: [
      'Medically safe',
      'Consistent with their priorities',
      'Realistic for their lifestyle',
      'Acceptable and sustainable for them'
    ],
    roleIntro: 'Your role is to help the patient choose a method that is:',
    roleClosing: 'The best contraceptive method is not the one with the highest efficacy on paper - it is the one that is safe, desired, and workable in the context of the patient\'s real life.'
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
      '10 mcg - Ultra-low dose: lowest estrogen exposure; may reduce estrogen-related side effects, but breakthrough bleeding is more common and cycles may be less predictable',
      '20 mcg - Low dose: often used as a starting point; generally well tolerated, though spotting is more common than with higher-dose pills',
      '30-35 mcg - Standard dose: may improve bleeding predictability and reduce breakthrough bleeding, but estrogen-related side effects may be more noticeable (e.g., nausea, breast tenderness, headaches, bloating)'
    ],
    pearls: [
      'Clinical pearl: Lower EE doses are often better tolerated but more likely to cause unscheduled bleeding; 30-35 mcg EE may be a better fit when cycle predictability is a priority or breakthrough bleeding occurs.',
      'Clinical pearl: Estrogen dose matters for VTE risk overall - older 50 mcg EE pills have higher VTE risk than modern low-dose pills. However, within currently used low-dose formulations (20 vs 30-35 mcg EE), evidence that lower EE meaningfully reduces VTE risk is limited; in practice, dose selection is usually driven more by bleeding profile, tolerability, and overall CHC eligibility/risk factors than by small presumed VTE differences.'
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
  recommendationOutput: {
    sideEffectsPlaceholder: [
      '[Placeholder] Add common side effects counseling bullets tailored to selected formulation.',
      '[Placeholder] Add red-flag symptoms that should prompt urgent follow-up.',
      '[Placeholder] Add expected timeline for side-effect improvement after initiation.'
    ],
    startingMedicationPlaceholder: [
      '[Placeholder] Add Sunday-start and quick-start instructions with backup duration.',
      '[Placeholder] Add guidance for same-day start when reasonably certain not pregnant.',
      '[Placeholder] Add practical adherence tips (daily timing, reminders, refill planning).'
    ],
    epicOrderingPlaceholder: [
      '[Placeholder] Add Epic order set name/path for combined oral contraceptive prescriptions.',
      '[Placeholder] Add default quantity/refill workflow for common starter prescriptions.',
      '[Placeholder] Add documentation smartphrase or counseling checklist for visit notes.'
    ]
  },
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
