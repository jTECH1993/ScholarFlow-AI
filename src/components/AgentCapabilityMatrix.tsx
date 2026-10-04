import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Award, 
  Sliders, 
  Layers, 
  Grid, 
  Table as TableIcon, 
  Search, 
  ChevronRight, 
  Cpu, 
  Brain, 
  Info,
  Activity,
  FileText
} from 'lucide-react';
import { AgentId, AgentConfig, AgentPerformanceMetrics } from '../types';

export interface AgentCapabilityInfo {
  id: AgentId;
  name: string;
  role: string;
  avatar: string;
  color: string;
  typicalLatencyMs: number;
  latencyDisplay: string;
  speedRating: 'Lightning (<1.2s)' | 'Fast (1.2s-1.5s)' | 'Thorough (1.5s-1.8s)' | 'Comprehensive (>1.8s)';
  uniqueStrengths: string[];
  domainExpertise: string[];
  outputDeliverable: string;
  recommendedTask: string;
  skillScores: {
    retrievalRigor: number; // 0-100
    statisticalAudit: number; // 0-100
    synthesisDrafting: number; // 0-100
    citationFidelity: number; // 0-100
  };
}

const AGENT_CAPABILITIES: AgentCapabilityInfo[] = [
  {
    id: 'retrieval-scout',
    name: 'Literature Retriever',
    role: 'Corpus Search & Quote Extractor',
    avatar: '🔍',
    color: 'emerald',
    typicalLatencyMs: 1150,
    latencyDisplay: '1.1s – 1.2s',
    speedRating: 'Lightning (<1.2s)',
    uniqueStrengths: [
      'Hybrid BM25 Sparse + Dense Vector Cosine Similarity Search',
      'Verbatim evidence quote extraction with exact page numbers',
      'Multi-manuscript chunk de-duplication & token filtering'
    ],
    domainExpertise: [
      'Optoelectronic PPG',
      'mmWave FMCW Radar',
      'ECG & HRV Waveforms',
      'Biomedical Signal Datasets'
    ],
    outputDeliverable: 'Structured evidence chunks with metadata tags & page numbers',
    recommendedTask: 'Corpus scouting, verbatim evidence retrieval, and dataset identification',
    skillScores: {
      retrievalRigor: 98,
      statisticalAudit: 65,
      synthesisDrafting: 70,
      citationFidelity: 95
    }
  },
  {
    id: 'methodology-auditor',
    name: 'Methodology Auditor',
    role: 'Experimental Design & Risk Evaluator',
    avatar: '⚖️',
    color: 'blue',
    typicalLatencyMs: 1350,
    latencyDisplay: '1.3s – 1.4s',
    speedRating: 'Fast (1.2s-1.5s)',
    uniqueStrengths: [
      'Trial cohort size and ground truth reference hardware audit',
      'Statistical error bound evaluation (MAE, RMSE, AUROC)',
      'Identification of motion artifact & skin tone attenuation risks'
    ],
    domainExpertise: [
      'Clinical Trial Design',
      'AAMI & ISO 81060-2 Standards',
      'Transducer Hardware Specs',
      'Statistical Rigor'
    ],
    outputDeliverable: 'Methodological risk scorecard with error bounds & validity threats',
    recommendedTask: 'Stress-testing trial protocols, auditing error metrics, hardware evaluation',
    skillScores: {
      retrievalRigor: 80,
      statisticalAudit: 98,
      synthesisDrafting: 75,
      citationFidelity: 90
    }
  },
  {
    id: 'consensus-analyst',
    name: 'Consensus Analyst',
    role: 'Cross-Paper Debate & Agreement Mapper',
    avatar: '⚡',
    color: 'amber',
    typicalLatencyMs: 1280,
    latencyDisplay: '1.2s – 1.3s',
    speedRating: 'Fast (1.2s-1.5s)',
    uniqueStrengths: [
      'Cross-author claim comparison and agreement mapping',
      'Detection of opposing theoretical viewpoints & controversies',
      'Multi-modal comparative synthesis (PPG vs FMCW Radar)'
    ],
    domainExpertise: [
      'Scholarly Debate Mapping',
      'Modal Trade-off Analysis',
      'Literature Discrepancies',
      'Domain Theory'
    ],
    outputDeliverable: 'Consensus vs Controversy Matrix with supporting paper stances',
    recommendedTask: 'Identifying research gaps, unresolved debates, and scholarly consensus',
    skillScores: {
      retrievalRigor: 85,
      statisticalAudit: 82,
      synthesisDrafting: 88,
      citationFidelity: 92
    }
  },
  {
    id: 'synthesis-author',
    name: 'Synthesizer',
    role: 'Publication Review Drafter & Author',
    avatar: '🧠',
    color: 'purple',
    typicalLatencyMs: 1720,
    latencyDisplay: '1.6s – 1.8s',
    speedRating: 'Thorough (1.5s-1.8s)',
    uniqueStrengths: [
      'Publication-grade markdown manuscript drafting',
      'Formatted comparative markdown tables & structured headings',
      'Seamless integration of in-text academic citations'
    ],
    domainExpertise: [
      'Academic Manuscript Composition',
      'Systematic Reviews',
      'LaTeX Formatting',
      'Scientific Communication'
    ],
    outputDeliverable: 'Comprehensive multi-section review manuscript with comparison tables',
    recommendedTask: 'Drafting systematic literature reviews, state-of-the-art syntheses',
    skillScores: {
      retrievalRigor: 82,
      statisticalAudit: 85,
      synthesisDrafting: 99,
      citationFidelity: 94
    }
  },
  {
    id: 'peer-reviewer',
    name: 'Validator',
    role: 'Citation Fidelity & Quality Gatekeeper',
    avatar: '🛡️',
    color: 'rose',
    typicalLatencyMs: 1050,
    latencyDisplay: '1.0s – 1.1s',
    speedRating: 'Lightning (<1.2s)',
    uniqueStrengths: [
      'Zero-hallucination citation verification against raw chunks',
      'Quality scorecard computation (0–100 overall score)',
      'Automated approval status determination for publication readiness'
    ],
    domainExpertise: [
      'Peer Review Standards',
      'Citation Integrity Verification',
      'Hallucination Gatekeeping',
      'Publication Readiness'
    ],
    outputDeliverable: 'Peer Review Scorecard, Citation Fidelity %, and Revision Suggestions',
    recommendedTask: 'Final quality audits, citation validation, hallucination checks',
    skillScores: {
      retrievalRigor: 90,
      statisticalAudit: 90,
      synthesisDrafting: 80,
      citationFidelity: 100
    }
  }
];

