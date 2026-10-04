import React, { useState } from 'react';
import { 
  Bot, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Cpu, 
  Zap, 
  FileText, 
  ShieldCheck, 
  AlertCircle,
  ChevronRight,
  Info,
  ArrowRight,
  Layers,
  Database,
  BarChart3,
  Check,
  FileCode2,
  List
} from 'lucide-react';
import { 
  AgentId, 
  AgentConfig, 
  AgentMessage, 
  AgentPerformanceMetrics 
} from '../types';
import { AgentDeepDiveModal } from './AgentDeepDiveModal';

interface AgentCollaborationGraphProps {
  agentConfigs: Record<AgentId, AgentConfig>;
  messages: AgentMessage[];
  currentStepIndex: number;
  isRunning: boolean;
  agentMetricsMap: Record<AgentId, AgentPerformanceMetrics>;
}

export const AgentCollaborationGraph: React.FC<AgentCollaborationGraphProps> = ({
  agentConfigs,
  messages,
  currentStepIndex,
  isRunning,
  agentMetricsMap,
}) => {
  const [selectedEdgeIndex, setSelectedEdgeIndex] = useState<number | null>(0);
  const [viewTab, setViewTab] = useState<'graph' | 'matrix'>('graph');
  const [deepDiveAgentId, setDeepDiveAgentId] = useState<AgentId | null>(null);

  // Ordered list of 5 agents in the pipeline
  const agentOrder: { id: AgentId; displayName: string; role: string; avatar: string }[] = [
    { id: 'retrieval-scout', displayName: 'Literature Retriever', role: 'Quote & Chunk Extractor', avatar: '🔍' },
    { id: 'methodology-auditor', displayName: 'Methodology Auditor', role: 'Design & Error Metric Auditor', avatar: '⚖️' },
    { id: 'consensus-analyst', displayName: 'Consensus Analyst', role: 'Debate & Agreement Mapper', avatar: '⚡' },
    { id: 'synthesis-author', displayName: 'Synthesizer', role: 'Publication Review Drafter', avatar: '🧠' },
    { id: 'peer-reviewer', displayName: 'Validator', role: 'Citation Fidelity Auditor', avatar: '🛡️' },
  ];

  // Inter-agent data transfer payload descriptors
  const dataPayloads = [
    {
      from: 'Literature Retriever',
      to: 'Methodology Auditor',
      payloadTitle: 'Retrieved Chunks & Evidence Quotes',
      badge: '6 Chunks • 14.2 KB',
      summary: 'Extracted verbatim quotes regarding optical PPG light absorption, radar FMCW phase shifts, and clinical cohort sizes.',
      schema: ['chunk_ids[]', 'verbatim_quotes[]', 'page_numbers[]', 'transducer_hardware_specs', 'doi_keys[]'],
      icon: '📚'
    },
    {
      from: 'Methodology Auditor',
      to: 'Consensus Analyst',
      payloadTitle: 'Experimental Audit & Error Bounds',
      badge: '4 Cohorts • MAE/RMSE Audits',
      summary: 'Audited trial cohort sizes, reference gold standards (ECG vs Holter), SNR bounds, and isolated motion artifact vulnerabilities.',
      schema: ['cohort_sizes[]', 'mae_rmse_bounds', 'gold_standard_devices', 'bias_threats[]', 'confidence_intervals'],
      icon: '⚖️'
    },
    {
      from: 'Consensus Analyst',
      to: 'Synthesizer',
      payloadTitle: 'Controversy Map & Agreement Matrix',
      badge: '2 Unanimous Points • 1 Active Dispute',
      summary: 'Mapped cross-paper agreement on baseline resting rate vs active scholarly debate comparing wearable PPG against millimeter-wave radar.',
      schema: ['unanimous_claims[]', 'disputed_claims[]', 'opposing_author_groups[]', 'modality_tradeoffs'],
      icon: '⚡'
    },
    {
      from: 'Synthesizer',
      to: 'Validator',
      payloadTitle: 'Synthesized Review & Thesis',
      badge: '5-Section Manuscript • 8.4 KB',
      summary: 'Drafted publication review manuscript with markdown comparative matrices, structured evidence synthesis, and academic citations.',
      schema: ['manuscript_markdown', 'comparative_tables[]', 'synthesized_thesis_statement', 'in_text_citations[]'],
      icon: '🧠'
    },
    {
      from: 'Validator',
      to: 'Publication Output',
      payloadTitle: 'Peer Audit Scorecard & Verified Review',
      badge: '96/100 Quality • 98% Fidelity',
      summary: 'Verified manuscript citations against raw source chunks. Computed 96/100 quality scorecard with zero critical hallucination flags.',
      schema: ['overall_quality_score', 'citation_fidelity_pct', 'hallucination_flags[]', 'publication_readiness_status'],
      icon: '🛡️'
    },
  ];

  // Node X coordinates for SVG viewBox (width: 980, height: 230)
  const nodePositions = [90, 290, 490, 690, 890];
  const nodeY = 110;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>Visual Agent Collaboration & Data Transfer Flow Graph</span>
              {isRunning && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono animate-pulse">
                  ● Payload Streaming Active
                </span>
              )}
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Interactive flow diagram mapping inter-agent data transfer payloads (Retrieved Chunks, Audits, Synthesis, Scorecard)
            </p>
          </div>
        </div>

        {/* View Mode Toggle Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewTab('graph')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewTab === 'graph'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>SVG Flow Graph</span>
            </button>

            <button
              type="button"
              onClick={() => setViewTab('matrix')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewTab === 'matrix'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Data Transfer Matrix</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: SVG COLLABORATION FLOW GRAPH */}
      {viewTab === 'graph' && (
        <div className="space-y-4">
          <div className="relative overflow-x-auto p-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
            <svg
              viewBox="0 0 980 230"
              className="w-full h-auto min-w-[800px] font-sans"
            >
              <defs>
                {/* SVG Marker Arrowheads */}
                <marker
                  id="arrow-done"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                </marker>

                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                </marker>

                <marker
                  id="arrow-queued"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                </marker>
              </defs>

              {/* 1. DRAW DIRECTED BEZIER PATH EDGES BETWEEN AGENT NODES */}
              {agentOrder.map((agentItem, idx) => {
                if (idx >= agentOrder.length - 1) return null;

                const x1 = nodePositions[idx] + 35;
                const x2 = nodePositions[idx + 1] - 35;
                const cx = (x1 + x2) / 2;
                
                // Determine state of edge
                const msgForStep = messages[idx];
                const isCompletedEdge = msgForStep?.status === 'done';
                const isActiveEdge = isRunning && currentStepIndex === idx;
                const isSelected = selectedEdgeIndex === idx;

                const pathD = `M ${x1} ${nodeY} C ${cx} ${nodeY - 32}, ${cx} ${nodeY - 32}, ${x2} ${nodeY}`;
                const markerId = isCompletedEdge ? 'url(#arrow-done)' : isActiveEdge ? 'url(#arrow-active)' : 'url(#arrow-queued)';
                const strokeColor = isSelected ? '#a855f7' : isCompletedEdge ? '#10b981' : isActiveEdge ? '#6366f1' : '#334155';

                return (
                  <g key={`edge-${idx}`}>
                    {/* Background path line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={isSelected || isActiveEdge ? '3.5' : '2'}
                      strokeDasharray={isActiveEdge ? '6 4' : 'none'}
                      markerEnd={markerId}
                      className="cursor-pointer transition-all hover:stroke-indigo-400"
                      onClick={() => setSelectedEdgeIndex(idx)}
                    />

                    {/* Animated Glowing Particle when Active */}
                    {isActiveEdge && (
                      <circle r="4.5" fill="#c084fc">
                        <animateMotion
                          path={pathD}
                          dur="1.4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* Data Packet Label Badge (Data Transfer Payload Name) */}
                    <foreignObject
                      x={cx - 65}
                      y={nodeY - 72}
                      width="130"
                      height="38"
                      className="overflow-visible"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedEdgeIndex(idx)}
                        className={`w-full px-2 py-1 rounded-lg text-[9px] font-mono font-bold truncate text-center border shadow-md transition-all flex items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-purple-600 text-white border-purple-400 ring-2 ring-purple-400/50 scale-105'
                            : isCompletedEdge
                            ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40 hover:border-emerald-400 hover:scale-102'
                            : isActiveEdge
                            ? 'bg-indigo-950/90 text-indigo-300 border-indigo-500/50 hover:border-indigo-400 animate-pulse'
                            : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        <span>{dataPayloads[idx].icon}</span>
                        <span className="truncate">{dataPayloads[idx].payloadTitle}</span>
                      </button>
                    </foreignObject>
                  </g>
                );
              })}

              {/* 2. DRAW AGENT NODES */}
              {agentOrder.map((agentItem, idx) => {
                const x = nodePositions[idx];
                const agentConfig = agentConfigs[agentItem.id];
                const metrics = agentMetricsMap[agentItem.id];
                const msgForStep = messages[idx];
                
                const isCompleted = msgForStep?.status === 'done';
                const isActive = isRunning && currentStepIndex === idx;
                const isFailed = msgForStep?.status === 'failed';

                return (
                  <g key={`node-${agentItem.id}`} transform={`translate(${x}, ${nodeY})`}>
                    {/* Active Pulsing Ring */}
                    {isActive && (
                      <circle
                        r="38"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2"
                        className="animate-ping opacity-75"
                      />
                    )}

                    {/* Outer Node Circle */}
                    <circle
                      r="32"
                      fill={
                        isCompleted
                          ? '#064e3b'
                          : isActive
                          ? '#312e81'
                          : isFailed
                          ? '#881337'
                          : '#0f172a'
                      }
                      stroke={
                        isCompleted
                          ? '#10b981'
                          : isActive
                          ? '#818cf8'
                          : isFailed
                          ? '#f43f5e'
                          : '#334155'
                      }
                      strokeWidth={isActive ? '3' : '2'}
                      className="transition-all cursor-pointer hover:scale-108"
                      onClick={() => setDeepDiveAgentId(agentItem.id)}
                    />

                    {/* Avatar Icon */}
                    <text
                      x="0"
                      y="6"
                      textAnchor="middle"
                      fontSize="22"
                      className="pointer-events-none select-none"
                    >
                      {agentConfig?.avatar || agentItem.avatar}
                    </text>

                    {/* Status Badge */}
                    {isCompleted && (
                      <g transform="translate(22, -22)">
                        <circle r="9" fill="#10b981" />
                        <text x="0" y="3" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="bold">
                          ✓
                        </text>
                      </g>
                    )}

                    {/* Agent Display Label */}
                    <text
                      x="0"
                      y="52"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      {agentItem.displayName.split(' ')[0]}
                    </text>

                    {/* Role Subtitle */}
                    <text
                      x="0"
                      y="66"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9"
                    >
                      {agentItem.displayName.split(' ').slice(1).join(' ') || agentConfig?.role.slice(0, 12)}
                    </text>

                    {/* Latency & Model Badge */}
                    <text
                      x="0"
                      y="82"
                      textAnchor="middle"
                      fill={isCompleted ? '#34d399' : '#818cf8'}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {msgForStep?.executionTimeMs
                        ? `${(msgForStep.executionTimeMs / 1000).toFixed(2)}s`
                        : metrics?.avgExecutionTimeMs
                        ? `avg ${(metrics.avgExecutionTimeMs / 1000).toFixed(2)}s`
                        : agentConfig?.provider === 'ollama' ? 'Ollama' : 'Gemini'}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* SELECTED DATA TRANSFER PAYLOAD INSPECTOR BOX */}
          {selectedEdgeIndex !== null && (
            <div className="p-4 rounded-2xl border border-indigo-500/40 bg-slate-950 text-indigo-100 space-y-3 text-xs shadow-xl relative overflow-hidden animate-in fade-in duration-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2 font-bold text-white">
                  <span className="p-1.5 rounded-lg bg-indigo-600/30 border border-indigo-500/50 text-base">
                    {dataPayloads[selectedEdgeIndex].icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <span>Data Transfer Payload #{selectedEdgeIndex + 1}:</span>
                      <span className="text-indigo-400 font-mono">
                        {dataPayloads[selectedEdgeIndex].payloadTitle}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400 font-normal">
                      Data Flow Route: <strong className="text-slate-200">{dataPayloads[selectedEdgeIndex].from}</strong> <span className="text-indigo-400">➔</span> <strong className="text-slate-200">{dataPayloads[selectedEdgeIndex].to}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-mono font-bold">
                    {dataPayloads[selectedEdgeIndex].badge}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedEdgeIndex(null)}
                    className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all"
                  >
                    ✕ Close
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-[11px]">
                {/* Summary Section */}
                <div className="md:col-span-2 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-indigo-400" />
                    <span>Payload Information Summary</span>
                  </span>
                  <p className="text-slate-200 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800 font-sans">
                    {messages[selectedEdgeIndex]?.content
                      ? `${messages[selectedEdgeIndex].content.slice(0, 260)}...`
                      : dataPayloads[selectedEdgeIndex].summary}
                  </p>
                </div>

                {/* Data Schema & Attributes */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <FileCode2 className="w-3 h-3 text-emerald-400" />
                    <span>Data Schema Attributes</span>
                  </span>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 font-mono text-[10px] space-y-1">
                    {dataPayloads[selectedEdgeIndex].schema.map((attr, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-emerald-300">
                        <span className="text-slate-600">├─</span>
                        <span>{attr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: DATA TRANSFER MATRIX TAB */}
      {viewTab === 'matrix' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            {dataPayloads.map((payload, idx) => {
              const msg = messages[idx];
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedEdgeIndex(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedEdgeIndex === idx
                      ? 'bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/30'
                      : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{payload.icon}</span>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        Step {idx + 1}: {payload.payloadTitle}
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-[10px] font-mono font-bold border border-indigo-200 dark:border-indigo-800">
                        {payload.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                      <span>{payload.from}</span>
                      <ArrowRight className="w-3 h-3 text-indigo-500" />
                      <span>{payload.to}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {msg?.content ? `${msg.content.slice(0, 180)}...` : payload.summary}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5 text-[10px] font-mono">
                    <span className="text-slate-400 font-bold">Schema Keys:</span>
                    {payload.schema.map((key, i) => (
                      <span key={i} className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* AGENT DEEP-DIVE MODAL */}
      {deepDiveAgentId && agentConfigs[deepDiveAgentId] && (
        <AgentDeepDiveModal
          isOpen={!!deepDiveAgentId}
          onClose={() => setDeepDiveAgentId(null)}
          agentConfig={agentConfigs[deepDiveAgentId]}
          message={messages.find((m) => m.fromAgentId === deepDiveAgentId)}
          metrics={agentMetricsMap[deepDiveAgentId]}
        />
      )}
    </div>
  );
};
