export interface PaperExtendedDetail {
  problemStatement: string;
  deviceUsed: string;
  groundTruth: string;
  clinicalSignificance: string;
}

export const PAPER_EXTENDED_DETAILS: Record<string, PaperExtendedDetail> = {
  // PPG & Pulse Oximetry (Papers 01 - 06)
  'paper-01': {
    problemStatement: 'Motion artifacts and baseline wander corrupting photoplethysmogram pulse contours and causing false tachycardia alarms in ambulatory ICU care.',
    deviceUsed: 'Nellcor OxiMax pulse oximeter (dual 660 nm / 940 nm LEDs), BIOPAC MP150 acquisition system sampled at 125 Hz.',
    groundTruth: 'Invasive Radial Arterial Blood Pressure Catheter (A-Line) and Radiometer ABL90 blood gas co-oximetry.',
    clinicalSignificance: 'Dual-stage SDPPG filtering preserves dicrotic notch and APG a-e waves, reducing false clinical alarms by 67% and keeping SpO2 RMSE below 1.5%.'
  },
  'paper-02': {
    problemStatement: 'Severe mechanical decoupling between skin and photodiode during vigorous physical exercise, causing massive heart rate and SpO2 errors.',
    deviceUsed: 'Empatica E4 medical-grade wristband, Maxim MAX30101 optical biosensor, and custom 1D wearable accelerometer.',
    groundTruth: 'Chest-strap 12-lead ECG telemetry (BioRadio) and clinical cardiologist manual R-peak annotations.',
    clinicalSignificance: '1D Residual Convolutional Autoencoder recovers corrupted PPG waveforms with +8.6 dB SNR gain, slashing exercise HR error from 14.8 BPM to 3.2 BPM.'
  },
  'paper-03': {
    problemStatement: 'Standard 2-wavelength pulse oximeters cannot detect toxic carboxyhemoglobin (carbon monoxide) or methemoglobin, risking lethal misdiagnosis.',
    deviceUsed: 'Custom 8-wavelength LED diffuse reflectance spectrophotometer (610, 660, 730, 805, 850, 905, 940, 970 nm).',
    groundTruth: 'Radiometer ABL90 multi-capillary clinical blood gas co-oximeter analyzing in-vivo arterial blood draws.',
    clinicalSignificance: 'Non-invasive co-oximetry accurately measures total hemoglobin (r = 0.89) and screens CO poisoning with 91.4% sensitivity in emergency triage.'
  },
  'paper-04': {
    problemStatement: 'Annotating thousands of hours of ICU physiological time-series is prohibitively expensive and prone to inter-observer labeling discrepancies.',
    deviceUsed: 'Philips IntelliVue MP70 / MX800 bedside patient monitors with continuous digital multi-parameter telemetry stream.',
    groundTruth: 'Cardiologist-validated MIMIC-IV and VitalDB telemetry labels with 12-lead Holter rhythm confirmation.',
    clinicalSignificance: 'Self-supervised contrastive learning (PPG-SimCLR) boosts atrial fibrillation AUROC from 0.84 to 0.94 using only 10% labeled data.'
  },
  'paper-05': {
    problemStatement: 'Undiagnosed paroxysmal atrial fibrillation (AF) causing preventable ischemic strokes in asymptomatic outpatients.',
    deviceUsed: 'iPhone 13 / Samsung Galaxy rear camera and LED flash (fingertip transmission PPG at 30 fps).',
    groundTruth: 'Synchronous 12-lead ECG rhythm strips evaluated independently by two board-certified electrophysiologists.',
    clinicalSignificance: 'Achieved 97.4% sensitivity and 96.2% specificity for AF detection, enabling opportunistic population-scale stroke risk screening.'
  },
  'paper-06': {
    problemStatement: 'Detecting subclinical arterial stiffening without cumbersome, user-dependent applanation tonometry or invasive catheterization.',
    deviceUsed: 'Dual-site synchronous transmission PPG sensors placed simultaneously on index finger and great toe.',
    groundTruth: 'SphygmoCor applanation tonometry aortic pulse wave velocity (cfPWV) and Doppler ultrasound.',
    clinicalSignificance: 'Finger-to-toe pulse delay (FTD) correlates strongly with aortic stiffness (r = -0.84), offering non-invasive vascular age profiling.'
  },

  // Cuffless Blood Pressure & PTT (Papers 07 - 14)
  'paper-07': {
    problemStatement: 'Intermittent cuff inflations disrupt sleep, cause petechial bruising, and miss nocturnal hypertension and acute hemodynamic surges.',
    deviceUsed: 'Continuous Finapres NOVA finger arterial cuff and 3-lead ECG amplifier sampled at 1,000 Hz.',
    groundTruth: 'Invasive indwelling radial arterial cannula (A-Line) with calibrated pressure transducer.',
    clinicalSignificance: 'Bramwell-Hill & Hughes elasticity modeling converts pulse transit time (PTT) to beat-to-beat BP, meeting AAMI standards (error < 5±8 mmHg).'
  },
  'paper-08': {
    problemStatement: 'Single-site PPG signals lack the cardiac R-peak, conflating arterial transit time with the pre-ejection period (PEP) and impairing BP accuracy.',
    deviceUsed: 'Caretaker Medical finger cuffless sensor and bedside multi-lead ECG chest leads.',
    groundTruth: 'MIMIC-II clinical arterial catheter recordings across 1,120 critical care patients.',
    clinicalSignificance: 'Spectro-temporal ResNet extracts deep pulse propagation features, achieving SBP/DBP MAE of 4.41 / 2.91 mmHg without an ECG lead.'
  },
  'paper-09': {
    problemStatement: 'Pulse transit time algorithms lose calibration over days due to smooth muscle tone and vasomotor tone drift, causing BP drift.',
    deviceUsed: 'Photoplethysmography sensor paired with continuous transcutaneous bioimpedance plethysmography band.',
    groundTruth: 'Oscillometric cuff readings taken every 15 minutes during 48-hour ambulatory protocol.',
    clinicalSignificance: 'Vasomotor tone tracking maintains cuffless calibration stability for over 72 hours without requiring repeated cuff inflations.'
  },
  'paper-10': {
    problemStatement: 'Conventional cuffless models fail IEEE 1708 perturbation tests when challenged with isometric handgrip or cold pressor stress.',
    deviceUsed: 'Dual photoplethysmography probes placed on carotid artery and radial artery.',
    groundTruth: 'Beat-to-beat invasive radial arterial line during drug-induced phenylephrine vasoconstriction.',
    clinicalSignificance: 'Dual-site local arterial wave velocity isolates pure vascular elasticity, successfully passing IEEE 1708 perturbation guidelines.'
  },
  'paper-11': {
    problemStatement: 'Low generalization of neural network BP estimators across diverse demographics, vascular stiffness, and age cohorts.',
    deviceUsed: 'Wearable reflective PPG wristband with green (525 nm) and infrared (940 nm) LEDs.',
    groundTruth: 'Omron HEM-907XL automated digital oscillometric sphygmomanometer.',
    clinicalSignificance: 'Domain-adversarial neural networks eliminate demographic bias across 800 diverse patients, keeping SBP error under 5.2 mmHg.'
  },
  'paper-12': {
    problemStatement: 'Postural shifts (standing vs sitting vs supine) alter hydrostatic blood pressure columns, causing large cuffless estimation artifacts.',
    deviceUsed: 'Multi-sensor smart watch with 6-axis IMU (accelerometer + gyroscope) and reflective optical PPG sensor.',
    groundTruth: 'Finometer continuous non-invasive finger pressure monitor with hydrostatic height correction sensor.',
    clinicalSignificance: 'Hydrostatic pressure compensation using 3D spatial arm elevation angles corrects gravity-induced errors by up to 18 mmHg.'
  },
  'paper-13': {
    problemStatement: 'Lack of rigorous standardization and consensus protocols for evaluating wearable cuffless blood pressure devices.',
    deviceUsed: 'Systematic comparative review of 28 commercial and investigational wearable BP monitoring devices.',
    groundTruth: 'AAMI / ESH / ISO universal standard for blood pressure measurement device validation.',
    clinicalSignificance: 'Establishes international benchmarking criteria requiring static validation, perturbation testing, and calibration longevity tests.'
  },
  'paper-14': {
    problemStatement: 'Arterial blood pressure waveforms in elderly patients with vascular calcification lose the clear dicrotic notch, breaking fiducial point trackers.',
    deviceUsed: 'High-speed 500 Hz piezoelectric pulse transducer and reflective optical sensor on radial artery.',
    groundTruth: 'Invasive intra-aortic pressure wire during coronary catheterization.',
    clinicalSignificance: 'Continuous wavelet transform multi-scale decomposition reliably tracks arterial pressure in calcified arteries with 98% tracking accuracy.'
  },

  // ECG, Arrhythmia & HRV (Papers 15 - 20)
  'paper-15': {
    problemStatement: 'Bulky 12-lead ECG cables are impractical for multi-week ambulatory patient monitoring and post-myocardial infarction care.',
    deviceUsed: 'Single-lead wearable ECG patch (Zio Patch style) utilizing dry polymer conductive electrodes.',
    groundTruth: 'Standard clinical 12-lead Holter monitor recordings annotated by expert cardiac technicians.',
    clinicalSignificance: 'Single-lead deep residual network detects 14 distinct cardiac arrhythmias with cardiologists-level average F1 score of 0.89.'
  },
  'paper-16': {
    problemStatement: 'Electrode motion artifacts and muscle tremor (EMG noise) during patient walking cause false ventricular tachycardia alarms.',
    deviceUsed: 'Shimmer3 ECG telemetry unit with 3-axis accelerometer affixed to sternum.',
    groundTruth: 'PhysioNet MIT-BIH Arrhythmia Database and NSTDB (Noise Stress Test Database).',
    clinicalSignificance: 'Adaptive LMS filtering guided by tri-axial acceleration vectors reduces motion false alarms by 82% without attenuating QRS complexes.'
  },
  'paper-17': {
    problemStatement: 'Inability to detect paroxysmal cardiac autonomic neuropathy (CAN) in diabetic patients prior to irreversible organ damage.',
    deviceUsed: 'High-resolution ECG digitization unit with 1,000 Hz sampling and 24-bit ADC.',
    groundTruth: 'Ewing autonomic cardiovascular reflex test battery (valsalva, deep breathing, standing tilt).',
    clinicalSignificance: 'Nonlinear heart rate variability (HRV) metrics (Poincaré SD1/SD2, Sample Entropy) identify autonomic neuropathy 2.4 years earlier.'
  },
  'paper-18': {
    problemStatement: 'Real-time multi-lead ECG delineation on ultra-low-power wearable microcontrollers with micro-watt energy envelopes.',
    deviceUsed: 'ARM Cortex-M4 microcontroller running ultra-lightweight integer-quantized neural network.',
    groundTruth: 'PhysioNet QT Database with manual expert cardiologists wave boundary annotations.',
    clinicalSignificance: '8-bit quantized temporal convolutional network runs in 3.4 ms per beat at 42 µW power, accurately delineating P-wave, QRS, and T-wave.'
  },
  'paper-19': {
    problemStatement: 'QT prolongation induces lethal Torsades de Pointes arrhythmias during psychotropic and anti-infective drug administration.',
    deviceUsed: 'Hospital continuous telemetry bedside network (GE Healthcare ApexPro Telemetry System).',
    groundTruth: 'Manual 12-lead caliper measurements of Fridericia-corrected QTc intervals by electrophysiologists.',
    clinicalSignificance: 'Automated continuous QTc tracking detects dangerous drug-induced prolongation (>500 ms) with 94.6% sensitivity, preventing sudden death.'
  },
  'paper-20': {
    problemStatement: 'Differentiating life-threatening Ventricular Fibrillation (VF) from benign artifacts in automated external defibrillator (AED) algorithms.',
    deviceUsed: 'Defibrillator paddle surface ECG capture module sampled at 250 Hz.',
    groundTruth: 'AHA and MIT-BIH Malignant Ventricular Arrhythmia Database (VFDB).',
    clinicalSignificance: 'Phase-space reconstructed trajectory analysis achieves 99.1% shockable rhythm sensitivity with zero inappropriate shocks on motion.'
  },

  // Remote Camera rPPG (Papers 21 - 27)
  'paper-21': {
    problemStatement: 'Fragile skin in neonatal ICUs and burn patients prevents the use of adhesive contact pulse oximeter probes.',
    deviceUsed: 'Basler Dart USB3 industrial color camera (60 fps) and NIR 850 nm illuminator.',
    groundTruth: 'Clinical Philips neonatal ECG monitor and bedside transmission pulse oximeter.',
    clinicalSignificance: 'Remote rPPG non-contact monitoring extracts pulse rate within 1.8 BPM error, eliminating skin tears and contact pressure ulcers.'
  },
  'paper-22': {
    problemStatement: 'Facial motion (talking, coughing, head rotation) corrupts camera pixels and distorts blood volume pulse extraction.',
    deviceUsed: 'Logitech Brio 4K camera running real-time 3D facial landmark tracking (MediaPipe).',
    groundTruth: 'BIOPAC finger photoplethysmography sensor (TSD200) ground truth.',
    clinicalSignificance: 'Spatiotemporal 3D Convolutional Neural Network (PhysNet) isolates pulsatile micro-blushes under unconstrained head rotations up to ±45°.'
  },
  'paper-23': {
    problemStatement: 'Ambient room lighting fluctuations (flicker from fluorescent bulbs, daylight shifts) mimic or swamp weak microvascular color pulses.',
    deviceUsed: 'Standard RGB web camera (30 fps, 1080p resolution).',
    groundTruth: 'Continuous finger pulse oximeter reference (Nonin Medical 8500).',
    clinicalSignificance: 'Plane-Orthogonal-to-Skin (POS) projection matrix cancels luminance variations, improving pulse SNR by 6.4 dB under changing ambient light.'
  },
  'paper-24': {
    problemStatement: 'Melanin absorption in darker Fitzpatrick skin tones (Types V and VI) attenuates green light reflections, causing severe rPPG bias.',
    deviceUsed: 'Multi-spectral RGB + NIR dual-sensor camera array.',
    groundTruth: 'Ear-clip photoplethysmogram reference and finger sensor telemetry.',
    clinicalSignificance: 'Adaptive NIR chromatic fusion equalizes pulse detection across all skin tones, reducing Fitzpatrick V/VI error disparity by 71%.'
  },
  'paper-25': {
    problemStatement: 'Non-contact estimation of blood oxygen saturation (SpO2) using consumer RGB cameras without dedicated infrared optics.',
    deviceUsed: 'Dual-narrowband optical bandpass filtered camera system (660 nm and 830 nm).',
    groundTruth: 'Invasive arterial co-oximetry and Masimo Radical-7 bedside monitor.',
    clinicalSignificance: 'Calibrated remote ratio-of-ratios algorithm measures SpO2 across 80%-100% saturation with RMSE of 2.1% without touching the patient.'
  },
  'paper-26': {
    problemStatement: 'Video compression artifacts (H.264 / H.265 block macroblocking) in telehealth streams decimate subtle microvascular facial pulses.',
    deviceUsed: 'Zoom and WebRTC telemedicine video stream capture pipeline.',
    groundTruth: 'FDA-cleared finger pulse oximeter (Masimo MightySat).',
    clinicalSignificance: 'Residual temporal super-resolution autoencoder restores compressed video bitstreams, recovering pulse rate with MAE of 2.4 BPM.'
  },
  'paper-27': {
    problemStatement: 'Estimating continuous respiration rate and tidal breathing volume purely from facial and thoracic thermal/RGB video streams.',
    deviceUsed: 'FLIR Lepton long-wave infrared (LWIR) thermal camera paired with RGB camera.',
    groundTruth: 'Spirometer airflow transducer and chest respiratory inductance plethysmography (RIP).',
    clinicalSignificance: 'Thermal nostril airflow tracking measures respiratory rate within 0.8 breaths/min, detecting hypopnea and sleep apnea without wires.'
  },

  // Radar & RF Sensing (Papers 28 - 33)
  'paper-28': {
    problemStatement: 'Clothing and bed blankets block optical cameras and prevent unobtrusive contactless monitoring in home sleep settings.',
    deviceUsed: 'Texas Instruments IWR6843 60–64 GHz mmWave FMCW radar module with integrated phase-locked loop and 4 GHz sweep bandwidth.',
    groundTruth: 'In-lab Level-1 Polysomnography (PSG) multi-lead respiratory effort bands and 3-lead ECG.',
    clinicalSignificance: 'Micro-Doppler phase demodulation isolates chest displacements as small as 0.1 mm, capturing both HR and RR through thick bedding.'
  },
  'paper-29': {
    problemStatement: 'Locating trapped earthquake and building collapse victims requires through-rubble vital sign detection beneath dense concrete debris.',
    deviceUsed: 'Impulse radio ultra-wideband (IR-UWB) radar transceiver operating at 3.1–4.8 GHz with sub-nanosecond monocycle Gaussian pulse generator.',
    groundTruth: 'Controlled disaster rubble testbed with human subjects beneath 40 cm reinforced concrete, validated against clinical respiratory inductive plethysmography (RIP) and ECG.',
    clinicalSignificance: 'Singular Value Decomposition (SVD) clutter filtering suppresses static rubble reflections by 32 dB, identifying victim respiration with 96.8% accuracy within 45 seconds.'
  },
  'paper-30': {
    problemStatement: 'Simultaneous contactless vital sign tracking of multiple co-located individuals (e.g. shared hospital room or couples in bed) without cross-talk.',
    deviceUsed: 'Time-Division Multiplexed (TDM) MIMO radar array with 3 TX and 4 RX antennas (12 virtual elements) operating with Capon MVDR spatial beamforming.',
    groundTruth: 'Simultaneous polysomnography and individual synchronized ECG telemetry across 4 hospital beds.',
    clinicalSignificance: 'Azimuth-elevation angle-of-arrival (AoA) beamforming isolates and tracks vital signs for up to 4 subjects simultaneously with >24 dB crosstalk suppression.'
  },
  'paper-31': {
    problemStatement: 'Monitoring respiration and sleep staging passively across rooms without requiring patients to wear sensors or installing costly specialized radar hardware.',
    deviceUsed: 'Commercial off-the-shelf (COTS) 5 GHz 802.11ac WiFi network interface cards extracting PHY-layer CSI matrices across 30–64 OFDM subcarriers.',
    groundTruth: 'In-lab SomnoStar polysomnography with RIP belts and nasal pressure cannula across 120 nights.',
    clinicalSignificance: 'Fresnel zone diffraction modeling and subcarrier phase sanitization achieve 98.2% respiration accuracy and 81.4% sleep staging accuracy.'
  },
  'paper-32': {
    problemStatement: 'Contactless detection and discrimination of central vs obstructive sleep apnea events in home environments without uncomfortable nasal cannulas.',
    deviceUsed: 'Ceiling-mounted 24 GHz continuous-wave (CW) homodyne quadrature Doppler radar transceiver with complex demodulation.',
    groundTruth: 'Diagnostic clinical polysomnography (Alice 6) with scored Apnea-Hypopnea Index (AHI).',
    clinicalSignificance: 'Differentiates obstructive vs central sleep apnea with 92.4% sensitivity by tracking paradoxical chest-abdomen Doppler velocity recoil.'
  },
  'paper-33': {
    problemStatement: 'Extracting cardiac mechanical timing intervals (Pre-Ejection Period and Left Ventricular Ejection Time) non-invasively without skin-attached accelerometers.',
    deviceUsed: 'Focused-beam 10 GHz X-band microwave radar targeted at the precordium (4th left intercostal space).',
    groundTruth: 'Synchronized chest-contact 3-axis accelerometer (SCG) and 2D/Doppler echocardiography in 24 subjects.',
    clinicalSignificance: 'Decouples Aortic Valve Opening (AVO) and Mitral Valve Closure (MVC) within 6.4 ms, enabling remote left-ventricular systolic timing (PEP, LVET).'
  },

  // Respiratory Rate & Capnography (Papers 34 - 38)
  'paper-34': {
    problemStatement: 'Respiratory rate is the most sensitive early predictor of clinical deterioration but is the vital sign most frequently neglected or miscounted.',
    deviceUsed: 'Standard single-wavelength reflective finger PPG sensor and single-lead ECG.',
    groundTruth: 'End-Tidal CO2 (EtCO2) side-stream capnography from CapnoBase, MIMIC-II, RRest, and VORTEX databases.',
    clinicalSignificance: 'Fusion of Respiratory-Induced Frequency, Amplitude, and Baseline modulations (RIFM, RIAM, RIBM) achieves RR MAE of 1.4 breaths/min across 314 benchmarked algorithms.'
  },
  'paper-35': {
    problemStatement: 'Continuous acoustic monitoring of respiratory rate and upper airway obstruction (stridor, wheezing) without obtrusive facial masks.',
    deviceUsed: 'Soft throat-attached piezoelectric strain transducer (PVDF / PZT cantilever) capturing acoustic tracheal vibrations (50–2,000 Hz).',
    groundTruth: 'Calibrated electronic pneumotachography and side-stream capnography in 35 post-extubation ICU patients.',
    clinicalSignificance: 'Tracheal breath sound analysis detects post-extubation stridor and airway stenosis with 94.6% sensitivity, providing 22 minutes early intervention lead time.'
  },
  'paper-36': {
    problemStatement: 'Post-operative opioid-induced respiratory depression (OIRD) causing silent respiratory arrest on unmonitored hospital surgical wards.',
    deviceUsed: 'Microstream side-stream capnograph (Oridion) measuring continuous End-Tidal CO2 and respiratory rate vs standard pulse oximetry.',
    groundTruth: 'Continuous arterial blood gas PaCO2 samples and clinical rapid response team call logs in 180 post-surgical patients.',
    clinicalSignificance: 'Capnography detects alveolar hypoventilation and bradypnea on average 18 minutes earlier than conventional pulse oximetry alarms.'
  },
  'paper-37': {
    problemStatement: 'Non-invasive continuous estimation of tidal volume and minute ventilation without constraining spirometry face-masks or body plethysmography.',
    deviceUsed: 'Tetrapolar high-frequency (50 kHz, 1 mA) thoracic bioimpedance pneumography (BioZ) array.',
    groundTruth: 'Calibrated Jaeger spirometer airflow volume measurement across variable tidal breathing maneuvers.',
    clinicalSignificance: 'Reconstructs breath-by-breath tidal volume with MAE of 68 mL and minute ventilation error < 9.4%, detecting shallow hypopnea without facial masks.'
  },
  'paper-38': {
    problemStatement: 'Automated classification of abnormal breathing patterns (Cheyne-Stokes, Biot, Kussmaul, tachypnea) in ambulatory pulmonary patients.',
    deviceUsed: 'Dual wearable 6-axis inertial measurement units (IMUs) affixed to thoracic and abdominal compartments.',
    groundTruth: 'Simultaneous calibrated respiratory inductive plethysmography (RIP) and clinical pulmonologist blinded consensus review.',
    clinicalSignificance: 'Classifies five distinct abnormal breathing patterns with 95.3% multi-class F1-score by tracking thoracoabdominal asynchrony and phase angle.'
  },

  // ICU Deterioration, Sepsis & Multi-Parameter Models (Papers 39 - 43)
  'paper-39': {
    problemStatement: 'Delayed recognition of hospital ward sepsis leading to septic shock, irreversible organ damage, and high in-hospital mortality.',
    deviceUsed: 'Continuous wireless telemetry network streaming 5-minute vital sign aggregates (HR, RR, SpO2, SBP) into an automated machine learning trajectory engine.',
    groundTruth: 'Consensus Sepsis-3 definitions (acute SOFA score increase >= 2 points with blood culture microbiological confirmation in 5,840 patients).',
    clinicalSignificance: 'Gradient-boosted trajectory models predict septic shock 4.8 hours prior to acute ICU escalation (AUROC 0.892), reducing 30-day mortality by 18.2%.'
  },
  'paper-40': {
    problemStatement: 'Intermittent manual National Early Warning Score 2 (NEWS2) nursing calculations miss acute decompensation episodes occurring between 4-hour rounds.',
    deviceUsed: 'Automated hospital EHR vital sign surveillance system analyzing continuous telemetry across 100,000 ICU and high-acuity admissions.',
    groundTruth: 'Cardiac arrest team activations, unanticipated emergency ICU transfers, and 24-hour in-hospital mortality.',
    clinicalSignificance: 'Continuous algorithmic NEWS2 evaluation reduces time-to-detection of clinical decompensation by 3.6 hours compared to intermittent manual charts.'
  },
  'paper-41': {
    problemStatement: 'Predicting impending acute decompensation and re-hospitalization in chronic heart failure patients prior to overt pulmonary edema.',
    deviceUsed: 'Multi-modal wearable sensor patch integrating ECG, photoplethysmography, thoracic bioimpedance, and tri-axial physical actigraphy.',
    groundTruth: 'Clinical heart failure decompensation events, emergency diuretic escalations, and invasive pulmonary capillary wedge pressure (PCWP).',
    clinicalSignificance: 'Cross-sensor fusion detects subclinical fluid accumulation and autonomic decompensation 6.5 days in advance of hospital readmission (sensitivity 88%).'
  },
  'paper-42': {
    problemStatement: 'Training robust multi-center vital sign AI models without compromising patient privacy or violating cross-jurisdictional HIPAA / GDPR data transfer restrictions.',
    deviceUsed: 'Decentralized federated edge computing framework deployed across 12 independent hospital networks.',
    groundTruth: 'Centralized model benchmark trained on aggregated pooled multi-center clinical vitals (n=85,000 patients).',
    clinicalSignificance: 'Federated differential privacy training preserves patient confidentiality while attaining 98.4% of the predictive accuracy of centralized pooling.'
  },
  'paper-43': {
    problemStatement: 'Alarm fatigue and high false-positive alert rates in continuous ward telemetry causing nursing desensitization and missed life-threatening deterioration.',
    deviceUsed: 'Multi-parameter wireless telemetry system paired with intelligent temporal persistence alert filters.',
    groundTruth: 'Blinded adjudication of 45,000 telemetry alarms by expert intensive care physician review and patient clinical outcome tracking.',
    clinicalSignificance: 'Temporal persistence filtering and cross-vital validation reduce non-actionable nuisance alarms by 74% without missing a single true critical event.'
  }
};
