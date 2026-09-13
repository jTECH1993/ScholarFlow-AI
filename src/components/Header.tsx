import React, { useState } from 'react';
import { 
  Activity, 
  BookOpen, 
  Sparkles, 
  FileCode2, 
  Sliders, 
  Cpu, 
  Layers,
  TrendingUp,
  FileText,
  Bookmark,
  User,
  LogOut,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Stethoscope,
  Heart,
  Radio,
  Wind
} from 'lucide-react';
import { LLMProvider, OllamaSettings, UserProfile } from '../types';

export type AppTab = 'chat' | 'workbench' | 'literature' | 'corpus' | 'benchmark' | 'export' | 'settings';

interface HeaderProps {
  activeInterface: 'user' | 'admin';
  setActiveInterface: (mode: 'user' | 'admin') => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  provider: LLMProvider;
  setProvider: (provider: LLMProvider) => void;
  ollamaSettings: OllamaSettings;
  paperCount: number;
  totalChunks: number;
  currentUser: UserProfile | null;
  onOpenAuth: (tab?: 'signin' | 'signup' | 'reset') => void;
  onOpenPerspectiveModal: () => void;
  onOpenCitationsDrawer: () => void;
  onOpenSplashScreen: () => void;
  onSignOut: () => void;
  savedCitationCount: number;
  sessionId?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeInterface,
  setActiveInterface,
  activeTab,
  setActiveTab,
  provider,
  setProvider,
  ollamaSettings,
  paperCount,
  totalChunks,
  currentUser,
  onOpenAuth,
  onOpenPerspectiveModal,
  onOpenCitationsDrawer,
  onOpenSplashScreen,
  onSignOut,
  savedCitationCount,
  sessionId,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onOpenSplashScreen}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-700 to-slate-900 flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform cursor-pointer"
              title="Open Enterprise SaaS Overview"
            >
              <Sparkles className="w-6 h-6 text-teal-300" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-1.5">
                  <span>ScholarFlow AI™</span>
                  <span className="text-2xs font-extrabold px-1.5 py-0.2 rounded bg-teal-800 text-teal-100 uppercase tracking-wider">
                    SaaS
                  </span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                  {paperCount} Papers Ingested
                </span>
                {sessionId && (
                  <span 
                    className="hidden md:inline-flex items-center space-x-1 px-2 py-0.5 rounded text-3xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
                    title="Isolated Session ID: uploaded research belongs to this session"
                  >
                    <span>Session:</span>
                    <span className="font-mono font-bold text-teal-800">{sessionId}</span>
                  </span>
                )}
                {currentUser?.organization && (
                  <span className="hidden lg:inline-flex items-center space-x-1 px-2 py-0.5 rounded text-3xs font-bold bg-teal-100 text-teal-900 border border-teal-300">
                    <Activity className="w-3 h-3 text-teal-700" />
                    <span>{currentUser.organization}</span>
                  </span>
                )}
              </div>
              <p className="text-3xs text-slate-500 hidden sm:block">
                General Scholar AI &bull; Evidence-Grounded Multi-Domain Literature &amp; Private Sessions
              </p>
            </div>
          </div>

          {/* Center/Right: Perspective + Engine + User Auth */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Active Dedicated Perspective Button */}
            {currentUser && (
              <button
                type="button"
                onClick={onOpenPerspectiveModal}
                className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-teal-200 bg-teal-50/70 hover:bg-teal-100/70 text-teal-900 transition-all text-xs font-medium group"
                title="Click to customize or switch your research perspective"
              >
                <div className="w-5 h-5 rounded-md bg-teal-700 text-white flex items-center justify-center text-3xs">
                  {currentUser.perspectiveId === 'academic-scholar' && <BookOpen className="w-3 h-3" />}
                  {currentUser.perspectiveId === 'vital-sign-rag' && <Activity className="w-3 h-3" />}
                  {currentUser.perspectiveId === 'cs-ai-systems' && <Cpu className="w-3 h-3" />}
                  {currentUser.perspectiveId === 'english-literature' && <FileText className="w-3 h-3" />}
                  {currentUser.perspectiveId === 'critical-care' && <Activity className="w-3 h-3" />}
                  {currentUser.perspectiveId === 'wearables-ppg' && <Cpu className="w-3 h-3" />}
                  {currentUser.perspectiveId === 'cardiology-ecg' && <Heart className="w-3 h-3" />}
                  {currentUser.perspectiveId === 'cuffless-bp' && <TrendingUp className="w-3 h-3" />}
                  {currentUser.perspectiveId === 'touchless-radar-rppg' && <Radio className="w-3 h-3" />}
                  {currentUser.perspectiveId === 'pediatric-respiratory' && <Wind className="w-3 h-3" />}
                  {!['academic-scholar', 'vital-sign-rag', 'cs-ai-systems', 'english-literature', 'critical-care', 'wearables-ppg', 'cardiology-ecg', 'cuffless-bp', 'touchless-radar-rppg', 'pediatric-respiratory'].includes(currentUser.perspectiveId) && (
                    <Sparkles className="w-3 h-3" />
                  )}
                </div>
                <div className="text-left">
                  <div className="text-3xs uppercase tracking-wider text-teal-600 font-bold leading-none">
                    Perspective
                  </div>
                  <div className="text-2xs font-bold text-slate-900 truncate max-w-[140px]">
                    {currentUser.perspectiveName}
                  </div>
                </div>
                <Sliders className="w-3 h-3 text-teal-600 group-hover:rotate-45 transition-transform ml-1" />
              </button>
            )}

            {/* Citations Notebook Button */}
            <button
              type="button"
              onClick={onOpenCitationsDrawer}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
              title="Personal Research Evidence Notebook"
            >
              <Bookmark className="w-3.5 h-3.5 text-teal-700" />
              <span className="hidden sm:inline">Notebook</span>
              {savedCitationCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-teal-700 text-white text-3xs font-bold flex items-center justify-center ml-0.5">
                  {savedCitationCount}
                </span>
              )}
            </button>

            {/* Dual Interface Switcher: User Workspace vs Admin Portal */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                id="switch-interface-user"
                onClick={() => setActiveInterface('user')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeInterface === 'user'
                    ? 'bg-white text-teal-900 shadow-xs ring-1 ring-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Researcher Workspace (User Interface)"
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                <span className="hidden sm:inline">User Workspace</span>
                <span className="sm:hidden">User</span>
              </button>
              <button
                type="button"
                id="switch-interface-admin"
                onClick={() => setActiveInterface('admin')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeInterface === 'admin'
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Administrator Portal (Admin Interface)"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">Admin Portal</span>
                <span className="sm:hidden">Admin</span>
              </button>
            </div>

            {/* Model Engine Selector */}
            <div className="hidden md:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
              <button
                type="button"
                id="select-provider-gemini"
                onClick={() => setProvider('gemini')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition-colors ${
                  provider === 'gemini'
                    ? 'bg-white text-teal-800 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3 h-3 text-teal-600" />
                <span>Gemini</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </button>

              <button
                type="button"
                id="select-provider-ollama"
                onClick={() => setProvider('ollama')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition-colors ${
                  provider === 'ollama'
                    ? 'bg-white text-teal-800 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Cpu className="w-3 h-3 text-indigo-600" />
                <span>Ollama</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    ollamaSettings.isConnected ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}
                ></span>
              </button>
            </div>

            {/* User Account / Auth Section */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 pl-2 pr-2.5 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-teal-800 text-white font-bold text-xs flex items-center justify-center">
                    {currentUser.displayName.charAt(0) || 'U'}
                  </div>
                  <div className="hidden sm:block leading-tight">
                    <div className="text-2xs font-bold text-slate-800 truncate max-w-[110px]">
                      {currentUser.displayName}
                    </div>
                    <div className="text-3xs text-teal-700 font-medium truncate max-w-[110px]">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {/* User Profile Dropdown Menu */}
                {showUserDropdown && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs animate-in fade-in duration-150"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">{currentUser.displayName}</p>
                      <p className="text-3xs text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-3xs px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-semibold border border-teal-200">
                        {currentUser.organization}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        type="button"
                        onClick={onOpenPerspectiveModal}
                        className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                      >
                        <Sliders className="w-3.5 h-3.5 text-teal-600" />
                        <span>My Research Perspective</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenCitationsDrawer}
                        className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-teal-600" />
                        <span>Saved Citations ({savedCitationCount})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveInterface(activeInterface === 'user' ? 'admin' : 'user');
                          setShowUserDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center space-x-2 font-medium"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                        <span>{activeInterface === 'user' ? 'Switch to Admin Portal' : 'Switch to Researcher Workspace'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenSplashScreen}
                        className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span>SaaS Platform Tour</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        id="header-signout-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowUserDropdown(false);
                          onSignOut();
                        }}
                        className="w-full px-4 py-2 text-left text-rose-600 hover:bg-rose-50 flex items-center space-x-2 font-medium cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  id="header-signin-btn"
                  onClick={() => onOpenAuth('signin')}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  id="header-signup-btn"
                  onClick={() => onOpenAuth('signup')}
                  className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs (Researcher Workspace vs Admin Strip) */}
        {activeInterface === 'admin' ? (
          <div className="flex items-center justify-between border-t border-slate-100 py-2 px-1 text-xs">
            <div className="flex items-center space-x-2.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-extrabold bg-slate-900 text-teal-300 uppercase tracking-wider">
                Admin Mode
              </span>
              <span className="text-slate-700 font-semibold hidden sm:inline">
                Single-LLM Multi-Tenant Telemetry &bull; Isolated Session Boundaries &bull; RAG Governance
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveInterface('user')}
              className="px-3 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs rounded-lg border border-teal-200 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <span>Back to Researcher Workspace</span>
              <BookOpen className="w-3.5 h-3.5 text-teal-700" />
            </button>
          </div>
        ) : (
          <div className="flex space-x-1 sm:space-x-2 border-t border-slate-100 overflow-x-auto py-1.5">
          <button
            type="button"
            id="tab-chat"
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'chat'
                ? 'bg-teal-50 text-teal-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span>Scholar Chat</span>
          </button>

          <button
            type="button"
            id="tab-literature"
            onClick={() => setActiveTab('literature')}
            className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'literature'
                ? 'bg-teal-50 text-teal-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Literature Matrix & Review</span>
          </button>

          <button
            type="button"
            id="tab-corpus"
            onClick={() => setActiveTab('corpus')}
            className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'corpus'
                ? 'bg-teal-50 text-teal-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4 text-teal-600" />
            <span>Research Corpus ({paperCount} Papers)</span>
          </button>

          <button
            type="button"
            id="tab-workbench"
            onClick={() => setActiveTab('workbench')}
            className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'workbench'
                ? 'bg-teal-50 text-teal-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Biomedical & Signal Lab</span>
          </button>

          <button
            type="button"
            id="tab-benchmark"
            onClick={() => setActiveTab('benchmark')}
            className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'benchmark'
                ? 'bg-teal-50 text-teal-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-teal-600" />
            <span>Benchmarks & Metrics</span>
          </button>

          <button
            type="button"
            id="tab-export"
            onClick={() => setActiveTab('export')}
            className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'export'
                ? 'bg-teal-50 text-teal-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileCode2 className="w-4 h-4 text-emerald-600" />
            <span>Streamlit / LaTeX Export</span>
          </button>

          <button
            type="button"
            id="tab-settings"
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
              activeTab === 'settings'
                ? 'bg-teal-50 text-teal-700 font-semibold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-4 h-4 text-slate-500" />
            <span>RAG Config</span>
          </button>
        </div>
        )}
      </div>
    </header>
  );
};
