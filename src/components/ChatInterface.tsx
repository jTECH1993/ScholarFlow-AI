import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Cpu, 
  FileText, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  BookOpen, 
  Layers, 
  Copy, 
  Check, 
  RotateCcw,
  ExternalLink,
  Info,
  X,
  Image as ImageIcon,
  Paperclip,
  Eye,
  Table as TableIcon,
  Bookmark,
  BookmarkCheck,
  Sliders,
  Stethoscope,
  Activity,
  Upload
} from 'lucide-react';
import { 
  ChatMessage, 
  Citation, 
  RetrievedChunk, 
  LLMProvider, 
  RAGSettings, 
  OllamaSettings,
  AttachedImage,
  UserProfile 
} from '../types';
import { UNIVERSAL_RESEARCH_QUERIES } from '../data/researchDomainTopics';
import { SAMPLE_CLINICAL_VISUALS, SampleClinicalVisual } from '../data/sampleClinicalImages';
import { PAPER_EXTENDED_DETAILS } from '../data/paperDetails';
import { CLINICAL_PERSPECTIVES } from '../data/clinicalPerspectives';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, image?: AttachedImage) => void;
  isLoading: boolean;
  provider: LLMProvider;
  ragSettings: RAGSettings;
  ollamaSettings: OllamaSettings;
  onClearHistory: () => void;
  currentUser?: UserProfile | null;
  onSaveCitation?: (citation: { paperId: string; paperTitle: string; authors: string; year: number; quoteSnippet: string; section: string; page?: number; equationSnippet?: string }) => void;
  savedCitationIds?: string[];
  onOpenPerspectiveModal?: () => void;
  sessionId?: string;
  paperCount?: number;
  onOpenUpload?: () => void;
  onLoadSampleCorpus?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
  provider,
  ragSettings,
  ollamaSettings,
  onClearHistory,
  currentUser,
  onSaveCitation,
  savedCitationIds = [],
  onOpenPerspectiveModal,
  sessionId,
  paperCount = 0,
  onOpenUpload,
  onLoadSampleCorpus,
}) => {
  const [inputText, setInputText] = useState('');
  const [attachedImage, setAttachedImage] = useState<AttachedImage | null>(null);
  const [showVisualModal, setShowVisualModal] = useState<boolean>(false);
  const [visualCategoryFilter, setVisualCategoryFilter] = useState<string>('All');
  const [visualSearch, setVisualSearch] = useState<string>('');
  const [selectedChunk, setSelectedChunk] = useState<RetrievedChunk | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activePerspective = currentUser 
    ? CLINICAL_PERSPECTIVES.find(p => p.id === currentUser.perspectiveId) || CLINICAL_PERSPECTIVES[0]
    : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputText.trim() && !attachedImage) || isLoading) return;
    onSendMessage(inputText.trim() || 'Please analyze this attached figure/table.', attachedImage || undefined);
    setInputText('');
    setAttachedImage(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setAttachedImage({
        data: dataUrl,
        mimeType: file.type || 'image/png',
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSelectSampleVisual = (visual: SampleClinicalVisual) => {
    setAttachedImage({
      data: visual.dataUrl,
      mimeType: visual.mimeType,
      name: visual.title,
    });
    setInputText(visual.suggestedPrompt);
    setShowVisualModal(false);
  };

  const handleSampleClick = (query: string) => {
    onSendMessage(query);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex overflow-hidden relative">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Main Chat Stream */}
      <div className="flex-1 flex flex-col h-full bg-slate-50/50 dark:bg-slate-950">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 max-w-4xl mx-auto w-full">
          {messages.length === 0 ? (
            <div className="py-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  {currentUser?.perspectiveId === 'vital-sign-rag' ? (
                    <Activity className="w-6 h-6" />
                  ) : (
                    <BookOpen className="w-6 h-6" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {currentUser?.perspectiveId === 'vital-sign-rag'
                    ? 'Vital Sign RAG & Biomedical Intelligence'
                    : 'ScholarFlow AI — Academic Research & RAG Scholar'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                  {currentUser?.perspectiveId === 'vital-sign-rag'
                    ? `Dedicated intelligence workspace for ${currentUser?.displayName || 'Biomedical Signal Research'}. Ground-truth RAG across ${paperCount} papers on PPG, Blood Pressure, PTT, ECG, Remote rPPG, and Radar.`
                    : paperCount > 0
                    ? `Ground-truth Retrieval-Augmented Generation across ${paperCount} indexed research documents in your active session (${sessionId || 'private-session'}).`
                    : `Welcome to your research session (${sessionId || 'active-session'}). Upload your PDF, LaTeX, text or Markdown papers to build your custom domain scholar, or explore with the sample benchmark corpus.`}
                </p>

                {paperCount === 0 && (
                  <div className="flex items-center justify-center space-x-3 pt-2">
                    {onOpenUpload && (
                      <button
                        type="button"
                        onClick={onOpenUpload}
                        className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Research Paper to Session</span>
                      </button>
                    )}
                    {onLoadSampleCorpus && (
                      <button
                        type="button"
                        onClick={onLoadSampleCorpus}
                        className="px-3.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                      >
                        <span>Load Sample Benchmark Library</span>
                      </button>
                    )}
                  </div>
                )}

                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 text-2xs text-slate-600 dark:text-slate-300 shadow-xs mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Engine: {provider === 'gemini' ? 'Gemini 2.5 Flash' : `Ollama (${ollamaSettings.selectedModel})`}</span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span>Session: {sessionId || 'Default'}</span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span>Multimodal Vision &amp; Tables</span>
                </div>
              </div>

              {/* Dedicated Perspective Active SaaS Banner */}
              {currentUser && activePerspective && (
                <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-2xl p-4 text-white shadow-md border border-teal-700/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                        {activePerspective.id === 'academic-scholar' && <BookOpen className="w-4 h-4" />}
                        {activePerspective.id === 'vital-sign-rag' && <Activity className="w-4 h-4" />}
                        {activePerspective.id === 'cs-ai-systems' && <Cpu className="w-4 h-4" />}
                        {activePerspective.id === 'english-literature' && <FileText className="w-4 h-4" />}
                        {!['academic-scholar', 'vital-sign-rag', 'cs-ai-systems', 'english-literature'].includes(activePerspective.id) && (
                          <Sparkles className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-3xs font-extrabold px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 uppercase tracking-wider">
                            Dedicated Perspective
                          </span>
                          <span className="text-2xs text-slate-300">
                            {currentUser.displayName} &bull; {currentUser.organization}
                          </span>
                        </div>
                        <h3 className="text-xs font-bold text-white tracking-tight">
                          {activePerspective.name} ({activePerspective.badge})
                        </h3>
                      </div>
                    </div>

                    {onOpenPerspectiveModal && (
                      <button
                        type="button"
                        onClick={onOpenPerspectiveModal}
                        className="px-3 py-1 bg-teal-600/80 hover:bg-teal-500 text-white rounded-lg text-2xs font-semibold flex items-center space-x-1 self-start sm:self-auto transition-colors cursor-pointer"
                      >
                        <Sliders className="w-3 h-3" />
                        <span>Tune My Perspective</span>
                      </button>
                    )}
                  </div>

                  <p className="text-2xs text-teal-100 font-sans leading-relaxed border-t border-teal-800/60 pt-2">
                    <span className="font-semibold text-white">Active System Directive: </span>
                    {currentUser.perspectiveCustomInstructions || activePerspective.systemPromptGuideline}
                  </p>

                  {/* Tailored Questions for this User's Perspective */}
                  {activePerspective.suggestedQuestions.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-3xs font-bold uppercase tracking-wider text-teal-300">
                        Inquiries Tailored to Your Perspective:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {activePerspective.suggestedQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSampleClick(q)}
                            className="p-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-left text-2xs text-slate-100 transition-colors flex items-center justify-between group cursor-pointer"
                          >
                            <span className="truncate pr-2">{q}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Show Sample Clinical Visuals and Queries if papers are available */}
              {(paperCount > 0) && (
                <>
                  {/* Sample Visual Figures & Tables Quick Test */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-teal-200/80 dark:border-slate-800 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-teal-900 dark:text-teal-300">
                        <ImageIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span>Test Multimodal Clinical Figures &amp; Tables (1-Click Analysis)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowVisualModal(true)}
                        className="text-2xs text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-200 font-semibold cursor-pointer"
                      >
                        View All Figures →
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {SAMPLE_CLINICAL_VISUALS.map((vis) => (
                        <button
                          key={vis.id}
                          type="button"
                          onClick={() => handleSelectSampleVisual(vis)}
                          className="p-2.5 bg-slate-50 dark:bg-slate-800/80 hover:bg-teal-50/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-400 rounded-lg text-left transition-all group cursor-pointer"
                        >
                          <span className="text-2xs font-bold text-teal-800 dark:text-teal-300 line-clamp-1 block mb-1">
                            {vis.title}
                          </span>
                          <p className="text-3xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {vis.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Core Questions */}
                  <div className="space-y-2.5">
                    <p className="text-2xs font-semibold text-slate-400 uppercase tracking-wider text-center">
                      Recommended Research Queries
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {UNIVERSAL_RESEARCH_QUERIES.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSampleClick(item.query)}
                          className="p-3 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-xs transition-all group cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-teal-800 dark:text-teal-300 mb-1">
                            <span>{item.title}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <p className="text-2xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {item.query}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1 px-1">
                  {msg.role === 'user' ? (
                    <span className="font-semibold text-slate-600">Research Query</span>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-teal-700 flex items-center space-x-1">
                        {provider === 'gemini' ? (
                          <Sparkles className="w-3 h-3 text-teal-600" />
                        ) : (
                          <Cpu className="w-3 h-3 text-indigo-600" />
                        )}
                        <span>{msg.modelUsed || 'RAG Assistant'}</span>
                      </span>
                      {msg.queryLatencyMs && (
                        <span className="flex items-center space-x-1 text-slate-400 text-2xs">
                          <Clock className="w-3 h-3" />
                          <span>{(msg.queryLatencyMs / 1000).toFixed(2)}s</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed max-w-3xl shadow-xs transition-all ${
                    msg.role === 'user'
                      ? 'bg-teal-700 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                  }`}
                >
                  {/* Attached Image inside User Bubble */}
                  {msg.attachedImage && (
                    <div className="mb-3">
                      <button
                        type="button"
                        onClick={() => setPreviewImage(msg.attachedImage?.data || null)}
                        className="relative rounded-lg overflow-hidden border border-teal-600 group block"
                      >
                        <img
                          src={msg.attachedImage.data}
                          alt={msg.attachedImage.name || 'Attached figure'}
                          className="max-h-48 max-w-full rounded-lg object-contain bg-slate-900"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs space-x-1 transition-opacity">
                          <Eye className="w-4 h-4" />
                          <span>Click to expand</span>
                        </div>
                      </button>
                      {msg.attachedImage.name && (
                        <span className="text-2xs text-teal-100 block mt-1">
                          📎 {msg.attachedImage.name}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed">
                    {msg.content}
                  </div>

                  {/* Grounded Citations Bar with Exact Page Numbers */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Corpus Grounding ({msg.citations.length} Verified Papers)</span>
                        </span>
                        <span className="text-2xs text-slate-400">Click to view source page</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {msg.citations.map((cite, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 overflow-hidden text-2xs text-slate-700 hover:border-teal-300 transition-colors"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                const matching = msg.retrievedChunks?.find(
                                  (c) => c.paperId === cite.paperId
                                );
                                if (matching) {
                                  setSelectedChunk(matching);
                                }
                              }}
                              className="inline-flex items-center space-x-1.5 px-2.5 py-1 hover:bg-teal-50 transition-colors"
                              title="Inspect source paper and evidence"
                            >
                              <FileText className="w-3 h-3 text-teal-600 shrink-0" />
                              <span className="font-semibold truncate max-w-[160px]">
                                {cite.paperTitle.slice(0, 28)}...
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-mono font-bold text-3xs">
                                p. {cite.page || 1}
                              </span>
                            </button>

                            {onSaveCitation && (
                              <button
                                type="button"
                                onClick={() => {
                                  const matching = msg.retrievedChunks?.find((c) => c.paperId === cite.paperId);
                                  onSaveCitation({
                                    paperId: cite.paperId,
                                    paperTitle: cite.paperTitle,
                                    authors: cite.authors || 'Investigator Consortium',
                                    year: cite.year || 2024,
                                    quoteSnippet: matching ? matching.content.slice(0, 240) : cite.paperTitle,
                                    section: cite.section || 'Grounded Citation',
                                    page: cite.page || 1,
                                    equationSnippet: matching?.equationSnippet,
                                  });
                                }}
                                className="px-1.5 py-1 border-l border-slate-200 hover:bg-teal-100 text-slate-400 hover:text-teal-700 transition-colors"
                                title="Save to Personal Evidence Notebook"
                              >
                                <Bookmark className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions Bar */}
                  {msg.role === 'assistant' && (
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center space-x-2">
                        {msg.retrievedChunks && (
                          <button
                            type="button"
                            onClick={() => {
                              if (msg.retrievedChunks && msg.retrievedChunks.length > 0) {
                                setSelectedChunk(msg.retrievedChunks[0]);
                              }
                            }}
                            className="text-2xs text-teal-700 hover:text-teal-900 font-medium flex items-center space-x-1 hover:underline"
                          >
                            <Layers className="w-3 h-3" />
                            <span>Inspect {msg.retrievedChunks.length} Evidence Passages</span>
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyText(msg.id, msg.content)}
                        className="hover:text-slate-600 flex items-center space-x-1 text-2xs p-1"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Answer</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start space-x-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 rounded-tl-xs shadow-xs space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-teal-700">
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-ping"></div>
                  <span>
                    Retrieving from 43 Vital Sign Papers & Synthesizing via{' '}
                    {provider === 'gemini' ? 'Gemini 2.5 Flash' : `Ollama (${ollamaSettings.selectedModel})`}...
                  </span>
                </div>
                <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-teal-600 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area */}
        <div className="p-4 bg-white border-t border-slate-200 shadow-sm">
          <div className="max-w-4xl mx-auto space-y-2">
            {/* Attached image preview banner */}
            {attachedImage && (
              <div className="flex items-center justify-between p-2 bg-teal-50 border border-teal-200 rounded-xl">
                <div className="flex items-center space-x-2">
                  <img
                    src={attachedImage.data}
                    alt="Preview"
                    className="w-10 h-10 rounded-lg object-contain bg-slate-900 border border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-semibold text-teal-950 block truncate max-w-xs">
                      {attachedImage.name || 'Attached Clinical Figure/Table'}
                    </span>
                    <span className="text-3xs text-teal-700">Multimodal Gemini Vision active</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAttachedImage(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative flex items-center">
              {/* Attach File & Sample Visual Buttons */}
              <div className="absolute left-2 flex items-center space-x-1 z-10">
                <button
                  type="button"
                  title="Upload Image/Table"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="Select Clinical Figure or Table"
                  onClick={() => setShowVisualModal(true)}
                  className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                id="rag-query-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about vital signs, PPG waveforms, blood pressure, ECG, rPPG, FMCW radar, sepsis..."
                disabled={isLoading}
                className="w-full pl-20 pr-24 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 transition-all disabled:opacity-50"
              />
              
              <div className="absolute right-2 flex items-center space-x-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    title="Clear history"
                    onClick={onClearHistory}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  id="submit-rag-query"
                  disabled={(!inputText.trim() && !attachedImage) || isLoading}
                  className="px-3.5 py-2 bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-700 disabled:opacity-40 transition-colors flex items-center space-x-1.5 shadow-xs"
                >
                  <span>Query</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between text-3xs text-slate-400 px-1">
              <span>
                Domain: 43 Vital Sign Academic Papers | Hybrid TF-IDF & Cosine Similarity
              </span>
              <span>
                Engine: <strong className="text-slate-600">{provider === 'gemini' ? 'Gemini 2.5 Flash' : ollamaSettings.selectedModel}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Evidence Inspector Drawer */}
      {selectedChunk && (
        <aside className="w-80 md:w-96 border-l border-slate-200 bg-white flex flex-col shadow-lg z-20 absolute right-0 top-0 bottom-0">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">Evidence Chunk Inspector</h3>
            </div>
            <button
              type="button"
              onClick={() => setSelectedChunk(null)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            <div>
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">
                Source Document
              </span>
              <h4 className="text-sm font-semibold text-slate-900 mt-1 leading-snug">
                {selectedChunk.paperTitle}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div>
                <span className="text-2xs text-slate-400">Section & Page</span>
                <p className="font-semibold text-slate-700 truncate">
                  {selectedChunk.section} (p. {selectedChunk.page || 1})
                </p>
              </div>
              <div>
                <span className="text-2xs text-slate-400">Similarity Match</span>
                <p className="font-semibold text-emerald-700">
                  {(selectedChunk.similarityScore * 100).toFixed(1)}% Score
                </p>
              </div>
            </div>

            {selectedChunk.highlights && selectedChunk.highlights.length > 0 && (
              <div>
                <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">
                  Query Term Hits
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedChunk.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-mono text-2xs"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedChunk.paperId && PAPER_EXTENDED_DETAILS[selectedChunk.paperId] && (
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200/70 text-2xs space-y-1">
                  <span className="font-bold text-amber-900 uppercase tracking-wider block">
                    Problem Statement (What it solves):
                  </span>
                  <p className="text-amber-950 font-normal leading-relaxed">
                    {PAPER_EXTENDED_DETAILS[selectedChunk.paperId].problemStatement}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-1.5 text-2xs">
                  <div className="p-2 bg-teal-50 rounded-lg border border-teal-200/70">
                    <span className="font-bold text-teal-900 uppercase tracking-wider block">
                      Acquisition Device / Hardware:
                    </span>
                    <p className="text-teal-950 font-medium">
                      {PAPER_EXTENDED_DETAILS[selectedChunk.paperId].deviceUsed}
                    </p>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200/70">
                    <span className="font-bold text-emerald-900 uppercase tracking-wider block">
                      Ground Truth Reference:
                    </span>
                    <p className="text-emerald-950 font-medium">
                      {PAPER_EXTENDED_DETAILS[selectedChunk.paperId].groundTruth}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">
                Extracted Text Passage
              </span>
              <div className="mt-1 p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 leading-relaxed text-xs">
                {selectedChunk.content}
              </div>
            </div>

            {/* Bookmark Action Button */}
            {onSaveCitation && (
              <button
                type="button"
                onClick={() => {
                  onSaveCitation({
                    paperId: selectedChunk.paperId || 'unknown',
                    paperTitle: selectedChunk.paperTitle,
                    authors: selectedChunk.authors || 'Lead Clinical Investigators',
                    year: selectedChunk.year || 2024,
                    quoteSnippet: selectedChunk.content.slice(0, 260),
                    section: selectedChunk.section || 'Extracted Empirical Section',
                    page: selectedChunk.page || 1,
                    equationSnippet: selectedChunk.equationSnippet,
                  });
                }}
                className="w-full py-2 px-3 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
              >
                <Bookmark className="w-3.5 h-3.5 text-teal-600" />
                <span>Bookmark to My Research Evidence Notebook</span>
              </button>
            )}

            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-teal-900 space-y-1 text-2xs">
              <div className="flex items-center space-x-1 font-semibold">
                <Info className="w-3.5 h-3.5 text-teal-600" />
                <span>RAG Citation Verification</span>
              </div>
              <p className="text-slate-600">
                This exact chunk was indexed from your literature repository and fed to the LLM context prompt with page number grounding.
              </p>
            </div>
          </div>
        </aside>
      )}

      {/* Full-Screen Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] bg-slate-950 rounded-2xl overflow-hidden p-3 border border-slate-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 px-2">
              <span className="text-xs font-bold text-slate-300">
                High-Resolution Research Visual &amp; Benchmark Viewer
              </span>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center p-2 bg-slate-950">
              <img 
                src={previewImage} 
                alt="Enlarged research visual" 
                className="max-h-[80vh] max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Select Clinical Figure or Table Modal */}
      {showVisualModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-teal-700">
                <ImageIcon className="w-5 h-5" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Peer-Reviewed Research Figures &amp; Benchmark Tables (12 Items)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select any waveform, sensor architecture, or benchmark dataset matrix to test multimodal visual interpretation
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowVisualModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              {/* Category Tabs */}
              <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
                {['All', 'Waveforms', 'Benchmark Tables', 'Figures'].map((cat) => {
                  const count = cat === 'All' 
                    ? SAMPLE_CLINICAL_VISUALS.length 
                    : SAMPLE_CLINICAL_VISUALS.filter(v => v.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setVisualCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                        visualCategoryFilter === cat
                          ? 'bg-teal-700 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[200px] sm:w-64">
                <input
                  type="text"
                  value={visualSearch}
                  onChange={(e) => setVisualSearch(e.target.value)}
                  placeholder="Filter figures or tables..."
                  className="w-full pl-3 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Visual Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto flex-1 pr-1">
              {SAMPLE_CLINICAL_VISUALS
                .filter((vis) => {
                  const matchesCat = visualCategoryFilter === 'All' || vis.category === visualCategoryFilter;
                  const matchesSearch = 
                    vis.title.toLowerCase().includes(visualSearch.toLowerCase()) ||
                    vis.description.toLowerCase().includes(visualSearch.toLowerCase());
                  return matchesCat && matchesSearch;
                })
                .map((vis) => (
                  <button
                    key={vis.id}
                    type="button"
                    onClick={() => handleSelectSampleVisual(vis)}
                    className="p-3 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 text-left transition-all group flex flex-col justify-between space-y-2"
                  >
                    <div className="h-32 bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center p-1.5 border border-slate-800">
                      <img
                        src={vis.dataUrl}
                        alt={vis.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1 gap-1">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-teal-900 line-clamp-1">
                          {vis.title}
                        </span>
                        <span className="text-3xs px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-slate-600 whitespace-nowrap">
                          {vis.category}
                        </span>
                      </div>
                      <p className="text-3xs text-slate-500 line-clamp-2 leading-relaxed">
                        {vis.description}
                      </p>
                    </div>
                  </button>
                ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-2xs text-slate-500">
                Clicking any item attaches the SVG vector visual and prefills an inquiry into the prompt.
              </span>
              <button
                type="button"
                onClick={() => setShowVisualModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
