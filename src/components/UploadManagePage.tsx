import React, { useState, useRef, useMemo } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  Layers, 
  Sparkles, 
  AlertCircle, 
  Plus, 
  HelpCircle,
  Clock,
  Check,
  RefreshCw,
  FolderOpen,
  Calendar,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { VitalSignPaper } from '../types';

interface UploadManagePageProps {
  papers: VitalSignPaper[];
  onOpenUploadModal: () => void;
  onOpenUploadModalWithFiles?: (files: File[]) => void;
  onLoadSampleCorpus: () => void;
  onDeletePaper: (paperId: string) => void;
  onClearAllPapers: () => void;
  onViewPaper: (paper: VitalSignPaper) => void;
}

export const UploadManagePage: React.FC<UploadManagePageProps> = ({
  papers,
  onOpenUploadModal,
  onOpenUploadModalWithFiles,
  onLoadSampleCorpus,
  onDeletePaper,
  onClearAllPapers,
  onViewPaper,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [sortOrder, setSortOrder] = useState<'year-desc' | 'year-asc' | 'title-asc'>('year-desc');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableYears = useMemo(() => {
    return Array.from(new Set(papers.map((p) => p.year))).sort((a, b) => b - a);
  }, [papers]);

  const filteredPapers = useMemo(() => {
    let result = papers;
    if (selectedYear !== 'All Years') {
      result = result.filter((p) => p.year.toString() === selectedYear);
    }
    return [...result].sort((a, b) => {
      if (sortOrder === 'year-desc') return b.year - a.year;
      if (sortOrder === 'year-asc') return a.year - b.year;
      return a.title.localeCompare(b.title);
    });
  }, [papers, selectedYear, sortOrder]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      if (onOpenUploadModalWithFiles) {
        onOpenUploadModalWithFiles(files);
      } else {
        onOpenUploadModal();
      }
    } else {
      onOpenUploadModal();
    }
  };

  const handleNativeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      if (onOpenUploadModalWithFiles) {
        onOpenUploadModalWithFiles(files);
      } else {
        onOpenUploadModal();
      }
      e.target.value = '';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 space-y-6 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Research Library &amp; Document Indexer
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Add your PDFs, LaTeX, text or Markdown files to build your grounded, chronological research library.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              id="upload-page-load-sample-btn"
              onClick={onLoadSampleCorpus}
              className="px-3.5 py-2 rounded-xl bg-teal-50 dark:bg-teal-950 hover:bg-teal-100 dark:hover:bg-teal-900 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Load Peer-Reviewed Library</span>
            </button>

            <button
              type="button"
              id="upload-page-open-modal-btn"
              onClick={onOpenUploadModal}
              className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-2xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Papers</span>
            </button>
          </div>
        </div>

        {/* Center Grid: Drag & Drop Zone + Upload Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Drag & Drop Area (2 cols on LG) */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`lg:col-span-2 rounded-3xl border-2 border-dashed transition-all p-8 flex flex-col items-center justify-center text-center space-y-4 ${
              dragOver 
                ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40' 
                : 'border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-400 dark:hover:border-teal-600'
            }`}
          >
            <div className="w-16 h-16 rounded-3xl bg-teal-50 dark:bg-teal-900/40 border border-teal-100 dark:border-teal-800 flex items-center justify-center text-teal-700 dark:text-teal-300 shadow-2xs">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1 max-w-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Drag &amp; drop research manuscripts or PDFs
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Automatic optical chunking, semantic vector embeddings, and mathematical formula extraction.
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.txt,.md,.json,.csv"
              onChange={handleNativeFileInput}
              className="hidden"
            />

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer flex items-center space-x-1.5"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Papers (Single or Batch)</span>
              </button>
              <button
                type="button"
                onClick={onLoadSampleCorpus}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Load Sample Papers (2018–2026)
              </button>
            </div>
            
            <div className="text-3xs text-slate-400 dark:text-slate-500 pt-1">
              Supports selecting 1 or multiple files &bull; PDF, DOCX, TXT, MD, LaTeX &bull; Max 60 MB batch
            </div>
          </div>

          {/* Research Ingestion Capabilities */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Automated Extraction Pipeline</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-md bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-3xs font-black flex items-center justify-center mt-0.5 shrink-0">1</div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Publication Year &amp; Venue:</strong> Papers tagged with exact publication year for chronological trajectory analysis.
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-md bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-3xs font-black flex items-center justify-center mt-0.5 shrink-0">2</div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Structured Problem Statement:</strong> Isolates the exact research question and literature gap addressed.
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-md bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-3xs font-black flex items-center justify-center mt-0.5 shrink-0">3</div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Hardware &amp; Ground Truth:</strong> Distinguishes sensor transducers from clinical gold standards.
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-md bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-3xs font-black flex items-center justify-center mt-0.5 shrink-0">4</div>
                <div>
                  <strong className="text-slate-900 dark:text-white">Literature Review Synthesis:</strong> One-click generation of APA citations and synthesis paragraphs.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Papers Table with Year Filter */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Indexed Research Papers
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-2xs font-extrabold bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
                {filteredPapers.length} of {papers.length} Papers
              </span>
            </div>

            {/* Year Filter & Sort */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="py-1.5 px-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-medium"
                >
                  <option value="All Years">All Years</option>
                  {availableYears.map((yr) => (
                    <option key={yr} value={yr.toString()}>Year {yr}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="py-1.5 px-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-medium"
                >
                  <option value="year-desc">Year: Newest (2026 &rarr;)</option>
                  <option value="year-asc">Year: Oldest (&rarr; 2026)</option>
                  <option value="title-asc">Title: A &rarr; Z</option>
                </select>
              </div>

              {papers.length > 0 && (
                <button
                  type="button"
                  onClick={onClearAllPapers}
                  className="px-3 py-1.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {filteredPapers.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">No papers match this filter</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {selectedYear !== 'All Years' 
                  ? `No papers found for publication year ${selectedYear}.` 
                  : 'Upload research PDFs above or load our peer-reviewed literature library.'}
              </p>
              {selectedYear !== 'All Years' ? (
                <button
                  type="button"
                  onClick={() => setSelectedYear('All Years')}
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Show All Years
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onLoadSampleCorpus}
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors inline-flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load Peer-Reviewed Library</span>
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold text-3xs uppercase tracking-wider">
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4 w-28">Publication Year</th>
                    <th className="py-3 px-4 w-36">Modality</th>
                    <th className="py-3 px-4 w-28">Chunks</th>
                    <th className="py-3 px-4 w-32">Status</th>
                    <th className="py-3 px-4 w-28 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredPapers.map((paper, index) => {
                    return (
                      <tr key={paper.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 text-center text-slate-400 font-medium">
                          {index + 1}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 dark:text-white leading-snug line-clamp-1">
                            {paper.title}
                          </div>
                          <div className="text-3xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                            {paper.authors} &bull; {paper.venue || 'Peer-Reviewed Literature'}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-2xs font-extrabold bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                            <Calendar className="w-3 h-3 mr-0.5" />
                            <span>{paper.year}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 text-2xs">
                          {paper.modality}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 text-2xs font-mono">
                          {paper.chunks.length} chunks
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-3xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <Check className="w-3 h-3" />
                            <span>Indexed &bull; RAG Ready</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1">
                          <button
                            type="button"
                            onClick={() => onViewPaper(paper)}
                            className="p-1.5 text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Inspect Deep Extraction"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeletePaper(paper.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="Remove Paper"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
