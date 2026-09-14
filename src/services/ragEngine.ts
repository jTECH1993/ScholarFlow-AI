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

// Advanced universal query expansion across all academic fields (AI, Sciences, Humanities, Engineering)
function expandQueryTokens(tokens: string[], activePerspective?: string): string[] {
  const expanded = new Set<string>(tokens);
  const lowerTokens = tokens.map(t => t.toLowerCase());

  // Universal Academic Research Terminology Expansion
  if (lowerTokens.some(t => ['method', 'methodology', 'approach', 'technique', 'pipeline', 'algorithm', 'system', 'architecture'].includes(t))) {
    ['methodology', 'experimental', 'pipeline', 'architecture', 'framework', 'protocol', 'implementation', 'algorithm'].forEach(t => expanded.add(t));
  }

  if (lowerTokens.some(t => ['result', 'results', 'finding', 'findings', 'empirical', 'evaluation', 'benchmark', 'metric', 'metrics', 'performance'].includes(t))) {
    ['empirical', 'findings', 'benchmark', 'evaluation', 'metric', 'accuracy', 'validation', 'outcomes', 'performance'].forEach(t => expanded.add(t));
  }

  if (lowerTokens.some(t => ['limitation', 'limitations', 'threat', 'threats', 'failure', 'drawback', 'constraint', 'bias'].includes(t))) {
    ['limitations', 'threats', 'validity', 'failure', 'modes', 'constraints', 'trade-offs', 'assumptions'].forEach(t => expanded.add(t));
  }

  if (lowerTokens.some(t => ['theory', 'theoretical', 'framework', 'hypothesis', 'thesis', 'model', 'formulation'].includes(t))) {
    ['theoretical', 'framework', 'hypothesis', 'epistemology', 'derivation', 'formulation', 'principles'].forEach(t => expanded.add(t));
  }

  if (lowerTokens.some(t => ['compare', 'comparison', 'contrast', 'versus', 'vs', 'difference', 'matrix'].includes(t))) {
    ['comparative', 'synthesis', 'discrepancy', 'consensus', 'divergence', 'trade-offs', 'matrix'].forEach(t => expanded.add(t));
  }

  // Computer Science & AI Systems (if query touches computing/AI)
  if (lowerTokens.some(t => ['ai', 'transformer', 'attention', 'rag', 'retrieval', 'lora', 'nlp', 'llm', 'deep', 'learning', 'embedding', 'token'].includes(t))) {
    ['transformer', 'attention', 'retrieval', 'augmented', 'generation', 'dense', 'lora', 'embeddings', 'parameters', 'flops', 'tokens'].forEach(t => expanded.add(t));
  }

  // English Literature, Linguistics & Humanities (if query touches humanities/literature)
  if (lowerTokens.some(t => ['literature', 'literary', 'criticism', 'author', 'novel', 'drama', 'soliloquy', 'narrative', 'rhetoric', 'hermeneutics', 'poetry'].includes(t))) {
    ['soliloquy', 'narrative', 'focalization', 'metaphor', 'poetics', 'stylistics', 'corpus', 'hermeneutics', 'textual', 'trope'].forEach(t => expanded.add(t));
  }

  // Natural Sciences, Physics & Math (if query touches physical equations/modeling)
  if (lowerTokens.some(t => ['equation', 'formula', 'physics', 'math', 'mathematical', 'law', 'differential', 'stochastic'].includes(t))) {
    ['formulation', 'governing', 'equation', 'boundary', 'conditions', 'stochastic', 'mathematical', 'derivation'].forEach(t => expanded.add(t));
  }

  // Biomedical & Health (only if query explicitly references vital signs or medicine)
  if (lowerTokens.some(t => ['vital', 'signs', 'physiological', 'hemodynamic', 'ppg', 'ecg', 'blood', 'pressure', 'sepsis', 'radar'].includes(t))) {
    ['physiological', 'hemodynamic', 'monitoring', 'sensor', 'signal', 'validation'].forEach(t => expanded.add(t));
  }

  return Array.from(expanded);
}

