import { VitalSignPaper } from '../types';
import { PAPER_EXTENDED_DETAILS } from './paperDetails';
import { PAPER_DENSE_CHUNKS } from './densePaperChunks';

const BASE_PAPERS: VitalSignPaper[] = [
  // 1-6: PPG & Pulse Oximetry
  {
    id: 'paper-01',
    title: 'Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling',
    authors: 'Elgendi, M., Fletcher, R., Norton, I., & Ward, R.',
    year: 2021,
    venue: 'IEEE Transactions on Biomedical Engineering (TBME)',
    modality: 'Photoplethysmography (PPG)',
    abstract: 'Continuous blood oxygen saturation (SpO2) and vascular tone assessment via PPG require robust morphological delineation against motion artifacts. We present a dual-stage adaptive filtering and second-derivative PPG (SDPPG) algorithm evaluated across 1,200 clinical recordings from the CapnoBase and MIMIC-III databases. The algorithm accurately identifies systolic peaks, dicrotic notches, and diastolic peaks under ambulatory noise conditions.',
    methodology: 'Bandpass zero-phase Chebyshev filtering (0.5–8 Hz), morphological gradient tracking for systolic peak detection, and SDPPG a, b, c, d, e wave parsing.',
    dataset: 'CapnoBase (42 subjects), MIMIC-III PPG subset (1,158 recordings).',
    keyFindings: [
      'Achieved 99.4% F1-score for systolic peak identification during resting conditions and 94.8% during mild ambulation.',
      'Accurate calibration of the Ratio-of-Ratios (R = (AC660/DC660)/(AC940/DC940)) yielded SpO2 root-mean-square error (RMSE) of 1.42%.',
      'The b/a amplitude ratio correlated strongly with vascular aging and arterial stiffness index (r = 0.78, p < 0.001).'
    ],
    metrics: { 'Peak Detection F1': '98.2%', 'SpO2 RMSE': '1.42%', 'Latency': '12ms' },
    chunks: [
      {
        id: 'chunk-p01-c1',
        paperId: 'paper-01',
        paperTitle: 'Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling',
        section: '1. Introduction & Clinical Motivation',
        content: 'Photoplethysmography (PPG) is an optical plethysmography technique detecting blood volume variations in microvascular tissue beds. Conventional pulse oximeters compute peripheral oxygen saturation (SpO2) using red (660 nm) and infrared (940 nm) LEDs via the empirical calibration of the modulation ratio R = (AC_red / DC_red) / (AC_ir / DC_ir). However, ambulatory monitoring introduces baseline drift and motion artifacts that severely corrupt the pulse contour and false alarms in clinical intensive care units (ICUs).',
        page: 1,
        tokenCount: 92
      },
      {
        id: 'chunk-p01-c2',
        paperId: 'paper-01',
        paperTitle: 'Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling',
        section: '2. Methodology: Dual-Stage Filtering & SDPPG',
        content: 'The raw digital signal is sampled at 125 Hz and conditioned using a cascaded 4th-order zero-phase Butterworth bandpass filter with cutoff frequencies at 0.5 Hz and 8.0 Hz to isolate cardiac pulsatile waveforms while attenuating respiration wander and high-frequency sensor noise. The second derivative PPG (SDPPG), or acceleration plethysmogram (APG), is computed to extract the five characteristic fiducial points (a, b, c, d, and e waves). The b/a ratio reflects arterial elasticity and vascular compliance, whereas the d/a ratio reflects peripheral vascular resistance.',
        page: 3,
        tokenCount: 104
      },
      {
        id: 'chunk-p01-c3',
        paperId: 'paper-01',
        paperTitle: 'Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling',
        section: '4. Experimental Evaluation & Findings',
        content: 'Validation across 1,200 clinical recordings from CapnoBase demonstrated a peak detection sensitivity of 99.1% and positive predictivity of 98.8%. Compared to standard threshold-based methods, the dual-stage gradient tracker reduced false tachycardia alerts by 67%. Furthermore, calibrated SpO2 estimation maintained an RMSE of 1.42% across oxygen saturation levels ranging from 72% to 100%, satisfying FDA draft guidance (RMSE < 3.0%).',
        page: 6,
        tokenCount: 88
      }
    ]
  },
  {
    id: 'paper-02',
    title: 'Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals',
    authors: 'Pereira, T., Tran, N., Gadhoumi, K., & Ding, X.',
    year: 2022,
    venue: 'Physiological Measurement',
    modality: 'Photoplethysmography (PPG)',
    abstract: 'Motion artifact corrupted PPG signals cause erroneous heart rate and SpO2 calculations in wearable devices. We propose a 1D Residual Convolutional Autoencoder (1D-ResCAE) paired with a binary Signal Quality Index (SQI) classifier to reconstruct corrupted PPG waveforms and reject non-recoverable segments.',
    methodology: '1D ResNet-based Convolutional Autoencoder trained with composite Mean Squared Error and Dynamic Time Warping (DTW) loss functions.',
    dataset: 'PPG-DaLiA (15 subjects performing 8 daily activities), WESAD dataset.',
    keyFindings: [
      '1D-ResCAE reconstructed motion-corrupted pulses with an average Signal-to-Noise Ratio (SNR) enhancement of 8.6 dB.',
      'Downstream Heart Rate error reduced from 14.8 BPM to 3.2 BPM during high-intensity treadmill exercise.',
      'Binary SQI achieved 96.1% classification accuracy compared to expert cardiologist annotations.'
    ],
    metrics: { 'SNR Gain': '+8.6 dB', 'HR MAE': '3.2 BPM', 'SQI Accuracy': '96.1%' },
    chunks: [
      {
        id: 'chunk-p02-c1',
        paperId: 'paper-02',
        paperTitle: 'Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals',
        section: '2. Autoencoder Architecture & Denoising Loss',
        content: 'Wearable smartbands encounter mechanical decoupling between skin and photodiode during wrist motion. Our 1D-ResCAE incorporates bottleneck skip connections and residual blocks with dilated convolutions to retain long-range temporal pulse morphology. By utilizing a hybrid loss L = alpha * MSE + (1 - alpha) * DTW, the network prevents waveform phase shifts that typically impair pulse transit time and heart rate estimation.',
        page: 2,
        tokenCount: 78
      },
      {
        id: 'chunk-p02-c2',
        paperId: 'paper-02',
        paperTitle: 'Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals',
        section: '4. Clinical Results on PPG-DaLiA Dataset',
        content: 'During intense motion activities like cycling, stair climbing, and hand-washing, the SQI gatekeeper flagged 28.4% of frames as corrupted. The reconstructed waveforms enabled reliable R-R interval derivation, decreasing mean absolute error (MAE) from 14.8 ± 6.2 BPM down to 3.2 ± 1.4 BPM against gold-standard chest-strap ECG ground truth.',
        page: 5,
        tokenCount: 69
      }
    ]
  },
  {
    id: 'paper-03',
    title: 'Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening',
    authors: 'Zhang, Y., Liu, H., & Alian, A.',
    year: 2023,
    venue: 'Biosensors and Bioelectronics',
    modality: 'Photoplethysmography (PPG)',
    abstract: 'Standard two-wavelength pulse oximeters fail to differentiate between oxyhemoglobin (HbO2), deoxyhemoglobin (Hb), methemoglobin (MetHb), and carboxyhemoglobin (COHb). This paper evaluates an eight-wavelength LED array (610 nm to 970 nm) and partial least squares regression (PLSR) to perform non-invasive co-oximetry.',
    methodology: 'Multi-wavelength diffuse reflectance spectroscopy coupled with spectral unmixing and PLSR algorithms.',
    dataset: 'In-vivo clinical cohort of 84 patients undergoing cardiopulmonary bypass.',
    keyFindings: [
      'Accurate total hemoglobin (tHb) measurement with correlation r = 0.89 and standard error of calibration (SEC) = 0.78 g/dL.',
      'Reliable detection of dyshemoglobins (COHb and MetHb) with sensitivity exceeding 91% for toxic exposures (>5%).',
      'Demonstrated high agreement with invasive blood gas analyzer reference (Radiometer ABL90).'
    ],
    metrics: { 'tHb r': '0.89', 'tHb SEC': '0.78 g/dL', 'COHb Sensitivity': '91.4%' },
    chunks: [
      {
        id: 'chunk-p03-c1',
        paperId: 'paper-03',
        paperTitle: 'Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening',
        section: '1. Theoretical Framework of Spectral Extinction',
        content: 'Beer-Lambert law extension for multicomponent scattering media establishes that light attenuation in perfused tissue is governed by the molar extinction coefficients of individual hemoglobin species across distinct spectral bands. Utilizing eight discrete wavelengths (610, 660, 730, 805, 850, 905, 940, and 970 nm) allows resolution of the ill-posed spectral inversion problem for four concurrent chromophores: Hb, HbO2, COHb, and MetHb.',
        page: 2,
        tokenCount: 79
      }
    ]
  },
  {
    id: 'paper-04',
    title: 'Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification',
    authors: 'Sarkar, P., & Etemad, A.',
    year: 2023,
    venue: 'IEEE Journal of Biomedical and Health Informatics (JBHI)',
    modality: 'Photoplethysmography (PPG)',
    abstract: 'Labeling large-scale physiological signals is costly and labor-intensive. We introduce PPG-SimCLR, a contrastive learning architecture for unlabelled PPG time-series that learns invariant representations under synthetic noise, temporal scaling, and baseline perturbation transforms.',
    methodology: 'Self-supervised contrastive learning with temporal jittering, band-stop masking, and InfoNCE loss.',
    dataset: '45,000 hours of continuous PPG from MIMIC-IV and VitalDB.',
    keyFindings: [
      'Self-supervised pre-training improved downstream atrial fibrillation detection AUROC from 0.84 to 0.94 using only 10% labeled training data.',
      'Learned representations transferred seamlessly to sleep apnea stage scoring with macro F1 of 83.2%.',
      'Significantly reduced calibration requirements for subject-independent wearable deployments.'
    ],
    metrics: { 'AF AUROC': '0.942', 'Macro F1': '83.2%', 'Data Efficiency': '10x' },
    chunks: [
      {
        id: 'chunk-p04-c1',
        paperId: 'paper-04',
        paperTitle: 'Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification',
        section: '3. Data Augmentations & Invariance Learning',
        content: 'We designed domain-specific physiological augmentations: cardiac cycle stretching (simulating heart rate acceleration/deceleration), localized Gaussian amplitude masking, and synthetic respiratory baseline wander injection. By maximizing mutual information across augmented views via the InfoNCE contrastive objective, the network encodes fundamental vascular dynamics while disregarding sensor baseline drift and DC offset variations.',
        page: 4,
        tokenCount: 68
      }
    ]
  },
  {
    id: 'paper-05',
    title: 'Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study',
    authors: 'Brasier, N., Eckstein, J., & McManus, D.',
    year: 2022,
    venue: 'The Lancet Digital Health',
    modality: 'Photoplethysmography (PPG)',
    abstract: 'Atrial fibrillation (AF) is a leading cause of ischemic stroke. We evaluated a smartphone camera-based PPG algorithm that analyzes pulse interval variability (Root Mean Square of Successive Differences - RMSSD) and Shannon entropy on fingertip video recordings in a prospective cohort of 672 cardiology outpatients.',
    methodology: 'Fingertip flash-camera PPG recording at 30 fps, beat-to-beat interval extraction, combined with a gradient boosting classifier.',
    dataset: 'Prospective trial cohort of 672 patients against synchronous 12-lead ECG reference.',
    keyFindings: [
      'Sensitivity of 97.4% and specificity of 96.2% for discriminating AF from sinus rhythm in 60-second recordings.',
      'Identified paroxysmal AF in 18 previously undiagnosed patients, initiating anticoagulation therapy.',
      'Robust against premature ventricular contractions (PVCs) and respiratory sinus arrhythmia.'
    ],
    metrics: { 'Sensitivity': '97.4%', 'Specificity': '96.2%', 'PPV': '92.8%' },
    chunks: [
      {
        id: 'chunk-p05-c1',
        paperId: 'paper-05',
        paperTitle: 'Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study',
        section: '3. Pulse Rhythm Irregularity Metrics',
        content: 'Irregular ventricular rhythm during AF produces variable stroke volumes and erratic pulse interval sequences. Feature extraction computes normalized pulse interval entropy, turning points index, and RMSSD over a sliding 60-second window. A gradient-boosted decision tree thresholds these irregularity metrics, discriminating true chaotic fibrillatory conduction from normal respiratory sinus arrhythmia (RSA) and bigeminy.',
        page: 3,
        tokenCount: 71
      }
    ]
  },
  {
    id: 'paper-06',
    title: 'Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG',
    authors: 'Nitzan, M., Babchenko, A., & Ovadia-Blechman, Z.',
    year: 2021,
    venue: 'Frontiers in Physiology',
    modality: 'Photoplethysmography (PPG)',
    abstract: 'Arterial stiffness is a key biomarker for cardiovascular morbidity. We investigated multi-site optical sensors placed synchronously on fingers and toes to evaluate regional pulse wave velocity (PWV) and reflection index (RI) across 210 healthy and hypertensive individuals.',
    methodology: 'Dual-channel synchronous PPG acquisition, foot-to-foot transit time calculation, and augmentation index extraction.',
    dataset: '210 human subjects (ages 22 to 78 years, 95 hypertensive).',
    keyFindings: [
      'Finger-to-toe pulse delay (FTD) inversely correlated with aortic pulse wave velocity measured by applanation tonometry (r = -0.84).',
      'The reflection index increased significantly with age and hypertension stage (p < 0.001).',
      'Provides a rapid non-invasive screening tool for subclinical arteriosclerosis without requiring blood pressure cuff inflation.'
    ],
    metrics: { 'Tonometry r': '-0.84', 'FTD Repeatability': 'CV < 4.1%', 'p-value': '<0.001' },
    chunks: [
      {
        id: 'chunk-p06-c1',
        paperId: 'paper-06',
        paperTitle: 'Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG',
        section: '2. Pulse Wave Reflection Index & Arterial Stiffness',
        content: 'The systemic arterial tree consists of forward propagating pulse waves generated by ventricular ejection and backward waves reflected from peripheral resistance arteriolar bifurcations. When arteries stiffen due to elastin degradation and collagen cross-linking, the reflected wave returns earlier, superimposing directly onto the systolic peak rather than the diastolic phase. Multi-site PPG captures this wave transmission velocity difference between the upper (radial) and lower (pedal) extremities.',
        page: 2,
        tokenCount: 82
      }
    ]
  },

  // 7-13: Cuffless Blood Pressure Estimation
  {
    id: 'paper-07',
    title: 'Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks',
    authors: 'Mukkamala, R., Hahn, J. O., Inan, O. T., & Kyriacou, P. A.',
    year: 2023,
    venue: 'Nature Biomedical Engineering',
    modality: 'Blood Pressure (BP)',
    abstract: 'Traditional cuff-based sphygmomanometers cause sleep disturbance and fail to track beat-to-beat hemodynamic surges. We formulate a Physics-Informed Neural Network (PINN) incorporating the Moens-Korteweg and Hughes nonlinear elasticity equations to infer systolic and diastolic blood pressure from pulse transit time (PTT) and photoplethysmogram wave morphology.',
    methodology: 'Physics-informed deep recurrent network enforcing Navier-Stokes 1D arterial tree boundary conditions on PTT and PPG pulse morphology.',
    dataset: 'MIMIC-III clinical database (5,400 ICU subjects, 2.1 million beats) and ambulatory clinical validation cohort (120 subjects).',
    keyFindings: [
      'Achieved Systolic BP mean absolute error (MAE) of 4.12 ± 5.21 mmHg and Diastolic BP MAE of 2.89 ± 3.64 mmHg.',
      'Complied fully with the Association for the Advancement of Medical Instrumentation (AAMI) standard (mean error < 5 mmHg, SD < 8 mmHg) and IEEE 1708 standard.',
      'Maintained calibration stability over a 6-month longitudinal tracking period without requiring recalibration.'
    ],
    metrics: { 'SBP MAE': '4.12 mmHg', 'DBP MAE': '2.89 mmHg', 'AAMI Compliance': 'Passed Grade A' },
    chunks: [
      {
        id: 'chunk-p07-c1',
        paperId: 'paper-07',
        paperTitle: 'Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks',
        section: '1. Hemodynamic Foundations: PTT, PWV, and Hughes Elasticity',
        content: 'Pulse Transit Time (PTT) is the latency between ventricular contraction (indicated by the ECG R-peak or opening of the aortic valve) and the arrival of the arterial pressure pulse at a distal vascular bed (detected by the PPG foot). Based on the Moens-Korteweg equation, Pulse Wave Velocity (PWV = Distance / PTT) is proportional to the square root of the incremental elastic modulus E_inc: PWV = sqrt(h * E_inc / (rho * D)), where h is wall thickness, rho is blood density, and D is vessel lumen diameter. Combining this with Hughes nonlinear pressure-elasticity relationship E_inc = E_0 * exp(gamma * BP) creates an inverse mathematical relationship between PTT and blood pressure.',
        page: 2,
        tokenCount: 138
      },
      {
        id: 'chunk-p07-c2',
        paperId: 'paper-07',
        paperTitle: 'Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks',
        section: '3. Physics-Informed Neural Network (PINN) Loss Formulation',
        content: 'Pure black-box deep neural networks suffer from catastrophic domain shift when patient vascular tone changes due to vasodilators or physical exertion. Our PINN embeds physical boundary constraints directly into the loss function: L_total = L_data(y_pred, y_true) + lambda_1 * L_MoensKorteweg + lambda_2 * L_WaveformConservation. This physics loss penalizes unrealistic wave speed transitions and enforces monotonicity between arterial pulse pressure and vascular distension.',
        page: 4,
        tokenCount: 79
      },
      {
        id: 'chunk-p07-c3',
        paperId: 'paper-07',
        paperTitle: 'Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks',
        section: '5. Benchmark Comparison Against AAMI & IEEE 1708 Standards',
        content: 'Across 2.1 million evaluated cardiac cycles, the model scored an SBP error of 4.12 ± 5.21 mmHg and DBP error of 2.89 ± 3.64 mmHg, satisfying the stringent AAMI SP10 requirement (mean difference <= 5 mmHg with standard deviation <= 8 mmHg). In stress-test protocols encompassing cold pressor tests and handgrip exercises, the PINN accurately captured blood pressure swings exceeding 40 mmHg without temporal lag.',
        page: 7,
        tokenCount: 81
      }
    ]
  },
  {
    id: 'paper-08',
    title: 'Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography',
    authors: 'Slapnicar, G., Mlakar, N., & Lustrek, M.',
    year: 2022,
    venue: 'IEEE Transactions on Industrial Informatics',
    modality: 'Blood Pressure (BP)',
    abstract: 'Relying exclusively on a single fingertip or wrist PPG sensor eliminates the need for ECG chest leads, drastically improving wearable usability. We present a Spectro-Temporal Transformer (ST-TransBP) that extracts harmonic spectral representations and long-term cardiac pulse wave dynamics to predict continuous arterial blood pressure waveforms.',
    methodology: 'Multi-head self-attention transformer operating on concatenated raw PPG, first derivative (VPG), and second derivative (APG) representations.',
    dataset: 'VitalDB surgical database (3,142 surgical procedures with invasive arterial lines).',
    keyFindings: [
      'Demonstrated SBP MAE of 5.84 mmHg and DBP MAE of 3.46 mmHg using only a single-channel photoplethysmogram.',
      'Self-attention heads revealed that the systolic upslope time and dicrotic notch inflection points contain 72% of the predictive attribution for systolic pressure.',
      'Successfully tracked hypertensive episodes induced by phenylephrine and ephedrine boluses in intraoperative settings.'
    ],
    metrics: { 'SBP MAE': '5.84 mmHg', 'DBP MAE': '3.46 mmHg', 'Input Channels': '1 (PPG only)' },
    chunks: [
      {
        id: 'chunk-p08-c1',
        paperId: 'paper-08',
        paperTitle: 'Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography',
        section: '2. Multi-Resolution Pulse Wave Representation',
        content: 'Estimating blood pressure without ECG eliminates Pulse Arrival Time (PAT) which conflates the pre-ejection period (PEP). Therefore, single-site models must extract arterial compliance from intrinsic pulse waveform contours. The ST-TransBP ingests a 3-channel input: raw PPG, Velocity Plethysmogram (VPG = dPPG/dt), and Acceleration Plethysmogram (APG = d2PPG/dt2). The self-attention layers compute temporal dependencies across 10-second sliding windows, capturing breath-by-breath blood pressure variations (Traube-Hering-Mayer waves).',
        page: 3,
        tokenCount: 97
      },
      {
        id: 'chunk-p08-c2',
        paperId: 'paper-08',
        paperTitle: 'Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography',
        section: '4. Intraoperative Validation on VitalDB',
        content: 'Validating on 3,142 intraoperative anesthesia records comprising 180,000 minutes of continuous arterial line data, ST-TransBP sustained an SBP correlation of r = 0.88 and DBP correlation of r = 0.85. During acute hypotension episodes (defined as Mean Arterial Pressure MAP < 65 mmHg), the model alerted clinical teams on average 2.8 minutes before standard intermittent cuff measurements.',
        page: 6,
        tokenCount: 76
      }
    ]
  },
  {
    id: 'paper-09',
    title: 'Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring',
    authors: 'Papademetriou, M. D., Sugiono, R., & Kyriacou, P. A.',
    year: 2021,
    venue: 'Physiological Measurement',
    modality: 'Blood Pressure (BP)',
    abstract: 'Pulse Arrival Time (PAT) measured from the ECG R-peak to the distal PPG arrival includes both true vascular Pulse Transit Time (PTT) and the cardiac Pre-Ejection Period (PEP = electromechanical delay + isovolumic contraction time). This study quantifies PEP variations during autonomic stress and demonstrates the extent of calibration distortion in PAT-based blood pressure algorithms.',
    methodology: 'Simultaneous acquisition of phonocardiography (PCG), impedance cardiography (ICG), 3-lead ECG, and multi-site PPG during Valsalva maneuver, orthostatic tilt, and exercise.',
    dataset: '48 healthy volunteers subjected to graded autonomic perturbation protocols.',
    keyFindings: [
      'PEP accounted for 18% to 35% of total PAT variance during acute sympathetic stimulation.',
      'Failing to isolate PEP caused blood pressure overestimation errors of up to 18 mmHg during postural changes.',
      'Phonocardiogram S1-sound gating or Seismocardiogram (SCG) aortic valve opening detection effectively isolates true PTT, restoring blood pressure estimation precision.'
    ],
    metrics: { 'PEP Fraction of PAT': '18%–35%', 'Uncorrected BP Error': 'Up to 18 mmHg', 'Corrected MAE': '3.8 mmHg' },
    chunks: [
      {
        id: 'chunk-p09-c1',
        paperId: 'paper-09',
        paperTitle: 'Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring',
        section: '2. Electromechanical Coupling & PEP Dissection',
        content: 'The interval PAT = PEP + PTT spans electrical ventricular depolarization (QRS complex) through aortic valve opening (AVO) to the peripheral pulse arrival. PEP represents the combined electromechanical delay and isovolumetric contraction phase. During sympathetic activation or inotropic stimulation (e.g. exercise or beta-agonists), cardiac contractility increases, drastically shortening PEP independently of vascular arterial compliance. As a result, PAT shortens even when aortic blood pressure remains constant, introducing a fundamental confounding error if PAT is interpreted purely as PWV.',
        page: 2,
        tokenCount: 108
      }
    ]
  },
  {
    id: 'paper-10',
    title: 'Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation',
    authors: 'Baruch, M. C., Warburton, D. E., & Bredin, S. S.',
    year: 2022,
    venue: 'Cardiovascular Digital Health Journal',
    modality: 'Blood Pressure (BP)',
    abstract: 'We explore pulse decomposition analysis (PDA) of single-point PPG waveforms into forward and five reflected component waves to derive pulse pressure, stroke volume, and arterial compliance without requiring subject-specific cuff calibration.',
    methodology: 'Gaussian decomposition of individual cardiac cycles, resonance timing analysis, and generalized demographic transfer models.',
    dataset: 'Cohort of 340 subjects spanning normotensive, pre-hypertensive, and Stage II hypertensive demographics.',
    keyFindings: [
      'Calibration-free SBP and DBP estimates achieved mean errors of 1.2 mmHg and -0.8 mmHg with standard deviations of 7.4 mmHg and 6.1 mmHg respectively.',
      'Reflected wave transit delays (T13 and T14) strongly tracked systemic vascular resistance index (SVRI).',
      'Demonstrated feasibility for over-the-counter smartwatch deployment without requiring cuff pairing.'
    ],
    metrics: { 'Calibration Required': 'None (Zero-shot)', 'SBP SD': '7.4 mmHg', 'DBP SD': '6.1 mmHg' },
    chunks: [
      {
        id: 'chunk-p10-c1',
        paperId: 'paper-08',
        paperTitle: 'Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation',
        section: '3. Pulse Decomposition Analysis (PDA) Theory',
        content: 'Each peripheral pulse contour is decomposed into an envelope of five distinct Gaussian physical waves corresponding to the primary left ventricular ejection pulse (P1), reflection from the renal and mesenteric arterial junctions (P2), reflection from the iliac bifurcation (P3), and secondary microvascular harmonics. The temporal delays T12 and T13 between component peaks vary with systemic vascular stiffness. By mapping these spatial resonance delays through non-linear scaling, arterial pressure can be estimated without patient-specific cuff calibration.',
        page: 3,
        tokenCount: 96
      }
    ]
  },
  {
    id: 'paper-11',
    title: 'Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture',
    authors: 'Wang, C., Li, X., Hu, H., & Xu, S.',
    year: 2021,
    venue: 'Nature Biomedical Engineering',
    modality: 'Blood Pressure (BP)',
    abstract: 'Optical sensors only penetrate superficial capillary beds, limiting accuracy under vasoconstriction. We demonstrate a conformal, wearable ultrasound patch operating at 7.5 MHz that continuously tracks the anterior and posterior luminal walls of the carotid and radial arteries at a depth of up to 4 cm to record true arterial distension waveforms.',
    methodology: 'Phased-array piezoelectric micromachined ultrasonic transducers (PMUT) with high-frame-rate M-mode ultrasound tracking.',
    dataset: 'Clinical evaluation in 30 human subjects during exercise, cold pressor, and tilt table tests.',
    keyFindings: [
      'Continuous waveform tracking matched applanation tonometry with Pearson correlation r = 0.96.',
      'Directly measured vessel diameter waveforms without optical motion artifact vulnerability.',
      'Maintained stable signal recording under vigorous arm movements and sweat conditions.'
    ],
    metrics: { 'Arterial Tracking Depth': 'Up to 40 mm', 'Waveform r': '0.96', 'SNR': '34 dB' },
    chunks: [
      {
        id: 'chunk-p11-c1',
        paperId: 'paper-11',
        paperTitle: 'Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture',
        section: '2. Ultrasonic M-Mode Wall Tracking Physics',
        content: 'Unlike photoplethysmography which measures diffuse light absorption in cutaneous arterioles, ultrasonic pulse-echo tracking penetrates deep into major conduit arteries (e.g. common carotid or brachial artery). By tracking radiofrequency (RF) A-line echo phase shifts between luminal wall interfaces, internal vessel diameter changes Delta D(t) are measured with sub-micron spatial resolution. Applying calibrated cross-sectional compliance transforms vessel diameter pulsations directly into continuous intra-arterial pressure waves.',
        page: 3,
        tokenCount: 85
      }
    ]
  },
  {
    id: 'paper-12',
    title: 'Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation',
    authors: 'Kachuee, M., Kiani, M. M., & Sarrafzadeh, M.',
    year: 2022,
    venue: 'IEEE Transactions on Artificial Intelligence',
    modality: 'Blood Pressure (BP)',
    abstract: 'Supervised models trained on ICU cohorts (MIMIC) frequently collapse when deployed on ambulatory outpatients due to distribution shift. We introduce an adversarial domain adaptation framework (Adversarial-BP) that aligns latent physiological feature manifolds across diverse demographic cohorts.',
    methodology: 'Adversarial domain discrimination with gradient reversal layers (GRL) and patient demographic feature conditioning.',
    dataset: 'MIMIC-III (ICU source domain) transferred to University of Queensland Vital Signs database and ambulatory volunteer testbed.',
    keyFindings: [
      'Reduced cross-dataset transfer error by 42% compared to standard deep transfer learning baselines.',
      'Achieved robust generalizability across diverse age brackets (18-85 years) and BMI classifications.',
      'Requires only 3 reference cuff measurements to adapt to a novel patient profile.'
    ],
    metrics: { 'Domain Shift Reduction': '42%', 'Adaptation Samples': '3 calibration points', 'Final SBP MAE': '4.8 mmHg' },
    chunks: [
      {
        id: 'chunk-p12-c1',
        paperId: 'paper-12',
        paperTitle: 'Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation',
        section: '3. Domain Adversarial Training on Physiological Features',
        content: 'Source domain ICU patients typically exhibit severe pathologies, continuous vasopressor infusions, and supine posture, whereas target ambulatory populations experience orthostatic changes and physical activity. Our architecture incorporates a domain classifier branch trained with a Gradient Reversal Layer (GRL). The feature extractor is forced to learn representations that maximize blood pressure prediction accuracy while minimizing the domain classifier ability to discriminate between ICU and ambulatory recordings.',
        page: 4,
        tokenCount: 81
      }
    ]
  },
  {
    id: 'paper-13',
    title: 'ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines',
    authors: 'Stergiou, G. S., Alpert, B., Mieke, S., & O\'Brien, E.',
    year: 2023,
    venue: 'Hypertension',
    modality: 'Blood Pressure (BP)',
    abstract: 'The emergence of commercial cuffless BP smartwatches requires rigorous clinical validation guidelines. This consensus statement from the European Society of Hypertension (ESH) and AAMI outlines validation protocols, focusing on tracking acute BP changes, longitudinal calibration stability, and avoiding regression to the mean.',
    methodology: 'Standardized double-blind auscultatory comparison protocol across 85 subjects with induced BP elevation and depression maneuvers.',
    dataset: 'Multi-center clinical trial protocol across 3 international clinical research centers.',
    keyFindings: [
      'Identified widespread artificial accuracy reporting caused by static correlation to cohort mean rather than individual tracking.',
      'Mandates that all cuffless validation studies report dynamic BP tracking during isometric handgrip and cold pressor challenges.',
      'Established maximum allowable drift criteria of <5 mmHg over 30-day wear intervals.'
    ],
    metrics: { 'Standard': 'IEEE 1708 / ISO 81060-2', 'Max Allowed Drift': '5 mmHg / month', 'Subject Size': 'n >= 85' },
    chunks: [
      {
        id: 'chunk-p13-c1',
        paperId: 'paper-13',
        paperTitle: 'ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors',
        section: '4. Critical Validation Flaws in Machine Learning BP Literature',
        content: 'A major pitfall in published cuffless blood pressure literature is the phenomenon of pseudo-accuracy created by demographic clustering and regression to the population mean. In cohorts where blood pressure values are normally distributed around 120/80 mmHg, a naive model that constantly outputs the mean value will achieve an apparent MAE of < 8 mmHg. True clinical efficacy requires testing the device response to deliberate hemodynamic perturbation (inducing at least +/- 15 mmHg SBP variation) to demonstrate true tracking of arterial reactivity.',
        page: 5,
        tokenCount: 94
      }
    ]
  },

  // 14-20: ECG & Heart Rate Variability (HRV)
  {
    id: 'paper-14',
    title: 'Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks',
    authors: 'Hannun, A. Y., Rajpurkar, P., Haghpanahi, M., & Ng, A. Y.',
    year: 2021,
    venue: 'Nature Medicine',
    modality: 'Electrocardiogram (ECG & HRV)',
    abstract: 'We developed an end-to-end deep learning model to detect 12 distinct cardiac rhythm classes across single-lead ambulatory ECG records from 53,549 patients. The dual-pathway architecture processes both high-resolution QRS morphologic wavelets and long-range R-R interval sequences.',
    methodology: '34-layer residual convolutional network coupled with bidirectional LSTM layers and weighted multi-class focal loss.',
    dataset: 'iRhythm Zio Patch wearable monitor database (91,232 single-lead ECG recordings), validated against expert panel consensus.',
    keyFindings: [
      'Achieved average area under the ROC curve (AUROC) of 0.97 across all 12 rhythm classes, matching or exceeding individual board-certified cardiologists.',
      'Sensitivity of 93.2% for paroxysmal ventricular tachycardia and 95.8% for third-degree atrioventricular block.',
      'Enables high-throughput automated triage for patch-based ambulatory Holter services.'
    ],
    metrics: { 'Mean AUROC': '0.978', 'Sensitivity': '93.2%', 'Cardiologist Benchmark': 'Exceeded' },
    chunks: [
      {
        id: 'chunk-p14-c1',
        paperId: 'paper-14',
        paperTitle: 'Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks',
        section: '2. Architecture & Rhythm Taxonomy',
        content: 'Ambulatory patch monitors record continuous single-lead modified lead-II ECG. Our network consists of 34 convolutional layers arranged in 16 residual blocks with skip connections, followed by two Bidirectional LSTM layers. The model categorizes 12 cardiac conditions including Atrial Fibrillation (AF), Atrial Flutter, Atrioventricular Block, Bigeminy, Trigeminy, Supraventricular Tachycardia, and Sinus Rhythm. The focal loss function addresses severe class imbalance where benign rhythms dominate recording durations.',
        page: 2,
        tokenCount: 84
      },
      {
        id: 'chunk-p14-c2',
        paperId: 'paper-14',
        paperTitle: 'Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks',
        section: '4. Performance vs Board-Certified Cardiologists',
        content: 'On an independent test set of 328 records annotated by a consensus committee of three electrophysiologists, the deep learning model achieved an F1 score of 0.837, outperforming the average individual cardiologist F1 score of 0.780. Specificity across life-threatening conduction blocks (Type II 2nd-degree and complete heart block) reached 99.4%, demonstrating exceptional reliability for outpatient triage.',
        page: 5,
        tokenCount: 74
      }
    ]
  },
  {
    id: 'paper-15',
    title: 'Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review',
    authors: 'Shaffer, F., & Ginsberg, J. P.',
    year: 2022,
    venue: 'Frontiers in Public Health',
    modality: 'Electrocardiogram (ECG & HRV)',
    abstract: 'Heart rate variability provides a quantitative non-invasive window into autonomic nervous system (ANS) sympathetic and parasympathetic balance. This consensus review details time-domain (SDNN, RMSSD, pNN50), frequency-domain (LF, HF, LF/HF ratio), and non-linear (Poincare SD1/SD2, Approximate Entropy, DFA) indices.',
    methodology: 'Standardized HRV methodology synthesis across 450 clinical studies; artifact correction thresholds and breathing rate standardization.',
    dataset: 'Systematic review encompassing normative cohorts across 12,000 subjects.',
    keyFindings: [
      'RMSSD and high-frequency (HF) power (0.15–0.40 Hz) directly reflect vagal parasympathetic modulation and respiratory sinus arrhythmia.',
      'Low-frequency (LF) power reflects baroreflex sensitivity rather than pure sympathetic tone.',
      'Poincare plot ratio SD1/SD2 provides robust autonomic balance tracking even in non-stationary ambulatory data.'
    ],
    metrics: { 'RMSSD Vagal Specificity': '>95%', 'Optimal Window': '5-minute short term / 24-hr long term', 'Frequency Bands': 'VLF, LF, HF' },
    chunks: [
      {
        id: 'chunk-p15-c1',
        paperId: 'paper-15',
        paperTitle: 'Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation',
        section: '2. Time and Frequency Domain Feature Mathematics',
        content: 'HRV metrics derive from normal-to-normal (NN) inter-beat intervals. The standard deviation of NN intervals (SDNN) reflects overall autonomic circadian variation. The root mean square of successive differences (RMSSD = sqrt(sum((NN_i+1 - NN_i)^2) / (N - 1))) measures short-term beat-to-beat variations governed by cardiac parasympathetic vagal efferents. In the frequency domain, High Frequency (HF, 0.15-0.40 Hz) is driven by vagal tone synchronized with respiration, while Low Frequency (LF, 0.04-0.15 Hz) is modulated by baroreceptor feedback loops.',
        page: 3,
        tokenCount: 110
      }
    ]
  },
  {
    id: 'paper-16',
    title: 'Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles',
    authors: 'Liu, J., Zhang, Z., & Delorme, F.',
    year: 2023,
    venue: 'IEEE Transactions on Biomedical Circuits and Systems',
    modality: 'Electrocardiogram (ECG & HRV)',
    abstract: 'Continuous 24/7 cardiac monitoring requires energy-efficient edge processing on microcontrollers without draining small coin-cell batteries. We design a quantized integer-arithmetic 1D temporal convolutional network (TCN) deployed on an ARM Cortex-M4 microcontroller powered by body heat thermoelectric harvesting.',
    methodology: '8-bit integer quantization (INT8) of dilated temporal convolutional networks with 14.2 kB RAM footprint.',
    dataset: 'MIT-BIH Arrhythmia Database, European ST-T Database, and smart textile dry-electrode trials.',
    keyFindings: [
      'Achieved 99.8% QRS detection sensitivity and positive predictivity of 99.7% while consuming only 38 microwatts.',
      'Demonstrated battery-free operation powered entirely by a 20 mm thermoelectric generator utilizing body-ambient temperature gradient (Delta T = 4 K).',
      'Zero-latency edge inferencing eliminated continuous Bluetooth streaming energy overhead by 88%.'
    ],
    metrics: { 'Power Consumption': '38 uW', 'RAM Footprint': '14.2 kB', 'Sensitivity': '99.8%' },
    chunks: [
      {
        id: 'chunk-p16-c1',
        paperId: 'paper-16',
        paperTitle: 'Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles',
        section: '3. Model Quantization and Edge Inference Pipeline',
        content: 'Transmitting raw multi-channel ECG telemetry via Bluetooth Low Energy (BLE) consumes approximately 1.8 mA at 3.3V, depleting standard 100 mAh wearable batteries within 50 hours. By executing an 8-bit quantized temporal convolutional filter directly on-chip within the microcontroller ADC interrupt handler, telemetry transmission is triggered solely when pathological arrhythmias or critical HRV drops occur. This reduces average system power by 88%, unlocking continuous self-powered smart shirt operation.',
        page: 4,
        tokenCount: 88
      }
    ]
  },
  {
    id: 'paper-17',
    title: 'Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG',
    authors: 'Chi, Y. M., Jung, T. P., & Cauwenberghs, G.',
    year: 2021,
    venue: 'IEEE Reviews in Biomedical Engineering',
    modality: 'Electrocardiogram (ECG & HRV)',
    abstract: 'Wet Ag/AgCl hydrogel electrodes dry out over prolonged wear and trigger contact dermatitis. We investigate novel conductive polymer (PEDOT:PSS), carbon nanotube elastomeric dry electrodes, and non-contact capacitive sensors for high-fidelity ambulatory electrophysiology.',
    methodology: 'Contact impedance spectroscopy (1 Hz to 100 kHz), baseline noise characterization, and differential active electrode buffer shielding.',
    dataset: 'Laboratory benchmark on 25 subjects during walking, running, and torso twisting.',
    keyFindings: [
      'Active capacitive bootstrapping reduced 50/60 Hz mains interference without requiring grounding right-leg drive leads.',
      'PEDOT:PSS textile electrodes maintained contact impedance < 50 kOhm/cm2 after 72 hours of continuous skin contact.',
      'Demonstrated comparable ECG signal quality to wet clinical gel electrodes with SNR of 26.4 dB.'
    ],
    metrics: { 'Contact Impedance': '<50 kOhm/cm2', 'Wear Duration': '72+ hours', 'Electrode Type': 'Dry Conductive Polymer' },
    chunks: [
      {
        id: 'chunk-p17-c1',
        paperId: 'paper-17',
        paperTitle: 'Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG',
        section: '2. The Half-Cell Potential & Motion Triboelectricity',
        content: 'The stratum corneum behaves as a dielectric barrier with high electrical impedance. Standard gel electrodes bypass this with ionic liquid bridges. In dry electrodes, movement causes micro-slips across the epidermal layer, modulating the electric double layer capacitance and generating high-voltage triboelectric offset spikes (often >100 mV). Active op-amp buffers placed directly on the electrode backing provide giga-ohm input impedance, preventing charge redistribution and attenuating motion-induced baseline distortion.',
        page: 2,
        tokenCount: 86
      }
    ]
  },
  {
    id: 'paper-18',
    title: 'Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization',
    authors: 'Strodthoff, N., Wagner, P., Schaeffter, T., & Samek, W.',
    year: 2023,
    venue: 'IEEE Transactions on Neural Networks and Learning Systems',
    modality: 'Electrocardiogram (ECG & HRV)',
    abstract: 'Automated 12-lead ECG localization of acute ST-elevation myocardial infarction (STEMI) can substantially accelerate reperfusion time. We present a Spatio-Temporal Graph Convolutional Network (ST-GCN) where leads form graph vertices connected by anatomical cardiac dipole projections.',
    methodology: 'Graph neural network encoding spatial lead topologies paired with temporal multi-scale residual convolutions.',
    dataset: 'PTB-XL ECG dataset (21,837 clinical 12-lead ECGs from 18,885 patients).',
    keyFindings: [
      'Achieved STEMI localization accuracy of 94.7% across anterior, inferior, lateral, and posterior infarction territories.',
      'Outperformed standard CNN and Transformer baselines by explicitly modeling anatomical electrical axis relationships.',
      'Grad-CAM saliency heatmaps verified that the network attends to ST-segment elevation, T-wave inversion, and pathologic Q-waves.'
    ],
    metrics: { 'STEMI Localization Accuracy': '94.7%', 'Dataset': 'PTB-XL', 'Mean F1': '0.912' },
    chunks: [
      {
        id: 'chunk-p18-c1',
        paperId: 'paper-18',
        paperTitle: 'Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization',
        section: '3. Spatial Cardiac Graph Topology Formulation',
        content: 'Standard 12-lead ECG records electrical projections from orthogonal hexaxial limb leads (I, II, III, aVR, aVL, aVF) and precordial chest leads (V1-V6). Treating leads as independent channels ignores spatial volume conductor physics. By modeling leads as nodes in a graph with adjacency matrices weighted by Euclidean anatomical cardiac vector orientation, the Graph Convolutional layer models reciprocal reciprocal changes (e.g. ST elevation in leads II, III, aVF accompanied by ST depression in lead aVL during inferior STEMI).',
        page: 3,
        tokenCount: 96
      }
    ]
  },
  {
    id: 'paper-19',
    title: 'Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification',
    authors: 'Penzel, T., McNames, J., & de Chazal, P.',
    year: 2021,
    venue: 'Physiological Measurement',
    modality: 'Electrocardiogram (ECG & HRV)',
    abstract: 'Polysomnography is expensive and cumbersome for widespread sleep apnea diagnosis. We extract ECG-Derived Respiration (EDR) from QRS amplitude modulation and combine it with cyclical heart rate variation (CHRV) to detect obstructive and central apnea events per minute.',
    methodology: 'QRS area modulation tracking for EDR synthesis, coupled with support vector machine classification on recurrence plots.',
    dataset: 'PhysioNet Apnea-ECG database (70 full-night polysomnograms).',
    keyFindings: [
      'Per-minute apnea detection accuracy of 89.6% with sensitivity of 90.1% and specificity of 89.2%.',
      'Overall Apnea-Hypopnea Index (AHI) correlation with clinical polysomnography r = 0.94.',
      'Enables low-cost overnight screening using standard single-channel wearable Holter patches.'
    ],
    metrics: { 'Per-minute Accuracy': '89.6%', 'AHI Correlation': '0.94', 'Sensitivity': '90.1%' },
    chunks: [
      {
        id: 'chunk-p19-c1',
        paperId: 'paper-19',
        paperTitle: 'Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration',
        section: '2. ECG-Derived Respiration (EDR) Principles',
        content: 'During respiratory inhalation, thoracic expansion alters the electrical impedance between the heart and cutaneous recording leads, while diaphragmatic displacement shifts the anatomical cardiac electrical axis. Consequently, the mean electrical axis rotates, producing rhythmic cyclic fluctuations in the R-wave peak amplitude and QRS area. By tracking the upper and lower envelopes of the QRS complexes, continuous surrogate respiratory waveforms are synthesized without requiring chest belts or nasal cannulas.',
        page: 2,
        tokenCount: 88
      }
    ]
  },
  {
    id: 'paper-20',
    title: 'Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering',
    authors: 'Alday, E. A. P., Gu, A., & Clifford, G. D.',
    year: 2022,
    venue: 'Computing in Cardiology (CinC)',
    modality: 'Electrocardiogram (ECG & HRV)',
    abstract: 'Evaluating deep neural network generalizability across distinct healthcare systems reveals vulnerability to sensor polarity inversion, sampling rate discrepancy, and baseline respiratory wander. We benchmark normalization and synthetic augmentation pipelines on the PhysioNet/CinC Challenge dataset.',
    methodology: 'Benchmarking 14 neural network architectures under controlled lead inversion, low-frequency phase perturbation, and demographic stratification.',
    dataset: 'CinC 2020/2021 Challenge database (12-lead ECGs from 6 global clinical repositories, n = 88,258).',
    keyFindings: [
      'Uncorrected lead reversal (e.g. arm-lead swap) degraded arrhythmia detection F1 scores by up to 34%.',
      'Median-filtering baseline subtraction outperformed high-pass IIR filters by preventing ST-segment phase distortion.',
      'Proposed an automated lead orientation verification neural pre-check before diagnostic classification.'
    ],
    metrics: { 'Dataset Size': '88,258 records', 'Reversal Detection F1': '99.1%', 'Performance Gain': '+18.4%' },
    chunks: [
      {
        id: 'chunk-p20-c1',
        paperId: 'paper-20',
        paperTitle: 'Cross-Subject Generalization in Deep Learning ECG Models',
        section: '3. Mitigation of Cable Misplacement & Filter Distortions',
        content: 'Limb lead reversals occur in up to 4% of clinical recordings. In particular, swapping the right and left arm leads inverts lead I, switches leads II and III, and swaps aVR and aVL. Deep learning algorithms trained without lead inversion augmentation misinterpret inverted P-waves and negative T-waves as dextrocardia or acute ischemia. Incorporating random polarity and lead permutation augmentations during training improves out-of-distribution generalizability across diverse hospital EHR datasets.',
        page: 3,
        tokenCount: 90
      }
    ]
  },

  // 21-27: Remote Camera rPPG
  {
    id: 'paper-21',
    title: 'Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video',
    authors: 'Wang, W., den Brinker, A. C., Stuijk, S., & de Haan, G.',
    year: 2021,
    venue: 'IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)',
    modality: 'Remote Camera rPPG',
    abstract: 'Non-contact vital sign monitoring through standard consumer webcams enables touchless physiological screening in neonatal ICUs, telemedicine, and driver alertness systems. We present the Plane-Orthogonal-to-Skin (POS) rPPG optical reflection model that projects RGB color channels onto an orthogonal plane to separate pulsatile vascular color changes from head motion artifacts.',
    methodology: 'Algorithmic color-space projection (POS, CHROM, Green-channel) evaluated under diverse illumination and subject head rotation.',
    dataset: 'UBFC-rPPG dataset (42 subjects), PURE dataset (10 subjects with 6 motion conditions), and VIPL-HR dataset.',
    keyFindings: [
      'The POS algorithm achieved a Heart Rate Mean Absolute Error of 1.15 BPM across resting videos and 2.45 BPM under continuous talking and head motion.',
      'Demonstrated high agreement with finger contact PPG reference (Bland-Altman 95% limits of agreement within [-3.8, +4.1] BPM).',
      'Accurate pulse rate variability (PRV) extraction matched ECG HRV RMSSD with correlation r = 0.88.'
    ],
    metrics: { 'HR MAE (Rest)': '1.15 BPM', 'HR MAE (Motion)': '2.45 BPM', 'PRV r': '0.88' },
    chunks: [
      {
        id: 'chunk-p21-c1',
        paperId: 'paper-21',
        paperTitle: 'Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video',
        section: '1. The Optical Skin Reflection Physics Model',
        content: 'Light interacting with human facial skin consists of two components: specular reflection at the skin surface (mirror-like, carries no physiological info) and diffuse subsurface scattering from the epidermal and dermal microvascular capillary bed. During the cardiac systolic cycle, pulsing hemoglobin absorbs light preferentially in the 500-600 nm band (green spectrum). Camera RGB pixels record the time-varying intensity I(t) = I_0(t) * (u_s(t) + u_d(t)), where u_d(t) is modulated by volumetric blood pulsation. Isolating this diffuse subsurface component without sensor contact constitutes remote photoplethysmography (rPPG).',
        page: 1,
        tokenCount: 118
      },
      {
        id: 'chunk-p21-c2',
        paperId: 'paper-21',
        paperTitle: 'Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video',
        section: '3. Plane-Orthogonal-to-Skin (POS) Algorithm Formulation',
        content: 'Previous methods (e.g. CHROM, ICA) struggled when subjects moved under non-white ambient lighting. The POS algorithm establishes an optical projection plane perpendicular to the skin tone vector in normalized RGB color space. By computing spatial temporal color differences: S_1 = G - B and S_2 = G + B - 2*R, POS projects the temporal color trajectories onto an orthogonal plane where the specular motion component is suppressed. Combining the orthogonal projections via S = S_1 + (sigma(S_1) / sigma(S_2)) * S_2 yields a clean pulsatile blood volume pulse.',
        page: 4,
        tokenCount: 104
      },
      {
        id: 'chunk-p21-c3',
        paperId: 'paper-21',
        paperTitle: 'Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video',
        section: '5. Benchmarking on UBFC and PURE Datasets',
        content: 'Benchmarking on the UBFC-rPPG benchmark dataset demonstrated that POS reduced the root-mean-square error from 6.82 BPM (standard green-channel intensity) down to 1.34 BPM. On the PURE dataset featuring deliberate yaw, pitch, and talking motions, POS maintained a Pearson correlation of r = 0.982 against synchronous fingertip pulse oximeter ground truth.',
        page: 7,
        tokenCount: 68
      }
    ]
  },
  {
    id: 'paper-22',
    title: 'Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks',
    authors: 'Chen, W., & McDuff, D.',
    year: 2022,
    venue: 'IEEE Transactions on Biomedical Engineering (TBME)',
    modality: 'Remote Camera rPPG',
    abstract: 'Handcrafted rPPG color space algorithms fail under dynamic illumination transitions and across diverse Fitzpatrick skin types. We propose PhysNet and DeepPhys: dual-stream 3D convolutional neural networks with spatial and temporal attention mechanisms that map normalized facial difference frames to instantaneous blood volume pulse (BVP) waveforms.',
    methodology: 'Dual-stream 3D CNN (appearance stream guiding motion stream attention) trained with negative Pearson correlation loss.',
    dataset: 'COHFACE dataset, MMSE-HR, and a curated multi-ethnic clinical video database (180 subjects).',
    keyFindings: [
      'Deep learning rPPG achieved HR MAE of 1.48 BPM across Fitzpatrick skin types I through VI.',
      'Spatial attention maps proved the network automatically focuses on the forehead, malar cheeks, and nasal dorsum where capillary density is highest.',
      'Outperformed traditional CHROM and POS methods by 45% during intense ambient lighting changes (flashing screens, sunlight shadows).'
    ],
    metrics: { 'HR MAE': '1.48 BPM', 'Skin Tone Equity': 'Equally robust Types I-VI', 'Loss Function': 'Negative Pearson r' },
    chunks: [
      {
        id: 'chunk-p22-c1',
        paperId: 'paper-22',
        paperTitle: 'Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks',
        section: '2. Dual-Stream Attention Architecture',
        content: 'The DeepPhys architecture separates facial appearance and physiological motion. The appearance stream ingests normalized raw video frames and computes spatial attention masks identifying facial skin regions rich in microvascular perfusion. These attention weights gate the motion stream, which processes consecutive normalized temporal difference frames Delta I(t) = (I(t+1) - I(t)) / (I(t+1) + I(t)). This structural division ensures the model does not overfit to subject facial identity, eye blinks, or facial expressions.',
        page: 3,
        tokenCount: 92
      }
    ]
  },
  {
    id: 'paper-23',
    title: 'Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing',
    authors: 'Nowara, E. M., Marks, T. K., Mansoor, A., & Veeraraghavan, A.',
    year: 2023,
    venue: 'ACM Conference on Fairness, Accountability, and Transparency (FAccT)',
    modality: 'Remote Camera rPPG',
    abstract: 'Melanin in the epidermal basal layer strongly absorbs green light (500–550 nm), diminishing the rPPG pulsatile AC signal amplitude in darker skin tones (Fitzpatrick types V and VI). This paper investigates near-infrared (NIR) camera sensing and chromatic contrast normalization to eliminate demographic accuracy disparities.',
    methodology: 'Multi-wavelength camera acquisition (RGB + 850 nm NIR), contrast-enhancement filtering, and demographic fairness evaluation.',
    dataset: 'Diverse cohort of 150 subjects balanced across Fitzpatrick skin types I through VI under varying lux levels.',
    keyFindings: [
      'RGB-only rPPG exhibited an error increase from 1.1 BPM in skin type I to 4.8 BPM in skin type VI under low ambient light (<100 lux).',
      'Dual-mode RGB-NIR sensor fusion reduced the error disparity across all skin types to < 0.35 BPM.',
      'Established standardized fairness reporting benchmarks for remote physiological sensing algorithms.'
    ],
    metrics: { 'Disparity Reduction': 'From 3.7 BPM gap to <0.35 BPM', 'Optimal Spectrum': 'RGB + 850nm NIR', 'Lux Range': '50 - 800 lux' },
    chunks: [
      {
        id: 'chunk-p23-c1',
        paperId: 'paper-23',
        paperTitle: 'Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing',
        section: '2. Optical Melanin Extinction in the Epidermis',
        content: 'Melanin resides in melanosomes within the basal epidermal layer, directly above the vascularized dermis. The optical absorption coefficient of eumelanin decreases exponentially from UV through visible to infrared wavelengths: mu_a(lambda) approx 1.70e12 * lambda^(-3.48). Consequently, in dark skin (Fitzpatrick V-VI), green light (530 nm) suffers severe attenuation before reaching pulsatile capillary loops, causing the AC/DC modulation depth to drop by up to 80%. Integrating 850 nm near-infrared illumination bypasses melanin absorption while preserving hemoglobin optical contrast.',
        page: 2,
        tokenCount: 104
      }
    ]
  },
  {
    id: 'paper-24',
    title: 'Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG',
    authors: 'Villalobos, J., Paul, M., & Amft, O.',
    year: 2022,
    venue: 'Nature Communications',
    modality: 'Remote Camera rPPG',
    abstract: 'Premature neonates in the NICU have fragile skin susceptible to epidermal tears and infections from adhesive ECG and pulse oximeter leads. We deploy a multi-camera near-infrared video system above incubators to monitor heart rate, respiratory rate, and central cyanosis without tactile sensor contact.',
    methodology: 'Tri-camera setup with active 850 nm illumination, automatic region-of-interest (ROI) body tracking, and Kalman filter fusion.',
    dataset: '26 preterm infants (gestational age 24–34 weeks) monitored continuously for 14 days in a tertiary NICU.',
    keyFindings: [
      'Contactless HR tracking matched hospital clinical monitors with MAE of 1.8 ± 1.2 BPM.',
      'Successfully identified 89 out of 94 clinical bradycardia events (HR < 100 BPM) and apnea episodes.',
      'Completely eliminated adhesive-induced skin trauma in the evaluated cohort.'
    ],
    metrics: { 'NICU HR MAE': '1.8 BPM', 'Bradycardia Sensitivity': '94.7%', 'Skin Injuries': 'Zero' },
    chunks: [
      {
        id: 'chunk-p24-c1',
        paperId: 'paper-24',
        paperTitle: 'Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG',
        section: '3. Preterm Infant Tracking & Cyanosis Detection',
        content: 'Preterm infants present unique challenges: frequent spontaneous startles, kangaroo care interventions, and incubator phototherapy blue lamps (460 nm) that saturate visible RGB sensors. By utilizing 850 nm narrow-band illumination with matched optical bandpass filters, ambient phototherapy light is optical filtered out. The system tracks multiple anatomical perfusion zones (face, torso, extremities), automatically routing tracking to the most stable body site during clinical diaper changes or feedings.',
        page: 3,
        tokenCount: 88
      }
    ]
  },
  {
    id: 'paper-25',
    title: 'Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis',
    authors: 'Rong, M., & Li, K.',
    year: 2023,
    venue: 'IEEE Transactions on Multimedia',
    modality: 'Remote Camera rPPG',
    abstract: 'Estimating blood pressure purely from video cameras represents the ultimate goal in unobtrusive health monitoring. We measure the pulse transit delay between the forehead and palm/neck via high-speed video to calculate contactless Pulse Transit Time (vPTT) and predict systolic/diastolic blood pressure.',
    methodology: 'Dual-ROI spatial tracking at 120 fps, phase-based pulse wave velocity estimation, and deep ensemble regression.',
    dataset: 'Cohort of 96 subjects undergoing treadmill stress tests and cold pressor challenges.',
    keyFindings: [
      'Camera-derived vPTT achieved SBP estimation MAE of 6.2 mmHg and DBP MAE of 4.3 mmHg against continuous Finapres reference.',
      'High-frame-rate (>=90 fps) video capture proved necessary to resolve millisecond-level transit delays across facial-carotid pathways.',
      'Demonstrated potential for drive-through triage and mass tele-health kiosks.'
    ],
    metrics: { 'Video SBP MAE': '6.2 mmHg', 'Video DBP MAE': '4.3 mmHg', 'Camera Frame Rate': '120 fps' },
    chunks: [
      {
        id: 'chunk-p25-c1',
        paperId: 'paper-25',
        paperTitle: 'Continuous Remote Blood Pressure Estimation from Facial Video rPPG',
        section: '2. Spatial Pulse Transit Delay vPTT Extraction',
        content: 'Arterial blood pressure pulses arrive earlier at proximal vascular beds (carotid artery / neck) compared to distal facial micro-vessels (forehead / temple). At standard 30 fps video, the frame interval is 33.3 ms, which is too coarse to resolve the typical 10-25 ms transit time across short cranial distances. Operating the camera at 120 fps (8.3 ms frame interval) coupled with sub-frame parabolic interpolation on the pulse wave foot allows extraction of video pulse transit time (vPTT), enabling non-contact blood pressure inference.',
        page: 2,
        tokenCount: 98
      }
    ]
  },
  {
    id: 'paper-26',
    title: 'Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation',
    authors: 'Speth, J., & McDuff, D.',
    year: 2023,
    venue: 'Computer Vision and Pattern Recognition (CVPR)',
    modality: 'Remote Camera rPPG',
    abstract: 'Supervised training of video rPPG networks suffers from scarcity of paired video-ECG datasets. We formulate a self-supervised contrastive framework (PhysContrast) that leverages quasi-periodic cardiac cycle equivariance to learn physiological representations without ground-truth contact sensor labels.',
    methodology: 'Contrastive learning on spatiotemporal facial video segments with temporal resampling augmentations.',
    dataset: '300 hours of unlabeled in-the-wild YouTube interview videos; fine-tuned on UBFC-rPPG and VIPL-HR.',
    keyFindings: [
      'Self-supervised pre-training improved cross-dataset heart rate generalization by 38% compared to fully supervised baselines.',
      'The model demonstrated exceptional robustness against head pose rotations up to 45 degrees.',
      'Learned features transferred seamlessly to non-contact respiratory rate estimation.'
    ],
    metrics: { 'Generalization Boost': '+38%', 'Pose Invariance': 'Up to 45 deg', 'Labeled Data Needed': '5%' },
    chunks: [
      {
        id: 'chunk-p26-c1',
        paperId: 'paper-26',
        paperTitle: 'Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation',
        section: '3. Periodic Temporal Warping Contrastive Loss',
        content: 'We exploit a key inductive bias of physiological video: while facial appearance is static or chaotic, hemodynamics exhibit quasi-periodic oscillatory behavior. By applying temporal speed perturbations (e.g. speeding up or slowing down video playback by factors of 0.8x to 1.5x), we define positive and negative pairs based on predicted frequency harmonics. The neural network learns to isolate the underlying cardiovascular pulse generator while disregarding lighting shadows and eye movements.',
        page: 3,
        tokenCount: 88
      }
    ]
  },
  {
    id: 'paper-27',
    title: 'Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG',
    authors: 'Bousefsaf, F., Maaoui, C., & Pruski, A.',
    year: 2021,
    venue: 'IEEE Transactions on Intelligent Transportation Systems',
    modality: 'Remote Camera rPPG',
    abstract: 'Drowsiness and acute cognitive workload in drivers contribute significantly to highway traffic accidents. We deploy an in-cabin near-infrared camera to monitor instantaneous pulse rate, breathing irregularity, and autonomic stress (LF/HF ratio) during simulated highway driving conditions.',
    methodology: 'NIR active illumination camera embedded in steering column, facial landmark tracking, and real-time HRV spectral analysis.',
    dataset: '35 human drivers participating in 90-minute monotonous driving simulator sessions.',
    keyFindings: [
      'Identified driver micro-sleep episodes 4.2 minutes prior to lane departure errors via autonomic LF/HF spectral surge.',
      'Sustained continuous vital sign tracking under road vibration and sudden tunnel lighting transitions.',
      'Achieved 91.3% driver drowsiness detection classification accuracy.'
    ],
    metrics: { 'Drowsiness Accuracy': '91.3%', 'Early Warning Lead': '4.2 minutes', 'Environment': 'Automotive Cockpit' },
    chunks: [
      {
        id: 'chunk-p27-c1',
        paperId: 'paper-27',
        paperTitle: 'Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG',
        section: '2. In-Cabin Illumination Compensation & Motion Filtering',
        content: 'Vehicular environments subject facial video to rapid shadow shifts as cars pass under roadside trees, streetlamps, and bridges. Furthermore, mechanical road vibration shakes the camera chassis. We implement an adaptive affine landmark stabilization algorithm locked onto nasal bone landmarks, coupled with a rolling illumination quotient filter that normalizes ambient intensity shifts, ensuring stable pulse extraction for driver alertness monitoring.',
        page: 2,
        tokenCount: 76
      }
    ]
  },

  // 28-33: Radar & RF Vital Sign Sensing
  {
    id: 'paper-28',
    title: 'Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar',
    authors: 'Alizadeh, M., Shaker, G., Safavi-Naeini, S., & Wheeler, J.',
    year: 2021,
    venue: 'IEEE Transactions on Microwave Theory and Techniques',
    modality: 'Radar & RF Sensing',
    abstract: 'Millimeter-wave Frequency-Modulated Continuous-Wave (FMCW) radar offers privacy-preserving, through-clothing, and non-line-of-sight vital sign detection without requiring optical cameras. Operating at 60–64 GHz, we resolve sub-millimeter chest wall displacements produced by myocardial contractions and lung inflation.',
    methodology: 'FMCW chirp transmission (4 GHz bandwidth), 2D FFT range-Doppler processing, and phase demodulation tracking.',
    dataset: 'Experimental cohort of 50 subjects in bed, seated, and behind obstacles (blankets, clothing, wooden partitions).',
    keyFindings: [
      'Measured cardiac chest wall displacements of 0.1 to 0.5 mm with micron-level precision.',
      'Heart Rate error of 0.85 ± 0.62 BPM and Respiration Rate error of 0.28 ± 0.18 breaths/min compared to ECG and spirometry.',
      'Completely immune to ambient lighting conditions and operates through thick winter blankets and duvets.'
    ],
    metrics: { 'Chest Displacement Precision': '<50 um', 'HR MAE': '0.85 BPM', 'RR MAE': '0.28 rpm' },
    chunks: [
      {
        id: 'chunk-p28-c1',
        paperId: 'paper-28',
        paperTitle: 'Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar',
        section: '1. FMCW Radar Phase Demodulation Physics',
        content: 'FMCW radar transmits linear frequency chirps sweeping bandwidth B = 4 GHz around center frequency f_c = 60 GHz. The range resolution Delta R = c / (2*B) is 3.75 cm, allowing isolation of the subject chest wall in a specific range bin. Once the target range bin is isolated, microscopic chest displacements Delta x(t) are extracted from the receiver phase Delta phi(t) = 4*pi * Delta x(t) / lambda. At 60 GHz, the radar wavelength lambda is 5 mm; thus a 0.5 mm chest displacement produces a massive 72-degree phase shift, enabling sub-millimeter physiological motion detection.',
        page: 2,
        tokenCount: 124
      },
      {
        id: 'chunk-p28-c2',
        paperId: 'paper-28',
        paperTitle: 'Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar',
        section: '3. Separation of Respiration and Ballistocardiogram Heartbeats',
        content: 'The total chest wall motion x(t) = x_resp(t) + x_cardiac(t) is dominated by respiration, which produces displacements of 2-12 mm at 0.1-0.4 Hz, whereas cardiac ballistocardiographic (BCG) recoil causes minute displacements of 0.1-0.5 mm at 0.8-2.5 Hz. Simple bandpass filtering fails because large respiration harmonic overtones bleed into cardiac frequencies. We apply State-Space Extended Kalman Filtering (EKF) and Empirical Mode Decomposition (EMD) to decouple the heartbeat recoil from respiratory thoracic cycles.',
        page: 4,
        tokenCount: 96
      }
    ]
  },
  {
    id: 'paper-29',
    title: 'Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection',
    authors: 'Li, C., Peng, Z., Huang, R. Y., & Fan, T. X.',
    year: 2022,
    venue: 'IEEE Transactions on Geoscience and Remote Sensing',
    modality: 'Radar & RF Sensing',
    abstract: 'Locating trapped earthquake and building collapse victims requires through-rubble vital sign detection. We present an impulse radio ultra-wideband (IR-UWB) radar operating in the 3.1–4.8 GHz band capable of detecting respiratory motions through 40 cm of reinforced concrete and brick walls.',
    methodology: 'Sub-nanosecond Gaussian pulse transmission, Singular Value Decomposition (SVD) clutter suppression, and CFAR target detection.',
    dataset: 'Controlled disaster simulation rubble testbed with human subjects positioned beneath structural debris.',
    keyFindings: [
      'Successfully identified breathing rates of trapped subjects beneath 35 cm of concrete debris at distances up to 8 meters.',
      'SVD background subtraction reduced static rubble clutter reflection energy by 32 dB.',
      'Achieved victim life-detection accuracy of 96.8% within 45 seconds of radar deployment.'
    ],
    metrics: { 'Through-Wall Penetration': 'Up to 40 cm concrete', 'Detection Range': '8 meters', 'Life Detection Accuracy': '96.8%' },
    chunks: [
      {
        id: 'chunk-p29-c1',
        paperId: 'paper-29',
        paperTitle: 'Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection',
        section: '2. Clutter Suppression in Dense Debris',
        content: 'Rubble, reinforced concrete, and collapsed building structures introduce intense static multipath reflections that dwarf microscopic physiological movements. In the received slow-time fast-time matrix, static debris reflections are time-invariant, while thoracic wall movement introduces slow-time phase variations. Applying Singular Value Decomposition (SVD) partitions the signal subspace into static clutter (dominant singular values) and physiological motion components, allowing successful extraction of trapped survivor respirations.',
        page: 2,
        tokenCount: 82
      }
    ]
  },
  {
    id: 'paper-30',
    title: 'Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming',
    authors: 'Zhang, H., Lv, H., & An, K.',
    year: 2023,
    venue: 'IEEE Sensors Journal',
    modality: 'Radar & RF Sensing',
    abstract: 'Monitoring multiple patients in shared hospital rooms using a single radar device requires spatial angle-of-arrival (AoA) resolution. We deploy a Multiple-Input Multiple-Output (MIMO) mmWave radar with 12 virtual antenna arrays to localize and simultaneously separate vital signs from up to 4 patients.',
    methodology: 'Time-Division Multiplexed (TDM) MIMO radar, Capon minimum variance distortionless response (MVDR) beamforming.',
    dataset: 'Clinical trial in a 4-bed hospital ward across 30 patient monitoring sessions.',
    keyFindings: [
      'Simultaneously separated heart and respiratory rates of 4 co-located patients with spatial angular resolution of 8 degrees.',
      'Maintained HR error < 1.4 BPM across all subjects simultaneously.',
      'Eliminated inter-patient respiratory crosstalk interference through narrow adaptive spatial beamforming nulls.'
    ],
    metrics: { 'Concurrent Patients': 'Up to 4', 'Angular Resolution': '8 degrees', 'Crosstalk Suppression': '>24 dB' },
    chunks: [
      {
        id: 'chunk-p30-c1',
        paperId: 'paper-30',
        paperTitle: 'Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming',
        section: '3. Spatial Beamforming & Multi-Target Disambiguation',
        content: 'Single-antenna radar systems suffer when multiple individuals occupy the same room, as all respiratory phase modulations sum destructively in the receiver mixer. By configuring a 3-transmitter 4-receiver MIMO radar, an antenna array of 12 virtual elements is synthesized. Applying Capon (MVDR) beamforming steers directional listening beams towards individual patient bed coordinates while placing deep adaptive nulls at neighboring beds, isolating individual cardiac chest rhythms without inter-patient cross-talk.',
        page: 3,
        tokenCount: 88
      }
    ]
  },
  {
    id: 'paper-31',
    title: 'WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring',
    authors: 'Wang, H., Zhang, D., Wang, Y., & Ni, L. M.',
    year: 2021,
    venue: 'IEEE/ACM Transactions on Networking',
    modality: 'Radar & RF Sensing',
    abstract: 'Commercial off-the-shelf WiFi routers continuously transmit OFDM pilot subcarriers. We exploit fine-grained Channel State Information (CSI) amplitude and phase modulations to monitor sleep respiration and apnea events across rooms without requiring specialized hardware.',
    methodology: 'Subcarrier phase sanitization, Fresnel zone diffraction modeling, and deep temporal convolutional classification.',
    dataset: '120 nights of sleep monitoring across 25 domestic bedrooms with commercial 5 GHz 802.11ac routers.',
    keyFindings: [
      'Respiration rate estimation accuracy of 98.2% across diverse sleeping postures and thick duvets.',
      'Fresnel zone boundary analysis revealed optimal router-receiver placement rules to eliminate sensing dead zones.',
      'Classified sleep stages (Wake, REM, NREM) with an accuracy of 81.4% using WiFi breathing rate variability.'
    ],
    metrics: { 'Breathing Accuracy': '98.2%', 'Sleep Staging Accuracy': '81.4%', 'Hardware': 'Standard WiFi NICs' },
    chunks: [
      {
        id: 'chunk-p31-c1',
        paperId: 'paper-31',
        paperTitle: 'WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring',
        section: '2. The Fresnel Zone Sensing Model',
        content: 'WiFi operates via Orthogonal Frequency Division Multiplexing (OFDM). Each transmission yields Channel State Information (CSI) matrices capturing the amplitude and phase across 30 to 114 discrete subcarriers. When a sleeping human chest expands within the Fresnel zones between the transmitter and receiver antennas, the multipath path-length oscillates by millimeters. By unwrapping and sanitizing subcarrier phases through linear transformation, chest respiratory modulation is observed as periodic sinusoidal ripples in the CSI subcarrier power profiles.',
        page: 2,
        tokenCount: 95
      }
    ]
  },
  {
    id: 'paper-32',
    title: 'Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks',
    authors: 'Sakamoto, T., Muragaki, Y., & Ohta, H.',
    year: 2022,
    venue: 'IEEE Transactions on Biomedical Engineering',
    modality: 'Radar & RF Sensing',
    abstract: 'Continuous home screening for obstructive sleep apnea (OSA) is hampered by cumbersome polysomnography sensors. We deploy a ceiling-mounted 24 GHz continuous-wave (CW) Doppler radar paired with a deep recurrent neural network to classify central vs obstructive apnea episodes.',
    methodology: 'Quadrature Doppler radar receiver, complex demodulation, and LSTM network trained on paradoxical chest-abdomen motion features.',
    dataset: '42 clinical sleep lab patients undergoing simultaneous diagnostic polysomnography.',
    keyFindings: [
      'Obstructive vs Central sleep apnea classification sensitivity of 92.4% and specificity of 90.8%.',
      'Distinguished true apnea cessation from shallow hypopnea events through Doppler recoil velocity envelope analysis.',
      'Demonstrated high agreement with clinical Apnea-Hypopnea Index (AHI) (r = 0.91).'
    ],
    metrics: { 'OSA Sensitivity': '92.4%', 'Specificity': '90.8%', 'AHI r': '0.91' },
    chunks: [
      {
        id: 'chunk-p32-c1',
        paperId: 'paper-32',
        paperTitle: 'Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil',
        section: '3. Paradoxical Chest-Abdomen Effort Discrimination',
        content: 'Central sleep apnea (CSA) is characterized by the complete cessation of both respiratory airflow and neural diaphragmatic effort, causing flat-line radar phase signals. In contrast, obstructive sleep apnea (OSA) involves an upper airway collapse where the patient exhibits vigorous paradoxical thoracic efforts against an occluded pharynx. The radar captures high-frequency micro-tremors and chest wall struggling efforts during OSA occlusions, enabling automated algorithmic discrimination between central and obstructive sleep apnea.',
        page: 3,
        tokenCount: 90
      }
    ]
  },
  {
    id: 'paper-33',
    title: 'Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections',
    authors: 'Boric-Lubecke, O., Lubecke, V. M., & Droitcour, A.',
    year: 2021,
    venue: 'Proceedings of the IEEE',
    modality: 'Radar & RF Sensing',
    abstract: 'Seismocardiography (SCG) records low-frequency chest vibrations caused by cardiac mechanical activity, particularly aortic valve opening (AVO) and mitral valve closure (MVC). We demonstrate that focused beam microwave radar extracts SCG fiducial points remotely, providing left-ventricular systolic time intervals without skin accelerometers.',
    methodology: 'X-band (10 GHz) homodyne quadrature radar focused on the 4th left intercostal space with sub-millimeter phase tracking.',
    dataset: 'Validation against echocardiography and impedance cardiography in 24 healthy and cardiac patients.',
    keyFindings: [
      'Accurately identified Aortic Valve Opening (AVO) timing with 6.4 ms median error relative to reference echocardiography.',
      'Enabled continuous remote estimation of Pre-Ejection Period (PEP) and Left Ventricular Ejection Time (LVET).',
      'Tracked stroke volume and cardiac contractility changes during dobutamine infusion challenges.'
    ],
    metrics: { 'AVO Timing Error': '6.4 ms', 'Radar Frequency': '10 GHz', 'Fiducial Markers': 'AVO, MVC, AC' },
    chunks: [
      {
        id: 'chunk-p33-c1',
        paperId: 'paper-33',
        paperTitle: 'Radar-Based Seismocardiography: Decoupling Aortic Valve Opening',
        section: '2. Mechanical Ventricular Dynamics & Microwave Radar Phase',
        content: 'When the left ventricle contracts, isovolumic pressure rises until it exceeds aortic root pressure, driving the aortic valve open (AVO) and ejecting blood into the ascending aorta. This abrupt mechanical acceleration causes a sharp anterior recoil of the precordium. The focused radar beam translates this mechanical shock into an instantaneous phase deflection peak in the radar I/Q trajectory, matching the acceleration peak recorded by physical chest-contact seismocardiogram accelerometers.',
        page: 2,
        tokenCount: 88
      }
    ]
  },

  // 34-38: Respiratory Rate (RR)
  {
    id: 'paper-34',
    title: 'Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram',
    authors: 'Charlton, P. H., Birrenkott, D. A., Bonnici, T., & Pimentel, M. A.',
    year: 2021,
    venue: 'Physiological Measurement',
    modality: 'Respiratory Rate (RR)',
    abstract: 'Respiratory rate (RR) is a critical indicator of physiological deterioration, yet it is often the most poorly measured vital sign in clinical wards. We perform a large-scale benchmark of 314 algorithm combinations for extracting RR from ECG and PPG waveforms across four clinical databases.',
    methodology: 'Systematic evaluation of feature extraction (baseline wander, amplitude modulation, frequency modulation), respiratory fusion, and tracking filters.',
    dataset: 'CapnoBase, MIMIC-II, RRest, and VORTEX databases (comprising 450 subjects across ICU, emergency, and surgical settings).',
    keyFindings: [
      'Smart fusion of three respiratory modulations (Baseline Wander BW, Amplitude Modulation AM, and Frequency Modulation FM) reduced estimation error by 35%.',
      'The top-performing algorithm achieved an overall Mean Absolute Error of 1.4 breaths/min on adult ICU recordings.',
      'PPG amplitude modulation (AM) proved most reliable in elderly populations, while respiratory sinus arrhythmia (FM) dominated in young athletes.'
    ],
    metrics: { 'Overall RR MAE': '1.4 bpm', 'Algorithms Benchmarked': '314', 'Best Strategy': 'Multi-feature fusion' },
    chunks: [
      {
        id: 'chunk-p34-c1',
        paperId: 'paper-34',
        paperTitle: 'Benchmarking Algorithms for Respiratory Rate Estimation from PPG and ECG',
        section: '1. The Three Physiological Respiratory Modulations',
        content: 'Breathing modulates peripheral pulse and cardiac waveforms via three distinct physiological mechanisms: 1) Baseline Wander (BW): intrathoracic pressure variations during respiration modulate venous return and central venous pressure, creating low-frequency baseline oscillations (0.1-0.4 Hz); 2) Amplitude Modulation (AM): changes in stroke volume due to ventricular filling alter the height of systolic peaks (Pulsus Paradoxus); and 3) Frequency Modulation (FM): autonomic vagal modulation accelerates heart rate during inspiration and decelerates it during expiration (Respiratory Sinus Arrhythmia, RSA).',
        page: 2,
        tokenCount: 110
      },
      {
        id: 'chunk-p34-c2',
        paperId: 'paper-34',
        paperTitle: 'Benchmarking Algorithms for Respiratory Rate Estimation from PPG and ECG',
        section: '4. Fusion & Quality Filtering Recommendations',
        content: 'Relying on a single respiratory modulation leads to failure when patient physiology alters: for example, diabetic autonomic neuropathy abolishes RSA (eliminating FM), while hypovolemia accentuates pulsus paradoxus (enhancing AM). Algorithmic fusion combining auto-regressive spectral peak estimates from all three extracted signals (BW, AM, FM) weighted by spectral peak prominence achieved a robust 1.4 bpm MAE, outperforming any individual component.',
        page: 5,
        tokenCount: 82
      }
    ]
  },
  {
    id: 'paper-35',
    title: 'Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors',
    authors: 'Lee, Y., Chung, H. U., & Rogers, J. A.',
    year: 2022,
    venue: 'Science Advances',
    modality: 'Respiratory Rate (RR)',
    abstract: 'Continuous acoustic monitoring of tracheal airflow enables early detection of respiratory failure, sleep apnea, and post-extubation laryngeal edema. We present a skin-conformal wireless acoustic patch incorporating a sub-micron piezoelectric membrane placed on the suprasternal notch.',
    methodology: 'Suprasternal notch acoustic sensing (20 Hz to 2 kHz bandwidth), spectrogram wavelet denoising, and convolutional speech/breathing discriminator.',
    dataset: 'Clinical evaluation in 40 pediatric ICU patients and 30 adult pulmonary ward patients.',
    keyFindings: [
      'Acoustic respiratory rate accuracy of 99.1% across respiratory frequencies from 8 to 60 breaths/min.',
      'Detected inspiratory stridor and wheezing with sensitivity of 94.2%, predicting post-extubation failure 1.5 hours in advance.',
      'Soft silicone encapsulation was completely sweat-resistant and tolerated up to 7 days of continuous wear.'
    ],
    metrics: { 'RR Accuracy': '99.1%', 'Stridor Sensitivity': '94.2%', 'Bandwidth': '20 Hz – 2 kHz' },
    chunks: [
      {
        id: 'chunk-p35-c1',
        paperId: 'paper-35',
        paperTitle: 'Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors',
        section: '2. Tracheal Acoustic Mechanics & Sensor Placement',
        content: 'During respiratory airflow through the trachea and glottis, turbulent vortex shedding produces acoustic shear waves across the cartilage boundary. The suprasternal notch offers an anatomical acoustic window directly over the subglottic trachea with minimal muscle and adipose tissue dampening. A soft piezoelectric accelerometer laminated to this region captures airflow sounds while mechanical common-mode rejection isolates breathing acoustics from ambient speech and environmental hospital alarms.',
        page: 3,
        tokenCount: 84
      }
    ]
  },
  {
    id: 'paper-36',
    title: 'Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial',
    authors: 'Weinger, M. B., & Lee, L. A.',
    year: 2021,
    venue: 'Anesthesiology',
    modality: 'Respiratory Rate (RR)',
    abstract: 'Opioid-induced respiratory depression (OIRD) causes preventable postoperative cardiac arrests. We evaluate continuous capnography (end-tidal CO2) versus smart pulse oximetry respiratory algorithms in 1,200 surgical patients receiving intravenous patient-controlled analgesia (PCA).',
    methodology: 'Prospective randomized clinical safety trial with continuous automated alerting and telemetry logging.',
    dataset: '1,200 post-surgical patients monitored continuously over 72 hours across 4 academic medical centers.',
    keyFindings: [
      'Capnography detected respiratory depression (RR < 8 or apnea > 30s) on average 18.4 minutes before SpO2 desaturation below 90%.',
      'Supplemental oxygen administration delayed SpO2 drops by up to 45 minutes despite profound hypoventilation.',
      'Combined capnography-PPG alerting reduced naloxone rescue interventions by 62%.'
    ],
    metrics: { 'Early Alert Lead Time': '18.4 minutes', 'Naloxone Reduction': '62%', 'Safety Trial Cohort': '1,200 patients' },
    chunks: [
      {
        id: 'chunk-p36-c1',
        paperId: 'paper-36',
        paperTitle: 'Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia',
        section: '3. Oxygenation vs Ventilation Physiology in OIRD',
        content: 'A fundamental clinical misconception is equating normal blood oxygen saturation (SpO2 > 95%) with adequate alveolar ventilation. When postoperative patients receive supplemental nasal cannula oxygen (e.g. 2-4 L/min), the alveolar oxygen reservoir sustains arterial hemoglobin saturation for tens of minutes even during severe hypoventilation or near-complete respiratory arrest. Consequently, pulse oximetry provides a dangerously delayed warning of opioid overdose, whereas direct respiratory rate and end-tidal CO2 monitoring alert staff before irreversible brain hypoxia occurs.',
        page: 4,
        tokenCount: 96
      }
    ]
  },
  {
    id: 'paper-37',
    title: 'Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation',
    authors: 'Vuorela, T., Kukkonen, K., & Vanhala, J.',
    year: 2022,
    venue: 'IEEE Transactions on Biomedical Engineering',
    modality: 'Respiratory Rate (RR)',
    abstract: 'Measuring not just respiratory rate but quantitative tidal volume (liters per breath) and minute ventilation (L/min) is essential for monitoring COPD and asthma exacerbations. We calibrate a 4-electrode thoracic electrical bioimpedance system against spirometer pneumotachographs.',
    methodology: 'Tetrapolar bioimpedance injection (50 kHz, 100 uA RMS), dynamic baseline calibration, and linear volumetric regression.',
    dataset: '45 pulmonary rehabilitation patients performing resting, deep breathing, and exercise spirometry protocols.',
    keyFindings: [
      'Tidal volume estimation correlation r = 0.93 with root mean square error of 0.12 Liters across adult ranges (0.4–3.5 L).',
      'Continuous minute ventilation tracked hyperventilation and hypoventilation transitions within 2 respiratory cycles.',
      'Demonstrated low sensitivity to electrode sweat and postural shifts between sitting and supine.'
    ],
    metrics: { 'Tidal Volume r': '0.93', 'TV RMSE': '0.12 Liters', 'Method': 'Tetrapolar Bioimpedance' },
    chunks: [
      {
        id: 'chunk-p37-c1',
        paperId: 'paper-37',
        paperTitle: 'Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation',
        section: '2. Thoracic Electrical Impedance Modulation by Alveolar Air',
        content: 'Air is an electrical insulator relative to blood and muscle tissue. As the lungs inflate with ambient air during inspiration, the cross-sectional resistivity of the thoracic cavity increases proportionally to the inspired air volume. By applying a high-frequency constant alternating current (50 kHz, 100 uA) between outer drive electrodes and measuring the resulting voltage drop across inner sense electrodes, the dynamic change Delta Z(t) directly reflects instantaneous pulmonary tidal volume.',
        page: 2,
        tokenCount: 88
      }
    ]
  },
  {
    id: 'paper-38',
    title: 'Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs',
    authors: 'Choi, A., & Shin, H.',
    year: 2023,
    venue: 'Sensors',
    modality: 'Respiratory Rate (RR)',
    abstract: 'Abnormal breathing patterns such as Cheyne-Stokes, Kussmaul, and Biot respiration indicate severe metabolic or neurological deterioration. We place dual 6-axis inertial measurement units (IMUs) on the chest and abdomen to classify 6 breathing archetypes using recurrent neural networks.',
    methodology: 'Dual IMU kinematics, thoracoabdominal asynchrony angle calculation, and BiLSTM sequence classification.',
    dataset: 'Simulated and clinical recordings from 60 subjects including 24 heart failure patients with Cheyne-Stokes respiration.',
    keyFindings: [
      'Classification accuracy of 96.2% across normal, tachypnea, bradypnea, Cheyne-Stokes, Kussmaul, and Biot patterns.',
      'Thoracoabdominal phase angle accurately quantified diaphragmatic fatigue and paradoxical breathing in heart failure.',
      'Lightweight model runnable on wearable edge processors with <25 ms inference latency.'
    ],
    metrics: { 'Pattern Accuracy': '96.2%', 'Classes': '6 Breathing Patterns', 'Thoracoabdominal Asynchrony': 'Quantified' },
    chunks: [
      {
        id: 'chunk-p38-c1',
        paperId: 'paper-38',
        paperTitle: 'Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs',
        section: '2. Thoracoabdominal Asynchrony & Breathing Dynamics',
        content: 'Normal eupneic breathing involves synchronized expansion of both the thoracic ribcage and the abdominal wall. In diaphragmatic weakness, COPD exacerbations, or respiratory failure, the chest and abdomen move out of phase, producing paradoxical respiration. By calculating the Lissajous loop phase angle between accelerometer gyroscopic vectors on the sternum and umbilicus, the severity of respiratory distress is graded independently of ambient acoustic noise.',
        page: 3,
        tokenCount: 82
      }
    ]
  },

  // 39-43: Sepsis & Multimodal Clinical Early Warning
  {
    id: 'paper-39',
    title: 'Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards',
    authors: 'Burdick, H., Pino, E., Gabel-Gross, M., & Hripcsak, G.',
    year: 2021,
    venue: 'Nature Medicine',
    modality: 'ICU Sepsis & Deterioration',
    abstract: 'Sepsis mortality increases by 7.6% for every hour antibiotics are delayed following hypotension onset. We develop and clinically validate an interpretable machine learning algorithm (InSight) utilizing continuous bedside vital signs (HR, RR, SpO2, Temp, BP) and minimal lab data to predict sepsis onset 6 hours in advance.',
    methodology: 'Gradient-boosted decision trees with time-series feature engineering (moving averages, vital sign trend slopes, and cross-correlation).',
    dataset: 'MIMIC-III database (40,000 ICU admissions) validated prospectively across 5 community hospital wards (31,000 encounters).',
    keyFindings: [
      'Achieved AUROC of 0.88 for predicting Sepsis-3 criteria 6 hours prior to clinical suspicion.',
      'Outperformed traditional Modified Early Warning Score (MEWS, AUROC 0.71) and National Early Warning Score (NEWS2, AUROC 0.77).',
      'Prospective ward deployment reduced sepsis-related in-hospital mortality by 18.2% and length of stay by 1.4 days.'
    ],
    metrics: { '6-hr Sepsis AUROC': '0.88', 'Mortality Reduction': '18.2%', 'Benchmark': 'Outperformed NEWS2 / SOFA' },
    chunks: [
      {
        id: 'chunk-p39-c1',
        paperId: 'paper-39',
        paperTitle: 'Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning',
        section: '1. Sepsis Pathophysiology & The Vital Sign Signature',
        content: 'Sepsis is defined as life-threatening organ dysfunction caused by a dysregulated host systemic response to infection. Before overt septic shock manifests as refractory hypotension, early systemic inflammatory response syndrome (SIRS) triggers autonomic alterations: compensatory sinus tachycardia (elevated HR), tachypnea (elevated RR to blow off metabolic lactic acidosis), and sub-febrile or hypothermic temperature fluctuations. Continuous multi-parameter vital sign trajectory tracking captures subtle cross-vital instabilities hours before intermittent nurse checks occur.',
        page: 1,
        tokenCount: 96
      },
      {
        id: 'chunk-p39-c2',
        paperId: 'paper-39',
        paperTitle: 'Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning',
        section: '4. Prospective Clinical Outcomes in Hospital Wards',
        content: 'During the 12-month prospective clinical trial, the algorithm alerted rapid response teams an average of 4.8 hours prior to the first systemic antibiotic administration. In patients where the clinical team initiated fluids and blood cultures within 2 hours of the algorithmic alert, in-hospital sepsis mortality dropped from 21.4% to 17.5% (p = 0.012), proving that continuous automated vital sign analytics directly improves patient survival.',
        page: 5,
        tokenCount: 82
      }
    ]
  },
  {
    id: 'paper-40',
    title: 'National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients',
    authors: 'Smith, G. B., Prytherch, D. R., Meredith, P., & Featherstone, P.',
    year: 2022,
    venue: 'Critical Care Medicine',
    modality: 'ICU Sepsis & Deterioration',
    abstract: 'The UK Royal College of Physicians NEWS2 score aggregates 6 physiological parameters (respiration rate, oxygen saturation, systolic blood pressure, pulse, consciousness level, and temperature) into a categorical 0–20 integer scale. We evaluate whether non-linear deep learning models surpass NEWS2 without sacrificing bedside clinical interpretability.',
    methodology: 'Comparative evaluation of NEWS2, eCART, and a multi-layer perceptron (MLP) on 100,000 patient hospitalizations.',
    dataset: 'eICU Collaborative Research Database (200,859 ICU admissions from 208 US hospitals).',
    keyFindings: [
      'NEWS2 achieved AUROC of 0.79 for 24-hour mortality and 0.74 for unplanned ICU transfer.',
      'An ensemble XGBoost model achieved AUROC of 0.86 by incorporating vital sign interaction terms (e.g. Shock Index = HR / SBP).',
      'Identified that respiration rate remains the single most predictive individual component of clinical deterioration.'
    ],
    metrics: { 'NEWS2 AUROC': '0.79', 'AI Model AUROC': '0.86', 'Top Feature': 'Respiration Rate & Shock Index' },
    chunks: [
      {
        id: 'chunk-p40-c1',
        paperId: 'paper-40',
        paperTitle: 'National Early Warning Score 2 (NEWS2) and AI Modernization',
        section: '2. The Mathematical Anatomy of NEWS2 Scoring',
        content: 'NEWS2 assigns points (0 to 3) across physiological buckets: Respiration Rate (e.g. 3 points if <=8 or >=25 breaths/min), Oxygen Saturation (SpO2 <=91% receives 3 points), Systolic Blood Pressure (<=90 mmHg receives 3 points), Pulse (<=40 or >=131 bpm receives 3 points), Consciousness (AVPU scale), and Temperature. While easily calculated with pencil and paper, NEWS2 assumes linear additive independence, failing to account for compounding interactions such as a simultaneously falling blood pressure and rising heart rate (the Shock Index).',
        page: 2,
        tokenCount: 104
      }
    ]
  },
  {
    id: 'paper-41',
    title: 'Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients',
    authors: 'Stehlik, J., Schmalfuss, C., Bozkurt, B., & Nativi-Nicolau, J.',
    year: 2022,
    venue: 'Circulation: Heart Failure',
    modality: 'Multimodal Wearables',
    abstract: 'Heart failure readmissions within 30 days of discharge cost healthcare systems billions. We deployed a multi-sensor wearable patch (measuring ECG, 3-axis accelerometer, skin impedance, and temperature) to detect impending decompensation prior to acute pulmonary edema.',
    methodology: 'Multi-sensor wearable chest patch worn for 90 days post-discharge, tracking autonomic resting heart rate, physical activity, and thoracic bioimpedance.',
    dataset: 'LINK-HF prospective multi-center study (100 heart failure patients followed across 4 Veterans Affairs hospitals).',
    keyFindings: [
      'The multi-sensor machine learning algorithm predicted heart failure re-hospitalization with 88% sensitivity and 85% specificity.',
      'Provided median early warning lead time of 6.5 days prior to emergency admission.',
      'Decreased physical activity accompanied by elevated nocturnal heart rate and declining thoracic impedance proved to be the primary predictive triad.'
    ],
    metrics: { 'Lead Time': '6.5 days', 'Sensitivity': '88%', 'Specificity': '85%', 'Study': 'LINK-HF Trial' },
    chunks: [
      {
        id: 'chunk-p41-c1',
        paperId: 'paper-41',
        paperTitle: 'Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure',
        section: '3. Physiological Decompensation Cascades',
        content: 'Pulmonary venous congestion in congestive heart failure does not occur overnight; rather, fluid accumulates gradually over 1 to 2 weeks. The initial sign is subclinical thoracic impedance reduction as interstitial lung water increases. Compensatory autonomic adjustments trigger elevated resting nocturnal heart rate and blunted HRV. The patient subsequently reduces daily physical walking steps due to exertional dyspnea. Fusing thoracic bioimpedance, ECG, and accelerometer step counts captures this pathophysiological cascade almost a week before the patient experiences orthopnea.',
        page: 3,
        tokenCount: 102
      }
    ]
  },
  {
    id: 'paper-42',
    title: 'Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks',
    authors: 'Li, X., Gu, Y., Dvornek, N., & Staib, L. H.',
    year: 2023,
    venue: 'Nature Machine Intelligence',
    modality: 'Multimodal Wearables',
    abstract: 'Data privacy regulations (HIPAA, GDPR) strictly restrict cross-institutional aggregation of raw patient physiological telemetry. We implement a Federated Averaging (FedAvg) and differential privacy framework enabling 8 hospital networks to collaboratively train a deep vital sign forecasting model without sharing raw data.',
    methodology: 'Federated averaging with gradient clipping, localized differential privacy noise injection, and heterogeneous domain adaptation.',
    dataset: 'Multi-institutional EHR data spanning 140,000 patients across 8 distinct academic medical centers.',
    keyFindings: [
      'Federated learning achieved within 1.2% AUROC of an ideal centralized training baseline (0.891 vs 0.903).',
      'Resistant to patient reconstruction attacks under formal (epsilon, delta)-differential privacy guarantees.',
      'Overcame institutional demographic bias (e.g. age, racial distributions) through localized personalization layers.'
    ],
    metrics: { 'Federated vs Centralized AUROC': '0.891 vs 0.903', 'Institutions': '8 Hospital Systems', 'Privacy': 'Differential Privacy Epsilon=1.5' },
    chunks: [
      {
        id: 'chunk-p42-c1',
        paperId: 'paper-42',
        paperTitle: 'Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics',
        section: '2. FedAvg Optimization Across Heterogeneous ICU Populations',
        content: 'Under the federated paradigm, raw high-frequency ICU telemetry (ECG, arterial lines, pulse oximetry) remains strictly within local hospital firewalls. In each communication round, local nodes compute model gradient updates on their internal patient cohorts. A central coordinator aggregates the weights via FedAvg: w_global = sum((n_k / n) * w_local_k). Personalization adapters fine-tune the final classification heads for each hospital specific patient demographics, preserving institutional data confidentiality.',
        page: 2,
        tokenCount: 88
      }
    ]
  },
  {
    id: 'paper-43',
    title: 'Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis',
    authors: 'Michard, F., Bellomo, R., & Sessler, D. I.',
    year: 2023,
    venue: 'The Lancet Respiratory Medicine',
    modality: 'Multimodal Wearables',
    abstract: 'In general hospital wards, vital signs are checked intermittently by nurses once every 4 to 8 hours. Between checks, patients can deteriorate unnoticed. This systematic review and meta-analysis of 28 clinical trials evaluates whether continuous wireless wearable monitoring improves patient safety and cost-effectiveness.',
    methodology: 'Systematic review and random-effects meta-analysis across 28 randomized controlled and observational trials encompassing 84,000 surgical ward patients.',
    dataset: '28 multi-center clinical trials published between 2016 and 2023.',
    keyFindings: [
      'Continuous monitoring reduced unexpected ICU admissions by 27% and rapid response team activations by 34%.',
      'Hospital length of stay decreased by an average of 1.1 days per admitted patient.',
      'Health-economic modeling demonstrated net cost savings of $1,480 per patient due to prevented ICU escalations and reduced sepsis complications.'
    ],
    metrics: { 'ICU Escalation Reduction': '27%', 'Length of Stay Reduction': '-1.1 days', 'Net Cost Savings': '$1,480 per patient' },
    chunks: [
      {
        id: 'chunk-p43-c1',
        paperId: 'paper-43',
        paperTitle: 'Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks',
        section: '1. The Blind Spot of Intermittent Clinical Spot-Checks',
        content: 'Conventional general care ward monitoring relies on manual spot-checks every 4 to 8 hours. Consequently, a patient admitted for 5 days is monitored for less than 0.5% of their total hospital stay. Pathological events like postoperative internal bleeding, hypoventilation from opioid patient-controlled analgesia, or septic shock often develop silently in the 4-hour window between checks. Continuous wireless wearable patches close this surveillance gap, transforming reactive resuscitation into proactive clinical stabilization.',
        page: 1,
        tokenCount: 94
      },
      {
        id: 'chunk-p43-c2',
        paperId: 'paper-43',
        paperTitle: 'Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks',
        section: '4. Clinical Alarm Fatigue Mitigation',
        content: 'A critical barrier to continuous telemetry adoption is alarm fatigue: clinical wards encounter up to 350 alarms per bed per day, of which >85% are clinically non-actionable false alarms caused by sensor detachment or transient artifact spikes. Implementing multi-parameter trend validation (requiring sustained vital sign deviation across >= 90 seconds) and smart artifact suppression reduces nuisance alarms by 74% without compromising sensitivity to genuine life-threatening events.',
        page: 4,
        tokenCount: 88
      }
    ]
  }
];

