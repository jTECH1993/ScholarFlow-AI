import React, { useState } from 'react';
import { 
  User, 
  Sliders, 
  Key, 
  ShieldCheck, 
  Check, 
  Building2, 
  Mail, 
  Sparkles, 
  Tag, 
  X, 
  Plus, 
  Save, 
  Cpu, 
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserProfile, RAGSettings, OllamaSettings, LLMProvider } from '../types';

interface SettingsProfilePageProps {
  currentUser: UserProfile | null;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  ragSettings: RAGSettings;
  setRagSettings: React.Dispatch<React.SetStateAction<RAGSettings>>;
  provider: LLMProvider;
  setProvider: (p: LLMProvider) => void;
  ollamaSettings: OllamaSettings;
  setOllamaSettings: React.Dispatch<React.SetStateAction<OllamaSettings>>;
}

export const SettingsProfilePage: React.FC<SettingsProfilePageProps> = ({
  currentUser,
  onUpdateProfile,
  ragSettings,
  setRagSettings,
  provider,
  setProvider,
  ollamaSettings,
  setOllamaSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security' | 'api-keys'>('profile');

  // Profile Form State
  const [displayName, setDisplayName] = useState(currentUser?.displayName || (currentUser ? 'Scholar' : 'Guest Scholar'));
  const [email, setEmail] = useState(currentUser?.email || '');
  const [organization, setOrganization] = useState(currentUser?.organization || (currentUser ? 'Research Institution' : 'Open Academic Access'));
  const [role, setRole] = useState(currentUser?.role || 'Academic Researcher');
  const [interests, setInterests] = useState<string[]>([
    'Vital Signs',
    'UWB Radar',
    'Affective Computing',
    'Biomedical Signal Processing'
  ]);
  const [newTagInput, setNewTagInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const initials = (displayName || email || 'GS')
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'GS';

  // Ollama test state
  const [testingOllama, setTestingOllama] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleAddTag = () => {
    if (newTagInput.trim() && !interests.includes(newTagInput.trim())) {
      setInterests([...interests, newTagInput.trim()]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setInterests(interests.filter(t => t !== tag));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      displayName,
      email,
      organization,
      role,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

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
            'Could not reach Ollama at the specified URL.',
        });
      }
    } catch {
      setTestResult({ success: false, message: 'Network error connecting to Ollama.' });
    } finally {
      setTestingOllama(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/70 p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Account & Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your researcher identity, academic affiliations, and RAG retrieval configurations.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center space-x-1 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'profile'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preferences')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'preferences'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>RAG & Preferences</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'security'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Security & Sessions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('api-keys')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
              activeTab === 'api-keys'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>API & Models</span>
          </button>
        </div>

        {/* Tab 1: Profile View matching Image 2 Panel 10 */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Guest Banner if not signed in */}
            {!currentUser && (
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-start space-x-3 text-xs">
                <User className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-teal-900">Guest Scholar Session</div>
                  <p className="text-teal-800 text-2xs leading-relaxed">
                    You are currently customizing settings for your active session. To keep your name, organization, preferences, and citations saved permanently across devices, you can sign in or create an account at any time from the top right.
                  </p>
                </div>
              </div>
            )}

            {/* Avatar & Summary Card */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-slate-100">
              <div className="w-20 h-20 rounded-full bg-teal-700 text-white font-black text-2xl flex items-center justify-center shadow-md ring-4 ring-teal-50">
                {initials}
              </div>
              <div className="text-center sm:text-left space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">{displayName}</h3>
                <p className="text-xs text-slate-500">{email || 'guest@scholarflow.ai'}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-3xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                    {organization || 'Open Academic Access'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-3xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {role}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Edit Form */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">
                    Academic Institution / Affiliation
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">
                    Academic Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl outline-hidden"
                  >
                    <option value="Academic Researcher">Academic Researcher</option>
                    <option value="Clinician">Clinician</option>
                    <option value="Biomedical Engineer">Biomedical Engineer</option>
                    <option value="HealthTech Founder">HealthTech Founder</option>
                    <option value="Student">Student / Postgraduate</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>
              </div>

              {/* Research Interests Tags */}
              <div className="space-y-2 pt-2">
                <label className="block text-2xs font-bold uppercase text-slate-500">
                  Research Interests
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {interests.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-900 border border-teal-200"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-teal-500 hover:text-teal-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  
                  <div className="inline-flex items-center space-x-1">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      placeholder="+ Add Interest..."
                      className="px-3 py-1 text-xs border border-dashed border-slate-300 rounded-full outline-hidden focus:border-teal-500 w-36"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit & Status */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {savedSuccess ? (
                  <span className="text-xs text-emerald-700 font-bold flex items-center space-x-1">
                    <Check className="w-4 h-4" />
                    <span>Profile saved successfully!</span>
                  </span>
                ) : (
                  <span className="text-3xs text-slate-400">
                    Changes apply immediately across all your active sessions.
                  </span>
                )}

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-2xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Preferences (RAG Settings) */}
        {activeTab === 'preferences' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">RAG & Retrieval Preferences</h3>
              <p className="text-xs text-slate-500">Fine-tune the hybrid search and citation extraction pipeline.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">
                  Retrieval Strategy
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['hybrid', 'dense', 'bm25'] as const).map((strategy) => (
                    <button
                      key={strategy}
                      type="button"
                      onClick={() => setRagSettings(prev => ({ ...prev, retrievalStrategy: strategy }))}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        ragSettings.retrievalStrategy === strategy
                          ? 'border-teal-500 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <div className="text-xs capitalize font-bold">{strategy}</div>
                      <div className="text-3xs text-slate-400 mt-0.5">
                        {strategy === 'hybrid' ? 'Dense Vector + BM25' : strategy === 'dense' ? 'Vector Embeddings' : 'Keyword Exact Match'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex justify-between text-2xs font-bold uppercase text-slate-500 mb-1">
                    <span>Top-K Retrieved Chunks</span>
                    <span className="text-teal-700">{ragSettings.topK} chunks</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={ragSettings.topK}
                    onChange={(e) => setRagSettings(prev => ({ ...prev, topK: Number(e.target.value) }))}
                    className="w-full accent-teal-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-2xs font-bold uppercase text-slate-500 mb-1">
                    <span>Cosine Similarity Threshold</span>
                    <span className="text-teal-700">{ragSettings.similarityThreshold}</span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={0.9}
                    step={0.05}
                    value={ragSettings.similarityThreshold}
                    onChange={(e) => setRagSettings(prev => ({ ...prev, similarityThreshold: Number(e.target.value) }))}
                    className="w-full accent-teal-600"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Security & Session Isolation */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Security & Session Isolation</h3>
            <p className="text-xs text-slate-500">
              ScholarFlow AI uses strict cryptographic session isolation. Your uploaded papers are embedded solely in ephemeral in-memory vector stores tagged with your session token.
            </p>
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-2">
              <div className="flex items-center space-x-2 text-teal-900 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Zero Cross-Tenant Data Leakage</span>
              </div>
              <p className="text-3xs text-teal-800 leading-relaxed">
                No user can query or inspect documents uploaded in another session. Prompts are assembled dynamically per request and purged upon completion.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: API & Models */}
        {activeTab === 'api-keys' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">LLM Provider & Model Execution</h3>
              <p className="text-xs text-slate-500">Choose between cloud Gemini and local self-hosted Ollama.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => setProvider('gemini')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  provider === 'gemini'
                    ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-extrabold text-sm text-slate-900">Gemini 2.5 Flash</div>
                  {provider === 'gemini' && <Check className="w-4 h-4 text-teal-600" />}
                </div>
                <p className="text-3xs text-slate-500">
                  Google Cloud server-side API. Ultra-fast multimodal reasoning with vision and LaTeX parsing.
                </p>
              </div>

              <div 
                onClick={() => setProvider('ollama')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  provider === 'ollama'
                    ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-extrabold text-sm text-slate-900">Local Ollama</div>
                  {provider === 'ollama' && <Check className="w-4 h-4 text-teal-600" />}
                </div>
                <p className="text-3xs text-slate-500">
                  Self-hosted offline execution via Ollama (Llama 3, Mistral, MedLlama).
                </p>
              </div>
            </div>

            {provider === 'ollama' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-2xs font-bold uppercase text-slate-500">
                  Ollama HTTP Endpoint
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={ollamaSettings.endpoint}
                    onChange={(e) => setOllamaSettings(prev => ({ ...prev, endpoint: e.target.value }))}
                    className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleTestOllama}
                    disabled={testingOllama}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
                  >
                    {testingOllama ? 'Testing...' : 'Test Connection'}
                  </button>
                </div>
                {testResult && (
                  <p className={`text-2xs font-medium ${testResult.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {testResult.message}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
