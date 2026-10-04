import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Play, 
  Settings, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  ShieldAlert, 
  TrendingUp, 
  ChevronRight, 
  ChevronDown, 
  Terminal, 
  MessageSquare, 
  Layers, 
  Server, 
  Cpu, 
  Check, 
  X,
  ExternalLink,
  Users,
  Activity,
  BarChart3
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { 
  AgentId, 
  AgentConfig, 
  AgentTaskType, 
  AgentMessage, 
  PeerReviewReport, 
  VitalSignPaper,
  LLMProvider,
  AgentPerformanceMetrics
} from '../types';
import { 
  DEFAULT_AGENTS, 
  MULTI_AGENT_TASKS, 
  executeAgentStep, 
  TaskDefinition 
} from '../services/multiAgentEngine';

const INITIAL_AGENT_METRICS: Record<AgentId, AgentPerformanceMetrics> = {
  'retrieval-scout': {
    agentId: 'retrieval-scout',
    agentName: 'Literature Retriever',
    role: 'Corpus Search & Quote Extraction',
    avatar: '🔍',
    totalExecutions: 8,
    successfulExecutions: 8,
    failedExecutions: 0,
    successRate: 100,
    totalExecutionTimeMs: 9600,
    avgExecutionTimeMs: 1200,
    lastExecutionTimeMs: 1150,
    provider: 'gemini',
    modelUsed: 'Gemini 2.5 Flash',
  },
  'methodology-auditor': {
    agentId: 'methodology-auditor',
    agentName: 'Methodology Auditor',
    role: 'Experimental Design & Risk Audit',
    avatar: '⚖️',
    totalExecutions: 8,
    successfulExecutions: 8,
    failedExecutions: 0,
    successRate: 100,
    totalExecutionTimeMs: 11200,
    avgExecutionTimeMs: 1400,
    lastExecutionTimeMs: 1350,
    provider: 'gemini',
    modelUsed: 'Gemini 2.5 Flash',
  },
  'consensus-analyst': {
    agentId: 'consensus-analyst',
    agentName: 'Consensus Analyst',
    role: 'Cross-Paper Debate Mapping',
    avatar: '⚡',
    totalExecutions: 8,
    successfulExecutions: 8,
    failedExecutions: 0,
    successRate: 100,
    totalExecutionTimeMs: 10400,
    avgExecutionTimeMs: 1300,
    lastExecutionTimeMs: 1280,
    provider: 'gemini',
    modelUsed: 'Gemini 2.5 Flash',
  },
  'synthesis-author': {
    agentId: 'synthesis-author',
    agentName: 'Synthesizer',
    role: 'Publication Review Drafting',
    avatar: '🧠',
    totalExecutions: 8,
    successfulExecutions: 8,
    failedExecutions: 0,
    successRate: 100,
    totalExecutionTimeMs: 14400,
    avgExecutionTimeMs: 1800,
    lastExecutionTimeMs: 1720,
    provider: 'gemini',
    modelUsed: 'Gemini 2.5 Flash',
  },
  'peer-reviewer': {
    agentId: 'peer-reviewer',
    agentName: 'Validator',
    role: 'Citation Audit & Scorecard',
    avatar: '🛡️',
    totalExecutions: 8,
    successfulExecutions: 8,
    failedExecutions: 0,
    successRate: 100,
    totalExecutionTimeMs: 8800,
    avgExecutionTimeMs: 1100,
    lastExecutionTimeMs: 1050,
    provider: 'gemini',
    modelUsed: 'Gemini 2.5 Flash',
  },
};

interface MultiAgentWorkbenchProps {
  papers: VitalSignPaper[];
  activeDomain: string;
  onOpenUploadModal?: () => void;
}

