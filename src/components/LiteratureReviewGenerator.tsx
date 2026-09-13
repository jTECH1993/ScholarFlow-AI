import React, { useState, useMemo } from 'react';
import Markdown from 'react-markdown';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  Layers, 
  Table as TableIcon,
  ChevronRight,
  Send,
  Search,
  Filter,
  Eye,
  Sliders,
  Cpu,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Hash,
  ExternalLink,
  Upload,
  Plus,
  Loader2,
  GitCompare,
  RefreshCw,
  Scale,
  Brain,
  Quote,
  Calendar,
  ArrowUpDown
} from 'lucide-react';
import { VITAL_SIGN_PAPERS, VITAL_MODALITIES } from '../data/vitalSignPapers';
import { VitalSignPaper } from '../types';
import { LiteratureReviewImprover } from './LiteratureReviewImprover';
import { PaperDossierModal } from './PaperDossierModal';

export interface CrossPaperDimension {
  dimension: string;
  paperStances: { paperTitle: string; summary: string }[];
  crossPaperTakeaway: string;
}

export interface ConsensusPoint {
  topic: string;
  consensusStatement: string;
  agreeingPapers: string[];
}

export interface ControversyPoint {
  topic: string;
  disputeSummary: string;
  viewpoints: { paperTitle: string; stance: string }[];
}

export interface CrossMatrixResult {
  comparativeDimensions: CrossPaperDimension[];
  consensusPoints: ConsensusPoint[];
  controversyPoints: ControversyPoint[];
  methodologicalEvaluation?: string;
  recommendedFutureDirections?: string[];
  overallSynthesis?: string;
}

interface LiteratureReviewGeneratorProps {
  papers?: VitalSignPaper[];
  onSendToChat?: (query: string) => void;
  onOpenUpload?: () => void;
}

interface LiteratureTopic {
  id: string;
  title: string;
  domainName: string;
  description: string;
  paperIds: string[];
  suggestedPrompt: string;
}

const LITERATURE_TOPICS: LiteratureTopic[] = [
  {
    id: 'english-poetics-metaphor',
    title: 'Cognitive Poetics & Conceptual Metaphor in Renaissance Drama',
    domainName: 'English Literature',
    description: 'Embodied cognitive blending, somatic spatial metaphors (CONTAINMENT, Labyrinths), and meter-disruption stylistics in Shakespeare & Marlowe.',
    paperIds: ['lit-paper-01', 'lit-paper-02', 'lit-paper-03', 'lit-paper-04'],
    suggestedPrompt: 'Provide an academic literature review synthesizing Cognitive Poetics, Conceptual Metaphor, and Embodied Cognition across early modern English literature papers, comparing theoretical frameworks, textual corpuses, and stylistic findings.',
  },
  {
    id: 'ai-transformers-rag',
    title: 'Attention Transformers, RAG Memory, & Efficient Adaptation',
    domainName: 'Computer Science & AI',
    description: 'Multi-head self-attention, non-parametric external vector index retrieval, LoRA rank-decomposition fine-tuning, and Constitutional AI alignment.',
    paperIds: ['cs-paper-01', 'cs-paper-02', 'cs-paper-03', 'cs-paper-04'],
    suggestedPrompt: 'Synthesize the foundational paradigm shifts in AI architectures from Attention Transformers to Dense Retrieval-Augmented Generation and LoRA Parameter-Efficient Adaptation, highlighting benchmark improvements and limitations.',
  },
  {
    id: 'cuffless-bp',
    title: 'Cuffless Blood Pressure via PTT & Pulse Wave Velocity',
    domainName: 'Biomedical & Physiology',
    description: 'Hemodynamic foundations, Moens-Korteweg elasticity, Hughes law, and deep learning PINNs from dual-PPG and ECG signals.',
    paperIds: ['paper-07', 'paper-08', 'paper-09', 'paper-10', 'paper-11', 'paper-12', 'paper-13', 'paper-14'],
    suggestedPrompt: 'Provide a comprehensive literature review synthesizing the hemodynamic foundations, devices used (Finapres, A-Line), and ground truth benchmarks for cuffless blood pressure estimation across Papers 07 to 14, citing exact pages and benchmark MAE metrics.',
  },
  {
    id: 'rppg-camera',
    title: 'Remote Facial Video rPPG vs Contact Sensors',
    domainName: 'Biomedical & Physiology',
    description: 'Mathematical skin color modeling (CHROM, POS), illumination compensation, and sub-frame parabolic interpolation for camera vital signs.',
    paperIds: ['paper-21', 'paper-22', 'paper-23', 'paper-24', 'paper-25', 'paper-26', 'paper-27'],
    suggestedPrompt: 'Synthesize the state-of-the-art camera-based remote photoplethysmography (rPPG) literature from Papers 21 to 27, comparing the Plane-Orthogonal-to-Skin (POS) algorithm, hardware cameras used, and ground truth references on UBFC-rPPG.',
  },
  {
    id: 'fmcw-radar',
    title: '60 GHz FMCW Radar Non-Contact Cardiorespiratory Sensing',
    domainName: 'Biomedical & Physiology',
    description: 'Phase demodulation, chest displacement micro-motion tracking, and body movement suppression algorithms.',
    paperIds: ['paper-28', 'paper-29', 'paper-30', 'paper-31', 'paper-32', 'paper-33'],
    suggestedPrompt: 'Write a literature review on non-contact cardiorespiratory monitoring using 60 GHz FMCW and UWB radar based on Papers 28 to 33, explaining hardware devices (TI IWR6843), ground truth PSG, and phase unwrapping accuracy.',
  },
  {
    id: 'sepsis-trajectories',
    title: 'ICU Sepsis Early Warning & Multi-Parameter Trajectories',
    domainName: 'Biomedical & Physiology',
    description: 'Subtle cross-vital instability trajectories, alert lead time, and randomized trial mortality reductions compared to NEWS2.',
    paperIds: ['paper-35', 'paper-39', 'paper-40', 'paper-41'],
    suggestedPrompt: 'Synthesize clinical literature on multi-parameter vital sign trajectory tracking for early sepsis detection from Papers 35, 39, 40, and 41, detailing problem statements, clinical monitors, and the 4.8-hour antibiotic lead time.',
  },
  {
    id: 'resp-rate',
    title: 'Respiratory Rate Extraction from PPG and ECG Modulations',
    domainName: 'Biomedical & Physiology',
    description: 'Baseline Wander (BW), Amplitude Modulation (AM), and Frequency Modulation (RSA) algorithms across CapnoBase and MIMIC-III.',
    paperIds: ['paper-34', 'paper-36', 'paper-37', 'paper-38'],
    suggestedPrompt: 'Review the physiological mechanisms of respiratory modulation (BW, AM, FM/RSA) extracted from wearable PPG and ECG signals as benchmarked by Papers 34, 36, 37, and 38, detailing devices and ground truth capnography.',
  },
  {
    id: 'ppg-morphology',
    title: 'PPG Waveform Morphology & Arterial Stiffness Index',
    domainName: 'Biomedical & Physiology',
    description: '1D Residual Convolutional Autoencoders, dynamic time warping loss, and signal quality indices for wearable telemetry.',
    paperIds: ['paper-01', 'paper-02', 'paper-03', 'paper-04', 'paper-05', 'paper-06'],
    suggestedPrompt: 'Synthesize signal quality index (SQI), SDPPG fiducial point parsing, and multi-wavelength co-oximetry based on Papers 01 to 06, including hardware devices and clinical references.',
  },
  {
    id: 'wearable-multimodal',
    title: 'Multimodal Wearables & Physics-Informed Neural Networks',
    domainName: 'Biomedical & Physiology',
    description: 'Cross-attention transformers and Navier-Stokes hemodynamic constraints for ambulatory daily living.',
    paperIds: ['paper-15', 'paper-16', 'paper-17', 'paper-18', 'paper-42', 'paper-43'],
    suggestedPrompt: 'Synthesize literature on multimodal wearable vital signs from Papers 15 to 18 and 42 to 43, comparing sensor hardware (Empatica E4, Shimmer3), ground truth ECG/A-line, and deep fusion models.',
  }
];

