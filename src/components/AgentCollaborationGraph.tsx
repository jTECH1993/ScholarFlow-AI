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
  Info
} from 'lucide-react';
import { 
  AgentId, 
  AgentConfig, 
  AgentMessage, 
  AgentPerformanceMetrics 
} from '../types';

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
  const [selectedEdgeIndex, setSelectedEdgeIndex] = useState<number | null>(null);

  // Ordered list of 5 agents in the pipeline
  const agentOrder: { id: AgentId; displayName: string; role: string }[] = [
    { id: 'retrieval-scout', displayName: 'Literature Retriever', role: 'Quote & Chunk Extractor' },
    { id: 'methodology-auditor', displayName: 'Methodology Auditor', role: 'Design & Error Metric Auditor' },
    { id: 'consensus-analyst', displayName: 'Consensus Analyst', role: 'Debate & Agreement Mapper' },
    { id: 'synthesis-author', displayName: 'Synthesizer', role: 'Publication Review Drafter' },
    { id: 'peer-reviewer', displayName: 'Validator', role: 'Citation Fidelity Auditor' },
  ];

  // Inter-agent data packet descriptors
  const dataPayloads = [
    { from: 'Literature Retriever', to: 'Methodology Auditor', payload: 'Scouted Evidence Chunks & Verbatim Quotes', details: 'Contains raw manuscript text spans, page numbers, transducer specs, and citation keys.' },
    { from: 'Methodology Auditor', to: 'Consensus Analyst', payload: 'Experimental Audit & Error Bounds', details: 'Contains evaluated cohort sizes, hardware SNR, MAE/RMSE bounds, and threats to validity.' },
    { from: 'Consensus Analyst', to: 'Synthesizer', payload: 'Cross-Paper Debate & Agreement Map', details: 'Contains points of unanimous agreement, scholarly disputes, and opposing author stances.' },
    { from: 'Synthesizer', to: 'Validator', payload: 'Draft Systematic Review Manuscript', details: 'Contains publication-ready 5-section review markdown with comparative matrices and citations.' },
    { from: 'Validator', to: 'Final Output', payload: 'Verified Scorecard & Citation Audit', details: 'Contains quality score (0-100), citation fidelity rating, and hallucination risk assessment.' },
  ];

  // Node X coordinates for SVG viewBox (width: 1000, height: 220)
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
              <span>Visual Agent Collaboration Flow Graph</span>
              {isRunning && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono animate-pulse">
                  ● Data Streaming Active
                </span>
              )}
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Interactive directed graph showing real-time data packet transfers and Bezier flow paths between agents
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Completed Step</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping inline-block" />
            <span>Active Step</span>
          </span>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative overflow-x-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
        <svg
          viewBox="0 0 980 230"
          className="w-full h-auto min-w-[750px] font-sans"
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

            {/* Glowing Gradients */}
            <linearGradient id="grad-active" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            <linearGradient id="grad-done" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* 1. DRAW DIRECTED BEZIER PATH EDGES BETWEEN NODES */}
          {agentOrder.map((agentItem, idx) => {
            if (idx >= agentOrder.length - 1) return null;

            const x1 = nodePositions[idx] + 35;
            const x2 = nodePositions[idx + 1] - 35;
            const cx = (x1 + x2) / 2;
            
            // Determine state of edge
            const msgForStep = messages[idx];
            const isCompletedEdge = msgForStep?.status === 'done';
            const isActiveEdge = isRunning && currentStepIndex === idx;

            const pathD = `M ${x1} ${nodeY} C ${cx} ${nodeY - 30}, ${cx} ${nodeY - 30}, ${x2} ${nodeY}`;
            const markerId = isCompletedEdge ? 'url(#arrow-done)' : isActiveEdge ? 'url(#arrow-active)' : 'url(#arrow-queued)';
            const strokeColor = isCompletedEdge ? '#10b981' : isActiveEdge ? '#6366f1' : '#334155';

            return (
              <g key={`edge-${idx}`}>
                {/* Background path line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isActiveEdge ? '3' : '2'}
                  strokeDasharray={isActiveEdge ? '6 4' : 'none'}
                  markerEnd={markerId}
                  className={isActiveEdge ? 'animate-pulse cursor-pointer' : 'cursor-pointer'}
                  onClick={() => setSelectedEdgeIndex(idx)}
                />

                {/* Animated Glowing Particle when Active */}
                {isActiveEdge && (
                  <circle r="4" fill="#818cf8">
                    <animateMotion
                      path={pathD}
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Data Packet Label Badge */}
                <foreignObject
                  x={cx - 55}
                  y={nodeY - 65}
                  width="110"
                  height="34"
                  className="overflow-visible"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedEdgeIndex(idx)}
                    className={`w-full px-1.5 py-1 rounded-md text-[9px] font-mono font-bold truncate text-center border shadow-xs transition-all ${
                      selectedEdgeIndex === idx
                        ? 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400/50'
                        : isCompletedEdge
                        ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40 hover:border-emerald-400'
                        : isActiveEdge
                        ? 'bg-indigo-950/90 text-indigo-300 border-indigo-500/50 hover:border-indigo-400 animate-pulse'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    📦 {dataPayloads[idx].payload.split(' ')[0]}...
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
                  className="transition-all cursor-pointer hover:scale-105"
                  onClick={() => setSelectedEdgeIndex(idx < 4 ? idx : 4)}
                />

                {/* Avatar Icon */}
                <text
                  x="0"
                  y="6"
                  textAnchor="middle"
                  fontSize="22"
                  className="pointer-events-none select-none"
                >
                  {agentConfig?.avatar || '🤖'}
                </text>

                {/* Status Indicator Badge */}
                {isCompleted && (
                  <circle r="8" cx="22" cy="-22" fill="#10b981" />
                )}
                {isCompleted && (
                  <text x="22" y="-19" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="bold">
                    ✓
                  </text>
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

      {/* Selected Edge / Data Payload Inspector Box */}
      {selectedEdgeIndex !== null && (
        <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-950/30 text-indigo-200 space-y-2 text-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>📦 Inter-Agent Data Packet #{selectedEdgeIndex + 1}:</span>
              <span className="text-indigo-300 font-mono">{dataPayloads[selectedEdgeIndex].payload}</span>
            </span>

            <button
              type="button"
              onClick={() => setSelectedEdgeIndex(null)}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕ Close Inspector
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px]">
            <div>
              <p className="text-slate-400"><strong>Data Route:</strong> {dataPayloads[selectedEdgeIndex].from} ➔ {dataPayloads[selectedEdgeIndex].to}</p>
              <p className="text-slate-300 mt-1">{dataPayloads[selectedEdgeIndex].details}</p>
            </div>

            <div className="font-mono text-slate-300 space-y-0.5">
              <p><strong>Provider:</strong> {agentConfigs[agentOrder[selectedEdgeIndex].id].provider === 'ollama' ? `Ollama (${agentConfigs[agentOrder[selectedEdgeIndex].id].ollamaModel})` : 'Gemini 2.5 Flash'}</p>
              <p><strong>Success Rate:</strong> {agentMetricsMap[agentOrder[selectedEdgeIndex].id]?.successRate || 100}%</p>
              <p><strong>Avg Latency:</strong> {((agentMetricsMap[agentOrder[selectedEdgeIndex].id]?.avgExecutionTimeMs || 1200) / 1000).toFixed(2)}s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
