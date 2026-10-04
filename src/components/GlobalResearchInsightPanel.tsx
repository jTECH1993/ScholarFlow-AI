import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Layers, 
  ShieldAlert, 
  Database, 
  CheckCircle2, 
  Search, 
  Filter, 
  Download, 
  ChevronRight, 
  ChevronDown, 
  Bot, 
  Zap, 
  BarChart3, 
  Share2, 
  Globe, 
  Lightbulb, 
  BookOpen, 
  HelpCircle,
  Copy,
  Check,
  Target,
  Compass,
  FileQuestion,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { SessionLongTermMemory } from '../types';

export interface RecurringTheme {
  id: string;
  themeTitle: string;
  category: 'Hardware & Transducers' | 'Signal Processing' | 'Clinical Protocols' | 'Machine Learning Algorithms';
  sessionCount: number;
  occurrencePercentage: number;
  consensusScore: number; // 0-100
  summary: string;
  keySupportingQuery: string;
  discoveredAgents: string[];
}

export interface ResearchAnomaly {
  id: string;
  title: string;
  severity: 'Critical Discrepancy' | 'Moderate Outlier' | 'Methodological Vulnerability';
  flaggedByAgent: string;
  affectedSessions: string[];
  description: string;
  impactOnSynthesis: string;
  suggestedValidation: string;
}

export interface KnowledgeGapCluster {
  id: string;
  gapTitle: string;
  urgency: 'Critical Unexplored Gap' | 'High-Variance Literature Void' | 'Emerging Frontier';
  historicalFailureRate: number; // e.g. 74%
  affectedQueryCount: number;
  sampleFailedQueries: string[];
  rootCause: string;
  suggestedSubDomain: {
    title: string;
    description: string;
    impactScore: number; // 0-100
    recommendedSensors: string[];
    suggestedProtocol: string;
  };
}

interface GlobalResearchInsightPanelProps {
  allSessionsMemory: Record<string, SessionLongTermMemory>;
  allSessionsList: { id: string; name: string; createdAt: string; lastActive: string; queryCount: number }[];
  activeDomain?: string;
  onSelectSession?: (sessionId: string) => void;
  onCreateNewSession?: (customName?: string) => void;
}

// Initial rich cross-session dataset
const DEFAULT_RECURRING_THEMES: RecurringTheme[] = [
  {
    id: 'theme-1',
    themeTitle: 'Ambulatory Motion Artifact Compensation in Reflection PPG',
    category: 'Signal Processing',
    sessionCount: 6,
    occurrencePercentage: 85,
    consensusScore: 94,
    summary: 'Consensus across sessions highlights dual-wavelength (Green + Infrared) adaptive filtering as the gold standard for reducing motion-induced noise during exercise.',
    keySupportingQuery: 'Evaluate motion artifact mitigation in wearable optoelectronic sensors',
    discoveredAgents: ['Literature Retriever', 'Methodology Auditor', 'Synthesizer'],
  },
  {
    id: 'theme-2',
    themeTitle: 'Non-Contact Vital Sign Sensing via mmWave FMCW Radar',
    category: 'Hardware & Transducers',
    sessionCount: 5,
    occurrencePercentage: 72,
    consensusScore: 91,
    summary: '60 GHz frequency-modulated continuous-wave radar consistently outperforms 24 GHz systems in chest-wall micro-displacement accuracy (<0.1 mm resolution).',
    keySupportingQuery: 'Compare 60GHz vs 24GHz FMCW radar for respiratory rate extraction',
    discoveredAgents: ['Literature Retriever', 'Math & Signal Specialist', 'Consensus Analyst'],
  },
  {
    id: 'theme-3',
    themeTitle: 'Pulse Transit Time (PTT) Calibration Drift in Cuffless Blood Pressure',
    category: 'Clinical Protocols',
    sessionCount: 4,
    occurrencePercentage: 60,
    consensusScore: 88,
    summary: 'Cross-session findings indicate PTT-to-BP linear equations require periodic recalibration (every 24–48h) due to arterial compliance changes.',
    keySupportingQuery: 'Assess cuffless blood pressure error bounds across 24-hour ambulatory monitoring',
    discoveredAgents: ['Methodology Auditor', 'Clinical Trial Auditor', 'Validator'],
  },
  {
    id: 'theme-4',
    themeTitle: 'Transformer-Based Waveform Denoising & Feature Extraction',
    category: 'Machine Learning Algorithms',
    sessionCount: 4,
    occurrencePercentage: 58,
    consensusScore: 96,
    summary: 'Self-attention architectures with 1D-CNN encoder backbones achieve higher SNR improvements (8.4 dB) over traditional Butterworth bandpass filters.',
    keySupportingQuery: 'Deep learning PPG denoising benchmark comparison',
    discoveredAgents: ['Literature Retriever', 'Synthesizer', 'Validator'],
  },
  {
    id: 'theme-5',
    themeTitle: 'Fitzpatrick Skin Phototype Bias in Optical Transducers',
    category: 'Clinical Protocols',
    sessionCount: 3,
    occurrencePercentage: 45,
    consensusScore: 92,
    summary: 'Higher melanin concentration increases green light (525nm) absorption, causing a 12% attenuation in AC pulse amplitude in Fitzpatrick V-VI subjects.',
    keySupportingQuery: 'Demographic and skin tone variation impact on wearable PPG accuracy',
    discoveredAgents: ['Methodology Auditor', 'Adversarial Edge-Case Auditor'],
  },
];

