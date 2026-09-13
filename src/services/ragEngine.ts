import { VitalSignPaper, PaperChunk, RetrievedChunk, Citation } from '../types';
import { VITAL_SIGN_PAPERS } from '../data/vitalSignPapers';

// Biomedical stop words to filter out for cleaner keyword vector computation
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot',
  'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each',
  'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d',
  'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i',
  'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s',
  'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll',
  'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll',
  'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while',
  'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll',
  'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_\-\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));
}

function computeTF(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }
  return tf;
}

// Advanced universal query expansion across Humanities, AI/CS, and Sciences
function expandQueryTokens(tokens: string[]): string[] {
  const expanded = new Set<string>(tokens);
  const lowerTokens = tokens.map(t => t.toLowerCase());

  // English Literature, Linguistics & Humanities
  if (lowerTokens.some(t => ['literature', 'literary', 'criticism', 'author', 'novel', 'drama', 'play', 'soliloquy', 'narrative', 'rhetoric', 'deixis', 'focalization', 'discourse', 'metaphor', 'stylistics', 'shakespeare', 'postcolonial', 'hermeneutics', 'poetry', 'poem', 'thesis'].includes(t))) {
    ['soliloquy', 'narrative', 'focalization', 'deictic', 'metaphor', 'poetics', 'embodied', 'cognition', 'stylistics', 'corpus', 'postcolonial', 'transitivity', 'nominalization', 'irony', 'scepticism', 'close', 'reading', 'rhetoric', 'textual', 'trope', 'subversion', 'hegemony', 'agency'].forEach(t => expanded.add(t));
  }

  // Computer Science & AI Systems
  if (lowerTokens.some(t => ['ai', 'model', 'transformer', 'attention', 'rag', 'retrieval', 'lora', 'fine-tuning', 'benchmark', 'latency', 'nlp', 'algorithm', 'bleu', 'sota', 'weights', 'loss', 'layer'].includes(t))) {
    ['transformer', 'attention', 'multi-head', 'retrieval', 'augmented', 'generation', 'dense', 'passage', 'lora', 'low-rank', 'adaptation', 'constitutional', 'alignment', 'rlhf', 'rlaif', 'embeddings', 'faiss', 'parameters', 'flops', 'tokens'].forEach(t => expanded.add(t));
  }

  // Foundational Vital Signs & Clinical
  if (lowerTokens.some(t => ['vital', 'sign', 'signs', 'vitals', 'physiological', 'hemodynamic'].includes(t))) {
    ['vital', 'signs', 'physiological', 'hemodynamic', 'monitoring', 'heart', 'rate', 'blood', 'pressure', 'respiratory', 'respiration', 'temperature', 'spo2', 'pulse'].forEach(t => expanded.add(t));
  }

  // Blood Pressure & PTT / PAT / PWV / PINNs
  if (lowerTokens.some(t => ['ptt', 'pat', 'pwv', 'bp', 'cuffless', 'hypertension', 'systolic', 'diastolic', 'moens', 'hughes', 'pinn', 'pinns'].includes(t))) {
    ['pulse', 'transit', 'time', 'arrival', 'velocity', 'arterial', 'stiffness', 'compliance', 'elasticity', 'moens', 'korteweg', 'hughes', 'systolic', 'diastolic', 'cuffless', 'blood', 'pressure', 'pinn', 'a-line'].forEach(t => expanded.add(t));
  }

  // Remote rPPG camera & melanin bias
  if (lowerTokens.some(t => ['rppg', 'pos', 'chrom', 'remote', 'camera', 'facial', 'video', 'melanin', 'skin'].includes(t))) {
    ['photoplethysmography', 'facial', 'video', 'ambient', 'chrominance', 'orthogonal', 'pos', 'chrom', 'melanin', 'fitzpatrick', 'ubfc', 'pure', 'deepphys'].forEach(t => expanded.add(t));
  }

  // IR-UWB Impulse Radar & Through-Wall / Disaster Rubble Sensing
  if (lowerTokens.some(t => ['iruwb', 'ir-uwb', 'uwb', 'impulse', 'through-wall', 'rubble', 'trapped', 'disaster'].includes(t))) {
    ['iruwb', 'ir-uwb', 'uwb', 'impulse', 'radio', 'ultra-wideband', 'through-wall', 'rubble', 'trapped', 'disaster', 'svd', 'singular', 'value', 'decomposition', 'sub-nanosecond', 'monocycle', 'gaussian', 'time-of-flight', 'ets', 'novelda', 'xethru', 'vivaldi', 'penetration', 'debris'].forEach(t => expanded.add(t));
  }

  // Radar FMCW & Millimeter-Wave
  if (lowerTokens.some(t => ['fmcw', 'chirp', 'mmwave', '60ghz', '77ghz', 'iwr6843', 'iwr1443'].includes(t))) {
    ['fmcw', 'frequency-modulated', 'continuous-wave', 'chirp', 'mmwave', '60ghz', 'iwr6843', 'beat', 'frequency', 'intermediate', 'phase', 'interferometry', 'arctangent', 'demodulation'].forEach(t => expanded.add(t));
  }

  // General Radar / RF Sensing
  if (lowerTokens.some(t => ['radar', 'rf', 'contactless', 'microwave', 'displacement', 'phase', 'interferometry'].includes(t))) {
    ['radar', 'fmcw', 'uwb', 'iruwb', 'ghz', 'chest', 'displacement', 'phase', 'interferometry', 'demodulation', 'vital', 'doppler', 'ballistocardiogram', 'ti', 'iwr6843'].forEach(t => expanded.add(t));
  }

  // MIMO Radar & Multi-Patient Beamforming
  if (lowerTokens.some(t => ['mimo', 'beamforming', 'mvdr', 'capon', 'aoa', 'multi-patient', 'crosstalk'].includes(t))) {
    ['mimo', 'beamforming', 'mvdr', 'capon', 'steering', 'vector', 'virtual', 'array', 'angle-of-arrival', 'spatial', 'crosstalk', 'multi-patient'].forEach(t => expanded.add(t));
  }

  // WiFi CSI Sensing
  if (lowerTokens.some(t => ['wifi', 'csi', 'fresnel', 'subcarrier', 'ofdm'].includes(t))) {
    ['wifi', 'csi', 'channel', 'state', 'information', 'fresnel', 'subcarrier', 'ofdm', 'cfr', 'phase', 'sanitization'].forEach(t => expanded.add(t));
  }

  // CW Doppler Radar
  if (lowerTokens.some(t => ['doppler', 'cw', '24ghz', 'homodyne', 'recoil'].includes(t))) {
    ['cw', 'continuous-wave', 'doppler', 'recoil', 'homodyne', 'quadrature', '24ghz', 'null', 'circle-fitting'].forEach(t => expanded.add(t));
  }

  // Precordial Radar Seismocardiography (SCG)
  if (lowerTokens.some(t => ['scg', 'seismocardiography', 'precordial', 'valve', 'avo', 'pep', 'lvet'].includes(t))) {
    ['scg', 'seismocardiography', 'precordial', 'acceleration', 'aortic', 'valve', 'avo', 'mvc', 'pep', 'lvet'].forEach(t => expanded.add(t));
  }

  // Respiratory Rate & Capnography & Bioimpedance
  if (lowerTokens.some(t => ['respiratory', 'breathing', 'capnography', 'stridor', 'bioimpedance', 'bioz', 'oird'].includes(t))) {
    ['respiratory', 'breathing', 'capnography', 'stridor', 'bioimpedance', 'bioz', 'pneumography', 'tidal', 'volume', 'minute', 'ventilation', 'oird', 'hypopnea', 'cheyne-stokes'].forEach(t => expanded.add(t));
  }

  // Sepsis & ICU deterioration
  if (lowerTokens.some(t => ['sepsis', 'deterioration', 'sirs', 'icu', 'alarm', 'alert', 'news2', 'shock'].includes(t))) {
    ['sepsis', 'deterioration', 'sirs', 'infection', 'shock', 'mortality', 'news2', 'telemetry', 'tachycardia', 'hypotension', 'sofa', 'burdick', 'michard'].forEach(t => expanded.add(t));
  }

  // ECG, Arrhythmia & HRV
  if (lowerTokens.some(t => ['ecg', 'hrv', 'arrhythmia', 'qrs', 'sdnn', 'rmssd', 'poincare'].includes(t))) {
    ['electrocardiogram', 'r-peak', 'qrs', 'depolarization', 'arrhythmia', 'hrv', 'sdnn', 'rmssd', 'poincare', 'autonomic', 'parasympathetic', 'sympathetic', 'ptb-xl'].forEach(t => expanded.add(t));
  }

  // Equations and Mathematical Models
  if (lowerTokens.some(t => ['equation', 'equations', 'formula', 'formulas', 'math', 'mathematical', 'model', 'physics', 'law', 'laws'].includes(t))) {
    ['moens', 'korteweg', 'hughes', 'beer', 'lambert', 'ratio', 'elasticity', 'interferometry', 'pos', 'windkessel', 'poincare', 'pinn', 'navier', 'stokes'].forEach(t => expanded.add(t));
  }

  return Array.from(expanded);
}

