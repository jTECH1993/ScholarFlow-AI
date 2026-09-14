import React, { useState, useRef, useMemo } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Sliders, 
  Cpu, 
  BookOpen, 
  Layers, 
  AlertCircle,
  FileCheck,
  RefreshCw,
  Plus,
  Trash2,
  HelpCircle,
  Eye,
  GraduationCap,
  FolderPlus,
  Quote,
  Check,
  Shield,
  Tag
} from 'lucide-react';
import { VitalSignPaper, VitalModality, PaperChunk } from '../types';
import { VITAL_MODALITIES } from '../data/vitalSignPapers';
import { PAPER_EXTENDED_DETAILS } from '../data/paperDetails';
import { RESEARCH_DOMAINS, ResearchDomainId } from '../data/researchDomains';
import { LITERATURE_CLUSTERS } from '../data/sampleLiteratureClusters';
import { ACADEMIC_CHUNKING_STRATEGIES, AcademicChunkingStrategy } from '../services/academicChunker';
import { 
  classifyPaperCategory, 
  ACADEMIC_CATEGORIES, 
  AcademicCategoryDefinition 
} from '../services/academicClassifier';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaperIndexed: (paper: VitalSignPaper) => void;
  onBatchIndexed?: (papers: VitalSignPaper[]) => void;
}

