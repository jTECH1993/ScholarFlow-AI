import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Cpu, 
  TrendingUp, 
  Layers, 
  FileText, 
  Lock, 
  CheckCircle2, 
  X,
  Server,
  Users,
  Database
} from 'lucide-react';
import { UserProfile } from '../types';

interface SplashScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: (tab?: 'signin' | 'signup' | 'reset') => void;
  onOpenUserWorkspace?: () => void;
  onOpenAdminPortal?: () => void;
  currentUser: UserProfile | null;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  isOpen,
  onClose,
  onOpenAuth,
  onOpenUserWorkspace,
  onOpenAdminPortal,
  currentUser,
}) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const handleCloseToUser = () => {
    if (dontShowAgain) {
      localStorage.setItem('scholarflow_hide_splash', 'true');
    }
    onClose();
    if (onOpenUserWorkspace) {
      onOpenUserWorkspace();
    }
  };

  const handleLaunchAdmin = () => {
    if (dontShowAgain) {
      localStorage.setItem('scholarflow_hide_splash', 'true');
    }
    onClose();
    if (onOpenAdminPortal) {
      onOpenAdminPortal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dismiss Button */}
        <button
          type="button"
          onClick={handleCloseToUser}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-white rounded-full shadow-xs border border-slate-200 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-teal-950 via-slate-900 to-teal-900 text-white p-6 sm:p-8 relative overflow-hidden shrink-0 border-b border-teal-800/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Universal Academic Research &bull; One Platform for All Disciplines</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Evidence-Grounded Literature Intelligence for Every Field of Study
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
              ScholarFlow AI provides a universal research engine designed for all academic literatures. Ingest any paper, thesis, or manuscript in PDF, LaTeX, TXT, or Markdown. Our single foundation LLM architecture serves each researcher in an isolated, private session with evidence grounding, page-level citations, and zero data leakage.
            </p>

            {/* Quick Feature Strip */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2 text-xs font-medium text-slate-300">
              <div className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                <span>All Academic Fields</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                <Cpu className="w-3.5 h-3.5 text-teal-400" />
                <span>Single-LLM Dedicated Sessions</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Dual Interfaces (User &amp; Admin)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Interfaces Interactive Showcase */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-teal-700" />
              <span>Choose Your Interface Experience</span>
            </h2>
            <p className="text-xs text-slate-600">
              Select between the Researcher Workspace for literature exploration or the Administrator Portal for multi-tenant system oversight.
            </p>
          </div>

          {/* Two Interfaces Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Interface 1: User Workspace */}
            <div 
              onClick={handleCloseToUser}
              className="p-5 rounded-2xl border-2 border-teal-500 bg-teal-50/40 hover:bg-teal-50/70 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-xs">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-3xs font-extrabold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-300 uppercase tracking-wider">
                    Primary User Interface
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                    Researcher Workspace
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Designed for faculty, researchers, and students to ingest papers, run grounded RAG queries, generate comparative literature matrices, and export citations.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1 text-2xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Multi-paper drag-and-drop ingestion (PDF, LaTeX, TXT)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Evidence-grounded Scholar Chat with page citations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Cross-Paper Comparative Review Matrix</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Personal Research Notebook &amp; BibTeX export</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-teal-200/60 flex items-center justify-between">
                <span className="text-3xs font-semibold text-teal-800">Ready to synthesize</span>
                <span className="text-xs font-bold text-teal-700 group-hover:text-teal-900 flex items-center space-x-1">
                  <span>Enter Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Interface 2: Admin Portal */}
            <div 
              onClick={handleLaunchAdmin}
              className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                    <ShieldCheck className="w-5 h-5 text-teal-400" />
                  </div>
                  <span className="text-3xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider">
                    Administrative Portal
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                    Administrator Portal
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Designed for lab heads and platform admins to monitor live sessions, inspect single-LLM routing telemetry, and configure global RAG policies.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1 text-2xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Live session isolation &amp; vector memory inspector</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Single-LLM multi-tenant query telemetry &amp; latency stats</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Global RAG hyperparameters (Top-K, Similarity cutoffs)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Real-time live query audit log stream</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-3xs font-semibold text-slate-500">Full system telemetry</span>
                <span className="text-xs font-bold text-slate-700 group-hover:text-teal-700 flex items-center space-x-1">
                  <span>Open Admin Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Architecture Guarantee Strip */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs">
              <Lock className="w-4 h-4 text-teal-700" />
              <span>How Each User Session is Kept Isolated with a Single Foundation LLM</span>
            </div>
            <p className="text-2xs text-slate-600 leading-relaxed">
              Our architecture routes queries through a single foundation model (Gemini 2.5 Flash / local Ollama) using stateless, ephemeral context windows. Uploaded papers and vector indices are bound strictly to your unique cryptographic <code className="text-teal-800 font-mono font-bold">sessionId</code>. Cross-tenant data leakage is prevented at both the vector index and model prompt boundaries.
            </p>
          </div>
        </div>

        {/* Splash Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
          <label className="flex items-center space-x-2 text-2xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
            />
            <span>Don&apos;t show this splash screen automatically on startup</span>
          </label>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            {currentUser ? (
              <button
                type="button"
                onClick={handleCloseToUser}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <span>Continue as {currentUser.displayName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCloseToUser}
                  className="px-3 py-2 text-slate-600 hover:text-teal-800 text-xs font-medium cursor-pointer"
                >
                  Enter as Guest
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAuth('signin');
                  }}
                  className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAuth('signup');
                  }}
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
