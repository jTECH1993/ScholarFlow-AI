import React, { useState } from 'react';
import { 
  Network, 
  Search, 
  Filter, 
  Sparkles, 
  Zap, 
  Info, 
  Layers, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  BookOpen,
  List,
  Maximize2
} from 'lucide-react';

export interface ConceptEntity {
  id: string;
  label: string;
  category: 'Technology' | 'Metric' | 'Algorithm' | 'Threat' | 'Standard';
  color: string;
  bgHex: string;
  strokeHex: string;
  description: string;
  paperCitations: string[];
  x: number;
  y: number;
}

export interface ConceptRelationship {
  sourceId: string;
  targetId: string;
  relationLabel: string;
  relationType: 'measures' | 'derives' | 'vulnerable_to' | 'resilient_to' | 'validates' | 'filters';
}

export const CONCEPT_ENTITIES: ConceptEntity[] = [
  {
    id: 'fmcw-radar',
    label: '60GHz FMCW Radar',
    category: 'Technology',
    color: 'emerald',
    bgHex: '#064e3b',
    strokeHex: '#10b981',
    description: 'Frequency-Modulated Continuous Wave millimeter-wave radar operating at 60 GHz for contactless chest displacement tracking.',
    paperCitations: ['Vital signs monitoring using 60 GHz mmWave radar', 'Contactless radar hemodynamics'],
    x: 180,
    y: 110
  },
  {
    id: 'optical-ppg',
    label: 'Optical PPG Sensor',
    category: 'Technology',
    color: 'indigo',
    bgHex: '#312e81',
    strokeHex: '#818cf8',
    description: 'Photoplethysmography using green/IR LEDs to measure volumetric microvascular blood changes in tissue.',
    paperCitations: ['Wearable PPG motion resilience', 'Optoelectronic arterial compliance'],
    x: 180,
    y: 280
  },
  {
    id: 'rppg-camera',
    label: 'Remote rPPG Camera',
    category: 'Technology',
    color: 'purple',
    bgHex: '#581c87',
    strokeHex: '#c084fc',
    description: 'Non-contact video-based PPG using facial RGB sensors and CHROM/POS illumination algorithms.',
    paperCitations: ['Face video rPPG blood pressure estimation'],
    x: 180,
    y: 430
  },
  {
    id: 'pwv-metric',
    label: 'Pulse Wave Velocity (PWV)',
    category: 'Metric',
    color: 'amber',
    bgHex: '#78350f',
    strokeHex: '#f59e0b',
    description: 'Speed at which arterial pressure waves travel through the circulatory system; key marker for arterial stiffness.',
    paperCitations: ['Continuous PWV arterial elasticity', 'Moens-Korteweg pulse velocity'],
    x: 480,
    y: 110
  },
  {
    id: 'ptt-metric',
    label: 'Pulse Transit Time (PTT)',
    category: 'Metric',
    color: 'amber',
    bgHex: '#78350f',
    strokeHex: '#f59e0b',
    description: 'Time delay between R-peak of ECG and arrival of PPG pulse wave at distal extremity.',
    paperCitations: ['Cuffless blood pressure estimation via PTT'],
    x: 480,
    y: 280
  },
  {
    id: 'hrv-metric',
    label: 'Heart Rate Variability (HRV)',
    category: 'Metric',
    color: 'amber',
    bgHex: '#78350f',
    strokeHex: '#f59e0b',
    description: 'Variation in time intervals between consecutive heartbeats (SDNN, RMSSD) indicating autonomic nervous system activity.',
    paperCitations: ['Autonomic HRV spectral analysis in ICU'],
    x: 480,
    y: 430
  },
  {
    id: 'motion-threat',
    label: 'Ambulatory Motion Artifacts',
    category: 'Threat',
    color: 'rose',
    bgHex: '#881337',
    strokeHex: '#f43f5e',
    description: 'Signal distortion caused by patient movement, walking, or sensor displacement relative to skin.',
    paperCitations: ['Motion artifact corruption in wearable PPG'],
    x: 780,
    y: 110
  },
  {
    id: 'skin-bias-threat',
    label: 'Skin Phototype Bias',
    category: 'Threat',
    color: 'rose',
    bgHex: '#881337',
    strokeHex: '#f43f5e',
    description: 'Attenuation of optical green light absorption in higher Fitzpatrick skin phototypes (V-VI).',
    paperCitations: ['Melanin attenuation in pulse oximetry'],
    x: 780,
    y: 280
  },
  {
    id: 'transformer-rag',
    label: 'Deep Transformer RAG',
    category: 'Algorithm',
    color: 'purple',
    bgHex: '#4c1d95',
    strokeHex: '#a855f7',
    description: 'Neural attention model extracting clean pulsatile waveforms from corrupted Doppler spectrograms.',
    paperCitations: ['Transformer spectrogram denoising'],
    x: 480,
    y: 550
  },
  {
    id: 'ecg-gold-standard',
    label: '12-Lead ECG Holter',
    category: 'Standard',
    color: 'blue',
    bgHex: '#1e3a8a',
    strokeHex: '#3b82f6',
    description: 'Clinical gold-standard reference electrophysiology monitor for cardiac arrhythmia and timing validation.',
    paperCitations: ['AAMI/ANSI cuffless blood pressure protocol'],
    x: 780,
    y: 430
  }
];

