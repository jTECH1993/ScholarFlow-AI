import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  Search, 
  FileText, 
  Sparkles, 
  Download,
  Check,
  Calendar,
  Layers
} from 'lucide-react';
import { SavedCitationItem } from '../types';

interface SavedCitationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  citations: SavedCitationItem[];
  onDeleteCitation: (id: string) => Promise<void>;
  onCiteInChat?: (citation: SavedCitationItem) => void;
}

export const SavedCitationsDrawer: React.FC<SavedCitationsDrawerProps> = ({
  isOpen,
  onClose,
  citations,
  onDeleteCitation,
  onCiteInChat,
}) => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = citations.filter(c => 
    c.paperTitle.toLowerCase().includes(search.toLowerCase()) ||
    c.authors.toLowerCase().includes(search.toLowerCase()) ||
    c.quoteSnippet.toLowerCase().includes(search.toLowerCase()) ||
    (c.section && c.section.toLowerCase().includes(search.toLowerCase()))
  );

  const handleExportBibtex = () => {
    const bibtex = citations.map((c, i) => `@article{scholarflow_cite_${i+1},
  title = {${c.paperTitle}},
  author = {${c.authors}},
  year = {${c.year}},
  note = {Personal Research Notebook - ${c.section}}
}`).join('\n\n');

    const blob = new Blob([bibtex], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `scholarflow_personal_citations_${new Date().toISOString().slice(0, 10)}.bib`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyQuote = (c: SavedCitationItem) => {
    navigator.clipboard.writeText(`"${c.quoteSnippet}" — ${c.authors} (${c.year}), ${c.paperTitle}`);
    setCopiedId(c.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Personal Research Evidence Notebook
              </h3>
              <p className="text-3xs text-slate-400">
                {citations.length} Bookmarked Citations &amp; Formulations
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Search */}
        <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search citations, authors, equations..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
          </div>
          {citations.length > 0 && (
            <button
              type="button"
              onClick={handleExportBibtex}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-2xs font-semibold flex items-center space-x-1 shrink-0"
              title="Export all to BibTeX"
            >
              <Download className="w-3.5 h-3.5 text-teal-600" />
              <span>BibTeX</span>
            </button>
          )}
        </div>

        {/* Citations List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {citations.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">No Saved Citations Yet</p>
              <p className="text-3xs text-slate-500 max-w-xs">
                While interacting with the RAG chatbot, click the bookmark icon on any retrieved citation or mathematical equation to save it to your private research notebook.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500">
              No citations matching &quot;{search}&quot;.
            </div>
          ) : (
            filtered.map((item) => (
              <div 
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-500/40 bg-white hover:bg-slate-50/50 transition-all space-y-2 shadow-2xs group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-3xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                      {item.section}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1 pt-1">
                      {item.paperTitle}
                    </h4>
                    <p className="text-3xs text-slate-500">
                      {item.authors} ({item.year})
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteCitation(item.id)}
                    className="text-slate-300 hover:text-rose-600 p-1 rounded transition-colors"
                    title="Remove from notebook"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Evidence snippet */}
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-3xs text-slate-700 leading-relaxed font-sans italic border-l-2 border-l-teal-600">
                  &ldquo;{item.quoteSnippet}&rdquo;
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1 text-3xs text-slate-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Saved {new Date(item.savedAt).toLocaleDateString()}</span>
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleCopyQuote(item)}
                      className="text-slate-600 hover:text-teal-700 font-medium flex items-center space-x-1"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <span>Copy Quote</span>
                      )}
                    </button>

                    {onCiteInChat && (
                      <button
                        type="button"
                        onClick={() => {
                          onCiteInChat(item);
                          onClose();
                        }}
                        className="text-teal-700 hover:text-teal-900 font-bold flex items-center space-x-0.5"
                      >
                        <span>Query in Chat</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