// Universal query intent detection across Humanities, AI/CS, and Sciences
function detectQueryIntent(tokens: string[]): {
  isHardware: boolean;
  isMath: boolean;
  isGroundTruth: boolean;
  isBenchmark: boolean;
  isLimitation: boolean;
  isLiteraryCloseReading: boolean;
  isSynthesisOrReview: boolean;
} {
  const lower = tokens.map(t => t.toLowerCase());
  return {
    isHardware: lower.some(t => ['hardware', 'device', 'sensor', 'sensors', 'transducer', 'led', 'leds', 'photodiode', 'afe', 'adc', 'wavelength', 'sampling', 'chip', 'gpu', 'tpu'].includes(t)),
    isMath: lower.some(t => ['equation', 'equations', 'formula', 'formulas', 'math', 'mathematical', 'physics', 'moens', 'hughes', 'beer', 'lambert', 'model', 'laws', 'derivation', 'pos', 'interferometry', 'loss', 'softmax'].includes(t)),
    isGroundTruth: lower.some(t => ['ground', 'truth', 'reference', 'gold', 'standard', 'dataset', 'datasets', 'cohort', 'corpus', 'mimic', 'vitaldb', 'capnobase', 'ubfc', 'cannula', 'a-line', 'catheter'].includes(t)),
    isBenchmark: lower.some(t => ['benchmark', 'benchmarks', 'accuracy', 'error', 'mae', 'rmse', 'auroc', 'f1', 'bleu', 'performance', 'results', 'table', 'evaluation', 'metric', 'metrics'].includes(t)),
    isLimitation: lower.some(t => ['limitation', 'limitations', 'artifact', 'artifacts', 'motion', 'failure', 'melanin', 'skin', 'bias', 'pep', 'drift', 'bottleneck'].includes(t)),
    isLiteraryCloseReading: lower.some(t => ['passage', 'quote', 'quotation', 'soliloquy', 'metaphor', 'trope', 'rhetoric', 'deixis', 'focalization', 'irony', 'textual', 'close', 'reading'].includes(t)),
    isSynthesisOrReview: lower.some(t => ['synthesis', 'synthesize', 'compare', 'contrast', 'review', 'literature', 'matrix', 'cross-paper', 'consensus', 'debate', 'dispute'].includes(t)),
  };
}

