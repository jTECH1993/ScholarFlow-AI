import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  Stethoscope, 
  Layers, 
  Bot,
  Zap,
  Sliders,
  Check
} from 'lucide-react';
import { AgentId, AgentTaskType } from '../types';

export interface PipelinePreset {
  id: string;
  taskId: AgentTaskType;
  title: string;
  category: 'Systematic Review' | 'Clinical Validation' | 'Hypothesis Audit' | 'Quantitative Benchmark' | 'Interdisciplinary';
  subtitle: string;
  badge: string;
  icon: string;
  description: string;
  defaultQuery: string;
  stepSequence: AgentId[];
  recommendedPreset: 'all-gemini' | 'all-ollama' | 'hybrid';
  agentRolesSummary: string[];
}

export const PIPELINE_PRESETS: PipelinePreset[] = [
  {
    id: 'preset-systematic-review',
    taskId: 'systematic-review',
    title: 'Systematic Literature Review Pipeline',
    category: 'Systematic Review',
    subtitle: '5-Agent Comprehensive Academic Synthesis',
    badge: 'Publication Review',
    icon: 'FileText',
    description: 'Full end-to-end systematic literature review. Scout extracts verbatim quotes, Auditor evaluates methodology and sample sizes, Analyst maps consensus vs controversy, Synthesizer drafts the manuscript, and Validator produces a peer review scorecard.',
    defaultQuery: 'Synthesize continuous non-invasive vital sign sensing architectures, comparing optical PPG with FMCW radar across clinical error bounds and ambulatory motion resilience.',
    stepSequence: ['retrieval-scout', 'methodology-auditor', 'consensus-analyst', 'synthesis-author', 'peer-reviewer'],
    recommendedPreset: 'all-gemini',
    agentRolesSummary: [
      '🔍 Literature Retriever: Quote & Chunk Extractor',
      '⚖️ Methodology Auditor: Experimental Design Audit',
      '⚡ Consensus Analyst: Cross-Paper Debate Mapping',
      '🧠 Synthesizer: Publication Manuscript Drafter',
      '🛡️ Validator: Citation Audit & Quality Scorecard'
    ]
  },
  {
    id: 'preset-clinical-protocol',
    taskId: 'systematic-review',
    title: 'Clinical Protocol & Trial Validator Pipeline',
    category: 'Clinical Validation',
    subtitle: 'Rigor & Sample Size Verification Swarm',
    badge: 'Clinical Trial Rigor',
    icon: 'Stethoscope',
    description: 'Specialized for clinical trials, FDA/CE compliance, and medical hardware validation. Focuses on trial cohort sizes, reference gold standards (ECG, Holter, spirometry), MAE/RMSE bounds, and safety threats.',
    defaultQuery: 'Validate clinical trial protocols for contactless respiratory and cardiac monitoring, verifying cohort sample sizes, reference gold standards (12-lead ECG), and clinical error bounds.',
    stepSequence: ['retrieval-scout', 'methodology-auditor', 'peer-reviewer'],
    recommendedPreset: 'hybrid',
    agentRolesSummary: [
      '🔍 Literature Retriever: Extract Clinical Cohorts & Hardware Specs',
      '⚖️ Methodology Auditor: Evaluate MAE/RMSE & Gold Standards',
      '🛡️ Validator: Compute Clinical Compliance & Safety Scorecard'
    ]
  },
  {
    id: 'preset-hypothesis-stress-test',
    taskId: 'hypothesis-test',
    title: 'Research Hypothesis Generator & Stress-Tester Pipeline',
    category: 'Hypothesis Audit',
    subtitle: 'Adversarial Counter-Evidence Swarm',
    badge: 'Adversarial Debate',
    icon: 'ShieldCheck',
    description: 'Formulate and stress-test bold scientific hypotheses. The swarm searches for counter-evidence, evaluates edge cases (e.g. motion artifacts, skin phototype bias), and challenges assumptions before publication.',
    defaultQuery: 'Hypothesis: Contactless FMCW millimeter-wave radar can completely replace wearable optical PPG in continuous ICU cardiac rhythm surveillance under ambulatory exercise.',
    stepSequence: ['retrieval-scout', 'consensus-analyst', 'methodology-auditor', 'synthesis-author', 'peer-reviewer'],
    recommendedPreset: 'all-gemini',
    agentRolesSummary: [
      '🔍 Literature Retriever: Isolate Target Evidence & Claim Spans',
      '⚡ Consensus Analyst: Detect Opposing Author Stances & Debates',
      '⚖️ Methodology Auditor: Audit Flaws, Limitations & Biases',
      '🧠 Synthesizer: Draft Adversarial Hypothesis Critique Report',
      '🛡️ Validator: Assess Validity Rating & Citation Fidelity'
    ]
  },
  {
    id: 'preset-benchmark-gap-matrix',
    taskId: 'benchmark-gap',
    title: 'Cross-Corpus Benchmark & Gap Matrix Pipeline',
    category: 'Quantitative Benchmark',
    subtitle: 'MAE/RMSE Extraction & Unmet Research Needs',
    badge: 'Benchmark Analytics',
    icon: 'TrendingUp',
    description: 'Extracts all reported numerical performance metrics (MAE, RMSE, Pearson r, AUROC, SNR) across the corpus, constructs a comparative markdown matrix, and highlights unaddressed research gaps.',
    defaultQuery: 'Extract reported MAE, RMSE, Pearson correlation coefficients, and SNR values across all ingested manuscripts, constructing a comparative benchmark table and identifying unaddressed research gaps.',
    stepSequence: ['retrieval-scout', 'methodology-auditor', 'synthesis-author', 'peer-reviewer'],
    recommendedPreset: 'hybrid',
    agentRolesSummary: [
      '🔍 Literature Retriever: Extract Reported Numerical Benchmarks',
      '⚖️ Methodology Auditor: Normalize Hardware & Dataset Conditions',
      '🧠 Synthesizer: Construct Comparative Markdown Performance Matrix',
      '🛡️ Validator: Audit Numerical Fidelity & Gap Matrix Scorecard'
    ]
  },
  {
    id: 'preset-interdisciplinary-discourse',
    taskId: 'custom-workflow',
    title: 'Interdisciplinary & Qualitative Discourse Synthesizer',
    category: 'Interdisciplinary',
    subtitle: 'Thematic Concordance & Theoretical Mapping',
    badge: 'Qualitative Synthesis',
    icon: 'Layers',
    description: 'Ideal for humanities, social sciences, computer science theory, and law. Performs close readings, qualitative thematic synthesis, conceptual mapping, and links core tenets to source citations.',
    defaultQuery: 'Analyze theoretical frameworks, qualitative arguments, and conceptual themes across ingested manuscripts, synthesizing an integrated discourse map anchored with source citations.',
    stepSequence: ['retrieval-scout', 'consensus-analyst', 'synthesis-author', 'peer-reviewer'],
    recommendedPreset: 'all-ollama',
    agentRolesSummary: [
      '🔍 Literature Retriever: Extract Key Passages & Theoretical Concepts',
      '⚡ Consensus Analyst: Map Competing Interpretations & Discourse',
      '🧠 Synthesizer: Write Integrated Qualitative Synthesis Review',
      '🛡️ Validator: Verify Citation Alignment & Textual Grounding'
    ]
  }
];

