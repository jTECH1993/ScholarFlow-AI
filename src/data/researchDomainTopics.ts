import { ActiveResearchDomain, ResearchProjectItem } from '../types';

export interface DomainTopicMeta {
  id: ActiveResearchDomain;
  name: string;
  badge: string;
  iconName: 'Heart' | 'Activity' | 'Radio' | 'Cpu' | 'ShieldPlus' | 'Layers';
  color: string;
  textColor: string;
  borderHover: string;
  description: string;
  suggestedQuestions: string[];
  examplePills: { label: string; prompt: string }[];
  relevantKeywords: string[];
  filterModality?: string;
}

export const DOMAIN_TOPICS: DomainTopicMeta[] = [
  {
    id: 'general-academic',
    name: 'Universal Academic Research',
    badge: 'Cross-Disciplinary',
    iconName: 'Layers',
    color: 'text-teal-600 bg-teal-50 border-teal-200',
    textColor: 'text-teal-700',
    borderHover: 'hover:border-teal-300 hover:bg-teal-50/50',
    description: 'Literature synthesis, methodology extraction, empirical benchmark analysis, and peer-reviewed rigor across all scholarly disciplines.',
    suggestedQuestions: [
      'Synthesize the core theoretical and empirical contributions across the ingested papers.',
      'What are the primary methodological differences and baselines across these studies?',
      'Identify key consensus points, controversies, and open research questions in this corpus.',
      'Extract mathematical formulations, algorithmic models, and experimental evaluation metrics.',
      'What threats to validity, limitations, and sample constraints were disclosed by the authors?'
    ],
    examplePills: [
      { label: 'Synthesize contributions', prompt: 'Synthesize the primary thesis, methodology, and key empirical findings across the indexed papers.' },
      { label: 'Compare methodologies', prompt: 'Compare the study designs, experimental pipelines, and evaluation metrics across all manuscripts.' },
      { label: 'Extract benchmarks', prompt: 'Extract reported baseline benchmarks, error bounds, and statistical significance levels into a comparative matrix.' },
      { label: 'Identify limitations', prompt: 'What methodological limitations, boundary conditions, and threats to validity do the authors highlight?' },
      { label: 'Theoretical models', prompt: 'Explain the core theoretical frameworks, loss functions, and governing equations formulated in these papers.' }
    ],
    relevantKeywords: ['methodology', 'empirical', 'framework', 'synthesis', 'benchmark', 'limitations', 'literature'],
    filterModality: 'all'
  },
  {
    id: 'cs-ai',
    name: 'Computer Science & AI',
    badge: 'Algorithms & Models',
    iconName: 'Cpu',
    color: 'text-indigo-500 bg-indigo-50 border-indigo-200',
    textColor: 'text-indigo-600',
    borderHover: 'hover:border-indigo-300 hover:bg-indigo-50/50',
    description: 'Transformer architectures, self-attention, RAG retrieval pipelines, parameter-efficient fine-tuning, and empirical evaluation metrics.',
    suggestedQuestions: [
      'Explain the mathematical formulation of multi-head scaled dot-product attention and computational complexity.',
      'Compare dense vector semantic search against BM25 sparse lexical matching and reciprocal rank fusion.',
      'What are the latency, memory footprint, and FLOPs bottlenecks during LLM prefill vs autoregressive decode?',
      'Detail ablation studies showing the performance contribution of individual architectural components.',
      'How do parameter-efficient fine-tuning techniques (e.g. LoRA, QLoRA) reduce GPU VRAM allocations?'
    ],
    examplePills: [
      { label: 'Attention complexity', prompt: 'Explain the mathematical formulation and memory scaling of self-attention mechanisms.' },
      { label: 'Dense vs Sparse RAG', prompt: 'Compare dense embedding search vs BM25 sparse keyword matching and explain Reciprocal Rank Fusion.' },
      { label: 'PEFT & LoRA tuning', prompt: 'How does LoRA low-rank decomposition enable parameter-efficient model adaptation?' },
      { label: 'Inference benchmarks', prompt: 'Compare latency, throughput, parameter count, and benchmark accuracies across the proposed models.' }
    ],
    relevantKeywords: ['Transformer', 'Attention', 'RAG', 'LoRA', 'Embeddings', 'LLM', 'Inference', 'Benchmark', 'PyTorch'],
    filterModality: 'all'
  },
  {
    id: 'social-sciences',
    name: 'Social Sciences & Economics',
    badge: 'Empirical & Policy',
    iconName: 'ShieldPlus',
    color: 'text-amber-500 bg-amber-50 border-amber-200',
    textColor: 'text-amber-600',
    borderHover: 'hover:border-amber-300 hover:bg-amber-50/50',
    description: 'Econometric identification, randomized control trials, causal inference, public policy, and socio-behavioral empirical modeling.',
    suggestedQuestions: [
      'What causal identification strategies (e.g. difference-in-differences, instrumental variables) were utilized?',
      'How do the authors control for confounding variables, selection bias, and endogeneity?',
      'Summarize empirical regression coefficients, standard error clustering, and statistical significance.',
      'Compare policy recommendations and institutional implications across these publications.',
      'What demographic cohorts and survey sample sizes substantiate the empirical conclusions?'
    ],
    examplePills: [
      { label: 'Causal identification', prompt: 'Analyze the causal identification strategy and instruments used to address endogeneity.' },
      { label: 'Regression findings', prompt: 'Summarize the regression coefficients, effect sizes, and p-values reported in the empirical tables.' },
      { label: 'Policy implications', prompt: 'Synthesize the actionable policy recommendations and socio-economic takeaways.' },
      { label: 'Sample methodology', prompt: 'What sample populations, survey instruments, or longitudinal datasets were analyzed?' }
    ],
    relevantKeywords: ['Econometrics', 'Causal', 'Policy', 'Empirical', 'Regression', 'Endogeneity', 'Cohort', 'Survey'],
    filterModality: 'all'
  },
  {
    id: 'humanities-literature',
    name: 'Literature & Humanities',
    badge: 'Textual & Hermeneutics',
    iconName: 'Layers',
    color: 'text-purple-500 bg-purple-50 border-purple-200',
    textColor: 'text-purple-600',
    borderHover: 'hover:border-purple-300 hover:bg-purple-50/50',
    description: 'Close textual reading, narrative structure, stylistic analysis, historical contextualization, and hermeneutic theory.',
    suggestedQuestions: [
      'Perform a close textual reading of the primary passages cited in these manuscripts.',
      'How do the authors apply narratological frameworks (e.g. focalization, free indirect discourse)?',
      'Examine the historical, socio-cultural, and philosophical context framing the arguments.',
      'What metaphorical tropes, rhetorical structures, and syntactic patterns are identified?',
      'Contrast the theoretical stances of critical theorists cited throughout the texts.'
    ],
    examplePills: [
      { label: 'Close textual reading', prompt: 'Provide a detailed close reading of key verbatim quotations analyzing tone and syntax.' },
      { label: 'Narrative theory', prompt: 'How are narratological concepts like focalization and discourse analyzed in these papers?' },
      { label: 'Historical context', prompt: 'Trace the socio-historical and literary movements that ground the authors\' arguments.' },
      { label: 'Theoretical debate', prompt: 'Contrast the critical theories and hermeneutic traditions engaged across these studies.' }
    ],
    relevantKeywords: ['Literature', 'Narrative', 'Hermeneutics', 'Textual', 'Discourse', 'Rhetoric', 'Poetics', 'Criticism'],
    filterModality: 'all'
  },
  {
    id: 'natural-sciences',
    name: 'Natural Sciences & Physics',
    badge: 'Empirical & Physical',
    iconName: 'Radio',
    color: 'text-sky-500 bg-sky-50 border-sky-200',
    textColor: 'text-sky-600',
    borderHover: 'hover:border-sky-300 hover:bg-sky-50/50',
    description: 'Physical laws, governing differential equations, thermodynamic constraints, laboratory protocols, and quantitative measurements.',
    suggestedQuestions: [
      'Derive the primary mathematical models and physical governing equations presented.',
      'What experimental apparatus, measurement instruments, and calibration protocols were employed?',
      'How do observed laboratory measurements compare against theoretical analytical solutions?',
      'What measurement uncertainties, error propagations, and systematic biases are accounted for?',
      'Synthesize empirical phase diagrams, thermodynamic equilibria, or spectral observations.'
    ],
    examplePills: [
      { label: 'Governing equations', prompt: 'Extract and explain the mathematical derivations and physical governing equations.' },
      { label: 'Experimental setup', prompt: 'Detail the laboratory apparatus, sensor calibration, and experimental protocol.' },
      { label: 'Error propagation', prompt: 'How do the authors quantify experimental uncertainties and systematic errors?' },
      { label: 'Empirical vs Theory', prompt: 'Compare the empirical laboratory observations against theoretical predictions.' }
    ],
    relevantKeywords: ['Physics', 'Equations', 'Derivation', 'Experimental', 'Measurement', 'Thermodynamic', 'Uncertainty'],
    filterModality: 'all'
  },
  {
    id: 'biomedical-sensing',
    name: 'Biomedical & Signal Sensing',
    badge: 'Physiological Telemetry',
    iconName: 'Activity',
    color: 'text-rose-500 bg-rose-50 border-rose-200',
    textColor: 'text-rose-600',
    borderHover: 'hover:border-rose-300 hover:bg-rose-50/50',
    description: 'Physiological signal acquisition, PPG optics, ECG fiducials, contactless RF radar, and clinical gold-standard validation.',
    suggestedQuestions: [
      'How do wearable and contactless sensors capture cardiopulmonary vital signs?',
      'What filtering and signal decomposition algorithms suppress motion artifacts?',
      'Compare sensor accuracy against clinical gold standards (e.g. arterial line, polysomnography).',
      'What are the physiological calibration models relating pulse wave dynamics to blood pressure?',
      'Summarize clinical validation protocols under regulatory standards (IEEE 1708, ISO 81060-2).'
    ],
    examplePills: [
      { label: 'Physiological sensors', prompt: 'Compare optical PPG, bioimpedance, and radar sensing principles for vital monitoring.' },
      { label: 'Artifact filtering', prompt: 'What DSP and adaptive filtering methods isolate true biological waveforms from movement?' },
      { label: 'Clinical validation', prompt: 'How are algorithms validated against clinical ground truths and patient cohorts?' },
      { label: 'Calibration models', prompt: 'Explain the mathematical models relating pulse transit time to arterial elasticity.' }
    ],
    relevantKeywords: ['PPG', 'ECG', 'Radar', 'Sensors', 'Vital Signs', 'Hemodynamics', 'Clinical', 'AAMI'],
    filterModality: 'all'
  }
];