export interface SemanticRoute {
  category: 'IR_UWB' | 'FMCW' | 'MIMO' | 'WIFI_CSI' | 'CW_DOPPLER' | 'RADAR_SCG' | 'CUFFLESS_BP' | 'RPPG' | 'ECG_HRV' | 'RESPIRATORY' | 'SEPSIS_DETERIORATION' | 'GENERAL';
  targetPaperIds: string[];
  contrastPaperIds?: string[];
  directive: string;
}

export function routeQuery(query: string): SemanticRoute {
  const q = query.toLowerCase();

  // 1. IR-UWB Impulse Radar
  if (q.includes('iruwb') || q.includes('ir-uwb') || (q.includes('uwb') && (q.includes('radar') || q.includes('impulse') || q.includes('through-wall') || q.includes('rubble') || q.includes('trapped')))) {
    const isComparison = q.includes('fmcw') || q.includes('compare') || q.includes('difference') || q.includes('vs');
    return {
      category: 'IR_UWB',
      targetPaperIds: isComparison ? ['paper-29', 'paper-28'] : ['paper-29'],
      contrastPaperIds: isComparison ? [] : ['paper-28'],
      directive: 'CRITICAL TECHNICAL FOCUS: The query specifically investigates Impulse Radio Ultra-Wideband (IR-UWB) Radar (Paper 29: Li et al.). IR-UWB transmits sub-nanosecond baseband Gaussian pulses in the time domain, utilizing Time-of-Flight range gating and Singular Value Decomposition (SVD) for through-wall and rubble penetration. Contrast this with continuous-wave FMCW radar (Paper 28), ensuring the distinct physical and mathematical foundations of IR-UWB are clearly articulated without conflating the two.'
    };
  }

  // 2. 60 GHz mmWave FMCW Radar
  if (q.includes('fmcw') || (q.includes('60 ghz') && q.includes('radar')) || (q.includes('mmwave') && !q.includes('mimo') && !q.includes('uwb'))) {
    return {
      category: 'FMCW',
      targetPaperIds: ['paper-28'],
      directive: 'CRITICAL TECHNICAL FOCUS: The query focuses on Frequency-Modulated Continuous-Wave (FMCW) millimeter-wave radar (Paper 28). Highlight linear chirp synthesis, intermediate frequency (IF) beat tone generation, and phase interferometry (4*pi/lambda * Delta_x) for sub-millimeter chest wall displacement tracking.'
    };
  }

  // 3. MIMO Radar Beamforming
  if (q.includes('mimo') || (q.includes('beamforming') && q.includes('radar')) || q.includes('multi-patient')) {
    return {
      category: 'MIMO',
      targetPaperIds: ['paper-30'],
      directive: 'CRITICAL TECHNICAL FOCUS: The query addresses Multi-Patient separation via MIMO Radar Beamforming (Paper 30). Emphasize virtual Uniform Linear Array (ULA) synthesis, Capon MVDR spatial beamforming, and angle-of-arrival spatial filtering.'
    };
  }

  // 4. WiFi CSI
  if (q.includes('csi') || q.includes('wifi') || q.includes('channel state information')) {
    return {
      category: 'WIFI_CSI',
      targetPaperIds: ['paper-31'],
      directive: 'CRITICAL TECHNICAL FOCUS: The query addresses WiFi Channel State Information (CSI) sensing (Paper 31). Delineate OFDM subcarrier amplitude/phase dynamics, Fresnel zone diffraction boundaries, and subcarrier phase sanitization.'
    };
  }

  // 5. 24 GHz CW Doppler Radar
  if ((q.includes('doppler') && q.includes('radar')) || q.includes('24 ghz') || (q.includes('apnea') && q.includes('radar'))) {
    return {
      category: 'CW_DOPPLER',
      targetPaperIds: ['paper-32'],
      directive: 'CRITICAL TECHNICAL FOCUS: The query addresses 24 GHz Continuous-Wave (CW) Doppler Radar (Paper 32). Emphasize quadrature homodyne demodulation, chest-abdomen recoil velocity envelopes, and the differentiation of central vs obstructive sleep apnea.'
    };
  }

  // 6. Precordial Radar SCG
  if (q.includes('seismocardiography') || q.includes('scg') || q.includes('precordial') || q.includes('aortic valve opening') || q.includes('avo')) {
    return {
      category: 'RADAR_SCG',
      targetPaperIds: ['paper-33'],
      directive: 'CRITICAL TECHNICAL FOCUS: The query addresses Radar Seismocardiography (SCG) (Paper 33). Detail the second-derivative acceleration analysis decoupling Aortic Valve Opening (AVO), Mitral Valve Closure (MVC), and systolic timing intervals (PEP, LVET).'
    };
  }

  // 7. Cuffless Blood Pressure & PTT
  if (q.includes('cuffless') || (q.includes('blood pressure') && (q.includes('ptt') || q.includes('pwv') || q.includes('pat') || q.includes('moens') || q.includes('hughes') || q.includes('pinn')))) {
    return {
      category: 'CUFFLESS_BP',
      targetPaperIds: ['paper-07', 'paper-08', 'paper-09', 'paper-10', 'paper-11', 'paper-12', 'paper-13'],
      directive: 'CRITICAL TECHNICAL FOCUS: Cuffless Blood Pressure Estimation (Papers 7–13). Rigorously explain the Moens-Korteweg equation, Hughes arterial elasticity model, and hemodynamic Navier-Stokes PINN constraints.'
    };
  }

  // 8. Remote rPPG
  if (q.includes('rppg') || (q.includes('camera') && (q.includes('ppg') || q.includes('facial') || q.includes('video') || q.includes('melanin')))) {
    return {
      category: 'RPPG',
      targetPaperIds: ['paper-21', 'paper-22', 'paper-23', 'paper-24', 'paper-25', 'paper-26', 'paper-27'],
      directive: 'CRITICAL TECHNICAL FOCUS: Remote Photoplethysmography (rPPG) (Papers 21–27). Detail the Shafer dichromatic reflection model, Plane-Orthogonal-to-Skin (POS) projection, and Fitzpatrick skin phototype melanin optical attenuation.'
    };
  }

  // 9. ECG & HRV
  if (q.includes('ecg') || q.includes('electrocardiogram') || q.includes('hrv') || q.includes('arrhythmia') || q.includes('qrs')) {
    return {
      category: 'ECG_HRV',
      targetPaperIds: ['paper-14', 'paper-15', 'paper-16', 'paper-17', 'paper-18', 'paper-19', 'paper-20'],
      directive: 'CRITICAL TECHNICAL FOCUS: Electrocardiography & Autonomic HRV (Papers 14–20). Detail QRS fiducial detection, SDNN/RMSSD time-domain metrics, and LF/HF spectral sympathovagal balance.'
    };
  }

  // 10. Respiratory Rate & Capnography
  if (q.includes('respiratory') || q.includes('breathing') || q.includes('capnography') || q.includes('bioimpedance') || q.includes('stridor')) {
    return {
      category: 'RESPIRATORY',
      targetPaperIds: ['paper-34', 'paper-35', 'paper-36', 'paper-37', 'paper-38'],
      directive: 'CRITICAL TECHNICAL FOCUS: Respiratory Rate & Capnography (Papers 34–38). Detail the three modulations (BW, AM, FM/RSA), acoustic tracheal stridor monitoring, and bioimpedance pneumography.'
    };
  }

  // 11. Sepsis & ICU Deterioration
  if (q.includes('sepsis') || q.includes('news2') || q.includes('deterioration') || q.includes('shock index') || q.includes('alarm fatigue')) {
    return {
      category: 'SEPSIS_DETERIORATION',
      targetPaperIds: ['paper-39', 'paper-40', 'paper-41', 'paper-42', 'paper-43'],
      directive: 'CRITICAL TECHNICAL FOCUS: Early Sepsis & Clinical Deterioration Surveillance (Papers 39–43). Detail continuous dynamic Shock Index (HR/SBP), non-linear NEWS2 penalty functions, and multi-parameter trajectory modeling.'
    };
  }

  return {
    category: 'GENERAL',
    targetPaperIds: [],
    directive: ''
  };
}