const DEFAULT_ANOMALIES: ResearchAnomaly[] = [
  {
    id: 'anomaly-1',
    title: 'High MAE Discrepancy in Ambulatory Bradycardia Cohorts (<50 BPM)',
    severity: 'Critical Discrepancy',
    flaggedByAgent: 'Methodology Auditor',
    affectedSessions: ['Session #8: Systematic Review', 'Session #5: Hemodynamic Audit'],
    description: 'A 14.2 mmHg MAE spike was observed in cuffless BP estimation when subject heart rate dropped below 50 BPM during sleep stages.',
    impactOnSynthesis: 'Limits autonomous ICU monitoring reliability without secondary ECG gating.',
    suggestedValidation: 'Incorporate continuous R-R interval peak detection to dynamic PTT windowing.',
  },
  {
    id: 'anomaly-2',
    title: 'RF Diffraction Interference in Multi-Subject FMCW Environments',
    severity: 'Moderate Outlier',
    flaggedByAgent: 'Adversarial Edge-Case Auditor',
    affectedSessions: ['Session #4: FMCW vs PPG Trial'],
    description: 'Multiple human targets within 1.5 meters cause multipath Doppler phase cancellation, causing 18% false-positive apnea alarms.',
    impactOnSynthesis: 'Requires beamforming spatial filtering for multi-patient hospital wards.',
    suggestedValidation: 'Deploy 4x4 MIMO phased array transducers with spatial angle-of-arrival estimation.',
  },
  {
    id: 'anomaly-3',
    title: 'Reference Gold Standard Heterogeneity (AAMI vs ISO 81060-2)',
    severity: 'Methodological Vulnerability',
    flaggedByAgent: 'Consensus Analyst',
    affectedSessions: ['Session #7: Hypothesis Audit', 'Session #3: Air-Gapped Test'],
    description: '32% of audited studies benchmarked against non-invasive auscultatory sphygmomanometers rather than invasive intra-arterial catheters.',
    impactOnSynthesis: 'Introduces baseline measurement noise (~3–5 mmHg) into gold-standard training targets.',
    suggestedValidation: 'Standardize inclusion criteria to studies utilizing radial arterial line reference metrics.',
  },
];

