import { ActiveResearchDomain, ResearchProjectItem } from '../types';

export interface DomainTopicMeta {
  id: ActiveResearchDomain;
  name: string;
  badge: string;
  iconName: 'Heart' | 'Activity' | 'Radio' | 'Cpu' | 'ShieldPlus' | 'Layers';
  color: string;
  textColor: string;
  borderHover: string;
  description: string;
  suggestedQuestions: string[];
  examplePills: { label: string; prompt: string }[];
  relevantKeywords: string[];
  filterModality?: string;
}

export const DOMAIN_TOPICS: DomainTopicMeta[] = [
  {
    id: 'vital-signs-ppg',
    name: 'Vital Signs & PPG',
    badge: 'Optical Sensing',
    iconName: 'Heart',
    color: 'text-rose-500 bg-rose-50 border-rose-200',
    textColor: 'text-rose-600',
    borderHover: 'hover:border-rose-300 hover:bg-rose-50/50',
    description: 'Photoplethysmography (PPG), pulse oximetry (SpO2), arterial stiffness index, and vascular elasticity modeling.',
    suggestedQuestions: [
      'What are the primary filtering methods for motion artifact cancellation in wearable PPG?',
      'How is the Ratio-of-Ratios R = (AC660/DC660)/(AC940/DC940) calibrated against blood gas analysis?',
      'Explain the second-derivative PPG (SDPPG) b/a ratio for arterial stiffness assessment.',
      'Compare PPG peak detection F1 scores across CapnoBase and MIMIC-III subsets.',
      'What deep learning architectures reconstruct corrupted PPG during vigorous treadmill ambulation?'
    ],
    examplePills: [
      { label: 'Summarize PPG filtering', prompt: 'Summarize the primary filtering and artifact removal methods for ambulatory PPG.' },
      { label: 'Explain SDPPG b/a ratio', prompt: 'Explain the physiological meaning of the second-derivative PPG (SDPPG) b/a and d/a wave ratios.' },
      { label: 'Extract SpO2 formulas', prompt: 'Show me the mathematical calibration equations for dual-wavelength SpO2 estimation.' },
      { label: 'Compare PPG datasets', prompt: 'Compare the CapnoBase, MIMIC-III, and PPG-DaLiA datasets used in these papers.' }
    ],
    relevantKeywords: ['PPG', 'SpO2', 'SDPPG', 'Photoplethysmography', 'Oximetry', 'CapnoBase'],
    filterModality: 'Photoplethysmography (PPG)'
  },
  {
    id: 'ecg-rppg',
    name: 'ECG & rPPG',
    badge: 'Remote & Contact Bio-potentials',
    iconName: 'Activity',
    color: 'text-sky-500 bg-sky-50 border-sky-200',
    textColor: 'text-sky-600',
    borderHover: 'hover:border-sky-300 hover:bg-sky-50/50',
    description: '12-lead & single-lead ECG fiducials, heart rate variability (HRV), and camera-based remote photoplethysmography (rPPG).',
    suggestedQuestions: [
      'How does camera-based rPPG isolate micro-vascular blood volume pulses under varying ambient illumination?',
      'Detail the QRS detection and Pan-Tompkins algorithm benchmarks in ambulatory ECG recordings.',
      'Explain how chrominance-based (CHROM) and POS rPPG plane orthogonal projections eliminate head motion noise.',
      'What HRV metrics (SDNN, RMSSD, LF/HF ratio) demonstrate the highest statistical sensitivity to autonomic stress?',
      'Compare 3D-CNN and PhysNet spatial-temporal attention networks for facial remote heart rate estimation.'
    ],
    examplePills: [
      { label: 'Explain CHROM rPPG', prompt: 'How does the CHROM algorithm project RGB facial video into skin chrominance space to extract pulse?' },
      { label: 'HRV metrics breakdown', prompt: 'Explain the mathematical definition and clinical interpretation of SDNN, RMSSD, and LF/HF ratio.' },
      { label: 'Compare rPPG vs contact PPG', prompt: 'Compare camera-based rPPG accuracy against gold-standard finger clip PPG.' },
      { label: 'Pan-Tompkins QRS algorithm', prompt: 'Detail the signal processing stages of the Pan-Tompkins ECG QRS detection pipeline.' }
    ],
    relevantKeywords: ['ECG', 'rPPG', 'HRV', 'CHROM', 'PhysNet', 'Pan-Tompkins', 'RMSSD'],
    filterModality: 'Remote Camera rPPG'
  },
  {
    id: 'fmcw-radar',
    name: 'FMCW Radar',
    badge: 'RF Remote Sensing',
    iconName: 'Radio',
    color: 'text-cyan-500 bg-cyan-50 border-cyan-200',
    textColor: 'text-cyan-600',
    borderHover: 'hover:border-cyan-300 hover:bg-cyan-50/50',
    description: 'Frequency Modulated Continuous Wave (FMCW) and Impulse Radio UWB (IR-UWB) mmWave vital signs radar.',
    suggestedQuestions: [
      'What are the main methods for heart rate and respiration estimation using FMCW and UWB radar?',
      'How is phase unwrapping and arctangent demodulation performed on chest displacement radar signals?',
      'Compare 60-64 GHz FMCW chirp parameters against 3-10 GHz IR-UWB for sub-millimeter chest wall tracking.',
      'How is static clutter (walls, furniture) attenuated using state-space projection and high-pass filtering?',
      'What signal processing separates tiny cardiac micro-motions (0.05 mm) from large respiratory excursions (5-10 mm)?'
    ],
    examplePills: [
      { label: 'FMCW heart rate methods', prompt: 'What are the main methods for heart rate estimation using FMCW and UWB radar?' },
      { label: 'Phase demodulation steps', prompt: 'Explain the mathematical steps of arctangent demodulation and phase unwrapping for chest displacement.' },
      { label: 'Radar clutter removal', prompt: 'What filtering techniques remove static environmental clutter from radar range-Doppler maps?' },
      { label: 'UWB vs FMCW comparison', prompt: 'Compare IR-UWB impulse radio and FMCW continuous wave radar for contactless vitals.' }
    ],
    relevantKeywords: ['Radar', 'FMCW', 'UWB', 'IR-UWB', 'mmWave', 'Chirp', 'Doppler'],
    filterModality: 'Radar & RF Sensing'
  },
  {
    id: 'biomedical-signal-processing',
    name: 'Biomedical Signal Processing',
    badge: 'DSP & Decompositions',
    iconName: 'Activity',
    color: 'text-purple-500 bg-purple-50 border-purple-200',
    textColor: 'text-purple-600',
    borderHover: 'hover:border-purple-300 hover:bg-purple-50/50',
    description: 'Empirical Mode Decomposition (EMD/EEMD), Variational Mode Decomposition (VMD), wavelets, and adaptive LMS/RLS filters.',
    suggestedQuestions: [
      'How does Variational Mode Decomposition (VMD) solve the mode mixing dilemma present in standard EMD?',
      'Explain the mathematical formulation of the continuous wavelet transform (CWT) using Morlet and Mexican hat wavelets.',
      'Detail the adaptive recursive least squares (RLS) algorithm for real-time reference noise cancellation.',
      'How is Independent Component Analysis (ICA) used to blind-source separate maternal and fetal ECG signals?',
      'Explain spectral entropy and spectral energy ratio for automated signal quality indexing (SQI).'
    ],
    examplePills: [
      { label: 'Compare EMD vs VMD', prompt: 'Compare Empirical Mode Decomposition (EMD) and Variational Mode Decomposition (VMD) for bio-signals.' },
      { label: 'Wavelet transform in vitals', prompt: 'Explain the application of continuous wavelet transform (CWT) in physiological signal analysis.' },
      { label: 'Adaptive filtering (RLS/LMS)', prompt: 'How do normalized LMS and RLS adaptive filters suppress motion artifacts in real-time?' },
      { label: 'Signal Quality Indices (SQI)', prompt: 'Show me the mathematical definitions of skewness, kurtosis, and spectral entropy SQIs.' }
    ],
    relevantKeywords: ['VMD', 'EEMD', 'Wavelet', 'RLS', 'LMS', 'ICA', 'Decomposition', 'DSP'],
    filterModality: 'Biomedical Signal Processing'
  },
  {
    id: 'ai-deep-learning',
    name: 'AI / Deep Learning',
    badge: 'Neural Architectures',
    iconName: 'Cpu',
    color: 'text-indigo-500 bg-indigo-50 border-indigo-200',
    textColor: 'text-indigo-600',
    borderHover: 'hover:border-indigo-300 hover:bg-indigo-50/50',
    description: '1D/2D CNNs, Bi-LSTM, Transformers, Self-Supervised contrastive learning, and Physics-Informed Neural Networks (PINNs).',
    suggestedQuestions: [
      'What neural architectures (e.g. CNN-LSTM, Attention Transformers) yield lowest MAE in vital sign estimation?',
      'How do Physics-Informed Neural Networks (PINNs) enforce Navier-Stokes and Moens-Korteweg vascular constraints?',
      'Explain self-supervised contrastive learning (SimCLR, TS-TCC) for pre-training unlabelled bio-sensor time series.',
      'Detail ablation studies showing the performance contribution of spatial vs temporal attention blocks.',
      'How are domain adaptation and transfer learning utilized to bridge synthetic radar and real patient cohorts?'
    ],
    examplePills: [
      { label: 'CNN-LSTM architectures', prompt: 'What CNN-LSTM architectures are used for vital sign regression and how do they perform?' },
      { label: 'Physics-Informed PINNs', prompt: 'How do Physics-Informed Neural Networks (PINNs) integrate physiological fluid mechanics into loss functions?' },
      { label: 'Self-supervised pre-training', prompt: 'Explain contrastive learning for unlabeled physiological biosensor waveforms.' },
      { label: 'Model latency & params', prompt: 'Compare parameter size, floating-point operations (FLOPs), and inference latency across published models.' }
    ],
    relevantKeywords: ['Deep Learning', 'CNN', 'LSTM', 'Transformer', 'PINN', 'Self-Supervised', 'Attention'],
    filterModality: 'all'
  },
  {
    id: 'healthcare-ehealth',
    name: 'Healthcare & eHealth',
    badge: 'Clinical Telemetry & ICU',
    iconName: 'ShieldPlus',
    color: 'text-emerald-500 bg-emerald-50 border-emerald-200',
    textColor: 'text-emerald-600',
    borderHover: 'hover:border-emerald-300 hover:bg-emerald-50/50',
    description: 'Continuous ICU patient telemetry, sepsis early warning systems, ambulatory home monitoring, and medical device regulations.',
    suggestedQuestions: [
      'How do continuous non-invasive vital sign sensors improve early sepsis detection in the ICU (e.g. SOFA/NEWS2 scores)?',
      'What are the FDA and ISO 81060-2 international standards for cuffless blood pressure monitor validation?',
      'Explain patient privacy, end-to-end encryption, and zero-trust session boundaries in hospital cloud telemetry.',
      'How do edge computing gateways preprocess raw waveform streams before transmitting clinical alerts to EHR systems?',
      'Synthesize clinical trial outcomes comparing touchless radar monitoring vs standard adhesive electrodes in sleep clinics.'
    ],
    examplePills: [
      { label: 'ICU sepsis early warning', prompt: 'How do continuous multimodal vitals feed into early sepsis detection (NEWS2 / qSOFA) algorithms?' },
      { label: 'FDA / ISO validation rules', prompt: 'What are the required error limits (AAMI SP10 / ISO 81060-2) for non-invasive medical monitoring?' },
      { label: 'Remote patient monitoring', prompt: 'Summarize clinical trials validating touchless monitoring for elderly care and sleep apnea.' },
      { label: 'Clinical telemetry latency', prompt: 'What are acceptable packet loss and latency tolerances for real-time ICU arrhythmia alarms?' }
    ],
    relevantKeywords: ['ICU', 'Sepsis', 'eHealth', 'Telemetry', 'FDA', 'AAMI', 'NEWS2', 'Clinical'],
    filterModality: 'ICU Sepsis & Deterioration'
  }
];