export const DEMO_PROJECTS: ResearchProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Transformer Attention & Efficient KV-Cache Architectures',
    paperCount: 8,
    updatedAgo: 'Updated 2 days ago',
    category: 'Computer Science',
    description: 'Systematic analysis of linear attention, FlashAttention tiling, and parameter-efficient quantization in large models.',
    tags: ['Attention', 'Transformers', 'Inference', 'Efficiency']
  },
  {
    id: 'proj-2',
    title: 'Empirical Econometric Modeling & Monetary Policy',
    paperCount: 6,
    updatedAgo: 'Updated 4 days ago',
    category: 'Economics',
    description: 'Causal identification and vector autoregression on inflation dynamics across OECD countries.',
    tags: ['Econometrics', 'Causal Inference', 'Macroeconomics', 'Panel Data']
  },
  {
    id: 'proj-3',
    title: 'Narrative Discourse & Hermeneutics in Modern Literature',
    paperCount: 7,
    updatedAgo: 'Updated 1 week ago',
    category: 'Literature',
    description: 'Investigation into free indirect discourse, epistemic skepticism, and modernist stylistic poetics.',
    tags: ['Narratology', 'Hermeneutics', 'Modernism', 'Stylistics']
  },
  {
    id: 'proj-4',
    title: 'Non-Invasive Physiological Sensing & Biosensors',
    paperCount: 10,
    updatedAgo: 'Updated 2 weeks ago',
    category: 'Biomedical Engineering',
    description: 'Cardiopulmonary waveform extraction and clinical gold-standard validation methodologies.',
    tags: ['Biosensors', 'Signal Processing', 'Clinical Validation', 'Telemetry']
  }
];

export const UNIVERSAL_RESEARCH_QUERIES = [
  {
    title: 'Cross-Paper Methodological Synthesis',
    query: 'Synthesize and contrast the methodological frameworks and experimental baselines across the uploaded papers.'
  },
  {
    title: 'Benchmark Metrics & Datasets',
    query: 'What datasets or corpora were evaluated in these studies, and what were the reported baseline benchmark metrics?'
  },
  {
    title: 'Theoretical Frameworks & Governing Equations',
    query: 'What core theoretical principles, mathematical formulations, or governing models are proposed in these papers?'
  },
  {
    title: 'Limitations & Critical Research Gaps',
    query: 'Identify the unaddressed limitations, conflicting findings, and open challenges highlighted by the authors.'
  },
  {
    title: 'Executive Key Contributions',
    query: 'Provide a structured executive synthesis of the primary scientific contributions and novelty claims of each paper.'
  }
];
