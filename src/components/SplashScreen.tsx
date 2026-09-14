import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Cpu, 
  Layers, 
  FileText, 
  Lock, 
  CheckCircle2, 
  X,
  Server,
  Users,
  Database,
  GraduationCap,
  LogIn,
  UserPlus,
  Compass,
  FileCheck2,
  Workflow
} from 'lucide-react';
import { UserProfile } from '../types';

interface SplashScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: (tab?: 'signin' | 'signup' | 'reset') => void;
  onOpenUserWorkspace?: () => void;
  onOpenAdminPortal?: () => void;
  currentUser: UserProfile | null;
  onProceedToLogin?: (tab?: 'signin' | 'signup') => void;
  isFullPage?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  isOpen,
  onClose,
  onOpenAuth,
  onOpenUserWorkspace,
  onOpenAdminPortal,
  currentUser,
  onProceedToLogin,
  isFullPage = false,
}) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const handleCloseToUser = () => {
    if (!currentUser) {
      if (onProceedToLogin) {
        onProceedToLogin('signin');
      } else {
        onOpenAuth('signin');
      }
      return;
    }
    if (dontShowAgain) {
      localStorage.setItem('scholarflow_hide_splash', 'true');
    }
    onClose();
    if (onOpenUserWorkspace) {
      onOpenUserWorkspace();
    }
  };

  const handleLaunchAdmin = () => {
    if (!currentUser) {
      if (onProceedToLogin) {
        onProceedToLogin('signin');
      } else {
        onOpenAuth('signin');
      }
      return;
    }
    if (dontShowAgain) {
      localStorage.setItem('scholarflow_hide_splash', 'true');
    }
    onClose();
    if (onOpenAdminPortal) {
      onOpenAdminPortal();
    }
  };

  const handleGoToLogin = (tab: 'signin' | 'signup' = 'signin') => {
    if (onProceedToLogin) {
      onProceedToLogin(tab);
    } else {
      onOpenAuth(tab);
    }
  };

  // --------------------------------------------------------------------------
  // FULL PAGE PRESENTATION (STAGE 1 ENTRY OR DEDICATED FULL VIEW)
  // --------------------------------------------------------------------------
  if (isFullPage) {
    return (
      <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
        {/* Top Institutional Header */}
        <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-500 flex items-center justify-center shadow-md shadow-teal-900/30 text-white font-extrabold text-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-white">ScholarFlow AI</span>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-3xs font-bold uppercase tracking-wider">
                  Enterprise
                </span>
              </div>
              <p className="text-3xs text-slate-400">Institutional Literature Intelligence &amp; Multi-Tenant RAG</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => handleGoToLogin('signin')}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/70 border border-slate-700/80 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5 text-teal-400" />
              <span>Log In</span>
            </button>
            <button
              type="button"
              onClick={() => handleGoToLogin('signup')}
              className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow-md shadow-teal-900/30 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 w-full">
          <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-16 sm:py-24 border-b border-slate-800/60">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
              {/* Category Pill */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Universal Academic Research &bull; One Platform for All Disciplines</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4 max-w-4xl">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                  Evidence-Grounded Literature Intelligence for Every Field of Study
                </h1>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
                  ScholarFlow AI delivers an institutional literature synthesis engine built for all academic disciplines. Ingest any paper, thesis, or manuscript in PDF, LaTeX, TXT, or Markdown. Our single foundation LLM architecture serves each researcher with dedicated, isolated session memory, grounded page citations, and zero cross-tenant data leakage.
                </p>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleGoToLogin('signin')}
                  className="px-6 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-teal-950/50 flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Log In to Research Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleGoToLogin('signup')}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 rounded-2xl font-bold text-sm shadow-xs flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-teal-400" />
                  <span>Register Institutional Account</span>
                </button>
              </div>

              {/* Capability Strip */}
              <div className="flex flex-wrap items-center gap-3 pt-4 text-xs font-medium text-slate-300 border-t border-slate-800/80">
                <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <span>All Academic Fields &amp; Formats</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Cpu className="w-4 h-4 text-teal-400" />
                  <span>Single-LLM Dedicated Sessions</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Dual Interfaces (User &amp; Admin)</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <FileCheck2 className="w-4 h-4 text-teal-300" />
                  <span>BibTeX &amp; Page-Level Citations</span>
                </div>
              </div>
            </div>
          </section>

          {/* Dual Interfaces Interactive Showcase */}
          <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Role-Tailored Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Choose Your Interface Experience
              </h2>
              <p className="text-sm text-slate-400 max-w-2xl">
                Access the Researcher Workspace for literature exploration and synthesis, or enter the Administrator Portal for multi-tenant system oversight and telemetry.
              </p>
            </div>

            {/* Dual Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Interface 1: Researcher Workspace */}
              <div 
                onClick={() => handleGoToLogin('signin')}
                className="p-6 sm:p-8 rounded-3xl border-2 border-teal-500/60 bg-gradient-to-br from-slate-900 to-slate-900/80 hover:border-teal-400 transition-all cursor-pointer flex flex-col justify-between space-y-6 shadow-xl shadow-teal-950/20 group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-900/40">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="text-2xs font-extrabold px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                      Primary User Interface
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                      Researcher Workspace
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                      Designed for faculty, researchers, and graduate students to ingest literature, execute evidence-grounded queries, compile comparative matrices, and manage personal citations.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Multi-paper drag-and-drop batch ingestion (PDF, LaTeX, TXT, MD)</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Evidence-grounded Scholar Chat with precise page citations</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Cross-Paper Comparative Review Matrix across methodologies</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Personal Research Notebook with BibTeX &amp; RIS export</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Custom Clinical &amp; Academic Perspective Tuning</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Institutional Researcher Access</span>
                  <button
                    type="button"
                    className="px-4 py-2 bg-teal-600 group-hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Login</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Interface 2: Administrator Portal */}
              <div 
                onClick={() => handleGoToLogin('signin')}
                className="p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between space-y-6 shadow-md group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 text-teal-400 flex items-center justify-center shadow-md border border-slate-700">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-2xs font-extrabold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 uppercase tracking-wider">
                      Administrative Portal
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors">
                      Administrator Portal
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                      Engineered for lab directors, system administrators, and principal investigators to inspect session isolation, monitor foundation LLM routing, and calibrate global RAG policies.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Live session isolation &amp; tenant vector memory inspector</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Single-LLM multi-tenant query telemetry &amp; latency tracking</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Global RAG hyperparameters (Top-K, Similarity Thresholds)</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Real-time live query audit trail &amp; token allocation</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Direct LLM Provider Switching (Gemini 2.5 Flash / Local Ollama)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Security &amp; Operations Clearance</span>
                  <button
                    type="button"
                    className="px-4 py-2 bg-slate-800 group-hover:bg-slate-700 text-slate-200 group-hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer border border-slate-700 shadow-xs"
                  >
                    <span>Sign In as Admin</span>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Multi-Tenant Security & Single-LLM Architecture Deep-Dive */}
          <section className="py-16 bg-slate-900/70 border-y border-slate-800/80">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                  <Lock className="w-4 h-4" />
                  <span>Privacy &amp; Security Architecture</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  How Single Foundation LLM Multi-Tenancy Operates
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
                  ScholarFlow AI utilizes a single high-performance foundation model (Gemini 2.5 Flash or local Ollama) while maintaining strict cryptographic boundaries between research sessions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                    <Server className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Stateless Ephemeral Windows</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Foundation model inference is strictly stateless. Context windows are loaded on-the-fly and expunged after completion, preventing cross-user query persistence.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                    <Database className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Cryptographic Session Isolation</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Every uploaded document and dense vector index is tied to a secure tenant hash. RAG retrieval strictly rejects out-of-session document chunks.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Verifiable Grounding &amp; Citations</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Responses are restricted to retrieved text snippets with exact paper titles, section headings, and page references, eliminating generative hallucinations.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Full Page Footer */}
        <footer className="w-full bg-slate-950 border-t border-slate-800/80 py-8 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="font-bold text-slate-300">ScholarFlow AI</span>
              <span>&bull;</span>
              <span>Turnitin-Grade Literature Intelligence</span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => handleGoToLogin('signin')}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In to Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODAL PRESENTATION (WHEN OPENED FROM WITHIN AN ACTIVE SESSION)
  // --------------------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dismiss Button */}
        <button
          type="button"
          onClick={handleCloseToUser}
          className="absolute top-4 right-4 z-20 p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-white rounded-full shadow-xs border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-teal-950 via-slate-900 to-teal-900 text-white p-6 sm:p-10 relative overflow-hidden shrink-0 border-b border-teal-800/40">
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
              ScholarFlow AI provides a universal research engine designed for all academic literatures. Ingest any paper, thesis, or manuscript in PDF, LaTeX, TXT, or Markdown with dedicated session isolation and page-level citations.
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

        {/* Dual Interfaces Showcase Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <span>Choose Your Interface Experience</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Select between the Researcher Workspace for literature exploration or the Administrator Portal for multi-tenant system oversight.
            </p>
          </div>

          {/* Two Interfaces Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Researcher Workspace */}
            <div 
              onClick={handleCloseToUser}
              className="p-5 rounded-2xl border-2 border-teal-500 bg-teal-50/40 dark:bg-teal-950/20 hover:bg-teal-50/70 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-xs">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-3xs font-extrabold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300 border border-teal-300 dark:border-teal-700 uppercase tracking-wider">
                    Primary User Interface
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-900 dark:group-hover:text-teal-300 transition-colors">
                    Researcher Workspace
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Designed for faculty, researchers, and students to ingest papers, run grounded RAG queries, generate comparative literature matrices, and export citations.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1 text-2xs text-slate-600 dark:text-slate-300">
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
                </div>
              </div>

              <div className="pt-3 border-t border-teal-200/60 dark:border-teal-800 flex items-center justify-between">
                <span className="text-3xs font-semibold text-teal-800 dark:text-teal-300">Active Workspace</span>
                <span className="text-xs font-bold text-teal-700 dark:text-teal-300 flex items-center space-x-1">
                  <span>Enter Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Admin Portal */}
            <div 
              onClick={handleLaunchAdmin}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                    <ShieldCheck className="w-5 h-5 text-teal-400" />
                  </div>
                  <span className="text-3xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 uppercase tracking-wider">
                    Administrative Portal
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-900 dark:group-hover:text-teal-300 transition-colors">
                    Administrator Portal
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Designed for lab heads and platform admins to monitor live sessions, inspect single-LLM routing telemetry, and configure global RAG policies.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1 text-2xs text-slate-600 dark:text-slate-300">
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
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-3xs font-semibold text-slate-500">System Telemetry</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                  <span>Open Admin Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
          <label className="flex items-center space-x-2 text-2xs text-slate-600 dark:text-slate-400 cursor-pointer">
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
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Continue as {currentUser.displayName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleGoToLogin('signin')}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-colors shadow-2xs cursor-pointer flex items-center space-x-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-teal-700" />
                  <span>Log In</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleGoToLogin('signup')}
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