const PRESET_DEMO_PAPERS: { label: string; modality: VitalModality; paper: Partial<VitalSignPaper> }[] = [
  {
    label: 'Cuffless BP: Dual-Wavelength PPG & Bio-Z (IEEE TBME 2024)',
    modality: 'Blood Pressure (BP)',
    paper: {
      title: 'Dual-Wavelength Optical Photoplethysmography and Bio-Impedance Fusion for Continuous Cuffless Arterial Blood Pressure Estimation',
      authors: 'Zhang, H., Chen, Y., Liu, X., & Al-Qureshi, M.',
      year: 2024,
      venue: 'IEEE Transactions on Biomedical Engineering',
      modality: 'Blood Pressure (BP)',
      problemStatement: 'Hydrostatic pressure changes and vessel wall viscoelasticity cause significant calibration drift in pure PTT-based cuffless blood pressure monitors during posture shifts.',
      deviceUsed: 'Maxim MAX30001 ECG/BioZ AFE, Osram dual 660 nm / 940 nm reflective PPG optical sensor, and BIOPAC MP160.',
      groundTruth: 'Invasive indwelling radial arterial cannula (A-Line) sampled at 1,000 Hz with calibrated strain gauge transducer.',
      methodology: 'Physics-informed neural network (PINN) enforcing Navier-Stokes 1D tube flow conservation laws combined with dual-frequency bio-impedance phase tracking.',
      dataset: 'ICU Post-Operative Cohort (n=142 subjects, 4,800 paired hours of continuous arterial blood pressure).',
      keyFindings: [
        'Reduced mean absolute error (MAE) across postural transitions from 8.2 mmHg to 3.42 mmHg.',
        'Met AAMI SP10 and ISO 81060-2 standards with systolic error of 3.42 ± 5.12 mmHg and diastolic error of 2.18 ± 4.05 mmHg.',
        'Eliminated recalibration requirements for up to 72 consecutive hours of continuous patient ambulation.'
      ],
      metrics: {
        'SBP MAE': '3.42 mmHg',
        'DBP MAE': '2.18 mmHg',
        'AAMI SP10': 'Compliant (< 5±8 mmHg)',
        'Pearson r': '0.94'
      },
      clinicalSignificance: 'Provides ICU-grade continuous hemodynamics without arterial cannulation risks or painful pneumatic cuff inflations.',
      abstract: 'Non-invasive continuous blood pressure monitoring remains a critical unmet need in perioperative and intensive care medicine. We present an integrated dual-wavelength optical PPG and thoracic bio-impedance acquisition platform coupled with physics-informed deep sequence modeling. Evaluated against invasive radial arterial lines across 142 post-operative patients, our method achieved clinical grade accuracy while eliminating the need for daily recalibration.',
      chunks: [
        {
          id: 'chunk-demo1-1',
          paperId: '',
          paperTitle: '',
          section: '1. Introduction & Postural Drift Challenge',
          content: 'Continuous monitoring of arterial blood pressure without an occlusive pneumatic cuff has long been sought to prevent petechial bruising and sleep disturbance. While pulse transit time (PTT) correlates with blood pressure via Hughes elasticity law, changes in patient posture (supine to seated) alter hydrostatic pressure columns and local vascular compliance, leading to estimation drifts of up to 15 mmHg. In this study, we demonstrate that incorporating simultaneous bio-impedance (BioZ) captures dynamic cross-sectional arterial geometry changes, mitigating posture-induced errors.',
          page: 1,
          tokenCount: 94
        },
        {
          id: 'chunk-demo1-2',
          paperId: '',
          paperTitle: '',
          section: '2. Biosensor Hardware & Reference Protocol',
          content: 'Synchronous physiological signals were captured using a custom wrist-worn acquisition unit integrating a Maxim MAX30001 bio-impedance analog front-end and Osram SFH7050 dual-wavelength (660 nm red, 940 nm infrared) optical sensor sampled at 500 Hz. Ground truth arterial blood pressure was recorded simultaneously via a 20-gauge indwelling radial arterial catheter connected to a Baxter Edwards TruWave pressure transducer zeroed at the phlebostatic axis.',
          page: 3,
          tokenCount: 88
        },
        {
          id: 'chunk-demo1-3',
          paperId: '',
          paperTitle: '',
          section: '4. Clinical Benchmarks & Validation Results',
          content: 'Across 4,800 paired hours of continuous recording in 142 ICU patients, the proposed PINN model achieved a systolic MAE of 3.42 mmHg (SD: 5.12 mmHg) and diastolic MAE of 2.18 mmHg (SD: 4.05 mmHg). Bland-Altman agreement showed 96.4% of all beat-to-beat points falling strictly within the 95% limits of agreement, comfortably satisfying the universal AAMI/ESH/ISO international standards.',
          page: 6,
          tokenCount: 91
        }
      ]
    }
  },
  {
    label: 'rPPG Camera: Melanin-Invariant POS for Dark Skin (Nature Digit. Med 2024)',
    modality: 'Remote Camera rPPG',
    paper: {
      title: 'Melanin-Invariant Chrominance Decomposition for Remote Facial Video Photoplethysmography Across Fitzpatrick Skin Types I–VI',
      authors: 'Adeyemi, T., Patel, K., Gomez, F., & Sutherland, J.',
      year: 2024,
      venue: 'Nature Digital Medicine',
      modality: 'Remote Camera rPPG',
      problemStatement: 'High epidermal melanin concentrations absorb green optical wavelengths, reducing remote camera rPPG signal-to-noise ratio by up to 14 dB in dark-skinned individuals.',
      deviceUsed: 'Basler Dart BCON USB3 camera (1920x1080 at 60 fps) and FLIR Blackfly S global-shutter CMOS sensor under 300-800 Lux broad-spectrum LED.',
      groundTruth: '12-lead clinical ECG (GE Marquette TramScope) and FDA-cleared Nellcor OxiMax pulse oximeter.',
      methodology: 'Adaptive Chrominance POS with Melanin-Specific Spectral Unmixing and sub-pixel optical flow face tracking.',
      dataset: 'Diverse Global Skin Tone Cohort (n=210 subjects spanning Fitzpatrick Skin Types I through VI equally).',
      keyFindings: [
        'Equalized pulse rate extraction accuracy across all six Fitzpatrick skin tones with overall RMSE of 1.18 BPM.',
        'Overcame the historical 6.4 BPM error discrepancy observed between Fitzpatrick Type I and Type VI individuals.',
        'Operated reliably under uncontrolled ambient illuminance variations between 150 Lux and 950 Lux.'
      ],
      metrics: {
        'HR RMSE': '1.18 BPM',
        'Pearson r': '0.98',
        'Fitzpatrick VI Error': '1.34 BPM',
        'SNR Improvement': '+7.9 dB'
      },
      clinicalSignificance: 'Ensures equitable, racially unbiased non-contact vital sign monitoring for telehealth consultations and neonatal intensive care.',
      abstract: 'Camera-based remote photoplethysmography (rPPG) enables contactless cardiovascular monitoring but suffers from systemic racial bias due to light absorption by epidermal melanin. We develop an adaptive chrominance projection framework that unmixes hemoglobin absorption from melanin attenuation in real time. In a multi-center trial with 210 participants representing all six Fitzpatrick skin phototypes, our algorithm eliminated racial performance disparities, achieving an overall heart rate RMSE of 1.18 BPM.',
      chunks: [
        {
          id: 'chunk-demo2-1',
          paperId: '',
          paperTitle: '',
          section: '1. Clinical Need & Melanin Attenuation Physics',
          content: 'Epidermal melanin possesses a broadband optical absorption spectrum that overlaps heavily with the 520–580 nm green hemoglobin absorption band. In individuals with Fitzpatrick skin types V and VI, this absorption reduces the pulsatile AC signal amplitude by up to 80%, causing conventional remote PPG algorithms (such as standard GREEN and CHROM) to fail or introduce cardiac frequency tracking errors of over 10 BPM.',
          page: 1,
          tokenCount: 92
        },
        {
          id: 'chunk-demo2-2',
          paperId: '',
          paperTitle: '',
          section: '2. Optical Imaging Rig & Reference Telemetry',
          content: 'Subjects were seated 1.0 meter from an uncompressed Basler Dart USB3 machine vision camera recording 1080p video at 60 frames per second. Reference ground truth cardiovascular telemetry was acquired synchronously using a 12-lead ECG monitor and clinical Nellcor finger pulse oximeter with hardware TTL synchronization pulses.',
          page: 2,
          tokenCount: 78
        },
        {
          id: 'chunk-demo2-3',
          paperId: '',
          paperTitle: '',
          section: '4. Comparative Results across Fitzpatrick Types I-VI',
          content: 'Whereas standard POS algorithm exhibited an RMSE of 1.45 BPM on Type I skin but degraded to 7.82 BPM on Type VI skin, the proposed melanin-invariant decomposition preserved high accuracy across all groups (Type I: 1.05 BPM; Type VI: 1.34 BPM). Pearson correlation against ECG R-peak intervals remained above 0.97 across the entire cohort.',
          page: 5,
          tokenCount: 86
        }
      ]
    }
  },
  {
    label: '60 GHz Radar: Sleep Apnea Respiration Tracking (IEEE Sensors 2024)',
    modality: 'Radar & RF Sensing',
    paper: {
      title: 'Contactless Sleep Apnea Hypopnea Index Quantification Using 60 GHz Millimeter-Wave FMCW Radar Phase Demodulation',
      authors: 'Lindqvist, E., Holmberg, M., & Zhao, K.',
      year: 2024,
      venue: 'IEEE Sensors Journal',
      modality: 'Radar & RF Sensing',
      problemStatement: 'Polysomnography requires up to 22 tethered wired sensors that cause severe patient discomfort and disrupt physiological sleep architecture.',
      deviceUsed: 'Texas Instruments IWR6843AOPEVM 60–64 GHz millimeter-wave FMCW radar transceiver with integrated antenna-on-package.',
      groundTruth: 'In-laboratory level-1 clinical Polysomnography (Alice 6 Diagnostic Sleep System) with certified sleep physician staging.',
      methodology: 'Extended Kalman Filter phase unwrapping, complex range-Doppler clustering, and respiration displacement separation from cardiac micro-motions.',
      dataset: 'Clinical Sleep Apnea Trial (n=85 suspected OSA patients undergoing overnight 8-hour diagnostic PSG).',
      keyFindings: [
        'Accurately measured respiratory rate with RMSE of 0.48 breaths per minute across all sleep postures.',
        'Achieved 92.4% sensitivity and 95.1% specificity for detecting obstructive and central apnea events.',
        'Apnea-Hypopnea Index (AHI) correlation against clinical PSG was r = 0.93 (p < 0.0001).'
      ],
      metrics: {
        'RR RMSE': '0.48 BrPM',
        'AHI Correlation': 'r = 0.93',
        'Apnea Sensitivity': '92.4%',
        'Displacement Resolution': '0.12 mm'
      },
      clinicalSignificance: 'Enables comfortable, contactless home sleep apnea screening without wires, nasal cannulas, or chest effort belts.',
      abstract: 'Obstructive sleep apnea (OSA) affects nearly one billion individuals worldwide but remains heavily underdiagnosed due to the invasive complexity of overnight polysomnography (PSG). We present a contactless 60 GHz FMCW millimeter-wave radar framework capable of measuring sub-millimeter chest displacement through heavy bedding. Evaluated across 85 overnight diagnostic sleep studies, our contactless radar matched PSG AHI staging with 92.4% sensitivity.',
      chunks: [
        {
          id: 'chunk-demo3-1',
          paperId: '',
          paperTitle: '',
          section: '1. Introduction: Contactless Sleep Diagnostics',
          content: 'Conventional sleep medicine relies on overnight polysomnography requiring multiple cranial EEG leads, nasal cannulas, pulse oximeters, and thoracic effort belts. These tethered wires often disturb natural sleep architecture, causing false negative diagnoses. Non-contact millimeter-wave radar operating at 60 GHz provides a wavelength of lambda = 5.0 mm, enabling sub-millimeter chest displacement measurements through clothing and thick comforters.',
          page: 1,
          tokenCount: 88
        },
        {
          id: 'chunk-demo3-2',
          paperId: '',
          paperTitle: '',
          section: '2. Radar Hardware & Polysomnography Baseline',
          content: 'The radar sensing unit utilized a TI IWR6843AOPEVM transceiver mounted on the ceiling 1.8 meters above the patient bed. The chirps spanned 60 GHz to 64 GHz with 4 GHz bandwidth. Reference ground truth was recorded simultaneously using a clinical Alice 6 diagnostic sleep system with continuous capnography, nasal airflow pressure, and dual piezoelectric effort bands.',
          page: 2,
          tokenCount: 82
        },
        {
          id: 'chunk-demo3-3',
          paperId: '',
          paperTitle: '',
          section: '4. Clinical Validation & AHI Concordance',
          content: 'Over 680 hours of recorded sleep in 85 subjects, the radar phase demodulation system detected 2,140 individual hypopnea and apnea episodes with a false positive rate under 6%. The computed Apnea-Hypopnea Index (AHI) showed excellent Bland-Altman agreement with PSG with a mean bias of only +0.8 events per hour.',
          page: 5,
          tokenCount: 81
        }
      ]
    }
  }
];

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onPaperIndexed,
  onBatchIndexed,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'clusters'>('upload');
  const [selectedDomain, setSelectedDomain] = useState<ResearchDomainId>('english-literature');
  const [selectedStrategy, setSelectedStrategy] = useState<AcademicChunkingStrategy>('semantic-section');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [pastedText, setPastedText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<string>('');
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Review & Confirmation State
  const [isReviewStep, setIsReviewStep] = useState(false);
  const [draftPaper, setDraftPaper] = useState<VitalSignPaper | null>(null);
  const [batchDrafts, setBatchDrafts] = useState<VitalSignPaper[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentDomainConfig = RESEARCH_DOMAINS[selectedDomain] || RESEARCH_DOMAINS['english-literature'];

  // Live Category Auto-Detection
  const liveClassification = useMemo(() => {
    const textSample = pastedText || (selectedFiles.length > 0 ? selectedFiles[0].name : '');
    if (!textSample || textSample.length < 5) return null;
    return classifyPaperCategory({
      title: selectedFiles[0]?.name || '',
      abstract: textSample.slice(0, 800),
      content: textSample.slice(0, 2000),
    });
  }, [pastedText, selectedFiles]);

  // Handle single or multiple file selection
  const handleFilesSelected = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
    setAnalysisError(null);
  };

  // Run AI / Heuristic analysis on single or bulk papers
  const handleAnalyzeDocument = async (textToAnalyze?: string) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisStatus(`Initializing ${currentDomainConfig.name} parsing pipeline with ${selectedStrategy} chunker...`);

    try {
      if (selectedFiles.length > 1) {
        // Multi-file bulk processing
        setAnalysisStatus(`Parsing batch of ${selectedFiles.length} papers in ${currentDomainConfig.name}...`);
        const preparedDocs = [];

        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          setAnalysisStatus(`Reading paper ${i + 1} of ${selectedFiles.length}: "${file.name}"...`);

          let text = '';
          let base64 = '';

          if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
            text = await file.text();
          } else {
            base64 = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            });
          }

          preparedDocs.push({
            documentText: text,
            fileData: base64,
            fileName: file.name,
            mimeType: file.type,
            domainId: selectedDomain,
            chunkingStrategy: selectedStrategy,
          });
        }

        setAnalysisStatus('Synthesizing scholarly anatomy across papers via AI...');
        const response = await fetch('/api/papers/batch-analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            documents: preparedDocs,
            domainId: selectedDomain,
            chunkingStrategy: selectedStrategy,
          }),
        });

        if (!response.ok) {
          throw new Error(`Batch analysis failed with HTTP ${response.status}`);
        }

        const data = await response.json();
        if (!data.success || !Array.isArray(data.papers)) {
          throw new Error(data.error || 'Failed to analyze batch documents');
        }

        const parsedPapers: VitalSignPaper[] = data.papers;
        setBatchDrafts(parsedPapers);
        if (parsedPapers.length > 0) {
          setDraftPaper(parsedPapers[0]);
        }
        setIsReviewStep(true);
      } else {
        // Single file or pasted text
        let docText = textToAnalyze || pastedText;
        let fData = '';
        let fName = selectedFiles[0]?.name || (selectedDomain === 'english-literature' ? 'literary_study.pdf' : 'research_paper.pdf');
        let fType = selectedFiles[0]?.type || 'application/pdf';

        if (selectedFiles[0]) {
          const file = selectedFiles[0];
          if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
            docText = await file.text();
          } else {
            fData = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            });
          }
        }

        setAnalysisStatus(`Extracting core thesis, theoretical framework, and primary corpus in ${currentDomainConfig.name}...`);

        const response = await fetch('/api/papers/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            documentText: docText,
            fileData: fData,
            fileName: fName,
            mimeType: fType,
            domainId: selectedDomain,
            chunkingStrategy: selectedStrategy,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        if (!data.success || !data.paper) {
          throw new Error(data.error || 'Failed to parse academic parameters from document.');
        }

        const newPaper: VitalSignPaper = data.paper;
        setDraftPaper(newPaper);
        setBatchDrafts([newPaper]);
        setIsReviewStep(true);
      }
    } catch (err: unknown) {
      console.error('Error analyzing document:', err);
      setAnalysisError(err instanceof Error ? err.message : 'Analysis failed. Please verify the document.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStatus('');
    }
  };

  // Helper to ensure papers have category metadata
  const enrichPaperWithCategory = (p: VitalSignPaper): VitalSignPaper => {
    if (p.category && p.detectedCategory) return p;
    const classification = classifyPaperCategory({
      title: p.title,
      abstract: p.abstract,
      methodology: p.methodology,
      content: p.chunks?.map((c) => c.content).join(' '),
      modality: p.modality,
      deviceUsed: p.deviceUsed,
      groundTruth: p.groundTruth,
    });
    return {
      ...p,
      category: p.category || classification.categoryName,
      domainId: p.domainId || classification.categoryId,
      domainName: p.domainName || classification.categoryName,
      detectedCategory: classification.categoryName,
      categoryConfidence: classification.confidence,
      categoryKeywords: classification.matchedKeywords,
      categoryReasoning: classification.reasoning,
      compatibleCategories: classification.compatibleCategories,
    };
  };

  // Quick Load Entire Literature Cluster
  const handleIngestCluster = (clusterId: string) => {
    const cluster = LITERATURE_CLUSTERS.find(c => c.id === clusterId);
    if (!cluster) return;

    // Direct batch index all papers in cluster with category enrichment
    const enrichedClusterPapers = cluster.papers.map(enrichPaperWithCategory);
    enrichedClusterPapers.forEach(p => {
      PAPER_EXTENDED_DETAILS[p.id] = {
        problemStatement: p.coreThesis || p.problemStatement || '',
        deviceUsed: p.deviceUsed || p.primaryCorpus || '',
        groundTruth: p.groundTruth || p.theoreticalFramework || '',
        clinicalSignificance: p.clinicalSignificance || p.methodology || '',
      };
      onPaperIndexed(p);
    });

    if (onBatchIndexed) {
      onBatchIndexed(enrichedClusterPapers);
    }

    onClose();
  };

  // Quick Load Single Paper from Preset
  const handleSelectPreset = (paper: VitalSignPaper) => {
    const enriched = enrichPaperWithCategory(paper);
    setDraftPaper(enriched);
    setBatchDrafts([enriched]);
    setIsReviewStep(true);
  };

  // Final Commit & Index into RAG Corpus
  const handleConfirmAndIndex = () => {
    if (batchDrafts.length > 0) {
      const enrichedBatch = batchDrafts.map(enrichPaperWithCategory);
      enrichedBatch.forEach(p => {
        PAPER_EXTENDED_DETAILS[p.id] = {
          problemStatement: p.coreThesis || p.problemStatement || '',
          deviceUsed: p.deviceUsed || p.primaryCorpus || '',
          groundTruth: p.groundTruth || p.theoreticalFramework || '',
          clinicalSignificance: p.clinicalSignificance || p.methodology || '',
        };
        onPaperIndexed(p);
      });
      if (onBatchIndexed) {
        onBatchIndexed(enrichedBatch);
      }
    } else if (draftPaper) {
      const enriched = enrichPaperWithCategory(draftPaper);
      PAPER_EXTENDED_DETAILS[enriched.id] = {
        problemStatement: enriched.coreThesis || enriched.problemStatement || '',
        deviceUsed: enriched.deviceUsed || enriched.primaryCorpus || '',
        groundTruth: enriched.groundTruth || enriched.theoreticalFramework || '',
        clinicalSignificance: enriched.clinicalSignificance || enriched.methodology || '',
      };
      onPaperIndexed(enriched);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[94vh] animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <span>ScholarFlow Academic Ingestion & Chunking Studio</span>
                <span className="px-2 py-0.5 rounded text-2xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
                  Universal RAG
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Custom domain extraction, multi-paper bulk ingestion, and specialized academic chunking strategies.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-slate-800">
          {!isReviewStep ? (
            <>
              {/* Domain Selector Banner */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xs font-bold uppercase tracking-wider text-slate-600 flex items-center space-x-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                    <span>Select Research Domain & Paradigm</span>
                  </span>
                  <span className="text-2xs text-slate-500">Configures extraction schemas & system prompts</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(RESEARCH_DOMAINS) as ResearchDomainId[]).filter(d => d !== 'social-sciences-econ').map((dId) => {
                    const domain = RESEARCH_DOMAINS[dId];
                    const isSelected = selectedDomain === dId;
                    return (
                      <button
                        key={dId}
                        type="button"
                        onClick={() => setSelectedDomain(dId)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'bg-teal-50 border-teal-500 text-teal-900 ring-1 ring-teal-500/30'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold line-clamp-1">{domain.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 ml-1" />}
                        </div>
                        <p className="text-2xs text-slate-500 line-clamp-1 mt-0.5">
                          {domain.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Academic Chunker Strategy Configuration */}
              <div className="p-3.5 bg-teal-50/50 border border-teal-200/70 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xs font-bold uppercase tracking-wider text-teal-900 flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-teal-700" />
                    <span>Academic Chunking & Segmentation Strategy</span>
                  </span>
                  <span className="text-2xs text-teal-700 font-medium">Optimized for scholarly literature</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {ACADEMIC_CHUNKING_STRATEGIES.map((strat) => {
                    const isSelected = selectedStrategy === strat.id;
                    return (
                      <button
                        key={strat.id}
                        type="button"
                        onClick={() => setSelectedStrategy(strat.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'bg-white border-teal-600 text-teal-950 shadow-xs ring-1 ring-teal-600'
                            : 'bg-white/70 border-teal-200/80 hover:bg-white text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{strat.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
                        </div>
                        <p className="text-2xs text-slate-500 mt-1 line-clamp-2">
                          {strat.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'upload'
                      ? 'bg-teal-50 text-teal-700 border border-teal-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>File Upload (Single or Bulk)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('paste')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'paste'
                      ? 'bg-teal-50 text-teal-700 border border-teal-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Paste Text / Manuscript</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('clusters')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === 'clusters'
                      ? 'bg-teal-50 text-teal-700 border border-teal-200'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Curated Literature Clusters (English, AI, Clinical)</span>
                </button>
              </div>

              {/* Tab 1: File Upload (Bulk or Single) */}
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        handleFilesSelected(e.dataTransfer.files);
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-teal-500 bg-teal-50/50 scale-[0.99]'
                        : selectedFiles.length > 0
                        ? 'border-teal-400 bg-teal-50/30'
                        : 'border-slate-300 hover:border-teal-400 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.txt,.md,.json,.csv"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleFilesSelected(e.target.files);
                        }
                      }}
                      className="hidden"
                    />

                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700">
                        {selectedFiles.length > 0 ? (
                          <FileCheck className="w-6 h-6 text-teal-600" />
                        ) : (
                          <Upload className="w-6 h-6 text-teal-600" />
                        )}
                      </div>

                      {selectedFiles.length > 0 ? (
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {selectedFiles.length === 1
                              ? selectedFiles[0].name
                              : `${selectedFiles.length} papers selected for bulk ingestion`}
                          </p>
                          <p className="text-2xs text-slate-500">
                            Total size: {(selectedFiles.reduce((s, f) => s + f.size, 0) / 1024).toFixed(1)} KB • Target: {currentDomainConfig.name}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Click to browse or drag & drop research paper(s)
                          </p>
                          <p className="text-2xs text-slate-500 mt-0.5">
                            Supports bulk multi-file upload (.pdf, .txt, .md, .json)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedFiles.length > 1 && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 max-h-36 overflow-y-auto">
                      <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider">
                        Files in Batch ({selectedFiles.length}):
                      </span>
                      {selectedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs py-1 px-2 bg-white rounded border border-slate-200">
                          <span className="font-medium text-slate-700 truncate max-w-xs">{file.name}</span>
                          <span className="text-2xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedFiles.length > 0 && liveClassification && (
                    <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl flex items-start space-x-2.5 text-xs">
                      <Shield className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="font-bold text-teal-950">
                            Auto-Detected Category: <span className="text-teal-700 underline">{liveClassification.categoryName}</span>
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-3xs font-bold bg-teal-100 text-teal-800">
                            {Math.round(liveClassification.confidence * 100)}% Confidence
                          </span>
                        </div>
                        <p className="text-2xs text-slate-600">
                          🛡️ Enterprise Domain Segregation: Paper will be indexed strictly into the <strong>{liveClassification.categoryName}</strong> partition to guarantee cross-domain comparison isolation.
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedFiles.length > 0 && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        disabled={isAnalyzing}
                        onClick={() => handleAnalyzeDocument()}
                        className="inline-flex items-center space-x-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-xs disabled:opacity-50 transition-colors"
                      >
                        {isAnalyzing ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                        <span>
                          {isAnalyzing 
                            ? 'Processing Ingestion...' 
                            : selectedFiles.length > 1 
                            ? `Analyze Batch (${selectedFiles.length} Papers)` 
                            : 'Analyze & Extract Academic Structure'}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Paste Text */}
              {activeTab === 'paste' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-2xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Paste Article, Abstract, Chapter, or Full Manuscript
                    </label>
                    <textarea
                      rows={8}
                      value={pastedText}
                      onChange={(e) => setPastedText(e.target.value)}
                      placeholder={`Paste textual content here. AI will extract parameters based on ${currentDomainConfig.name} (e.g. ${currentDomainConfig.extractionFields.join(', ')})...`}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {pastedText.length > 20 && liveClassification && (
                    <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl flex items-start space-x-2.5 text-xs">
                      <Shield className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="font-bold text-teal-950">
                            Auto-Classified Domain: <span className="text-teal-700 underline">{liveClassification.categoryName}</span>
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-3xs font-bold bg-teal-100 text-teal-800">
                            {Math.round(liveClassification.confidence * 100)}% Confidence
                          </span>
                        </div>
                        <p className="text-2xs text-slate-600">
                          🛡️ Enterprise Domain Segregation: Content automatically tagged into <strong>{liveClassification.categoryName}</strong>. Comparison matrices will isolate this manuscript from disparate domains.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={isAnalyzing || pastedText.trim().length < 20}
                      onClick={() => handleAnalyzeDocument(pastedText)}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-xs disabled:opacity-50 transition-colors"
                    >
                      {isAnalyzing ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      <span>{isAnalyzing ? 'Extracting Structure...' : `Analyze in ${currentDomainConfig.name}`}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 3: Curated Literature Clusters */}
              {activeTab === 'clusters' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Instantly load specialized, multi-paper research clusters to explore comparative synthesis matrices, consensus vs. debate, and automated literature reviews:
                  </p>

                  <div className="space-y-3">
                    {LITERATURE_CLUSTERS.map((cluster) => (
                      <div
                        key={cluster.id}
                        className="p-4 bg-slate-50 border border-slate-200 hover:border-teal-300 rounded-xl transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-0.5 rounded text-2xs font-semibold bg-teal-100 text-teal-800">
                                {cluster.badge}
                              </span>
                              <span className="text-2xs text-slate-400">
                                {cluster.papers.length} peer-reviewed papers
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-slate-900">
                              {cluster.name}
                            </h4>
                            <p className="text-2xs text-slate-500">
                              {cluster.description}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleIngestCluster(cluster.id)}
                            className="shrink-0 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-2xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
                          >
                            <FolderPlus className="w-3.5 h-3.5" />
                            <span>Ingest Cluster ({cluster.papers.length})</span>
                          </button>
                        </div>

                        {/* Papers list in cluster */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-200/60">
                          {cluster.papers.map((p, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleSelectPreset(p)}
                              className="p-2 bg-white rounded-lg border border-slate-200 hover:border-teal-400 cursor-pointer text-2xs transition-colors space-y-1"
                            >
                              <div className="font-semibold text-slate-800 line-clamp-1 hover:text-teal-700">
                                {p.title}
                              </div>
                              <div className="text-slate-400">
                                {p.authors} ({p.year})
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading Status indicator */}
              {isAnalyzing && (
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-center space-x-3 text-teal-800 text-xs">
                  <RefreshCw className="w-4 h-4 animate-spin text-teal-600 shrink-0" />
                  <span>{analysisStatus || 'Analyzing document structure...'}</span>
                </div>
              )}

              {/* Error Alert */}
              {analysisError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2 text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{analysisError}</span>
                </div>
              )}
            </>
          ) : (
            /* Review & Edit Screen */
            draftPaper && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">
                      {batchDrafts.length > 1
                        ? `Batch Structured (${batchDrafts.length} Papers) — Inspecting 1 of ${batchDrafts.length}`
                        : 'Document Structured & Ready for Indexing'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsReviewStep(false)}
                    className="text-2xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Back to Upload
                  </button>
                </div>

                {/* Enterprise Category Auto-Detection & Domain Segregation Guard */}
                <div className="p-3.5 bg-gradient-to-r from-teal-50/90 to-indigo-50/90 border border-teal-200/90 rounded-xl space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-teal-600" />
                      <span className="text-2xs font-bold text-teal-950 uppercase tracking-wider">
                        Enterprise Category Auto-Detection &amp; Isolation Guard
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-3xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
                        {Math.round((draftPaper.categoryConfidence || 0.95) * 100)}% Match
                      </span>
                    </div>
                    <span className="text-3xs text-teal-700 font-semibold flex items-center space-x-1">
                      <Check className="w-3 h-3 text-teal-600" />
                      <span>Domain Segregation Active</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">
                      Assigned Domain Category:
                    </span>
                    <select
                      value={draftPaper.domainId || 'fmcw-radar'}
                      onChange={(e) => {
                        const cat = ACADEMIC_CATEGORIES.find((c) => c.id === e.target.value);
                        if (cat) {
                          setDraftPaper({
                            ...draftPaper,
                            category: cat.name,
                            domainId: cat.id,
                            domainName: cat.name,
                            detectedCategory: cat.name,
                            compatibleCategories: cat.compatibleCategoryIds,
                          });
                        }
                      }}
                      className="px-2.5 py-1 bg-white border border-teal-300 rounded-lg text-xs font-bold text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs"
                    >
                      {ACADEMIC_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name} ({cat.badge})
                        </option>
                      ))}
                    </select>
                  </div>

                  <p className="text-3xs text-slate-600 leading-relaxed">
                    🛡️ <span className="font-semibold text-slate-800">Domain Isolation Guarantee:</span> This paper will be quarantined within the <strong>{draftPaper.category || 'assigned'}</strong> category. Subsequent literature matrix evaluations and benchmark studies will strictly compare it against compatible literature, preventing cross-domain metric contamination.
                  </p>
                </div>

                {/* Primary Metadata Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-2xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Paper Title
                    </label>
                    <input
                      type="text"
                      value={draftPaper.title}
                      onChange={(e) => setDraftPaper({ ...draftPaper, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Authors & Institution
                    </label>
                    <input
                      type="text"
                      value={draftPaper.authors}
                      onChange={(e) => setDraftPaper({ ...draftPaper, authors: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Venue / Journal
                    </label>
                    <input
                      type="text"
                      value={draftPaper.venue}
                      onChange={(e) => setDraftPaper({ ...draftPaper, venue: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Publication Year
                    </label>
                    <input
                      type="number"
                      value={draftPaper.year}
                      onChange={(e) => setDraftPaper({ ...draftPaper, year: Number(e.target.value) || 2024 })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
                    />
                  </div>
                </div>

                {/* Domain-Adapted Scholarly Parameters */}
                <div className="space-y-2.5">
                  {/* Thesis / Problem Statement */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1">
                    <label className="block text-2xs font-bold text-amber-900 uppercase tracking-wider">
                      {selectedDomain === 'english-literature' ? 'Core Thesis / Research Argument:' : 'Problem Statement / Research Objective:'}
                    </label>
                    <textarea
                      rows={2}
                      value={draftPaper.coreThesis || draftPaper.problemStatement || ''}
                      onChange={(e) => setDraftPaper({ 
                        ...draftPaper, 
                        coreThesis: e.target.value,
                        problemStatement: e.target.value 
                      })}
                      className="w-full p-2 bg-white/90 border border-amber-300/80 rounded-lg text-xs text-amber-950 font-normal focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* Theoretical Framework & Corpus / Hardware */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl space-y-1">
                      <label className="block text-2xs font-bold text-teal-900 uppercase tracking-wider">
                        {selectedDomain === 'english-literature' ? 'Primary Literary Corpus / Texts Analyzed:' : 'Hardware / Acquisition Device / Architecture:'}
                      </label>
                      <textarea
                        rows={2}
                        value={draftPaper.primaryCorpus || draftPaper.deviceUsed || ''}
                        onChange={(e) => setDraftPaper({ 
                          ...draftPaper, 
                          primaryCorpus: e.target.value,
                          deviceUsed: e.target.value 
                        })}
                        className="w-full p-2 bg-white/90 border border-teal-300/80 rounded-lg text-xs text-teal-950 font-normal focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1">
                      <label className="block text-2xs font-bold text-emerald-900 uppercase tracking-wider">
                        {selectedDomain === 'english-literature' ? 'Theoretical / Critical Framework:' : 'Ground Truth / Benchmark Reference:'}
                      </label>
                      <textarea
                        rows={2}
                        value={draftPaper.theoreticalFramework || draftPaper.groundTruth || ''}
                        onChange={(e) => setDraftPaper({ 
                          ...draftPaper, 
                          theoreticalFramework: e.target.value,
                          groundTruth: e.target.value 
                        })}
                        className="w-full p-2 bg-white/90 border border-emerald-300/80 rounded-lg text-xs text-emerald-950 font-normal focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Key Quotes if available (Humanities / Literature) */}
                {draftPaper.keyQuotes && draftPaper.keyQuotes.length > 0 && (
                  <div className="p-3 bg-purple-50/60 border border-purple-200/70 rounded-xl space-y-1.5">
                    <span className="text-2xs font-bold text-purple-900 uppercase tracking-wider flex items-center space-x-1">
                      <Quote className="w-3.5 h-3.5 text-purple-700" />
                      <span>Extracted Literary Quotes & Textual Passages</span>
                    </span>
                    <div className="space-y-1">
                      {draftPaper.keyQuotes.map((q, idx) => (
                        <div key={idx} className="text-2xs p-1.5 bg-white rounded border border-purple-200 text-purple-950">
                          &ldquo;{q.quote}&rdquo; {q.context && <span className="font-semibold text-purple-700">({q.context})</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chunks Preview */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-2xs font-bold text-slate-600 uppercase tracking-wider flex items-center space-x-1">
                      <Layers className="w-3.5 h-3.5 text-teal-600" />
                      <span>Extracted Semantic Chunks ({draftPaper.chunks.length})</span>
                    </label>
                    <span className="text-2xs text-slate-400">
                      Strategy: {(draftPaper.chunks[0] as any)?.chunkingStrategy || selectedStrategy}
                    </span>
                  </div>

                  <div className="max-h-36 overflow-y-auto space-y-2 border border-slate-200 rounded-xl p-2 bg-slate-50">
                    {draftPaper.chunks.map((c, i) => (
                      <div key={i} className="p-2 bg-white rounded-lg border border-slate-200 text-2xs space-y-1">
                        <div className="flex items-center justify-between font-semibold text-slate-700">
                          <span className="text-teal-700">{c.section}</span>
                          <span className="text-slate-400">Page {c.page || i + 1} • ~{c.tokenCount} tokens</span>
                        </div>
                        <p className="text-slate-600 line-clamp-2">{c.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>

          {isReviewStep && (draftPaper || batchDrafts.length > 0) && (
            <button
              type="button"
              onClick={handleConfirmAndIndex}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {batchDrafts.length > 1
                  ? `Confirm & Index Batch (${batchDrafts.length} Papers)`
                  : 'Confirm & Index into Corpus'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