export const LiteratureReviewGenerator: React.FC<LiteratureReviewGeneratorProps> = ({ 
  papers, 
  onSendToChat,
  onOpenUpload 
}) => {
  const currentPapers = papers || VITAL_SIGN_PAPERS;
  const [viewMode, setViewMode] = useState<'matrix' | 'thematic' | 'ai-synthesis' | 'lit-improver'>('matrix');
  const [synthesisSubTab, setSynthesisSubTab] = useState<'review' | 'cross-matrix'>('review');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(LITERATURE_TOPICS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedModality, setSelectedModality] = useState<string>('All Modalities');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [sortOrder, setSortOrder] = useState<'year-desc' | 'year-asc' | 'title-asc'>('year-desc');
  const [selectedPaperForModal, setSelectedPaperForModal] = useState<VitalSignPaper | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const availableYears = useMemo(() => {
    return Array.from(new Set(currentPapers.map((p) => p.year))).sort((a, b) => b - a);
  }, [currentPapers]);

  // AI Synthesis Engine State
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStatusMessage, setSynthesisStatusMessage] = useState<string>('');
  const [synthesisError, setSynthesisError] = useState<string | null>(null);
  const [generatedReviewMarkdown, setGeneratedReviewMarkdown] = useState<string | null>(null);
  const [generatedCrossMatrix, setGeneratedCrossMatrix] = useState<CrossMatrixResult | null>(null);
  const [customResearchObjective, setCustomResearchObjective] = useState<string>('');

  const activeTopic = LITERATURE_TOPICS.find(t => t.id === selectedTopicId) || LITERATURE_TOPICS[0];
  const activeTopicPapers = useMemo(() => {
    const matched = currentPapers.filter(p => activeTopic.paperIds.includes(p.id));
    return matched.length > 0 ? matched : currentPapers.slice(0, 6);
  }, [currentPapers, activeTopic]);

  // AI Synthesis: Trigger Automated Literature Review
  const handleGenerateLiteratureReview = async () => {
    setIsSynthesizing(true);
    setSynthesisError(null);
    setSynthesisStatusMessage('Extracting theoretical frameworks and drafting systematic synthesis...');

    try {
      const response = await fetch('/api/synthesize/literature-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          papers: activeTopicPapers,
          domainId: activeTopic.domainName,
          topicTitle: activeTopic.title,
          reviewType: 'Systematic Cross-Paper Synthesis',
          researchObjective: customResearchObjective.trim() || activeTopic.description
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.reviewMarkdown) {
        setGeneratedReviewMarkdown(data.reviewMarkdown);
        setSynthesisSubTab('review');
      } else {
        throw new Error(data.error || 'Failed to synthesize literature review');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown synthesis error';
      setSynthesisError(`Synthesis failed: ${msg}. Please ensure your API key is configured.`);
    } finally {
      setIsSynthesizing(false);
      setSynthesisStatusMessage('');
    }
  };

  // AI Synthesis: Trigger Cross-Paper Comparative Matrix
  const handleGenerateCrossMatrix = async () => {
    setIsSynthesizing(true);
    setSynthesisError(null);
    setSynthesisStatusMessage('Cross-analyzing hypotheses, methods, consensus, and controversies...');

    try {
      const response = await fetch('/api/synthesize/cross-matrix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          papers: activeTopicPapers,
          domain: activeTopic.domainName
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.matrix) {
        setGeneratedCrossMatrix(data.matrix);
        setSynthesisSubTab('cross-matrix');
      } else {
        throw new Error(data.error || 'Failed to generate cross-paper matrix');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown matrix error';
      setSynthesisError(`Matrix generation failed: ${msg}. Please verify server status.`);
    } finally {
      setIsSynthesizing(false);
      setSynthesisStatusMessage('');
    }
  };

  // Filtered papers for Master Matrix
  const filteredPapers = useMemo(() => {
    const list = currentPapers.filter((paper) => {
      const matchesModality = 
        selectedModality === 'All Modalities' || paper.modality === selectedModality;

      const matchesYear =
        selectedYear === 'All Years' ||
        (selectedYear === '2021 & Prior' ? paper.year <= 2021 : paper.year.toString() === selectedYear);
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        paper.title.toLowerCase().includes(q) ||
        paper.authors.toLowerCase().includes(q) ||
        paper.year.toString().includes(q) ||
        paper.problemStatement?.toLowerCase().includes(q) ||
        paper.deviceUsed?.toLowerCase().includes(q) ||
        paper.groundTruth?.toLowerCase().includes(q) ||
        paper.methodology.toLowerCase().includes(q) ||
        paper.dataset.toLowerCase().includes(q);

      return matchesModality && matchesYear && matchesSearch;
    });

    return [...list].sort((a, b) => {
      if (sortOrder === 'year-desc') return b.year - a.year;
      if (sortOrder === 'year-asc') return a.year - b.year;
      return a.title.localeCompare(b.title);
    });
  }, [currentPapers, searchQuery, selectedModality, selectedYear, sortOrder]);

  // Generate structured LaTeX table code for currently displayed papers
  const generateLatexTable = (papersToExport: VitalSignPaper[]) => {
    return `\\begin{table*}[t]
\\centering
\\caption{Comparative Literature Matrix (${papersToExport.length} Papers)}
\\label{tab:literature_matrix}
\\scriptsize
\\begin{tabular}{|p{3.2cm}|p{2.2cm}|p{3.0cm}|p{2.8cm}|p{2.8cm}|p{3.2cm}|}
\\hline
\\textbf{Paper Title & Year} & \\textbf{Modality / Page} & \\textbf{Problem Statement (What it Solves)} & \\textbf{Device / Sensor Hardware} & \\textbf{Ground Truth Reference} & \\textbf{Method & Key Benchmark} \\\\
\\hline
${papersToExport.map(p => {
  const page = p.chunks[0]?.page || 1;
  const metricsStr = Object.entries(p.metrics).map(([k, v]) => `${k}: ${v}`).join(', ');
  const titleClean = p.title.replace(/&/g, '\\&').slice(0, 38) + '...';
  const probClean = (p.problemStatement || '').replace(/&/g, '\\&').slice(0, 55) + '...';
  const devClean = (p.deviceUsed || '').replace(/&/g, '\\&').slice(0, 45) + '...';
  const gtClean = (p.groundTruth || '').replace(/&/g, '\\&').slice(0, 45) + '...';
  return `${titleClean} (${p.year}) & ${p.modality} (p.${page}) & ${probClean} & ${devClean} & ${gtClean} & ${p.methodology.slice(0, 35)}... (${metricsStr}) \\\\ \\hline`;
}).join('\n')}
\\end{tabular}
\\end{table*}`;
  };

  // Generate structured Markdown table
  const generateMarkdownTable = (papersToExport: VitalSignPaper[]) => {
    const headers = '| # | Paper Title & Year | Modality | Problem Statement (What it Solves) | Device / Sensor Hardware | Ground Truth Reference | Key Benchmark Metric |';
    const separator = '|---|---|---|---|---|---|---|';
    const rows = papersToExport.map((p, idx) => {
      const page = p.chunks[0]?.page || 1;
      const metricsStr = Object.entries(p.metrics).map(([k, v]) => `${k}: ${v}`).join(', ');
      return `| ${idx + 1} | **${p.title}** (${p.year}, p.${page}) | ${p.modality} | ${p.problemStatement || 'N/A'} | ${p.deviceUsed || 'N/A'} | ${p.groundTruth || 'N/A'} | ${metricsStr} |`;
    });
    return [headers, separator, ...rows].join('\n');
  };

  // Generate CSV spreadsheet
  const generateCsv = (papersToExport: VitalSignPaper[]) => {
    const escapeCsv = (str: string) => `"${str.replace(/"/g, '""')}"`;
    const headers = [
      'ID',
      'Title',
      'Authors',
      'Year',
      'Venue',
      'Modality',
      'Page',
      'Problem Statement (What it solves)',
      'Device / Sensor Hardware',
      'Ground Truth Reference',
      'Methodology',
      'Dataset',
      'Benchmark Metrics',
      'Clinical Significance'
    ];

    const rows = papersToExport.map((p) => [
      escapeCsv(p.id),
      escapeCsv(p.title),
      escapeCsv(p.authors),
      p.year.toString(),
      escapeCsv(p.venue),
      escapeCsv(p.modality),
      (p.chunks[0]?.page || 1).toString(),
      escapeCsv(p.problemStatement || ''),
      escapeCsv(p.deviceUsed || ''),
      escapeCsv(p.groundTruth || ''),
      escapeCsv(p.methodology),
      escapeCsv(p.dataset),
      escapeCsv(Object.entries(p.metrics).map(([k, v]) => `${k}: ${v}`).join('; ')),
      escapeCsv(p.clinicalSignificance || '')
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownload = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 dark:bg-slate-950 overflow-hidden">
      {/* Top Controls Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <TableIcon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Literature Matrix &amp; Comprehensive Comparative Review
              </h2>
              <span className="px-2 py-0.5 rounded-full text-2xs font-semibold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300">
                All {currentPapers.length} Papers Indexed
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Structured extraction of Problem Statements, Hardware Devices, Ground Truth References, and Benchmark Accuracies.
            </p>
          </div>

          {/* View Mode Switcher & Quick Export */}
          <div className="flex items-center space-x-2">
            {onOpenUpload && (
              <button
                type="button"
                onClick={onOpenUpload}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-colors shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload &amp; Index Paper</span>
              </button>
            )}
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center text-xs font-semibold border border-slate-200 dark:border-slate-700 flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                  viewMode === 'matrix'
                    ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Master Comparison Matrix ({filteredPapers.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('thematic')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                  viewMode === 'thematic'
                    ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Thematic Corpus Clusters ({LITERATURE_TOPICS.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('ai-synthesis')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                  viewMode === 'ai-synthesis'
                    ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Brain className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>AI Live Synthesis Studio</span>
              </button>
              <button
                type="button"
                id="view-mode-lit-improver-btn"
                onClick={() => setViewMode('lit-improver')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                  viewMode === 'lit-improver'
                    ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Lit Review Improver &amp; Gap Auditor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter bar (Matrix Mode) */}
        {viewMode === 'matrix' && (
          <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problem statement, device (e.g. Finapres, IWR6843), ground truth (e.g. A-Line, PSG), authors, or title..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter by Publication Year */}
            <div className="flex items-center space-x-1.5 w-full sm:w-auto">
              <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full sm:w-auto font-medium"
              >
                <option value="All Years">All Publication Years ({currentPapers.length})</option>
                {availableYears.map((yr) => (
                  <option key={yr} value={yr.toString()}>Year {yr}</option>
                ))}
                <option value="2021 & Prior">2021 &amp; Prior</option>
              </select>
            </div>

            {/* Modality Filter */}
            <div className="flex items-center space-x-1.5 w-full sm:w-auto">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full sm:w-auto font-medium"
              >
                {VITAL_MODALITIES.map((mod) => (
                  <option key={mod} value={mod}>
                    {mod}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order Selector */}
            <div className="flex items-center space-x-1.5 w-full sm:w-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full sm:w-auto font-medium"
              >
                <option value="year-desc">Year: Newest (2026 &rarr;)</option>
                <option value="year-asc">Year: Oldest (&rarr; 2026)</option>
                <option value="title-asc">Title: A &rarr; Z</option>
              </select>
            </div>

            {/* Export Actions */}
            <div className="flex items-center space-x-1.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => handleCopy(generateMarkdownTable(filteredPapers), 'markdown-table')}
                className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-teal-500 text-slate-700 hover:text-teal-800 rounded-lg text-2xs font-semibold flex items-center space-x-1 transition-colors"
                title="Copy full comparison as Markdown table"
              >
                {copiedType === 'markdown-table' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>Copy MD</span>
              </button>
              <button
                type="button"
                onClick={() => handleCopy(generateLatexTable(filteredPapers), 'latex-table')}
                className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-teal-500 text-slate-700 hover:text-teal-800 rounded-lg text-2xs font-semibold flex items-center space-x-1 transition-colors"
                title="Copy publication-ready LaTeX table"
              >
                {copiedType === 'latex-table' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>Copy LaTeX</span>
              </button>
              <button
                type="button"
                onClick={() => handleDownload('Vital_Sign_43_Papers_Literature_Matrix.csv', generateCsv(filteredPapers), 'text/csv')}
                className="px-2.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-2xs font-semibold flex items-center space-x-1 shadow-2xs transition-colors"
                title="Download spreadsheet"
              >
                <Download className="w-3 h-3" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'matrix' && (
            /* ============================================================ */
            /* MASTER 43-PAPER COMPARISON MATRIX VIEW */
            /* ============================================================ */
            <div className="space-y-4">
              {/* Summary Stats Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div>
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider">
                    Total Matching Papers
                  </span>
                  <div className="flex items-baseline space-x-1.5 mt-0.5">
                    <span className="text-xl font-extrabold text-teal-900">{filteredPapers.length}</span>
                    <span className="text-2xs text-slate-500">/ {currentPapers.length} papers</span>
                  </div>
                </div>

                <div>
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider">
                    Modalities Covered
                  </span>
                  <div className="flex items-baseline space-x-1.5 mt-0.5">
                    <span className="text-xl font-extrabold text-indigo-900">8</span>
                    <span className="text-2xs text-slate-500">Clinical domains</span>
                  </div>
                </div>

                <div>
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider">
                    Extracted Hardware
                  </span>
                  <div className="flex items-baseline space-x-1.5 mt-0.5">
                    <span className="text-xl font-extrabold text-emerald-900">{currentPapers.length}</span>
                    <span className="text-2xs text-slate-500">Sensor devices</span>
                  </div>
                </div>

                <div>
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider">
                    Gold Standards
                  </span>
                  <div className="flex items-baseline space-x-1.5 mt-0.5">
                    <span className="text-xl font-extrabold text-teal-800">100%</span>
                    <span className="text-2xs text-slate-500">Clinically mapped</span>
                  </div>
                </div>
              </div>

              {/* Comprehensive Comparative Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-3xs">
                        <th className="py-3 px-3 w-12 text-center">#</th>
                        <th className="py-3 px-3 min-w-[220px]">Paper Title & Authors</th>
                        <th className="py-3 px-3 min-w-[130px]">Modality / Page</th>
                        <th className="py-3 px-3 min-w-[260px] bg-amber-50/40 text-amber-900">
                          Problem Statement (What it Solves)
                        </th>
                        <th className="py-3 px-3 min-w-[230px] bg-teal-50/40 text-teal-900">
                          Device / Sensor Hardware
                        </th>
                        <th className="py-3 px-3 min-w-[230px] bg-emerald-50/40 text-emerald-900">
                          Ground Truth Reference
                        </th>
                        <th className="py-3 px-3 min-w-[200px]">Method & Benchmarks</th>
                        <th className="py-3 px-3 w-20 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPapers.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-slate-500">
                            <div className="max-w-md mx-auto space-y-2">
                              <p className="font-semibold text-slate-800">No papers found in current session view.</p>
                              <p className="text-xs text-slate-500">
                                {searchQuery ? `No papers match "${searchQuery}".` : 'Upload your academic papers to populate the comparative literature matrix, or load the benchmark corpus.'}
                              </p>
                              {onOpenUpload && (
                                <button
                                  type="button"
                                  onClick={onOpenUpload}
                                  className="mt-2 px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                                >
                                  Upload Paper
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredPapers.map((paper, idx) => {
                          const page = paper.chunks[0]?.page || 1;
                          return (
                            <tr 
                              key={paper.id}
                              className="hover:bg-slate-50/80 transition-colors group"
                            >
                              {/* Index */}
                              <td className="py-3 px-3 text-center font-mono font-bold text-slate-400 text-3xs">
                                {idx + 1}
                              </td>

                              {/* Title & Authors */}
                              <td className="py-3 px-3">
                                <div className="flex items-start gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedPaperForModal(paper)}
                                    className="font-bold text-slate-900 hover:text-teal-700 text-left line-clamp-2 leading-snug group-hover:underline flex-1"
                                  >
                                    {paper.title}
                                  </button>
                                  {paper.isCustomUpload && (
                                    <span className="shrink-0 px-1.5 py-0.5 rounded text-3xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                      Custom Added
                                    </span>
                                  )}
                                </div>
                                <div className="text-3xs text-slate-500 mt-0.5">
                                  <span>{paper.authors.split(',')[0]} et al.</span>
                                  <span className="mx-1">•</span>
                                  <span className="font-semibold text-slate-700">{paper.year}</span>
                                  <span className="mx-1">•</span>
                                  <span className="text-slate-400 italic truncate max-w-[150px] inline-block align-bottom">{paper.venue}</span>
                                </div>
                              </td>

                              {/* Modality & Page */}
                              <td className="py-3 px-3">
                                <span className="inline-block px-2 py-0.5 rounded text-3xs font-semibold bg-slate-100 text-slate-700 mb-1">
                                  {paper.modality}
                                </span>
                                <div className="text-3xs font-mono text-teal-700 font-bold">
                                  p. {page}
                                </div>
                              </td>

                              {/* Problem Statement (What it solves) */}
                              <td className="py-3 px-3 bg-amber-50/20">
                                <div className="flex items-start space-x-1.5 text-amber-950">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                  <p className="text-2xs leading-relaxed font-normal">
                                    {paper.problemStatement || 'Non-invasive continuous physiological monitoring under motion and noise.'}
                                  </p>
                                </div>
                              </td>

                              {/* Device / Sensor Hardware */}
                              <td className="py-3 px-3 bg-teal-50/20">
                                <div className="flex items-start space-x-1.5 text-teal-950">
                                  <Cpu className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                                  <p className="text-2xs leading-relaxed font-medium">
                                    {paper.deviceUsed || 'Standard clinical telemetry monitor and biosensors.'}
                                  </p>
                                </div>
                              </td>

                              {/* Ground Truth Reference */}
                              <td className="py-3 px-3 bg-emerald-50/20">
                                <div className="flex items-start space-x-1.5 text-emerald-950">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <p className="text-2xs leading-relaxed font-medium">
                                    {paper.groundTruth || 'Clinical gold standard telemetry reference.'}
                                  </p>
                                </div>
                              </td>

                              {/* Method & Key Benchmark */}
                              <td className="py-3 px-3">
                                <p className="text-3xs text-slate-600 line-clamp-2 mb-1.5">
                                  {paper.methodology}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {Object.entries(paper.metrics).slice(0, 2).map(([k, v]) => (
                                    <span 
                                      key={k}
                                      className="px-1.5 py-0.5 bg-teal-50 text-teal-800 rounded font-mono font-semibold text-3xs border border-teal-200/60"
                                    >
                                      {k}: {v}
                                    </span>
                                  ))}
                                </div>
                              </td>

                              {/* Action Button */}
                              <td className="py-3 px-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => setSelectedPaperForModal(paper)}
                                  className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                                  title="Inspect full details & citations"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'thematic' && (
            /* ============================================================ */
            /* THEMATIC SYNTHESIS & REVIEW VIEW */
            /* ============================================================ */
            <div className="space-y-6">
              {/* Topic Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {LITERATURE_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      selectedTopicId === topic.id
                        ? 'bg-white border-teal-500 shadow-xs ring-2 ring-teal-500/20'
                        : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-900 line-clamp-1">
                        {topic.title}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-3xs font-semibold bg-teal-50 text-teal-700">
                        {topic.paperIds.length} Papers
                      </span>
                    </div>
                    <p className="text-3xs text-slate-500 line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </button>
                ))}
              </div>

              {/* Active Thematic Review Panel */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {activeTopic.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
                      {activeTopic.description}
                    </p>
                  </div>

                  {onSendToChat && (
                    <button
                      type="button"
                      onClick={() => onSendToChat(activeTopic.suggestedPrompt)}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-colors shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Deep RAG Synthesis in Chat</span>
                    </button>
                  )}
                </div>

                {/* Thematic Papers Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeTopicPapers.map((paper) => (
                    <div
                      key={paper.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-3xs font-mono font-bold text-teal-700 uppercase">
                            {paper.id.toUpperCase()} • p. {paper.chunks[0]?.page || 1}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug mt-0.5">
                            {paper.title}
                          </h4>
                          <span className="text-3xs text-slate-500">
                            {paper.authors} ({paper.year})
                          </span>
                        </div>
                      </div>

                      {/* Problem Statement Card Item */}
                      <div className="p-2 bg-amber-50/80 rounded-lg border border-amber-200/60 text-2xs space-y-0.5">
                        <span className="text-3xs font-bold text-amber-800 uppercase tracking-wider block">
                          Problem Statement (What it Solves):
                        </span>
                        <p className="text-amber-950 font-normal">
                          {paper.problemStatement}
                        </p>
                      </div>

                      {/* Devices & Ground Truth Grid */}
                      <div className="grid grid-cols-2 gap-2 text-3xs">
                        <div className="p-2 bg-teal-50/80 rounded-lg border border-teal-200/60 space-y-0.5">
                          <span className="font-bold text-teal-800 uppercase block">
                            Hardware / Device:
                          </span>
                          <p className="text-teal-950">
                            {paper.deviceUsed}
                          </p>
                        </div>
                        <div className="p-2 bg-emerald-50/80 rounded-lg border border-emerald-200/60 space-y-0.5">
                          <span className="font-bold text-emerald-800 uppercase block">
                            Ground Truth:
                          </span>
                          <p className="text-emerald-950">
                            {paper.groundTruth}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {Object.entries(paper.metrics).map(([k, v]) => (
                          <span 
                            key={k}
                            className="px-2 py-0.5 bg-white text-slate-700 rounded font-mono font-semibold text-3xs border border-slate-200"
                          >
                            {k}: {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Academic Export Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-2xs text-slate-500">
                    Export comparative tables for academic report & slides
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(generateMarkdownTable(activeTopicPapers), 'thematic-md')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                    >
                      {copiedType === 'thematic-md' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy Theme Markdown</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(generateLatexTable(activeTopicPapers), 'thematic-latex')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                    >
                      {copiedType === 'thematic-latex' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy Theme LaTeX</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'ai-synthesis' && (
            /* ============================================================ */
            /* AI LIVE CROSS-CORPUS SYNTHESIS STUDIO */
            /* ============================================================ */
            <div className="space-y-6">
              {/* Studio Control Header */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-700">
                        <Brain className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Cross-Paper AI Synthesis & Review Studio
                        </h3>
                        <p className="text-2xs text-slate-500">
                          Deep cross-corpus reasoning via Gemini 2.5: Synthesize literature reviews and extract structured consensus & debates.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sub-Tab Toggle */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium border border-slate-200/80 self-start md:self-auto">
                    <button
                      type="button"
                      onClick={() => setSynthesisSubTab('review')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                        synthesisSubTab === 'review'
                          ? 'bg-white text-teal-900 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-teal-600" />
                      <span>Systematic Review</span>
                      {generatedReviewMarkdown && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSynthesisSubTab('cross-matrix')}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                        synthesisSubTab === 'cross-matrix'
                          ? 'bg-white text-teal-900 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <GitCompare className="w-3.5 h-3.5 text-teal-600" />
                      <span>Comparative Matrix</span>
                      {generatedCrossMatrix && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Step 1: Select Active Research Corpus / Domain */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider">
                      1. Select Target Corpus or Topic Domain
                    </span>
                    <span className="text-3xs text-teal-700 font-semibold">
                      {activeTopicPapers.length} papers queued for synthesis
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {LITERATURE_TOPICS.map((topic) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setSelectedTopicId(topic.id)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedTopicId === topic.id
                            ? 'bg-teal-50/60 border-teal-500 shadow-2xs ring-1 ring-teal-500/20'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-900 line-clamp-1">
                            {topic.title}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-3xs font-bold bg-white text-teal-800 border border-teal-200">
                            {topic.domainName.split('&')[0].trim()}
                          </span>
                        </div>
                        <p className="text-3xs text-slate-500 line-clamp-2 leading-relaxed">
                          {topic.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Custom Research Lens / Objective */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider">
                      2. Theoretical Framing or Inquiry Lens (Optional)
                    </span>
                    <button
                      type="button"
                      onClick={() => setCustomResearchObjective(activeTopic.suggestedPrompt)}
                      className="text-3xs text-teal-700 font-semibold hover:underline"
                    >
                      Use domain suggested prompt
                    </button>
                  </div>
                  <input
                    type="text"
                    value={customResearchObjective}
                    onChange={(e) => setCustomResearchObjective(e.target.value)}
                    placeholder={`e.g., Focus on methodological conflicts, sample scale, hardware limits, and evaluation benchmarks...`}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>

                {/* Action Trigger Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    disabled={isSynthesizing}
                    onClick={handleGenerateLiteratureReview}
                    className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-xs transition-colors"
                  >
                    {isSynthesizing && synthesisSubTab === 'review' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                    <span>Generate Systematic Literature Review</span>
                  </button>

                  <button
                    type="button"
                    disabled={isSynthesizing}
                    onClick={handleGenerateCrossMatrix}
                    className="px-4 py-2.5 bg-white hover:bg-slate-50 disabled:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-2xs transition-colors"
                  >
                    {isSynthesizing && synthesisSubTab === 'cross-matrix' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                    ) : (
                      <GitCompare className="w-4 h-4 text-teal-600" />
                    )}
                    <span>Generate Cross-Paper Matrix</span>
                  </button>
                </div>
              </div>

              {/* In-Progress Banner */}
              {isSynthesizing && (
                <div className="bg-teal-50/80 border border-teal-200/80 rounded-2xl p-6 text-center space-y-3 shadow-2xs">
                  <div className="w-10 h-10 mx-auto rounded-full bg-teal-100 flex items-center justify-center text-teal-700 animate-pulse">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-teal-950">
                      ScholarFlow AI Synthesis Engine Active
                    </h4>
                    <p className="text-xs text-teal-800 mt-0.5">
                      {synthesisStatusMessage || 'Correlating multi-document corpus evidence with academic cross-referencing...'}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-3xs text-teal-600 font-mono">
                    <span>Synthesizing across {activeTopicPapers.length} research papers</span>
                    <span>•</span>
                    <span>Domain: {activeTopic.domainName}</span>
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {synthesisError && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start space-x-3 text-red-800">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs space-y-1">
                    <p className="font-bold">Synthesis Engine Notice</p>
                    <p>{synthesisError}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSynthesisError(null)}
                    className="text-red-500 hover:text-red-700 text-xs font-semibold"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* ============================================================ */}
              {/* SUB-VIEW 1: SYSTEMATIC LITERATURE REVIEW (MARKDOWN) */}
              {/* ============================================================ */}
              {synthesisSubTab === 'review' && (
                <div className="space-y-4">
                  {generatedReviewMarkdown ? (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                      {/* Review Top Header & Export Strip */}
                      <div className="px-6 py-4 bg-slate-50/60 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                          <span className="text-xs font-bold text-slate-800">
                            Academic Literature Review • {activeTopic.domainName}
                          </span>
                          <span className="text-3xs text-slate-400 font-mono">
                            ~{generatedReviewMarkdown.split(/\s+/).length} words
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleCopy(generatedReviewMarkdown, 'review-md')}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
                          >
                            {copiedType === 'review-md' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>Copy Markdown</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownload(`${activeTopic.id}-literature-review.md`, generatedReviewMarkdown, 'text/markdown')}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download .md</span>
                          </button>

                          {onSendToChat && (
                            <button
                              type="button"
                              onClick={() => onSendToChat(`I would like to critique and expand upon the newly synthesized literature review on "${activeTopic.title}":\n\n${generatedReviewMarkdown.slice(0, 500)}...`)}
                              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-colors"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Discuss in RAG Chat</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Rendered Academic Markdown Content */}
                      <div className="p-6 sm:p-8">
                        <div className="max-w-4xl mx-auto">
                          <div className="markdown-body prose prose-slate max-w-none text-xs leading-relaxed">
                            <Markdown>{generatedReviewMarkdown}</Markdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Review Empty State */
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-2xs">
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-700">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="max-w-md mx-auto">
                        <h4 className="text-sm font-bold text-slate-900">
                          No Literature Review Generated Yet
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Click <strong>"Generate Systematic Literature Review"</strong> above to produce a formal, multi-section publication review synthesizing problem statements, methodologies, theoretical frameworks, and research opportunities across the selected corpus.
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={isSynthesizing}
                        onClick={handleGenerateLiteratureReview}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white rounded-xl text-xs font-semibold inline-flex items-center space-x-1.5 shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Generate Review for "{activeTopic.title}"</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================ */}
              {/* SUB-VIEW 2: CROSS-PAPER COMPARATIVE MATRIX */}
              {/* ============================================================ */ }
              {synthesisSubTab === 'cross-matrix' && (
                <div className="space-y-4">
                  {generatedCrossMatrix ? (
                    <div className="space-y-6">
                      {/* Matrix Action Strip */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                          <span className="text-xs font-bold text-slate-800">
                            Comparative Synthesis Matrix • {generatedCrossMatrix.comparativeDimensions.length} Dimensions Analyzed
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleCopy(JSON.stringify(generatedCrossMatrix, null, 2), 'matrix-json')}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
                          >
                            {copiedType === 'matrix-json' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>Copy JSON</span>
                          </button>

                          {onSendToChat && (
                            <button
                              type="button"
                              onClick={() => onSendToChat(`Analyze the theoretical controversies and consensus identified in this cross-paper matrix for "${activeTopic.title}": ${JSON.stringify(generatedCrossMatrix.controversyPoints)}`)}
                              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-colors"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Explore In RAG Chat</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* 1. Comparative Dimensions Breakdown */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Layers className="w-4 h-4 text-teal-600" />
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            1. Analytical Dimensions & Cross-Paper Juxtaposition
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {generatedCrossMatrix.comparativeDimensions.map((dim, idx) => (
                            <div
                              key={idx}
                              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-teal-900">
                                  {dim.dimension}
                                </span>
                                <span className="text-3xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                  {dim.paperStances.length} viewpoints compared
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                {dim.paperStances.map((stance, sIdx) => (
                                  <div
                                    key={sIdx}
                                    className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-1"
                                  >
                                    <p className="text-3xs font-bold text-slate-800 line-clamp-1">
                                      {stance.paperTitle}
                                    </p>
                                    <p className="text-2xs text-slate-600 leading-relaxed">
                                      {stance.summary}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl flex items-start space-x-2">
                                <Sparkles className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                                <div className="text-2xs text-teal-950 leading-relaxed">
                                  <span className="font-bold">Cross-Paper Takeaway: </span>
                                  {dim.crossPaperTakeaway}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 2. Consensus & Mutual Corroboration */}
                      {generatedCrossMatrix.consensusPoints && generatedCrossMatrix.consensusPoints.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                              2. Points of Scholarly Consensus & Mutual Corroboration
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {generatedCrossMatrix.consensusPoints.map((cp, idx) => (
                              <div
                                key={idx}
                                className="bg-white rounded-2xl border border-emerald-200/80 p-4 shadow-2xs space-y-2 bg-emerald-50/10"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-emerald-950">
                                    {cp.topic}
                                  </span>
                                  <span className="px-2 py-0.5 rounded-full text-3xs font-bold bg-emerald-100 text-emerald-800">
                                    Consensus
                                  </span>
                                </div>
                                <p className="text-2xs text-slate-700 leading-relaxed">
                                  {cp.consensusStatement}
                                </p>
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {cp.agreeingPapers.map((ap, aIdx) => (
                                    <span
                                      key={aIdx}
                                      className="px-1.5 py-0.5 rounded text-3xs bg-slate-100 text-slate-600 font-mono"
                                    >
                                      {ap}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Controversies & Methodological Tensions */}
                      {generatedCrossMatrix.controversyPoints && generatedCrossMatrix.controversyPoints.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Scale className="w-4 h-4 text-amber-600" />
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                              3. Scholarly Controversies, Antinomies & Methodological Tensions
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {generatedCrossMatrix.controversyPoints.map((cv, idx) => (
                              <div
                                key={idx}
                                className="bg-white rounded-2xl border border-amber-200/80 p-4 shadow-2xs space-y-2.5 bg-amber-50/10"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-amber-950">
                                    {cv.topic}
                                  </span>
                                  <span className="px-2 py-0.5 rounded-full text-3xs font-bold bg-amber-100 text-amber-800">
                                    Dispute / Tension
                                  </span>
                                </div>
                                <p className="text-2xs text-slate-700 leading-relaxed font-medium">
                                  {cv.disputeSummary}
                                </p>
                                <div className="space-y-1.5 pt-1 border-t border-amber-100">
                                  {cv.viewpoints.map((vp, vIdx) => (
                                    <div key={vIdx} className="text-3xs bg-amber-50/60 p-2 rounded-lg border border-amber-200/60">
                                      <span className="font-bold text-amber-900">{vp.paperTitle}: </span>
                                      <span className="text-slate-700">{vp.stance}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 4. Methodological Evaluation & Future Research */}
                      {(generatedCrossMatrix.methodologicalEvaluation || (generatedCrossMatrix.recommendedFutureDirections && generatedCrossMatrix.recommendedFutureDirections.length > 0)) && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-teal-600" />
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                              4. Methodological Evaluation & Recommended Research Trajectories
                            </h4>
                          </div>

                          {generatedCrossMatrix.methodologicalEvaluation && (
                            <p className="text-xs text-slate-700 leading-relaxed">
                              {generatedCrossMatrix.methodologicalEvaluation}
                            </p>
                          )}

                          {generatedCrossMatrix.recommendedFutureDirections && generatedCrossMatrix.recommendedFutureDirections.length > 0 && (
                            <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                              {generatedCrossMatrix.recommendedFutureDirections.map((rec, rIdx) => (
                                <li key={rIdx} className="flex items-start space-x-2 text-2xs text-slate-700">
                                  <ChevronRight className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Matrix Empty State */
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-2xs">
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-700">
                        <GitCompare className="w-6 h-6" />
                      </div>
                      <div className="max-w-md mx-auto">
                        <h4 className="text-sm font-bold text-slate-900">
                          No Comparative Matrix Generated Yet
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Click <strong>"Generate Cross-Paper Matrix"</strong> above to extract comparative dimensions, consensus points, and scholarly controversies across the papers in "{activeTopic.title}".
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={isSynthesizing}
                        onClick={handleGenerateCrossMatrix}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white rounded-xl text-xs font-semibold inline-flex items-center space-x-1.5 shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Generate Matrix for "{activeTopic.title}"</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* VIEW MODE 4: LITERATURE REVIEW SECTION IMPROVER & GAP AUDITOR */}
          {/* ============================================================ */}
          {viewMode === 'lit-improver' && (
            <LiteratureReviewImprover
              papers={currentPapers}
              onSendToChat={onSendToChat}
            />
          )}
        </div>
      </div>

      {/* Comprehensive Academic Paper Dossier Modal */}
      {selectedPaperForModal && (
        <PaperDossierModal
          paper={selectedPaperForModal}
          isOpen={true}
          onClose={() => setSelectedPaperForModal(null)}
          onSendToChat={onSendToChat}
        />
      )}
    </div>
  );
};
