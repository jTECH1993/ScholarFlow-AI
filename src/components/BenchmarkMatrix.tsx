import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart3, 
  ShieldCheck, 
  FileText,
  HelpCircle,
  Search,
  BookOpen,
  Copy,
  Check,
  Cpu,
  Activity,
  Zap,
  Filter
} from 'lucide-react';

interface ModalityRow {
  name: string;
  category: 'Optical' | 'Biopotential' | 'Radar & RF' | 'Acoustic & Mechanical' | 'Critical Care';
  principle: string;
  accuracy: string;
  motionSensitivity: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Immune';
  snr: string;
  power: string;
  datasets: string;
  clinicalUtility: string;
  standard: string;
}

const MODALITY_DATA: ModalityRow[] = [
  {
    name: 'Contact Pulse Oximetry (Multi-λ PPG)',
    category: 'Optical',
    principle: 'Differential oxy/deoxyhemoglobin optical absorption at 660 nm & 940 nm via high-sensitivity PIN photodiodes.',
    accuracy: 'SpO2 RMSE: 1.42%, HR: 1-2 BPM',
    motionSensitivity: 'Moderate',
    snr: '35 - 45 dB',
    power: '< 1.5 mW (pulsed)',
    datasets: 'CapnoBase, MIMIC-III PPG (n=1,200)',
    clinicalUtility: 'Continuous hypoxemia screening, anesthesia recovery, ambulatory smartwatches.',
    standard: 'ISO 80601-2-61 / FDA'
  },
  {
    name: 'Dual-Lead Cuffless BP (ECG + PPG / PTT)',
    category: 'Optical',
    principle: 'Pulse Transit Time (PTT) calculated from ECG R-peak to peripheral PPG foot via Hughes elasticity.',
    accuracy: 'SBP MAE: 4.12 mmHg, DBP MAE: 3.18 mmHg',
    motionSensitivity: 'High',
    snr: '28 - 36 dB',
    power: '2.5 - 5.0 mW',
    datasets: 'VitalDB, MIMIC-III Waveform (n=1,420)',
    clinicalUtility: '24/7 continuous hypertension tracking, nocturnal non-dipping detection.',
    standard: 'IEEE 1708 Grade A / ISO 81060-2'
  },
  {
    name: 'Single-Site Morphological Cuffless BP (PINN)',
    category: 'Optical',
    principle: 'Second-derivative PPG (SDPPG) waveform decomposition constrained by 1D Navier-Stokes blood flow physics.',
    accuracy: 'SBP MAE: 4.41 mmHg, DBP MAE: 2.91 mmHg',
    motionSensitivity: 'High',
    snr: '25 - 32 dB',
    power: '< 1.2 mW',
    datasets: 'MIMIC-II (n=1,120), Caretaker cohort',
    clinicalUtility: 'ECG-free single-wrist continuous blood pressure estimation.',
    standard: 'IEEE 1708 / AAMI SP10'
  },
  {
    name: 'Diagnostic 12-Lead Clinical ECG',
    category: 'Biopotential',
    principle: 'Hexaxial frontal & horizontal precordial biopotential vector conduction from myocardial depolarization.',
    accuracy: 'QRS F1: 99.85%, STEMI AUROC: 0.942',
    motionSensitivity: 'Low',
    snr: '45 - 60 dB',
    power: '10 - 25 mW',
    datasets: 'PTB-XL (n=21,837), MIT-BIH Arrhythmia',
    clinicalUtility: 'Gold-standard myocardial infarction localization, bundle branch blocks, complex arrhythmias.',
    standard: 'IEC 60601-2-25 / AHA'
  },
  {
    name: 'Wearable Single-Lead Patch ECG',
    category: 'Biopotential',
    principle: 'Single vector cutaneous biopotential recording with active driven-right-leg (DRL) shielding.',
    accuracy: 'AFib Sens: 97.4%, Spec: 96.2%',
    motionSensitivity: 'Moderate',
    snr: '32 - 40 dB',
    power: '85 µW (MAX30001)',
    datasets: 'PhysioNet CinC 2017, WESAD',
    clinicalUtility: 'Long-term 14-day ambulatory paroxysmal atrial fibrillation and HRV screening.',
    standard: 'IEC 60601-2-47'
  },
  {
    name: 'Remote Camera rPPG (POS / DeepPhys)',
    category: 'Optical',
    principle: 'Subsurface facial capillary scattering in ambient light decomposed via Plane-Orthogonal-to-Skin (POS).',
    accuracy: 'Resting HR RMSE: 1.15 BPM, Motion: 3.42 BPM',
    motionSensitivity: 'High',
    snr: '18 - 28 dB',
    power: 'Camera stream (1-3 W)',
    datasets: 'UBFC-rPPG, PURE, VIPL-HR (n=57)',
    clinicalUtility: 'Neonatal ICU incubators, touchless infectious triage, driver vigilance monitoring.',
    standard: 'FDA Draft Contactless Guidance'
  },
  {
    name: '60 GHz Millimeter-Wave FMCW Radar',
    category: 'Radar & RF',
    principle: 'Microwave phase interferometry (λ = 5 mm) demodulating sub-millimeter chest wall respiratory displacement.',
    accuracy: 'Displacement: < 50 µm, RR RMSE: 0.28 BrPM',
    motionSensitivity: 'Immune',
    snr: '40 - 55 dB',
    power: '1.2 - 2.0 W (duty-cycled)',
    datasets: 'Clinical Ward Radar & Sleep Apnea (n=32)',
    clinicalUtility: 'Contactless sleep apnea screening, through-blanket respiratory tracking, privacy-safe ward monitoring.',
    standard: 'AASM Polysomnography Gold'
  },
  {
    name: 'Continuous Acoustic Tracheal Sensing',
    category: 'Acoustic & Mechanical',
    principle: 'Soft throat-attached piezoelectric cantilevers (PVDF/PZT) capturing tracheal airflow acoustic vibrations.',
    accuracy: 'RR MAE: 0.45 BrPM, Stridor F1: 94.2%',
    motionSensitivity: 'Moderate',
    snr: '30 - 38 dB',
    power: '< 200 µW',
    datasets: 'Pediatric Stridor & ICU Wheeze Cohorts',
    clinicalUtility: 'Pediatric croup, postoperative stridor, continuous asthma wheeze quantification.',
    standard: 'Clinical Auscultation Standard'
  },
  {
    name: 'Dual-Wavelength Mainstream Capnography',
    category: 'Optical',
    principle: 'Microstream infrared absorption at 4.26 µm measuring expired carbon dioxide partial pressure (EtCO2).',
    accuracy: 'EtCO2 Error: ± 2 mmHg across 0-100 mmHg',
    motionSensitivity: 'Low',
    snr: '48 - 58 dB',
    power: '800 mW - 1.5 W',
    datasets: 'CapnoBase, Operating Room Surgical Cohorts',
    clinicalUtility: 'Patient-Controlled Analgesia (PCA) opioid-induced respiratory depression (OIRD) prevention.',
    standard: 'ISO 80601-2-55'
  },
  {
    name: 'Ballisto- & Seismocardiography (BCG/SCG)',
    category: 'Acoustic & Mechanical',
    principle: 'Micro-accelerometers and force sensors capturing whole-body recoil from ventricular blood ejection into aorta.',
    accuracy: 'HR MAE: 1.2 BPM, Stroke Volume r = 0.82',
    motionSensitivity: 'Very High',
    snr: '20 - 30 dB',
    power: '< 350 µW',
    datasets: 'Bed-Sensor Mat & Insole Clinical Datasets',
    clinicalUtility: 'Unobtrusive in-bed continuous cardiac output monitoring and sleep architecture tracking.',
    standard: 'Clinical Ballistocardiography'
  },
  {
    name: 'Thoracic Bioimpedance (BioZ Pneumography)',
    category: 'Biopotential',
    principle: 'High-frequency (50 kHz, 100 µA) tetrapolar alternating current injection measuring thoracic fluid changes.',
    accuracy: 'Tidal Volume r = 0.88, RR MAE: 0.8 BrPM',
    motionSensitivity: 'Moderate',
    snr: '34 - 42 dB',
    power: '< 500 µW',
    datasets: 'MIMIC-IV BioZ, Post-Op Surgical ICU',
    clinicalUtility: 'Continuous tidal volume, pulmonary congestion tracking in decompensated heart failure.',
    standard: 'IEC 60601-2-49'
  },
  {
    name: 'Multimodal AI Sepsis Trajectory (NEWS2)',
    category: 'Critical Care',
    principle: 'Sequential Organ Failure Assessment (SOFA) & gradient-boosted trees fusing HR, RR, BP, and Shock Index.',
    accuracy: 'AUROC: 0.892 (4.8-hr lead time), -18.2% Mort.',
    motionSensitivity: 'Low',
    snr: 'N/A (Multi-sensor)',
    power: 'Software Analytics',
    datasets: 'eICU, MIMIC-IV (n=5,840 patients)',
    clinicalUtility: 'Early septic shock prediction, rapid response team escalation, reduction in ward cardiac arrests.',
    standard: 'Sepsis-3 International Consensus'
  }
];

