export type ResearchDomainId = 
  | 'english-literature'
  | 'computer-science-ai'
  | 'biomedical-clinical'
  | 'social-sciences-econ'
  | 'physics-engineering'
  | 'custom';

export interface ResearchDomainConfig {
  id: ResearchDomainId;
  name: string;
  badge: string;
  tagline: string;
  iconName: string;
  accentColor: string;
  samplePapersDescription: string;
  anatomyLabels: {
    thesis: string;
    methodology: string;
    corpus: string;
    keyFindings: string;
    evidenceType: string;
    limitations: string;
  };
  suggestedQuestions: string[];
  systemPromptGuideline: string;
}

export const RESEARCH_DOMAINS: ResearchDomainConfig[] = [
  {
    id: 'english-literature',
    name: 'English Literature, Linguistics & Humanities',
    badge: 'Humanities & Lit',
    tagline: 'Textual hermeneutics, stylistic corpus analysis, narrative theory & critical discourse',
    iconName: 'BookOpen',
    accentColor: 'from-amber-600 to-rose-700',
    samplePapersDescription: 'Literary criticism, corpus stylistics, syntax, narrative frameworks & rhetoric',
    anatomyLabels: {
      thesis: 'Central Thesis & Critical Argument',
      methodology: 'Critical / Hermeneutic Framework (e.g., Close Reading, Distant Reading, Stylistics)',
      corpus: 'Primary Literary Corpus & Textual Editions',
      keyFindings: 'Thematic Interpretations & Textual Insights',
      evidenceType: 'Key Textual Passages, Rhetorical Figures & Quotes',
      limitations: 'Interpretive Scope, Counter-Readings & Gaps'
    },
    suggestedQuestions: [
      'Extract the primary thesis, critical framework, and textual corpus analyzed in each paper.',
      'Compare how narrative perspective, tone, and character agency are theorized across the uploaded texts.',
      'Identify consensus and scholarly disputes between critics regarding thematic symbolism and historical context.',
      'Compile an annotated quotation bank of the most pivotal textual excerpts cited as primary evidence.',
      'Synthesize a comprehensive literature review exploring the ideological and linguistic tensions highlighted.'
    ],
    systemPromptGuideline: 'You are an elite Senior Research Fellow in English Literature, Comparative Poetics, and Computational Linguistics. Analyze documents with rigorous hermeneutic depth, cite exact textual passages with line/page references, evaluate rhetorical strategies, ideological contexts, and synthesize nuanced critical dialogues between scholars.'
  },
  {
    id: 'computer-science-ai',
    name: 'Computer Science, AI & Data Engineering',
    badge: 'CS & AI Systems',
    tagline: 'Algorithmic architectures, theoretical bounds, empirical benchmarks & ablation studies',
    iconName: 'Cpu',
    accentColor: 'from-indigo-600 to-cyan-700',
    samplePapersDescription: 'Transformers, retrieval-augmented generation, optimization, and system latency',
    anatomyLabels: {
      thesis: 'Core Architectural Novelty & Hypothesis',
      methodology: 'Model Architecture, Training Objective & Optimization Algorithm',
      corpus: 'Benchmark Datasets & Evaluation Protocols',
      keyFindings: 'Empirical Results, SOTA Comparisons & Ablations',
      evidenceType: 'Mathematical Formulations, Pseudocode & Proofs',
      limitations: 'Computational Complexity, Failure Modes & Edge Cases'
    },
    suggestedQuestions: [
      'Summarize the core architectural innovations, loss formulations, and baseline comparisons.',
      'Construct a comparative benchmark matrix comparing parameters, latency, and accuracy metrics.',
      'What are the primary theoretical limitations, scaling bottlenecks, or hardware dependencies reported?',
      'Extract the exact mathematical formulas, loss functions, and algorithmic pseudocode.',
      'Generate an integrated related-work review positioning these contributions within current SOTA.'
    ],
    systemPromptGuideline: 'You are a Principal AI Scientist and Theoretical Computer Science Researcher. Focus on formal mathematical rigor, complexity bounds, benchmark evaluation metrics (accuracy, latency, memory footprint), architectural trade-offs, and critical ablation insights.'
  },
  {
    id: 'biomedical-clinical',
    name: 'Biomedical, Clinical & Health Sciences',
    badge: 'Clinical Sciences',
    tagline: 'Physiological transduction, clinical trials, gold-standard telemetry & patient outcomes',
    iconName: 'Stethoscope',
    accentColor: 'from-teal-600 to-emerald-800',
    samplePapersDescription: 'Non-invasive vitals, hemodynamics, biosensors, ICU sepsis & telemetry',
    anatomyLabels: {
      thesis: 'Clinical Unmet Need & Target Pathology',
      methodology: 'Transduction Mechanism, Biosensor Hardware & Signal Processing',
      corpus: 'Patient Cohort, Clinical Protocol & Ground Truth Reference',
      keyFindings: 'Diagnostic Sensitivity/Specificity, MAE & Clinical Benchmarks',
      evidenceType: 'Physiological Equations, Waveform Fiducials & Validation Curves',
      limitations: 'Motion Artifacts, Calibration Drift & Demographic Biases'
    },
    suggestedQuestions: [
      'Detail the biological sensing physics, analog transducer specifications, and sampling protocol.',
      'Compare estimation accuracy (MAE, RMSE, Bland-Altman limits) against gold-standard arterial/ECG lines.',
      'What motion artifact mitigations or demographic calibration strategies were validated?',
      'Formulate a systematic clinical review evaluating readiness for bedside ICU deployment.'
    ],
    systemPromptGuideline: 'You are a Senior Biomedical Systems Architect and Clinical Research Director. Ground all responses in physiological mechanics, sensor transduction physics, international regulatory guidelines (AAMI/ISO/IEEE), and patient outcome evidence.'
  },
  {
    id: 'social-sciences-econ',
    name: 'Social Sciences, Economics & Policy',
    badge: 'Economics & Policy',
    tagline: 'Econometric identification, causal inference, empirical surveys & policy evaluation',
    iconName: 'TrendingUp',
    accentColor: 'from-blue-600 to-violet-800',
    samplePapersDescription: 'Difference-in-differences, randomized trials, behavioral surveys & macro policy',
    anatomyLabels: {
      thesis: 'Research Question & Theoretical Proposition',
      methodology: 'Identification Strategy (e.g. DiD, IV, Regression Discontinuity, Survey)',
      corpus: 'Empirical Sample, Longitudinal Panel & Demographic Controls',
      keyFindings: 'Estimated Coefficients, Elasticities, Effect Sizes & Significance',
      evidenceType: 'Econometric Specifications & Structural Models',
      limitations: 'Endogeneity, Selection Bias & External Validity'
    },
    suggestedQuestions: [
      'What identification strategy is used to establish causal inference rather than correlation?',
      'Summarize the sample demographics, treatment variables, and control specifications.',
      'Synthesize conflicting empirical findings on policy effectiveness and statistical significance.',
      'What are the primary threats to internal and external validity highlighted by the authors?'
    ],
    systemPromptGuideline: 'You are an Empirical Social Science and Econometrics Fellow. Prioritize causal identification mechanisms, endogeneity diagnostics, instrumental variables, statistical significance levels, and actionable policy takeaways.'
  },
  {
    id: 'physics-engineering',
    name: 'Physical Sciences & Engineering',
    badge: 'Physics & Engineering',
    tagline: 'Governing differential equations, boundary mechanics, finite element & experimental validation',
    iconName: 'Atom',
    accentColor: 'from-orange-600 to-stone-800',
    samplePapersDescription: 'Electromagnetics, materials science, continuum mechanics & thermodynamics',
    anatomyLabels: {
      thesis: 'Physical Phenomenon & Scientific Objective',
      methodology: 'Theoretical Derivation, Continuum Modeling & Simulation Solver',
      corpus: 'Experimental Apparatus, Calibration Standards & Test Specimens',
      keyFindings: 'Empirical Validation, Material Constants & Phenomenological Laws',
      evidenceType: 'Governing Partial Differential Equations & Boundary Conditions',
      limitations: 'Idealized Assumptions, Uncertainty Quantification & Thermal/Stress Limits'
    },
    suggestedQuestions: [
      'Extract the governing partial differential equations and constitutive relations.',
      'Describe the experimental test bench, sensor calibration, and instrumentation accuracy.',
      'Compare numerical simulation results with physical prototype measurements.',
      'Identify thermodynamic or structural failure envelopes and boundary constraints.'
    ],
    systemPromptGuideline: 'You are a Senior Research Physicist and Mechanical Systems Engineer. Emphasize first-principles conservation laws, dimensional analysis, experimental uncertainty propagation, and material constitutive relations.'
  },
  {
    id: 'custom',
    name: 'Custom Research Domain (User Configurable)',
    badge: 'Custom Domain',
    tagline: 'Define your own specialized academic discipline, extraction schema & research ontology',
    iconName: 'Sliders',
    accentColor: 'from-slate-700 to-slate-900',
    samplePapersDescription: 'Tailored for interdisciplinary studies, emerging fields, law, arts, or proprietary archives',
    anatomyLabels: {
      thesis: 'Core Inquiry & Hypothesis',
      methodology: 'Investigative Methodology & Design',
      corpus: 'Empirical Data / Textual Corpus / Sources',
      keyFindings: 'Key Discoveries & Conclusions',
      evidenceType: 'Supporting Evidence, Quotations & Data Points',
      limitations: 'Scope, Unresolved Questions & Constraints'
    },
    suggestedQuestions: [
      'Extract and synthesize the core arguments across all uploaded manuscripts.',
      'Build a structured cross-paper matrix contrasting methodologies and empirical claims.',
      'Highlight areas of mutual corroboration and theoretical divergence across the documents.',
      'Draft a comprehensive systematic literature synthesis ready for peer review.'
    ],
    systemPromptGuideline: 'You are a Universal Academic Intelligence Research Fellow. Tailor your analytical vocabulary and critical synthesis directly to the researcher’s custom domain guidelines, preserving high academic rigor, structured evidentiary support, and exact citations.'
  }
];
