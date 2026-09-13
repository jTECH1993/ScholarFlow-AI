import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Upload, 
  Filter, 
  Layers, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Tag,
  Plus,
  AlertCircle,
  Cpu,
  Calendar,
  Sparkles,
  Quote,
  Clock,
  ArrowUpDown,
  LayoutGrid,
  ListFilter,
  Milestone
} from 'lucide-react';
import { VitalSignPaper, VitalModality } from '../types';
import { VITAL_MODALITIES } from '../data/vitalSignPapers';
import { PaperDossierModal } from './PaperDossierModal';

interface CorpusExplorerProps {
  papers: VitalSignPaper[];
  onAddCustomPaper: (paper: VitalSignPaper) => void;
  onSelectPaperForChat?: (paper: VitalSignPaper) => void;
  onOpenUploadModal?: () => void;
  sessionId?: string;
  onLoadSampleCorpus?: () => void;
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

export const CorpusExplorer: React.FC<CorpusExplorerProps> = ({
  papers,
  onAddCustomPaper,
  onSelectPaperForChat,
  onOpenUploadModal,
  sessionId,
  onLoadSampleCorpus,
  onSaveCitation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModality, setSelectedModality] = useState<string>('All Modalities');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [sortOrder, setSortOrder] = useState<'year-desc' | 'year-asc' | 'title-asc' | 'chunks-desc'>('year-desc');
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(null);
  const [selectedDossierPaper, setSelectedDossierPaper] = useState<VitalSignPaper | null>(null);

  // Available unique years in papers
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(papers.map((p) => p.year))).sort((a, b) => b - a);
    return years;
  }, [papers]);

  // Year counts mapping
  const yearCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    papers.forEach((p) => {
      const yr = p.year.toString();
      counts[yr] = (counts[yr] || 0) + 1;
    });
    return counts;
  }, [papers]);

  // Filter and sort papers
  const filteredAndSortedPapers = useMemo(() => {
    const filtered = papers.filter((p) => {
      const matchesModality =
        selectedModality === 'All Modalities' || p.modality === selectedModality;

      const matchesYear =
        selectedYear === 'All Years' ||
        (selectedYear === '2021 & Prior' ? p.year <= 2021 : p.year.toString() === selectedYear);

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.authors.toLowerCase().includes(query) ||
        p.year.toString().includes(query) ||
        p.abstract.toLowerCase().includes(query) ||
        p.dataset.toLowerCase().includes(query) ||
        p.methodology.toLowerCase().includes(query) ||
        (p.problemStatement && p.problemStatement.toLowerCase().includes(query)) ||
        (p.deviceUsed && p.deviceUsed.toLowerCase().includes(query));

      return matchesModality && matchesYear && matchesSearch;
    });

    // Sorting
    return [...filtered].sort((a, b) => {
      if (sortOrder === 'year-desc') {
        if (b.year !== a.year) return b.year - a.year;
        return a.title.localeCompare(b.title);
      }
      if (sortOrder === 'year-asc') {
        if (a.year !== b.year) return a.year - b.year;
        return a.title.localeCompare(b.title);
      }
      if (sortOrder === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortOrder === 'chunks-desc') {
        return b.chunks.length - a.chunks.length;
      }
      return 0;
    });
  }, [papers, selectedModality, selectedYear, searchQuery, sortOrder]);

  // Group papers by Year for Chronological Timeline View
  const papersByYear = useMemo(() => {
    const groups: { year: number; papers: VitalSignPaper[]; eraNote?: string }[] = [];
    const map = new Map<number, VitalSignPaper[]>();

    filteredAndSortedPapers.forEach((paper) => {
      if (!map.has(paper.year)) {
        map.set(paper.year, []);
      }
      map.get(paper.year)!.push(paper);
    });

    const sortedYears = Array.from(map.keys()).sort((a, b) => 
      sortOrder === 'year-asc' ? a - b : b - a
    );

    const eraDescriptions: Record<number, string> = {
      2026: 'Frontier Agentic RAG, Multi-Parameter Sepsis Trajectory & Millimeter-Wave Beamforming',
      2025: 'Multimodal Transformer Architectures, Continuous Blood Pressure & Wearable Radar',
      2024: 'Physics-Informed Neural Networks (PINNs), Remote rPPG & Hemodynamic Boundary Estimation',
      2023: 'Deep Respiratory Deconvolution, Self-Supervised Pretraining & Contrastive Electrocardiography',
      2022: 'Sub-Nanosecond IR-UWB Radar Pulses, SVD Clutter Suppression & ICU Ballistocardiography',
      2021: 'Early Continuous Wave Doppler Radar, Artifact Wavelet Denoising & Motion Filtration',
      2020: 'Baseline Empirical Pulse Wave Velocity & Contact Photoplethysmography Foundations',
      2019: 'Classical Spectral Filtering, Micro-Doppler Trajectory & Benchtop Radar Prototypes',
      2018: 'Pioneering Non-Contact Biosensing & Transducer Feasibility Studies',
    };

    sortedYears.forEach((year) => {
      groups.push({
        year,
        papers: map.get(year) || [],
        eraNote: eraDescriptions[year] || 'Physiological Monitoring & Sensor Advancements',
      });
    });

    return groups;
  }, [filteredAndSortedPapers, sortOrder]);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header and Controls */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2.5">
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span>Research Corpus Explorer</span>
                </h2>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
                  {papers.length} Papers
                </span>
                {sessionId && (
                  <span className="hidden sm:inline-block text-3xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700" title="Active Session ID">
                    {sessionId}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Explore, filter by publication year (2018–2026), inspect deep methodological extractions, and synthesize publication-ready Literature Review paragraphs.
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {onLoadSampleCorpus && papers.length === 0 && (
                <button
                  type="button"
                  onClick={onLoadSampleCorpus}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Load Benchmark Library
                </button>
              )}
              {onOpenUploadModal && (
                <button
                  type="button"
                  id="upload-paper-button"
                  onClick={onOpenUploadModal}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload &amp; Index Paper</span>
                </button>
              )}
            </div>
          </div>

          {/* Search, Year Filter, Modality, & Sorting Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2">
            {/* Search */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across papers by year, title, author, MIMIC dataset, radar, PPG..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            {/* Filter by Publication Year */}
            <div className="lg:col-span-3 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
              <select
                id="filter-by-year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-200 font-medium"
              >
                <option value="All Years">All Publication Years ({papers.length})</option>
                {availableYears.map((yr) => (
                  <option key={yr} value={yr.toString()}>
                    Year {yr} ({yearCounts[yr.toString()] || 0} papers)
                  </option>
                ))}
                <option value="2021 & Prior">2021 &amp; Prior</option>
              </select>
            </div>

            {/* Modality Filter */}
            <div className="lg:col-span-2 flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-200"
              >
                {VITAL_MODALITIES.map((mod) => (
                  <option key={mod} value={mod}>
                    {mod}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order Selector */}
            <div className="lg:col-span-2 flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                id="sort-papers-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-200 font-medium"
              >
                <option value="year-desc">Year: Newest (2026 →)</option>
                <option value="year-asc">Year: Oldest (→ 2026)</option>
                <option value="title-asc">Title: A &rarr; Z</option>
                <option value="chunks-desc">Information Density</option>
              </select>
            </div>
          </div>

          {/* Quick Year Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span className="text-2xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1 flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-teal-600" />
              <span>Filter by Year:</span>
            </span>
            <button
              type="button"
              onClick={() => setSelectedYear('All Years')}
              className={`px-2.5 py-1 rounded-lg text-2xs font-bold transition-colors cursor-pointer ${
                selectedYear === 'All Years'
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Years ({papers.length})
            </button>
            {availableYears.map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr.toString())}
                className={`px-2.5 py-1 rounded-lg text-2xs font-bold transition-colors cursor-pointer flex items-center space-x-1 ${
                  selectedYear === yr.toString()
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{yr}</span>
                <span className="text-3xs opacity-80">({yearCounts[yr.toString()] || 0})</span>
              </button>
            ))}
          </div>

          {/* Quick Modality Filter Chips & View Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap gap-1.5">
              {VITAL_MODALITIES.slice(0, 5).map((mod) => (
                <button
                  key={mod}
                  type="button"
                  onClick={() => setSelectedModality(mod)}
                  className={`px-2 py-0.5 rounded-lg text-3xs font-medium transition-colors cursor-pointer ${
                    selectedModality === mod
                      ? 'bg-teal-700 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {mod}
                </button>
              ))}
            </div>

            {/* View Mode: Chronological Timeline vs Compact Grid */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1 rounded-lg text-2xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer ${
                  viewMode === 'timeline'
                    ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Chronological Year-by-Year Timeline View"
              >
                <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Year Timeline</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-lg text-2xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Standard Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>All Cards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Papers List / Chronological Grouping */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span className="font-medium">
              Showing <strong className="text-slate-900 dark:text-white">{filteredAndSortedPapers.length}</strong> of {papers.length} peer-reviewed papers
              {selectedYear !== 'All Years' && ` (Published in ${selectedYear})`}
            </span>
            <span className="hidden sm:inline">Click &ldquo;Extract for Lit Review&rdquo; on any paper for instant academic synthesis</span>
          </div>

          {filteredAndSortedPapers.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-8 text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No Papers Found for Filter Criteria
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Try adjusting the year filter or search query. There are {papers.length} total research papers available in this session.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedYear('All Years');
                  setSelectedModality('All Modalities');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'timeline' ? (
            /* ============================================================ */
            /* CHRONOLOGICAL YEAR-BY-YEAR TIMELINE VIEW                     */
            /* ============================================================ */
            <div className="space-y-8">
              {papersByYear.map(({ year, papers: yearPapers, eraNote }) => (
                <div key={year} className="space-y-3 relative pl-6 border-l-2 border-teal-500/40 dark:border-teal-700/50">
                  {/* Timeline Year Node */}
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-xs font-black text-xs">
                    {year.toString().slice(-2)}
                  </div>

                  {/* Year Era Header Banner */}
                  <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                          Publication Year {year}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-2xs font-extrabold bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
                          {yearPapers.length} {yearPapers.length === 1 ? 'Paper' : 'Papers'}
                        </span>
                      </div>
                      {eraNote && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {eraNote}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedYear(year.toString())}
                      className="text-2xs text-teal-700 dark:text-teal-400 hover:underline font-bold self-start sm:self-auto cursor-pointer"
                    >
                      Focus exclusively on {year} &rarr;
                    </button>
                  </div>

                  {/* Papers in this Year */}
                  <div className="space-y-3 pt-1">
                    {yearPapers.map((paper) => (
                      <PaperCard
                        key={paper.id}
                        paper={paper}
                        isExpanded={expandedPaperId === paper.id}
                        onToggleExpand={() => setExpandedPaperId(expandedPaperId === paper.id ? null : paper.id)}
                        onOpenDossier={() => setSelectedDossierPaper(paper)}
                        onSelectPaperForChat={onSelectPaperForChat}
                        onSaveCitation={onSaveCitation}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ============================================================ */
            /* STANDARD GRID / MATRIX VIEW                                  */
            /* ============================================================ */
            <div className="space-y-3">
              {filteredAndSortedPapers.map((paper) => (
                <PaperCard
                  key={paper.id}
                  paper={paper}
                  isExpanded={expandedPaperId === paper.id}
                  onToggleExpand={() => setExpandedPaperId(expandedPaperId === paper.id ? null : paper.id)}
                  onOpenDossier={() => setSelectedDossierPaper(paper)}
                  onSelectPaperForChat={onSelectPaperForChat}
                  onSaveCitation={onSaveCitation}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Deep Research Extraction & Literature Review Dossier Modal */}
      <PaperDossierModal
        paper={selectedDossierPaper}
        isOpen={!!selectedDossierPaper}
        onClose={() => setSelectedDossierPaper(null)}
        onSendToChat={(query) => {
          if (onSelectPaperForChat && selectedDossierPaper) {
            onSelectPaperForChat(selectedDossierPaper);
          }
        }}
        onSaveCitation={onSaveCitation}
      />
    </div>
  );
};

// Reusable Paper Card with deep extraction actions and dark mode styling
interface PaperCardProps {
  paper: VitalSignPaper;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenDossier: () => void;
  onSelectPaperForChat?: (paper: VitalSignPaper) => void;
  onSaveCitation?: (citeData: any) => void;
}

const PaperCard: React.FC<PaperCardProps> = ({
  paper,
  isExpanded,
  onToggleExpand,
  onOpenDossier,
  onSelectPaperForChat,
  onSaveCitation,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all text-slate-900 dark:text-slate-100">
      {/* Paper Header Card */}
      <div className="p-4 sm:p-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {/* Prominent Year Badge */}
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-2xs font-extrabold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-700 shadow-2xs">
                <Calendar className="w-3 h-3 mr-0.5" />
                <span>{paper.year}</span>
              </span>

              <span className="px-2 py-0.5 rounded-full text-2xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {paper.modality}
              </span>

              <span className="text-2xs text-slate-500 dark:text-slate-400 font-medium">
                {paper.venue}
              </span>

              {paper.isCustomUpload && (
                <span className="px-1.5 py-0.5 rounded text-2xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Custom Added
                </span>
              )}
            </div>

            <h3 
              onClick={onToggleExpand}
              className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug cursor-pointer hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
            >
              {paper.title}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              {paper.authors}
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 shrink-0 self-start">
            {/* Direct Literature Review Extraction Button */}
            <button
              type="button"
              onClick={onOpenDossier}
              className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/80 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer shadow-2xs"
              title="Extract structured problem, hardware, benchmark, and lit review paragraph"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Extract for Lit Review</span>
            </button>

            {/* Expand / Collapse Details */}
            <button
              type="button"
              onClick={onToggleExpand}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={isExpanded ? 'Hide Details' : 'Show Details'}
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Abstract Preview */}
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
          {paper.abstract}
        </p>

        {/* Benchmark Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-2xs">
          <span className="text-slate-400 dark:text-slate-500 font-semibold">Cohort / Dataset:</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">{paper.dataset}</span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-slate-400 dark:text-slate-500 font-semibold">Results:</span>
          {Object.entries(paper.metrics).slice(0, 3).map(([k, v]) => (
            <span key={k} className="inline-flex items-center space-x-1 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-mono">
              <span className="text-slate-400 dark:text-slate-500">{k}:</span>
              <span className="font-bold text-teal-700 dark:text-teal-400">{v}</span>
            </span>
          ))}
          <span className="ml-auto text-3xs text-slate-400">
            {paper.chunks.length} Chunks Indexed
          </span>
        </div>
      </div>

      {/* Expanded Details & Chunks */}
      {isExpanded && (
        <div className="p-4 sm:p-5 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          {/* Problem Statement Banner */}
          {paper.problemStatement && (
            <div className="p-3.5 bg-teal-50/80 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800/80 space-y-1">
              <span className="text-2xs font-black text-teal-900 dark:text-teal-300 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Problem Statement &amp; Gap Addressed ({paper.year})</span>
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                {paper.problemStatement}
              </p>
            </div>
          )}

          {/* Hardware & Ground Truth */}
          {(paper.deviceUsed || paper.groundTruth) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paper.deviceUsed && (
                <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-2xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Cpu className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>Acquisition Sensor / Hardware</span>
                  </span>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {paper.deviceUsed}
                  </p>
                </div>
              )}
              {paper.groundTruth && (
                <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-2xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Ground Truth Gold Standard</span>
                  </span>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {paper.groundTruth}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Methodology & Clinical Findings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-600" />
                <span>Signal Processing Methodology</span>
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{paper.methodology}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Empirical Findings &amp; Evidence</span>
              </h4>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                {paper.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-teal-600 font-bold">&bull;</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row inside expanded card */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onOpenDossier}
                className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open Full Research Dossier &amp; Citations</span>
              </button>
            </div>

            <span className="text-3xs text-slate-400">
              Published in {paper.year} &bull; Vector chunks: {paper.chunks.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