export class RAGEngine {
  private allPapers: VitalSignPaper[];
  private allChunks: PaperChunk[] = [];
  private idfMap = new Map<string, number>();
  private avgDocLength: number = 150;
  private chunkTokenCounts = new Map<string, number>();

  constructor(customPapers: VitalSignPaper[] = []) {
    this.allPapers = [...VITAL_SIGN_PAPERS, ...customPapers];
    this.reindex();
  }

  public updatePapers(customPapers: VitalSignPaper[] = []) {
    this.allPapers = [...VITAL_SIGN_PAPERS, ...customPapers];
    this.reindex();
  }

  public getCorpusStats() {
    return {
      totalPapers: this.allPapers.length,
      totalChunks: this.allChunks.length,
      vocabularySize: this.idfMap.size,
      avgDocLength: Math.round(this.avgDocLength),
    };
  }

  private reindex() {
    this.allChunks = [];
    const docFrequency = new Map<string, number>();
    let totalTokens = 0;
    this.chunkTokenCounts.clear();

    for (const paper of this.allPapers) {
      for (const chunk of paper.chunks) {
        this.allChunks.push(chunk);
        const tokens = tokenize(`${chunk.paperTitle} ${chunk.section} ${chunk.content}`);
        const tokenLen = tokens.length || 1;
        this.chunkTokenCounts.set(chunk.id, tokenLen);
        totalTokens += tokenLen;

        const uniqueTokens = new Set(tokens);
        uniqueTokens.forEach(token => {
          docFrequency.set(token, (docFrequency.get(token) || 0) + 1);
        });
      }
    }

    const totalDocs = this.allChunks.length || 1;
    this.avgDocLength = totalTokens / totalDocs;
    this.idfMap.clear();

    // Okapi BM25 standard IDF: ln((N - n + 0.5) / (n + 0.5) + 1)
    docFrequency.forEach((count, token) => {
      const idf = Math.log((totalDocs - count + 0.5) / (count + 0.5) + 1);
      this.idfMap.set(token, Math.max(0.1, idf));
    });
  }

