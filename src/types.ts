export type VitalModality = 
  | 'Photoplethysmography (PPG)'
  | 'Blood Pressure (BP)'
  | 'Electrocardiogram (ECG & HRV)'
  | 'Remote Camera rPPG'
  | 'Radar & RF Sensing'
  | 'Respiratory Rate (RR)'
  | 'ICU Sepsis & Deterioration'
  | 'Multimodal Wearables';

export interface PaperChunk {
  id: string;
  paperId: string;
  paperTitle: string;
  section: string;
  content: string;
  page?: number;
  tokenCount: number;
  authors?: string;
  year?: number;
  equationSnippet?: string;
  chunkingStrategy?: string;
}

export interface VitalSignPaper {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  modality: VitalModality;
  abstract: string;
  methodology: string;
  dataset: string;
  keyFindings: string[];
  metrics: Record<string, string>;
  chunks: PaperChunk[];
  isCustomUpload?: boolean;
  problemStatement?: string;
  deviceUsed?: string;
  groundTruth?: string;
  clinicalSignificance?: string;
  // Multi-domain Universal Research & Category Segregation fields
  domainId?: string;
  domainName?: string;
  category?: string;
  detectedCategory?: string;
  categoryConfidence?: number;
  categoryKeywords?: string[];
  categoryReasoning?: string;
  compatibleCategories?: string[];
  coreThesis?: string;
  theoreticalFramework?: string;
  primaryCorpus?: string;
  researchQuestions?: string[];
  limitations?: string[];
  keyQuotes?: { quote: string; page?: number; context?: string }[];
}

export type UniversalPaper = VitalSignPaper;

export interface PaperAnatomySummary {
  paperId: string;
  title: string;
  authors: string;
  year: number;
  domainId: string;
  coreThesis: string;
  theoreticalFramework: string;
  methodology: string;
  corpusOrDataset: string;
  keyFindings: string[];
  limitations: string[];
  keyEvidenceQuotes: { text: string; location: string }[];
}

export interface CrossPaperComparison {
  dimension: string;
  comparisonByPaper: Record<string, string>; // paperId -> summary
  synthesisTakeaway: string;
}

export interface ScholarlyConsensusAndDebate {
  consensusPoints: { topic: string; consensusStatement: string; agreeingPapers: string[] }[];
  controversyPoints: { topic: string; disputeSummary: string; viewpoints: { paperTitle: string; stance: string }[] }[];
}

export interface RetrievedChunk extends PaperChunk {
  similarityScore: number;
  highlights: string[];
}

export interface Citation {
  paperId: string;
  paperTitle: string;
  authors: string;
  year: number;
  venue?: string;
  section: string;
  page?: number;
  modality?: string;
  quoteSnippet: string;
  relevanceScore: number;
  similarityScore?: number;
  tableOrFigure?: string;
  problemStatement?: string;
  deviceUsed?: string;
  groundTruth?: string;
}

export interface AttachedImage {
  data: string; // base64 data URL or raw base64
  mimeType: string;
  name?: string;
  isPreloadedSample?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  image?: AttachedImage;
  attachedImage?: AttachedImage;
  citations?: Citation[];
  retrievedChunks?: RetrievedChunk[];
  modelUsed?: string;
  queryLatencyMs?: number;
  tokensEvaluated?: number;
  isStreaming?: boolean;
}

export type LLMProvider = 'gemini' | 'ollama';

export interface OllamaSettings {
  endpoint: string;
  selectedModel: string;
  isConnected: boolean;
  availableModels: string[];
}

export interface RAGSettings {
  topK: number;
  chunkOverlap: number;
  similarityThreshold: number;
  retrievalStrategy: 'hybrid' | 'dense' | 'bm25';
  temperature: number;
  filterModality?: VitalModality | 'all';
  provider: LLMProvider;
  chunkingStrategy?: 'semantic-section' | 'recursive-structural' | 'sentence-window' | 'hierarchical-parent-child';
  useHyDE?: boolean;
  useReranking?: boolean;
  useMultiQuery?: boolean;
  denseWeight?: number;
  bm25Weight?: number;
  selectedDomain?: string;
}

export interface RAGQueryPayload {
  query: string;
  image?: AttachedImage;
  chatHistory?: { role: 'user' | 'assistant'; content: string }[];
  provider: LLMProvider;
  geminiModel?: string;
  ollamaConfig?: {
    endpoint: string;
    model: string;
  };
  settings: {
    topK: number;
    similarityThreshold: number;
    filterModality?: string;
    temperature: number;
  };
  customPapers?: VitalSignPaper[];
}

export interface RAGQueryResponse {
  answer: string;
  citations: Citation[];
  retrievedChunks: RetrievedChunk[];
  modelUsed: string;
  latencyMs: number;
  chunksExamined: number;
}

export type ClinicalPerspectiveId =
  | 'academic-scholar'
  | 'vital-sign-rag'
  | 'cs-ai-systems'
  | 'english-literature'
  | 'critical-care'
  | 'wearables-ppg'
  | 'cardiology-ecg'
  | 'cuffless-bp'
  | 'touchless-radar-rppg'
  | 'pediatric-respiratory'
  | 'custom';

export interface ClinicalPerspective {
  id: ClinicalPerspectiveId;
  name: string;
  tagline: string;
  badge: string;
  iconName: string;
  accentColor: string;
  systemPromptGuideline: string;
  defaultModality: VitalModality | 'all';
  defaultRetrievalStrategy: 'hybrid' | 'dense' | 'bm25';
  defaultTopK: number;
  defaultSimilarityThreshold: number;
  suggestedQuestions: string[];
  focusPillars: string[];
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'Academic Researcher' | 'Clinician' | 'Biomedical Engineer' | 'HealthTech Founder' | 'Student' | 'Administrator';
  organization: string;
  perspectiveId: ClinicalPerspectiveId;
  perspectiveName: string;
  perspectiveCustomInstructions?: string;
  preferredModalityFilter: VitalModality | 'all';
  retrievalStrategy: 'hybrid' | 'dense' | 'bm25';
  topK: number;
  similarityThreshold: number;
  temperature: number;
  createdAt: string;
  lastActive: string;
}

export interface SavedCitationItem {
  id: string;
  userId: string;
  paperTitle: string;
  authors: string;
  year: number;
  section: string;
  page?: number;
  quoteSnippet: string;
  relevanceScore: number;
  modality?: string;
  tableOrFigure?: string;
  notes?: string;
  savedAt: string;
}

export interface SavedChatSession {
  id: string;
  userId: string;
  title: string;
  perspectiveUsed: string;
  messages: ChatMessage[];
  updatedAt: string;
  createdAt: string;
}

export type ActiveResearchDomain = 
  | 'all'
  | 'vital-signs-ppg'
  | 'ecg-rppg'
  | 'fmcw-radar'
  | 'biomedical-signal-processing'
  | 'ai-deep-learning'
  | 'healthcare-ehealth';

export interface ResearchProjectItem {
  id: string;
  title: string;
  paperCount: number;
  updatedAgo: string;
  category: string;
  description: string;
  tags: string[];
}

