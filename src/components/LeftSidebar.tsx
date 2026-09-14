import React from 'react';
import { 
  Home, 
  MessageSquare, 
  UploadCloud, 
  FileText, 
  Layers, 
  Activity, 
  TrendingUp, 
  FileCode2, 
  Sliders, 
  Folder, 
  BookMarked, 
  Settings, 
  Sparkles, 
  Crown,
  BookOpen,
  X
} from 'lucide-react';

export type AppNavTab = 
  | 'home'
  | 'chat'
  | 'upload'
  | 'literature'
  | 'corpus'
  | 'workbench'
  | 'benchmark'
  | 'export'
  | 'settings'
  | 'projects'
  | 'notebook'
  | 'profile-settings'
  | 'landing';

interface LeftSidebarProps {
  activeTab: AppNavTab;
  setActiveTab: (tab: AppNavTab) => void;
  paperCount: number;
  onOpenUpgradeModal?: () => void;
  onOpenSplashScreen?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  setActiveTab,
  paperCount,
  onOpenUpgradeModal,
  onOpenSplashScreen,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const maxPapers = 50;
  const usagePercentage = Math.min(100, Math.round((paperCount / maxPapers) * 100));

  const primaryNavItems: { id: AppNavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'chat', label: 'Scholar Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'upload', label: 'Upload & Library', icon: <UploadCloud className="w-4 h-4" /> },
    { id: 'literature', label: 'Literature Review', icon: <FileText className="w-4 h-4" /> },
    { id: 'corpus', label: 'Research Corpus', icon: <Layers className="w-4 h-4" /> },
    { id: 'benchmark', label: 'Benchmarks & Metrics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'export', label: 'LaTeX & Export', icon: <FileCode2 className="w-4 h-4" /> },
    { id: 'settings', label: 'RAG Configuration', icon: <Sliders className="w-4 h-4" /> },
  ];

  const secondaryNavItems: { id: AppNavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'projects', label: 'Projects', icon: <Folder className="w-4 h-4" /> },
    { id: 'notebook', label: 'Notes & Notebook', icon: <BookMarked className="w-4 h-4" /> },
    { id: 'profile-settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: AppNavTab) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed lg:static top-0 bottom-0 left-0 z-50
        w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between
        transition-transform duration-200 ease-in-out shrink-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Logo */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onOpenSplashScreen}
            className="flex items-center space-x-2.5 text-left group cursor-pointer"
            title="Open Platform Overview"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-800 dark:bg-teal-700 text-white flex items-center justify-center shadow-xs group-hover:bg-teal-900 transition-colors">
              <BookOpen className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-extrabold text-slate-900 dark:text-white text-sm tracking-tight">ScholarFlow AI</span>
                <span className="text-3xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-1 py-0.2 rounded">TM</span>
              </div>
              <p className="text-3xs text-slate-400 dark:text-slate-500 font-medium">Research Smarter. Discover Deeper.</p>
            </div>
          </button>

          {isMobileOpen && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {/* Primary Navigation */}
          <nav className="space-y-0.5">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-300 font-bold shadow-2xs border border-teal-100 dark:border-teal-900/60'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={isActive ? 'text-teal-700 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <nav className="space-y-0.5">
              {secondaryNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    id={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-300 font-bold shadow-2xs border border-teal-100 dark:border-teal-900/60'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className={isActive ? 'text-teal-700 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Usage Card */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-2xs font-semibold text-slate-700 dark:text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Indexed Library</span>
              </div>
            </div>

            {/* Circular Gauge */}
            <div className="flex flex-col items-center justify-center py-1">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100 dark:text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-teal-600 dark:text-teal-400 transition-all duration-500 ease-out"
                    strokeDasharray={`${usagePercentage}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white leading-none">
                    {paperCount} / {maxPapers}
                  </span>
                  <span className="text-3xs text-slate-400 dark:text-slate-500 mt-0.5">Papers</span>
                </div>
              </div>
            </div>

            {onOpenUpgradeModal && (
              <button
                type="button"
                id="sidebar-upgrade-btn"
                onClick={onOpenUpgradeModal}
                className="w-full py-1.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-2xs cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 text-teal-200" />
                <span>Researcher Access</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
