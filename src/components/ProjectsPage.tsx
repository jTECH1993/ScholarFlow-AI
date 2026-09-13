import React, { useState } from 'react';
import { 
  Folder, 
  Plus, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Clock, 
  Tag, 
  ExternalLink,
  MessageSquare,
  GitCompare,
  Trash2,
  Edit2
} from 'lucide-react';
import { ResearchProjectItem, ActiveResearchDomain } from '../types';
import { DEMO_PROJECTS } from '../data/researchDomainTopics';
import { AppNavTab } from './LeftSidebar';

interface ProjectsPageProps {
  onNavigateTab: (tab: AppNavTab) => void;
  onSetDomain: (domain: ActiveResearchDomain) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigateTab,
  onSetDomain,
}) => {
  const [projects, setProjects] = useState<ResearchProjectItem[]>(DEMO_PROJECTS);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Biomedical');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newProj: ResearchProjectItem = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      paperCount: 0,
      updatedAgo: 'Just now',
      category: newCategory,
      description: newDesc || 'Custom research project collection.',
      tags: [newCategory, 'Research']
    };
    setProjects([newProj, ...projects]);
    setNewTitle('');
    setNewDesc('');
    setShowNewModal(false);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/70 p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Research Projects
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Organize your literature reviews, experimental datasets, and conference submissions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors inline-flex items-center space-x-1.5 shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-teal-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
                      <Folder className="w-4 h-4" />
                    </div>
                    <span className="text-2xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {proj.category}
                    </span>
                  </div>
                  <span className="text-3xs text-slate-400">{proj.updatedAgo}</span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-3xs px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-slate-500 font-medium text-2xs">
                  <strong>{proj.paperCount}</strong> papers indexed
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (proj.title.includes('Radar')) {
                        onSetDomain('fmcw-radar');
                      } else if (proj.title.includes('Blood Pressure')) {
                        onSetDomain('vital-signs-ppg');
                      }
                      onNavigateTab('chat');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-2xs flex items-center space-x-1 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                    <span>Open in Chat</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigateTab('literature')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-2xs flex items-center space-x-1 cursor-pointer"
                  >
                    <GitCompare className="w-3.5 h-3.5 text-slate-500" />
                    <span>Review Matrix</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(proj.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-600 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Project Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h2 className="text-base font-bold text-slate-900">Create New Research Project</h2>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. FMCW mmWave Vital Signs for Sleep Apnea"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-hidden focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Domain Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-hidden focus:border-teal-500 bg-white"
                >
                  <option value="Biomedical">Biomedical</option>
                  <option value="Signal Processing">Signal Processing</option>
                  <option value="Literature Review">Literature Review</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                </select>
              </div>
              <div>
                <label className="block text-2xs font-bold uppercase text-slate-500 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Key research questions and objectives..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl outline-hidden focus:border-teal-500 resize-none"
                />
              </div>
              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