interface MathEquation {
  id: string;
  category: 'Hemodynamics' | 'Optical & SpO2' | 'Remote rPPG' | 'Radar & RF' | 'Cardiac & HRV' | 'Critical Care';
  title: string;
  formula: string;
  description: string;
  parameters: string[];
  paperCitation: string;
  significance: string;
}

const EQUATION_LIBRARY: MathEquation[] = [
  // 1. Moens-Korteweg
  {
    id: 'eq-moens',
    category: 'Hemodynamics',
    title: '1. Moens-Korteweg Pulse Wave Velocity (PWV)',
    formula: 'c = PWV = \\sqrt{\\frac{E_{inc} \\cdot h}{\\rho \\cdot D}}',
    description: 'Relates pulse wave velocity (c) propagating through an elastic cylindrical arterial vessel to vascular wall elastic modulus, wall thickness, blood density, and vessel diameter.',
    parameters: [
      'c (PWV): Pulse wave velocity (m/s)',
      'E_inc: Incremental elastic modulus of the arterial wall (Pa)',
      'h: Arterial wall thickness (m)',
      'ρ: Blood mass density (~1050 kg/m³)',
      'D: Internal vessel lumen diameter (m)'
    ],
    paperCitation: 'Mukkamala et al. (Paper 07, p. 2) & Stergiou et al. (Paper 13, p. 3)',
    significance: 'Fundamental equation underlying all Pulse Transit Time (PTT) and cuffless blood pressure estimators.'
  },
  // 2. Hughes Nonlinear Elasticity
  {
    id: 'eq-hughes',
    category: 'Hemodynamics',
    title: '2. Hughes Arterial Elasticity & Blood Pressure Law',
    formula: 'E_{inc}(P) = E_0 \\cdot e^{\\gamma \\cdot BP}',
    description: 'Empirical formulation capturing non-linear arterial stiffening as intravascular pressure rises due to progressive collagen fiber recruitment.',
    parameters: [
      'E_0: Zero-pressure baseline arterial elastic modulus (Pa)',
      'γ: Vascular coefficient determined by arterial wall anatomy (~0.016 - 0.022 mmHg⁻¹)',
      'BP: Intravascular arterial blood pressure (mmHg)'
    ],
    paperCitation: 'Mukkamala et al. (Paper 07, p. 3) & Ding et al. (Paper 09, p. 2)',
    significance: 'Enables inversion of PTT to blood pressure: BP = (2/γ) · ln(L / (PTT · c_0)).'
  },
  // 3. Bramwell-Hill
  {
    id: 'eq-bramwell-hill',
    category: 'Hemodynamics',
    title: '3. Bramwell-Hill Arterial Compliance Formulation',
    formula: 'PWV = \\sqrt{\\frac{V}{\\rho \\cdot \\frac{dV}{dP}}} = \\sqrt{\\frac{1}{\\rho \\cdot C_{distension}}}',
    description: 'Formulates pulse wave velocity purely in terms of volumetric arterial compliance (dV/dP) without requiring direct measurement of arterial wall thickness.',
    parameters: [
      'V: Initial vessel blood volume (m³)',
      'dV/dP: Dynamic vascular compliance (m³/Pa)',
      'C_distension: Vascular distensibility coefficient (Pa⁻¹)'
    ],
    paperCitation: 'Slapnicar et al. (Paper 08, p. 4) & Mukkamala et al. (Paper 07, p. 4)',
    significance: 'Provides the theoretical basis for ultrasound and bioimpedance-derived continuous arterial compliance.'
  },
  // 4. Two-Element Windkessel
  {
    id: 'eq-windkessel',
    category: 'Hemodynamics',
    title: '4. Two-Element Windkessel Diastolic Pressure Decay',
    formula: 'P(t) = P_{diastolic} = P_{dicrotic} \\cdot e^{-\\frac{t}{R_{TPR} \\cdot C_{art}}}',
    description: 'Models the exponential diastolic decay of arterial blood pressure as an RC electrical equivalent circuit during aortic valve closure.',
    parameters: [
      'P_dicrotic: Blood pressure at the dicrotic notch incisura (mmHg)',
      'R_TPR: Total peripheral vascular resistance (mmHg · s / mL)',
      'C_art: Total systemic arterial compliance (mL / mmHg)',
      'τ = R · C: Hemodynamic arterial decay time constant (~1.0 - 1.4 seconds)'
    ],
    paperCitation: 'Pereira et al. (Paper 02, p. 3) & Slapnicar et al. (Paper 08, p. 3)',
    significance: 'Enables beat-to-beat diastolic blood pressure (DBP) extraction from PPG diastolic contour slopes.'
  },
  // 5. Augmentation Index & Stiffness Index
  {
    id: 'eq-aix',
    category: 'Hemodynamics',
    title: '5. Augmentation Index (AIx) & Stiffness Index (SI)',
    formula: 'AIx = \\frac{P_2 - P_1}{PP} \\times 100\\%, \\quad SI = \\frac{\\text{Subject Height}}{\\Delta T_{Peak-to-Notch}}',
    description: 'Quantifies arterial wave reflection magnitude and pulse wave velocity across peripheral conduit arteries.',
    parameters: [
      'P_1, P_2: Forward systolic peak and reflected diastolic wave peak pressures',
      'PP: Pulse Pressure (Systolic - Diastolic)',
      'ΔT: Time interval between forward systolic peak and dicrotic notch (seconds)'
    ],
    paperCitation: 'Elgendi et al. (Paper 01, p. 3) & Pereira et al. (Paper 06, p. 2)',
    significance: 'Clinical biomarkers for systemic vascular aging, arteriosclerosis, and coronary heart disease risk.'
  },
  // 6. SDPPG Aging Index
  {
    id: 'eq-sdppg-agi',
    category: 'Hemodynamics',
    title: '6. Second-Derivative PPG (SDPPG / APG) Aging Index',
    formula: 'AGI = \\frac{b - c - d - e}{a}',
    description: 'Mathematical index derived from the five fiducial acceleration waves (a, b, c, d, e) of the second-derivative photoplethysmogram.',
    parameters: [
      'a: Initial positive systolic acceleration peak',
      'b: Early systolic deceleration wave (reflects arterial compliance)',
      'c, d: Reflected intermediate inflection waves',
      'e: Early diastolic re-acceleration wave'
    ],
    paperCitation: 'Elgendi et al. (Paper 01, p. 4) & Mukkamala et al. (Paper 07, p. 3)',
    significance: 'Higher AGI correlates strongly with arterial stiffness, biological vascular age, and hypertension.'
  },
  // 7. Modified Beer-Lambert
  {
    id: 'eq-beer-lambert',
    category: 'Optical & SpO2',
    title: '7. Modified Beer-Lambert Law for Biological Tissue',
    formula: 'A(\\lambda) = \\left[ \\epsilon_{HbO2}(\\lambda) [HbO2] + \\epsilon_{Hb}(\\lambda) [Hb] \\right] \\cdot d \\cdot DPF + G',
    description: 'Governs photon attenuation through multi-layered human tissue, incorporating scattering pathlength lengthening and static tissue loss.',
    parameters: [
      'A(λ): Optical absorbance at wavelength λ',
      'ε_HbO2, ε_Hb: Molar extinction coefficients (cm⁻¹ / M)',
      'd: Geometric physical separation between optical emitter and photodiode (cm)',
      'DPF: Differential Pathlength Factor (typically 3.0–6.0 in biological tissue)',
      'G: Geometry and background scattering loss term'
    ],
    paperCitation: 'Elgendi et al. (Paper 01, p. 2) & Webster et al. (Paper 03, p. 3)',
    significance: 'Theoretical foundation for all non-invasive pulse oximetry and tissue perfusion monitors.'
  },
  // 8. Ratio of Ratios
  {
    id: 'eq-ratio-ratios',
    category: 'Optical & SpO2',
    title: '8. Modulation Ratio-of-Ratios (R) for SpO2 Calibration',
    formula: 'R = \\frac{AC_{660} / DC_{660}}{AC_{940} / DC_{940}}, \\quad SpO2 = A - B \\cdot R \\approx 110 - 25 \\cdot R',
    description: 'Decouples dynamic pulsatile microvascular arterial expansion (AC) from static non-pulsatile venous blood, bone, and skin tissue (DC).',
    parameters: [
      'AC_660, AC_940: Pulsatile peak-to-peak amplitude at Red (660 nm) and Infrared (940 nm)',
      'DC_660, DC_940: Baseline unmodulated optical transmission level',
      'A, B: Empirical clinical calibration constants derived from healthy human desaturation studies'
    ],
    paperCitation: 'Elgendi et al. (Paper 01, p. 3) & Pereira et al. (Paper 02, p. 2)',
    significance: 'Surpasses FDA draft guidance (RMSE < 3.0%) across 70% to 100% arterial blood oxygenation.'
  },
  // 9. Melanin Invariant Attenuation
  {
    id: 'eq-melanin',
    category: 'Optical & SpO2',
    title: '9. Epidermal Melanin Optical Attenuation Law',
    formula: 'I(\\lambda) = I_0 \\cdot e^{-(\\mu_a + \\mu_s\') \\cdot d} \\cdot e^{-\\mu_{melanin}(\\lambda) \\cdot t_{epi}}, \\quad \\mu_{melanin}(\\lambda) = 6.6 \\times 10^{11} \\cdot \\lambda^{-3.33}',
    description: 'Quantifies wavelength-dependent optical absorption by epidermal melanin, which exhibits exponential decay across the visible-to-NIR spectrum.',
    parameters: [
      'μ_melanin(λ): Melanin absorption coefficient (cm⁻¹)',
      't_epi: Epidermal layer thickness (~50 - 100 µm)',
      'Fitzpatrick Phototypes I-VI: Melanin volume fraction ranges from 1.3% (Type I) to 43% (Type VI)'
    ],
    paperCitation: 'Nowara et al. (Paper 23, p. 2) & Wang et al. (Paper 21, p. 4)',
    significance: 'Explains why green rPPG (530 nm) degrades in dark skin tones, mandating POS projection and NIR illumination.'
  },
  // 10. Plane-Orthogonal-to-Skin (POS)
  {
    id: 'eq-pos',
    category: 'Remote rPPG',
    title: '10. Plane-Orthogonal-to-Skin (POS) Algorithm',
    formula: 'S_1(t) = G(t) - B(t), \\quad S_2(t) = G(t) + B(t) - 2R(t), \\quad S(t) = S_1(t) + \\frac{\\sigma(S_1)}{\\sigma(S_2)} \\cdot S_2(t)',
    description: 'Projects temporal RGB facial camera signals onto a 2D plane orthogonal to the skin tone reflection vector, eliminating specular surface reflection motion.',
    parameters: [
      'R(t), G(t), B(t): Temporally normalized RGB color intensities',
      'S_1, S_2: Orthogonal projection coordinates',
      'σ: Rolling standard deviation window (~1.6 seconds)',
      'S(t): Clean pulsatile microvascular blood volume pulse'
    ],
    paperCitation: 'Wang et al. (Paper 21, p. 3) & Nowara et al. (Paper 23, p. 3)',
    significance: 'Eliminates facial tracking and skin calibration requirements, yielding HR MAE of 1.15 BPM.'
  },
  // 11. Chrominance Model (CHROM)
  {
    id: 'eq-chrom',
    category: 'Remote rPPG',
    title: '11. Chrominance-Based (CHROM) Method',
    formula: 'X_s = 3R - 2G, \\quad Y_s = 1.5R + G - 1.5B, \\quad S = X_s - \\frac{\\sigma(X_s)}{\\sigma(Y_s)} \\cdot Y_s',
    description: 'Linear combination of RGB color channels designed to standardize skin color distribution and isolate hemoglobin absorption variance.',
    parameters: [
      'X_s, Y_s: Chrominance difference signals',
      'S: Extracted cardiovascular pulse waveform'
    ],
    paperCitation: 'Wang et al. (Paper 21, p. 2) & Pereira et al. (Paper 26, p. 2)',
    significance: 'Enables real-time remote heart rate estimation at 30 FPS on standard smartphone camera processors.'
  },
  // 12. FMCW Phase Interferometry
  {
    id: 'eq-fmcw-phase',
    category: 'Radar & RF',
    title: '12. FMCW Radar Phase-to-Displacement Interferometry',
    formula: '\\Delta x(t) = \\frac{\\lambda}{4\\pi} \\cdot \\Delta \\phi(t), \\quad \\text{where } \\lambda = \\frac{c}{f_c} = 5 \\text{ mm at } 60 \\text{ GHz}',
    description: 'Directly converts unwrapped microwave phase changes (Δφ) of the reflected radar signal into sub-millimeter chest wall expansion displacements.',
    parameters: [
      'Δx(t): Chest wall displacement (micrometers)',
      'λ: Microwave wavelength (5.0 mm for 60 GHz, 3.9 mm for 77 GHz)',
      'Δφ(t): Demodulated intermediate frequency (IF) phase angle (radians)',
      'Sensitivity: Phase changes by ~1.25 µm per degree of phase rotation'
    ],
    paperCitation: 'Alizadeh et al. (Paper 28, p. 2) & Wang et al. (Paper 32, p. 3)',
    significance: 'Enables sub-50 µm non-contact cardiac ballistocardiogram detection through heavy winter blankets.'
  },
  // 13. Radar Beat Frequency
  {
    id: 'eq-radar-beat',
    category: 'Radar & RF',
    title: '13. Range-Doppler FMCW Beat Frequency Formulation',
    formula: 'f_b = \\frac{2 \\cdot B \\cdot R}{c \\cdot T_c} + \\frac{2 \\cdot v_r \\cdot f_c}{c}',
    description: 'Mathematical formulation of the intermediate frequency (IF) beat tone generated by mixing transmitted and received frequency chirps.',
    parameters: [
      'f_b: Beat frequency (Hz)',
      'B: Chirp frequency bandwidth (4.0 GHz)',
      'R: Target distance from radar antenna (meters)',
      'T_c: Chirp ramp duration (µs)',
      'v_r: Target chest radial velocity (m/s)',
      'Range resolution: ΔR = c / (2B) = 3.75 cm'
    ],
    paperCitation: 'Alizadeh et al. (Paper 28, p. 3) & Chen et al. (Paper 30, p. 2)',
    significance: 'Enables range-gating to isolate patient vital signs while ignoring background room clutter.'
  },
  // 14. HRV Time-Domain (SDNN / RMSSD)
  {
    id: 'eq-hrv',
    category: 'Cardiac & HRV',
    title: '14. Autonomic HRV Time-Domain Metrics (SDNN & RMSSD)',
    formula: 'SDNN = \\sqrt{\\frac{1}{N} \\sum_{i=1}^N (RR_i - \\overline{RR})^2}, \\quad RMSSD = \\sqrt{\\frac{1}{N-1} \\sum_{i=1}^{N-1} (RR_{i+1} - RR_i)^2}',
    description: 'Statistical quantification of inter-beat RR interval variability, indexing overall autonomic regulation and vagal parasympathetic activity.',
    parameters: [
      'RR_i: Consecutive normal-to-normal cardiac R-R intervals (ms)',
      'SDNN: Standard deviation of all NN intervals (reflects total autonomic power)',
      'RMSSD: Root mean square of successive differences (reflects parasympathetic vagal modulation)'
    ],
    paperCitation: 'Shaffer et al. (Paper 15, p. 3) & Hannun et al. (Paper 14, p. 2)',
    significance: 'Depressed RMSSD (<15 ms) strongly predicts mortality, autonomic failure, and imminent septic shock.'
  },
  // 15. Bazett Corrected QT
  {
    id: 'eq-qtc',
    category: 'Cardiac & HRV',
    title: '15. Bazett & Fridericia Heart-Rate Corrected QT (QTc)',
    formula: 'QTc_B = \\frac{QT}{\\sqrt{RR}}, \\quad QTc_F = \\frac{QT}{\\sqrt[3]{RR}}',
    description: 'Normalizes ventricular repolarization duration (QT interval) to a standard heart rate of 60 beats per minute.',
    parameters: [
      'QT: Measured interval from QRS onset to T-wave offset (seconds)',
      'RR: Cardiac cycle length in seconds',
      'Normal QTc: < 450 ms in males, < 460 ms in females; > 500 ms indicates high Torsades de Pointes risk'
    ],
    paperCitation: 'Hannun et al. (Paper 14, p. 4) & Shaffer et al. (Paper 15, p. 4)',
    significance: 'Critical for drug-induced cardiotoxicity monitoring in ICU patients receiving antiarrhythmics or antibiotics.'
  },
  // 16. Shock Index
  {
    id: 'eq-shock-index',
    category: 'Critical Care',
    title: '16. Clinical Shock Index (SI) & Modified Shock Index (MSI)',
    formula: 'SI = \\frac{Heart \\ Rate \\ (BPM)}{Systolic \\ BP \\ (mmHg)}, \\quad MSI = \\frac{Heart \\ Rate}{Mean \\ Arterial \\ Pressure}',
    description: 'Fuses early compensatory tachycardia with impending vascular hypotensive collapse during occult clinical shock.',
    parameters: [
      'Normal SI: 0.5 - 0.7',
      'SI > 0.9: Strongly predicts hyperlactatemia, occult hypoperfusion, and impending ICU admission',
      'SI > 1.3: Associated with >40% mortality in traumatic hemorrhage and septic shock'
    ],
    paperCitation: 'Burdick et al. (Paper 39, p. 2) & Michard et al. (Paper 40, p. 3)',
    significance: 'Far more sensitive than isolated blood pressure or heart rate for early occult shock triage.'
  },
  // 17. NEWS2 Aggregate Score
  {
    id: 'eq-news2',
    category: 'Critical Care',
    title: '17. National Early Warning Score 2 (NEWS2) Penalization',
    formula: 'NEWS2_{Total} = \\sum_{i=1}^7 w_i \\cdot f(Parameter_i), \\quad Score \\ge 7 \\implies \\text{Immediate Red Alert}',
    description: 'Standardized non-linear scoring function weighting respiratory rate, oxygen saturation, supplemental oxygen, systolic BP, pulse, consciousness, and temperature.',
    parameters: [
      'Score 0: Normal physiological range',
      'Score 1-2: Mild to moderate physiological derangement',
      'Score 3: Extreme life-threatening excursion (e.g. SBP ≤ 90 mmHg or RR ≥ 25 BrPM)'
    ],
    paperCitation: 'Michard et al. (Paper 40, p. 2) & Burdick et al. (Paper 39, p. 3)',
    significance: 'Continuous automated calculation reduces hospital ward mortality by 18.2% (p = 0.012).'
  },
  // 18. Compressed Sensing
  {
    id: 'eq-compressed-sensing',
    category: 'Critical Care',
    title: '18. Sub-Nyquist Compressed Sensing L1 Reconstruction',
    formula: '\\min_x \\|x\\|_1 \\quad \\text{subject to } \\|\\mathbf{\\Phi} \\mathbf{\\Psi} x - y\\|_2 \\le \\epsilon',
    description: 'Enables sub-Nyquist reconstruction of sparse physiological signals (ECG, PPG) from randomized low-rate sub-samples, slashing wireless transmission power.',
    parameters: [
      'y: Compressed measurement vector of dimension M << N',
      'Φ: Random Gaussian or Bernoulli sensing matrix',
      'Ψ: Sparsifying wavelet or discrete cosine transform (DCT) basis',
      'x: Sparse physiological coefficients',
      'ε: Bounded measurement noise threshold'
    ],
    paperCitation: 'Pereira et al. (Paper 16, p. 3) & Stergiou et al. (Paper 13, p. 4)',
    significance: 'Reduces wearable edge IoT battery power consumption by 72% while preserving QRS diagnostic fiducials.'
  }
];

