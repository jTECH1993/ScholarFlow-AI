import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  GitCompare, 
  FileText, 
  Layers, 
  Play,
  Check
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenDemo: () => void;
  onOpenAdmin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onOpenDemo,
  onOpenAdmin,
}) => {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {/* Top Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-b from-teal-50/60 via-slate-50/40 to-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Next-Generation Academic Literature AI &bull; Universal Research Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Research Smarter with <span className="text-teal-700">ScholarFlow AI</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Evidence-grounded multi-paper intelligence, multimodal equation & figure extraction, and private zero-leakage sessions powered by single foundation LLMs with strict session isolation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              id="landing-get-started-btn"
              onClick={onGetStarted}
              className="px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              id="landing-watch-demo-btn"
              onClick={onOpenDemo}
              className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-sm font-bold shadow-2xs transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-teal-700 fill-teal-700" />
              <span>Platform Tour Demo</span>
            </button>

            <button
              type="button"
              onClick={onOpenAdmin}
              className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-teal-300 text-sm font-bold shadow-2xs transition-all flex items-center space-x-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Stats Pills matching Panel 1 */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-600">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 flex items-center space-x-1.5">
              <span className="text-teal-700 font-extrabold">10K+</span>
              <span>Papers Analyzed</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 flex items-center space-x-1.5">
              <span className="text-teal-700 font-extrabold">50+</span>
              <span>Academic Domains</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 flex items-center space-x-1.5">
              <span className="text-teal-700 font-extrabold">99%</span>
              <span>Accurate Citations</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 flex items-center space-x-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Trusted by Researchers</span>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Engineered for Serious Research Discovery
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Move from superficial chatbots to rigorous academic synthesis with true page-level evidence grounding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Single LLM, Isolated Sessions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every researcher benefits from foundation-grade Gemini 2.5 Flash while maintaining complete cryptographic tenant privacy in separate vector namespaces.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center">
              <GitCompare className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Literature Matrix & Gaps</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automate the generation of PRISMA-compliant literature reviews, consensus viewpoints, conflicting findings, and recommended methodology directions.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Multimodal Bio-Signal Lab</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Delineate ECG and PPG fiducials, extract radar chest displacements, analyze HRV metrics, and inspect time-frequency spectrograms directly in your browser.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
