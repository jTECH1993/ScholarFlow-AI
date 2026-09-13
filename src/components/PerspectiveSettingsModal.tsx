import React, { useState } from 'react';
import { 
  X, 
  Stethoscope, 
  Activity, 
  Cpu, 
  Heart, 
  TrendingUp, 
  Radio, 
  Wind, 
  Save, 
  Sparkles, 
  Sliders, 
  Check, 
  HelpCircle,
  RotateCcw,
  BookOpen,
  FileText,
  Layers
} from 'lucide-react';
import { CLINICAL_PERSPECTIVES } from '../data/clinicalPerspectives';
import { ClinicalPerspectiveId, UserProfile, VitalModality } from '../types';

interface PerspectiveSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSaveProfile: (updated: Partial<UserProfile>) => Promise<void>;
}

export const PerspectiveSettingsModal: React.FC<PerspectiveSettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveProfile,
}) => {
  const [selectedPerspectiveId, setSelectedPerspectiveId] = useState<ClinicalPerspectiveId>(currentUser.perspectiveId);
  const [customInstructions, setCustomInstructions] = useState(
    currentUser.perspectiveCustomInstructions || ''
  );
  const [preferredModality, setPreferredModality] = useState<VitalModality | 'all'>(
    currentUser.preferredModalityFilter || 'all'
  );
  const [retrievalStrategy, setRetrievalStrategy] = useState<'hybrid' | 'dense' | 'bm25'>(
    currentUser.retrievalStrategy || 'hybrid'
  );
  const [topK, setTopK] = useState(currentUser.topK || 5);
  const [similarityThreshold, setSimilarityThreshold] = useState(currentUser.similarityThreshold || 0.03);
  const [temperature, setTemperature] = useState(currentUser.temperature || 0.2);
  const [isSaving, setIsSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (pId: ClinicalPerspectiveId) => {
    setSelectedPerspectiveId(pId);
    const found = CLINICAL_PERSPECTIVES.find(p => p.id === pId);
    if (found) {
      setCustomInstructions(found.systemPromptGuideline);
      setPreferredModality(found.defaultModality);
      setRetrievalStrategy(found.defaultRetrievalStrategy);
      setTopK(found.defaultTopK);
      setSimilarityThreshold(found.defaultSimilarityThreshold);
    }
  };

  const handleResetToPreset = () => {
    const found = CLINICAL_PERSPECTIVES.find(p => p.id === selectedPerspectiveId);
    if (found) {
      setCustomInstructions(found.systemPromptGuideline);
      setPreferredModality(found.defaultModality);
      setRetrievalStrategy(found.defaultRetrievalStrategy);
      setTopK(found.defaultTopK);
      setSimilarityThreshold(found.defaultSimilarityThreshold);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const found = CLINICAL_PERSPECTIVES.find(p => p.id === selectedPerspectiveId);

    try {
      await onSaveProfile({
        perspectiveId: selectedPerspectiveId,
        perspectiveName: found ? found.name : 'Custom Academic Perspective',
        perspectiveCustomInstructions: customInstructions,
        preferredModalityFilter: preferredModality,
        retrievalStrategy,
        topK,
        similarityThreshold,
        temperature,
      });

      setSavedNotice(true);
      setTimeout(() => {
        setSavedNotice(false);
        onClose();
      }, 700);
    } catch (err) {
      console.error('Failed to update perspective:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Customize My Dedicated RAG Perspective
              </h3>
              <p className="text-3xs text-slate-400">
                User: {currentUser.displayName} &bull; {currentUser.organization}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSave} className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Preset Perspective Selector */}
          <div>
            <label className="block text-2xs font-bold text-slate-700 mb-1.5">
              Select Research Perspective Preset
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CLINICAL_PERSPECTIVES.map((p) => {
                const isSelected = selectedPerspectiveId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPreset(p.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-1 ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/70 shadow-xs ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {p.id === 'academic-scholar' && <BookOpen className="w-3.5 h-3.5" />}
                        {p.id === 'vital-sign-rag' && <Activity className="w-3.5 h-3.5" />}
                        {p.id === 'cs-ai-systems' && <Cpu className="w-3.5 h-3.5" />}
                        {p.id === 'english-literature' && <FileText className="w-3.5 h-3.5" />}
                        {p.id === 'critical-care' && <Stethoscope className="w-3.5 h-3.5" />}
                        {p.id === 'wearables-ppg' && <Layers className="w-3.5 h-3.5" />}
                        {p.id === 'cardiology-ecg' && <Heart className="w-3.5 h-3.5" />}
                        {p.id === 'cuffless-bp' && <TrendingUp className="w-3.5 h-3.5" />}
                        {p.id === 'touchless-radar-rppg' && <Radio className="w-3.5 h-3.5" />}
                        {p.id === 'pediatric-respiratory' && <Wind className="w-3.5 h-3.5" />}
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-teal-700" />}
                    </div>
                    <div>
                      <p className="text-2xs font-bold text-slate-900 leading-tight">
                        {p.name}
                      </p>
                      <p className="text-3xs text-slate-500 line-clamp-1 mt-0.5">
                        {p.badge}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom System Prompt Directives */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-2xs font-bold text-slate-700 flex items-center space-x-1">
                <span>Personalized Scholar &amp; Research Directives (Injected in every query)</span>
                <Sparkles className="w-3 h-3 text-amber-500" />
              </label>
              <button
                type="button"
                onClick={handleResetToPreset}
                className="text-3xs text-teal-700 hover:text-teal-900 flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Preset</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              placeholder="e.g. Always emphasize rigorous methodology, demand empirical evaluation or primary textual citations, and highlight comparative benchmarks..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-2xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-teal-600 focus:bg-white leading-relaxed"
            />
            <p className="text-3xs text-slate-500 mt-1">
              These academic guidelines instruct Gemini and Ollama on tone, evidence priority, methodological rigor, and domain standards.
            </p>
          </div>

          {/* Fine-Tuning Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="block text-3xs font-bold text-slate-700 mb-1">
                Preferred Modality / Focus
              </label>
              <select
                value={preferredModality}
                onChange={(e) => setPreferredModality(e.target.value as any)}
                className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-2xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
              >
                <option value="all">All Domains &amp; Modalities (Universal)</option>
                <option value="Photoplethysmography (PPG)">Photoplethysmography (PPG)</option>
                <option value="Blood Pressure (BP)">Blood Pressure (BP)</option>
                <option value="Electrocardiogram (ECG & HRV)">Electrocardiogram (ECG & HRV)</option>
                <option value="Remote Camera rPPG">Remote Camera rPPG</option>
                <option value="Radar & RF Sensing">Radar & RF Sensing</option>
                <option value="Respiratory Rate (RR)">Respiratory Rate (RR)</option>
                <option value="ICU Sepsis & Deterioration">ICU Sepsis & Deterioration</option>
                <option value="Multimodal Wearables">Multimodal Wearables</option>
              </select>
            </div>

            <div>
              <label className="block text-3xs font-bold text-slate-700 mb-1">
                Retrieval Strategy
              </label>
              <select
                value={retrievalStrategy}
                onChange={(e) => setRetrievalStrategy(e.target.value as any)}
                className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-2xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
              >
                <option value="hybrid">Hybrid (Dense Cosine + BM25 Lexical)</option>
                <option value="dense">Dense Semantic Only</option>
                <option value="bm25">BM25 Keyword Sparse Only</option>
              </select>
            </div>

            <div>
              <label className="block text-3xs font-bold text-slate-700 mb-1">
                Top-K Chunks Retrieved: <span className="text-teal-700">{topK}</span>
              </label>
              <input
                type="range"
                min={2}
                max={10}
                step={1}
                value={topK}
                onChange={(e) => setTopK(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-3xs text-slate-400">
              Changes persist securely to your individual tenant profile in Firestore.
            </span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5 disabled:opacity-50"
              >
                {savedNotice ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? 'Saving...' : 'Apply Perspective'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
