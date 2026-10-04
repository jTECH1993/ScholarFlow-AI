import React, { useState } from 'react';
import { 
  Database, 
  Sparkles, 
  Bot, 
  Trash2, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Layers, 
  User, 
  RotateCcw,
  Zap,
  BookOpen,
  Plus,
  FolderSync,
  Check
} from 'lucide-react';
import { SessionLongTermMemory, SpawnedSubAgent } from '../types';

export interface SavedSessionItem {
  id: string;
  name: string;
  createdAt: string;
  lastActive: string;
  queryCount: number;
}

interface SessionMemoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  longTermMemory: SessionLongTermMemory;
  onClearSessionMemory: () => void;
  spawnedSubAgentsHistory: SpawnedSubAgent[];
  allSessions?: SavedSessionItem[];
  onSelectSession?: (id: string) => void;
  onCreateNewSession?: (customName?: string) => void;
  onDeleteSession?: (id: string) => void;
}

export const SessionMemoryManagerModal: React.FC<SessionMemoryManagerModalProps> = ({
  isOpen,
  onClose,
  sessionId,
  longTermMemory,
  onClearSessionMemory,
  spawnedSubAgentsHistory,
  allSessions = [],
  onSelectSession,
  onCreateNewSession,
  onDeleteSession,
}) => {
  const [copiedSessionId, setCopiedSessionId] = useState<boolean>(false);
  const [newSessionNameInput, setNewSessionNameInput] = useState<string>('');
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopySessionId = () => {
    navigator.clipboard.writeText(sessionId);
    setCopiedSessionId(true);
    setTimeout(() => setCopiedSessionId(false), 2000);
  };

  const handleConfirmCreateNew = () => {
    if (onCreateNewSession) {
      onCreateNewSession(newSessionNameInput.trim() || undefined);
    }
    setNewSessionNameInput('');
    setIsCreatingNew(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
              <Database className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Dedicated Session & Long-Term Memory Manager
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                  🔒 Isolated Session Memory
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Every research session maintains isolated memory, agent configurations, and extracted knowledge graphs tailored specifically for you.
              </p>
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

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          {/* Multi-Session Switcher & Creation Section */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderSync className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-xs uppercase tracking-wider text-indigo-300">
                  Switch Active Dedicated Session ({allSessions.length || 1})
                </span>
              </div>

              {!isCreatingNew && (
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(true)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ New Dedicated Session</span>
                </button>
              )}
            </div>

            {/* Create New Session Inline Form */}
            {isCreatingNew && (
              <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/50 space-y-2 animate-in fade-in duration-150">
                <label className="text-[11px] font-bold text-slate-300">
                  Enter Dedicated Session Title / Topic Focus:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSessionNameInput}
                    onChange={(e) => setNewSessionNameInput(e.target.value)}
                    placeholder="e.g. Clinical Trial Review 2026, PPG Signal Synthesis..."
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-400"
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirmCreateNew()}
                  />
                  <button
                    type="button"
                    onClick={handleConfirmCreateNew}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Start
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Session Cards List */}
            {allSessions.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                {allSessions.map((s) => {
                  const isActive = s.id === sessionId;
                  return (
                    <div
                      key={s.id}
                      onClick={() => onSelectSession && onSelectSession(s.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                        isActive
                          ? 'bg-indigo-950/80 border-indigo-400 text-white shadow-lg ring-1 ring-indigo-400'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs truncate max-w-[170px]">
                          {s.name || s.id}
                        </span>
                        {isActive ? (
                          <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold">
                            Active
                          </span>
                        ) : onDeleteSession && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteSession(s.id);
                            }}
                            className="text-slate-500 hover:text-rose-400 p-1"
                            title="Delete Session"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{s.queryCount} Runs</span>
                        <span>{s.lastActive ? s.lastActive.split(',')[0] : 'Just now'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Active Session Identification Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                Active Dedicated Session Identifier
              </span>
              <button
                type="button"
                onClick={handleCopySessionId}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-mono text-[10px]"
              >
                {copiedSessionId ? 'Copied ID!' : 'Copy Session ID'}
              </button>
            </div>

            <div className="font-mono text-sm font-extrabold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span>{sessionId}</span>
              <span className="text-emerald-500 text-xs font-sans font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 100% Dedicated & Isolated
              </span>
            </div>
          </div>

          {/* Session Telemetry & Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Research Queries</span>
              <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-0.5 font-mono">
                {longTermMemory.queryCount || 1}
              </div>
              <span className="text-[9px] text-slate-500 font-mono">Session Runs</span>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Extracted Concepts</span>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono">
                {longTermMemory.extractedEntitiesCount || 10}
              </div>
              <span className="text-[9px] text-slate-500 font-mono">In Knowledge Graph</span>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Spawned Sub-Agents</span>
              <div className="text-lg font-black text-purple-600 dark:text-purple-400 mt-0.5 font-mono">
                {spawnedSubAgentsHistory.length}
              </div>
              <span className="text-[9px] text-slate-500 font-mono">Dynamic Specialists</span>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Created On</span>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 font-mono truncate">
                {longTermMemory.createdAt.split(',')[0]}
              </div>
              <span className="text-[9px] text-slate-500 font-mono">Session Timestamp</span>
            </div>
          </div>

          {/* Dynamically Spawned Sub-Agents History Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Dynamically Spawned Sub-Agents History ({spawnedSubAgentsHistory.length})</span>
              </span>
              <span className="text-[10px] text-slate-500">Document Complexity Adaptive</span>
            </h3>

            {spawnedSubAgentsHistory.length > 0 ? (
              <div className="space-y-2">
                {spawnedSubAgentsHistory.map((sub, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-indigo-300">
                        <span className="text-base">{sub.avatar}</span>
                        <span>{sub.name}</span>
                        <span className="px-2 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                          {sub.role}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        Trigger: {sub.complexityTrigger}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed pl-6 border-l border-indigo-500/30">
                      <strong>Spawning Reason:</strong> {sub.reasonForSpawning}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 text-xs text-center font-mono">
                No complex document triggers detected yet. Launch a research inquiry with FMCW radar equations or multi-center clinical trials to dynamically spawn sub-agents!
              </div>
            )}
          </div>

          {/* Session Synthesis History Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>Learned Session Research Synthesis Log</span>
            </h3>

            {longTermMemory.sessionSynthesisHistory && longTermMemory.sessionSynthesisHistory.length > 0 ? (
              <div className="space-y-2">
                {longTermMemory.sessionSynthesisHistory.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-900 dark:text-slate-100 truncate max-w-md">"{item.query}"</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono">
                        Score: {item.qualityScore}/100
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {item.synthesisSnippet}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 text-xs text-center font-mono">
                Active session memory is pristine and ready for your first literature synthesis query.
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClearSessionMemory}
            className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-xs font-bold hover:bg-rose-100 transition-all flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset & Clear Session Memory</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
          >
            Close Memory Manager
          </button>
        </div>

      </div>
    </div>
  );
};
