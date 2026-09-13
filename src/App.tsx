import React, { useState, useEffect, useMemo } from 'react';
import { LeftSidebar, AppNavTab } from './components/LeftSidebar';
import { TopHeader } from './components/TopHeader';
import { HomeDashboard } from './components/HomeDashboard';
import { UploadManagePage } from './components/UploadManagePage';
import { ProjectsPage } from './components/ProjectsPage';
import { SettingsProfilePage } from './components/SettingsProfilePage';
import { LandingPage } from './components/LandingPage';
import { DomainManagerModal } from './components/DomainManagerModal';
import { ChatInterface } from './components/ChatInterface';
import { CorpusExplorer } from './components/CorpusExplorer';
import { BenchmarkMatrix } from './components/BenchmarkMatrix';
import { SubmissionExporter } from './components/SubmissionExporter';
import { SettingsView } from './components/SettingsView';
import { SignalWorkbench } from './components/SignalWorkbench';
import { LiteratureReviewGenerator } from './components/LiteratureReviewGenerator';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { AuthModal } from './components/AuthModal';
import { SplashScreen } from './components/SplashScreen';
import { PerspectiveSettingsModal } from './components/PerspectiveSettingsModal';
import { SavedCitationsDrawer } from './components/SavedCitationsDrawer';
import { AdminPortal } from './components/AdminPortal';
import { AdminGatekeeper } from './components/AdminGatekeeper';
import { AdminSecurityModal } from './components/AdminSecurityModal';
import { 
  ChatMessage, 
  VitalSignPaper, 
  RAGSettings, 
  OllamaSettings, 
  LLMProvider,
  AttachedImage,
  UserProfile,
  SavedCitationItem,
  ClinicalPerspectiveId,
  ActiveResearchDomain
} from './types';
import { VITAL_SIGN_PAPERS } from './data/vitalSignPapers';
import { CLINICAL_PERSPECTIVES } from './data/clinicalPerspectives';
import { DOMAIN_TOPICS } from './data/researchDomainTopics';
import { 
  auth, 
  onAuthStateChanged, 
  signOutUser, 
  getUserProfileFromFirestore, 
  updateUserProfileInFirestore, 
  loadUserCitationsFromFirestore, 
  saveCitationToFirestore, 
  deleteCitationFromFirestore,
  saveChatSessionToFirestore 
} from './lib/firebase';

