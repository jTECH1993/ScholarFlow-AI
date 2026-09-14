import React, { useState } from 'react';
import { 
  Sparkles, 
  UploadCloud, 
  MessageSquare, 
  GitCompare, 
  BarChart3, 
  FileText, 
  Layers, 
  Cpu, 
  ArrowRight, 
  Paperclip, 
  Image as ImageIcon, 
  Sliders, 
  ChevronDown, 
  CheckCircle2, 
  Clock, 
  Folder, 
  Radio, 
  Heart, 
  Activity, 
  ShieldPlus, 
  Search, 
  Download, 
  BookOpen, 
  Zap,
  TrendingUp,
  FileCode2,
  ExternalLink
} from 'lucide-react';
import { ActiveResearchDomain } from '../types';
import { DOMAIN_TOPICS, DEMO_PROJECTS } from '../data/researchDomainTopics';
import { AppNavTab } from './LeftSidebar';

interface HomeDashboardProps {
  onNavigateTab: (tab: AppNavTab) => void;
  onSendQuestion: (question: string) => void;
  onOpenUpload: () => void;
  onLoadSampleCorpus: () => void;
  onResetFreshWorkspace?: () => void;
  onOpenDomainManager: () => void;
  paperCount: number;
  corpusCount: number;
  activeDomain: ActiveResearchDomain;
  setActiveDomain: (domain: ActiveResearchDomain) => void;
  sessionId: string;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigateTab,
  onSendQuestion,
  onOpenUpload,
  onLoadSampleCorpus,
  onResetFreshWorkspace,
  onOpenDomainManager,
  paperCount,
  corpusCount,
  activeDomain,
  setActiveDomain,
  sessionId,
}) => {
  const [questionText, setQuestionText] = useState('');
  const [deepResearchMode, setDeepResearchMode] = useState(true);

  // Get active domain metadata
  const currentDomainMeta = DOMAIN_TOPICS.find((d) => d.id === activeDomain);

  // Suggested questions based on active domain
  const activeSuggestedExamples = currentDomainMeta
    ? currentDomainMeta.examplePills
    : [
        { label: 'Summarize this paper', prompt: 'Summarize the core problem statement, proposed methodology, and key clinical findings across these papers.' },
        { label: 'Compare methods', prompt: 'Compare the sensor hardware, signal processing pipeline, and regression error metrics across all ingested papers.' },
        { label: 'Extract tables', prompt: 'Extract all performance comparison tables and format them as Markdown matrices with MAE and RMSE values.' },
        { label: 'Explain equations', prompt: 'Explain the physiological calibration formulas and mathematical models used for continuous vital sign tracking.' },
        { label: 'Find datasets', prompt: 'What public and clinical datasets (e.g. MIMIC-III, CapnoBase, WESAD) were evaluated in these studies?' }
      ];

  const handleQuerySubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!questionText.trim()) return;
    onSendQuestion(questionText);
  };

  const handleExampleClick = (prompt: string) => {
    setQuestionText(prompt);
  };

  const renderDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-3.5 h-3.5 text-rose-500" />;
      case 'Activity':
        return <Activity className="w-3.5 h-3.5 text-sky-500" />;
      case 'Radio':
        return <Radio className="w-3.5 h-3.5 text-cyan-500" />;
      case 'Cpu':
        return <Cpu className="w-3.5 h-3.5 text-indigo-500" />;
      case 'ShieldPlus':
        return <ShieldPlus className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-teal-600" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/70 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Main Center Column (8 cols on XL) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-50 via-sky-50 to-blue-50/50 dark:from-slate-900 dark:via-teal-950/40 dark:to-slate-900 border border-teal-200/70 dark:border-teal-900/60 p-6 sm:p-8 shadow-xs">
            {/* Background Graphic Accents */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-end pr-4">
              <svg className="w-64 h-64 text-teal-700 dark:text-teal-400" viewBox="0 0 200 200" fill="currentColor">
                <path d="M45,-76C58,-69,69,-58,76,-45C83,-32,86,-16,84,-1C82,14,75,28,67,41C59,54,50,66,38,73C26,80,13,82,-1,84C-15,86,-30,88,-43,82C-56,76,-67,62,-74,47C-81,32,-84,16,-82,1C-80,-14,-73,-28,-64,-40C-55,-52,-44,-62,-32,-70C-20,-78,-10,-84,3,-89C16,-94,32,-83,45,-76Z" transform="translate(100 100)" />
              </svg>
            </div>

            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100/80 dark:bg-teal-900/60 border border-teal-300/50 dark:border-teal-700 text-teal-800 dark:text-teal-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Your AI Research Assistant</span>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  ScholarFlow <span className="text-teal-700 dark:text-teal-400">AI</span>
                </h1>
                <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200">
                  Evidence-Grounded Multi-Domain Literature &amp; Private Sessions
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Upload your PDFs, ask research questions, get grounded answers, compare papers, analyze tables/figures, and build your custom domain scholar.
              </p>

              {/* Active domain indicator */}
              {activeDomain !== 'all' && currentDomainMeta && (
                <div className="pt-1 flex items-center space-x-2">
                  <span className="text-2xs font-semibold text-slate-500 dark:text-slate-400">Active Topic Focus:</span>
                  <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-2xs font-bold border ${currentDomainMeta.color}`}>
                    {renderDomainIcon(currentDomainMeta.iconName)}
                    <span>{currentDomainMeta.name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveDomain('all')}
                    className="text-2xs text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 font-semibold underline ml-1 cursor-pointer"
                  >
                    Reset to All
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* Card 1: Papers Ingested */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Papers Ingested</span>
                <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{paperCount}</div>
              <div className="text-3xs text-slate-500 dark:text-slate-400">In this session</div>
            </div>

            {/* Card 2: Research Corpus */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Research Corpus</span>
                <Layers className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{corpusCount}</div>
              <div className="text-3xs text-slate-500 dark:text-slate-400">Total documents</div>
            </div>

            {/* Card 3: AI Queries */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">AI Queries</span>
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">∞</div>
              <div className="text-3xs text-slate-500 dark:text-slate-400">Ask anything</div>
            </div>

            {/* Card 4: AI Engine */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">AI Engine</span>
                <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white truncate">Gemini 2.5 Flash</div>
              <div className="text-3xs text-slate-500 dark:text-slate-400 truncate">Multimodal • Fast • Reliable</div>
            </div>
          </div>

          {/* 4 Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Action 1: Upload */}
            <div 
              onClick={onOpenUpload}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">Upload Papers</h3>
                <p className="text-3xs text-slate-500 dark:text-slate-400">PDF, LaTeX, Text, Markdown</p>
              </div>
              <div className="mt-3 text-3xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                <span>Start Upload</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Action 2: Chat */}
            <div 
              onClick={() => onNavigateTab('chat')}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">Ask Scholar Chat</h3>
                <p className="text-3xs text-slate-500 dark:text-slate-400">Get grounded answers</p>
              </div>
              <div className="mt-3 text-3xs font-bold text-blue-600 dark:text-blue-400 flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Chat</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Action 3: Compare */}
            <div 
              onClick={() => onNavigateTab('literature')}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                  <GitCompare className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">Compare Papers</h3>
                <p className="text-3xs text-slate-500 dark:text-slate-400">Side-by-side analysis</p>
              </div>
              <div className="mt-3 text-3xs font-bold text-purple-600 dark:text-purple-400 flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                <span>Build Matrix</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Action 4: Extract */}
            <div 
              onClick={() => onNavigateTab('corpus')}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">Extract Insights</h3>
                <p className="text-3xs text-slate-500 dark:text-slate-400">Figures, tables, equations</p>
              </div>
              <div className="mt-3 text-3xs font-bold text-amber-600 dark:text-amber-400 flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                <span>Explore Corpus</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* "Ask Your Research Question" Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 sm:p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Ask Your Research Question</h2>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDeepResearchMode(!deepResearchMode)}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-2xs font-bold text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors cursor-pointer"
                >
                  <Zap className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                  <span>{deepResearchMode ? 'Deep Research Enabled' : 'Standard Query'}</span>
                  <ChevronDown className="w-3 h-3 text-teal-600 dark:text-teal-400 ml-0.5" />
                </button>
              </div>
            </div>

            {/* Input Box */}
            <form onSubmit={handleQuerySubmit} className="space-y-3">
              <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 focus-within:border-teal-500 dark:focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all bg-slate-50/50 dark:bg-slate-950/50">
                <textarea
                  id="home-research-question-input"
                  rows={4}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder={`Ask anything about your papers, e.g.:\n• Summarize the key contributions of these papers\n• Compare the methods and results\n• What datasets were used for vital sign estimation?\n• Show me the mathematical model used\n• Extract tables and create a comparison`}
                  className="w-full p-4 text-xs sm:text-sm bg-transparent outline-hidden text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none font-normal leading-relaxed"
                />

                {/* Bottom Toolbar inside the box */}
                <div className="p-3 border-t border-slate-100/80 dark:border-slate-850 flex items-center justify-between bg-white dark:bg-slate-900 rounded-b-2xl">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                      type="button"
                      onClick={onOpenUpload}
                      className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Attach Research Paper PDF / TeX"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigateTab('chat')}
                      className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Analyze Clinical Waveform or Figure"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigateTab('settings')}
                      className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Adjust Retrieval Strategy & RAG"
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="submit"
                    id="home-submit-query-btn"
                    disabled={!questionText.trim()}
                    className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 disabled:hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>Query</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>

            {/* "Try these examples:" Pills */}
            <div className="space-y-2 pt-1">
              <div className="text-3xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Try these examples ({activeDomain === 'all' ? 'Universal' : currentDomainMeta?.name || 'Topic-Adapted'}):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeSuggestedExamples.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleExampleClick(item.prompt)}
                    className="text-2xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 hover:text-teal-800 dark:hover:text-teal-300 hover:border-teal-300 dark:hover:border-teal-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* "Powerful Features for Researchers" Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Powerful Features for Researchers</h2>
              <button
                type="button"
                onClick={() => onNavigateTab('literature')}
                className="text-2xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 flex items-center space-x-1 cursor-pointer"
              >
                <span>View All Features</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {/* Feature 1 */}
              <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Multimodal Understanding</h4>
                <p className="text-3xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Understand text, numerical tables, physiological waveforms, figures, and LaTeX equations simultaneously.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Evidence-Grounded Answers</h4>
                <p className="text-3xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Exact page numbers, section headers, verbatim quotes, and DOI links to eliminate hallucinations.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                  <GitCompare className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Literature Matrix</h4>
                <p className="text-3xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Synthesize cross-paper consensus points, methodologies, conflicting results, and identified gaps.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Custom Research Corpus</h4>
                <p className="text-3xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Ingest proprietary conference papers, lab notes, and datasets with dedicated vector partitioning.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                  <FileCode2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Export &amp; Share</h4>
                <p className="text-3xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Generate publication-ready LaTeX manuscripts, compiled PDFs, and interactive Streamlit dashboards.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                  <ShieldPlus className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Private &amp; Secure</h4>
                <p className="text-3xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Zero data leakage across user sessions. Complete multi-tenant privacy with isolated ephemeral prompts.
                </p>
              </div>
            </div>
          </div>

          {/* Recent Projects Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Recent Projects</h2>
              <button
                type="button"
                onClick={() => onNavigateTab('projects')}
                className="text-2xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 flex items-center space-x-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {DEMO_PROJECTS.slice(0, 3).map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onNavigateTab('projects')}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-3xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {proj.category}
                      </span>
                      <span className="text-3xs text-slate-400">{proj.updatedAgo}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                      {proj.title}
                    </h4>
                    <p className="text-3xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {proj.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2 flex items-center justify-between text-3xs text-slate-500 dark:text-slate-400 font-medium">
                    <span>{proj.paperCount} papers</span>
                    <span className="text-teal-700 dark:text-teal-400 font-bold">Open &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar Column (4 cols on XL) */}
        <div className="xl:col-span-4 space-y-6">

          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Quick Actions</h3>
            <div className="space-y-1.5">
              <button
                type="button"
                id="quick-action-upload"
                onClick={onOpenUpload}
                className="w-full flex items-center space-x-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left transition-colors text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Upload Research Paper</span>
              </button>

              <button
                type="button"
                id="quick-action-load-sample"
                onClick={onLoadSampleCorpus}
                className="w-full flex items-center space-x-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left transition-colors text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Load Sample Library</span>
              </button>

              {onResetFreshWorkspace && (
                <button
                  type="button"
                  id="quick-action-fresh-workspace"
                  onClick={onResetFreshWorkspace}
                  className="w-full flex items-center space-x-2.5 p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-100 dark:border-slate-800 text-left transition-colors text-xs font-medium text-rose-700 dark:text-rose-400 cursor-pointer"
                  title="Clear all indexed papers and start a completely fresh blank workspace"
                >
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Start Fresh / Reset RAG</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onNavigateTab('literature')}
                className="w-full flex items-center space-x-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left transition-colors text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <GitCompare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Create Literature Matrix</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('export')}
                className="w-full flex items-center space-x-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left transition-colors text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <FileCode2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Generate LaTeX Report</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('benchmark')}
                className="w-full flex items-center space-x-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left transition-colors text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>View Benchmarks</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('settings')}
                className="w-full flex items-center space-x-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left transition-colors text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span>Configure RAG</span>
              </button>
            </div>
          </div>

          {/* Research Domains Card (with Manage) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Research Domains</h3>
              <button
                type="button"
                id="manage-domains-btn"
                onClick={onOpenDomainManager}
                className="text-2xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 cursor-pointer"
              >
                Manage
              </button>
            </div>
            
            <p className="text-3xs text-slate-500 dark:text-slate-400">
              Select a research topic to adapt questions, benchmarks, and corpus extraction:
            </p>

            <div className="space-y-1.5">
              {/* All Domains button */}
              <button
                type="button"
                onClick={() => setActiveDomain('all')}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors text-xs cursor-pointer ${
                  activeDomain === 'all'
                    ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 font-bold border border-teal-200 dark:border-teal-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>All Domains (Universal)</span>
                </div>
                {activeDomain === 'all' && (
                  <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400" />
                )}
              </button>

              {DOMAIN_TOPICS.map((domain) => {
                const isActive = activeDomain === domain.id;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => setActiveDomain(domain.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors text-xs cursor-pointer ${
                      isActive
                        ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 font-bold border border-teal-200 dark:border-teal-800'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {renderDomainIcon(domain.iconName)}
                      <span className="truncate">{domain.name}</span>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Recent Activity</h3>
              <button
                type="button"
                onClick={() => onNavigateTab('chat')}
                className="text-2xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start space-x-2.5 text-xs">
                <div className="w-6 h-6 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    Session {sessionId.substring(0, 10)} started
                  </div>
                  <div className="text-3xs text-slate-400">Just now</div>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 text-xs">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-3 h-3" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {paperCount > 0 ? `${paperCount} papers ready for Q&A` : 'No papers ingested yet'}
                  </div>
                  <div className="text-3xs text-slate-400">
                    {paperCount > 0 ? 'Full embeddings parsed' : 'Upload or load sample library'}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 text-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Ready to answer questions</div>
                  <div className="text-3xs text-slate-400">Gemini 2.5 Flash active</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <footer className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-2xs text-slate-500 dark:text-slate-400 gap-3">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">ScholarFlow AI™</span>
          <span>|</span>
          <span>General Scholar AI &bull; Evidence-Grounded Research</span>
        </div>

        <div className="font-medium text-slate-600 dark:text-slate-300">
          🎓 Research Smarter. Impact Higher.
        </div>

        <div className="flex items-center space-x-3">
          <button 
            type="button" 
            onClick={() => onNavigateTab('settings')}
            className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            Help
          </button>
          <span>&bull;</span>
          <button 
            type="button" 
            onClick={() => onNavigateTab('export')}
            className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            Documentation
          </button>
          <span>&bull;</span>
          <button 
            type="button" 
            onClick={() => onNavigateTab('chat')}
            className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            Feedback
          </button>
          <span>&bull;</span>
          <span className="font-mono">v1.0.0</span>
        </div>
      </footer>
    </div>
  );
};