export const CONCEPT_RELATIONSHIPS: ConceptRelationship[] = [
  { sourceId: 'fmcw-radar', targetId: 'pwv-metric', relationLabel: 'measures contactless', relationType: 'measures' },
  { sourceId: 'optical-ppg', targetId: 'ptt-metric', relationLabel: 'derives distal', relationType: 'derives' },
  { sourceId: 'rppg-camera', targetId: 'hrv-metric', relationLabel: 'extracts facial', relationType: 'measures' },
  { sourceId: 'ptt-metric', targetId: 'pwv-metric', relationLabel: 'correlates with', relationType: 'derives' },
  { sourceId: 'optical-ppg', targetId: 'motion-threat', relationLabel: 'vulnerable to', relationType: 'vulnerable_to' },
  { sourceId: 'optical-ppg', targetId: 'skin-bias-threat', relationLabel: 'attenuated by', relationType: 'vulnerable_to' },
  { sourceId: 'fmcw-radar', targetId: 'skin-bias-threat', relationLabel: 'resilient to', relationType: 'resilient_to' },
  { sourceId: 'fmcw-radar', targetId: 'motion-threat', relationLabel: 'degraded by heavy', relationType: 'vulnerable_to' },
  { sourceId: 'transformer-rag', targetId: 'motion-threat', relationLabel: 'filters out', relationType: 'filters' },
  { sourceId: 'ecg-gold-standard', targetId: 'ptt-metric', relationLabel: 'validates R-peak in', relationType: 'validates' },
  { sourceId: 'ecg-gold-standard', targetId: 'hrv-metric', relationLabel: 'provides gold-standard', relationType: 'validates' }
];