interface PresetLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PipelinePreset) => void;
}

export const PresetLibraryModal: React.FC<PresetLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePresetId, setActivePresetId] = useState<string>(PIPELINE_PRESETS[0].id);

  if (!isOpen) return null;

  const categories = ['All', 'Systematic Review', 'Clinical Validation', 'Hypothesis Audit', 'Quantitative Benchmark', 'Interdisciplinary'];

  const filteredPresets = selectedCategory === 'All' 
    ? PIPELINE_PRESETS 
    : PIPELINE_PRESETS.filter(p => p.category === selectedCategory);

  const activePreset = PIPELINE_PRESETS.find(p => p.id === activePresetId) || PIPELINE_PRESETS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Multi-Agent Swarm Preset Library</span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-mono">
                  {PIPELINE_PRESETS.length} Pre-Configured Workflows
                </span>
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Select pre-configured agent collaboration pipelines to instantly initialize inquiry prompts, agent sequences, and model defaults
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Badges */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0 text-xs font-bold">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Body: 2-Column Preset Explorer */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
          
          {/* Left Column: Preset List */}
          <div className="md:col-span-5 p-4 overflow-y-auto space-y-2.5 max-h-[420px] md:max-h-none">
            {filteredPresets.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setActivePresetId(preset.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                      : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {preset.badge}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                    </div>

                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 mb-1">
                      {preset.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {preset.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{preset.stepSequence.length} Agents Sequence</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-0.5">
                      View Details <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Preset Inspector */}
          <div className="md:col-span-7 p-6 overflow-y-auto space-y-5 bg-slate-50/50 dark:bg-slate-950/30">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold font-mono">
                  {activePreset.category}
                </span>
                <span className="text-xs text-slate-400">&bull; {activePreset.stepSequence.length} Swarm Agents</span>
              </div>

              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {activePreset.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                {activePreset.description}
              </p>
            </div>

            {/* Agent Sequence Summary Box */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-indigo-500" />
                <span>Agent Pipeline Execution Sequence</span>
              </h4>

              <div className="space-y-1.5 pt-1 text-xs">
                {activePreset.agentRolesSummary.map((roleSummary, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                    <span className="w-5 h-5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      0{i + 1}
                    </span>
                    <span>{roleSummary}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Default Research Inquiry Prompt Box */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Default Initialized Research Prompt</span>
              </h4>

              <p className="text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                "{activePreset.defaultQuery}"
              </p>
            </div>

            {/* Recommended Provider Tag */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Recommended Engine Setup:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                {activePreset.recommendedPreset === 'all-gemini' ? '⚡ Google Gemini 2.5 Flash' : activePreset.recommendedPreset === 'all-ollama' ? '🔒 100% Offline Ollama' : '🔀 Hybrid Swarm Mode'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectPreset(activePreset);
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 active:scale-98 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Apply Pipeline Preset & Initialize Swarm</span>
          </button>
        </div>

      </div>
    </div>
  );
};