export const BenchmarkMatrix: React.FC = () => {
  const [activeModalityTab, setActiveModalityTab] = useState<string>('All');
  const [activeEquationTab, setActiveEquationTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredModalities = MODALITY_DATA.filter((m) => {
    const matchesTab = activeModalityTab === 'All' || m.category === activeModalityTab;
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.principle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.clinicalUtility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.datasets.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const filteredEquations = EQUATION_LIBRARY.filter((eq) => {
    const matchesTab = activeEquationTab === 'All' || eq.category === activeEquationTab;
    const matchesSearch = 
      eq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.paperCitation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.formula.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Title & Enterprise Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-teal-700">
                <Layers className="w-5 h-5" />
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Clinical Modalities, Benchmarks &amp; Mathematical Formulations
                </h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
                Enterprise synthesis of 12 vital signs sensing modalities, 18 governing physical equations, and standardized clinical validation protocols across all 43 indexed research papers.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-2 flex-wrap text-2xs">
              <span className="px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg font-bold flex items-center space-x-1">
                <Activity className="w-3.5 h-3.5 text-teal-600" />
                <span>12 Modalities</span>
              </span>
              <span className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg font-bold flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                <span>18 Mathematical Models</span>
              </span>
              <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>IEEE 1708 &amp; ISO 81060-2</span>
              </span>
            </div>
          </div>

          {/* Unified Global Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all modalities, equations (e.g. Moens-Korteweg, POS, Hughes, radar, Sepsis), datasets, or metrics..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* SECTION 1: Comparative Sensing Modality Trade-Offs */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-3">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-teal-600" />
                <span>Comparative Sensing Modality Trade-Offs (12 Modalities)</span>
              </h3>
              <span className="text-2xs text-slate-500">
                Rigorous empirical comparison across transducers, SNR, power budgets, and clinical datasets
              </span>
            </div>

            {/* Modality Category Filter Tabs */}
            <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
              {['All', 'Optical', 'Biopotential', 'Radar & RF', 'Acoustic & Mechanical', 'Critical Care'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveModalityTab(tab)}
                  className={`px-2.5 py-1 rounded-lg text-2xs font-semibold whitespace-nowrap transition-colors ${
                    activeModalityTab === tab
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase text-2xs tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Modality &amp; Category</th>
                  <th className="py-3 px-4">Transduction &amp; Principle</th>
                  <th className="py-3 px-4">Clinical Accuracy</th>
                  <th className="py-3 px-4">Motion Sensitivity / SNR</th>
                  <th className="py-3 px-4">Power / Energy</th>
                  <th className="py-3 px-4">Primary Datasets</th>
                  <th className="py-3 px-4">Clinical Utility &amp; Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredModalities.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{row.name}</span>
                      <span className="inline-block mt-0.5 px-2 py-0.5 text-3xs font-semibold rounded bg-slate-100 text-slate-600">
                        {row.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs leading-relaxed">
                      {row.principle}
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-700 whitespace-nowrap">
                      {row.accuracy}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-3xs font-bold ${
                        row.motionSensitivity === 'Low' || row.motionSensitivity === 'Immune'
                          ? 'bg-emerald-100 text-emerald-800'
                          : row.motionSensitivity === 'Moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {row.motionSensitivity}
                      </span>
                      <span className="text-3xs text-slate-400 block mt-0.5">SNR: {row.snr}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-2xs whitespace-nowrap">
                      {row.power}
                    </td>
                    <td className="py-3 px-4 font-mono text-2xs text-indigo-900">
                      {row.datasets}
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-2xs text-slate-700 leading-snug">{row.clinicalUtility}</p>
                      <span className="text-3xs text-amber-700 font-bold block mt-1">
                        ✓ {row.standard}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 2: Master Mathematical Models Library (18 Equations) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-teal-600" />
                <span>Peer-Reviewed Mathematical &amp; Physics Formulations (18 Equations)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Core biomedical, hemodynamic, optical, radar, and autonomic formulas directly cited in the 43 corpus papers
              </p>
            </div>

            {/* Equation Category Tabs */}
            <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
              {['All', 'Hemodynamics', 'Optical & SpO2', 'Remote rPPG', 'Radar & RF', 'Cardiac & HRV', 'Critical Care'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveEquationTab(tab)}
                  className={`px-2.5 py-1 rounded-lg text-2xs font-semibold whitespace-nowrap transition-colors ${
                    activeEquationTab === tab
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEquations.map((eq) => (
              <div 
                key={eq.id}
                className="p-4 bg-slate-50/80 hover:bg-slate-50 rounded-xl border border-slate-200/80 space-y-3 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 text-xs">{eq.title}</span>
                    <span className="px-2 py-0.5 rounded text-3xs font-semibold bg-teal-100 text-teal-800 whitespace-nowrap">
                      {eq.category}
                    </span>
                  </div>

                  {/* Formula Box with Copy Button */}
                  <div className="relative group">
                    <code className="block bg-slate-900 text-teal-300 p-3 rounded-lg font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                      {eq.formula}
                    </code>
                    <button
                      type="button"
                      title="Copy formula"
                      onClick={() => handleCopy(eq.id, eq.formula)}
                      className="absolute right-2 top-2 p-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {copiedId === eq.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <p className="text-2xs text-slate-600 leading-relaxed">
                    {eq.description}
                  </p>

                  {/* Parameters Details */}
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 space-y-1">
                    <span className="text-3xs font-bold text-slate-700 uppercase tracking-wider block">
                      Parameter Glossary:
                    </span>
                    <ul className="text-3xs text-slate-500 space-y-0.5 list-disc list-inside">
                      {eq.parameters.map((param, pIdx) => (
                        <li key={pIdx} className="leading-tight">{param}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Citation & Significance */}
                <div className="pt-2 border-t border-slate-200/60 space-y-1">
                  <div className="flex items-center justify-between text-3xs">
                    <span className="text-teal-700 font-semibold flex items-center space-x-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{eq.paperCitation}</span>
                    </span>
                  </div>
                  <p className="text-3xs text-slate-500 italic">
                    Impact: {eq.significance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Regulatory & Validation Standards Framework */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-teal-700 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>AAMI SP10 &amp; ISO 81060-2</span>
            </div>
            <p className="text-2xs text-slate-500 font-semibold uppercase">Blood Pressure Clinical Standard</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mandates Mean Absolute Error (MAE) ≤ 5.0 mmHg and Standard Deviation ≤ 8.0 mmHg across ≥85 human subjects with simultaneous clinical reference auscultation or indwelling arterial cannula.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-indigo-700 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>IEEE 1708 Standard</span>
            </div>
            <p className="text-2xs text-slate-500 font-semibold uppercase">Wearable Cuffless BP Devices</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Defines dynamic perturbation tracking grades (A, B, C) and mandates active hemodynamic stress challenges (cold pressor, isometric handgrip) to prevent regression to the cohort mean.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 80601-2-61 &amp; FDA Guidance</span>
            </div>
            <p className="text-2xs text-slate-500 font-semibold uppercase">Pulse Oximeter Clinical Desaturation</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Requires root-mean-square error (Arms) &lt; 3.0% over controlled clinical hypoxia desaturation ranges (70%–100% SpO2), with balanced demographic Fitzpatrick skin tone representation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