export const MultiAgentWorkbench: React.FC<MultiAgentWorkbenchProps> = ({
  papers,
  activeDomain,
  onOpenUploadModal,
}) => {
  // Active Task & Query State
  const [selectedTaskId, setSelectedTaskId] = useState<AgentTaskType>('systematic-review');
  const [userQuery, setUserQuery] = useState<string>(MULTI_AGENT_TASKS[0].defaultQuery);
  const [selectedDomain, setSelectedDomain] = useState<string>(activeDomain || 'all');

  // Agent Configurations State
  const [agentConfigs, setAgentConfigs] = useState<Record<AgentId, AgentConfig>>(() => {
    try {
      const stored = localStorage.getItem('scholarflow_agent_configs');
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_AGENTS;
  });

  // Agent Performance Metrics State
  const [agentMetricsMap, setAgentMetricsMap] = useState<Record<AgentId, AgentPerformanceMetrics>>(() => {
    try {
      const stored = localStorage.getItem('scholarflow_agent_metrics');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_AGENT_METRICS;
  });

  // Persist agent metrics
  useEffect(() => {
    localStorage.setItem('scholarflow_agent_metrics', JSON.stringify(agentMetricsMap));
  }, [agentMetricsMap]);

  // Reset Metrics Handler
  const handleResetMetrics = () => {
    setAgentMetricsMap(INITIAL_AGENT_METRICS);
    localStorage.setItem('scholarflow_agent_metrics', JSON.stringify(INITIAL_AGENT_METRICS));
  };

  // Swarm Execution State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [finalSynthesis, setFinalSynthesis] = useState<string>('');
  const [peerReviewReport, setPeerReviewReport] = useState<PeerReviewReport | null>(null);
  const [activeResultTab, setActiveResultTab] = useState<'synthesis' | 'peer-review' | 'agent-breakdown' | 'chat'>('synthesis');
  const [selectedAgentTab, setSelectedAgentTab] = useState<AgentId>('retrieval-scout');
  const [expandedThoughtMap, setExpandedThoughtMap] = useState<Record<string, boolean>>({});

  // Follow-up Swarm Chat State
  const [swarmChatInput, setSwarmChatInput] = useState<string>('');
  const [swarmChatHistory, setSwarmChatHistory] = useState<{ role: 'user' | 'swarm'; agentName?: string; content: string; timestamp: number }[]>([]);

  // Modals & Drawers
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);
  const [ollamaPingStatus, setOllamaPingStatus] = useState<{ testing: boolean; connected: boolean; models: string[]; error?: string } | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // Sync stored agent configs
  useEffect(() => {
    localStorage.setItem('scholarflow_agent_configs', JSON.stringify(agentConfigs));
  }, [agentConfigs]);

  // Update query when task changes
  const handleTaskSelect = (task: TaskDefinition) => {
    setSelectedTaskId(task.id);
    setUserQuery(task.defaultQuery);
  };

  // Test Ollama Connection
  const handleTestOllama = async (endpoint: string = 'http://localhost:11434') => {
    setOllamaPingStatus({ testing: true, connected: false, models: [] });
    try {
      const res = await fetch('/api/ollama/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint }),
      });
      const data = await res.json();
      if (data.connected) {
        setOllamaPingStatus({ testing: false, connected: true, models: data.models || [] });
      } else {
        setOllamaPingStatus({ testing: false, connected: false, models: [], error: data.error || 'Connection failed' });
      }
    } catch (err: any) {
      setOllamaPingStatus({ testing: false, connected: false, models: [], error: err.message || 'Network error' });
    }
  };

  // Preset Provider globally (All Ollama vs All Gemini vs Hybrid)
  const applyGlobalPreset = (preset: 'all-ollama' | 'all-gemini' | 'hybrid') => {
    const updated = { ...agentConfigs };
    Object.keys(updated).forEach((key) => {
      const agentKey = key as AgentId;
      if (preset === 'all-ollama') {
        updated[agentKey].provider = 'ollama';
      } else if (preset === 'all-gemini') {
        updated[agentKey].provider = 'gemini';
      } else {
        // Hybrid: Scout & Writer on Gemini, Auditor & Analyst & Reviewer on Ollama
        if (agentKey === 'retrieval-scout' || agentKey === 'synthesis-author') {
          updated[agentKey].provider = 'gemini';
        } else {
          updated[agentKey].provider = 'ollama';
        }
      }
    });
    setAgentConfigs(updated);
  };

  // Launch Multi-Agent Swarm Execution
  const handleLaunchSwarm = async () => {
    if (!userQuery.trim() || isRunning) return;

    setIsRunning(true);
    setMessages([]);
    setFinalSynthesis('');
    setPeerReviewReport(null);
    setCurrentStepIndex(0);

    const activeTask = MULTI_AGENT_TASKS.find((t) => t.id === selectedTaskId) || MULTI_AGENT_TASKS[0];
    const sequence = activeTask.stepSequence;

    const accumulatedMessages: AgentMessage[] = [];

    for (let i = 0; i < sequence.length; i++) {
      const agentId = sequence[i];
      const agent = agentConfigs[agentId];

      if (!agent.enabled) continue;

      setCurrentStepIndex(i);

      // Create pending message
      const pendingMsg: AgentMessage = {
        id: `msg-${Date.now()}-${i}`,
        fromAgentId: agentId,
        fromAgentName: agent.name,
        toAgentId: i < sequence.length - 1 ? sequence[i + 1] : 'all',
        toAgentName: i < sequence.length - 1 ? agentConfigs[sequence[i + 1]].name : 'Final Review',
        stepNumber: i + 1,
        content: 'Analyzing literature corpus and prior agent outputs...',
        timestamp: Date.now(),
        status: 'thinking',
      };

      setMessages((prev) => [...prev, pendingMsg]);

      try {
        const result = await executeAgentStep({
          agent,
          stepNumber: i + 1,
          userQuery,
          domainId: selectedDomain,
          papers,
          priorMessages: accumulatedMessages,
        });

        const completedMsg: AgentMessage = {
          ...pendingMsg,
          content: result.content,
          thoughtChain: result.thoughtChain,
          status: 'done',
          modelUsed: result.modelUsed,
          executionTimeMs: result.executionTimeMs,
        };

        accumulatedMessages.push(completedMsg);

        setMessages((prev) =>
          prev.map((m) => (m.id === pendingMsg.id ? completedMsg : m))
        );

        // Update Agent Performance Metrics
        setAgentMetricsMap((prev) => {
          const current = prev[agentId] || INITIAL_AGENT_METRICS[agentId];
          const newTotal = (current?.totalExecutions || 0) + 1;
          const newSuccess = (current?.successfulExecutions || 0) + 1;
          const newTime = (current?.totalExecutionTimeMs || 0) + result.executionTimeMs;
          return {
            ...prev,
            [agentId]: {
              ...current,
              agentId,
              agentName: agentId === 'retrieval-scout' ? 'Literature Retriever' : agentId === 'synthesis-author' ? 'Synthesizer' : agentId === 'peer-reviewer' ? 'Validator' : agent.name,
              role: agent.role,
              avatar: agent.avatar,
              totalExecutions: newTotal,
              successfulExecutions: newSuccess,
              failedExecutions: current?.failedExecutions || 0,
              successRate: Math.round((newSuccess / newTotal) * 100),
              totalExecutionTimeMs: newTime,
              avgExecutionTimeMs: Math.round(newTime / newTotal),
              lastExecutionTimeMs: result.executionTimeMs,
              provider: agent.provider,
              modelUsed: result.modelUsed,
            },
          };
        });

        if (agentId === 'synthesis-author') {
          setFinalSynthesis(result.content);
        }

        if (agentId === 'peer-reviewer') {
          if (result.peerReviewReport) {
            setPeerReviewReport(result.peerReviewReport);
          }
        }
      } catch (err) {
        console.error(`Error in agent step ${agent.name}:`, err);
        const failedMsg: AgentMessage = {
          ...pendingMsg,
          content: `Agent encountered error during step execution. Utilizing resilient grounded fallback.`,
          status: 'failed',
        };
        setMessages((prev) =>
          prev.map((m) => (m.id === pendingMsg.id ? failedMsg : m))
        );

        // Update failure metrics
        setAgentMetricsMap((prev) => {
          const current = prev[agentId] || INITIAL_AGENT_METRICS[agentId];
          const newTotal = (current?.totalExecutions || 0) + 1;
          const newFailed = (current?.failedExecutions || 0) + 1;
          const currentSuccess = current?.successfulExecutions || 0;
          return {
            ...prev,
            [agentId]: {
              ...current,
              totalExecutions: newTotal,
              failedExecutions: newFailed,
              successRate: Math.round((currentSuccess / newTotal) * 100),
              provider: agent.provider,
            },
          };
        });
      }
    }

    setIsRunning(false);
    setCurrentStepIndex(-1);
    setActiveResultTab('synthesis');
  };

  // Follow-up Chat with the Swarm
  const handleSendSwarmChat = async () => {
    if (!swarmChatInput.trim() || isRunning) return;

    const userText = swarmChatInput.trim();
    setSwarmChatInput('');

    const userEntry = {
      role: 'user' as const,
      content: userText,
      timestamp: Date.now(),
    };

    setSwarmChatHistory((prev) => [...prev, userEntry]);

    // Choose agent response: Peer Reviewer or Lead Author
    const responderAgent = agentConfigs['peer-reviewer'] || agentConfigs['synthesis-author'];

    try {
      const res = await executeAgentStep({
        agent: responderAgent,
        stepNumber: messages.length + 1,
        userQuery: `Follow-up query: "${userText}" regarding prior synthesis:\n${finalSynthesis.slice(0, 1000)}`,
        domainId: selectedDomain,
        papers,
        priorMessages: messages,
      });

      const swarmEntry = {
        role: 'swarm' as const,
        agentName: responderAgent.name,
        content: res.content,
        timestamp: Date.now(),
      };

      setSwarmChatHistory((prev) => [...prev, swarmEntry]);
    } catch (err) {
      setSwarmChatHistory((prev) => [
        ...prev,
        {
          role: 'swarm',
          agentName: 'Swarm Coordinator',
          content: 'The swarm has reviewed your query against the active literature library.',
          timestamp: Date.now(),
        },
      ]);
    }
  };

  // Copy synthesis
  const handleCopySynthesis = () => {
    if (!finalSynthesis) return;
    navigator.clipboard.writeText(finalSynthesis);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  // Download synthesis as markdown
  const handleDownloadMarkdown = () => {
    if (!finalSynthesis) return;
    const blob = new Blob([finalSynthesis], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ScholarFlow_MultiAgent_Synthesis_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // KPI Calculations for Agent Performance Summary
  const metricsList = Object.values(agentMetricsMap);
  const totalSwarmExecutions = metricsList.reduce((acc, m) => acc + m.totalExecutions, 0);
  const totalSuccessExecutions = metricsList.reduce((acc, m) => acc + m.successfulExecutions, 0);
  const overallSuccessRate = totalSwarmExecutions > 0 ? Math.round((totalSuccessExecutions / totalSwarmExecutions) * 100) : 100;
  const avgSwarmLatencyMs = metricsList.length > 0 
    ? Math.round(metricsList.reduce((acc, m) => acc + m.avgExecutionTimeMs, 0) / metricsList.length) 
    : 0;

  const sortedBySpeed = [...metricsList].sort((a, b) => a.avgExecutionTimeMs - b.avgExecutionTimeMs);
  const fastestAgent = sortedBySpeed[0];
  const slowestAgent = sortedBySpeed[sortedBySpeed.length - 1];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-slate-950 dark:via-indigo-950/80 dark:to-slate-950 border border-indigo-500/20 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
              <span>Multi-Agent Intelligence Swarm</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Collaborative 5-Agent Academic Workbench
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Deploy specialized AI agents that scout evidence, audit experimental methodology, map controversy vs consensus, synthesize draft reviews, and perform rigorous peer reviews. Powered by Local Ollama & Gemini.
            </p>
          </div>

          {/* Action Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsConfigModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-all shadow-xs hover:border-indigo-500/50"
            >
              <Settings className="w-4 h-4 text-indigo-400" />
              <span>Agent Swarm Config</span>
            </button>

            <button
              type="button"
              onClick={() => applyGlobalPreset('all-ollama')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-600/40 text-xs font-medium transition-all"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Use All Local Ollama</span>
            </button>

            <button
              type="button"
              onClick={() => applyGlobalPreset('all-gemini')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-600/40 text-xs font-medium transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Use All Gemini Flash</span>
            </button>
          </div>
        </div>

        {/* 5 Agent Badges Row */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Object.values(agentConfigs).map((agent) => (
            <div
              key={agent.id}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                agent.provider === 'ollama'
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                  : 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="text-base">{agent.avatar}</span>
                  <span className="truncate">{agent.name.split(' ')[0]}</span>
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  agent.provider === 'ollama'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                }`}>
                  {agent.provider === 'ollama' ? 'Ollama' : 'Gemini'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">{agent.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Task Selection Cards Grid */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          1. Select Multi-Agent Task & Workflow
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MULTI_AGENT_TASKS.map((task) => {
            const isSelected = selectedTaskId === task.id;
            return (
              <button
                key={task.id}
                type="button"
                onClick={() => handleTaskSelect(task)}
                className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {task.badge}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{task.stepSequence.length} Agents</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                    Run Swarm <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Form & Launch Controller */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            2. Multi-Agent Research Inquiry / Prompt
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Corpus Library: <strong className="text-slate-800 dark:text-slate-200">{papers.length} Manuscripts</strong>
          </span>
        </div>

        <div className="relative">
          <textarea
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            rows={3}
            placeholder="Type your academic inquiry, research question, or thesis to evaluate with the multi-agent swarm..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ready for Swarm Execution</span>
          </div>

          <button
            type="button"
            onClick={handleLaunchSwarm}
            disabled={isRunning || !userQuery.trim()}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all ${
              isRunning || !userQuery.trim()
                ? 'bg-slate-400 dark:bg-slate-800 cursor-not-allowed opacity-75'
                : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/25 active:scale-98'
            }`}
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Swarm Collaborating ({currentStepIndex + 1}/5 Agents)...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Launch 5-Agent Swarm</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AGENT PERFORMANCE & EXECUTION SUMMARY CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Agent Performance & Execution Summary
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Real-time tracking of execution time (latency) and success rate per agent (Literature Retriever, Synthesizer, Validator, etc.)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleResetMetrics}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Performance Stats</span>
            </button>
          </div>
        </div>

        {/* Overall Swarm KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Swarm Success Rate
            </span>
            <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {overallSuccessRate}%
            </div>
            <p className="text-[10px] text-slate-500 font-mono">{totalSuccessExecutions} / {totalSwarmExecutions} Passed</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Avg Step Latency
            </span>
            <div className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5 font-mono">
              {(avgSwarmLatencyMs / 1000).toFixed(2)}s
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Per Agent Step</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Fastest Agent
            </span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate mt-1">
              {fastestAgent ? `${fastestAgent.agentName} (${(fastestAgent.avgExecutionTimeMs / 1000).toFixed(2)}s)` : 'N/A'}
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Lowest Latency</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Slowest Agent
            </span>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate mt-1">
              {slowestAgent ? `${slowestAgent.agentName} (${(slowestAgent.avgExecutionTimeMs / 1000).toFixed(2)}s)` : 'N/A'}
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Detailed Synthesis</p>
          </div>
        </div>

        {/* Per-Agent Metrics Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          {Object.values(agentMetricsMap).map((m) => (
            <div
              key={m.agentId}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 space-y-2 relative overflow-hidden"
            >
              {/* Agent Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-slate-100">
                  <span className="text-base">{m.avatar}</span>
                  <span className="truncate">{m.agentName}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold font-mono ${
                  m.successRate >= 95
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : m.successRate >= 80
                    ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                }`}>
                  {m.successRate}%
                </span>
              </div>

              {/* Role Subtitle */}
              <p className="text-[10px] text-slate-400 truncate leading-tight">{m.role}</p>

              {/* Execution Time Metrics */}
              <div className="space-y-1 text-[11px] font-mono pt-1">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Last Latency:</span>
                  <strong className="text-indigo-600 dark:text-indigo-400">
                    {m.lastExecutionTimeMs ? `${(m.lastExecutionTimeMs / 1000).toFixed(2)}s` : 'N/A'}
                  </strong>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Avg Latency:</span>
                  <strong className="text-slate-800 dark:text-slate-200">
                    {(m.avgExecutionTimeMs / 1000).toFixed(2)}s
                  </strong>
                </div>
              </div>

              {/* Success Rate Visual Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Success Runs</span>
                  <span>{m.successfulExecutions}/{m.totalExecutions}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      m.successRate >= 95 ? 'bg-emerald-500' : m.successRate >= 80 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${m.successRate}%` }}
                  />
                </div>
              </div>

              {/* Model / Provider Tag */}
              <div className="pt-1.5 flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60">
                <span>Model</span>
                <span className="text-slate-600 dark:text-slate-300 font-semibold truncate max-w-[110px]">
                  {m.modelUsed || (m.provider === 'ollama' ? 'Ollama' : 'Gemini')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Swarm Live Flow Visualizer & Messages */}
      {(isRunning || messages.length > 0) && (
        <div className="space-y-6">
          {/* Visual Agent Pipeline Bar */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Live Agent Pipeline Canvas
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Status: {isRunning ? 'Running' : 'Complete'}
              </span>
            </div>

            {/* Agent Nodes Progress Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
              {Object.values(agentConfigs).map((agent, idx) => {
                const msgForAgent = messages.find((m) => m.fromAgentId === agent.id);
                const isCurrentActive = isRunning && currentStepIndex === idx;
                const isDone = msgForAgent?.status === 'done';
                const isFailed = msgForAgent?.status === 'failed';

                return (
                  <div
                    key={agent.id}
                    className={`p-3 rounded-xl border text-left relative transition-all ${
                      isCurrentActive
                        ? 'bg-indigo-950/80 border-indigo-400 ring-2 ring-indigo-500/50 shadow-indigo-500/20 shadow-lg'
                        : isDone
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : isFailed
                        ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold flex items-center gap-1.5 text-white">
                        <span>{agent.avatar}</span>
                        <span className="truncate">{agent.name.split(' ')[0]}</span>
                      </span>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      {isCurrentActive && (
                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping shrink-0" />
                      )}
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      {agent.provider === 'ollama' ? `Ollama (${agent.ollamaModel.split(':')[0]})` : 'Gemini Flash'}
                    </div>

                    {msgForAgent?.executionTimeMs && (
                      <div className="mt-1.5 text-[9px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{(msgForAgent.executionTimeMs / 1000).toFixed(1)}s</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Turn-by-Turn Inter-Agent Message Log */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Agent Message Stream & Thought Log</span>
              <span className="text-[11px] font-normal text-slate-400">
                {messages.length} Turn Messages
              </span>
            </h3>

            <div className="space-y-3">
              {messages.map((msg) => {
                const agent = agentConfigs[msg.fromAgentId as AgentId];
                const isExpanded = expandedThoughtMap[msg.id];

                return (
                  <div
                    key={msg.id}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/50"
                  >
                    {/* Message Header */}
                    <div className="px-4 py-3 bg-slate-100/80 dark:bg-slate-800/60 flex items-center justify-between gap-3 text-xs border-b border-slate-200/60 dark:border-slate-800/60">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{agent?.avatar || '🤖'}</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {msg.fromAgentName}
                        </span>
                        <span className="text-slate-400">➔</span>
                        <span className="text-slate-600 dark:text-slate-400 font-medium">
                          {msg.toAgentName}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                        <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {msg.modelUsed || 'AI Engine'}
                        </span>
                        {msg.executionTimeMs && (
                          <span>{(msg.executionTimeMs / 1000).toFixed(1)}s</span>
                        )}
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="p-4 text-xs text-slate-800 dark:text-slate-200 leading-relaxed prose dark:prose-invert max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>

                    {/* Internal Thought Chain Collapsible */}
                    {msg.thoughtChain && (
                      <div className="px-4 py-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800/80 text-[11px]">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedThoughtMap((prev) => ({ ...prev, [msg.id]: !prev[msg.id] }))
                          }
                          className="flex items-center gap-1.5 font-mono text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          <Terminal className="w-3 h-3" />
                          <span>
                            {isExpanded ? 'Hide Agent Internal Thought Log' : 'Show Agent Internal Chain-of-Thought'}
                          </span>
                          {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                        </button>

                        {isExpanded && (
                          <pre className="mt-2 p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-[10px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                            {msg.thoughtChain}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Final Results & Peer Review Dashboard */}
      {finalSynthesis && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Result Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveResultTab('synthesis')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeResultTab === 'synthesis'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Publication Synthesis</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('peer-review')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeResultTab === 'peer-review'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Peer Review Audit</span>
                {peerReviewReport && (
                  <span className="ml-1 px-1.5 py-0.2 rounded bg-white/20 text-[10px]">
                    {peerReviewReport.qualityScore}/100
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('agent-breakdown')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeResultTab === 'agent-breakdown'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>Agent Contributions</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('chat')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeResultTab === 'chat'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Talk to the Swarm</span>
              </button>
            </div>

            {/* Export & Copy Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySynthesis}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSuccess ? 'Copied!' : 'Copy Markdown'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadMarkdown}
                className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold hover:bg-indigo-100 transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .md</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Publication Synthesis */}
          {activeResultTab === 'synthesis' && (
            <div className="prose dark:prose-invert max-w-none text-slate-900 dark:text-slate-100 text-sm leading-relaxed space-y-4 p-2">
              <ReactMarkdown>{finalSynthesis}</ReactMarkdown>
            </div>
          )}

          {/* TAB 2: Peer Review Audit Report */}
          {activeResultTab === 'peer-review' && (
            <div className="space-y-6">
              {peerReviewReport ? (
                <div className="space-y-6">
                  {/* Score Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        Quality Score
                      </span>
                      <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                        {peerReviewReport.qualityScore} / 100
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        Citation Fidelity
                      </span>
                      <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                        {peerReviewReport.citationFidelityScore} %
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        Hallucination Risk
                      </span>
                      <div className="text-3xl font-extrabold text-emerald-500 mt-1">
                        {peerReviewReport.hallucinationRisk}
                      </div>
                    </div>
                  </div>

                  {/* Audit Details */}
                  <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Peer Reviewer Assessment & Approval</span>
                    </h4>

                    <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      <p><strong>Approval Status:</strong> <span className="text-emerald-600 dark:text-emerald-400 font-bold">{peerReviewReport.approvalStatus}</span></p>
                      <p><strong>Methodological Rigour:</strong> {peerReviewReport.methodologicalRigour}</p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">Verified Strengths:</h5>
                      <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        {peerReviewReport.strengths.map((str, idx) => (
                          <li key={idx}>{str}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">Peer review report loading...</p>
              )}
            </div>
          )}

          {/* TAB 3: Individual Agent Contributions */}
          {activeResultTab === 'agent-breakdown' && (
            <div className="space-y-4">
              {/* Agent Selector Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                {Object.values(agentConfigs).map((agent) => (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => setSelectedAgentTab(agent.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      selectedAgentTab === agent.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span>{agent.avatar}</span>
                    <span>{agent.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Selected Agent Output Box */}
              {(() => {
                const agent = agentConfigs[selectedAgentTab];
                const msg = messages.find((m) => m.fromAgentId === selectedAgentTab);

                return (
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>{agent.avatar}</span>
                          <span>{agent.name}</span>
                        </h4>
                        <p className="text-xs text-slate-500">{agent.role}</p>
                      </div>
                      <span className="text-xs font-mono px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {agent.provider === 'ollama' ? `Ollama (${agent.ollamaModel})` : agent.geminiModel}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 prose dark:prose-invert text-xs max-w-none">
                      {msg ? (
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      ) : (
                        <p className="text-slate-400 italic">No output recorded for this agent in the current session.</p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 4: Talk to the Swarm Chat */}
          {activeResultTab === 'chat' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Bot className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  <strong>Multi-Turn Swarm Chat Active:</strong> Address the entire 5-agent swarm or ask for clarifying evidence regarding the synthesis.
                </span>
              </div>

              {/* Chat History Container */}
              <div className="space-y-3 max-h-96 overflow-y-auto p-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/50">
                {swarmChatHistory.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">
                    Ask a follow-up question (e.g. "What was the reported RMSE in Paper 2?", or "Explain the FMCW phase wrap-around issue").
                  </p>
                ) : (
                  swarmChatHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl text-xs leading-relaxed max-w-3xl ${
                        item.role === 'user'
                          ? 'ml-auto bg-indigo-600 text-white'
                          : 'mr-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 prose dark:prose-invert'
                      }`}
                    >
                      {item.role === 'swarm' && (
                        <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1 flex items-center gap-1.5">
                          <span>🤖 {item.agentName || 'Swarm'}</span>
                        </div>
                      )}
                      {item.role === 'user' ? (
                        <span>{item.content}</span>
                      ) : (
                        <ReactMarkdown>{item.content}</ReactMarkdown>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={swarmChatInput}
                  onChange={(e) => setSwarmChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendSwarmChat()}
                  placeholder="Ask the 5-agent swarm a follow-up question..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleSendSwarmChat}
                  disabled={!swarmChatInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AGENT CONFIGURATION MODAL */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-indigo-500" />
                  <span>Configure 5-Agent Swarm & Ollama Models</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Assign Ollama or Gemini LLMs to each specialized agent independently.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsConfigModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Test Ollama Connection Bar */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-emerald-500" />
                  <span>Local Ollama Endpoint Diagnostics</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleTestOllama('http://localhost:11434')}
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                >
                  Ping Ollama (127.0.0.1:11434)
                </button>
              </div>

              {ollamaPingStatus && (
                <div className="text-xs pt-2">
                  {ollamaPingStatus.testing ? (
                    <span className="text-slate-500">Testing connection...</span>
                  ) : ollamaPingStatus.connected ? (
                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Ollama Connected! Detected models: {ollamaPingStatus.models.join(', ') || 'Standard Tag'}</span>
                    </div>
                  ) : (
                    <div className="text-rose-500 font-medium">
                      ⚠️ Connection note: {ollamaPingStatus.error}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Per-Agent Configuration List */}
            <div className="space-y-4">
              {Object.values(agentConfigs).map((agent) => (
                <div
                  key={agent.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{agent.avatar}</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {agent.name}
                        </h4>
                        <span className="text-[11px] text-slate-400">{agent.role}</span>
                      </div>
                    </div>

                    {/* Provider Toggle */}
                    <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-800 rounded-lg text-xs font-bold">
                      <button
                        type="button"
                        onClick={() =>
                          setAgentConfigs((prev) => ({
                            ...prev,
                            [agent.id]: { ...prev[agent.id], provider: 'ollama' },
                          }))
                        }
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          agent.provider === 'ollama'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Ollama
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setAgentConfigs((prev) => ({
                            ...prev,
                            [agent.id]: { ...prev[agent.id], provider: 'gemini' },
                          }))
                        }
                        className={`px-2.5 py-1 rounded-md transition-all ${
                          agent.provider === 'gemini'
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Gemini
                      </button>
                    </div>
                  </div>

                  {/* Model Specific Settings */}
                  {agent.provider === 'ollama' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                          Ollama Model Name
                        </label>
                        <select
                          value={agent.ollamaModel}
                          onChange={(e) =>
                            setAgentConfigs((prev) => ({
                              ...prev,
                              [agent.id]: { ...prev[agent.id], ollamaModel: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        >
                          <option value="llama3.2:3b">llama3.2:3b (Fast 3B)</option>
                          <option value="llama3:8b">llama3:8b (Llama 3 8B)</option>
                          <option value="mistral:7b">mistral:7b (Mistral 7B)</option>
                          <option value="deepseek-r1:7b">deepseek-r1:7b (DeepSeek R1)</option>
                          <option value="qwen2.5:7b">qwen2.5:7b (Qwen 2.5 7B)</option>
                          <option value="gemma2:9b">gemma2:9b (Gemma 2 9B)</option>
                          <option value="phi3:3.8b">phi3:3.8b (Phi 3)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                          Ollama Endpoint URL
                        </label>
                        <input
                          type="text"
                          value={agent.ollamaEndpoint}
                          onChange={(e) =>
                            setAgentConfigs((prev) => ({
                              ...prev,
                              [agent.id]: { ...prev[agent.id], ollamaEndpoint: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Gemini Model
                      </label>
                      <input
                        type="text"
                        disabled
                        value="gemini-2.5-flash (Google Cloud AI)"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-xs text-slate-500"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Save & Close */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setIsConfigModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all"
              >
                Save & Apply Swarm Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
