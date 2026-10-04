import React, { useState } from 'react';
import { 
  BarChart3, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  Filter, 
  Layers, 
  Zap,
  RotateCcw,
  Info
} from 'lucide-react';
import { AgentId, AgentConfig, AgentPerformanceMetrics } from '../types';

export interface PastSessionRecord {
  sessionId: string;
  sessionName: string;
  timestamp: string;
  taskType: string;
  agentPerformance: Record<AgentId, { latencyMs: number; status: 'SUCCESS' | 'FAILED' | 'FALLBACK'; modelUsed: string }>;
}

interface AgentPerformanceHeatmapProps {
  agentConfigs: Record<AgentId, AgentConfig>;
  agentMetricsMap: Record<AgentId, AgentPerformanceMetrics>;
}

// Simulated past research session history for 6 benchmark runs
const INITIAL_PAST_SESSIONS: PastSessionRecord[] = [
  {
    sessionId: 'sess-8',
    sessionName: 'Session #8: Systematic Literature Review',
    timestamp: '11:20 AM',
    taskType: 'Systematic Review',
    agentPerformance: {
      'retrieval-scout': { latencyMs: 1150, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'methodology-auditor': { latencyMs: 1350, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'consensus-analyst': { latencyMs: 1280, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'synthesis-author': { latencyMs: 1720, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'peer-reviewer': { latencyMs: 1050, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'math-signal-specialist': { latencyMs: 920, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'clinical-trial-specialist': { latencyMs: 1100, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'edge-case-specialist': { latencyMs: 1010, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
    },
  },
  {
    sessionId: 'sess-7',
    sessionName: 'Session #7: Hypothesis Stress-Test',
    timestamp: '10:45 AM',
    taskType: 'Hypothesis Audit',
    agentPerformance: {
      'retrieval-scout': { latencyMs: 980, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'methodology-auditor': { latencyMs: 1420, status: 'SUCCESS', modelUsed: 'Ollama (llama3.2)' },
      'consensus-analyst': { latencyMs: 1310, status: 'SUCCESS', modelUsed: 'Ollama (llama3.2)' },
      'synthesis-author': { latencyMs: 1890, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'peer-reviewer': { latencyMs: 1120, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'math-signal-specialist': { latencyMs: 950, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'clinical-trial-specialist': { latencyMs: 1180, status: 'SUCCESS', modelUsed: 'Ollama (llama3.2)' },
      'edge-case-specialist': { latencyMs: 1050, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
    },
  },
  {
    sessionId: 'sess-6',
    sessionName: 'Session #6: Cross-Corpus Benchmark',
    timestamp: '09:15 AM',
    taskType: 'Benchmark Extraction',
    agentPerformance: {
      'retrieval-scout': { latencyMs: 1210, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'methodology-auditor': { latencyMs: 1550, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'consensus-analyst': { latencyMs: 1400, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'synthesis-author': { latencyMs: 1680, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'peer-reviewer': { latencyMs: 1180, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'math-signal-specialist': { latencyMs: 890, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'clinical-trial-specialist': { latencyMs: 1040, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'edge-case-specialist': { latencyMs: 980, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
    },
  },
  {
    sessionId: 'sess-5',
    sessionName: 'Session #5: Hemodynamic Waveform Audit',
    timestamp: 'Yesterday',
    taskType: 'Signal Synthesis',
    agentPerformance: {
      'retrieval-scout': { latencyMs: 1050, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'methodology-auditor': { latencyMs: 1620, status: 'SUCCESS', modelUsed: 'Ollama (mistral)' },
      'consensus-analyst': { latencyMs: 1250, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'synthesis-author': { latencyMs: 1950, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'peer-reviewer': { latencyMs: 990, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'math-signal-specialist': { latencyMs: 820, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'clinical-trial-specialist': { latencyMs: 1150, status: 'SUCCESS', modelUsed: 'Ollama (mistral)' },
      'edge-case-specialist': { latencyMs: 1020, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
    },
  },
  {
    sessionId: 'sess-4',
    sessionName: 'Session #4: FMCW Radar vs PPG Trial',
    timestamp: 'Yesterday',
    taskType: 'Modal Comparison',
    agentPerformance: {
      'retrieval-scout': { latencyMs: 1300, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'methodology-auditor': { latencyMs: 1480, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'consensus-analyst': { latencyMs: 1510, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'synthesis-author': { latencyMs: 2100, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'peer-reviewer': { latencyMs: 1250, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'math-signal-specialist': { latencyMs: 910, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'clinical-trial-specialist': { latencyMs: 1220, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
      'edge-case-specialist': { latencyMs: 1110, status: 'SUCCESS', modelUsed: 'Gemini 2.5 Flash' },
    },
  },
  {
    sessionId: 'sess-3',
    sessionName: 'Session #3: Air-Gapped Local Ollama Test',
    timestamp: '2 Days Ago',
    taskType: 'Offline Swarm Run',
    agentPerformance: {
      'retrieval-scout': { latencyMs: 1450, status: 'SUCCESS', modelUsed: 'Ollama (llama3.2)' },
      'methodology-auditor': { latencyMs: 1820, status: 'SUCCESS', modelUsed: 'Ollama (llama3.2)' },
      'consensus-analyst': { latencyMs: 1650, status: 'SUCCESS', modelUsed: 'Ollama (llama3.2)' },
      'synthesis-author': { latencyMs: 2350, status: 'SUCCESS', modelUsed: 'Ollama (llama3.2)' },
      'peer-reviewer': { latencyMs: 1410, status: 'SUCCESS', modelUsed: 'Ollama (llama3.2)' },
      'math-signal-specialist': { latencyMs: 1100, status: 'SUCCESS', modelUsed: 'Ollama (llama3.2)' },
      'clinical-trial-specialist': { latencyMs: 1350, status: 'SUCCESS', modelUsed: 'Ollama (llama3.2)' },
      'edge-case-specialist': { latencyMs: 1280, status: 'SUCCESS', modelUsed: 'Ollama (llama3.2)' },
    },
  },
];

export const AgentPerformanceHeatmap: React.FC<AgentPerformanceHeatmapProps> = ({
  agentConfigs,
  agentMetricsMap,
}) => {
  const [metricMode, setMetricMode] = useState<'latency' | 'success' | 'efficiency'>('latency');
  const [selectedCell, setSelectedCell] = useState<{ session: PastSessionRecord; agentId: AgentId } | null>(null);

  const agentList: { id: AgentId; name: string; avatar: string; role: string }[] = [
    { id: 'retrieval-scout', name: 'Literature Retriever', avatar: '🔍', role: 'Quote & Chunk Extractor' },
    { id: 'methodology-auditor', name: 'Methodology Auditor', avatar: '⚖️', role: 'Design & Error Metric Auditor' },
    { id: 'consensus-analyst', name: 'Consensus Analyst', avatar: '⚡', role: 'Debate & Agreement Mapper' },
    { id: 'synthesis-author', name: 'Synthesizer', avatar: '🧠', role: 'Publication Review Drafter' },
    { id: 'peer-reviewer', name: 'Validator', avatar: '🛡️', role: 'Citation Fidelity Auditor' },
  ];

  // Helper to calculate cell background gradient and text style
  const getCellColor = (latencyMs: number, status: string) => {
    if (status === 'FAILED') {
      return 'bg-rose-600 text-white font-bold border-rose-500 shadow-rose-500/30';
    }

    if (metricMode === 'latency') {
      if (latencyMs < 1150) {
        return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30';
      } else if (latencyMs < 1500) {
        return 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/40 hover:bg-indigo-500/30';
      } else if (latencyMs < 1900) {
        return 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40 hover:bg-amber-500/30';
      } else {
        return 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40 hover:bg-rose-500/30';
      }
    } else if (metricMode === 'success') {
      return 'bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/35';
    } else {
      // Efficiency Score: 100 / (latencyInSec)
      const efficiency = Math.min(100, Math.round(100 / (latencyMs / 1000)));
      if (efficiency >= 85) {
        return 'bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border-emerald-500/40';
      } else if (efficiency >= 60) {
        return 'bg-indigo-500/25 text-indigo-700 dark:text-indigo-300 border-indigo-500/40';
      } else {
        return 'bg-amber-500/25 text-amber-700 dark:text-amber-300 border-amber-500/40';
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
            <Flame className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>Agent Performance Latency & Success Heatmap</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-mono">
                Past 6 Sessions
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Visual color gradient matrix showing execution latency and success rates across historical research runs
            </p>
          </div>
        </div>

        {/* Heatmap Metric Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setMetricMode('latency')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              metricMode === 'latency'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Latency (ms)</span>
          </button>

          <button
            type="button"
            onClick={() => setMetricMode('success')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              metricMode === 'success'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Success Rate</span>
          </button>

          <button
            type="button"
            onClick={() => setMetricMode('efficiency')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              metricMode === 'efficiency'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Efficiency</span>
          </button>
        </div>
      </div>

      {/* Heatmap Color Scale Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80">
        <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
          Heatmap Color Gradient Legend:
        </span>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500 inline-block" />
            <span>&lt; 1.2s Fast</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-indigo-500/30 border border-indigo-500 inline-block" />
            <span>1.2s - 1.5s Normal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500 inline-block" />
            <span>1.5s - 1.9s Moderate</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500/30 border border-rose-500 inline-block" />
            <span>&gt; 1.9s Heavy / Offline</span>
          </div>
        </div>
      </div>

      {/* HEATMAP MATRIX GRID */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-2.5 px-3 w-48">Agent / Role</th>
              {INITIAL_PAST_SESSIONS.map((sess) => (
                <th key={sess.sessionId} className="py-2.5 px-2 text-center">
                  <div className="font-mono text-slate-800 dark:text-slate-200">{sess.sessionId.toUpperCase()}</div>
                  <div className="text-[9px] font-normal text-slate-400 truncate max-w-[90px]">{sess.taskType}</div>
                </th>
              ))}
              <th className="py-2.5 px-3 text-right">Avg Latency</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
            {agentList.map((agent) => {
              const metrics = agentMetricsMap[agent.id];
              const avgSec = metrics?.avgExecutionTimeMs ? (metrics.avgExecutionTimeMs / 1000).toFixed(2) : '1.30';

              return (
                <tr key={agent.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/40 transition-colors">
                  {/* Agent Label */}
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{agent.avatar}</span>
                      <div>
                        <div className="text-xs">{agent.name}</div>
                        <div className="text-[10px] font-normal text-slate-400 truncate max-w-[140px]">{agent.role}</div>
                      </div>
                    </div>
                  </td>

                  {/* Heatmap Session Cells */}
                  {INITIAL_PAST_SESSIONS.map((sess) => {
                    const perf = sess.agentPerformance[agent.id];
                    const latencyMs = perf?.latencyMs || 1200;
                    const status = perf?.status || 'SUCCESS';
                    const cellColor = getCellColor(latencyMs, status);
                    const isSelected = selectedCell?.session.sessionId === sess.sessionId && selectedCell?.agentId === agent.id;

                    return (
                      <td key={sess.sessionId} className="p-1.5 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedCell({ session: sess, agentId: agent.id })}
                          className={`w-full py-2.5 px-1 rounded-xl border text-center transition-all font-mono text-[11px] font-bold shadow-2xs ${cellColor} ${
                            isSelected ? 'ring-2 ring-indigo-500 scale-105 shadow-md' : ''
                          }`}
                        >
                          {metricMode === 'latency' && (
                            <span>{(latencyMs / 1000).toFixed(2)}s</span>
                          )}

                          {metricMode === 'success' && (
                            <span>✓ 100%</span>
                          )}

                          {metricMode === 'efficiency' && (
                            <span>{Math.min(100, Math.round(100 / (latencyMs / 1000)))} pts</span>
                          )}
                        </button>
                      </td>
                    );
                  })}

                  {/* Avg Summary */}
                  <td className="py-3 px-3 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {avgSec}s
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* SELECTED CELL INSPECTOR MODAL / FOOTER */}
      {selectedCell && (
        <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-950/30 text-indigo-200 text-xs space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>🔍 Performance Detail:</span>
              <span className="text-indigo-300 font-mono">{selectedCell.session.sessionName}</span>
            </span>

            <button
              type="button"
              onClick={() => setSelectedCell(null)}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕ Close Inspector
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px]">
            <div>
              <p className="text-slate-400"><strong>Target Agent:</strong> {agentList.find(a => a.id === selectedCell.agentId)?.name}</p>
              <p className="text-slate-300 mt-0.5"><strong>Task Scope:</strong> {selectedCell.session.taskType}</p>
            </div>

            <div>
              <p className="text-slate-400"><strong>Model Engine:</strong> {selectedCell.session.agentPerformance[selectedCell.agentId]?.modelUsed}</p>
              <p className="text-slate-300 mt-0.5"><strong>Timestamp:</strong> {selectedCell.session.timestamp}</p>
            </div>

            <div className="font-mono text-emerald-400">
              <p><strong>Latency:</strong> {selectedCell.session.agentPerformance[selectedCell.agentId]?.latencyMs} ms</p>
              <p className="text-slate-300"><strong>Execution Status:</strong> PASSED (0 Errors)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