export const App: React.FC = () => {
  const [activeInterface, setActiveInterface] = useState<'user' | 'admin'>('user');
  const [activeTab, setActiveTab] = useState<AppNavTab>('home');
  const [provider, setProvider] = useState<LLMProvider>('gemini');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Research Topic Adaptation State
  const [activeDomain, setActiveDomain] = useState<ActiveResearchDomain>('all');
  const [selectedDomains, setSelectedDomains] = useState<ActiveResearchDomain[]>(['all']);
  const [isDomainManagerOpen, setIsDomainManagerOpen] = useState(false);

  // Global search input state
  const [searchQuery, setSearchQuery] = useState('');

  // Session ID Management for Isolated Uploads & Research Workspaces
  const [sessionId, setSessionId] = useState<string>(() => {
    const stored = localStorage.getItem('scholarflow_session_id');
    if (stored) return stored;
    const newId = `session-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('scholarflow_session_id', newId);
    return newId;
  });

  // Session-isolated uploaded documents
  const [sessionPapers, setSessionPapers] = useState<VitalSignPaper[]>(() => {
    try {
      const activeSId = localStorage.getItem('scholarflow_session_id') || '';
      if (activeSId) {
        const raw = localStorage.getItem(`scholarflow_session_docs_${activeSId}`);
        if (raw) return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not load session papers:', e);
    }
    return [];
  });

  const [includeSampleCorpus, setIncludeSampleCorpus] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadNotification, setUploadNotification] = useState<string | null>(null);

  // User Session Management: Check stored profile or start as Guest
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const storedUid = localStorage.getItem('vitalpulse_active_user_uid');
      if (storedUid) {
        const storedProfile = localStorage.getItem(`vitalpulse_user_${storedUid}`);
        if (storedProfile) {
          return JSON.parse(storedProfile);
        }
      }
      const genericProfile = localStorage.getItem('scholarflow_user_profile');
      if (genericProfile) {
        return JSON.parse(genericProfile);
      }
    } catch (e) {
      console.warn('Error reading stored user session:', e);
    }
    return null; // Open universal Guest Scholar access
  });

  const [savedCitations, setSavedCitations] = useState<SavedCitationItem[]>([]);
  
  // Modal Visibility States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [isPerspectiveModalOpen, setIsPerspectiveModalOpen] = useState(false);
  const [isCitationsDrawerOpen, setIsCitationsDrawerOpen] = useState(false);
  const [isSplashScreenOpen, setIsSplashScreenOpen] = useState(false); // Closed by default so user sees dashboard directly
  const [isAdminSecurityModalOpen, setIsAdminSecurityModalOpen] = useState(false);

  // Global Dark Mode Controller
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('scholarflow_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('scholarflow_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('scholarflow_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Strict Admin Authorization Check
  const isAdmin = useMemo(() => {
    if (!currentUser) {
      return localStorage.getItem('scholarflow_admin_auth') === 'true';
    }
    return (
      currentUser.role === 'Administrator' ||
      currentUser.email === 'talha93uet@gmail.com' ||
      currentUser.email === 'mtalhajahangir@mnsuet.edu.pk' ||
      localStorage.getItem('scholarflow_admin_auth') === 'true'
    );
  }, [currentUser]);

  // Base Corpus papers: Universal peer-reviewed benchmark corpus accessible to everyone
  const papers = useMemo<VitalSignPaper[]>(() => {
    if (includeSampleCorpus) {
      const existingIds = new Set(sessionPapers.map((p) => p.id));
      return [...sessionPapers, ...VITAL_SIGN_PAPERS.filter((p) => !existingIds.has(p.id))];
    }
    return sessionPapers;
  }, [includeSampleCorpus, sessionPapers]);

  // Topic-Adjusted Filtered Papers (Dynamic Adaptation according to user research requirement)
  const filteredPapers = useMemo<VitalSignPaper[]>(() => {
    if (activeDomain === 'all') return papers;
    const topicMeta = DOMAIN_TOPICS.find((t) => t.id === activeDomain);
    if (!topicMeta) return papers;
    return papers.filter((p) => {
      if (topicMeta.filterModality && topicMeta.filterModality !== 'all') {
        const cleanMod = topicMeta.filterModality.toLowerCase().replace('sensing', '').trim();
        if (p.modality?.toLowerCase().includes(cleanMod)) return true;
      }
      return topicMeta.relevantKeywords.some((kw) =>
        p.title.toLowerCase().includes(kw.toLowerCase()) ||
        p.abstract?.toLowerCase().includes(kw.toLowerCase())
      );
    });
  }, [papers, activeDomain]);

  const [ragSettings, setRagSettings] = useState<RAGSettings>({
    topK: 4,
    chunkOverlap: 200,
    similarityThreshold: 0.04,
    retrievalStrategy: 'hybrid',
    temperature: 0.2,
    filterModality: 'all',
    provider: 'gemini',
  });

  // Sync modality filter with active research domain
  useEffect(() => {
    if (activeDomain === 'all') {
      setRagSettings((prev) => ({ ...prev, filterModality: 'all' }));
    } else {
      const topicMeta = DOMAIN_TOPICS.find((t) => t.id === activeDomain);
      if (topicMeta && topicMeta.filterModality) {
        setRagSettings((prev) => ({ ...prev, filterModality: topicMeta.filterModality as any }));
      }
    }
  }, [activeDomain]);

  const [ollamaSettings, setOllamaSettings] = useState<OllamaSettings>({
    endpoint: 'http://localhost:11434',
    selectedModel: 'llama3.2:3b',
    availableModels: [
      'llama3.2:3b',
      'qwen2.5:3b',
      'deepseek-r1:1.5b',
      'gemma3:4b',
      'nomic-embed-text',
    ],
    isConnected: false,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profile = await getUserProfileFromFirestore(user.uid);
          if (profile) {
            setCurrentUser(profile);
            const userCitations = await loadUserCitationsFromFirestore(user.uid);
            setSavedCitations(userCitations);
            return;
          }
        } catch (err) {
          console.warn('Could not fetch user profile from Firestore:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Calculate total chunk count across all indexed papers
  const totalChunks = filteredPapers.reduce((sum, p) => sum + p.chunks.length, 0);

  // Send message to RAG server with clinical perspective injection
  const handleSendMessage = async (queryText: string, image?: AttachedImage) => {
    const userMessageId = `msg-${Date.now()}`;
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: queryText,
      timestamp: Date.now(),
      attachedImage: image,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/rag/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          image,
          provider,
          ollamaConfig: {
            endpoint: ollamaSettings.endpoint,
            model: ollamaSettings.selectedModel,
          },
          settings: {
            topK: ragSettings.topK,
            similarityThreshold: ragSettings.similarityThreshold,
            filterModality: ragSettings.filterModality,
            temperature: ragSettings.temperature,
          },
          customPapers: filteredPapers.length > 0 ? filteredPapers : papers,
          perspectiveDirective: currentUser?.perspectiveCustomInstructions || '',
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: data.answer,
        timestamp: Date.now(),
        citations: data.citations || [],
        retrievedChunks: data.retrievedChunks || [],
        modelUsed: data.modelUsed || (provider === 'gemini' ? 'Gemini 2.5 Flash' : ollamaSettings.selectedModel),
        queryLatencyMs: data.latencyMs,
      };

      setMessages((prev) => {
        const updated = [...prev, assistantMessage];
        if (currentUser?.uid) {
          saveChatSessionToFirestore(currentUser.uid, {
            id: `session-${currentUser.uid}`,
            title: queryText.slice(0, 40),
            perspectiveId: currentUser.perspectiveId,
            messages: updated,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }).catch((e) => console.warn('Could not persist chat session:', e));
        }
        return updated;
      });
    } catch (err: unknown) {
      console.error('Chat error:', err);
      const errMsg = err instanceof Error ? err.message : 'Unknown error';
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `⚠️ Retrieval request encountered an issue:\n\n${errMsg}\n\nPlease verify network connection or toggle to Gemini 2.5 Flash.`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add custom paper to session state, localStorage, and notify
  const handleAddCustomPaper = (newPaper: VitalSignPaper) => {
    setSessionPapers((prev) => {
      const updated = [newPaper, ...prev.filter((p) => p.id !== newPaper.id)];
      try {
        localStorage.setItem(`scholarflow_session_docs_${sessionId}`, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to store session papers in localStorage:', e);
      }
      return updated;
    });
    setUploadNotification(`Document "${newPaper.title}" successfully indexed into Session "${sessionId}" with ${newPaper.chunks.length} chunks!`);
    setTimeout(() => {
      setUploadNotification(null);
    }, 7000);
  };

  const handleDeletePaper = (paperId: string) => {
    setSessionPapers((prev) => {
      const updated = prev.filter((p) => p.id !== paperId);
      try {
        localStorage.setItem(`scholarflow_session_docs_${sessionId}`, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setUploadNotification('Paper removed from active session.');
    setTimeout(() => setUploadNotification(null), 3000);
  };

  const handleClearAllPapers = () => {
    setSessionPapers([]);
    setIncludeSampleCorpus(false);
    try {
      localStorage.removeItem(`scholarflow_session_docs_${sessionId}`);
    } catch {}
    setUploadNotification('Session library cleared.');
    setTimeout(() => setUploadNotification(null), 3000);
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  // Save citation to Firestore & local notebook
  const handleSaveCitation = async (citeData: {
    paperId: string;
    paperTitle: string;
    authors: string;
    year: number;
    quoteSnippet: string;
    section: string;
    page?: number;
    equationSnippet?: string;
  }) => {
    if (!currentUser?.uid) return;

    try {
      const saved = await saveCitationToFirestore(currentUser.uid, {
        ...citeData,
        relevanceScore: 0.96,
      });
      setSavedCitations((prev) => [saved, ...prev.filter(c => c.id !== saved.id)]);
      setUploadNotification(`Citation from "${citeData.paperTitle}" bookmarked to your Notebook.`);
      setTimeout(() => setUploadNotification(null), 4000);
    } catch (err) {
      console.error('Failed to save citation:', err);
    }
  };

  // Delete citation from notebook
  const handleDeleteCitation = async (citationId: string) => {
    if (!currentUser?.uid) return;

    try {
      await deleteCitationFromFirestore(currentUser.uid, citationId);
      setSavedCitations((prev) => prev.filter(c => c.id !== citationId));
    } catch (err) {
      console.error('Failed to delete citation:', err);
    }
  };

  // Save profile updates
  const handleSaveProfile = async (updated: Partial<UserProfile>) => {
    if (!currentUser) return;
    const merged: UserProfile = {
      ...currentUser,
      ...updated,
      lastActive: new Date().toISOString(),
    };

    setCurrentUser(merged);
    await updateUserProfileInFirestore(currentUser.uid, updated);
  };

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (e) {
      console.warn('SignOut error:', e);
    }
    localStorage.removeItem('vitalpulse_active_user_uid');
    localStorage.removeItem('scholarflow_active_user_uid');
    localStorage.removeItem('scholarflow_user_profile');
    
    setCurrentUser(null);
    setSavedCitations([]);
    setMessages([]);
    // Retain peer-reviewed sample corpus so guest scholar can continue researching
    setIncludeSampleCorpus(true);

    const freshSession = `session-${Math.random().toString(36).substring(2, 9)}`;
    setSessionId(freshSession);
    localStorage.setItem('scholarflow_session_id', freshSession);
    setSessionPapers([]);

    setUploadNotification('Signed out. Switched to public Guest Scholar session.');
    setTimeout(() => setUploadNotification(null), 4000);
  };

  // Global search submission
  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;
    setActiveTab('chat');
    handleSendMessage(query);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-teal-100 selection:text-teal-900 overflow-hidden transition-colors">
      {/* Toast Notification */}
      {uploadNotification && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-teal-500/50 flex items-start space-x-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
            ✓
          </div>
          <div className="flex-1 text-xs space-y-1">
            <p className="font-bold text-teal-300">Scholar Intelligence Update</p>
            <p className="text-slate-200 leading-relaxed">{uploadNotification}</p>
          </div>
          <button
            type="button"
            onClick={() => setUploadNotification(null)}
            className="text-slate-400 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Left Sidebar Navigation matching Image 1 */}
      {activeInterface === 'user' && (
        <LeftSidebar
          activeTab={activeTab}
          setActiveTab={(t) => {
            if (t === 'notebook') {
              setIsCitationsDrawerOpen(true);
            } else {
              setActiveTab(t);
            }
          }}
          paperCount={filteredPapers.length}
          onOpenUpgradeModal={() => setIsAuthModalOpen(true)}
          onOpenSplashScreen={() => setIsSplashScreenOpen(true)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header matching Image 1 */}
        <TopHeader
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenNotebook={() => setIsCitationsDrawerOpen(true)}
          onOpenExport={() => setActiveTab('export')}
          onOpenSettings={() => setActiveTab('profile-settings')}
          onOpenSplashScreen={() => setIsSplashScreenOpen(true)}
          currentUser={currentUser}
          onOpenAuth={(tab = 'signin') => {
            setAuthModalTab(tab);
            setIsAuthModalOpen(true);
          }}
          onSignOut={handleSignOut}
          savedCitationCount={savedCitations.length}
          activeInterface={activeInterface}
          setActiveInterface={setActiveInterface}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          onOpenAdminAuth={() => setIsAdminSecurityModalOpen(true)}
        />

        {/* Dynamic Main Workspace Area */}
        <main className="flex-1 flex overflow-hidden">
          {activeInterface === 'admin' ? (
            isAdmin ? (
              <AdminPortal
                currentUser={currentUser}
                sessionId={sessionId}
                papers={papers}
                totalChunks={totalChunks}
                ragSettings={ragSettings}
                setRagSettings={setRagSettings}
                onSwitchToUserWorkspace={() => setActiveInterface('user')}
                onOpenUploadModal={() => setIsUploadModalOpen(true)}
              />
            ) : (
              <AdminGatekeeper
                currentUser={currentUser}
                onReturnToUserWorkspace={() => setActiveInterface('user')}
                onAdminAuthenticated={() => {
                  // Admin access unlocked
                  setActiveInterface('admin');
                }}
              />
            )
          ) : (
            <>
              {/* Home Dashboard matching Screenshot 1 */}
              {activeTab === 'home' && (
                <HomeDashboard
                  onNavigateTab={(t) => setActiveTab(t)}
                  onSendQuestion={(q) => {
                    setActiveTab('chat');
                    handleSendMessage(q);
                  }}
                  onOpenUpload={() => setActiveTab('upload')}
                  onLoadSampleCorpus={() => {
                    setIncludeSampleCorpus(true);
                    setUploadNotification('Loaded peer-reviewed research library (25 papers indexed)');
                    setTimeout(() => setUploadNotification(null), 4000);
                  }}
                  onOpenDomainManager={() => setIsDomainManagerOpen(true)}
                  paperCount={filteredPapers.length}
                  corpusCount={filteredPapers.length}
                  activeDomain={activeDomain}
                  setActiveDomain={setActiveDomain}
                  sessionId={sessionId}
                />
              )}

              {/* Scholar Chat matching Screenshot 2 Panel 6 */}
              {activeTab === 'chat' && (
                <ChatInterface
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  provider={provider}
                  ragSettings={ragSettings}
                  ollamaSettings={ollamaSettings}
                  onClearHistory={handleClearHistory}
                  currentUser={currentUser}
                  onSaveCitation={handleSaveCitation}
                  savedCitationIds={savedCitations.map(c => c.id)}
                  onOpenPerspectiveModal={() => setIsPerspectiveModalOpen(true)}
                  sessionId={sessionId}
                  paperCount={filteredPapers.length}
                  onOpenUpload={() => setActiveTab('upload')}
                  onLoadSampleCorpus={() => setIncludeSampleCorpus(true)}
                />
              )}

              {/* Upload & Manage Papers matching Screenshot 2 Panel 5 */}
              {activeTab === 'upload' && (
                <UploadManagePage
                  papers={filteredPapers}
                  onOpenUploadModal={() => setIsUploadModalOpen(true)}
                  onLoadSampleCorpus={() => {
                    setIncludeSampleCorpus(true);
                    setUploadNotification('Peer-reviewed library loaded.');
                    setTimeout(() => setUploadNotification(null), 3000);
                  }}
                  onDeletePaper={handleDeletePaper}
                  onClearAllPapers={handleClearAllPapers}
                  onViewPaper={(p) => {
                    setActiveTab('corpus');
                  }}
                />
              )}

              {/* Literature Review & Matrix matching Screenshot 2 Panel 7 */}
              {activeTab === 'literature' && (
                <LiteratureReviewGenerator
                  papers={filteredPapers}
                  onOpenUpload={() => setIsUploadModalOpen(true)}
                  onSendToChat={(query) => {
                    setActiveTab('chat');
                    handleSendMessage(query);
                  }}
                />
              )}

              {/* Research Corpus Explorer */}
              {activeTab === 'corpus' && (
                <CorpusExplorer
                  papers={filteredPapers}
                  onAddCustomPaper={handleAddCustomPaper}
                  onOpenUploadModal={() => setIsUploadModalOpen(true)}
                  sessionId={sessionId}
                  onLoadSampleCorpus={() => setIncludeSampleCorpus(true)}
                  onSelectPaperForChat={(paper) => {
                    setActiveTab('chat');
                    handleSendMessage(`Summarize the methodology, theoretical framework, and main findings of the paper: "${paper.title}"`);
                  }}
                  onSaveCitation={handleSaveCitation}
                />
              )}

              {/* Biomedical & Signal Lab matching Screenshot 2 Panel 8 */}
              {activeTab === 'workbench' && (
                <SignalWorkbench
                  onSendToChat={(query) => {
                    setActiveTab('chat');
                    handleSendMessage(query);
                  }}
                />
              )}

              {/* Benchmarks & Metrics */}
              {activeTab === 'benchmark' && <BenchmarkMatrix />}

              {/* Streamlit / LaTeX Export matching Screenshot 2 Panel 9 */}
              {activeTab === 'export' && <SubmissionExporter />}

              {/* RAG Configuration Settings */}
              {activeTab === 'settings' && (
                <SettingsView
                  provider={provider}
                  setProvider={setProvider}
                  ragSettings={ragSettings}
                  setRagSettings={setRagSettings}
                  ollamaSettings={ollamaSettings}
                  setOllamaSettings={setOllamaSettings}
                />
              )}

              {/* Research Projects Manager */}
              {activeTab === 'projects' && (
                <ProjectsPage
                  onNavigateTab={(t) => setActiveTab(t)}
                  onSetDomain={(d) => setActiveDomain(d)}
                />
              )}

              {/* Settings & Profile matching Screenshot 2 Panel 10 */}
              {activeTab === 'profile-settings' && (
                <SettingsProfilePage
                  currentUser={currentUser}
                  onUpdateProfile={handleSaveProfile}
                  ragSettings={ragSettings}
                  setRagSettings={setRagSettings}
                  provider={provider}
                  setProvider={setProvider}
                  ollamaSettings={ollamaSettings}
                  setOllamaSettings={setOllamaSettings}
                />
              )}

              {/* Full Landing Page Showcase matching Screenshot 2 Panel 1 */}
              {activeTab === 'landing' && (
                <LandingPage
                  onGetStarted={() => setActiveTab('home')}
                  onOpenDemo={() => setIsSplashScreenOpen(true)}
                  onOpenAdmin={() => setActiveInterface('admin')}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Research Domain Topic Manager Modal (Dynamic feature adjustment) */}
      <DomainManagerModal
        isOpen={isDomainManagerOpen}
        onClose={() => setIsDomainManagerOpen(false)}
        activeDomain={activeDomain}
        setActiveDomain={setActiveDomain}
        selectedDomains={selectedDomains}
        setSelectedDomains={setSelectedDomains}
      />

      {/* Document Upload & Ingestion Modal */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onPaperIndexed={handleAddCustomPaper}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
        onAuthSuccess={(profile) => {
          setCurrentUser(profile);
          try {
            localStorage.setItem('scholarflow_user_profile', JSON.stringify(profile));
          } catch {}
          loadUserCitationsFromFirestore(profile.uid).then(setSavedCitations);
        }}
      />

      {/* Splash Screen matching Screenshot 3 */}
      <SplashScreen
        isOpen={isSplashScreenOpen}
        onClose={() => setIsSplashScreenOpen(false)}
        onOpenAuth={(tab) => {
          setAuthModalTab(tab || 'signin');
          setIsAuthModalOpen(true);
        }}
        onOpenUserWorkspace={() => {
          setActiveInterface('user');
          setActiveTab('home');
        }}
        onOpenAdminPortal={() => setActiveInterface('admin')}
        currentUser={currentUser}
      />

      {/* Perspective Tuning Modal */}
      {currentUser && (
        <PerspectiveSettingsModal
          isOpen={isPerspectiveModalOpen}
          onClose={() => setIsPerspectiveModalOpen(false)}
          currentUser={currentUser}
          onSaveProfile={handleSaveProfile}
        />
      )}

      {/* Personal Evidence & Notebook Drawer */}
      <SavedCitationsDrawer
        isOpen={isCitationsDrawerOpen}
        onClose={() => setIsCitationsDrawerOpen(false)}
        citations={savedCitations}
        onDeleteCitation={handleDeleteCitation}
        onCiteInChat={(c) => {
          setActiveTab('chat');
          handleSendMessage(`Analyze the research evidence from: "${c.paperTitle}" regarding: "${c.quoteSnippet}"`);
        }}
      />

      {/* Admin Security Authorization Passkey Modal */}
      <AdminSecurityModal
        isOpen={isAdminSecurityModalOpen}
        onClose={() => setIsAdminSecurityModalOpen(false)}
        currentUser={currentUser}
        onSuccess={() => {
          setIsAdminSecurityModalOpen(false);
          setActiveInterface('admin');
        }}
      />
    </div>
  );
};

export default App;