interface AgentCapabilityMatrixProps {
  agentConfigs: Record<AgentId, AgentConfig>;
  agentMetricsMap?: Record<AgentId, AgentPerformanceMetrics>;
}

export const AgentCapabilityMatrix: React.FC<AgentCapabilityMatrixProps> = ({
  agentConfigs,
  agentMetricsMap,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'radar'>('cards');
  const [selectedAgentId, setSelectedAgentId] = useState<AgentId | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCapabilities = AGENT_CAPABILITIES.filter((cap) => {
    const matchSearch = cap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        cap.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        cap.domainExpertise.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSearch;
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Swarm Composition & Agent Capability Matrix
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
              5 Core Specialists
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
            Detailed breakdown mapping each specialized AI agent to their unique strengths, research domain expertise, speed latency profiles, and deliverable schemas.
          </p>
        </div>

        {/* View Mode Switches & Search */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Matrix Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: CARDS GRID */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCapabilities.map((cap) => {
            const config = agentConfigs[cap.id];
            const metrics = agentMetricsMap ? agentMetricsMap[cap.id] : null;

            return (
              <div
                key={cap.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Agent Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                        {cap.avatar}
                      </span>
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                          {cap.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          {cap.role}
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-[10px] font-mono font-bold">
                      {config ? (config.provider === 'ollama' ? 'Ollama' : 'Gemini 2.5') : 'AI Engine'}
                    </span>
                  </div>

                  {/* Typical Latency & Speed Badge */}
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" /> Typical Speed
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">
                        {cap.latencyDisplay}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                        {cap.speedRating.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Core Strengths */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Unique Strengths
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                      {cap.uniqueStrengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Domain Expertise Pills */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Domain Expertise
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cap.domainExpertise.map((domain, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono">
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Deliverable Box */}
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[9px] block">
                    Deliverable Schema Output:
                  </span>
                  <p className="text-indigo-600 dark:text-indigo-300 font-medium">
                    {cap.outputDeliverable}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 2: MATRIX TABLE */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Agent & Role</th>
                <th className="p-3.5">Typical Latency</th>
                <th className="p-3.5">Core Strengths</th>
                <th className="p-3.5">Domain Expertise</th>
                <th className="p-3.5">Deliverable Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {filteredCapabilities.map((cap) => (
                <tr key={cap.id} className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{cap.avatar}</span>
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-slate-100">{cap.name}</div>
                        <div className="text-[10px] text-slate-400">{cap.role}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5 font-mono">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{cap.latencyDisplay}</span>
                    <div className="text-[10px] text-slate-400 font-sans">{cap.speedRating.split(' ')[0]}</div>
                  </td>

                  <td className="p-3.5 max-w-xs">
                    <ul className="space-y-1">
                      {cap.uniqueStrengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1 text-[11px] text-slate-700 dark:text-slate-300">
                          <span className="text-emerald-500 font-bold">•</span> {str}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {cap.domainExpertise.map((d, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono">
                          {d}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-3.5 font-medium text-indigo-600 dark:text-indigo-300 max-w-xs">
                    {cap.outputDeliverable}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