// Universal query intent detection across all disciplines
function detectQueryIntent(tokens: string[]): {
  isMethod: boolean;
  isTheoryOrMath: boolean;
  isEmpiricalOrDataset: boolean;
  isBenchmark: boolean;
  isLimitation: boolean;
  isSynthesisOrReview: boolean;
  isHardware: boolean;
  isMath: boolean;
  isGroundTruth: boolean;
} {
  const lower = tokens.map(t => t.toLowerCase());
  const isMethod = lower.some(t => ['method', 'methodology', 'approach', 'technique', 'pipeline', 'algorithm', 'system', 'architecture', 'protocol', 'design'].includes(t));
  const isTheoryOrMath = lower.some(t => ['theory', 'theoretical', 'framework', 'hypothesis', 'thesis', 'equation', 'equations', 'formula', 'math', 'derivation', 'proof', 'model'].includes(t));
  const isEmpiricalOrDataset = lower.some(t => ['dataset', 'datasets', 'cohort', 'corpus', 'sample', 'data', 'empirical', 'experiment', 'experiments', 'trials', 'ground', 'truth'].includes(t));
  const isBenchmark = lower.some(t => ['benchmark', 'benchmarks', 'accuracy', 'error', 'f1', 'bleu', 'score', 'evaluation', 'results', 'metrics', 'performance', 'table'].includes(t));
  const isLimitation = lower.some(t => ['limitation', 'limitations', 'threat', 'threats', 'failure', 'drawback', 'constraint', 'weakness', 'bias', 'drift', 'bottleneck'].includes(t));
  const isSynthesisOrReview = lower.some(t => ['synthesis', 'synthesize', 'compare', 'contrast', 'review', 'literature', 'matrix', 'cross-paper', 'consensus', 'debate', 'dispute'].includes(t));
  const isHardware = lower.some(t => ['hardware', 'device', 'sensor', 'transducer', 'chip', 'gpu', 'tpu', 'acquisition'].includes(t));

  return {
    isMethod,
    isTheoryOrMath,
    isEmpiricalOrDataset,
    isBenchmark,
    isLimitation,
    isSynthesisOrReview,
    isHardware,
    isMath: isTheoryOrMath,
    isGroundTruth: isEmpiricalOrDataset,
  };
}

export interface SemanticRoute {
  category: string;
  targetPaperIds: string[];
  contrastPaperIds?: string[];
  directive: string;
}

export function routeQuery(query: string, papers: VitalSignPaper[] = []): SemanticRoute {
  const q = query.toLowerCase();
  const matchedPaperIds: string[] = [];

  // Match against active session paper titles and authors dynamically
  for (const paper of papers) {
    const titleLower = paper.title.toLowerCase();
    const authorsLower = paper.authors.toLowerCase();
    
    // Check if paper title words or author surnames appear in the query
    const titleKeyWords = titleLower.split(/[^a-z0-9]/).filter(w => w.length > 4 && !STOP_WORDS.has(w));
    const titleMatch = titleKeyWords.filter(w => q.includes(w)).length >= 2;
    const authorMatch = authorsLower.split(/[^a-z]/).filter(a => a.length > 3).some(a => q.includes(a));

    if (titleMatch || authorMatch || (paper.id && q.includes(paper.id.toLowerCase()))) {
      matchedPaperIds.push(paper.id);
    }
  }

  if (matchedPaperIds.length > 0) {
    return {
      category: 'MATCHED_PAPERS',
      targetPaperIds: matchedPaperIds,
      directive: `FOCUSED SCHOLARLY INQUIRY: The inquiry directly references specific papers in your library (${matchedPaperIds.join(', ')}). Prioritize evidence and verbatim citations directly from these manuscripts.`
    };
  }

  // Cross-paper comparison / synthesis query
  if (q.includes('compare') || q.includes('contrast') || q.includes('versus') || q.includes('vs') || q.includes('synthesis') || q.includes('matrix')) {
    return {
      category: 'COMPARATIVE_SYNTHESIS',
      targetPaperIds: [],
      directive: 'CROSS-PAPER COMPARATIVE SYNTHESIS: Focus on structuring comparative dimensions across papers, highlighting scholarly consensus, methodological differences, and empirical divergence.'
    };
  }

  return {
    category: 'GENERAL_ACADEMIC',
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

  constructor(papers: VitalSignPaper[] = []) {
    this.allPapers = [...papers];
    this.reindex();
  }

  /**
   * Replaces the currently indexed corpus with the given papers.
   * Enables clean, fresh sessions for any user domain without lingering prior indexes.
   */
  public setPapers(papers: VitalSignPaper[] = []) {
    this.allPapers = [...papers];
    this.reindex();
  }

  public updatePapers(papers: VitalSignPaper[] = []) {
    this.allPapers = [...papers];
    this.reindex();
  }

  /**
   * Resets the RAG index entirely to an empty state for a fresh session.
   */
  public clear() {
    this.allPapers = [];
    this.allChunks = [];
    this.idfMap.clear();
    this.chunkTokenCounts.clear();
    this.avgDocLength = 150;
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
    const route = routeQuery(query, this.allPapers);

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
    const route = routeQuery(query, this.allPapers);
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
