import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Copy, 
  Check, 
  Quote, 
  Cpu, 
  Target, 
  AlertTriangle, 
  TrendingUp, 
  ExternalLink, 
  FileText, 
  Sparkles,
  MessageSquare,
  Bookmark,
  Layers,
  Calendar,
  User,
  Building
} from 'lucide-react';
import { VitalSignPaper } from '../types';

interface PaperDossierModalProps {
  paper: VitalSignPaper | null;
  isOpen: boolean;
  onClose: () => void;
  onSendToChat?: (query: string) => void;
  onSaveCitation?: (citeData: {
    paperId: string;
    paperTitle: string;
    authors: string;
    year: number;
    quoteSnippet: string;
    section: string;
    page?: number;
  }) => void;
}

export const PaperDossierModal: React.FC<PaperDossierModalProps> = ({
  paper,
  isOpen,
  onClose,
  onSendToChat,
  onSaveCitation
}) => {
  const [citationFormat, setCitationFormat] = useState<'APA' | 'IEEE' | 'BibTeX' | 'Chicago'>('APA');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'extraction' | 'lit-review' | 'chunks'>('extraction');

  if (!isOpen || !paper) return null;

  const handleCopy = (text: string, typeKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(typeKey);
    setTimeout(() => setCopiedType(null), 2500);
  };

  // Generate Academic Citations
  const getFormattedCitation = () => {
    switch (citationFormat) {
      case 'APA':
        return `${paper.authors} (${paper.year}). ${paper.title}. ${paper.venue}.`;
      case 'IEEE':
        return `[1] ${paper.authors}, "${paper.title}," ${paper.venue}, ${paper.year}.`;
      case 'BibTeX': {
        const citeKey = `${paper.authors.split(' ')[0].replace(/[^a-zA-Z]/g, '').toLowerCase()}${paper.year}${paper.id.replace(/[^a-zA-Z0-9]/g, '')}`;
        return `@article{${citeKey},
  author = {${paper.authors}},
  title = {${paper.title}},
  journal = {${paper.venue}},
  year = {${paper.year}},
  note = {Modality: ${paper.modality}}
}`;
      }
      case 'Chicago':
        return `${paper.authors}. "${paper.title}." ${paper.venue} (${paper.year}).`;
    }
  };

  // Pre-synthesized Literature Review sentences ready to copy into related work
  const litReviewSynthesis = `${paper.authors} (${paper.year}) investigated ${paper.modality.toLowerCase()} through ${paper.title.toLowerCase()}, utilizing ${paper.deviceUsed || 'specialized sensing hardware'} evaluated against ${paper.groundTruth || 'standard physiological reference measurements'}. Their methodology based on ${paper.methodology.slice(0, 140)} achieved ${Object.entries(paper.metrics).map(([k, v]) => `${k}: ${v}`).join(', ')}. Crucially, this work highlighted that ${paper.limitations?.[0] || 'environmental motion artifacts and tissue variability remain prominent translational challenges'}.`;

  const criticalGapSynthesis = `While ${paper.authors} (${paper.year}) demonstrated notable benchmarks (${Object.entries(paper.metrics).slice(0, 2).map(([k, v]) => `${k} = ${v}`).join(', ')}), their approach remains constrained by ${paper.limitations?.[0] || 'uncontrolled subject motion and cohort generalization boundaries'}, leaving a vital gap in real-time adaptive compensation.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/70 dark:bg-slate-800/50">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-2xs font-extrabold bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
                <Calendar className="w-3 h-3 mr-1" />
                <span>Published in {paper.year}</span>
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-2xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {paper.modality}
              </span>
              <span className="text-3xs font-mono text-slate-500 dark:text-slate-400">
                {paper.id} &bull; {paper.chunks.length} Index Chunks
              </span>
            </div>
            
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
              {paper.title}
            </h2>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 dark:text-slate-300 pt-0.5">
              <span className="flex items-center space-x-1 font-medium">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{paper.authors}</span>
              </span>
              <span className="flex items-center space-x-1 font-medium text-slate-500 dark:text-slate-400">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{paper.venue}</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer shrink-0"
            title="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 flex space-x-6 text-xs font-bold bg-white dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setActiveTab('extraction')}
            className={`py-3 border-b-2 flex items-center space-x-2 transition-colors cursor-pointer ${
              activeTab === 'extraction'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Structured Research Extraction</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lit-review')}
            className={`py-3 border-b-2 flex items-center space-x-2 transition-colors cursor-pointer ${
              activeTab === 'lit-review'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Quote className="w-4 h-4" />
            <span>Literature Review Snippets &amp; Citations</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('chunks')}
            className={`py-3 border-b-2 flex items-center space-x-2 transition-colors cursor-pointer ${
              activeTab === 'chunks'
                ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Indexed Sections &amp; Equations ({paper.chunks.length})</span>
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {activeTab === 'extraction' && (
            <div className="space-y-5">
              {/* Problem Statement & Core Thesis */}
              <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-black text-teal-900 dark:text-teal-300 uppercase tracking-wider">
                  <Target className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  <span>1. Core Problem Statement (The Gap in Literature)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {paper.problemStatement || paper.abstract}
                </p>
              </div>

              {/* Grid: Theoretical Framework & Hardware / Ground Truth */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Method & Theoretical Framework */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-teal-600" />
                    <span>2. Methodology &amp; Mathematical Formulation</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {paper.methodology}
                  </p>
                  {paper.theoreticalFramework && (
                    <div className="pt-2 text-2xs font-mono text-teal-800 dark:text-teal-300 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                      <strong>Framework:</strong> {paper.theoreticalFramework}
                    </div>
                  )}
                </div>

                {/* Sensing Hardware & Ground Truth */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    <Cpu className="w-4 h-4 text-teal-600" />
                    <span>3. Sensing Transducers &amp; Ground Truth</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">Hardware Sensor:</span>{' '}
                      {paper.deviceUsed || 'Standard benchtop instrumentation'}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">Reference Ground Truth:</span>{' '}
                      {paper.groundTruth || 'Clinical cohort benchmark'}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">Dataset / Cohort:</span>{' '}
                      {paper.dataset}
                    </div>
                  </div>
                </div>
              </div>

              {/* Benchmark Metrics */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                    <span>4. Quantitative Benchmark Accuracies</span>
                  </div>
                  <span className="text-3xs font-semibold text-slate-400">Published Empirical Results</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {Object.entries(paper.metrics).map(([k, v]) => (
                    <div key={k} className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="text-3xs font-bold text-slate-400 uppercase truncate">{k}</div>
                      <div className="text-xs sm:text-sm font-extrabold text-teal-700 dark:text-teal-400 mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Findings */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  5. Main Research Findings
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {paper.keyFindings.map((f, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-teal-600 font-bold mt-0.5">&bull;</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations & Literature Gaps */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-black text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>6. Methodological Limitations &amp; Unsolved Literature Gaps</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                  {(paper.limitations && paper.limitations.length > 0 ? paper.limitations : [
                    'Susceptibility to dynamic motion artifacts and subject motion.',
                    'Limited generalization across heterogeneous patient demographics.',
                    'Computational latency constraints for real-time edge processing.'
                  ]).map((lim, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-amber-600 font-bold mt-0.5">&bull;</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'lit-review' && (
            <div className="space-y-6">
              {/* Ready-to-Cite Academic Citation Generator */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    <Quote className="w-4 h-4 text-teal-600" />
                    <span>Academic Citation Formats</span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {(['APA', 'IEEE', 'BibTeX', 'Chicago'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setCitationFormat(fmt)}
                        className={`px-2.5 py-1 rounded-lg text-2xs font-extrabold transition-colors cursor-pointer ${
                          citationFormat === fmt
                            ? 'bg-teal-700 text-white shadow-2xs'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed break-words">
                  {getFormattedCitation()}
                  <button
                    type="button"
                    onClick={() => handleCopy(getFormattedCitation(), 'citation')}
                    className="absolute right-2.5 top-2.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-2xs font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedType === 'citation' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'citation' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Pre-Formulated Literature Review Paragraph */}
              <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-black text-teal-950 dark:text-teal-200 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                    <span>Synthesized Literature Review Contribution (Ready to Paste)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(litReviewSynthesis, 'lit-review')}
                    className="px-3 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-2xs font-bold flex items-center space-x-1 shadow-2xs cursor-pointer"
                  >
                    {copiedType === 'lit-review' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'lit-review' ? 'Copied' : 'Copy for Literature Review'}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-teal-100 dark:border-teal-900">
                  &ldquo;{litReviewSynthesis}&rdquo;
                </p>
                <div className="text-3xs text-teal-800 dark:text-teal-400 font-medium">
                  Ideal for introduction, related work, and background sections in IEEE, ACM, Springer, or Elsevier journal submissions.
                </div>
              </div>

              {/* Critical Gap Formulation */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-black text-amber-950 dark:text-amber-200 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>Literature Gap Justification (To Justify Your New Research)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(criticalGapSynthesis, 'gap')}
                    className="px-3 py-1 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-2xs font-bold flex items-center space-x-1 shadow-2xs cursor-pointer"
                  >
                    {copiedType === 'gap' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'gap' ? 'Copied' : 'Copy Gap Statement'}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-amber-100 dark:border-amber-900">
                  &ldquo;{criticalGapSynthesis}&rdquo;
                </p>
              </div>
            </div>
          )}

          {activeTab === 'chunks' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                All {paper.chunks.length} semantically partitioned text passages extracted and indexed into the RAG vector space:
              </div>

              <div className="space-y-3">
                {paper.chunks.map((chunk, idx) => (
                  <div 
                    key={chunk.id || idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-md bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-2xs font-extrabold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {chunk.section}
                        </span>
                      </div>
                      {chunk.page && (
                        <span className="text-3xs font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                          Page {chunk.page}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {chunk.content}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700 text-3xs text-slate-400">
                      <span>Tokens: ~{chunk.tokenCount}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(chunk.content, `chunk-${idx}`)}
                        className="text-teal-600 dark:text-teal-400 hover:underline font-bold flex items-center space-x-1 cursor-pointer"
                      >
                        {copiedType === `chunk-${idx}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedType === `chunk-${idx}` ? 'Copied' : 'Copy Passage'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center space-x-2">
            {onSaveCitation && (
              <button
                type="button"
                onClick={() => {
                  onSaveCitation({
                    paperId: paper.id,
                    paperTitle: paper.title,
                    authors: paper.authors,
                    year: paper.year,
                    quoteSnippet: paper.abstract.slice(0, 200) + '...',
                    section: 'Abstract',
                    page: paper.chunks[0]?.page || 1,
                  });
                }}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-2xs"
              >
                <Bookmark className="w-3.5 h-3.5 text-teal-600" />
                <span>Bookmark to Notebook</span>
              </button>
            )}

            {onSendToChat && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSendToChat(`Based on paper "${paper.title}" (${paper.year}, ${paper.authors}), please critically explain the methodology, mathematical equations, and how it can be integrated into my literature review.`);
                }}
                className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Deep Academic Inquiry with AI</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