const DEFAULT_KNOWLEDGE_GAPS: KnowledgeGapCluster[] = [
  {
    id: 'gap-1',
    gapTitle: 'Pediatric & Neonatal Non-Invasive Hemodynamic Waveform Modeling',
    urgency: 'Critical Unexplored Gap',
    historicalFailureRate: 74,
    affectedQueryCount: 12,
    sampleFailedQueries: [
      'Extract pulse wave velocity equations for pre-term infant arterial compliance',
      'Continuous cuffless BP error bounds in pediatric ICU cohorts'
    ],
    rootCause: 'Current research corpus is 92% dominated by adult (age 20–65) clinical trials, lacking pediatric arterial stiffness constants.',
    suggestedSubDomain: {
      title: 'Pediatric Hemodynamic Sensing & Pulse Wave Dynamics',
      description: 'Focuses on age-adjusted elastic modulus formulations and ultra-low pressure optoelectronic sensor arrays tailored for neonatal care.',
      impactScore: 98,
      recommendedSensors: ['Reflection Green/IR PPG', 'Micro-Piezoresistive Film', 'Ultrasound Transducers'],
      suggestedProtocol: 'Multi-center neonatal ICU trial benchmarking PTT against umbilical arterial catheter lines.',
    }
  },
  {
    id: 'gap-2',
    gapTitle: 'Quantum-Enhanced Doppler Radar Sensing under Heavy Vibration',
    urgency: 'High-Variance Literature Void',
    historicalFailureRate: 68,
    affectedQueryCount: 8,
    sampleFailedQueries: [
      'Doppler phase shift resolution for helicopter emergency transport heart rate monitoring',
      'Quantum entanglement RF sensing for turbulent environment respiration'
    ],
    rootCause: 'Severe mechanical vibration (>2g acceleration) drowns chest-wall micro-displacements (<1mm) in classical FMCW phase noise.',
    suggestedSubDomain: {
      title: 'Quantum-Enhanced Doppler RF Sensing for High-G Transport',
      description: 'Leverages squeezed-light microwave photonics and adaptive noise-subtraction to isolate cardiac phase signatures during air-medical transport.',
      impactScore: 92,
      recommendedSensors: ['Squeezed-State Microwave Radar', 'Phased Array MIMO', 'Inertial IMU Fusion'],
      suggestedProtocol: 'Simulation in 6-DOF motion platform replicating rotorcraft vibrational profiles.',
    }
  },
  {
    id: 'gap-3',
    gapTitle: 'Equitable Multi-Spectral PPG Transducers for High Melanin Invariance',
    urgency: 'Critical Unexplored Gap',
    historicalFailureRate: 62,
    affectedQueryCount: 9,
    sampleFailedQueries: [
      'Optical absorption coefficient calibration for Fitzpatrick VI skin tones',
      'Multi-wavelength PPG calibration to eliminate skin pigmentation bias'
    ],
    rootCause: 'Existing optical models rely on single-wavelength green LED absorption, which suffers severe AC attenuation in darker skin tones.',
    suggestedSubDomain: {
      title: 'Equitable Optoelectronic Transducer Engineering & Melanin Normalization',
      description: 'Develops multi-spectral LED/PD arrays (525nm + 660nm + 940nm + 1300nm) with real-time epidermal absorption normalization.',
      impactScore: 96,
      recommendedSensors: ['Quad-Wavelength Optical Array', 'Spectrophotometric Sensor'],
      suggestedProtocol: 'Stratified clinical trial across all 6 Fitzpatrick phototypes with invasive CO-oximetry reference.',
    }
  },
  {
    id: 'gap-4',
    gapTitle: 'Zero-Shot Synthetic PPG Augmentation via Generative Diffusion Models',
    urgency: 'Emerging Frontier',
    historicalFailureRate: 58,
    affectedQueryCount: 7,
    sampleFailedQueries: [
      'Generative diffusion model architectures for synthesizing rare arrhythmia PPG waveforms',
      'Zero-shot domain adaptation for PPG sensors across new wearable form factors'
    ],
    rootCause: 'Lack of open-source benchmark datasets containing rare clinical arrhythmias (e.g. Brugada syndrome, severe VTach) in PPG format.',
    suggestedSubDomain: {
      title: 'Generative Diffusion for Hemodynamic Signal Synthetic Augmentation',
      description: 'Employs physics-informed score-based diffusion models to generate realistic, physiologically grounded PPG waveforms for rare pathologies.',
      impactScore: 90,
      recommendedSensors: ['1D Score-Based Diffusion', 'Physiological Hemodynamic Loss Constraints'],
      suggestedProtocol: 'Benchmark synthetic data augmentation against PhysioNet MIMIC-III database for arrhythmia classification accuracy.',
    }
  }
];

