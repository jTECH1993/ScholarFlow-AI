import React, { useState } from 'react';
import { 
  FileCode2, 
  Download, 
  Copy, 
  Check, 
  FolderCheck, 
  Terminal, 
  CheckCircle2, 
  ExternalLink,
  BookMarked
} from 'lucide-react';
import { 
  STREAMLIT_CODE, 
  FASTAPI_BACKEND_CODE, 
  REQUIREMENTS_TXT, 
  USER_LOCAL_FOLDER 
} from '../data/exportScripts';

export const SubmissionExporter: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'streamlit' | 'fastapi' | 'requirements'>('streamlit');
  const [copied, setCopied] = useState(false);

  const getActiveCode = () => {
    switch (activeFile) {
      case 'streamlit':
        return STREAMLIT_CODE;
      case 'fastapi':
        return FASTAPI_BACKEND_CODE;
      case 'requirements':
        return REQUIREMENTS_TXT;
    }
  };

  const getFileName = () => {
    switch (activeFile) {
      case 'streamlit':
        return 'app_streamlit.py';
      case 'fastapi':
        return 'backend_fastapi.py';
      case 'requirements':
        return 'requirements.txt';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const code = getActiveCode();
    const fileName = getFileName();
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-teal-700">
            <FileCode2 className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Academic Project Submission & Local Run Package
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
            Turnkey Python scripts customized with your exact local folder path for tomorrow&apos;s presentation.
            Supports both <strong>Streamlit + LangChain</strong> and <strong>FastAPI + React</strong> architectures.
          </p>

          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-900 text-xs flex items-center space-x-2">
            <FolderCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <div>
              <span className="font-semibold">Preconfigured Local Directory: </span>
              <code className="bg-white px-2 py-0.5 rounded border border-teal-300 font-mono text-2xs text-teal-800">
                {USER_LOCAL_FOLDER}
              </code>
            </div>
          </div>
        </div>

        {/* Presentation Checklist */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <BookMarked className="w-4 h-4 text-teal-600" />
            <span>Tomorrow&apos;s Project Presentation Checklist</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">1. Live Web Demo</strong>
                <span className="text-slate-500 text-2xs">
                  Present this active cloud applet directly in your browser with zero setup latency.
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">2. Local Streamlit Run</strong>
                <span className="text-slate-500 text-2xs">
                  Run <code>streamlit run app_streamlit.py</code> on your laptop using local Ollama.
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">3. Grounded Citations</strong>
                <span className="text-slate-500 text-2xs">
                  Demonstrate chunk inspection and academic verification across all 43 papers.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Viewer & Download Box */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
          {/* File Switcher Header */}
          <div className="p-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => setActiveFile('streamlit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeFile === 'streamlit'
                    ? 'bg-teal-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                app_streamlit.py
              </button>

              <button
                type="button"
                onClick={() => setActiveFile('fastapi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeFile === 'fastapi'
                    ? 'bg-teal-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                backend_fastapi.py
              </button>

              <button
                type="button"
                onClick={() => setActiveFile('requirements')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeFile === 'requirements'
                    ? 'bg-teal-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                requirements.txt
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1.5 border border-slate-700"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Script</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {getFileName()}</span>
              </button>
            </div>
          </div>

          {/* Code Text Area */}
          <div className="p-4 overflow-x-auto max-h-[480px] bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed">
            <pre className="whitespace-pre">
              <code>{getActiveCode()}</code>
            </pre>
          </div>
        </div>

        {/* Local Command Line Execution Guide */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
            <Terminal className="w-4 h-4 text-slate-700" />
            <span>How to Run on Windows (Quick 3-Step Guide)</span>
          </h3>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-900">Step 1: Install Python dependencies</span>
              <div className="bg-slate-900 text-emerald-400 p-2 rounded font-mono text-2xs">
                pip install -r requirements.txt
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-900">Step 2: Ensure Ollama is running locally</span>
              <div className="bg-slate-900 text-emerald-400 p-2 rounded font-mono text-2xs">
                ollama serve
              </div>
              <p className="text-2xs text-slate-500">
                You already have <code>nomic-embed-text</code>, <code>llama3.2:3b</code>, and <code>qwen2.5:3b</code> ready in your command prompt!
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-900">Step 3: Launch the Streamlit application</span>
              <div className="bg-slate-900 text-emerald-400 p-2 rounded font-mono text-2xs">
                streamlit run app_streamlit.py
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