  /**
   * State-of-the-Art Hybrid Retrieval:
   * 1. Okapi BM25 Sparse Lexical Scoring with length normalization (k1=1.5, b=0.75)
   * 2. Dense Cosine Semantic Vector Scoring with Query Expansion
   * 3. Reciprocal Rank Fusion (RRF, k=60) combining Dense & Sparse signals
   * 4. Intent-Aware Section Re-Ranking
   */
  public retrieve(
    query: string,
    options: {
      topK?: number;
      similarityThreshold?: number;
      filterModality?: string;
    } = {}
  ): RetrievedChunk[] {
    const topK = options.topK ?? 4;
    const similarityThreshold = options.similarityThreshold ?? 0.02;
    const filterModality = options.filterModality && options.filterModality !== 'All Modalities' && options.filterModality !== 'all'
      ? options.filterModality
      : null;

    const rawTokens = tokenize(query);
    if (rawTokens.length === 0) return [];
    
    const queryTokens = expandQueryTokens(rawTokens);
    const intent = detectQueryIntent(rawTokens);
    const route = routeQuery(query);

    // Filter chunks by modality if specified
    const validPaperIds = new Set(
      this.allPapers
        .filter(p => !filterModality || p.modality === filterModality)
        .map(p => p.id)
    );

    const eligibleChunks = this.allChunks.filter(c => validPaperIds.has(c.paperId));
    if (eligibleChunks.length === 0) return [];

    // Dense query vector preparation
    const queryTf = computeTF(queryTokens);
    const queryVector = new Map<string, number>();
    let queryNorm = 0;
    queryTf.forEach((tf, token) => {
      const idf = this.idfMap.get(token) || 1.0;
      const weight = (tf / (queryTokens.length || 1)) * idf;
      queryVector.set(token, weight);
      queryNorm += weight * weight;
    });
    queryNorm = Math.sqrt(queryNorm) || 1;

    // --- STEP 1: Compute BM25 scores & Dense Cosine scores ---
    const k1 = 1.5;
    const b = 0.75;
    const bm25Scored: { chunk: PaperChunk; score: number; highlights: string[] }[] = [];
    const denseScored: { chunk: PaperChunk; score: number; highlights: string[] }[] = [];

    for (const chunk of eligibleChunks) {
      const chunkText = `${chunk.paperTitle} ${chunk.section} ${chunk.content}`;
      const chunkTokens = tokenize(chunkText);
      const docLen = this.chunkTokenCounts.get(chunk.id) || chunkTokens.length || 1;
      const chunkTf = computeTF(chunkTokens);

      let bm25 = 0;
      let dotProduct = 0;
      let chunkNorm = 0;
      const highlights: string[] = [];

      // Dense vector components
      chunkTf.forEach((rawTf, token) => {
        const idf = this.idfMap.get(token) || 1.0;
        const weight = (rawTf / docLen) * idf;
        chunkNorm += weight * weight;

        if (queryVector.has(token)) {
          const qWeight = queryVector.get(token)!;
          // Boost exact technical acronyms (e.g., PPG, ECG, BP, PTT, PWV, rPPG, FMCW)
          const boost = token.length >= 3 && token === token.toUpperCase() ? 1.4 : 1.0;
          dotProduct += qWeight * weight * boost;
          if (token.length > 2 && !highlights.includes(token)) {
            highlights.push(token);
          }
        }
      });

      chunkNorm = Math.sqrt(chunkNorm) || 1;
      const cosine = dotProduct / (queryNorm * chunkNorm);

      // BM25 calculation over expanded query terms
      for (const qToken of queryTokens) {
        const f = chunkTf.get(qToken) || 0;
        if (f > 0) {
          const idf = this.idfMap.get(qToken) || 1.0;
          const numerator = f * (k1 + 1);
          const denominator = f + k1 * (1 - b + b * (docLen / this.avgDocLength));
          bm25 += idf * (numerator / denominator);
        }
      }

      bm25Scored.push({ chunk, score: bm25, highlights });
      denseScored.push({ chunk, score: cosine, highlights });
    }

    // --- STEP 2: Rank order lists for Reciprocal Rank Fusion (RRF) ---
    bm25Scored.sort((a, b) => b.score - a.score);
    denseScored.sort((a, b) => b.score - a.score);

    const rrfMap = new Map<string, { chunk: PaperChunk; rrfScore: number; rawCosine: number; highlights: string[] }>();
    const RRF_K = 60;

    denseScored.forEach((item, rank) => {
      const current = rrfMap.get(item.chunk.id) || {
        chunk: item.chunk,
        rrfScore: 0,
        rawCosine: item.score,
        highlights: item.highlights
      };
      current.rrfScore += 1 / (RRF_K + rank + 1);
      rrfMap.set(item.chunk.id, current);
    });

    bm25Scored.forEach((item, rank) => {
      const current = rrfMap.get(item.chunk.id);
      if (current) {
        current.rrfScore += 1 / (RRF_K + rank + 1);
        item.highlights.forEach(h => {
          if (!current.highlights.includes(h)) current.highlights.push(h);
        });
      }
    });

    // --- STEP 3: Intent-Aware Section Re-Ranking ---
    const finalScored: RetrievedChunk[] = [];

    rrfMap.forEach(entry => {
      let boostedRrf = entry.rrfScore;
      const sec = entry.chunk.section.toLowerCase();

      if (intent.isHardware && (sec.includes('hardware') || sec.includes('transducer') || sec.includes('acquisition'))) {
        boostedRrf *= 1.35;
      }
      if (intent.isMath && (sec.includes('mathematical') || sec.includes('equation') || sec.includes('physics'))) {
        boostedRrf *= 1.40;
      }
      if (intent.isGroundTruth && (sec.includes('ground truth') || sec.includes('cohort') || sec.includes('validation'))) {
        boostedRrf *= 1.35;
      }
      if (intent.isBenchmark && (sec.includes('benchmark') || sec.includes('accurac') || sec.includes('evaluation'))) {
        boostedRrf *= 1.35;
      }
      if (intent.isLimitation && (sec.includes('limitation') || sec.includes('artifact') || sec.includes('failure'))) {
        boostedRrf *= 1.35;
      }

      // Route-aware technical paper boosting & conflict suppression
      if (route.targetPaperIds.includes(entry.chunk.paperId)) {
        boostedRrf *= 2.4;
      } else if (route.contrastPaperIds && route.contrastPaperIds.includes(entry.chunk.paperId)) {
        boostedRrf *= 0.35;
      }

      // Convert RRF into normalized 0-1 similarity score
      // Typical top RRF is around 2/61 ≈ 0.032. Scale to ~0.75 - 0.98 for UI display.
      const normalizedSimilarity = Math.min(0.99, Math.max(0.1, (boostedRrf * 28) + (entry.rawCosine * 0.35)));

      if (normalizedSimilarity >= similarityThreshold) {
        finalScored.push({
          ...entry.chunk,
          similarityScore: Number(normalizedSimilarity.toFixed(4)),
          highlights: entry.highlights.slice(0, 6)
        });
      }
    });

    // --- STEP 4: Sort Descending & Apply Source Diversity (MMR) ---
    finalScored.sort((a, b) => b.similarityScore - a.similarityScore);

    const selected: RetrievedChunk[] = [];
    const paperCounts = new Map<string, number>();

    // If query explicitly compares multiple target papers, allocate equal representation
    if (route.targetPaperIds.length > 1) {
      const slotsPerPaper = Math.max(1, Math.floor(topK / route.targetPaperIds.length));
      for (const targetId of route.targetPaperIds) {
        const matchingChunks = finalScored.filter(c => c.paperId === targetId);
        for (let i = 0; i < Math.min(slotsPerPaper, matchingChunks.length); i++) {
          selected.push(matchingChunks[i]);
          paperCounts.set(targetId, (paperCounts.get(targetId) || 0) + 1);
        }
      }
    }

    // Fill remaining slots up to topK with highest scoring eligible chunks
    for (const chunk of finalScored) {
      if (selected.some(s => s.id === chunk.id)) continue;
      const count = paperCounts.get(chunk.paperId) || 0;
      const maxAllowed = route.targetPaperIds.length === 1 && route.targetPaperIds.includes(chunk.paperId) ? 3 : 2;
      if (count < maxAllowed || selected.length >= topK - 1) {
        selected.push(chunk);
        paperCounts.set(chunk.paperId, count + 1);
      }
      if (selected.length >= topK) break;
    }

    // Fallback if diversity filtered too strictly
    if (selected.length < topK) {
      for (const chunk of finalScored) {
        if (!selected.some(s => s.id === chunk.id)) {
          selected.push(chunk);
        }
        if (selected.length >= topK) break;
      }
    }

    return selected;
  }

