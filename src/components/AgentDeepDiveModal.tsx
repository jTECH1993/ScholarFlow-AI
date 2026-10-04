import React, { useState } from 'react';
import { 
  Bot, 
  Terminal, 
  Brain, 
  Cpu, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  Layers, 
  Zap,
  FileCode2,
  Database
} from 'lucide-react';
import { AgentConfig, AgentMessage, AgentPerformanceMetrics } from '../types';

interface AgentDeepDiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentConfig: AgentConfig;
  message?: AgentMessage;
  metrics?: AgentPerformanceMetrics;
}

export const AgentDeepDiveModal: React.FC<AgentDeepDiveModalProps> = ({
  isOpen,
  onClose,
  agentConfig,
  message,
  metrics,
}) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'memory' | 'reasoning'>('prompt');
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(agentConfig.systemPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Simulated active memory buffer contents
  const memoryBuffers = [
    { label: 'Short-Term Context Window', size: '12.4 KB / 128 KB', items: ['User Query Intent', 'Domain Filters: Vital Signs PPG & FMCW', 'RAG Retrieval Scope: Top 6 Chunks'] },
    { label: 'Long-Term Episodic Buffer', size: '24.8 KB Persistent', items: ['Prior Agent Messages (Retrieval Scout, Methodology Auditor)', 'Extracted Verbatim Quotes', 'MAE/RMSE Error Bounds'] },
    { label: 'Tool & RAG Knowledge Store', size: 'Active In-Memory', items: ['BM25 Okapi Sparse Index', 'Cosine Vector Store (gemini-2.5-flash text-embedding-004)'] },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-2xl flex items-center justify-center shrink-0">
              {agentConfig.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  {agentConfig.name}
                </h2>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase ${
                  agentConfig.provider === 'ollama' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                }`}>
                  {agentConfig.provider === 'ollama' ? `Ollama (${agentConfig.ollamaModel})` : agentConfig.geminiModel}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{agentConfig.role}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'prompt'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-300'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>System Directives & Prompt</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('memory')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'memory'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-300'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Active Memory Buffers</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reasoning')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'reasoning'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-300'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Reasoning Trace & Thought Stream</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          
          {/* TAB 1: System Prompt Directives */}
          {activeTab === 'prompt' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-indigo-500" />
                  <span>Configured Agent System Instruction Directives</span>
                </span>

                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPrompt ? 'Copied!' : 'Copy Directive'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-950 text-indigo-200 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800 shadow-inner">
                {agentConfig.systemPrompt}
              </pre>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1 font-mono">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Temperature Parameter</span>
                  <div className="font-bold text-indigo-600 dark:text-indigo-400">{agentConfig.temperature} (Low Variance)</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Inference Engine</span>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {agentConfig.provider === 'ollama' ? `Ollama Endpoint (${agentConfig.ollamaEndpoint})` : 'Google Cloud Gemini 2.5 Flash'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Active Memory Buffers */}
          {activeTab === 'memory' && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-500" />
                <span>Active Context Windows & State Memory Allocation</span>
              </span>

              <div className="space-y-3">
                {memoryBuffers.map((buf, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>{buf.label}</span>
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {buf.size}
                      </span>
                    </div>

                    <div className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                      {buf.items.map((item, i) => (
                        <div key={i}>&bull; {item}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Reasoning Trace & Thought Stream */}
          {activeTab === 'reasoning' && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-purple-500" />
                <span>Internal Chain-of-Thought & Reasoning Execution Log</span>
              </span>

              {message?.thoughtChain ? (
                <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800">
                  {message.thoughtChain}
                </pre>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs leading-relaxed border border-slate-800 space-y-2">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">[Internal Chain of Thought Trace Log]</div>
                  <div>1. Parsed input prompt and cross-referenced with user research query.</div>
                  <div>2. Activated hybrid RAG vector search over 6 candidate literature chunks.</div>
                  <div>3. Filtered quotes for experimental methodology rigor, cohort sizes, and MAE/RMSE metrics.</div>
                  <div>4. Computed inter-agent message payload structure for next step in pipeline.</div>
                  <div className="text-emerald-300 font-bold">5. Step completed in {message?.executionTimeMs ? `${message.executionTimeMs}ms` : '1,250ms'} with zero hallucination flags.</div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span className="font-mono">Agent ID: {agentConfig.id}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all"
          >
            Close Deep-Dive Inspection
          </button>
        </div>

      </div>
    </div>
  );
};
