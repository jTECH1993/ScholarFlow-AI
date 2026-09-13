import React from 'react';
import { 
  X, 
  Check, 
  Heart, 
  Activity, 
  Radio, 
  Cpu, 
  ShieldPlus, 
  Layers, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { ActiveResearchDomain } from '../types';
import { DOMAIN_TOPICS, DomainTopicMeta } from '../data/researchDomainTopics';

interface DomainManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDomain: ActiveResearchDomain;
  setActiveDomain: (domain: ActiveResearchDomain) => void;
  selectedDomains: ActiveResearchDomain[];
  setSelectedDomains: React.Dispatch<React.SetStateAction<ActiveResearchDomain[]>>;
}

export const DomainManagerModal: React.FC<DomainManagerModalProps> = ({
  isOpen,
  onClose,
  activeDomain,
  setActiveDomain,
  selectedDomains,
  setSelectedDomains,
}) => {
  if (!isOpen) return null;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-5 h-5 text-rose-500" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-sky-500" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-cyan-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-500" />;
      case 'ShieldPlus':
        return <ShieldPlus className="w-5 h-5 text-emerald-500" />;
      default:
        return <Layers className="w-5 h-5 text-teal-600" />;
    }
  };

  const handleSelectSingle = (id: ActiveResearchDomain) => {
    setActiveDomain(id);
    if (!selectedDomains.includes(id) && id !== 'all') {
      setSelectedDomains(prev => [...prev, id]);
    }
    onClose();
  };

  const handleToggleMulti = (id: ActiveResearchDomain) => {
    if (id === 'all') {
      setActiveDomain('all');
      setSelectedDomains(['all']);
      return;
    }
    setSelectedDomains(prev => {
      const withoutAll = prev.filter(d => d !== 'all');
      if (withoutAll.includes(id)) {
        const next = withoutAll.filter(d => d !== id);
        if (next.length === 0) {
          setActiveDomain('all');
          return ['all'];
        }
        if (activeDomain === id) {
          setActiveDomain(next[0]);
        }
        return next;
      } else {
        const next = [...withoutAll, id];
        setActiveDomain(id);
        return next;
      }
    });
  };

  const isAllActive = activeDomain === 'all' || (selectedDomains.length === 1 && selectedDomains[0] === 'all');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Manage Research Topics & Domains</h2>
              <p className="text-xs text-slate-500">
                Tailor research questions, benchmark models, and corpus extraction to your exact interests.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-start space-x-2 bg-teal-50/80 border border-teal-200 p-3 rounded-xl text-2xs text-teal-900">
            <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Dynamic Feature Adjustment: </span>
              Selecting a specific domain customizes the Scholar Chat suggested queries, example pills, literature comparisons, and waveform lab tools specifically for your chosen research focus.
            </div>
          </div>

          {/* "All Domains" Option */}
          <div 
            onClick={() => handleSelectSingle('all')}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
              isAllActive
                ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-slate-900">All Research Domains (Universal)</h3>
                  <span className="px-2 py-0.5 rounded-full text-3xs font-bold bg-teal-100 text-teal-800">
                    Comprehensive
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Show all topics: Vital Signs, Radar, rPPG, Signal Processing, AI/Deep Learning, and Healthcare.
                </p>
              </div>
            </div>
            {isAllActive && (
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            )}
          </div>

          <div className="pt-2 text-2xs font-bold uppercase tracking-wider text-slate-400">
            Individual Specialized Domains
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DOMAIN_TOPICS.map((topic) => {
              const isSelected = activeDomain === topic.id || selectedDomains.includes(topic.id);
              return (
                <div
                  key={topic.id}
                  onClick={() => handleSelectSingle(topic.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${topic.color}`}>
                          {renderIcon(topic.iconName)}
                        </div>
                        <span className="text-xs font-bold text-slate-900">{topic.name}</span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-2xs text-slate-600 line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-3xs">
                    <span className="font-semibold text-teal-800">{topic.badge}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMulti(topic.id);
                      }}
                      className="text-slate-400 hover:text-slate-700 underline"
                    >
                      {selectedDomains.includes(topic.id) ? 'Include in search' : '+ Add'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Active: <span className="font-semibold text-slate-900">
              {activeDomain === 'all' ? 'All Domains' : DOMAIN_TOPICS.find(d => d.id === activeDomain)?.name || activeDomain}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleSelectSingle('all')}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
            >
              Reset to All
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-colors shadow-2xs cursor-pointer"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
