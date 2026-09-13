import React, { useState } from 'react';
import { 
  Sliders, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Zap,
  Info,
  Server
} from 'lucide-react';
import { RAGSettings, OllamaSettings, LLMProvider } from '../types';
import { VITAL_MODALITIES } from '../data/vitalSignPapers';

interface SettingsViewProps {
  provider: LLMProvider;
  setProvider: (p: LLMProvider) => void;
  ragSettings: RAGSettings;
  setRagSettings: React.Dispatch<React.SetStateAction<RAGSettings>>;
  ollamaSettings: OllamaSettings;
  setOllamaSettings: React.Dispatch<React.SetStateAction<OllamaSettings>>;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  provider,
  setProvider,
  ragSettings,
  setRagSettings,
  ollamaSettings,
  setOllamaSettings,
}) => {
  const [testingOllama, setTestingOllama] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleTestOllama = async () => {
    setTestingOllama(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/ollama/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: ollamaSettings.endpoint }),
      });
      const data = await res.json() as { connected: boolean; models?: string[]; error?: string; hint?: string };
      if (data.connected) {
        setOllamaSettings((prev) => ({
          ...prev,
          isConnected: true,
          availableModels: data.models && data.models.length > 0 ? data.models : prev.availableModels,
        }));
        setTestResult({
          success: true,
          message: `Connected! Found ${data.models?.length || 0} models installed in Ollama.`,
        });
      } else {
        setOllamaSettings((prev) => ({ ...prev, isConnected: false }));
        setTestResult({
          success: false,
          message:
            data.hint ||
            data.error ||
            'Could not reach Ollama at the specified URL. When running in a cloud container, local loopback (127.0.0.1) stays on your personal computer. You can use Gemini 3.8 Flash for instant cloud demonstration!',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setTestResult({
        success: false,
        message: `Connection failed: ${msg}. If running in cloud preview, use Gemini 3.8 Flash or use an exposed network endpoint.`,
      });
    } finally {
      setTestingOllama(false);
    }
  };

  const handleResetDefaults = () => {
    setRagSettings({
      topK: 4,
      chunkOverlap: 200,
      similarityThreshold: 0.05,
      retrievalStrategy: 'hybrid',
      temperature: 0.2,
      filterModality: 'all',
      provider: 'gemini',
    });
    setTestResult(null);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-teal-700">
            <Sliders className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              RAG Pipeline & Model Configuration
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tune chunk retrieval parameters, similarity thresholds, and toggle between cloud-hosted <strong>Gemini 2.5 Flash</strong> and local <strong>Ollama</strong>.
          </p>
        </div>

        {/* LLM Engine Selection */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-teal-600" />
            <span>Primary LLM Inference Engine</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gemini Option */}
            <div
              onClick={() => setProvider('gemini')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                provider === 'gemini'
                  ? 'border-teal-600 bg-teal-50/50 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Gemini 2.5 Flash</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cloud-native generation with zero latency, high biological & clinical reasoning, and automated grounding. Ideal for immediate live class demonstration.
              </p>
              <span className="inline-block mt-3 px-2 py-0.5 rounded text-2xs font-semibold bg-emerald-100 text-emerald-800">
                Cloud Active
              </span>
            </div>

            {/* Ollama Option */}
            <div
              onClick={() => setProvider('ollama')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                provider === 'ollama'
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  <span>Local Ollama</span>
                </div>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    ollamaSettings.isConnected ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}
                ></span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Runs completely on your desktop hardware using open-source weights (Llama 3.2, Qwen 2.5, DeepSeek R1). Automatic fallback to Gemini if unreachable.
              </p>
              <span className="inline-block mt-3 px-2 py-0.5 rounded text-2xs font-semibold bg-indigo-100 text-indigo-800">
                Selected: {ollamaSettings.selectedModel}
              </span>
            </div>
          </div>
        </div>

        {/* Ollama Connection Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Server className="w-4 h-4 text-indigo-600" />
            <span>Ollama Local Server Settings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-2xs font-semibold text-slate-600 uppercase mb-1">
                Ollama Endpoint URL
              </label>
              <input
                type="text"
                value={ollamaSettings.endpoint}
                onChange={(e) =>
                  setOllamaSettings((prev) => ({ ...prev, endpoint: e.target.value }))
                }
                placeholder="http://localhost:11434"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
              />
              <span className="text-2xs text-slate-400 mt-1 block">
                Default: <code>http://localhost:11434</code>
              </span>
            </div>

            <div>
              <label className="block text-2xs font-semibold text-slate-600 uppercase mb-1">
                Active Local Model
              </label>
              <select
                value={ollamaSettings.selectedModel}
                onChange={(e) =>
                  setOllamaSettings((prev) => ({ ...prev, selectedModel: e.target.value }))
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              >
                {ollamaSettings.availableModels.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <span className="text-2xs text-slate-400 mt-1 block">
                Matched to models detected in your local cmd prompt
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="button"
              onClick={handleTestOllama}
              disabled={testingOllama}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 shadow-xs"
            >
              {testingOllama ? 'Pinging Ollama...' : 'Test Connection'}
            </button>
          </div>

          {testResult && (
            <div
              className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                testResult.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex items-start space-x-2">
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <strong className="block font-semibold mb-0.5">
                    {testResult.success ? 'Connection Verified' : 'Local Connection Notice'}
                  </strong>
                  <span>{testResult.message}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RAG Retrieval Parameters */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-teal-600" />
              <span>Retrieval-Augmented Generation Tuning</span>
            </h3>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Top-K */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">Top-K Retrieved Chunks</label>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {ragSettings.topK} Chunks
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                step={1}
                value={ragSettings.topK}
                onChange={(e) =>
                  setRagSettings((prev) => ({ ...prev, topK: Number(e.target.value) }))
                }
                className="w-full accent-teal-600"
              />
              <p className="text-2xs text-slate-400">
                Number of highest-scoring document chunks passed into the LLM synthesis context.
              </p>
            </div>

            {/* Similarity Threshold */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">Similarity Cutoff Score</label>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {(ragSettings.similarityThreshold * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min={0.01}
                max={0.3}
                step={0.01}
                value={ragSettings.similarityThreshold}
                onChange={(e) =>
                  setRagSettings((prev) => ({
                    ...prev,
                    similarityThreshold: Number(e.target.value),
                  }))
                }
                className="w-full accent-teal-600"
              />
              <p className="text-2xs text-slate-400">
                Filters out non-relevant chunks whose cosine similarity falls below this score.
              </p>
            </div>

            {/* Temperature */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">LLM Temperature</label>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {ragSettings.temperature} (Factual)
                </span>
              </div>
              <input
                type="range"
                min={0.0}
                max={1.0}
                step={0.05}
                value={ragSettings.temperature}
                onChange={(e) =>
                  setRagSettings((prev) => ({
                    ...prev,
                    temperature: Number(e.target.value),
                  }))
                }
                className="w-full accent-teal-600"
              />
              <p className="text-2xs text-slate-400">
                Lower values (0.1–0.2) ensure strictly grounded answers without model hallucination.
              </p>
            </div>

            {/* Modality Filter */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-700 block">Corpus Modality Filter</label>
              <select
                value={ragSettings.filterModality || 'all'}
                onChange={(e) =>
                  setRagSettings((prev) => ({ ...prev, filterModality: e.target.value as any }))
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              >
                {VITAL_MODALITIES.map((mod) => (
                  <option key={mod} value={mod === 'All Modalities' ? 'all' : mod}>
                    {mod}
                  </option>
                ))}
              </select>
              <p className="text-2xs text-slate-400">
                Restricts retrieval to specific sensor categories (e.g. only Blood Pressure or Radar).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
