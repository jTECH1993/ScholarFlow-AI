import React, { useState } from 'react';
import { 
  Search, 
  BookMarked, 
  Download, 
  Settings, 
  Moon, 
  Sun, 
  ChevronDown, 
  ShieldCheck, 
  User, 
  LogOut, 
  HelpCircle, 
  Menu,
  Sparkles,
  Layers,
  BookOpen
} from 'lucide-react';
import { UserProfile } from '../types';
import { AppNavTab } from './LeftSidebar';

interface TopHeaderProps {
  onToggleMobileSidebar: () => void;
  onOpenNotebook: () => void;
  onOpenExport: () => void;
  onOpenSettings: () => void;
  onOpenSplashScreen: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: (tab?: 'signin' | 'signup' | 'reset') => void;
  onSignOut: () => void;
  savedCitationCount: number;
  activeInterface: 'user' | 'admin';
  setActiveInterface: (mode: 'user' | 'admin') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  activeTab: AppNavTab;
  setActiveTab: (tab: AppNavTab) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAdminAuth?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onToggleMobileSidebar,
  onOpenNotebook,
  onOpenExport,
  onOpenSettings,
  onOpenSplashScreen,
  currentUser,
  onOpenAuth,
  onSignOut,
  savedCitationCount,
  activeInterface,
  setActiveInterface,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  activeTab,
  setActiveTab,
  isDarkMode,
  onToggleDarkMode,
  onOpenAdminAuth,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const isAdmin = currentUser?.role === 'Administrator' || 
                  localStorage.getItem('scholarflow_admin_auth') === 'true';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      onSearchSubmit(searchQuery);
    }
  };

  const displayName = currentUser?.displayName || 'Guest Scholar';
  const roleName = currentUser ? (currentUser.role || 'Academic Researcher') : 'Public Session';
  const initials = currentUser
    ? (currentUser.displayName || currentUser.email || 'User')
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase() || 'U'
    : 'GS';

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0 transition-colors">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center space-x-3 flex-1 max-w-2xl">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            id="global-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search papers by year, author, method, or ask research questions...  Ctrl + K"
            className="w-full pl-10 pr-20 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100/80 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-teal-500 rounded-xl outline-hidden text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center px-1.5 py-0.5 text-3xs font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-2xs">
            Ctrl + K
          </kbd>
        </div>
      </div>

      {/* Right: Quick Tools, Theme, User Avatar */}
      <div className="flex items-center space-x-2 sm:space-x-3 ml-3">
        {/* Notebook Button */}
        <button
          type="button"
          id="topbar-notebook-btn"
          onClick={onOpenNotebook}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          title="Evidence Notebook & Saved Citations"
        >
          <BookMarked className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span className="hidden sm:inline">Notebook</span>
          {savedCitationCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-teal-700 text-white text-3xs font-bold flex items-center justify-center ml-0.5">
              {savedCitationCount}
            </span>
          )}
        </button>

        {/* Export Button */}
        <button
          type="button"
          id="topbar-export-btn"
          onClick={onOpenExport}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          title="Export LaTeX / Reports"
        >
          <Download className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Settings Gear */}
        <button
          type="button"
          id="topbar-settings-btn"
          onClick={onOpenSettings}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          title="Platform Settings & RAG Config"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Global Working Dark / Light Theme Toggle */}
        <button
          type="button"
          id="theme-toggle-button"
          onClick={onToggleDarkMode}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* ONLY Authenticated Administrators can see and access the Admin Portal */}
        {isAdmin && (
          <button
            type="button"
            id="topbar-interface-toggle"
            onClick={() => setActiveInterface(activeInterface === 'user' ? 'admin' : 'user')}
            className={`hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              activeInterface === 'admin'
                ? 'bg-slate-900 text-teal-300 border-slate-900 dark:bg-teal-900/50 dark:text-teal-300 dark:border-teal-700'
                : 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100 dark:bg-slate-800 dark:text-teal-400 dark:border-teal-800'
            }`}
            title={activeInterface === 'user' ? 'Switch to Admin Portal' : 'Switch to Researcher Workspace'}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{activeInterface === 'user' ? 'Admin Portal' : 'Researcher View'}</span>
          </button>
        )}

        {/* Sign In Quick Button for Guests */}
        {!currentUser && (
          <button
            type="button"
            onClick={() => onOpenAuth('signin')}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}

        {/* User Account / Dropdown */}
        <div className="relative">
          <button
            type="button"
            id="topbar-user-menu-btn"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center space-x-2 pl-1.5 pr-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors text-left cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full font-extrabold text-xs flex items-center justify-center shadow-2xs ${
              currentUser 
                ? 'bg-teal-700 text-white' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600'
            }`}>
              {currentUser ? initials : <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
            </div>
            <div className="hidden xl:block leading-tight">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[130px]">
                {displayName}
              </div>
              <div className="text-3xs text-slate-500 dark:text-slate-400 font-medium">
                {roleName}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* User Menu Dropdown */}
          {showUserDropdown && (
            <div 
              className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-slate-800 dark:text-slate-200"
              onClick={() => setShowUserDropdown(false)}
            >
              {currentUser ? (
                <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                  <div className="font-bold text-slate-900 dark:text-white text-sm truncate">{currentUser.displayName || displayName}</div>
                  <div className="text-3xs text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</div>
                  {currentUser.organization && (
                    <div className="inline-block mt-1 text-3xs px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800">
                      {currentUser.organization}
                    </div>
                  )}
                </div>
              ) : (
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">Academic Researcher</span>
                  </div>
                  <p className="text-3xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Universal Open Access &bull; Researcher Workspace
                  </p>
                  <p className="text-3xs text-slate-600 dark:text-slate-300 mt-2 bg-teal-50/80 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900 rounded-lg p-2 leading-relaxed">
                    Access all 43 peer-reviewed research papers, chronologically view papers by year, extract key methodology/findings, and synthesize publication-ready Literature Review sections.
                  </p>
                </div>
              )}

              <div className="py-1">
                {/* Admin Switcher only shown if user is administrator, otherwise Admin Auth Option */}
                {isAdmin ? (
                  <button
                    type="button"
                    onClick={() => setActiveInterface(activeInterface === 'user' ? 'admin' : 'user')}
                    className="w-full px-4 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center space-x-2 font-medium cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>{activeInterface === 'user' ? 'Open Administrator Console' : 'Switch to Researcher App'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenAdminAuth) onOpenAdminAuth();
                    }}
                    className="w-full px-4 py-2 text-left text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center space-x-2 text-3xs font-medium cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Administrator Authorization</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveTab('profile-settings')}
                  className="w-full px-4 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center space-x-2 font-medium cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>{currentUser ? 'Researcher Profile & Institution' : 'Preferences & Clinical Perspective'}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenSplashScreen}
                  className="w-full px-4 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center space-x-2 font-medium cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span>Researcher Platform Tour</span>
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                {currentUser ? (
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="w-full px-4 py-2 text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center space-x-2 font-semibold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <div className="px-3 py-2 flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => onOpenAuth('signin')}
                      className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-center transition-colors cursor-pointer"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenAuth('signup')}
                      className="flex-1 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-center transition-colors cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