export const DEMO_PROJECTS: ResearchProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Vital Sign Estimation using UWB Radar',
    paperCount: 12,
    updatedAgo: 'Updated 2 days ago',
    category: 'Biomedical',
    description: 'Sub-millimeter chest wall displacement tracking and multi-target heart rate and respiration separation.',
    tags: ['IR-UWB', 'Heart Rate', 'Respiration', 'Phase Unwrapping']
  },
  {
    id: 'proj-2',
    title: 'Emotion Recognition from Radar Signals',
    paperCount: 8,
    updatedAgo: 'Updated 5 days ago',
    category: 'Signal Processing',
    description: 'Autonomic nervous system arousal classification using micro-Doppler radar features and HRV patterns.',
    tags: ['Micro-Doppler', 'Emotion', 'Deep Learning', 'HRV']
  },
  {
    id: 'proj-3',
    title: 'Systematic Review: IR-UWB for Healthcare',
    paperCount: 15,
    updatedAgo: 'Updated 1 week ago',
    category: 'Literature Review',
    description: 'Comprehensive PRISMA-compliant meta-analysis of contactless radar vital sign estimation from 2018 to 2026.',
    tags: ['Systematic Review', 'PRISMA', 'Clinical Validation', 'Meta-Analysis']
  },
  {
    id: 'proj-4',
    title: 'Cuffless Continuous Blood Pressure via PPG & ECG',
    paperCount: 10,
    updatedAgo: 'Updated 2 weeks ago',
    category: 'Cardiovascular',
    description: 'Pulse transit time (PTT) and pulse wave velocity (PWV) models evaluated against arterial lines.',
    tags: ['PTT', 'Hughes Model', 'Blood Pressure', 'Arterial Line']
  }
];