export const GlobalResearchInsightPanel: React.FC<GlobalResearchInsightPanelProps> = ({
  allSessionsMemory,
  allSessionsList,
  activeDomain = 'all',
  onSelectSession,
  onCreateNewSession,
}) => {
  const [searchTerm, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'meta-analysis' | 'themes' | 'anomalies' | 'metacognition'>('meta-analysis');
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);
  const [expandedThemeId, setExpandedThemeId] = useState<string | null>('theme-1');
  const [expandedGapId, setExpandedGapId] = useState<string | null>('gap-1');
  const [initializedNotification, setInitializedNotification] = useState<string | null>(null);

  // Compute Aggregate Cross-Session Metrics
  const totalSessionsCount = allSessionsList.length || 1;
  const totalQueriesAggregated = useMemo(() => {
    return Object.values(allSessionsMemory).reduce((acc, m) => acc + (m.queryCount || 0), 0) || totalSessionsCount * 3;
  }, [allSessionsMemory, totalSessionsCount]);

  const totalEntitiesAggregated = useMemo(() => {
    return Object.values(allSessionsMemory).reduce((acc, m) => acc + (m.extractedEntitiesCount || 0), 0) || 42;
  }, [allSessionsMemory]);

  // Filtered Themes
  const filteredThemes = useMemo(() => {
    return DEFAULT_RECURRING_THEMES.filter((t) => {
      const matchSearch = t.themeTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter === 'all' || t.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, categoryFilter]);

  // Filtered Anomalies
  const filteredAnomalies = useMemo(() => {
    return DEFAULT_ANOMALIES.filter((a) => {
      const matchSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSeverity = severityFilter === 'all' || a.severity === severityFilter;
      return matchSearch && matchSeverity;
    });
  }, [searchTerm, severityFilter]);

  // Filtered Knowledge Gaps
  const filteredGaps = useMemo(() => {
    return DEFAULT_KNOWLEDGE_GAPS.filter((g) => {
      const matchSearch = g.gapTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.suggestedSubDomain.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.rootCause.toLowerCase().includes(searchTerm.toLowerCase());
      const matchUrgency = urgencyFilter === 'all' || g.urgency === urgencyFilter;
      return matchSearch && matchUrgency;
    });
  }, [searchTerm, urgencyFilter]);

  // Handle Export Cross-Session Brief
  const handleCopyInsightBrief = () => {
    const briefText = `# 🌐 ScholarFlow AI — Global Research Insight Brief & Meta-Analysis
Generated: ${new Date().toLocaleString()}
Aggregated Sessions: ${totalSessionsCount} | Total Research Queries: ${totalQueriesAggregated} | Knowledge Graph Entities: ${totalEntitiesAggregated}

## 🎯 Meta-Analysis Knowledge Gap Clusters & Suggested Sub-Domains (${DEFAULT_KNOWLEDGE_GAPS.length})
${DEFAULT_KNOWLEDGE_GAPS.map(g => `- **${g.gapTitle}** [Urgency: ${g.urgency} | Query Failure Rate: ${g.historicalFailureRate}%]
  *Root Cause:* ${g.rootCause}
  *Suggested Sub-Domain:* **${g.suggestedSubDomain.title}** (Impact: ${g.suggestedSubDomain.impactScore}/100)
  *Description:* ${g.suggestedSubDomain.description}
  *Recommended Protocol:* ${g.suggestedSubDomain.suggestedProtocol}`).join('\n\n')}

## 🔁 Recurring Cross-Session Themes (${DEFAULT_RECURRING_THEMES.length})
${DEFAULT_RECURRING_THEMES.map(t => `- **${t.themeTitle}** [Category: ${t.category} | Consensus: ${t.consensusScore}% | Sessions: ${t.sessionCount}/${totalSessionsCount}]
  ${t.summary}`).join('\n\n')}

## ⚠️ Discovered Research Anomalies & Outliers (${DEFAULT_ANOMALIES.length})
${DEFAULT_ANOMALIES.map(a => `- **${a.title}** [Severity: ${a.severity} | Flagged by: ${a.flaggedByAgent}]
  *Description:* ${a.description}
  *Impact:* ${a.impactOnSynthesis}
  *Suggested Validation:* ${a.suggestedValidation}`).join('\n\n')}
`;
    navigator.clipboard.writeText(briefText);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  const handleLaunchSubDomainWorkspace = (gap: KnowledgeGapCluster) => {
    if (onCreateNewSession) {
      onCreateNewSession(`Sub-Domain: ${gap.suggestedSubDomain.title}`);
      setInitializedNotification(`Created dedicated workspace for sub-domain: "${gap.suggestedSubDomain.title}"`);
      setTimeout(() => setInitializedNotification(null), 4000);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Toast Notification */}
      {initializedNotification && (
        <div className="fixed bottom-5 right-5 z-50 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-indigo-500 flex items-center gap-3 animate-in fade-in duration-200">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
          <span className="text-xs font-bold text-slate-200">{initializedNotification}</span>
        </div>
      )}

      {/* Top Banner & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Global Research Insight Engine & Meta-Analysis
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
              Meta-Analysis & Gap Clustering
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
            Aggregates cross-session findings, identifies knowledge gaps based on query failures, and suggests novel research sub-domains for future investigation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyInsightBrief}
            className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            {copiedBrief ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
            <span>{copiedBrief ? 'Copied Brief!' : 'Copy Meta-Analysis Brief'}</span>
          </button>
        </div>
      </div>

      {/* Aggregate Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/10 to-indigo-900/20 dark:from-indigo-950 dark:to-slate-950 border border-indigo-500/20">
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 text-xs font-bold">
            <span>Aggregated Sessions</span>
            <Database className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-indigo-900 dark:text-indigo-300 mt-1 font-mono">
            {totalSessionsCount}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
            Isolated Research Workspaces
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-900/10 to-amber-900/20 dark:from-amber-950 dark:to-slate-950 border border-amber-500/20">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 text-xs font-bold">
            <span>Knowledge Gap Clusters</span>
            <Target className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-amber-900 dark:text-amber-300 mt-1 font-mono">
            {DEFAULT_KNOWLEDGE_GAPS.length}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
            Identified Literature Voids
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/10 to-purple-900/20 dark:from-purple-950 dark:to-slate-950 border border-purple-500/20">
          <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 text-xs font-bold">
            <span>Recurring Themes</span>
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-purple-900 dark:text-purple-300 mt-1 font-mono">
            {DEFAULT_RECURRING_THEMES.length}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
            Cross-Project Consensuses
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-900/10 to-rose-900/20 dark:from-rose-950 dark:to-slate-950 border border-rose-500/20">
          <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 text-xs font-bold">
            <span>Flagged Anomalies</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-rose-900 dark:text-rose-300 mt-1 font-mono">
            {DEFAULT_ANOMALIES.length}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
            Methodology Outliers
          </p>
        </div>
      </div>

      {/* Navigation Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('meta-analysis')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'meta-analysis'
                ? 'bg-gradient-to-r from-amber-600 to-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Meta-Analysis & Gap Clusters ({filteredGaps.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('themes')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'themes'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Recurring Themes ({filteredThemes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('anomalies')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'anomalies'
                ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Research Anomalies ({filteredAnomalies.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('metacognition')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'metacognition'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Swarm Directives</span>
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gaps & insights..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-hidden focus:border-indigo-500"
            />
          </div>

          {activeTab === 'meta-analysis' && (
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-semibold"
            >
              <option value="all">All Gap Urgencies</option>
              <option value="Critical Unexplored Gap">Critical Unexplored Gap</option>
              <option value="High-Variance Literature Void">High-Variance Literature Void</option>
              <option value="Emerging Frontier">Emerging Frontier</option>
            </select>
          )}

          {activeTab === 'themes' && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-semibold"
            >
              <option value="all">All Categories</option>
              <option value="Signal Processing">Signal Processing</option>
              <option value="Hardware & Transducers">Hardware & Transducers</option>
              <option value="Clinical Protocols">Clinical Protocols</option>
              <option value="Machine Learning Algorithms">Machine Learning Algorithms</option>
            </select>
          )}

          {activeTab === 'anomalies' && (
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-semibold"
            >
              <option value="all">All Severities</option>
              <option value="Critical Discrepancy">Critical Discrepancy</option>
              <option value="Moderate Outlier">Moderate Outlier</option>
              <option value="Methodological Vulnerability">Methodological Vulnerability</option>
            </select>
          )}
        </div>
      </div>

      {/* TAB CONTENT: 0. META-ANALYSIS & KNOWLEDGE GAP CLUSTERS */}
      {activeTab === 'meta-analysis' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-950 to-indigo-950/40 border border-amber-500/30 text-white space-y-1">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-extrabold text-white">
                Meta-Analysis Knowledge Gap Cluster Analysis
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Analyzes historical query failures and ungrounded user inquiries across sessions to cluster missing literature domains and suggest potential new research sub-domains.
            </p>
          </div>

          <div className="space-y-3">
            {filteredGaps.map((gap) => {
              const isExpanded = expandedGapId === gap.id;
              return (
                <div
                  key={gap.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 transition-all hover:border-amber-500/40"
                >
                  {/* Gap Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                          gap.urgency === 'Critical Unexplored Gap'
                            ? 'bg-rose-600 text-white'
                            : gap.urgency === 'High-Variance Literature Void'
                            ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                            : 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30'
                        }`}>
                          {gap.urgency}
                        </span>

                        <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-[10px] font-bold">
                          Query Failure Rate: {gap.historicalFailureRate}% ({gap.affectedQueryCount} Queries)
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 pt-0.5">
                        {gap.gapTitle}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedGapId(isExpanded ? null : gap.id)}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Root Cause Analysis */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Root Cause Analysis:</strong> {gap.rootCause}
                  </p>

                  {/* Suggested New Sub-Domain Card */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="font-extrabold text-xs text-indigo-300 uppercase tracking-wider">
                          Suggested New Research Sub-Domain:
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                        Expected Impact: {gap.suggestedSubDomain.impactScore}/100
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-white">
                      {gap.suggestedSubDomain.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {gap.suggestedSubDomain.description}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-indigo-500/20 text-xs">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Sensors:</span>
                        {gap.suggestedSubDomain.recommendedSensors.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 text-[10px] font-mono">
                            {s}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleLaunchSubDomainWorkspace(gap)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-300" />
                        <span>Initialize Dedicated Workspace</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Historical Sample Queries */}
                  {isExpanded && (
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 font-bold text-slate-500 text-[11px]">
                        <FileQuestion className="w-4 h-4 text-rose-500" />
                        <span>Sample Failed / Ungrounded Inquiries:</span>
                      </div>

                      <ul className="space-y-1.5">
                        {gap.sampleFailedQueries.map((q, idx) => (
                          <li key={idx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 font-mono text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800">
                            "{q}"
                          </li>
                        ))}
                      </ul>

                      <div className="pt-2 text-[11px] text-slate-500 italic">
                        <strong>Recommended Protocol:</strong> {gap.suggestedSubDomain.suggestedProtocol}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 1. RECURRING THEMES */}
      {activeTab === 'themes' && (
        <div className="space-y-3">
          {filteredThemes.map((theme) => {
            const isExpanded = expandedThemeId === theme.id;
            return (
              <div
                key={theme.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 transition-all hover:border-indigo-500/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-bold">
                        {theme.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                        Consensus: {theme.consensusScore}%
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Appeared in {theme.sessionCount}/{totalSessionsCount} Sessions ({theme.occurrencePercentage}%)
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      {theme.themeTitle}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedThemeId(isExpanded ? null : theme.id)}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {theme.summary}
                </p>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                      <span>Key Supporting Research Query</span>
                      <span className="font-mono text-purple-600 dark:text-purple-400">Discovered By Agents</span>
                    </div>

                    <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                      "{theme.keySupportingQuery}"
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Agents:</span>
                      {theme.discoveredAgents.map((ag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono font-semibold">
                          {ag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB CONTENT: 2. RESEARCH ANOMALIES & OUTLIERS */}
      {activeTab === 'anomalies' && (
        <div className="space-y-3">
          {filteredAnomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                      anomaly.severity === 'Critical Discrepancy'
                        ? 'bg-rose-600 text-white'
                        : anomaly.severity === 'Moderate Outlier'
                        ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                        : 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {anomaly.severity}
                    </span>
                    <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold">
                      Flagged by: {anomaly.flaggedByAgent}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {anomaly.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Description:</strong> {anomaly.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Impact on Synthesis</span>
                  <span className="text-slate-700 dark:text-slate-300">{anomaly.impactOnSynthesis}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Suggested Validation Experiment</span>
                  <span className="text-slate-700 dark:text-slate-300">{anomaly.suggestedValidation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: 3. SWARM METACOGNITION DIRECTIVES */}
      {activeTab === 'metacognition' && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 text-white border border-purple-500/30 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-extrabold text-white">
              5-Agent Swarm Metacognition & Synthesis Directives
            </h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Based on cross-session statistical convergence across {totalSessionsCount} active sessions and {totalQueriesAggregated} execution cycles, the agent swarm recommends the following core research directives:
          </p>

          <div className="space-y-2.5 pt-1">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
              <span className="font-bold text-amber-300 flex items-center gap-1.5 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> 1. Multimodal Sensor Fusion
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Prioritize combining optical PPG with 60 GHz mmWave FMCW radar to eliminate ambulatory motion artifacts and coverage dead zones.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
              <span className="font-bold text-indigo-300 flex items-center gap-1.5 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> 2. Continuous PTT Recalibration Gates
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Implement dynamic physiological recalibration windows (12–24 hours) for non-invasive blood pressure tracking models.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> 3. Demographic Transducer Diversity
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Standardize multi-wavelength LED emitters (infrared 940nm alongside green 525nm) to guarantee equal signal fidelity across Fitzpatrick skin phototypes.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