export const ResearchKnowledgeGraph: React.FC = () => {
  const [selectedEntityId, setSelectedEntityId] = useState<string>('fmcw-radar');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewTab, setViewTab] = useState<'canvas' | 'triples'>('canvas');

  const categories = ['All', 'Technology', 'Metric', 'Threat', 'Algorithm', 'Standard'];

  const filteredEntities = CONCEPT_ENTITIES.filter(e => {
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      e.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeEntity = CONCEPT_ENTITIES.find(e => e.id === selectedEntityId) || CONCEPT_ENTITIES[0];

  // Connected relationships for selected entity
  const connectedEdges = CONCEPT_RELATIONSHIPS.filter(
    r => r.sourceId === selectedEntityId || r.targetId === selectedEntityId
  );

  const connectedEntityIds = new Set([
    selectedEntityId,
    ...connectedEdges.map(r => r.sourceId === selectedEntityId ? r.targetId : r.sourceId)
  ]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
            <Network className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>Interactive Research Corpus Knowledge Graph</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono">
                {CONCEPT_ENTITIES.length} Concepts • {CONCEPT_RELATIONSHIPS.length} Triples
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Interactive entity relationship network mapping extracted research concepts, sensing modalities, and clinical threats
            </p>
          </div>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewTab('canvas')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewTab === 'canvas'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Interactive Canvas</span>
            </button>

            <button
              type="button"
              onClick={() => setViewTab('triples')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewTab === 'triples'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Entity Triples Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Badges & Entity Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto font-bold">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search concepts (e.g. Radar, Motion)..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* VIEW 1: SVG KNOWLEDGE GRAPH CANVAS */}
      {viewTab === 'canvas' && (
        <div className="space-y-4">
          <div className="relative overflow-x-auto p-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
            <svg
              viewBox="0 0 980 640"
              className="w-full h-auto min-w-[780px] font-sans"
            >
              <defs>
                <marker
                  id="kg-arrow"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                </marker>

                <marker
                  id="kg-arrow-dim"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
                </marker>
              </defs>

              {/* 1. DRAW RELATIONSHIP EDGES */}
              {CONCEPT_RELATIONSHIPS.map((rel, idx) => {
                const source = CONCEPT_ENTITIES.find(e => e.id === rel.sourceId);
                const target = CONCEPT_ENTITIES.find(e => e.id === rel.targetId);
                if (!source || !target) return null;

                const isConnectedToSelected = rel.sourceId === selectedEntityId || rel.targetId === selectedEntityId;
                const strokeColor = isConnectedToSelected ? '#818cf8' : '#1e293b';
                const strokeWidth = isConnectedToSelected ? '2.5' : '1';
                const opacity = isConnectedToSelected ? '1' : '0.25';

                const midX = (source.x + target.x) / 2;
                const midY = (source.y + target.y) / 2;

                return (
                  <g key={`edge-${idx}`}>
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={isConnectedToSelected ? 'none' : '4 4'}
                      opacity={opacity}
                      markerEnd={isConnectedToSelected ? 'url(#kg-arrow)' : 'url(#kg-arrow-dim)'}
                    />

                    {/* Edge Label Pill */}
                    {isConnectedToSelected && (
                      <foreignObject
                        x={midX - 50}
                        y={midY - 12}
                        width="100"
                        height="24"
                        className="overflow-visible"
                      >
                        <div className="px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/50 text-[9px] font-mono font-bold text-center truncate shadow-sm">
                          {rel.relationLabel}
                        </div>
                      </foreignObject>
                    )}
                  </g>
                );
              })}

              {/* 2. DRAW ENTITY NODES */}
              {filteredEntities.map((entity) => {
                const isSelected = selectedEntityId === entity.id;
                const isConnected = connectedEntityIds.has(entity.id);
                const opacity = isConnected ? '1' : '0.35';

                return (
                  <g
                    key={`entity-${entity.id}`}
                    transform={`translate(${entity.x}, ${entity.y})`}
                    className="cursor-pointer transition-all"
                    onClick={() => setSelectedEntityId(entity.id)}
                    style={{ opacity }}
                  >
                    {/* Active Halo Ring */}
                    {isSelected && (
                      <circle
                        r="32"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="3"
                        className="animate-ping opacity-75"
                      />
                    )}

                    {/* Outer Circle Node */}
                    <circle
                      r="26"
                      fill={entity.bgHex}
                      stroke={isSelected ? '#c084fc' : entity.strokeHex}
                      strokeWidth={isSelected ? '3' : '2'}
                      className="transition-transform hover:scale-110"
                    />

                    {/* Category Icon Badge */}
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fontSize="14"
                      fill="#ffffff"
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      {entity.category === 'Technology' ? '📡' : entity.category === 'Metric' ? '📊' : entity.category === 'Threat' ? '⚠️' : entity.category === 'Algorithm' ? '🧠' : '🛡️'}
                    </text>

                    {/* Label Subtitle */}
                    <foreignObject
                      x="-70"
                      y="32"
                      width="140"
                      height="30"
                      className="overflow-visible"
                    >
                      <div className={`text-[10px] font-bold text-center truncate px-1 rounded ${
                        isSelected ? 'bg-indigo-600 text-white' : 'text-slate-200'
                      }`}>
                        {entity.label}
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ACTIVE CONCEPT DETAIL INSPECTOR BOX */}
          {activeEntity && (
            <div className="p-5 rounded-2xl border border-indigo-500/40 bg-slate-950 text-indigo-100 space-y-3 text-xs shadow-xl relative overflow-hidden animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-500/50 text-xl">
                    {activeEntity.category === 'Technology' ? '📡' : activeEntity.category === 'Metric' ? '📊' : activeEntity.category === 'Threat' ? '⚠️' : activeEntity.category === 'Algorithm' ? '🧠' : '🛡️'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-white tracking-tight">
                        {activeEntity.label}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-mono font-bold uppercase">
                        {activeEntity.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {activeEntity.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connected Triples Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-[11px]">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Network className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Degree-1 Connected Relationships ({connectedEdges.length})</span>
                  </span>

                  <div className="space-y-1 font-mono text-[10px]">
                    {connectedEdges.map((rel, i) => {
                      const otherId = rel.sourceId === activeEntity.id ? rel.targetId : rel.sourceId;
                      const otherEntity = CONCEPT_ENTITIES.find(e => e.id === otherId);
                      const direction = rel.sourceId === activeEntity.id ? '➔' : '◄';

                      return (
                        <div
                          key={i}
                          onClick={() => setSelectedEntityId(otherId)}
                          className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500 transition-all cursor-pointer flex items-center justify-between text-slate-300"
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="text-indigo-400 font-bold">{direction}</span>
                            <span>{rel.relationLabel}</span>
                            <span className="text-white font-bold">[{otherEntity?.label}]</span>
                          </span>
                          <span className="text-[9px] text-slate-500">{otherEntity?.category}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Extracted Source Manuscript Citations</span>
                  </span>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[10px] text-emerald-300/90 space-y-1">
                    {activeEntity.paperCitations.map((paper, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-slate-600">├─</span>
                        <span>"{paper}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: ENTITY TRIPLES TABLE */}
      {viewTab === 'triples' && (
        <div className="space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 px-3">Subject Concept</th>
                  <th className="py-2.5 px-3">Relationship Triple</th>
                  <th className="py-2.5 px-3">Object Concept</th>
                  <th className="py-2.5 px-3">Relation Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-[11px]">
                {CONCEPT_RELATIONSHIPS.map((rel, idx) => {
                  const source = CONCEPT_ENTITIES.find(e => e.id === rel.sourceId);
                  const target = CONCEPT_ENTITIES.find(e => e.id === rel.targetId);

                  return (
                    <tr
                      key={idx}
                      onClick={() => {
                        setSelectedEntityId(rel.sourceId);
                        setViewTab('canvas');
                      }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors cursor-pointer"
                    >
                      <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100">
                        {source?.label}
                      </td>
                      <td className="py-2.5 px-3 text-indigo-600 dark:text-indigo-400 font-bold">
                        {rel.relationLabel}
                      </td>
                      <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">
                        {target?.label}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[9px] uppercase font-bold">
                          {rel.relationType}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