  public getCitations(chunks: RetrievedChunk[]): Citation[] {
    const citations: Citation[] = [];
    const seenPapers = new Set<string>();

    for (const chunk of chunks) {
      if (seenPapers.has(chunk.paperId)) continue;
      seenPapers.add(chunk.paperId);

      const paper = this.allPapers.find(p => p.id === chunk.paperId);
      if (paper) {
        citations.push({
          paperId: paper.id,
          paperTitle: paper.title,
          authors: paper.authors,
          year: paper.year,
          venue: paper.venue,
          modality: paper.modality,
          page: chunk.page,
          section: chunk.section,
          quoteSnippet: chunk.content.slice(0, 180) + '...',
          relevanceScore: chunk.similarityScore,
          similarityScore: chunk.similarityScore,
          problemStatement: paper.problemStatement,
          deviceUsed: paper.deviceUsed,
          groundTruth: paper.groundTruth,
        });
      }
    }

    return citations;
  }

  public buildContextPrompt(
    query: string,
    chunks: RetrievedChunk[],
    hasImage: boolean = false,
    domainGuideline?: string
  ): string {
    const contextBlocks = chunks.map((c, idx) => {
      return `[CITATION ${idx + 1}]
Paper ID: ${c.paperId}
Title: "${c.paperTitle}"
Section: ${c.section} (Page ${c.page})
Relevance Score: ${c.similarityScore}
Content:
${c.content}
`;
    }).join('\n----------------------------------------\n');

    const defaultPersona = `You are a Distinguished Senior Research Fellow and Universal Academic Intelligence Architect.
You synthesize peer-reviewed academic manuscripts, literary treatises, computational architectures, and empirical studies with publication-grade rigor.`;

    const activePersona = domainGuideline?.trim() || defaultPersona;
    const route = routeQuery(query);
    const routingDirective = route.directive
      ? `\n### DOMAIN-ROUTED TECHNICAL DIRECTIVE:\n${route.directive}\n`
      : '';

    return `${activePersona}
${routingDirective}
RETRIEVED RESEARCH EVIDENCE:
----------------------------------------
${contextBlocks || 'No relevant chunks found in index. Rely on foundational scholarly principles.'}
----------------------------------------

USER QUERY / RESEARCH QUESTION:
"${query}"

${hasImage ? `
MULTIMODAL RESEARCH FIGURE / DIAGRAM / TABLE INSTRUCTIONS:
The researcher has attached an academic figure, waveform trace, architectural diagram, or empirical data table.
1. Formally inspect the visual: transcribe fiducial points, axes, labels, performance bars, or table cells.
2. Correlate the visual elements directly with the retrieved research evidence from the manuscripts above.
3. Explicitly cite the governing equations, theoretical models, or statistical confidence intervals.
` : ''}

INSTRUCTIONS FOR PUBLICATION-GRADE RESEARCH SYNTHESIS:
1. Provide a rigorous, scholarly, and evidentiary grounded analysis directly addressing the inquiry.
2. Structure your response with clean markdown: informative section headings, bold key theoretical/technical terms, structured bullet points, and exact quotations or mathematical formulations where relevant.
3. Every factual assertion, quote, metric, or empirical claim MUST cite the specific paper using [CITATION X] or the author and year (e.g., Vaswani et al., Thorne & Davenport, Mukkamala et al.).
4. When comparing across multiple papers:
   - Detail where the authors corroborate each other (Consensus)
   - Highlight where methodologies, critical frameworks, or empirical results diverge (Controversy / Debate)
   - Address internal threats to validity, unexamined edge cases, or theoretical limitations
5. Never hallucinate fictional citations. Ground your entire synthesis strictly in retrieved evidence.`;
  }
}

export const serverRagEngine = new RAGEngine();