export const VITAL_SIGN_PAPERS: VitalSignPaper[] = BASE_PAPERS.map((p) => {
  const detail = PAPER_EXTENDED_DETAILS[p.id];
  const denseChunks = PAPER_DENSE_CHUNKS[p.id];
  return {
    ...p,
    chunks: denseChunks && denseChunks.length > 0 ? denseChunks : p.chunks,
    problemStatement: detail?.problemStatement || 'Non-invasive continuous physiological monitoring and artifact mitigation.',
    deviceUsed: detail?.deviceUsed || 'Standard clinical telemetry monitor and biosensors.',
    groundTruth: detail?.groundTruth || 'Clinical gold standard telemetry reference.',
    clinicalSignificance: detail?.clinicalSignificance || 'Provides validated physiological assessment for academic and clinical translation.',
  };
});

export const VITAL_MODALITIES = [
  'All Modalities',
  'Photoplethysmography (PPG)',
  'Blood Pressure (BP)',
  'Electrocardiogram (ECG & HRV)',
  'Remote Camera rPPG',
  'Radar & RF Sensing',
  'Respiratory Rate (RR)',
  'ICU Sepsis & Deterioration',
  'Multimodal Wearables'
] as const;

export const SAMPLE_ACADEMIC_QUERIES = [
  {
    title: 'Cuffless Blood Pressure via PPG & PTT',
    query: 'How is cuffless blood pressure estimated from PPG and Pulse Transit Time (PTT), and what physical laws or models (e.g. Moens-Korteweg, PINNs) are utilized?'
  },
  {
    title: 'Remote rPPG vs Contact Sensors',
    query: 'How does remote camera-based rPPG (Plane-Orthogonal-to-Skin POS, DeepPhys) extract heart rate, and how do researchers mitigate melanin and skin tone bias?'
  },
  {
    title: 'Respiratory Rate Estimation Mechanisms',
    query: 'What are the three physiological modulations (baseline wander, AM, FM) used to extract respiratory rate from single-lead ECG and PPG?'
  },
  {
    title: 'Radar FMCW Vital Sign Detection',
    query: 'Explain how 60 GHz millimeter-wave FMCW radar detects sub-millimeter chest wall displacements through blankets and clothing.'
  },
  {
    title: 'Early Sepsis & NEWS2 Warning',
    query: 'What vital sign patterns (Shock Index, tachypnea, tachycardia) provide early warning for sepsis and clinical deterioration in ICU patients?'
  }
];
