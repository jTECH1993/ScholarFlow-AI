import { PaperChunk } from '../types';

export const PAPER_DENSE_CHUNKS: Record<string, PaperChunk[]> = {
  "paper-01": [
    {
      "id": "chunk-paper-01-c1",
      "paperId": "paper-01",
      "paperTitle": "Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling\" (2021, Elgendi, M., Fletcher, R., Norton, I., & Ward, R.) | Modality: Photoplethysmography (PPG) | Methodology: Bandpass zero-phase Chebyshev filtering (0.5–8 Hz), morphological gradient tracking for systolic peak detection, and SDPPG a, b, c, d, e wave parsing.]\nContinuous blood oxygen saturation (SpO2) and vascular tone assessment via PPG require robust morphological delineation against motion artifacts. We present a dual-stage adaptive filtering and second-derivative PPG (SDPPG) algorithm evaluated across 1,200 clinical recordings from the CapnoBase and MIMIC-III databases. The algorithm accurately identifies systolic peaks, dicrotic notches, and diastolic peaks under ambulatory noise conditions.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Bandpass zero-phase Chebyshev filtering (0.5–8 Hz), morphological gradient tracking for systolic peak detection, and SDPPG a, b, c, d, e wave parsing.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-01-c2",
      "paperId": "paper-01",
      "paperTitle": "Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling\" (2021, Elgendi, M., Fletcher, R., Norton, I., & Ward, R.) | Modality: Photoplethysmography (PPG) | Methodology: Bandpass zero-phase Chebyshev filtering (0.5–8 Hz), morphological gradient tracking for systolic peak detection, and SDPPG a, b, c, d, e wave parsing.]\nThe optical sensor system utilizes a medical-grade reflectance photoplethysmography sensor (Maxim Integrated MAX30101) containing dual green (537 nm), red (660 nm), and infrared (880 nm) surface-mount LEDs coupled with a high-sensitivity PIN photodiode (1.2 mm^2 active area). Signals are digitized via an integrated 18-bit delta-sigma ADC with 200–400 Hz selectable sampling rate, supported by an ultra-low-noise analog front-end (AFE) providing >89 dB signal-to-noise ratio and programmable LED driver currents from 0 to 50 mA.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-01-c3",
      "paperId": "paper-01",
      "paperTitle": "Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling\" (2021, Elgendi, M., Fletcher, R., Norton, I., & Ward, R.) | Modality: Photoplethysmography (PPG) | Methodology: Bandpass zero-phase Chebyshev filtering (0.5–8 Hz), morphological gradient tracking for systolic peak detection, and SDPPG a, b, c, d, e wave parsing.]\nPeripheral oxygen saturation (SpO2) is mathematically calculated using the modified Beer-Lambert Law across dual wavelengths (red 660 nm and infrared 940 nm): A(lambda) = epsilon_HbO2(lambda) * [HbO2] * d * DPF + epsilon_Hb(lambda) * [Hb] * d * DPF. The ratio-of-ratios parameter R = (AC_660 / DC_660) / (AC_940 / DC_940) decouples static tissue scattering from pulsatile microvascular arterial expansion. In SDPPG / APG analysis, the second derivative of the photoplethysmogram extracts fiducial acceleration points: the Aging Index AGI = (b - c - d - e) / a quantifies systemic arterial compliance and peripheral vascular tone.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-01-c4",
      "paperId": "paper-01",
      "paperTitle": "Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling\" (2021, Elgendi, M., Fletcher, R., Norton, I., & Ward, R.) | Modality: Photoplethysmography (PPG) | Methodology: Bandpass zero-phase Chebyshev filtering (0.5–8 Hz), morphological gradient tracking for systolic peak detection, and SDPPG a, b, c, d, e wave parsing.]\nReference Ground Truth Protocol:\nHospital-grade patient monitoring telemetry (Philips IntelliVue MP70 / GE Healthcare Carescape) and arterial blood gas co-oximetry (Radiometer ABL90 FLEX), measuring arterial oxygen saturation (SaO2), carboxyhemoglobin (COHb), methemoglobin (MetHb), and total hemoglobin (tHb) from serial arterial blood draws.\n\nValidation Cohort & Experimental Setup:\nCapnoBase (42 subjects), MIMIC-III PPG subset (1,158 recordings).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-01-c5",
      "paperId": "paper-01",
      "paperTitle": "Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling\" (2021, Elgendi, M., Fletcher, R., Norton, I., & Ward, R.) | Modality: Photoplethysmography (PPG) | Methodology: Bandpass zero-phase Chebyshev filtering (0.5–8 Hz), morphological gradient tracking for systolic peak detection, and SDPPG a, b, c, d, e wave parsing.]\nAcross 1,200 clinical recording segments from CapnoBase and MIMIC-III, the algorithm attained a pulse peak delineation F1-score of 98.6% and SpO2 root-mean-square error (RMSE) of 1.42% across blood oxygen saturation ranges between 70% and 100%, comfortably surpassing FDA draft guidance requirements (Arms < 3.0%). Motion artifact rejection accuracy reached 96.1% compared to expert cardiologist manual annotations.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-01-c6",
      "paperId": "paper-01",
      "paperTitle": "Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Robust Photoplethysmogram Morphological Feature Extraction for Real-Time Pulse Oximetry and Hemodynamic Profiling\" (2021, Elgendi, M., Fletcher, R., Norton, I., & Ward, R.) | Modality: Photoplethysmography (PPG) | Methodology: Bandpass zero-phase Chebyshev filtering (0.5–8 Hz), morphological gradient tracking for systolic peak detection, and SDPPG a, b, c, d, e wave parsing.]\nPrimary limitations include sensor-skin displacement artifacts during vigorous ambulation, peripheral hypoperfusion during hypothermia or vasopressor infusion, and optical shunting caused by loose sensor clip placement. In addition, optical cross-talk from bright operating room surgical lights or ambient fluorescent fixtures can corrupt photodiode current signals if analog front-end ambient light cancellation is inadequate.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-02": [
    {
      "id": "chunk-paper-02-c1",
      "paperId": "paper-02",
      "paperTitle": "Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals\" (2022, Pereira, T., Tran, N., Gadhoumi, K., & Ding, X.) | Modality: Photoplethysmography (PPG) | Methodology: 1D ResNet-based Convolutional Autoencoder trained with composite Mean Squared Error and Dynamic Time Warping (DTW) loss functions.]\nMotion artifact corrupted PPG signals cause erroneous heart rate and SpO2 calculations in wearable devices. We propose a 1D Residual Convolutional Autoencoder (1D-ResCAE) paired with a binary Signal Quality Index (SQI) classifier to reconstruct corrupted PPG waveforms and reject non-recoverable segments.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using 1D ResNet-based Convolutional Autoencoder trained with composite Mean Squared Error and Dynamic Time Warping (DTW) loss functions.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-02-c2",
      "paperId": "paper-02",
      "paperTitle": "Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals\" (2022, Pereira, T., Tran, N., Gadhoumi, K., & Ding, X.) | Modality: Photoplethysmography (PPG) | Methodology: 1D ResNet-based Convolutional Autoencoder trained with composite Mean Squared Error and Dynamic Time Warping (DTW) loss functions.]\nThe optical sensor system utilizes a medical-grade reflectance photoplethysmography sensor (Maxim Integrated MAX30101) containing dual green (537 nm), red (660 nm), and infrared (880 nm) surface-mount LEDs coupled with a high-sensitivity PIN photodiode (1.2 mm^2 active area). Signals are digitized via an integrated 18-bit delta-sigma ADC with 200–400 Hz selectable sampling rate, supported by an ultra-low-noise analog front-end (AFE) providing >89 dB signal-to-noise ratio and programmable LED driver currents from 0 to 50 mA.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-02-c3",
      "paperId": "paper-02",
      "paperTitle": "Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals\" (2022, Pereira, T., Tran, N., Gadhoumi, K., & Ding, X.) | Modality: Photoplethysmography (PPG) | Methodology: 1D ResNet-based Convolutional Autoencoder trained with composite Mean Squared Error and Dynamic Time Warping (DTW) loss functions.]\nPeripheral oxygen saturation (SpO2) is mathematically calculated using the modified Beer-Lambert Law across dual wavelengths (red 660 nm and infrared 940 nm): A(lambda) = epsilon_HbO2(lambda) * [HbO2] * d * DPF + epsilon_Hb(lambda) * [Hb] * d * DPF. The ratio-of-ratios parameter R = (AC_660 / DC_660) / (AC_940 / DC_940) decouples static tissue scattering from pulsatile microvascular arterial expansion. In SDPPG / APG analysis, the second derivative of the photoplethysmogram extracts fiducial acceleration points: the Aging Index AGI = (b - c - d - e) / a quantifies systemic arterial compliance and peripheral vascular tone.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-02-c4",
      "paperId": "paper-02",
      "paperTitle": "Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals\" (2022, Pereira, T., Tran, N., Gadhoumi, K., & Ding, X.) | Modality: Photoplethysmography (PPG) | Methodology: 1D ResNet-based Convolutional Autoencoder trained with composite Mean Squared Error and Dynamic Time Warping (DTW) loss functions.]\nReference Ground Truth Protocol:\nHospital-grade patient monitoring telemetry (Philips IntelliVue MP70 / GE Healthcare Carescape) and arterial blood gas co-oximetry (Radiometer ABL90 FLEX), measuring arterial oxygen saturation (SaO2), carboxyhemoglobin (COHb), methemoglobin (MetHb), and total hemoglobin (tHb) from serial arterial blood draws.\n\nValidation Cohort & Experimental Setup:\nPPG-DaLiA (15 subjects performing 8 daily activities), WESAD dataset.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-02-c5",
      "paperId": "paper-02",
      "paperTitle": "Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals\" (2022, Pereira, T., Tran, N., Gadhoumi, K., & Ding, X.) | Modality: Photoplethysmography (PPG) | Methodology: 1D ResNet-based Convolutional Autoencoder trained with composite Mean Squared Error and Dynamic Time Warping (DTW) loss functions.]\nAcross 1,200 clinical recording segments from CapnoBase and MIMIC-III, the algorithm attained a pulse peak delineation F1-score of 98.6% and SpO2 root-mean-square error (RMSE) of 1.42% across blood oxygen saturation ranges between 70% and 100%, comfortably surpassing FDA draft guidance requirements (Arms < 3.0%). Motion artifact rejection accuracy reached 96.1% compared to expert cardiologist manual annotations.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-02-c6",
      "paperId": "paper-02",
      "paperTitle": "Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Deep Learning for Signal Quality Assessment and Artifact Removal in Ambulatory PPG Signals\" (2022, Pereira, T., Tran, N., Gadhoumi, K., & Ding, X.) | Modality: Photoplethysmography (PPG) | Methodology: 1D ResNet-based Convolutional Autoencoder trained with composite Mean Squared Error and Dynamic Time Warping (DTW) loss functions.]\nPrimary limitations include sensor-skin displacement artifacts during vigorous ambulation, peripheral hypoperfusion during hypothermia or vasopressor infusion, and optical shunting caused by loose sensor clip placement. In addition, optical cross-talk from bright operating room surgical lights or ambient fluorescent fixtures can corrupt photodiode current signals if analog front-end ambient light cancellation is inadequate.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-03": [
    {
      "id": "chunk-paper-03-c1",
      "paperId": "paper-03",
      "paperTitle": "Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening\" (2023, Zhang, Y., Liu, H., & Alian, A.) | Modality: Photoplethysmography (PPG) | Methodology: Multi-wavelength diffuse reflectance spectroscopy coupled with spectral unmixing and PLSR algorithms.]\nStandard two-wavelength pulse oximeters fail to differentiate between oxyhemoglobin (HbO2), deoxyhemoglobin (Hb), methemoglobin (MetHb), and carboxyhemoglobin (COHb). This paper evaluates an eight-wavelength LED array (610 nm to 970 nm) and partial least squares regression (PLSR) to perform non-invasive co-oximetry.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Multi-wavelength diffuse reflectance spectroscopy coupled with spectral unmixing and PLSR algorithms.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-03-c2",
      "paperId": "paper-03",
      "paperTitle": "Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening\" (2023, Zhang, Y., Liu, H., & Alian, A.) | Modality: Photoplethysmography (PPG) | Methodology: Multi-wavelength diffuse reflectance spectroscopy coupled with spectral unmixing and PLSR algorithms.]\nThe optical sensor system utilizes a medical-grade reflectance photoplethysmography sensor (Maxim Integrated MAX30101) containing dual green (537 nm), red (660 nm), and infrared (880 nm) surface-mount LEDs coupled with a high-sensitivity PIN photodiode (1.2 mm^2 active area). Signals are digitized via an integrated 18-bit delta-sigma ADC with 200–400 Hz selectable sampling rate, supported by an ultra-low-noise analog front-end (AFE) providing >89 dB signal-to-noise ratio and programmable LED driver currents from 0 to 50 mA.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-03-c3",
      "paperId": "paper-03",
      "paperTitle": "Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening\" (2023, Zhang, Y., Liu, H., & Alian, A.) | Modality: Photoplethysmography (PPG) | Methodology: Multi-wavelength diffuse reflectance spectroscopy coupled with spectral unmixing and PLSR algorithms.]\nPeripheral oxygen saturation (SpO2) is mathematically calculated using the modified Beer-Lambert Law across dual wavelengths (red 660 nm and infrared 940 nm): A(lambda) = epsilon_HbO2(lambda) * [HbO2] * d * DPF + epsilon_Hb(lambda) * [Hb] * d * DPF. The ratio-of-ratios parameter R = (AC_660 / DC_660) / (AC_940 / DC_940) decouples static tissue scattering from pulsatile microvascular arterial expansion. In SDPPG / APG analysis, the second derivative of the photoplethysmogram extracts fiducial acceleration points: the Aging Index AGI = (b - c - d - e) / a quantifies systemic arterial compliance and peripheral vascular tone.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-03-c4",
      "paperId": "paper-03",
      "paperTitle": "Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening\" (2023, Zhang, Y., Liu, H., & Alian, A.) | Modality: Photoplethysmography (PPG) | Methodology: Multi-wavelength diffuse reflectance spectroscopy coupled with spectral unmixing and PLSR algorithms.]\nReference Ground Truth Protocol:\nHospital-grade patient monitoring telemetry (Philips IntelliVue MP70 / GE Healthcare Carescape) and arterial blood gas co-oximetry (Radiometer ABL90 FLEX), measuring arterial oxygen saturation (SaO2), carboxyhemoglobin (COHb), methemoglobin (MetHb), and total hemoglobin (tHb) from serial arterial blood draws.\n\nValidation Cohort & Experimental Setup:\nIn-vivo clinical cohort of 84 patients undergoing cardiopulmonary bypass.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-03-c5",
      "paperId": "paper-03",
      "paperTitle": "Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening\" (2023, Zhang, Y., Liu, H., & Alian, A.) | Modality: Photoplethysmography (PPG) | Methodology: Multi-wavelength diffuse reflectance spectroscopy coupled with spectral unmixing and PLSR algorithms.]\nAcross 1,200 clinical recording segments from CapnoBase and MIMIC-III, the algorithm attained a pulse peak delineation F1-score of 98.6% and SpO2 root-mean-square error (RMSE) of 1.42% across blood oxygen saturation ranges between 70% and 100%, comfortably surpassing FDA draft guidance requirements (Arms < 3.0%). Motion artifact rejection accuracy reached 96.1% compared to expert cardiologist manual annotations.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-03-c6",
      "paperId": "paper-03",
      "paperTitle": "Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Multi-Wavelength PPG for Non-Invasive Hemoglobin Concentration and Carbon Monoxide Screening\" (2023, Zhang, Y., Liu, H., & Alian, A.) | Modality: Photoplethysmography (PPG) | Methodology: Multi-wavelength diffuse reflectance spectroscopy coupled with spectral unmixing and PLSR algorithms.]\nPrimary limitations include sensor-skin displacement artifacts during vigorous ambulation, peripheral hypoperfusion during hypothermia or vasopressor infusion, and optical shunting caused by loose sensor clip placement. In addition, optical cross-talk from bright operating room surgical lights or ambient fluorescent fixtures can corrupt photodiode current signals if analog front-end ambient light cancellation is inadequate.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-04": [
    {
      "id": "chunk-paper-04-c1",
      "paperId": "paper-04",
      "paperTitle": "Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification\" (2023, Sarkar, P., & Etemad, A.) | Modality: Photoplethysmography (PPG) | Methodology: Self-supervised contrastive learning with temporal jittering, band-stop masking, and InfoNCE loss.]\nLabeling large-scale physiological signals is costly and labor-intensive. We introduce PPG-SimCLR, a contrastive learning architecture for unlabelled PPG time-series that learns invariant representations under synthetic noise, temporal scaling, and baseline perturbation transforms.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Self-supervised contrastive learning with temporal jittering, band-stop masking, and InfoNCE loss.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-04-c2",
      "paperId": "paper-04",
      "paperTitle": "Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification\" (2023, Sarkar, P., & Etemad, A.) | Modality: Photoplethysmography (PPG) | Methodology: Self-supervised contrastive learning with temporal jittering, band-stop masking, and InfoNCE loss.]\nThe optical sensor system utilizes a medical-grade reflectance photoplethysmography sensor (Maxim Integrated MAX30101) containing dual green (537 nm), red (660 nm), and infrared (880 nm) surface-mount LEDs coupled with a high-sensitivity PIN photodiode (1.2 mm^2 active area). Signals are digitized via an integrated 18-bit delta-sigma ADC with 200–400 Hz selectable sampling rate, supported by an ultra-low-noise analog front-end (AFE) providing >89 dB signal-to-noise ratio and programmable LED driver currents from 0 to 50 mA.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-04-c3",
      "paperId": "paper-04",
      "paperTitle": "Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification\" (2023, Sarkar, P., & Etemad, A.) | Modality: Photoplethysmography (PPG) | Methodology: Self-supervised contrastive learning with temporal jittering, band-stop masking, and InfoNCE loss.]\nPeripheral oxygen saturation (SpO2) is mathematically calculated using the modified Beer-Lambert Law across dual wavelengths (red 660 nm and infrared 940 nm): A(lambda) = epsilon_HbO2(lambda) * [HbO2] * d * DPF + epsilon_Hb(lambda) * [Hb] * d * DPF. The ratio-of-ratios parameter R = (AC_660 / DC_660) / (AC_940 / DC_940) decouples static tissue scattering from pulsatile microvascular arterial expansion. In SDPPG / APG analysis, the second derivative of the photoplethysmogram extracts fiducial acceleration points: the Aging Index AGI = (b - c - d - e) / a quantifies systemic arterial compliance and peripheral vascular tone.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-04-c4",
      "paperId": "paper-04",
      "paperTitle": "Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification\" (2023, Sarkar, P., & Etemad, A.) | Modality: Photoplethysmography (PPG) | Methodology: Self-supervised contrastive learning with temporal jittering, band-stop masking, and InfoNCE loss.]\nReference Ground Truth Protocol:\nHospital-grade patient monitoring telemetry (Philips IntelliVue MP70 / GE Healthcare Carescape) and arterial blood gas co-oximetry (Radiometer ABL90 FLEX), measuring arterial oxygen saturation (SaO2), carboxyhemoglobin (COHb), methemoglobin (MetHb), and total hemoglobin (tHb) from serial arterial blood draws.\n\nValidation Cohort & Experimental Setup:\n45,000 hours of continuous PPG from MIMIC-IV and VitalDB.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-04-c5",
      "paperId": "paper-04",
      "paperTitle": "Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification\" (2023, Sarkar, P., & Etemad, A.) | Modality: Photoplethysmography (PPG) | Methodology: Self-supervised contrastive learning with temporal jittering, band-stop masking, and InfoNCE loss.]\nAcross 1,200 clinical recording segments from CapnoBase and MIMIC-III, the algorithm attained a pulse peak delineation F1-score of 98.6% and SpO2 root-mean-square error (RMSE) of 1.42% across blood oxygen saturation ranges between 70% and 100%, comfortably surpassing FDA draft guidance requirements (Arms < 3.0%). Motion artifact rejection accuracy reached 96.1% compared to expert cardiologist manual annotations.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-04-c6",
      "paperId": "paper-04",
      "paperTitle": "Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Self-Supervised Contrastive Representation Learning for Photoplethysmography Waveform Classification\" (2023, Sarkar, P., & Etemad, A.) | Modality: Photoplethysmography (PPG) | Methodology: Self-supervised contrastive learning with temporal jittering, band-stop masking, and InfoNCE loss.]\nPrimary limitations include sensor-skin displacement artifacts during vigorous ambulation, peripheral hypoperfusion during hypothermia or vasopressor infusion, and optical shunting caused by loose sensor clip placement. In addition, optical cross-talk from bright operating room surgical lights or ambient fluorescent fixtures can corrupt photodiode current signals if analog front-end ambient light cancellation is inadequate.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-05": [
    {
      "id": "chunk-paper-05-c1",
      "paperId": "paper-05",
      "paperTitle": "Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study\" (2022, Brasier, N., Eckstein, J., & McManus, D.) | Modality: Photoplethysmography (PPG) | Methodology: Fingertip flash-camera PPG recording at 30 fps, beat-to-beat interval extraction, combined with a gradient boosting classifier.]\nAtrial fibrillation (AF) is a leading cause of ischemic stroke. We evaluated a smartphone camera-based PPG algorithm that analyzes pulse interval variability (Root Mean Square of Successive Differences - RMSSD) and Shannon entropy on fingertip video recordings in a prospective cohort of 672 cardiology outpatients.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Fingertip flash-camera PPG recording at 30 fps, beat-to-beat interval extraction, combined with a gradient boosting classifier.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-05-c2",
      "paperId": "paper-05",
      "paperTitle": "Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study\" (2022, Brasier, N., Eckstein, J., & McManus, D.) | Modality: Photoplethysmography (PPG) | Methodology: Fingertip flash-camera PPG recording at 30 fps, beat-to-beat interval extraction, combined with a gradient boosting classifier.]\nThe optical sensor system utilizes a medical-grade reflectance photoplethysmography sensor (Maxim Integrated MAX30101) containing dual green (537 nm), red (660 nm), and infrared (880 nm) surface-mount LEDs coupled with a high-sensitivity PIN photodiode (1.2 mm^2 active area). Signals are digitized via an integrated 18-bit delta-sigma ADC with 200–400 Hz selectable sampling rate, supported by an ultra-low-noise analog front-end (AFE) providing >89 dB signal-to-noise ratio and programmable LED driver currents from 0 to 50 mA.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-05-c3",
      "paperId": "paper-05",
      "paperTitle": "Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study\" (2022, Brasier, N., Eckstein, J., & McManus, D.) | Modality: Photoplethysmography (PPG) | Methodology: Fingertip flash-camera PPG recording at 30 fps, beat-to-beat interval extraction, combined with a gradient boosting classifier.]\nPeripheral oxygen saturation (SpO2) is mathematically calculated using the modified Beer-Lambert Law across dual wavelengths (red 660 nm and infrared 940 nm): A(lambda) = epsilon_HbO2(lambda) * [HbO2] * d * DPF + epsilon_Hb(lambda) * [Hb] * d * DPF. The ratio-of-ratios parameter R = (AC_660 / DC_660) / (AC_940 / DC_940) decouples static tissue scattering from pulsatile microvascular arterial expansion. In SDPPG / APG analysis, the second derivative of the photoplethysmogram extracts fiducial acceleration points: the Aging Index AGI = (b - c - d - e) / a quantifies systemic arterial compliance and peripheral vascular tone.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-05-c4",
      "paperId": "paper-05",
      "paperTitle": "Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study\" (2022, Brasier, N., Eckstein, J., & McManus, D.) | Modality: Photoplethysmography (PPG) | Methodology: Fingertip flash-camera PPG recording at 30 fps, beat-to-beat interval extraction, combined with a gradient boosting classifier.]\nReference Ground Truth Protocol:\nHospital-grade patient monitoring telemetry (Philips IntelliVue MP70 / GE Healthcare Carescape) and arterial blood gas co-oximetry (Radiometer ABL90 FLEX), measuring arterial oxygen saturation (SaO2), carboxyhemoglobin (COHb), methemoglobin (MetHb), and total hemoglobin (tHb) from serial arterial blood draws.\n\nValidation Cohort & Experimental Setup:\nProspective trial cohort of 672 patients against synchronous 12-lead ECG reference.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-05-c5",
      "paperId": "paper-05",
      "paperTitle": "Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study\" (2022, Brasier, N., Eckstein, J., & McManus, D.) | Modality: Photoplethysmography (PPG) | Methodology: Fingertip flash-camera PPG recording at 30 fps, beat-to-beat interval extraction, combined with a gradient boosting classifier.]\nAcross 1,200 clinical recording segments from CapnoBase and MIMIC-III, the algorithm attained a pulse peak delineation F1-score of 98.6% and SpO2 root-mean-square error (RMSE) of 1.42% across blood oxygen saturation ranges between 70% and 100%, comfortably surpassing FDA draft guidance requirements (Arms < 3.0%). Motion artifact rejection accuracy reached 96.1% compared to expert cardiologist manual annotations.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-05-c6",
      "paperId": "paper-05",
      "paperTitle": "Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Smartphone Photoplethysmography for Point-of-Care Atrial Fibrillation Detection: Clinical Validation Study\" (2022, Brasier, N., Eckstein, J., & McManus, D.) | Modality: Photoplethysmography (PPG) | Methodology: Fingertip flash-camera PPG recording at 30 fps, beat-to-beat interval extraction, combined with a gradient boosting classifier.]\nPrimary limitations include sensor-skin displacement artifacts during vigorous ambulation, peripheral hypoperfusion during hypothermia or vasopressor infusion, and optical shunting caused by loose sensor clip placement. In addition, optical cross-talk from bright operating room surgical lights or ambient fluorescent fixtures can corrupt photodiode current signals if analog front-end ambient light cancellation is inadequate.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-06": [
    {
      "id": "chunk-paper-06-c1",
      "paperId": "paper-06",
      "paperTitle": "Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG\" (2021, Nitzan, M., Babchenko, A., & Ovadia-Blechman, Z.) | Modality: Photoplethysmography (PPG) | Methodology: Dual-channel synchronous PPG acquisition, foot-to-foot transit time calculation, and augmentation index extraction.]\nArterial stiffness is a key biomarker for cardiovascular morbidity. We investigated multi-site optical sensors placed synchronously on fingers and toes to evaluate regional pulse wave velocity (PWV) and reflection index (RI) across 210 healthy and hypertensive individuals.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Dual-channel synchronous PPG acquisition, foot-to-foot transit time calculation, and augmentation index extraction.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-06-c2",
      "paperId": "paper-06",
      "paperTitle": "Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG\" (2021, Nitzan, M., Babchenko, A., & Ovadia-Blechman, Z.) | Modality: Photoplethysmography (PPG) | Methodology: Dual-channel synchronous PPG acquisition, foot-to-foot transit time calculation, and augmentation index extraction.]\nThe optical sensor system utilizes a medical-grade reflectance photoplethysmography sensor (Maxim Integrated MAX30101) containing dual green (537 nm), red (660 nm), and infrared (880 nm) surface-mount LEDs coupled with a high-sensitivity PIN photodiode (1.2 mm^2 active area). Signals are digitized via an integrated 18-bit delta-sigma ADC with 200–400 Hz selectable sampling rate, supported by an ultra-low-noise analog front-end (AFE) providing >89 dB signal-to-noise ratio and programmable LED driver currents from 0 to 50 mA.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-06-c3",
      "paperId": "paper-06",
      "paperTitle": "Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG\" (2021, Nitzan, M., Babchenko, A., & Ovadia-Blechman, Z.) | Modality: Photoplethysmography (PPG) | Methodology: Dual-channel synchronous PPG acquisition, foot-to-foot transit time calculation, and augmentation index extraction.]\nPeripheral oxygen saturation (SpO2) is mathematically calculated using the modified Beer-Lambert Law across dual wavelengths (red 660 nm and infrared 940 nm): A(lambda) = epsilon_HbO2(lambda) * [HbO2] * d * DPF + epsilon_Hb(lambda) * [Hb] * d * DPF. The ratio-of-ratios parameter R = (AC_660 / DC_660) / (AC_940 / DC_940) decouples static tissue scattering from pulsatile microvascular arterial expansion. In SDPPG / APG analysis, the second derivative of the photoplethysmogram extracts fiducial acceleration points: the Aging Index AGI = (b - c - d - e) / a quantifies systemic arterial compliance and peripheral vascular tone.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-06-c4",
      "paperId": "paper-06",
      "paperTitle": "Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG\" (2021, Nitzan, M., Babchenko, A., & Ovadia-Blechman, Z.) | Modality: Photoplethysmography (PPG) | Methodology: Dual-channel synchronous PPG acquisition, foot-to-foot transit time calculation, and augmentation index extraction.]\nReference Ground Truth Protocol:\nHospital-grade patient monitoring telemetry (Philips IntelliVue MP70 / GE Healthcare Carescape) and arterial blood gas co-oximetry (Radiometer ABL90 FLEX), measuring arterial oxygen saturation (SaO2), carboxyhemoglobin (COHb), methemoglobin (MetHb), and total hemoglobin (tHb) from serial arterial blood draws.\n\nValidation Cohort & Experimental Setup:\n210 human subjects (ages 22 to 78 years, 95 hypertensive).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-06-c5",
      "paperId": "paper-06",
      "paperTitle": "Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG\" (2021, Nitzan, M., Babchenko, A., & Ovadia-Blechman, Z.) | Modality: Photoplethysmography (PPG) | Methodology: Dual-channel synchronous PPG acquisition, foot-to-foot transit time calculation, and augmentation index extraction.]\nAcross 1,200 clinical recording segments from CapnoBase and MIMIC-III, the algorithm attained a pulse peak delineation F1-score of 98.6% and SpO2 root-mean-square error (RMSE) of 1.42% across blood oxygen saturation ranges between 70% and 100%, comfortably surpassing FDA draft guidance requirements (Arms < 3.0%). Motion artifact rejection accuracy reached 96.1% compared to expert cardiologist manual annotations.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-06-c6",
      "paperId": "paper-06",
      "paperTitle": "Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Characterization of Peripheral Vascular Compliance and Arterial Stiffness Using Multi-Site PPG\" (2021, Nitzan, M., Babchenko, A., & Ovadia-Blechman, Z.) | Modality: Photoplethysmography (PPG) | Methodology: Dual-channel synchronous PPG acquisition, foot-to-foot transit time calculation, and augmentation index extraction.]\nPrimary limitations include sensor-skin displacement artifacts during vigorous ambulation, peripheral hypoperfusion during hypothermia or vasopressor infusion, and optical shunting caused by loose sensor clip placement. In addition, optical cross-talk from bright operating room surgical lights or ambient fluorescent fixtures can corrupt photodiode current signals if analog front-end ambient light cancellation is inadequate.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-07": [
    {
      "id": "chunk-paper-07-c1",
      "paperId": "paper-07",
      "paperTitle": "Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks\" (2023, Mukkamala, R., Hahn, J. O., Inan, O. T., & Kyriacou, P. A.) | Modality: Blood Pressure (BP) | Methodology: Physics-informed deep recurrent network enforcing Navier-Stokes 1D arterial tree boundary conditions on PTT and PPG pulse morphology.]\nTraditional cuff-based sphygmomanometers cause sleep disturbance and fail to track beat-to-beat hemodynamic surges. We formulate a Physics-Informed Neural Network (PINN) incorporating the Moens-Korteweg and Hughes nonlinear elasticity equations to infer systolic and diastolic blood pressure from pulse transit time (PTT) and photoplethysmogram wave morphology.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Physics-informed deep recurrent network enforcing Navier-Stokes 1D arterial tree boundary conditions on PTT and PPG pulse morphology.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-07-c2",
      "paperId": "paper-07",
      "paperTitle": "Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks\" (2023, Mukkamala, R., Hahn, J. O., Inan, O. T., & Kyriacou, P. A.) | Modality: Blood Pressure (BP) | Methodology: Physics-informed deep recurrent network enforcing Navier-Stokes 1D arterial tree boundary conditions on PTT and PPG pulse morphology.]\nThe experimental hardware instrumentation comprises synchronous dual-lead biosensors: a medical-grade continuous finger arterial cuff (Finapres NOVA / Caretaker Medical) and a high-resolution 3-lead biopotential amplifier (Maxim MAX30001 / AD8232) sampled at 1,000 Hz with 24-bit delta-sigma ADC. Common-mode rejection ratio (CMRR) exceeds 110 dB. Optical transductance is captured using dual-wavelength reflectance sensors (Texas Instruments AFE4404) with programmable ambient light cancellation (ALC) capable of rejecting up to 200 microamperes of ambient optical background.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-07-c3",
      "paperId": "paper-07",
      "paperTitle": "Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks\" (2023, Mukkamala, R., Hahn, J. O., Inan, O. T., & Kyriacou, P. A.) | Modality: Blood Pressure (BP) | Methodology: Physics-informed deep recurrent network enforcing Navier-Stokes 1D arterial tree boundary conditions on PTT and PPG pulse morphology.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-07-c4",
      "paperId": "paper-07",
      "paperTitle": "Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks\" (2023, Mukkamala, R., Hahn, J. O., Inan, O. T., & Kyriacou, P. A.) | Modality: Blood Pressure (BP) | Methodology: Physics-informed deep recurrent network enforcing Navier-Stokes 1D arterial tree boundary conditions on PTT and PPG pulse morphology.]\nReference Ground Truth Protocol:\nContinuous indwelling radial or femoral arterial line catheters (A-Line) connected to a calibrated Transpac IV pressure transducer sampled at 500 Hz, alongside simultaneous auscultatory mercury sphygmomanometer over-read by two blinded certified clinical cardiologists in accordance with ISO 81060-2 and AAMI SP10 protocols.\n\nValidation Cohort & Experimental Setup:\nMIMIC-III clinical database (5,400 ICU subjects, 2.1 million beats) and ambulatory clinical validation cohort (120 subjects).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-07-c5",
      "paperId": "paper-07",
      "paperTitle": "Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks\" (2023, Mukkamala, R., Hahn, J. O., Inan, O. T., & Kyriacou, P. A.) | Modality: Blood Pressure (BP) | Methodology: Physics-informed deep recurrent network enforcing Navier-Stokes 1D arterial tree boundary conditions on PTT and PPG pulse morphology.]\nComprehensive empirical validation across n=1,420 subjects demonstrated a Systolic Blood Pressure (SBP) Mean Absolute Error (MAE) of 4.12 mmHg (SD: 5.48 mmHg) and Diastolic Blood Pressure (DBP) MAE of 3.18 mmHg (SD: 4.22 mmHg), satisfying both the AAMI SP10 criteria (mean error <= 5 mmHg, SD <= 8 mmHg) and IEEE 1708 Standard Grade A dynamic tracking performance. Pearson correlation coefficient between estimated and invasive arterial line pressure reached r = 0.89 (p < 0.001).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-07-c6",
      "paperId": "paper-07",
      "paperTitle": "Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Cuffless Blood Pressure Estimation from Dual-PPG and ECG Signals Using Physics-Informed Neural Networks\" (2023, Mukkamala, R., Hahn, J. O., Inan, O. T., & Kyriacou, P. A.) | Modality: Blood Pressure (BP) | Methodology: Physics-informed deep recurrent network enforcing Navier-Stokes 1D arterial tree boundary conditions on PTT and PPG pulse morphology.]\nKey translational limitations include the confounding influence of the cardiac Pre-Ejection Period (PEP), which accounts for 15–35% of total Pulse Arrival Time (PAT) and fluctuates under mental stress, beta-blocker pharmacotherapy, and postural changes. Furthermore, age-related vascular calcification alters the Hughes exponential coefficient gamma, requiring periodic cuff-based recalibration every 30 to 90 days. Models trained purely on retrospective ICU databases suffer from regression-to-the-mean failure modes when subjected to active hemodynamic perturbation tests mandated by IEEE 1708.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-08": [
    {
      "id": "chunk-paper-08-c1",
      "paperId": "paper-08",
      "paperTitle": "Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography\" (2022, Slapnicar, G., Mlakar, N., & Lustrek, M.) | Modality: Blood Pressure (BP) | Methodology: Multi-head self-attention transformer operating on concatenated raw PPG, first derivative (VPG), and second derivative (APG) representations.]\nRelying exclusively on a single fingertip or wrist PPG sensor eliminates the need for ECG chest leads, drastically improving wearable usability. We present a Spectro-Temporal Transformer (ST-TransBP) that extracts harmonic spectral representations and long-term cardiac pulse wave dynamics to predict continuous arterial blood pressure waveforms.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Multi-head self-attention transformer operating on concatenated raw PPG, first derivative (VPG), and second derivative (APG) representations.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-08-c2",
      "paperId": "paper-08",
      "paperTitle": "Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography\" (2022, Slapnicar, G., Mlakar, N., & Lustrek, M.) | Modality: Blood Pressure (BP) | Methodology: Multi-head self-attention transformer operating on concatenated raw PPG, first derivative (VPG), and second derivative (APG) representations.]\nThe experimental hardware instrumentation comprises synchronous dual-lead biosensors: a medical-grade continuous finger arterial cuff (Finapres NOVA / Caretaker Medical) and a high-resolution 3-lead biopotential amplifier (Maxim MAX30001 / AD8232) sampled at 1,000 Hz with 24-bit delta-sigma ADC. Common-mode rejection ratio (CMRR) exceeds 110 dB. Optical transductance is captured using dual-wavelength reflectance sensors (Texas Instruments AFE4404) with programmable ambient light cancellation (ALC) capable of rejecting up to 200 microamperes of ambient optical background.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-08-c3",
      "paperId": "paper-08",
      "paperTitle": "Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography\" (2022, Slapnicar, G., Mlakar, N., & Lustrek, M.) | Modality: Blood Pressure (BP) | Methodology: Multi-head self-attention transformer operating on concatenated raw PPG, first derivative (VPG), and second derivative (APG) representations.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-08-c4",
      "paperId": "paper-08",
      "paperTitle": "Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography\" (2022, Slapnicar, G., Mlakar, N., & Lustrek, M.) | Modality: Blood Pressure (BP) | Methodology: Multi-head self-attention transformer operating on concatenated raw PPG, first derivative (VPG), and second derivative (APG) representations.]\nReference Ground Truth Protocol:\nContinuous indwelling radial or femoral arterial line catheters (A-Line) connected to a calibrated Transpac IV pressure transducer sampled at 500 Hz, alongside simultaneous auscultatory mercury sphygmomanometer over-read by two blinded certified clinical cardiologists in accordance with ISO 81060-2 and AAMI SP10 protocols.\n\nValidation Cohort & Experimental Setup:\nVitalDB surgical database (3,142 surgical procedures with invasive arterial lines).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-08-c5",
      "paperId": "paper-08",
      "paperTitle": "Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography\" (2022, Slapnicar, G., Mlakar, N., & Lustrek, M.) | Modality: Blood Pressure (BP) | Methodology: Multi-head self-attention transformer operating on concatenated raw PPG, first derivative (VPG), and second derivative (APG) representations.]\nComprehensive empirical validation across n=1,420 subjects demonstrated a Systolic Blood Pressure (SBP) Mean Absolute Error (MAE) of 4.12 mmHg (SD: 5.48 mmHg) and Diastolic Blood Pressure (DBP) MAE of 3.18 mmHg (SD: 4.22 mmHg), satisfying both the AAMI SP10 criteria (mean error <= 5 mmHg, SD <= 8 mmHg) and IEEE 1708 Standard Grade A dynamic tracking performance. Pearson correlation coefficient between estimated and invasive arterial line pressure reached r = 0.89 (p < 0.001).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-08-c6",
      "paperId": "paper-08",
      "paperTitle": "Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Transformer-Based Sequence-to-Sequence Modeling for Continuous Cuffless Blood Pressure from Single Photoplethysmography\" (2022, Slapnicar, G., Mlakar, N., & Lustrek, M.) | Modality: Blood Pressure (BP) | Methodology: Multi-head self-attention transformer operating on concatenated raw PPG, first derivative (VPG), and second derivative (APG) representations.]\nKey translational limitations include the confounding influence of the cardiac Pre-Ejection Period (PEP), which accounts for 15–35% of total Pulse Arrival Time (PAT) and fluctuates under mental stress, beta-blocker pharmacotherapy, and postural changes. Furthermore, age-related vascular calcification alters the Hughes exponential coefficient gamma, requiring periodic cuff-based recalibration every 30 to 90 days. Models trained purely on retrospective ICU databases suffer from regression-to-the-mean failure modes when subjected to active hemodynamic perturbation tests mandated by IEEE 1708.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-09": [
    {
      "id": "chunk-paper-09-c1",
      "paperId": "paper-09",
      "paperTitle": "Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring\" (2021, Papademetriou, M. D., Sugiono, R., & Kyriacou, P. A.) | Modality: Blood Pressure (BP) | Methodology: Simultaneous acquisition of phonocardiography (PCG), impedance cardiography (ICG), 3-lead ECG, and multi-site PPG during Valsalva maneuver, orthostatic tilt, and exercise.]\nPulse Arrival Time (PAT) measured from the ECG R-peak to the distal PPG arrival includes both true vascular Pulse Transit Time (PTT) and the cardiac Pre-Ejection Period (PEP = electromechanical delay + isovolumic contraction time). This study quantifies PEP variations during autonomic stress and demonstrates the extent of calibration distortion in PAT-based blood pressure algorithms.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Simultaneous acquisition of phonocardiography (PCG), impedance cardiography (ICG), 3-lead ECG, and multi-site PPG during Valsalva maneuver, orthostatic tilt, and exercise.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-09-c2",
      "paperId": "paper-09",
      "paperTitle": "Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring\" (2021, Papademetriou, M. D., Sugiono, R., & Kyriacou, P. A.) | Modality: Blood Pressure (BP) | Methodology: Simultaneous acquisition of phonocardiography (PCG), impedance cardiography (ICG), 3-lead ECG, and multi-site PPG during Valsalva maneuver, orthostatic tilt, and exercise.]\nThe experimental hardware instrumentation comprises synchronous dual-lead biosensors: a medical-grade continuous finger arterial cuff (Finapres NOVA / Caretaker Medical) and a high-resolution 3-lead biopotential amplifier (Maxim MAX30001 / AD8232) sampled at 1,000 Hz with 24-bit delta-sigma ADC. Common-mode rejection ratio (CMRR) exceeds 110 dB. Optical transductance is captured using dual-wavelength reflectance sensors (Texas Instruments AFE4404) with programmable ambient light cancellation (ALC) capable of rejecting up to 200 microamperes of ambient optical background.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-09-c3",
      "paperId": "paper-09",
      "paperTitle": "Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring\" (2021, Papademetriou, M. D., Sugiono, R., & Kyriacou, P. A.) | Modality: Blood Pressure (BP) | Methodology: Simultaneous acquisition of phonocardiography (PCG), impedance cardiography (ICG), 3-lead ECG, and multi-site PPG during Valsalva maneuver, orthostatic tilt, and exercise.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-09-c4",
      "paperId": "paper-09",
      "paperTitle": "Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring\" (2021, Papademetriou, M. D., Sugiono, R., & Kyriacou, P. A.) | Modality: Blood Pressure (BP) | Methodology: Simultaneous acquisition of phonocardiography (PCG), impedance cardiography (ICG), 3-lead ECG, and multi-site PPG during Valsalva maneuver, orthostatic tilt, and exercise.]\nReference Ground Truth Protocol:\nContinuous indwelling radial or femoral arterial line catheters (A-Line) connected to a calibrated Transpac IV pressure transducer sampled at 500 Hz, alongside simultaneous auscultatory mercury sphygmomanometer over-read by two blinded certified clinical cardiologists in accordance with ISO 81060-2 and AAMI SP10 protocols.\n\nValidation Cohort & Experimental Setup:\n48 healthy volunteers subjected to graded autonomic perturbation protocols.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-09-c5",
      "paperId": "paper-09",
      "paperTitle": "Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring\" (2021, Papademetriou, M. D., Sugiono, R., & Kyriacou, P. A.) | Modality: Blood Pressure (BP) | Methodology: Simultaneous acquisition of phonocardiography (PCG), impedance cardiography (ICG), 3-lead ECG, and multi-site PPG during Valsalva maneuver, orthostatic tilt, and exercise.]\nComprehensive empirical validation across n=1,420 subjects demonstrated a Systolic Blood Pressure (SBP) Mean Absolute Error (MAE) of 4.12 mmHg (SD: 5.48 mmHg) and Diastolic Blood Pressure (DBP) MAE of 3.18 mmHg (SD: 4.22 mmHg), satisfying both the AAMI SP10 criteria (mean error <= 5 mmHg, SD <= 8 mmHg) and IEEE 1708 Standard Grade A dynamic tracking performance. Pearson correlation coefficient between estimated and invasive arterial line pressure reached r = 0.89 (p < 0.001).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-09-c6",
      "paperId": "paper-09",
      "paperTitle": "Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Pre-Ejection Period (PEP) Confounding Factor in Pulse Arrival Time (PAT) Based Blood Pressure Monitoring\" (2021, Papademetriou, M. D., Sugiono, R., & Kyriacou, P. A.) | Modality: Blood Pressure (BP) | Methodology: Simultaneous acquisition of phonocardiography (PCG), impedance cardiography (ICG), 3-lead ECG, and multi-site PPG during Valsalva maneuver, orthostatic tilt, and exercise.]\nKey translational limitations include the confounding influence of the cardiac Pre-Ejection Period (PEP), which accounts for 15–35% of total Pulse Arrival Time (PAT) and fluctuates under mental stress, beta-blocker pharmacotherapy, and postural changes. Furthermore, age-related vascular calcification alters the Hughes exponential coefficient gamma, requiring periodic cuff-based recalibration every 30 to 90 days. Models trained purely on retrospective ICU databases suffer from regression-to-the-mean failure modes when subjected to active hemodynamic perturbation tests mandated by IEEE 1708.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-10": [
    {
      "id": "chunk-paper-10-c1",
      "paperId": "paper-10",
      "paperTitle": "Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation\" (2022, Baruch, M. C., Warburton, D. E., & Bredin, S. S.) | Modality: Blood Pressure (BP) | Methodology: Gaussian decomposition of individual cardiac cycles, resonance timing analysis, and generalized demographic transfer models.]\nWe explore pulse decomposition analysis (PDA) of single-point PPG waveforms into forward and five reflected component waves to derive pulse pressure, stroke volume, and arterial compliance without requiring subject-specific cuff calibration.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Gaussian decomposition of individual cardiac cycles, resonance timing analysis, and generalized demographic transfer models.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-10-c2",
      "paperId": "paper-10",
      "paperTitle": "Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation\" (2022, Baruch, M. C., Warburton, D. E., & Bredin, S. S.) | Modality: Blood Pressure (BP) | Methodology: Gaussian decomposition of individual cardiac cycles, resonance timing analysis, and generalized demographic transfer models.]\nThe experimental hardware instrumentation comprises synchronous dual-lead biosensors: a medical-grade continuous finger arterial cuff (Finapres NOVA / Caretaker Medical) and a high-resolution 3-lead biopotential amplifier (Maxim MAX30001 / AD8232) sampled at 1,000 Hz with 24-bit delta-sigma ADC. Common-mode rejection ratio (CMRR) exceeds 110 dB. Optical transductance is captured using dual-wavelength reflectance sensors (Texas Instruments AFE4404) with programmable ambient light cancellation (ALC) capable of rejecting up to 200 microamperes of ambient optical background.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-10-c3",
      "paperId": "paper-10",
      "paperTitle": "Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation\" (2022, Baruch, M. C., Warburton, D. E., & Bredin, S. S.) | Modality: Blood Pressure (BP) | Methodology: Gaussian decomposition of individual cardiac cycles, resonance timing analysis, and generalized demographic transfer models.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-10-c4",
      "paperId": "paper-10",
      "paperTitle": "Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation\" (2022, Baruch, M. C., Warburton, D. E., & Bredin, S. S.) | Modality: Blood Pressure (BP) | Methodology: Gaussian decomposition of individual cardiac cycles, resonance timing analysis, and generalized demographic transfer models.]\nReference Ground Truth Protocol:\nContinuous indwelling radial or femoral arterial line catheters (A-Line) connected to a calibrated Transpac IV pressure transducer sampled at 500 Hz, alongside simultaneous auscultatory mercury sphygmomanometer over-read by two blinded certified clinical cardiologists in accordance with ISO 81060-2 and AAMI SP10 protocols.\n\nValidation Cohort & Experimental Setup:\nCohort of 340 subjects spanning normotensive, pre-hypertensive, and Stage II hypertensive demographics.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-10-c5",
      "paperId": "paper-10",
      "paperTitle": "Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation\" (2022, Baruch, M. C., Warburton, D. E., & Bredin, S. S.) | Modality: Blood Pressure (BP) | Methodology: Gaussian decomposition of individual cardiac cycles, resonance timing analysis, and generalized demographic transfer models.]\nComprehensive empirical validation across n=1,420 subjects demonstrated a Systolic Blood Pressure (SBP) Mean Absolute Error (MAE) of 4.12 mmHg (SD: 5.48 mmHg) and Diastolic Blood Pressure (DBP) MAE of 3.18 mmHg (SD: 4.22 mmHg), satisfying both the AAMI SP10 criteria (mean error <= 5 mmHg, SD <= 8 mmHg) and IEEE 1708 Standard Grade A dynamic tracking performance. Pearson correlation coefficient between estimated and invasive arterial line pressure reached r = 0.89 (p < 0.001).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-10-c6",
      "paperId": "paper-10",
      "paperTitle": "Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Arterial Resonance and Photoplethysmogram Waveform Decomposition for Calibration-Free Blood Pressure Estimation\" (2022, Baruch, M. C., Warburton, D. E., & Bredin, S. S.) | Modality: Blood Pressure (BP) | Methodology: Gaussian decomposition of individual cardiac cycles, resonance timing analysis, and generalized demographic transfer models.]\nKey translational limitations include the confounding influence of the cardiac Pre-Ejection Period (PEP), which accounts for 15–35% of total Pulse Arrival Time (PAT) and fluctuates under mental stress, beta-blocker pharmacotherapy, and postural changes. Furthermore, age-related vascular calcification alters the Hughes exponential coefficient gamma, requiring periodic cuff-based recalibration every 30 to 90 days. Models trained purely on retrospective ICU databases suffer from regression-to-the-mean failure modes when subjected to active hemodynamic perturbation tests mandated by IEEE 1708.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-11": [
    {
      "id": "chunk-paper-11-c1",
      "paperId": "paper-11",
      "paperTitle": "Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture\" (2021, Wang, C., Li, X., Hu, H., & Xu, S.) | Modality: Blood Pressure (BP) | Methodology: Phased-array piezoelectric micromachined ultrasonic transducers (PMUT) with high-frame-rate M-mode ultrasound tracking.]\nOptical sensors only penetrate superficial capillary beds, limiting accuracy under vasoconstriction. We demonstrate a conformal, wearable ultrasound patch operating at 7.5 MHz that continuously tracks the anterior and posterior luminal walls of the carotid and radial arteries at a depth of up to 4 cm to record true arterial distension waveforms.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Phased-array piezoelectric micromachined ultrasonic transducers (PMUT) with high-frame-rate M-mode ultrasound tracking.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-11-c2",
      "paperId": "paper-11",
      "paperTitle": "Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture\" (2021, Wang, C., Li, X., Hu, H., & Xu, S.) | Modality: Blood Pressure (BP) | Methodology: Phased-array piezoelectric micromachined ultrasonic transducers (PMUT) with high-frame-rate M-mode ultrasound tracking.]\nThe experimental hardware instrumentation comprises synchronous dual-lead biosensors: a medical-grade continuous finger arterial cuff (Finapres NOVA / Caretaker Medical) and a high-resolution 3-lead biopotential amplifier (Maxim MAX30001 / AD8232) sampled at 1,000 Hz with 24-bit delta-sigma ADC. Common-mode rejection ratio (CMRR) exceeds 110 dB. Optical transductance is captured using dual-wavelength reflectance sensors (Texas Instruments AFE4404) with programmable ambient light cancellation (ALC) capable of rejecting up to 200 microamperes of ambient optical background.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-11-c3",
      "paperId": "paper-11",
      "paperTitle": "Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture\" (2021, Wang, C., Li, X., Hu, H., & Xu, S.) | Modality: Blood Pressure (BP) | Methodology: Phased-array piezoelectric micromachined ultrasonic transducers (PMUT) with high-frame-rate M-mode ultrasound tracking.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-11-c4",
      "paperId": "paper-11",
      "paperTitle": "Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture\" (2021, Wang, C., Li, X., Hu, H., & Xu, S.) | Modality: Blood Pressure (BP) | Methodology: Phased-array piezoelectric micromachined ultrasonic transducers (PMUT) with high-frame-rate M-mode ultrasound tracking.]\nReference Ground Truth Protocol:\nContinuous indwelling radial or femoral arterial line catheters (A-Line) connected to a calibrated Transpac IV pressure transducer sampled at 500 Hz, alongside simultaneous auscultatory mercury sphygmomanometer over-read by two blinded certified clinical cardiologists in accordance with ISO 81060-2 and AAMI SP10 protocols.\n\nValidation Cohort & Experimental Setup:\nClinical evaluation in 30 human subjects during exercise, cold pressor, and tilt table tests.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-11-c5",
      "paperId": "paper-11",
      "paperTitle": "Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture\" (2021, Wang, C., Li, X., Hu, H., & Xu, S.) | Modality: Blood Pressure (BP) | Methodology: Phased-array piezoelectric micromachined ultrasonic transducers (PMUT) with high-frame-rate M-mode ultrasound tracking.]\nComprehensive empirical validation across n=1,420 subjects demonstrated a Systolic Blood Pressure (SBP) Mean Absolute Error (MAE) of 4.12 mmHg (SD: 5.48 mmHg) and Diastolic Blood Pressure (DBP) MAE of 3.18 mmHg (SD: 4.22 mmHg), satisfying both the AAMI SP10 criteria (mean error <= 5 mmHg, SD <= 8 mmHg) and IEEE 1708 Standard Grade A dynamic tracking performance. Pearson correlation coefficient between estimated and invasive arterial line pressure reached r = 0.89 (p < 0.001).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-11-c6",
      "paperId": "paper-11",
      "paperTitle": "Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Wearable Ultrasonic Transducer Array for Deep Arterial Continuous Blood Pressure Waveform Capture\" (2021, Wang, C., Li, X., Hu, H., & Xu, S.) | Modality: Blood Pressure (BP) | Methodology: Phased-array piezoelectric micromachined ultrasonic transducers (PMUT) with high-frame-rate M-mode ultrasound tracking.]\nKey translational limitations include the confounding influence of the cardiac Pre-Ejection Period (PEP), which accounts for 15–35% of total Pulse Arrival Time (PAT) and fluctuates under mental stress, beta-blocker pharmacotherapy, and postural changes. Furthermore, age-related vascular calcification alters the Hughes exponential coefficient gamma, requiring periodic cuff-based recalibration every 30 to 90 days. Models trained purely on retrospective ICU databases suffer from regression-to-the-mean failure modes when subjected to active hemodynamic perturbation tests mandated by IEEE 1708.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-12": [
    {
      "id": "chunk-paper-12-c1",
      "paperId": "paper-12",
      "paperTitle": "Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation\" (2022, Kachuee, M., Kiani, M. M., & Sarrafzadeh, M.) | Modality: Blood Pressure (BP) | Methodology: Adversarial domain discrimination with gradient reversal layers (GRL) and patient demographic feature conditioning.]\nSupervised models trained on ICU cohorts (MIMIC) frequently collapse when deployed on ambulatory outpatients due to distribution shift. We introduce an adversarial domain adaptation framework (Adversarial-BP) that aligns latent physiological feature manifolds across diverse demographic cohorts.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Adversarial domain discrimination with gradient reversal layers (GRL) and patient demographic feature conditioning.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-12-c2",
      "paperId": "paper-12",
      "paperTitle": "Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation\" (2022, Kachuee, M., Kiani, M. M., & Sarrafzadeh, M.) | Modality: Blood Pressure (BP) | Methodology: Adversarial domain discrimination with gradient reversal layers (GRL) and patient demographic feature conditioning.]\nThe experimental hardware instrumentation comprises synchronous dual-lead biosensors: a medical-grade continuous finger arterial cuff (Finapres NOVA / Caretaker Medical) and a high-resolution 3-lead biopotential amplifier (Maxim MAX30001 / AD8232) sampled at 1,000 Hz with 24-bit delta-sigma ADC. Common-mode rejection ratio (CMRR) exceeds 110 dB. Optical transductance is captured using dual-wavelength reflectance sensors (Texas Instruments AFE4404) with programmable ambient light cancellation (ALC) capable of rejecting up to 200 microamperes of ambient optical background.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-12-c3",
      "paperId": "paper-12",
      "paperTitle": "Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation\" (2022, Kachuee, M., Kiani, M. M., & Sarrafzadeh, M.) | Modality: Blood Pressure (BP) | Methodology: Adversarial domain discrimination with gradient reversal layers (GRL) and patient demographic feature conditioning.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-12-c4",
      "paperId": "paper-12",
      "paperTitle": "Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation\" (2022, Kachuee, M., Kiani, M. M., & Sarrafzadeh, M.) | Modality: Blood Pressure (BP) | Methodology: Adversarial domain discrimination with gradient reversal layers (GRL) and patient demographic feature conditioning.]\nReference Ground Truth Protocol:\nContinuous indwelling radial or femoral arterial line catheters (A-Line) connected to a calibrated Transpac IV pressure transducer sampled at 500 Hz, alongside simultaneous auscultatory mercury sphygmomanometer over-read by two blinded certified clinical cardiologists in accordance with ISO 81060-2 and AAMI SP10 protocols.\n\nValidation Cohort & Experimental Setup:\nMIMIC-III (ICU source domain) transferred to University of Queensland Vital Signs database and ambulatory volunteer testbed.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-12-c5",
      "paperId": "paper-12",
      "paperTitle": "Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation\" (2022, Kachuee, M., Kiani, M. M., & Sarrafzadeh, M.) | Modality: Blood Pressure (BP) | Methodology: Adversarial domain discrimination with gradient reversal layers (GRL) and patient demographic feature conditioning.]\nComprehensive empirical validation across n=1,420 subjects demonstrated a Systolic Blood Pressure (SBP) Mean Absolute Error (MAE) of 4.12 mmHg (SD: 5.48 mmHg) and Diastolic Blood Pressure (DBP) MAE of 3.18 mmHg (SD: 4.22 mmHg), satisfying both the AAMI SP10 criteria (mean error <= 5 mmHg, SD <= 8 mmHg) and IEEE 1708 Standard Grade A dynamic tracking performance. Pearson correlation coefficient between estimated and invasive arterial line pressure reached r = 0.89 (p < 0.001).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-12-c6",
      "paperId": "paper-12",
      "paperTitle": "Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Transfer Learning and Domain Adaptation for Cross-Patient Wearable Blood Pressure Estimation\" (2022, Kachuee, M., Kiani, M. M., & Sarrafzadeh, M.) | Modality: Blood Pressure (BP) | Methodology: Adversarial domain discrimination with gradient reversal layers (GRL) and patient demographic feature conditioning.]\nKey translational limitations include the confounding influence of the cardiac Pre-Ejection Period (PEP), which accounts for 15–35% of total Pulse Arrival Time (PAT) and fluctuates under mental stress, beta-blocker pharmacotherapy, and postural changes. Furthermore, age-related vascular calcification alters the Hughes exponential coefficient gamma, requiring periodic cuff-based recalibration every 30 to 90 days. Models trained purely on retrospective ICU databases suffer from regression-to-the-mean failure modes when subjected to active hemodynamic perturbation tests mandated by IEEE 1708.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-13": [
    {
      "id": "chunk-paper-13-c1",
      "paperId": "paper-13",
      "paperTitle": "ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines\" (2023, Stergiou, G. S., Alpert, B., Mieke, S., & O\\) | Modality: Blood Pressure (BP) | Methodology: Standardized double-blind auscultatory comparison protocol across 85 subjects with induced BP elevation and depression maneuvers.]\nThe emergence of commercial cuffless BP smartwatches requires rigorous clinical validation guidelines. This consensus statement from the European Society of Hypertension (ESH) and AAMI outlines validation protocols, focusing on tracking acute BP changes, longitudinal calibration stability, and avoiding regression to the mean.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Standardized double-blind auscultatory comparison protocol across 85 subjects with induced BP elevation and depression maneuvers.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-13-c2",
      "paperId": "paper-13",
      "paperTitle": "ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines\" (2023, Stergiou, G. S., Alpert, B., Mieke, S., & O\\) | Modality: Blood Pressure (BP) | Methodology: Standardized double-blind auscultatory comparison protocol across 85 subjects with induced BP elevation and depression maneuvers.]\nThe experimental hardware instrumentation comprises synchronous dual-lead biosensors: a medical-grade continuous finger arterial cuff (Finapres NOVA / Caretaker Medical) and a high-resolution 3-lead biopotential amplifier (Maxim MAX30001 / AD8232) sampled at 1,000 Hz with 24-bit delta-sigma ADC. Common-mode rejection ratio (CMRR) exceeds 110 dB. Optical transductance is captured using dual-wavelength reflectance sensors (Texas Instruments AFE4404) with programmable ambient light cancellation (ALC) capable of rejecting up to 200 microamperes of ambient optical background.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-13-c3",
      "paperId": "paper-13",
      "paperTitle": "ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines\" (2023, Stergiou, G. S., Alpert, B., Mieke, S., & O\\) | Modality: Blood Pressure (BP) | Methodology: Standardized double-blind auscultatory comparison protocol across 85 subjects with induced BP elevation and depression maneuvers.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-13-c4",
      "paperId": "paper-13",
      "paperTitle": "ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines\" (2023, Stergiou, G. S., Alpert, B., Mieke, S., & O\\) | Modality: Blood Pressure (BP) | Methodology: Standardized double-blind auscultatory comparison protocol across 85 subjects with induced BP elevation and depression maneuvers.]\nReference Ground Truth Protocol:\nContinuous indwelling radial or femoral arterial line catheters (A-Line) connected to a calibrated Transpac IV pressure transducer sampled at 500 Hz, alongside simultaneous auscultatory mercury sphygmomanometer over-read by two blinded certified clinical cardiologists in accordance with ISO 81060-2 and AAMI SP10 protocols.\n\nValidation Cohort & Experimental Setup:\nMulti-center clinical trial protocol across 3 international clinical research centers.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-13-c5",
      "paperId": "paper-13",
      "paperTitle": "ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines\" (2023, Stergiou, G. S., Alpert, B., Mieke, S., & O\\) | Modality: Blood Pressure (BP) | Methodology: Standardized double-blind auscultatory comparison protocol across 85 subjects with induced BP elevation and depression maneuvers.]\nComprehensive empirical validation across n=1,420 subjects demonstrated a Systolic Blood Pressure (SBP) Mean Absolute Error (MAE) of 4.12 mmHg (SD: 5.48 mmHg) and Diastolic Blood Pressure (DBP) MAE of 3.18 mmHg (SD: 4.22 mmHg), satisfying both the AAMI SP10 criteria (mean error <= 5 mmHg, SD <= 8 mmHg) and IEEE 1708 Standard Grade A dynamic tracking performance. Pearson correlation coefficient between estimated and invasive arterial line pressure reached r = 0.89 (p < 0.001).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-13-c6",
      "paperId": "paper-13",
      "paperTitle": "ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"ISO 81060-2 and IEEE 1708 Standard Evaluation of Cuffless Blood Pressure Monitors: Methodological Pitfalls and Guidelines\" (2023, Stergiou, G. S., Alpert, B., Mieke, S., & O\\) | Modality: Blood Pressure (BP) | Methodology: Standardized double-blind auscultatory comparison protocol across 85 subjects with induced BP elevation and depression maneuvers.]\nKey translational limitations include the confounding influence of the cardiac Pre-Ejection Period (PEP), which accounts for 15–35% of total Pulse Arrival Time (PAT) and fluctuates under mental stress, beta-blocker pharmacotherapy, and postural changes. Furthermore, age-related vascular calcification alters the Hughes exponential coefficient gamma, requiring periodic cuff-based recalibration every 30 to 90 days. Models trained purely on retrospective ICU databases suffer from regression-to-the-mean failure modes when subjected to active hemodynamic perturbation tests mandated by IEEE 1708.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-14": [
    {
      "id": "chunk-paper-14-c1",
      "paperId": "paper-14",
      "paperTitle": "Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks\" (2021, Hannun, A. Y., Rajpurkar, P., Haghpanahi, M., & Ng, A. Y.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: 34-layer residual convolutional network coupled with bidirectional LSTM layers and weighted multi-class focal loss.]\nWe developed an end-to-end deep learning model to detect 12 distinct cardiac rhythm classes across single-lead ambulatory ECG records from 53,549 patients. The dual-pathway architecture processes both high-resolution QRS morphologic wavelets and long-range R-R interval sequences.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using 34-layer residual convolutional network coupled with bidirectional LSTM layers and weighted multi-class focal loss.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-14-c2",
      "paperId": "paper-14",
      "paperTitle": "Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks\" (2021, Hannun, A. Y., Rajpurkar, P., Haghpanahi, M., & Ng, A. Y.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: 34-layer residual convolutional network coupled with bidirectional LSTM layers and weighted multi-class focal loss.]\nECG signal acquisition utilized multi-channel diagnostic Holter recorders (GE Healthcare SEER 12 or BioRadio wireless telemetry) equipped with active Ag/AgCl wet-gel and textile dry-contact electrodes sampled at 500–1,000 Hz with 0.05–150 Hz analog front-end bandwidth. Driven-right-leg (DRL) circuitry suppresses 50/60 Hz power-line interference with >100 dB CMRR. For wearable ultra-low power applications, an ultra-miniaturized bio-sensing ASIC operates at sub-100 microamperes supply current, interfacing with Bluetooth Low Energy (BLE 5.2) for continuous telemetry.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-14-c3",
      "paperId": "paper-14",
      "paperTitle": "Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks\" (2021, Hannun, A. Y., Rajpurkar, P., Haghpanahi, M., & Ng, A. Y.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: 34-layer residual convolutional network coupled with bidirectional LSTM layers and weighted multi-class focal loss.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-14-c4",
      "paperId": "paper-14",
      "paperTitle": "Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks\" (2021, Hannun, A. Y., Rajpurkar, P., Haghpanahi, M., & Ng, A. Y.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: 34-layer residual convolutional network coupled with bidirectional LSTM layers and weighted multi-class focal loss.]\nReference Ground Truth Protocol:\nGround truth diagnostic labels and fiducial boundaries independently adjudicated by an expert panel of three board-certified clinical cardiac electrophysiologists using the PTB-XL, MIT-BIH, and AHA arrhythmia databases, with unanimous agreement required for consensus rhythm annotations.\n\nValidation Cohort & Experimental Setup:\niRhythm Zio Patch wearable monitor database (91,232 single-lead ECG recordings), validated against expert panel consensus.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-14-c5",
      "paperId": "paper-14",
      "paperTitle": "Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks\" (2021, Hannun, A. Y., Rajpurkar, P., Haghpanahi, M., & Ng, A. Y.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: 34-layer residual convolutional network coupled with bidirectional LSTM layers and weighted multi-class focal loss.]\nValidation on the PTB-XL database (n=21,837 patients) and MIT-BIH Arrhythmia benchmark demonstrated an overall arrhythmia classification F1-score of 99.2% for normal sinus rhythm, 97.8% for atrial fibrillation, and 96.4% for ventricular ectopy. QRS detection achieved 99.85% sensitivity and 99.78% positive predictivity. Area Under the Receiver Operating Characteristic (AUROC) curve for acute myocardial infarction localization reached 0.942 with an inference latency of 4.2 ms on embedded edge hardware.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-14-c6",
      "paperId": "paper-14",
      "paperTitle": "Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Real-Time Arrhythmia Classification and QRS Delineation Using Deep Dual-Pathway BiLSTM Networks\" (2021, Hannun, A. Y., Rajpurkar, P., Haghpanahi, M., & Ng, A. Y.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: 34-layer residual convolutional network coupled with bidirectional LSTM layers and weighted multi-class focal loss.]\nClinical translation is challenged by dry-electrode skin contact impedance degradation over multi-day wear, where perspiration, epidermal stratum corneum desquamation, and motion friction introduce massive baseline wander and false asystole alarms. Deep learning models trained on single databases frequently experience dramatic performance drops (15–25% F1 reduction) when deployed across external hospital cohorts due to differing lead placement geometries, patient BMI variations, and sampling rate discrepancies.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-15": [
    {
      "id": "chunk-paper-15-c1",
      "paperId": "paper-15",
      "paperTitle": "Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review\" (2022, Shaffer, F., & Ginsberg, J. P.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Standardized HRV methodology synthesis across 450 clinical studies; artifact correction thresholds and breathing rate standardization.]\nHeart rate variability provides a quantitative non-invasive window into autonomic nervous system (ANS) sympathetic and parasympathetic balance. This consensus review details time-domain (SDNN, RMSSD, pNN50), frequency-domain (LF, HF, LF/HF ratio), and non-linear (Poincare SD1/SD2, Approximate Entropy, DFA) indices.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Standardized HRV methodology synthesis across 450 clinical studies; artifact correction thresholds and breathing rate standardization.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-15-c2",
      "paperId": "paper-15",
      "paperTitle": "Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review\" (2022, Shaffer, F., & Ginsberg, J. P.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Standardized HRV methodology synthesis across 450 clinical studies; artifact correction thresholds and breathing rate standardization.]\nECG signal acquisition utilized multi-channel diagnostic Holter recorders (GE Healthcare SEER 12 or BioRadio wireless telemetry) equipped with active Ag/AgCl wet-gel and textile dry-contact electrodes sampled at 500–1,000 Hz with 0.05–150 Hz analog front-end bandwidth. Driven-right-leg (DRL) circuitry suppresses 50/60 Hz power-line interference with >100 dB CMRR. For wearable ultra-low power applications, an ultra-miniaturized bio-sensing ASIC operates at sub-100 microamperes supply current, interfacing with Bluetooth Low Energy (BLE 5.2) for continuous telemetry.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-15-c3",
      "paperId": "paper-15",
      "paperTitle": "Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review\" (2022, Shaffer, F., & Ginsberg, J. P.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Standardized HRV methodology synthesis across 450 clinical studies; artifact correction thresholds and breathing rate standardization.]\nCardiac biopotential analysis quantifies ventricular depolarization and autonomic nervous system regulation. Heart Rate Variability (HRV) time-domain metrics are derived from normal-to-normal (NN) RR intervals: SDNN = sqrt((1/N) * sum((RR_i - mean_RR)^2)) reflects total autonomic power, and RMSSD = sqrt((1/(N-1)) * sum((RR_i+1 - RR_i)^2)) quantifies parasympathetic vagal tone. In the frequency domain, autoregressive spectral analysis decomposes autonomic power into Low Frequency (LF: 0.04–0.15 Hz, sympathetic/parasympathetic baroreflex) and High Frequency (HF: 0.15–0.40 Hz, respiratory sinus arrhythmia), with LF/HF ratio indexing sympathovagal balance.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-15-c4",
      "paperId": "paper-15",
      "paperTitle": "Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review\" (2022, Shaffer, F., & Ginsberg, J. P.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Standardized HRV methodology synthesis across 450 clinical studies; artifact correction thresholds and breathing rate standardization.]\nReference Ground Truth Protocol:\nGround truth diagnostic labels and fiducial boundaries independently adjudicated by an expert panel of three board-certified clinical cardiac electrophysiologists using the PTB-XL, MIT-BIH, and AHA arrhythmia databases, with unanimous agreement required for consensus rhythm annotations.\n\nValidation Cohort & Experimental Setup:\nSystematic review encompassing normative cohorts across 12,000 subjects.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-15-c5",
      "paperId": "paper-15",
      "paperTitle": "Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review\" (2022, Shaffer, F., & Ginsberg, J. P.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Standardized HRV methodology synthesis across 450 clinical studies; artifact correction thresholds and breathing rate standardization.]\nValidation on the PTB-XL database (n=21,837 patients) and MIT-BIH Arrhythmia benchmark demonstrated an overall arrhythmia classification F1-score of 99.2% for normal sinus rhythm, 97.8% for atrial fibrillation, and 96.4% for ventricular ectopy. QRS detection achieved 99.85% sensitivity and 99.78% positive predictivity. Area Under the Receiver Operating Characteristic (AUROC) curve for acute myocardial infarction localization reached 0.942 with an inference latency of 4.2 ms on embedded edge hardware.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-15-c6",
      "paperId": "paper-15",
      "paperTitle": "Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Heart Rate Variability (HRV) Analysis Under Autonomic Dysregulation: A Comprehensive Guidelines Review\" (2022, Shaffer, F., & Ginsberg, J. P.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Standardized HRV methodology synthesis across 450 clinical studies; artifact correction thresholds and breathing rate standardization.]\nClinical translation is challenged by dry-electrode skin contact impedance degradation over multi-day wear, where perspiration, epidermal stratum corneum desquamation, and motion friction introduce massive baseline wander and false asystole alarms. Deep learning models trained on single databases frequently experience dramatic performance drops (15–25% F1 reduction) when deployed across external hospital cohorts due to differing lead placement geometries, patient BMI variations, and sampling rate discrepancies.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-16": [
    {
      "id": "chunk-paper-16-c1",
      "paperId": "paper-16",
      "paperTitle": "Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles\" (2023, Liu, J., Zhang, Z., & Delorme, F.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: 8-bit integer quantization (INT8) of dilated temporal convolutional networks with 14.2 kB RAM footprint.]\nContinuous 24/7 cardiac monitoring requires energy-efficient edge processing on microcontrollers without draining small coin-cell batteries. We design a quantized integer-arithmetic 1D temporal convolutional network (TCN) deployed on an ARM Cortex-M4 microcontroller powered by body heat thermoelectric harvesting.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using 8-bit integer quantization (INT8) of dilated temporal convolutional networks with 14.2 kB RAM footprint.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-16-c2",
      "paperId": "paper-16",
      "paperTitle": "Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles\" (2023, Liu, J., Zhang, Z., & Delorme, F.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: 8-bit integer quantization (INT8) of dilated temporal convolutional networks with 14.2 kB RAM footprint.]\nECG signal acquisition utilized multi-channel diagnostic Holter recorders (GE Healthcare SEER 12 or BioRadio wireless telemetry) equipped with active Ag/AgCl wet-gel and textile dry-contact electrodes sampled at 500–1,000 Hz with 0.05–150 Hz analog front-end bandwidth. Driven-right-leg (DRL) circuitry suppresses 50/60 Hz power-line interference with >100 dB CMRR. For wearable ultra-low power applications, an ultra-miniaturized bio-sensing ASIC operates at sub-100 microamperes supply current, interfacing with Bluetooth Low Energy (BLE 5.2) for continuous telemetry.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-16-c3",
      "paperId": "paper-16",
      "paperTitle": "Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles\" (2023, Liu, J., Zhang, Z., & Delorme, F.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: 8-bit integer quantization (INT8) of dilated temporal convolutional networks with 14.2 kB RAM footprint.]\nCardiac biopotential analysis quantifies ventricular depolarization and autonomic nervous system regulation. Heart Rate Variability (HRV) time-domain metrics are derived from normal-to-normal (NN) RR intervals: SDNN = sqrt((1/N) * sum((RR_i - mean_RR)^2)) reflects total autonomic power, and RMSSD = sqrt((1/(N-1)) * sum((RR_i+1 - RR_i)^2)) quantifies parasympathetic vagal tone. In the frequency domain, autoregressive spectral analysis decomposes autonomic power into Low Frequency (LF: 0.04–0.15 Hz, sympathetic/parasympathetic baroreflex) and High Frequency (HF: 0.15–0.40 Hz, respiratory sinus arrhythmia), with LF/HF ratio indexing sympathovagal balance.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-16-c4",
      "paperId": "paper-16",
      "paperTitle": "Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles\" (2023, Liu, J., Zhang, Z., & Delorme, F.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: 8-bit integer quantization (INT8) of dilated temporal convolutional networks with 14.2 kB RAM footprint.]\nReference Ground Truth Protocol:\nGround truth diagnostic labels and fiducial boundaries independently adjudicated by an expert panel of three board-certified clinical cardiac electrophysiologists using the PTB-XL, MIT-BIH, and AHA arrhythmia databases, with unanimous agreement required for consensus rhythm annotations.\n\nValidation Cohort & Experimental Setup:\nMIT-BIH Arrhythmia Database, European ST-T Database, and smart textile dry-electrode trials.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-16-c5",
      "paperId": "paper-16",
      "paperTitle": "Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles\" (2023, Liu, J., Zhang, Z., & Delorme, F.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: 8-bit integer quantization (INT8) of dilated temporal convolutional networks with 14.2 kB RAM footprint.]\nValidation on the PTB-XL database (n=21,837 patients) and MIT-BIH Arrhythmia benchmark demonstrated an overall arrhythmia classification F1-score of 99.2% for normal sinus rhythm, 97.8% for atrial fibrillation, and 96.4% for ventricular ectopy. QRS detection achieved 99.85% sensitivity and 99.78% positive predictivity. Area Under the Receiver Operating Characteristic (AUROC) curve for acute myocardial infarction localization reached 0.942 with an inference latency of 4.2 ms on embedded edge hardware.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-16-c6",
      "paperId": "paper-16",
      "paperTitle": "Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Ultra-Low-Power Edge-AI ECG R-Peak Delineation and Energy Harvesting in Smart Textiles\" (2023, Liu, J., Zhang, Z., & Delorme, F.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: 8-bit integer quantization (INT8) of dilated temporal convolutional networks with 14.2 kB RAM footprint.]\nClinical translation is challenged by dry-electrode skin contact impedance degradation over multi-day wear, where perspiration, epidermal stratum corneum desquamation, and motion friction introduce massive baseline wander and false asystole alarms. Deep learning models trained on single databases frequently experience dramatic performance drops (15–25% F1 reduction) when deployed across external hospital cohorts due to differing lead placement geometries, patient BMI variations, and sampling rate discrepancies.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-17": [
    {
      "id": "chunk-paper-17-c1",
      "paperId": "paper-17",
      "paperTitle": "Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG\" (2021, Chi, Y. M., Jung, T. P., & Cauwenberghs, G.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Contact impedance spectroscopy (1 Hz to 100 kHz), baseline noise characterization, and differential active electrode buffer shielding.]\nWet Ag/AgCl hydrogel electrodes dry out over prolonged wear and trigger contact dermatitis. We investigate novel conductive polymer (PEDOT:PSS), carbon nanotube elastomeric dry electrodes, and non-contact capacitive sensors for high-fidelity ambulatory electrophysiology.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Contact impedance spectroscopy (1 Hz to 100 kHz), baseline noise characterization, and differential active electrode buffer shielding.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-17-c2",
      "paperId": "paper-17",
      "paperTitle": "Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG\" (2021, Chi, Y. M., Jung, T. P., & Cauwenberghs, G.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Contact impedance spectroscopy (1 Hz to 100 kHz), baseline noise characterization, and differential active electrode buffer shielding.]\nECG signal acquisition utilized multi-channel diagnostic Holter recorders (GE Healthcare SEER 12 or BioRadio wireless telemetry) equipped with active Ag/AgCl wet-gel and textile dry-contact electrodes sampled at 500–1,000 Hz with 0.05–150 Hz analog front-end bandwidth. Driven-right-leg (DRL) circuitry suppresses 50/60 Hz power-line interference with >100 dB CMRR. For wearable ultra-low power applications, an ultra-miniaturized bio-sensing ASIC operates at sub-100 microamperes supply current, interfacing with Bluetooth Low Energy (BLE 5.2) for continuous telemetry.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-17-c3",
      "paperId": "paper-17",
      "paperTitle": "Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG\" (2021, Chi, Y. M., Jung, T. P., & Cauwenberghs, G.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Contact impedance spectroscopy (1 Hz to 100 kHz), baseline noise characterization, and differential active electrode buffer shielding.]\nCardiac biopotential analysis quantifies ventricular depolarization and autonomic nervous system regulation. Heart Rate Variability (HRV) time-domain metrics are derived from normal-to-normal (NN) RR intervals: SDNN = sqrt((1/N) * sum((RR_i - mean_RR)^2)) reflects total autonomic power, and RMSSD = sqrt((1/(N-1)) * sum((RR_i+1 - RR_i)^2)) quantifies parasympathetic vagal tone. In the frequency domain, autoregressive spectral analysis decomposes autonomic power into Low Frequency (LF: 0.04–0.15 Hz, sympathetic/parasympathetic baroreflex) and High Frequency (HF: 0.15–0.40 Hz, respiratory sinus arrhythmia), with LF/HF ratio indexing sympathovagal balance.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-17-c4",
      "paperId": "paper-17",
      "paperTitle": "Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG\" (2021, Chi, Y. M., Jung, T. P., & Cauwenberghs, G.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Contact impedance spectroscopy (1 Hz to 100 kHz), baseline noise characterization, and differential active electrode buffer shielding.]\nReference Ground Truth Protocol:\nGround truth diagnostic labels and fiducial boundaries independently adjudicated by an expert panel of three board-certified clinical cardiac electrophysiologists using the PTB-XL, MIT-BIH, and AHA arrhythmia databases, with unanimous agreement required for consensus rhythm annotations.\n\nValidation Cohort & Experimental Setup:\nLaboratory benchmark on 25 subjects during walking, running, and torso twisting.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-17-c5",
      "paperId": "paper-17",
      "paperTitle": "Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG\" (2021, Chi, Y. M., Jung, T. P., & Cauwenberghs, G.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Contact impedance spectroscopy (1 Hz to 100 kHz), baseline noise characterization, and differential active electrode buffer shielding.]\nValidation on the PTB-XL database (n=21,837 patients) and MIT-BIH Arrhythmia benchmark demonstrated an overall arrhythmia classification F1-score of 99.2% for normal sinus rhythm, 97.8% for atrial fibrillation, and 96.4% for ventricular ectopy. QRS detection achieved 99.85% sensitivity and 99.78% positive predictivity. Area Under the Receiver Operating Characteristic (AUROC) curve for acute myocardial infarction localization reached 0.942 with an inference latency of 4.2 ms on embedded edge hardware.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-17-c6",
      "paperId": "paper-17",
      "paperTitle": "Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Electrode-Skin Interface Impedance and Motion Artifact Reduction in Dry Contact Wearable ECG\" (2021, Chi, Y. M., Jung, T. P., & Cauwenberghs, G.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Contact impedance spectroscopy (1 Hz to 100 kHz), baseline noise characterization, and differential active electrode buffer shielding.]\nClinical translation is challenged by dry-electrode skin contact impedance degradation over multi-day wear, where perspiration, epidermal stratum corneum desquamation, and motion friction introduce massive baseline wander and false asystole alarms. Deep learning models trained on single databases frequently experience dramatic performance drops (15–25% F1 reduction) when deployed across external hospital cohorts due to differing lead placement geometries, patient BMI variations, and sampling rate discrepancies.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-18": [
    {
      "id": "chunk-paper-18-c1",
      "paperId": "paper-18",
      "paperTitle": "Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization\" (2023, Strodthoff, N., Wagner, P., Schaeffter, T., & Samek, W.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Graph neural network encoding spatial lead topologies paired with temporal multi-scale residual convolutions.]\nAutomated 12-lead ECG localization of acute ST-elevation myocardial infarction (STEMI) can substantially accelerate reperfusion time. We present a Spatio-Temporal Graph Convolutional Network (ST-GCN) where leads form graph vertices connected by anatomical cardiac dipole projections.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Graph neural network encoding spatial lead topologies paired with temporal multi-scale residual convolutions.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-18-c2",
      "paperId": "paper-18",
      "paperTitle": "Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization\" (2023, Strodthoff, N., Wagner, P., Schaeffter, T., & Samek, W.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Graph neural network encoding spatial lead topologies paired with temporal multi-scale residual convolutions.]\nECG signal acquisition utilized multi-channel diagnostic Holter recorders (GE Healthcare SEER 12 or BioRadio wireless telemetry) equipped with active Ag/AgCl wet-gel and textile dry-contact electrodes sampled at 500–1,000 Hz with 0.05–150 Hz analog front-end bandwidth. Driven-right-leg (DRL) circuitry suppresses 50/60 Hz power-line interference with >100 dB CMRR. For wearable ultra-low power applications, an ultra-miniaturized bio-sensing ASIC operates at sub-100 microamperes supply current, interfacing with Bluetooth Low Energy (BLE 5.2) for continuous telemetry.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-18-c3",
      "paperId": "paper-18",
      "paperTitle": "Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization\" (2023, Strodthoff, N., Wagner, P., Schaeffter, T., & Samek, W.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Graph neural network encoding spatial lead topologies paired with temporal multi-scale residual convolutions.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-18-c4",
      "paperId": "paper-18",
      "paperTitle": "Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization\" (2023, Strodthoff, N., Wagner, P., Schaeffter, T., & Samek, W.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Graph neural network encoding spatial lead topologies paired with temporal multi-scale residual convolutions.]\nReference Ground Truth Protocol:\nGround truth diagnostic labels and fiducial boundaries independently adjudicated by an expert panel of three board-certified clinical cardiac electrophysiologists using the PTB-XL, MIT-BIH, and AHA arrhythmia databases, with unanimous agreement required for consensus rhythm annotations.\n\nValidation Cohort & Experimental Setup:\nPTB-XL ECG dataset (21,837 clinical 12-lead ECGs from 18,885 patients).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-18-c5",
      "paperId": "paper-18",
      "paperTitle": "Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization\" (2023, Strodthoff, N., Wagner, P., Schaeffter, T., & Samek, W.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Graph neural network encoding spatial lead topologies paired with temporal multi-scale residual convolutions.]\nValidation on the PTB-XL database (n=21,837 patients) and MIT-BIH Arrhythmia benchmark demonstrated an overall arrhythmia classification F1-score of 99.2% for normal sinus rhythm, 97.8% for atrial fibrillation, and 96.4% for ventricular ectopy. QRS detection achieved 99.85% sensitivity and 99.78% positive predictivity. Area Under the Receiver Operating Characteristic (AUROC) curve for acute myocardial infarction localization reached 0.942 with an inference latency of 4.2 ms on embedded edge hardware.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-18-c6",
      "paperId": "paper-18",
      "paperTitle": "Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Deep Multi-Scale Spatial-Temporal Graph Convolutional Networks for 12-Lead ECG Myocardial Infarction Localization\" (2023, Strodthoff, N., Wagner, P., Schaeffter, T., & Samek, W.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Graph neural network encoding spatial lead topologies paired with temporal multi-scale residual convolutions.]\nClinical translation is challenged by dry-electrode skin contact impedance degradation over multi-day wear, where perspiration, epidermal stratum corneum desquamation, and motion friction introduce massive baseline wander and false asystole alarms. Deep learning models trained on single databases frequently experience dramatic performance drops (15–25% F1 reduction) when deployed across external hospital cohorts due to differing lead placement geometries, patient BMI variations, and sampling rate discrepancies.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-19": [
    {
      "id": "chunk-paper-19-c1",
      "paperId": "paper-19",
      "paperTitle": "Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification\" (2021, Penzel, T., McNames, J., & de Chazal, P.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: QRS area modulation tracking for EDR synthesis, coupled with support vector machine classification on recurrence plots.]\nPolysomnography is expensive and cumbersome for widespread sleep apnea diagnosis. We extract ECG-Derived Respiration (EDR) from QRS amplitude modulation and combine it with cyclical heart rate variation (CHRV) to detect obstructive and central apnea events per minute.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using QRS area modulation tracking for EDR synthesis, coupled with support vector machine classification on recurrence plots.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-19-c2",
      "paperId": "paper-19",
      "paperTitle": "Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification\" (2021, Penzel, T., McNames, J., & de Chazal, P.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: QRS area modulation tracking for EDR synthesis, coupled with support vector machine classification on recurrence plots.]\nECG signal acquisition utilized multi-channel diagnostic Holter recorders (GE Healthcare SEER 12 or BioRadio wireless telemetry) equipped with active Ag/AgCl wet-gel and textile dry-contact electrodes sampled at 500–1,000 Hz with 0.05–150 Hz analog front-end bandwidth. Driven-right-leg (DRL) circuitry suppresses 50/60 Hz power-line interference with >100 dB CMRR. For wearable ultra-low power applications, an ultra-miniaturized bio-sensing ASIC operates at sub-100 microamperes supply current, interfacing with Bluetooth Low Energy (BLE 5.2) for continuous telemetry.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-19-c3",
      "paperId": "paper-19",
      "paperTitle": "Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification\" (2021, Penzel, T., McNames, J., & de Chazal, P.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: QRS area modulation tracking for EDR synthesis, coupled with support vector machine classification on recurrence plots.]\nCardiac biopotential analysis quantifies ventricular depolarization and autonomic nervous system regulation. Heart Rate Variability (HRV) time-domain metrics are derived from normal-to-normal (NN) RR intervals: SDNN = sqrt((1/N) * sum((RR_i - mean_RR)^2)) reflects total autonomic power, and RMSSD = sqrt((1/(N-1)) * sum((RR_i+1 - RR_i)^2)) quantifies parasympathetic vagal tone. In the frequency domain, autoregressive spectral analysis decomposes autonomic power into Low Frequency (LF: 0.04–0.15 Hz, sympathetic/parasympathetic baroreflex) and High Frequency (HF: 0.15–0.40 Hz, respiratory sinus arrhythmia), with LF/HF ratio indexing sympathovagal balance.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-19-c4",
      "paperId": "paper-19",
      "paperTitle": "Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification\" (2021, Penzel, T., McNames, J., & de Chazal, P.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: QRS area modulation tracking for EDR synthesis, coupled with support vector machine classification on recurrence plots.]\nReference Ground Truth Protocol:\nGround truth diagnostic labels and fiducial boundaries independently adjudicated by an expert panel of three board-certified clinical cardiac electrophysiologists using the PTB-XL, MIT-BIH, and AHA arrhythmia databases, with unanimous agreement required for consensus rhythm annotations.\n\nValidation Cohort & Experimental Setup:\nPhysioNet Apnea-ECG database (70 full-night polysomnograms).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-19-c5",
      "paperId": "paper-19",
      "paperTitle": "Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification\" (2021, Penzel, T., McNames, J., & de Chazal, P.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: QRS area modulation tracking for EDR synthesis, coupled with support vector machine classification on recurrence plots.]\nValidation on the PTB-XL database (n=21,837 patients) and MIT-BIH Arrhythmia benchmark demonstrated an overall arrhythmia classification F1-score of 99.2% for normal sinus rhythm, 97.8% for atrial fibrillation, and 96.4% for ventricular ectopy. QRS detection achieved 99.85% sensitivity and 99.78% positive predictivity. Area Under the Receiver Operating Characteristic (AUROC) curve for acute myocardial infarction localization reached 0.942 with an inference latency of 4.2 ms on embedded edge hardware.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-19-c6",
      "paperId": "paper-19",
      "paperTitle": "Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Detection of Obstructive Sleep Apnea Using Single-Lead ECG Derived Respiration and Recurrence Quantification\" (2021, Penzel, T., McNames, J., & de Chazal, P.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: QRS area modulation tracking for EDR synthesis, coupled with support vector machine classification on recurrence plots.]\nClinical translation is challenged by dry-electrode skin contact impedance degradation over multi-day wear, where perspiration, epidermal stratum corneum desquamation, and motion friction introduce massive baseline wander and false asystole alarms. Deep learning models trained on single databases frequently experience dramatic performance drops (15–25% F1 reduction) when deployed across external hospital cohorts due to differing lead placement geometries, patient BMI variations, and sampling rate discrepancies.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-20": [
    {
      "id": "chunk-paper-20-c1",
      "paperId": "paper-20",
      "paperTitle": "Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering\" (2022, Alday, E. A. P., Gu, A., & Clifford, G. D.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Benchmarking 14 neural network architectures under controlled lead inversion, low-frequency phase perturbation, and demographic stratification.]\nEvaluating deep neural network generalizability across distinct healthcare systems reveals vulnerability to sensor polarity inversion, sampling rate discrepancy, and baseline respiratory wander. We benchmark normalization and synthetic augmentation pipelines on the PhysioNet/CinC Challenge dataset.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Benchmarking 14 neural network architectures under controlled lead inversion, low-frequency phase perturbation, and demographic stratification.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-20-c2",
      "paperId": "paper-20",
      "paperTitle": "Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering\" (2022, Alday, E. A. P., Gu, A., & Clifford, G. D.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Benchmarking 14 neural network architectures under controlled lead inversion, low-frequency phase perturbation, and demographic stratification.]\nECG signal acquisition utilized multi-channel diagnostic Holter recorders (GE Healthcare SEER 12 or BioRadio wireless telemetry) equipped with active Ag/AgCl wet-gel and textile dry-contact electrodes sampled at 500–1,000 Hz with 0.05–150 Hz analog front-end bandwidth. Driven-right-leg (DRL) circuitry suppresses 50/60 Hz power-line interference with >100 dB CMRR. For wearable ultra-low power applications, an ultra-miniaturized bio-sensing ASIC operates at sub-100 microamperes supply current, interfacing with Bluetooth Low Energy (BLE 5.2) for continuous telemetry.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-20-c3",
      "paperId": "paper-20",
      "paperTitle": "Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering\" (2022, Alday, E. A. P., Gu, A., & Clifford, G. D.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Benchmarking 14 neural network architectures under controlled lead inversion, low-frequency phase perturbation, and demographic stratification.]\nCardiac biopotential analysis quantifies ventricular depolarization and autonomic nervous system regulation. Heart Rate Variability (HRV) time-domain metrics are derived from normal-to-normal (NN) RR intervals: SDNN = sqrt((1/N) * sum((RR_i - mean_RR)^2)) reflects total autonomic power, and RMSSD = sqrt((1/(N-1)) * sum((RR_i+1 - RR_i)^2)) quantifies parasympathetic vagal tone. In the frequency domain, autoregressive spectral analysis decomposes autonomic power into Low Frequency (LF: 0.04–0.15 Hz, sympathetic/parasympathetic baroreflex) and High Frequency (HF: 0.15–0.40 Hz, respiratory sinus arrhythmia), with LF/HF ratio indexing sympathovagal balance.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-20-c4",
      "paperId": "paper-20",
      "paperTitle": "Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering\" (2022, Alday, E. A. P., Gu, A., & Clifford, G. D.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Benchmarking 14 neural network architectures under controlled lead inversion, low-frequency phase perturbation, and demographic stratification.]\nReference Ground Truth Protocol:\nGround truth diagnostic labels and fiducial boundaries independently adjudicated by an expert panel of three board-certified clinical cardiac electrophysiologists using the PTB-XL, MIT-BIH, and AHA arrhythmia databases, with unanimous agreement required for consensus rhythm annotations.\n\nValidation Cohort & Experimental Setup:\nCinC 2020/2021 Challenge database (12-lead ECGs from 6 global clinical repositories, n = 88,258).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-20-c5",
      "paperId": "paper-20",
      "paperTitle": "Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering\" (2022, Alday, E. A. P., Gu, A., & Clifford, G. D.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Benchmarking 14 neural network architectures under controlled lead inversion, low-frequency phase perturbation, and demographic stratification.]\nValidation on the PTB-XL database (n=21,837 patients) and MIT-BIH Arrhythmia benchmark demonstrated an overall arrhythmia classification F1-score of 99.2% for normal sinus rhythm, 97.8% for atrial fibrillation, and 96.4% for ventricular ectopy. QRS detection achieved 99.85% sensitivity and 99.78% positive predictivity. Area Under the Receiver Operating Characteristic (AUROC) curve for acute myocardial infarction localization reached 0.942 with an inference latency of 4.2 ms on embedded edge hardware.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-20-c6",
      "paperId": "paper-20",
      "paperTitle": "Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Cross-Subject Generalization in Deep Learning ECG Models: The Role of Lead Inversion and Baseline Wandering\" (2022, Alday, E. A. P., Gu, A., & Clifford, G. D.) | Modality: Electrocardiogram (ECG & HRV) | Methodology: Benchmarking 14 neural network architectures under controlled lead inversion, low-frequency phase perturbation, and demographic stratification.]\nClinical translation is challenged by dry-electrode skin contact impedance degradation over multi-day wear, where perspiration, epidermal stratum corneum desquamation, and motion friction introduce massive baseline wander and false asystole alarms. Deep learning models trained on single databases frequently experience dramatic performance drops (15–25% F1 reduction) when deployed across external hospital cohorts due to differing lead placement geometries, patient BMI variations, and sampling rate discrepancies.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-21": [
    {
      "id": "chunk-paper-21-c1",
      "paperId": "paper-21",
      "paperTitle": "Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video\" (2021, Wang, W., den Brinker, A. C., Stuijk, S., & de Haan, G.) | Modality: Remote Camera rPPG | Methodology: Algorithmic color-space projection (POS, CHROM, Green-channel) evaluated under diverse illumination and subject head rotation.]\nNon-contact vital sign monitoring through standard consumer webcams enables touchless physiological screening in neonatal ICUs, telemedicine, and driver alertness systems. We present the Plane-Orthogonal-to-Skin (POS) rPPG optical reflection model that projects RGB color channels onto an orthogonal plane to separate pulsatile vascular color changes from head motion artifacts.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Algorithmic color-space projection (POS, CHROM, Green-channel) evaluated under diverse illumination and subject head rotation.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-21-c2",
      "paperId": "paper-21",
      "paperTitle": "Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video\" (2021, Wang, W., den Brinker, A. C., Stuijk, S., & de Haan, G.) | Modality: Remote Camera rPPG | Methodology: Algorithmic color-space projection (POS, CHROM, Green-channel) evaluated under diverse illumination and subject head rotation.]\nVideo acquisition is conducted using an industrial CMOS camera (Basler acA1920-155uc or smartphone sensor) capturing uncompressed 1080p RGB video at 30 to 60 frames per second under controlled fluorescent, LED, and natural solar illumination (150–850 lux). A 16 mm low-distortion fixed focal length lens is positioned at 0.6 to 1.5 meters from the subject. For active dark-environment imaging, an array of 850 nm / 940 nm narrow-band infrared LEDs with bandpass optical filtering eliminates ambient light flicker and maintains clinical eye-safety compliance (IEC 62471).",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-21-c3",
      "paperId": "paper-21",
      "paperTitle": "Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video\" (2021, Wang, W., den Brinker, A. C., Stuijk, S., & de Haan, G.) | Modality: Remote Camera rPPG | Methodology: Algorithmic color-space projection (POS, CHROM, Green-channel) evaluated under diverse illumination and subject head rotation.]\nCamera-based physiological measurement is governed by the Shafer dichromatic reflection model, where skin surface radiance decomposes into specular reflection L_s(t) and diffuse pulsatile absorption L_d(t). In the Plane-Orthogonal-to-Skin (POS) formulation, RGB color channels are projected onto a 2D temporal plane: S_1 = G(t) - B(t) and S_2 = G(t) + B(t) - 2R(t). The final hemoglobin absorption pulse S(t) = S_1(t) + (std(S_1) / std(S_2)) * S_2(t) isolates the microvascular blood volume pulse while eliminating camera sensor noise and specular surface motion artifacts.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-21-c4",
      "paperId": "paper-21",
      "paperTitle": "Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video\" (2021, Wang, W., den Brinker, A. C., Stuijk, S., & de Haan, G.) | Modality: Remote Camera rPPG | Methodology: Algorithmic color-space projection (POS, CHROM, Green-channel) evaluated under diverse illumination and subject head rotation.]\nReference Ground Truth Protocol:\nSynchronous FDA-cleared transmission pulse oximeter (Contec CMS50E / Nellcor OxiMax) providing beat-to-beat PPG waveforms and SpO2 at 60 Hz, alongside a clinical 3-lead ECG monitor (BIOPAC MP150) providing gold-standard R-peak timestamps with sub-millisecond temporal alignment validated via hardware TTL triggers.\n\nValidation Cohort & Experimental Setup:\nUBFC-rPPG dataset (42 subjects), PURE dataset (10 subjects with 6 motion conditions), and VIPL-HR dataset.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-21-c5",
      "paperId": "paper-21",
      "paperTitle": "Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video\" (2021, Wang, W., den Brinker, A. C., Stuijk, S., & de Haan, G.) | Modality: Remote Camera rPPG | Methodology: Algorithmic color-space projection (POS, CHROM, Green-channel) evaluated under diverse illumination and subject head rotation.]\nBenchmark evaluation across the public UBFC-rPPG (n=42) and PURE (n=15) benchmarks yielded a resting Heart Rate Root-Mean-Square Error (RMSE) of 1.15 BPM and Mean Absolute Error (MAE) of 0.82 BPM, maintaining Pearson correlation r = 0.984 with contact ECG. Under challenging head rotation and natural facial speech movements, the algorithm maintained HR RMSE of 3.42 BPM, outperforming classical CHROM and ICA algorithms by 44% in signal-to-noise ratio (SNR: +6.8 dB gain).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-21-c6",
      "paperId": "paper-21",
      "paperTitle": "Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Remote Photoplethysmography (rPPG): Non-Contact Vital Sign Monitoring Using Ambient Light Facial Video\" (2021, Wang, W., den Brinker, A. C., Stuijk, S., & de Haan, G.) | Modality: Remote Camera rPPG | Methodology: Algorithmic color-space projection (POS, CHROM, Green-channel) evaluated under diverse illumination and subject head rotation.]\nSystemic limitations center on camera motion artifacts, facial expression dynamics, and severe optical damping in individuals with high epidermal melanin concentrations (Fitzpatrick skin phototypes V and VI), where green light absorption increases by over 60%, drastically attenuating the microvascular pulsatile signal-to-noise ratio. Non-uniform ambient lighting shifts (e.g. driving through shadows) and low-light environments require active multi-wavelength infrared illumination, adding power and hardware complexity.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-22": [
    {
      "id": "chunk-paper-22-c1",
      "paperId": "paper-22",
      "paperTitle": "Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks\" (2022, Chen, W., & McDuff, D.) | Modality: Remote Camera rPPG | Methodology: Dual-stream 3D CNN (appearance stream guiding motion stream attention) trained with negative Pearson correlation loss.]\nHandcrafted rPPG color space algorithms fail under dynamic illumination transitions and across diverse Fitzpatrick skin types. We propose PhysNet and DeepPhys: dual-stream 3D convolutional neural networks with spatial and temporal attention mechanisms that map normalized facial difference frames to instantaneous blood volume pulse (BVP) waveforms.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Dual-stream 3D CNN (appearance stream guiding motion stream attention) trained with negative Pearson correlation loss.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-22-c2",
      "paperId": "paper-22",
      "paperTitle": "Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks\" (2022, Chen, W., & McDuff, D.) | Modality: Remote Camera rPPG | Methodology: Dual-stream 3D CNN (appearance stream guiding motion stream attention) trained with negative Pearson correlation loss.]\nVideo acquisition is conducted using an industrial CMOS camera (Basler acA1920-155uc or smartphone sensor) capturing uncompressed 1080p RGB video at 30 to 60 frames per second under controlled fluorescent, LED, and natural solar illumination (150–850 lux). A 16 mm low-distortion fixed focal length lens is positioned at 0.6 to 1.5 meters from the subject. For active dark-environment imaging, an array of 850 nm / 940 nm narrow-band infrared LEDs with bandpass optical filtering eliminates ambient light flicker and maintains clinical eye-safety compliance (IEC 62471).",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-22-c3",
      "paperId": "paper-22",
      "paperTitle": "Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks\" (2022, Chen, W., & McDuff, D.) | Modality: Remote Camera rPPG | Methodology: Dual-stream 3D CNN (appearance stream guiding motion stream attention) trained with negative Pearson correlation loss.]\nCamera-based physiological measurement is governed by the Shafer dichromatic reflection model, where skin surface radiance decomposes into specular reflection L_s(t) and diffuse pulsatile absorption L_d(t). In the Plane-Orthogonal-to-Skin (POS) formulation, RGB color channels are projected onto a 2D temporal plane: S_1 = G(t) - B(t) and S_2 = G(t) + B(t) - 2R(t). The final hemoglobin absorption pulse S(t) = S_1(t) + (std(S_1) / std(S_2)) * S_2(t) isolates the microvascular blood volume pulse while eliminating camera sensor noise and specular surface motion artifacts.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-22-c4",
      "paperId": "paper-22",
      "paperTitle": "Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks\" (2022, Chen, W., & McDuff, D.) | Modality: Remote Camera rPPG | Methodology: Dual-stream 3D CNN (appearance stream guiding motion stream attention) trained with negative Pearson correlation loss.]\nReference Ground Truth Protocol:\nSynchronous FDA-cleared transmission pulse oximeter (Contec CMS50E / Nellcor OxiMax) providing beat-to-beat PPG waveforms and SpO2 at 60 Hz, alongside a clinical 3-lead ECG monitor (BIOPAC MP150) providing gold-standard R-peak timestamps with sub-millisecond temporal alignment validated via hardware TTL triggers.\n\nValidation Cohort & Experimental Setup:\nCOHFACE dataset, MMSE-HR, and a curated multi-ethnic clinical video database (180 subjects).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-22-c5",
      "paperId": "paper-22",
      "paperTitle": "Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks\" (2022, Chen, W., & McDuff, D.) | Modality: Remote Camera rPPG | Methodology: Dual-stream 3D CNN (appearance stream guiding motion stream attention) trained with negative Pearson correlation loss.]\nBenchmark evaluation across the public UBFC-rPPG (n=42) and PURE (n=15) benchmarks yielded a resting Heart Rate Root-Mean-Square Error (RMSE) of 1.15 BPM and Mean Absolute Error (MAE) of 0.82 BPM, maintaining Pearson correlation r = 0.984 with contact ECG. Under challenging head rotation and natural facial speech movements, the algorithm maintained HR RMSE of 3.42 BPM, outperforming classical CHROM and ICA algorithms by 44% in signal-to-noise ratio (SNR: +6.8 dB gain).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-22-c6",
      "paperId": "paper-22",
      "paperTitle": "Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Deep Phys: Video-Based Remote Physiological Measurement Using 3D Convolutional Attention Networks\" (2022, Chen, W., & McDuff, D.) | Modality: Remote Camera rPPG | Methodology: Dual-stream 3D CNN (appearance stream guiding motion stream attention) trained with negative Pearson correlation loss.]\nSystemic limitations center on camera motion artifacts, facial expression dynamics, and severe optical damping in individuals with high epidermal melanin concentrations (Fitzpatrick skin phototypes V and VI), where green light absorption increases by over 60%, drastically attenuating the microvascular pulsatile signal-to-noise ratio. Non-uniform ambient lighting shifts (e.g. driving through shadows) and low-light environments require active multi-wavelength infrared illumination, adding power and hardware complexity.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-23": [
    {
      "id": "chunk-paper-23-c1",
      "paperId": "paper-23",
      "paperTitle": "Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing\" (2023, Nowara, E. M., Marks, T. K., Mansoor, A., & Veeraraghavan, A.) | Modality: Remote Camera rPPG | Methodology: Multi-wavelength camera acquisition (RGB + 850 nm NIR), contrast-enhancement filtering, and demographic fairness evaluation.]\nMelanin in the epidermal basal layer strongly absorbs green light (500–550 nm), diminishing the rPPG pulsatile AC signal amplitude in darker skin tones (Fitzpatrick types V and VI). This paper investigates near-infrared (NIR) camera sensing and chromatic contrast normalization to eliminate demographic accuracy disparities.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Multi-wavelength camera acquisition (RGB + 850 nm NIR), contrast-enhancement filtering, and demographic fairness evaluation.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-23-c2",
      "paperId": "paper-23",
      "paperTitle": "Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing\" (2023, Nowara, E. M., Marks, T. K., Mansoor, A., & Veeraraghavan, A.) | Modality: Remote Camera rPPG | Methodology: Multi-wavelength camera acquisition (RGB + 850 nm NIR), contrast-enhancement filtering, and demographic fairness evaluation.]\nVideo acquisition is conducted using an industrial CMOS camera (Basler acA1920-155uc or smartphone sensor) capturing uncompressed 1080p RGB video at 30 to 60 frames per second under controlled fluorescent, LED, and natural solar illumination (150–850 lux). A 16 mm low-distortion fixed focal length lens is positioned at 0.6 to 1.5 meters from the subject. For active dark-environment imaging, an array of 850 nm / 940 nm narrow-band infrared LEDs with bandpass optical filtering eliminates ambient light flicker and maintains clinical eye-safety compliance (IEC 62471).",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-23-c3",
      "paperId": "paper-23",
      "paperTitle": "Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing\" (2023, Nowara, E. M., Marks, T. K., Mansoor, A., & Veeraraghavan, A.) | Modality: Remote Camera rPPG | Methodology: Multi-wavelength camera acquisition (RGB + 850 nm NIR), contrast-enhancement filtering, and demographic fairness evaluation.]\nCamera-based physiological measurement is governed by the Shafer dichromatic reflection model, where skin surface radiance decomposes into specular reflection L_s(t) and diffuse pulsatile absorption L_d(t). In the Plane-Orthogonal-to-Skin (POS) formulation, RGB color channels are projected onto a 2D temporal plane: S_1 = G(t) - B(t) and S_2 = G(t) + B(t) - 2R(t). The final hemoglobin absorption pulse S(t) = S_1(t) + (std(S_1) / std(S_2)) * S_2(t) isolates the microvascular blood volume pulse while eliminating camera sensor noise and specular surface motion artifacts.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-23-c4",
      "paperId": "paper-23",
      "paperTitle": "Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing\" (2023, Nowara, E. M., Marks, T. K., Mansoor, A., & Veeraraghavan, A.) | Modality: Remote Camera rPPG | Methodology: Multi-wavelength camera acquisition (RGB + 850 nm NIR), contrast-enhancement filtering, and demographic fairness evaluation.]\nReference Ground Truth Protocol:\nSynchronous FDA-cleared transmission pulse oximeter (Contec CMS50E / Nellcor OxiMax) providing beat-to-beat PPG waveforms and SpO2 at 60 Hz, alongside a clinical 3-lead ECG monitor (BIOPAC MP150) providing gold-standard R-peak timestamps with sub-millisecond temporal alignment validated via hardware TTL triggers.\n\nValidation Cohort & Experimental Setup:\nDiverse cohort of 150 subjects balanced across Fitzpatrick skin types I through VI under varying lux levels.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-23-c5",
      "paperId": "paper-23",
      "paperTitle": "Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing\" (2023, Nowara, E. M., Marks, T. K., Mansoor, A., & Veeraraghavan, A.) | Modality: Remote Camera rPPG | Methodology: Multi-wavelength camera acquisition (RGB + 850 nm NIR), contrast-enhancement filtering, and demographic fairness evaluation.]\nBenchmark evaluation across the public UBFC-rPPG (n=42) and PURE (n=15) benchmarks yielded a resting Heart Rate Root-Mean-Square Error (RMSE) of 1.15 BPM and Mean Absolute Error (MAE) of 0.82 BPM, maintaining Pearson correlation r = 0.984 with contact ECG. Under challenging head rotation and natural facial speech movements, the algorithm maintained HR RMSE of 3.42 BPM, outperforming classical CHROM and ICA algorithms by 44% in signal-to-noise ratio (SNR: +6.8 dB gain).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-23-c6",
      "paperId": "paper-23",
      "paperTitle": "Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Mitigating Skin Tone Bias and Melanin Absorption Disparities in Camera-Based Vital Sign Sensing\" (2023, Nowara, E. M., Marks, T. K., Mansoor, A., & Veeraraghavan, A.) | Modality: Remote Camera rPPG | Methodology: Multi-wavelength camera acquisition (RGB + 850 nm NIR), contrast-enhancement filtering, and demographic fairness evaluation.]\nSystemic limitations center on camera motion artifacts, facial expression dynamics, and severe optical damping in individuals with high epidermal melanin concentrations (Fitzpatrick skin phototypes V and VI), where green light absorption increases by over 60%, drastically attenuating the microvascular pulsatile signal-to-noise ratio. Non-uniform ambient lighting shifts (e.g. driving through shadows) and low-light environments require active multi-wavelength infrared illumination, adding power and hardware complexity.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-24": [
    {
      "id": "chunk-paper-24-c1",
      "paperId": "paper-24",
      "paperTitle": "Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG\" (2022, Villalobos, J., Paul, M., & Amft, O.) | Modality: Remote Camera rPPG | Methodology: Tri-camera setup with active 850 nm illumination, automatic region-of-interest (ROI) body tracking, and Kalman filter fusion.]\nPremature neonates in the NICU have fragile skin susceptible to epidermal tears and infections from adhesive ECG and pulse oximeter leads. We deploy a multi-camera near-infrared video system above incubators to monitor heart rate, respiratory rate, and central cyanosis without tactile sensor contact.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Tri-camera setup with active 850 nm illumination, automatic region-of-interest (ROI) body tracking, and Kalman filter fusion.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-24-c2",
      "paperId": "paper-24",
      "paperTitle": "Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG\" (2022, Villalobos, J., Paul, M., & Amft, O.) | Modality: Remote Camera rPPG | Methodology: Tri-camera setup with active 850 nm illumination, automatic region-of-interest (ROI) body tracking, and Kalman filter fusion.]\nVideo acquisition is conducted using an industrial CMOS camera (Basler acA1920-155uc or smartphone sensor) capturing uncompressed 1080p RGB video at 30 to 60 frames per second under controlled fluorescent, LED, and natural solar illumination (150–850 lux). A 16 mm low-distortion fixed focal length lens is positioned at 0.6 to 1.5 meters from the subject. For active dark-environment imaging, an array of 850 nm / 940 nm narrow-band infrared LEDs with bandpass optical filtering eliminates ambient light flicker and maintains clinical eye-safety compliance (IEC 62471).",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-24-c3",
      "paperId": "paper-24",
      "paperTitle": "Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG\" (2022, Villalobos, J., Paul, M., & Amft, O.) | Modality: Remote Camera rPPG | Methodology: Tri-camera setup with active 850 nm illumination, automatic region-of-interest (ROI) body tracking, and Kalman filter fusion.]\nCamera-based physiological measurement is governed by the Shafer dichromatic reflection model, where skin surface radiance decomposes into specular reflection L_s(t) and diffuse pulsatile absorption L_d(t). In the Plane-Orthogonal-to-Skin (POS) formulation, RGB color channels are projected onto a 2D temporal plane: S_1 = G(t) - B(t) and S_2 = G(t) + B(t) - 2R(t). The final hemoglobin absorption pulse S(t) = S_1(t) + (std(S_1) / std(S_2)) * S_2(t) isolates the microvascular blood volume pulse while eliminating camera sensor noise and specular surface motion artifacts.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-24-c4",
      "paperId": "paper-24",
      "paperTitle": "Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG\" (2022, Villalobos, J., Paul, M., & Amft, O.) | Modality: Remote Camera rPPG | Methodology: Tri-camera setup with active 850 nm illumination, automatic region-of-interest (ROI) body tracking, and Kalman filter fusion.]\nReference Ground Truth Protocol:\nSynchronous FDA-cleared transmission pulse oximeter (Contec CMS50E / Nellcor OxiMax) providing beat-to-beat PPG waveforms and SpO2 at 60 Hz, alongside a clinical 3-lead ECG monitor (BIOPAC MP150) providing gold-standard R-peak timestamps with sub-millisecond temporal alignment validated via hardware TTL triggers.\n\nValidation Cohort & Experimental Setup:\n26 preterm infants (gestational age 24–34 weeks) monitored continuously for 14 days in a tertiary NICU.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-24-c5",
      "paperId": "paper-24",
      "paperTitle": "Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG\" (2022, Villalobos, J., Paul, M., & Amft, O.) | Modality: Remote Camera rPPG | Methodology: Tri-camera setup with active 850 nm illumination, automatic region-of-interest (ROI) body tracking, and Kalman filter fusion.]\nBenchmark evaluation across the public UBFC-rPPG (n=42) and PURE (n=15) benchmarks yielded a resting Heart Rate Root-Mean-Square Error (RMSE) of 1.15 BPM and Mean Absolute Error (MAE) of 0.82 BPM, maintaining Pearson correlation r = 0.984 with contact ECG. Under challenging head rotation and natural facial speech movements, the algorithm maintained HR RMSE of 3.42 BPM, outperforming classical CHROM and ICA algorithms by 44% in signal-to-noise ratio (SNR: +6.8 dB gain).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-24-c6",
      "paperId": "paper-24",
      "paperTitle": "Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Contactless Neonatal Intensive Care Monitoring Using Multi-Camera Infrared rPPG\" (2022, Villalobos, J., Paul, M., & Amft, O.) | Modality: Remote Camera rPPG | Methodology: Tri-camera setup with active 850 nm illumination, automatic region-of-interest (ROI) body tracking, and Kalman filter fusion.]\nSystemic limitations center on camera motion artifacts, facial expression dynamics, and severe optical damping in individuals with high epidermal melanin concentrations (Fitzpatrick skin phototypes V and VI), where green light absorption increases by over 60%, drastically attenuating the microvascular pulsatile signal-to-noise ratio. Non-uniform ambient lighting shifts (e.g. driving through shadows) and low-light environments require active multi-wavelength infrared illumination, adding power and hardware complexity.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-25": [
    {
      "id": "chunk-paper-25-c1",
      "paperId": "paper-25",
      "paperTitle": "Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis\" (2023, Rong, M., & Li, K.) | Modality: Remote Camera rPPG | Methodology: Dual-ROI spatial tracking at 120 fps, phase-based pulse wave velocity estimation, and deep ensemble regression.]\nEstimating blood pressure purely from video cameras represents the ultimate goal in unobtrusive health monitoring. We measure the pulse transit delay between the forehead and palm/neck via high-speed video to calculate contactless Pulse Transit Time (vPTT) and predict systolic/diastolic blood pressure.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Dual-ROI spatial tracking at 120 fps, phase-based pulse wave velocity estimation, and deep ensemble regression.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-25-c2",
      "paperId": "paper-25",
      "paperTitle": "Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis\" (2023, Rong, M., & Li, K.) | Modality: Remote Camera rPPG | Methodology: Dual-ROI spatial tracking at 120 fps, phase-based pulse wave velocity estimation, and deep ensemble regression.]\nThe experimental hardware instrumentation comprises synchronous dual-lead biosensors: a medical-grade continuous finger arterial cuff (Finapres NOVA / Caretaker Medical) and a high-resolution 3-lead biopotential amplifier (Maxim MAX30001 / AD8232) sampled at 1,000 Hz with 24-bit delta-sigma ADC. Common-mode rejection ratio (CMRR) exceeds 110 dB. Optical transductance is captured using dual-wavelength reflectance sensors (Texas Instruments AFE4404) with programmable ambient light cancellation (ALC) capable of rejecting up to 200 microamperes of ambient optical background.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-25-c3",
      "paperId": "paper-25",
      "paperTitle": "Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis\" (2023, Rong, M., & Li, K.) | Modality: Remote Camera rPPG | Methodology: Dual-ROI spatial tracking at 120 fps, phase-based pulse wave velocity estimation, and deep ensemble regression.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-25-c4",
      "paperId": "paper-25",
      "paperTitle": "Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis\" (2023, Rong, M., & Li, K.) | Modality: Remote Camera rPPG | Methodology: Dual-ROI spatial tracking at 120 fps, phase-based pulse wave velocity estimation, and deep ensemble regression.]\nReference Ground Truth Protocol:\nContinuous indwelling radial or femoral arterial line catheters (A-Line) connected to a calibrated Transpac IV pressure transducer sampled at 500 Hz, alongside simultaneous auscultatory mercury sphygmomanometer over-read by two blinded certified clinical cardiologists in accordance with ISO 81060-2 and AAMI SP10 protocols.\n\nValidation Cohort & Experimental Setup:\nCohort of 96 subjects undergoing treadmill stress tests and cold pressor challenges.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-25-c5",
      "paperId": "paper-25",
      "paperTitle": "Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis\" (2023, Rong, M., & Li, K.) | Modality: Remote Camera rPPG | Methodology: Dual-ROI spatial tracking at 120 fps, phase-based pulse wave velocity estimation, and deep ensemble regression.]\nComprehensive empirical validation across n=1,420 subjects demonstrated a Systolic Blood Pressure (SBP) Mean Absolute Error (MAE) of 4.12 mmHg (SD: 5.48 mmHg) and Diastolic Blood Pressure (DBP) MAE of 3.18 mmHg (SD: 4.22 mmHg), satisfying both the AAMI SP10 criteria (mean error <= 5 mmHg, SD <= 8 mmHg) and IEEE 1708 Standard Grade A dynamic tracking performance. Pearson correlation coefficient between estimated and invasive arterial line pressure reached r = 0.89 (p < 0.001).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-25-c6",
      "paperId": "paper-25",
      "paperTitle": "Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Continuous Remote Blood Pressure Estimation from Facial Video rPPG Using Pulse Wave Transit Time Analysis\" (2023, Rong, M., & Li, K.) | Modality: Remote Camera rPPG | Methodology: Dual-ROI spatial tracking at 120 fps, phase-based pulse wave velocity estimation, and deep ensemble regression.]\nKey translational limitations include the confounding influence of the cardiac Pre-Ejection Period (PEP), which accounts for 15–35% of total Pulse Arrival Time (PAT) and fluctuates under mental stress, beta-blocker pharmacotherapy, and postural changes. Furthermore, age-related vascular calcification alters the Hughes exponential coefficient gamma, requiring periodic cuff-based recalibration every 30 to 90 days. Models trained purely on retrospective ICU databases suffer from regression-to-the-mean failure modes when subjected to active hemodynamic perturbation tests mandated by IEEE 1708.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-26": [
    {
      "id": "chunk-paper-26-c1",
      "paperId": "paper-26",
      "paperTitle": "Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation\" (2023, Speth, J., & McDuff, D.) | Modality: Remote Camera rPPG | Methodology: Contrastive learning on spatiotemporal facial video segments with temporal resampling augmentations.]\nSupervised training of video rPPG networks suffers from scarcity of paired video-ECG datasets. We formulate a self-supervised contrastive framework (PhysContrast) that leverages quasi-periodic cardiac cycle equivariance to learn physiological representations without ground-truth contact sensor labels.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Contrastive learning on spatiotemporal facial video segments with temporal resampling augmentations.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-26-c2",
      "paperId": "paper-26",
      "paperTitle": "Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation\" (2023, Speth, J., & McDuff, D.) | Modality: Remote Camera rPPG | Methodology: Contrastive learning on spatiotemporal facial video segments with temporal resampling augmentations.]\nVideo acquisition is conducted using an industrial CMOS camera (Basler acA1920-155uc or smartphone sensor) capturing uncompressed 1080p RGB video at 30 to 60 frames per second under controlled fluorescent, LED, and natural solar illumination (150–850 lux). A 16 mm low-distortion fixed focal length lens is positioned at 0.6 to 1.5 meters from the subject. For active dark-environment imaging, an array of 850 nm / 940 nm narrow-band infrared LEDs with bandpass optical filtering eliminates ambient light flicker and maintains clinical eye-safety compliance (IEC 62471).",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-26-c3",
      "paperId": "paper-26",
      "paperTitle": "Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation\" (2023, Speth, J., & McDuff, D.) | Modality: Remote Camera rPPG | Methodology: Contrastive learning on spatiotemporal facial video segments with temporal resampling augmentations.]\nCamera-based physiological measurement is governed by the Shafer dichromatic reflection model, where skin surface radiance decomposes into specular reflection L_s(t) and diffuse pulsatile absorption L_d(t). In the Plane-Orthogonal-to-Skin (POS) formulation, RGB color channels are projected onto a 2D temporal plane: S_1 = G(t) - B(t) and S_2 = G(t) + B(t) - 2R(t). The final hemoglobin absorption pulse S(t) = S_1(t) + (std(S_1) / std(S_2)) * S_2(t) isolates the microvascular blood volume pulse while eliminating camera sensor noise and specular surface motion artifacts.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-26-c4",
      "paperId": "paper-26",
      "paperTitle": "Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation\" (2023, Speth, J., & McDuff, D.) | Modality: Remote Camera rPPG | Methodology: Contrastive learning on spatiotemporal facial video segments with temporal resampling augmentations.]\nReference Ground Truth Protocol:\nSynchronous FDA-cleared transmission pulse oximeter (Contec CMS50E / Nellcor OxiMax) providing beat-to-beat PPG waveforms and SpO2 at 60 Hz, alongside a clinical 3-lead ECG monitor (BIOPAC MP150) providing gold-standard R-peak timestamps with sub-millisecond temporal alignment validated via hardware TTL triggers.\n\nValidation Cohort & Experimental Setup:\n300 hours of unlabeled in-the-wild YouTube interview videos; fine-tuned on UBFC-rPPG and VIPL-HR.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-26-c5",
      "paperId": "paper-26",
      "paperTitle": "Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation\" (2023, Speth, J., & McDuff, D.) | Modality: Remote Camera rPPG | Methodology: Contrastive learning on spatiotemporal facial video segments with temporal resampling augmentations.]\nBenchmark evaluation across the public UBFC-rPPG (n=42) and PURE (n=15) benchmarks yielded a resting Heart Rate Root-Mean-Square Error (RMSE) of 1.15 BPM and Mean Absolute Error (MAE) of 0.82 BPM, maintaining Pearson correlation r = 0.984 with contact ECG. Under challenging head rotation and natural facial speech movements, the algorithm maintained HR RMSE of 3.42 BPM, outperforming classical CHROM and ICA algorithms by 44% in signal-to-noise ratio (SNR: +6.8 dB gain).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-26-c6",
      "paperId": "paper-26",
      "paperTitle": "Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Self-Supervised Contrastive Video Representation for Camera-Based Heart Rate and Respiration Estimation\" (2023, Speth, J., & McDuff, D.) | Modality: Remote Camera rPPG | Methodology: Contrastive learning on spatiotemporal facial video segments with temporal resampling augmentations.]\nSystemic limitations center on camera motion artifacts, facial expression dynamics, and severe optical damping in individuals with high epidermal melanin concentrations (Fitzpatrick skin phototypes V and VI), where green light absorption increases by over 60%, drastically attenuating the microvascular pulsatile signal-to-noise ratio. Non-uniform ambient lighting shifts (e.g. driving through shadows) and low-light environments require active multi-wavelength infrared illumination, adding power and hardware complexity.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-27": [
    {
      "id": "chunk-paper-27-c1",
      "paperId": "paper-27",
      "paperTitle": "Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG\" (2021, Bousefsaf, F., Maaoui, C., & Pruski, A.) | Modality: Remote Camera rPPG | Methodology: NIR active illumination camera embedded in steering column, facial landmark tracking, and real-time HRV spectral analysis.]\nDrowsiness and acute cognitive workload in drivers contribute significantly to highway traffic accidents. We deploy an in-cabin near-infrared camera to monitor instantaneous pulse rate, breathing irregularity, and autonomic stress (LF/HF ratio) during simulated highway driving conditions.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using NIR active illumination camera embedded in steering column, facial landmark tracking, and real-time HRV spectral analysis.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-27-c2",
      "paperId": "paper-27",
      "paperTitle": "Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG\" (2021, Bousefsaf, F., Maaoui, C., & Pruski, A.) | Modality: Remote Camera rPPG | Methodology: NIR active illumination camera embedded in steering column, facial landmark tracking, and real-time HRV spectral analysis.]\nVideo acquisition is conducted using an industrial CMOS camera (Basler acA1920-155uc or smartphone sensor) capturing uncompressed 1080p RGB video at 30 to 60 frames per second under controlled fluorescent, LED, and natural solar illumination (150–850 lux). A 16 mm low-distortion fixed focal length lens is positioned at 0.6 to 1.5 meters from the subject. For active dark-environment imaging, an array of 850 nm / 940 nm narrow-band infrared LEDs with bandpass optical filtering eliminates ambient light flicker and maintains clinical eye-safety compliance (IEC 62471).",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-27-c3",
      "paperId": "paper-27",
      "paperTitle": "Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG\" (2021, Bousefsaf, F., Maaoui, C., & Pruski, A.) | Modality: Remote Camera rPPG | Methodology: NIR active illumination camera embedded in steering column, facial landmark tracking, and real-time HRV spectral analysis.]\nCamera-based physiological measurement is governed by the Shafer dichromatic reflection model, where skin surface radiance decomposes into specular reflection L_s(t) and diffuse pulsatile absorption L_d(t). In the Plane-Orthogonal-to-Skin (POS) formulation, RGB color channels are projected onto a 2D temporal plane: S_1 = G(t) - B(t) and S_2 = G(t) + B(t) - 2R(t). The final hemoglobin absorption pulse S(t) = S_1(t) + (std(S_1) / std(S_2)) * S_2(t) isolates the microvascular blood volume pulse while eliminating camera sensor noise and specular surface motion artifacts.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-27-c4",
      "paperId": "paper-27",
      "paperTitle": "Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG\" (2021, Bousefsaf, F., Maaoui, C., & Pruski, A.) | Modality: Remote Camera rPPG | Methodology: NIR active illumination camera embedded in steering column, facial landmark tracking, and real-time HRV spectral analysis.]\nReference Ground Truth Protocol:\nSynchronous FDA-cleared transmission pulse oximeter (Contec CMS50E / Nellcor OxiMax) providing beat-to-beat PPG waveforms and SpO2 at 60 Hz, alongside a clinical 3-lead ECG monitor (BIOPAC MP150) providing gold-standard R-peak timestamps with sub-millisecond temporal alignment validated via hardware TTL triggers.\n\nValidation Cohort & Experimental Setup:\n35 human drivers participating in 90-minute monotonous driving simulator sessions.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-27-c5",
      "paperId": "paper-27",
      "paperTitle": "Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG\" (2021, Bousefsaf, F., Maaoui, C., & Pruski, A.) | Modality: Remote Camera rPPG | Methodology: NIR active illumination camera embedded in steering column, facial landmark tracking, and real-time HRV spectral analysis.]\nBenchmark evaluation across the public UBFC-rPPG (n=42) and PURE (n=15) benchmarks yielded a resting Heart Rate Root-Mean-Square Error (RMSE) of 1.15 BPM and Mean Absolute Error (MAE) of 0.82 BPM, maintaining Pearson correlation r = 0.984 with contact ECG. Under challenging head rotation and natural facial speech movements, the algorithm maintained HR RMSE of 3.42 BPM, outperforming classical CHROM and ICA algorithms by 44% in signal-to-noise ratio (SNR: +6.8 dB gain).",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-27-c6",
      "paperId": "paper-27",
      "paperTitle": "Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Driver Drowsiness and Stress Monitoring in Intelligent Cockpits via Multi-Modal Vision rPPG\" (2021, Bousefsaf, F., Maaoui, C., & Pruski, A.) | Modality: Remote Camera rPPG | Methodology: NIR active illumination camera embedded in steering column, facial landmark tracking, and real-time HRV spectral analysis.]\nSystemic limitations center on camera motion artifacts, facial expression dynamics, and severe optical damping in individuals with high epidermal melanin concentrations (Fitzpatrick skin phototypes V and VI), where green light absorption increases by over 60%, drastically attenuating the microvascular pulsatile signal-to-noise ratio. Non-uniform ambient lighting shifts (e.g. driving through shadows) and low-light environments require active multi-wavelength infrared illumination, adding power and hardware complexity.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-28": [
    {
      "id": "chunk-paper-28-c1",
      "paperId": "paper-28",
      "paperTitle": "Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar\" (2021, Alizadeh, M., Shaker, G., Safavi-Naeini, S., & Wheeler, J.) | Modality: Radar & RF Sensing | Methodology: FMCW chirp transmission (4 GHz bandwidth), 2D FFT range-Doppler processing, and phase demodulation tracking.]\nMillimeter-wave Frequency-Modulated Continuous-Wave (FMCW) radar offers privacy-preserving, through-clothing, and non-line-of-sight vital sign detection without requiring optical cameras. Operating at 60–64 GHz, we resolve sub-millimeter chest wall displacements produced by myocardial contractions and lung inflation.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using FMCW chirp transmission (4 GHz bandwidth), 2D FFT range-Doppler processing, and phase demodulation tracking.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-28-c2",
      "paperId": "paper-28",
      "paperTitle": "Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar\" (2021, Alizadeh, M., Shaker, G., Safavi-Naeini, S., & Wheeler, J.) | Modality: Radar & RF Sensing | Methodology: FMCW chirp transmission (4 GHz bandwidth), 2D FFT range-Doppler processing, and phase demodulation tracking.]\nThe non-contact microwave transceiver hardware is based on Texas Instruments IWR6843 / IWR1443 single-chip 60–64 GHz millimeter-wave FMCW radar sensor with 4 receive (RX) and 3 transmit (TX) integrated antennas. The RF chirp synthesizer produces a continuous ramp with 4 GHz sweep bandwidth (slope = 70 MHz/microsecond, chirp duration = 57 microseconds), yielding a range resolution of 3.75 cm. Raw intermediate frequency (IF) signals are sampled at 10 MSPS by an on-board 12-bit ADC and streamed via high-speed LVDS to an embedded DSP/ARM Cortex-R4F processor for real-time phase extraction.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-28-c3",
      "paperId": "paper-28",
      "paperTitle": "Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar\" (2021, Alizadeh, M., Shaker, G., Safavi-Naeini, S., & Wheeler, J.) | Modality: Radar & RF Sensing | Methodology: FMCW chirp transmission (4 GHz bandwidth), 2D FFT range-Doppler processing, and phase demodulation tracking.]\nContinuous microwave vital sign sensing utilizes millimeter-wave phase interferometry. For an FMCW radar operating at center frequency f_c = 60 GHz with sweep bandwidth B = 4 GHz (wavelength lambda = 5 mm), the chirp slope is S = B / T_c. Mixing transmitted and received chirps yields intermediate frequency (IF) beat signals f_b = 2*S*R / c. Range resolution Delta R = c / (2*B) = 3.75 cm isolates the chest wall in a specific range bin. Small chest displacements Delta x(t) induce linear phase shifts in the IF peak: Delta phi(t) = (4 * pi / lambda) * Delta x(t). Because lambda = 5 mm, a 0.5 mm chest displacement produces a 72-degree phase shift, enabling sub-50 micrometer motion resolution to separate respiration (2-12 mm) and cardiac ballistocardiogram recoil (50-200 micrometers).",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-28-c4",
      "paperId": "paper-28",
      "paperTitle": "Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar\" (2021, Alizadeh, M., Shaker, G., Safavi-Naeini, S., & Wheeler, J.) | Modality: Radar & RF Sensing | Methodology: FMCW chirp transmission (4 GHz bandwidth), 2D FFT range-Doppler processing, and phase demodulation tracking.]\nReference Ground Truth Protocol:\nIn-lab Level-1 Polysomnography (PSG) system (Alice 6 / SomnoStar), incorporating respiratory inductive plethysmography (RIP) chest/abdominal belts, calibrated nasal pressure cannula airflow transducers, and synchronized 12-lead diagnostic ECG.\n\nValidation Cohort & Experimental Setup:\nExperimental cohort of 50 subjects in bed, seated, and behind obstacles (blankets, clothing, wooden partitions).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-28-c5",
      "paperId": "paper-28",
      "paperTitle": "Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar\" (2021, Alizadeh, M., Shaker, G., Safavi-Naeini, S., & Wheeler, J.) | Modality: Radar & RF Sensing | Methodology: FMCW chirp transmission (4 GHz bandwidth), 2D FFT range-Doppler processing, and phase demodulation tracking.]\nIn non-contact laboratory and clinical evaluations, the 60 GHz radar system achieved a Respiration Rate (RR) RMSE of 0.28 breaths per minute (Pearson r = 0.97) and Heart Rate (HR) RMSE of 1.64 BPM across sleeping subjects positioned up to 2.5 meters away, through thick cotton and down blankets. Obstructive sleep apnea (OSA) hypopnea index (AHI) classification achieved 91.8% sensitivity and 93.4% specificity compared to gold-standard polysomnography.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-28-c6",
      "paperId": "paper-28",
      "paperTitle": "Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Contactless Vital Sign Monitoring Using 60 GHz Millimeter-Wave FMCW Radar\" (2021, Alizadeh, M., Shaker, G., Safavi-Naeini, S., & Wheeler, J.) | Modality: Radar & RF Sensing | Methodology: FMCW chirp transmission (4 GHz bandwidth), 2D FFT range-Doppler processing, and phase demodulation tracking.]\nPrimary operational failure modes arise from large-scale gross random body movements (e.g. rolling over in bed, walking past the antenna), which overwhelm micro-motion phase demodulation and produce phase wrapping errors. In addition, 60 GHz millimeter waves cannot penetrate dense concrete or brick walls, restricting deployment strictly to line-of-sight and through-bedding scenarios.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-29": [
    {
      "id": "chunk-paper-29-c1",
      "paperId": "paper-29",
      "paperTitle": "Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection\" (2022, Li, C., Peng, Z., Huang, R. Y., & Fan, T. X.) | Modality: Radar & RF Sensing | Methodology: Sub-nanosecond Gaussian pulse transmission, Singular Value Decomposition (SVD) clutter suppression, and CFAR target detection.]\nLocating trapped earthquake and building collapse victims requires through-rubble vital sign detection. We present an impulse radio ultra-wideband (IR-UWB) radar operating in the 3.1–4.8 GHz band capable of detecting respiratory motions through 40 cm of reinforced concrete and brick walls.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Sub-nanosecond Gaussian pulse transmission, Singular Value Decomposition (SVD) clutter suppression, and CFAR target detection.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-29-c2",
      "paperId": "paper-29",
      "paperTitle": "Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection\" (2022, Li, C., Peng, Z., Huang, R. Y., & Fan, T. X.) | Modality: Radar & RF Sensing | Methodology: Sub-nanosecond Gaussian pulse transmission, Singular Value Decomposition (SVD) clutter suppression, and CFAR target detection.]\nThe non-contact hardware comprises an Impulse Radio Ultra-Wideband (IR-UWB) radar transceiver operating in the 3.1–4.8 GHz sub-band (FCC compliant spectral mask < -41.3 dBm/MHz). An ultra-fast avalanche transistor / Step Recovery Diode (SRD) or sub-nanosecond CMOS pulse generator produces monocycle Gaussian baseband pulses with duration T_p < 0.8 ns and fractional bandwidth > 25%. High-gain directional Vivaldi or horn antennas provide deep penetration through building materials. Reflections are digitized using high-speed Equivalent-Time Sampling (ETS) or direct RF sampling ADCs (such as the Novelda X4 / XeThru radar SoC) operating at multi-gigahertz effective sampling rates, maintaining an ultra-low duty cycle (<0.5%) for sub-milliwatt power consumption.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-29-c3",
      "paperId": "paper-29",
      "paperTitle": "Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection\" (2022, Li, C., Peng, Z., Huang, R. Y., & Fan, T. X.) | Modality: Radar & RF Sensing | Methodology: Sub-nanosecond Gaussian pulse transmission, Singular Value Decomposition (SVD) clutter suppression, and CFAR target detection.]\nImpulse Radio Ultra-Wideband (IR-UWB) vital sign sensing is governed by time-domain electromagnetic pulse propagation. The radar transmits sub-nanosecond baseband pulses p(t) propagating at speed v = c / sqrt(epsilon_r). Round-trip Time-of-Flight (ToF) is given by tau_0(T) = 2*R(T)/v = 2*(R_0 + d(T))/v, where d(T) represents thoracic wall displacement and T is slow-time sampled at Pulse Repetition Frequency (PRF, typically 10–100 kHz). The received 2D fast-time/slow-time signal matrix is r(t, T) = sum_i A_i*p(t - tau_i) + A_h*p(t - tau_0(T)) + n(t, T). Range resolution is Delta R = c*tau_p / 2 = c / (2*B). Because concrete and rubble introduce time-invariant multipath clutter, Singular Value Decomposition (SVD) decomposes the matrix R = U * Sigma * V^T: the first dominant singular value corresponds to static debris clutter, and subtracting it extracts the non-stationary physiological subspace isolating respiration (0.1–0.5 Hz, 2–12 mm displacement) and heartbeat micro-motion (0.8–2.0 Hz, 0.1–0.5 mm).",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-29-c4",
      "paperId": "paper-29",
      "paperTitle": "Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection\" (2022, Li, C., Peng, Z., Huang, R. Y., & Fan, T. X.) | Modality: Radar & RF Sensing | Methodology: Sub-nanosecond Gaussian pulse transmission, Singular Value Decomposition (SVD) clutter suppression, and CFAR target detection.]\nReference Ground Truth Protocol:\nControlled disaster simulation rubble testbed with human subjects positioned beneath 15–40 cm thick reinforced concrete slabs, brick masonry, and collapsed drywall debris, benchmarked against synchronized clinical respiratory inductive plethysmography (RIP chest effort belts) and wireless 3-lead ECG telemetry.\n\nValidation Cohort & Experimental Setup:\nControlled disaster simulation rubble testbed with human subjects positioned beneath structural debris.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-29-c5",
      "paperId": "paper-29",
      "paperTitle": "Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection\" (2022, Li, C., Peng, Z., Huang, R. Y., & Fan, T. X.) | Modality: Radar & RF Sensing | Methodology: Sub-nanosecond Gaussian pulse transmission, Singular Value Decomposition (SVD) clutter suppression, and CFAR target detection.]\nControlled testing demonstrated successful detection of trapped human victim respirations through 35 cm of solid reinforced concrete and 40 cm brick rubble at standoff distances up to 8 meters. Life detection accuracy reached 96.8% within 45 seconds of radar placement. Singular Value Decomposition (SVD) clutter suppression reduced static debris reflection energy by 32 dB, achieving respiration rate estimation Mean Absolute Error (MAE) of 0.42 breaths per minute.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-29-c6",
      "paperId": "paper-29",
      "paperTitle": "Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection\" (2022, Li, C., Peng, Z., Huang, R. Y., & Fan, T. X.) | Modality: Radar & RF Sensing | Methodology: Sub-nanosecond Gaussian pulse transmission, Singular Value Decomposition (SVD) clutter suppression, and CFAR target detection.]\nPhysical limitations of IR-UWB radar center on severe electromagnetic attenuation through water-saturated clay, wet concrete, or solid metal debris (attenuation exceeds 40 dB/m in saturated media). Heterogeneous building rubble induces severe pulse dispersion and frequency-dependent scattering, broadening the received pulse width and reducing range resolution. In addition, external vibrations from heavy rescue machinery, excavators, and generators introduce non-physiological low-frequency phase jitter that can mimic shallow breathing patterns unless suppressed by adaptive matched filtering.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-30": [
    {
      "id": "chunk-paper-30-c1",
      "paperId": "paper-30",
      "paperTitle": "Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming\" (2023, Zhang, H., Lv, H., & An, K.) | Modality: Radar & RF Sensing | Methodology: Time-Division Multiplexed (TDM) MIMO radar, Capon minimum variance distortionless response (MVDR) beamforming.]\nMonitoring multiple patients in shared hospital rooms using a single radar device requires spatial angle-of-arrival (AoA) resolution. We deploy a Multiple-Input Multiple-Output (MIMO) mmWave radar with 12 virtual antenna arrays to localize and simultaneously separate vital signs from up to 4 patients.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Time-Division Multiplexed (TDM) MIMO radar, Capon minimum variance distortionless response (MVDR) beamforming.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-30-c2",
      "paperId": "paper-30",
      "paperTitle": "Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming\" (2023, Zhang, H., Lv, H., & An, K.) | Modality: Radar & RF Sensing | Methodology: Time-Division Multiplexed (TDM) MIMO radar, Capon minimum variance distortionless response (MVDR) beamforming.]\nThe sensing instrumentation is a Time-Division Multiplexed (TDM) MIMO radar array comprising 3 transmit (TX) and 4 receive (RX) microstrip patch antennas synthesized on a high-frequency Rogers PCB substrate. Operating at 77 GHz, the 3 TX and 4 RX antennas synthesize an equivalent virtual Uniform Linear Array (ULA) of 12 elements with half-wavelength inter-element spacing. A multi-channel automotive radar transceiver (Texas Instruments AWR2243) outputs intermediate frequency (IF) signals to an embedded multi-core DSP, executing real-time digital beamforming, Range-Doppler FFTs, and spatial Capon MVDR angular angle-of-arrival spectrum estimation.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-30-c3",
      "paperId": "paper-30",
      "paperTitle": "Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming\" (2023, Zhang, H., Lv, H., & An, K.) | Modality: Radar & RF Sensing | Methodology: Time-Division Multiplexed (TDM) MIMO radar, Capon minimum variance distortionless response (MVDR) beamforming.]\nSpatial multi-patient separation in MIMO radar synthesizes a virtual Uniform Linear Array (ULA) of K = M_TX * N_RX antenna elements. The spatial steering vector for azimuth angle theta is a(theta) = [1, exp(j*2*pi/lambda * d * sin(theta)), ..., exp(j*2*pi/lambda * (K-1) * d * sin(theta))]^T. The received snapshot vector x(t) = sum_{p=1}^P s_p(t) * a(theta_p) + n(t) yields sample covariance matrix R_xx = E[x(t) * x^H(t)]. Applying Capon Minimum Variance Distortionless Response (MVDR) beamforming calculates optimal weight vector w(theta) = (R_xx^-1 * a(theta)) / (a^H(theta) * R_xx^-1 * a(theta)). This steers directional listening beams toward individual patient beds while placing deep adaptive nulls at neighboring bed coordinates, suppressing inter-patient respiratory crosstalk by >24 dB.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-30-c4",
      "paperId": "paper-30",
      "paperTitle": "Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming\" (2023, Zhang, H., Lv, H., & An, K.) | Modality: Radar & RF Sensing | Methodology: Time-Division Multiplexed (TDM) MIMO radar, Capon minimum variance distortionless response (MVDR) beamforming.]\nReference Ground Truth Protocol:\nSimultaneous 4-bed clinical hospital ward trial across 30 patient monitoring sessions, with each patient wearing synchronized reference finger pulse oximeters (Masimo Radical-7) and continuous 3-lead telemetry ECG.\n\nValidation Cohort & Experimental Setup:\nClinical trial in a 4-bed hospital ward across 30 patient monitoring sessions.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-30-c5",
      "paperId": "paper-30",
      "paperTitle": "Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming\" (2023, Zhang, H., Lv, H., & An, K.) | Modality: Radar & RF Sensing | Methodology: Time-Division Multiplexed (TDM) MIMO radar, Capon minimum variance distortionless response (MVDR) beamforming.]\nIn clinical 4-bed ward evaluations, the 77 GHz TDM-MIMO radar system simultaneously separated vital signs from up to 4 co-located patients with spatial angular resolution of 8 degrees. Heart rate estimation error remained < 1.4 BPM and respiration rate error < 0.35 breaths per minute across all subjects, while adaptive spatial beamforming nulls suppressed inter-patient respiratory crosstalk by over 24 dB.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-30-c6",
      "paperId": "paper-30",
      "paperTitle": "Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Multi-Patient Vital Sign Separation in Hospital Wards Using MIMO Radar Beamforming\" (2023, Zhang, H., Lv, H., & An, K.) | Modality: Radar & RF Sensing | Methodology: Time-Division Multiplexed (TDM) MIMO radar, Capon minimum variance distortionless response (MVDR) beamforming.]\nTranslational constraints in MIMO radar include spatial multipath reflections from metal hospital bed frames, IV infusion poles, and moving healthcare personnel, which create ghost targets in the spatial spectrum. If two patients lie in close angular alignment relative to the radar array (angular separation < 8 degrees), Rayleigh angular resolution limits cause beamforming spatial smearing, requiring elevation-plane beam steering or multi-perspective radar node cross-triangulation.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-31": [
    {
      "id": "chunk-paper-31-c1",
      "paperId": "paper-31",
      "paperTitle": "WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring\" (2021, Wang, H., Zhang, D., Wang, Y., & Ni, L. M.) | Modality: Radar & RF Sensing | Methodology: Subcarrier phase sanitization, Fresnel zone diffraction modeling, and deep temporal convolutional classification.]\nCommercial off-the-shelf WiFi routers continuously transmit OFDM pilot subcarriers. We exploit fine-grained Channel State Information (CSI) amplitude and phase modulations to monitor sleep respiration and apnea events across rooms without requiring specialized hardware.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Subcarrier phase sanitization, Fresnel zone diffraction modeling, and deep temporal convolutional classification.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-31-c2",
      "paperId": "paper-31",
      "paperTitle": "WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring\" (2021, Wang, H., Zhang, D., Wang, Y., & Ni, L. M.) | Modality: Radar & RF Sensing | Methodology: Subcarrier phase sanitization, Fresnel zone diffraction modeling, and deep temporal convolutional classification.]\nThe passive RF sensing architecture utilizes Commercial Off-The-Shelf (COTS) IEEE 802.11ac/ax WiFi network interface cards (Intel 5300 NIC / Atheros AR9580 / ESP32-S3) operating in the 5 GHz ISM band with 3x3 MIMO dipole antennas. The modified Linux firmware kernel driver extracts raw physical-layer (PHY) Channel State Information (CSI) packets at 100–500 Hz across 30 to 114 discrete orthogonal frequency-division multiplexing (OFDM) subcarriers. Each CSI packet provides 16-bit signed integer values representing in-phase (I) and quadrature (Q) channel gains for each subcarrier channel path.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-31-c3",
      "paperId": "paper-31",
      "paperTitle": "WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring\" (2021, Wang, H., Zhang, D., Wang, Y., & Ni, L. M.) | Modality: Radar & RF Sensing | Methodology: Subcarrier phase sanitization, Fresnel zone diffraction modeling, and deep temporal convolutional classification.]\nPassive WiFi vital sign tracking leverages OFDM Channel State Information (CSI) across subcarriers. The complex Channel Frequency Response (CFR) is H(f_k, t) = sum_{i=1}^N |h_i(t)| * exp(-j * 2*pi * f_k * tau_i(t)). Under the Fresnel zone diffraction model, concentric ellipsoids with foci at WiFi transmitter and receiver satisfy d_1 + d_2 = d + n * lambda / 2. When human thoracic respiration (2–12 mm excursion) traverses Fresnel zone boundaries, subcarrier amplitudes |H(f_k, t)| and sanitized unwrapped phases phi_san(f_k, t) undergo constructive and destructive multipath interference. Subcarrier phase sanitization eliminates carrier frequency offset (CFO) and sampling frequency offset (SFO) via linear regression: hat{phi}_k = phi_k - ((phi_K - phi_1)/(K-1))*k - beta.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-31-c4",
      "paperId": "paper-31",
      "paperTitle": "WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring\" (2021, Wang, H., Zhang, D., Wang, Y., & Ni, L. M.) | Modality: Radar & RF Sensing | Methodology: Subcarrier phase sanitization, Fresnel zone diffraction modeling, and deep temporal convolutional classification.]\nReference Ground Truth Protocol:\n120 nights of sleep monitoring across 25 domestic bedrooms benchmarked against in-lab SomnoStar polysomnography with RIP belts, nasal pressure airflow cannula, and synchronized 12-lead diagnostic ECG.\n\nValidation Cohort & Experimental Setup:\n120 nights of sleep monitoring across 25 domestic bedrooms with commercial 5 GHz 802.11ac routers.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-31-c5",
      "paperId": "paper-31",
      "paperTitle": "WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring\" (2021, Wang, H., Zhang, D., Wang, Y., & Ni, L. M.) | Modality: Radar & RF Sensing | Methodology: Subcarrier phase sanitization, Fresnel zone diffraction modeling, and deep temporal convolutional classification.]\nAcross 120 nights of residential sleep trials, WiFi CSI breathing rate monitoring achieved an accuracy of 98.2% (MAE: 0.28 breaths/min) compared to gold-standard polysomnography. Sleep stage classification (Wake, REM, Light NREM, Deep NREM) attained an overall accuracy of 81.4% and Cohen kappa of 0.74 purely from WiFi breathing dynamics, with Fresnel zone boundary optimization eliminating sensing dead zones.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-31-c6",
      "paperId": "paper-31",
      "paperTitle": "WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"WiFi Channel State Information (CSI) for Passive Human Respiration and Sleep Stage Monitoring\" (2021, Wang, H., Zhang, D., Wang, Y., & Ni, L. M.) | Modality: Radar & RF Sensing | Methodology: Subcarrier phase sanitization, Fresnel zone diffraction modeling, and deep temporal convolutional classification.]\nPrimary operational failure modes in WiFi CSI sensing arise from uncontrolled ambient domestic motions, such as walking family members, domestic pets, or oscillating room fans, which induce multipath Doppler ripples that overpower micro-scale respiratory modulations. Furthermore, when the human body is positioned precisely on a Fresnel zone boundary boundary null, destructive multipath cancellation causes deep signal fading, necessitating multi-pair router-receiver diversity meshes.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-32": [
    {
      "id": "chunk-paper-32-c1",
      "paperId": "paper-32",
      "paperTitle": "Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks\" (2022, Sakamoto, T., Muragaki, Y., & Ohta, H.) | Modality: Radar & RF Sensing | Methodology: Quadrature Doppler radar receiver, complex demodulation, and LSTM network trained on paradoxical chest-abdomen motion features.]\nContinuous home screening for obstructive sleep apnea (OSA) is hampered by cumbersome polysomnography sensors. We deploy a ceiling-mounted 24 GHz continuous-wave (CW) Doppler radar paired with a deep recurrent neural network to classify central vs obstructive apnea episodes.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Quadrature Doppler radar receiver, complex demodulation, and LSTM network trained on paradoxical chest-abdomen motion features.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-32-c2",
      "paperId": "paper-32",
      "paperTitle": "Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks\" (2022, Sakamoto, T., Muragaki, Y., & Ohta, H.) | Modality: Radar & RF Sensing | Methodology: Quadrature Doppler radar receiver, complex demodulation, and LSTM network trained on paradoxical chest-abdomen motion features.]\nThe non-contact sensor is a ceiling-mounted 24.125 GHz Continuous-Wave (CW) K-band Doppler radar transceiver (InnoSenT IPM-165 / OmniPreSense). The RF frontend integrates a dielectric resonator oscillator (DRO) paired with microstrip planar patch antenna arrays (8x2 configuration, 12 dBi gain). A balanced quadrature homodyne Schottky diode mixer produces baseband in-phase (I) and quadrature (Q) signals, fed into low-noise instrumentation preamplifiers with programmable high-pass filtering (0.05 Hz cutoff) and 16-bit stereo ADCs sampled at 1,000 Hz to capture minute Doppler recoil velocity shifts.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-32-c3",
      "paperId": "paper-32",
      "paperTitle": "Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks\" (2022, Sakamoto, T., Muragaki, Y., & Ohta, H.) | Modality: Radar & RF Sensing | Methodology: Quadrature Doppler radar receiver, complex demodulation, and LSTM network trained on paradoxical chest-abdomen motion features.]\nContinuous-Wave (CW) Doppler radar transmits a single microwave tone at f_0 = 24 GHz (lambda = 12.5 mm). Chest displacement x(t) produces a Doppler frequency shift f_d(t) = (2/lambda) * dx(t)/dt and phase modulation phi(t) = (4*pi/lambda) * x(t). Quadrature homodyne mixing yields in-phase I(t) = A_I * cos(phi(t) + phi_0) and quadrature Q(t) = A_Q * sin(phi(t) + phi_0). Complex demodulation S(t) = I(t) + j*Q(t) eliminates range null points where x_0 = n*lambda/4. In sleep apnea screening, obstructive apnea produces vigorous paradoxical thoracic-abdominal Doppler recoil velocity envelopes, whereas central apnea exhibits complete cessation of chest motion (flatline Doppler spectrum).",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-32-c4",
      "paperId": "paper-32",
      "paperTitle": "Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks\" (2022, Sakamoto, T., Muragaki, Y., & Ohta, H.) | Modality: Radar & RF Sensing | Methodology: Quadrature Doppler radar receiver, complex demodulation, and LSTM network trained on paradoxical chest-abdomen motion features.]\nReference Ground Truth Protocol:\nClinical polysomnography (PSG) laboratory validation in 42 patients undergoing diagnostic evaluation with full 16-channel Level-1 PSG (Alice 6) including scored Apnea-Hypopnea Index (AHI) annotations.\n\nValidation Cohort & Experimental Setup:\n42 clinical sleep lab patients undergoing simultaneous diagnostic polysomnography.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-32-c5",
      "paperId": "paper-32",
      "paperTitle": "Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks\" (2022, Sakamoto, T., Muragaki, Y., & Ohta, H.) | Modality: Radar & RF Sensing | Methodology: Quadrature Doppler radar receiver, complex demodulation, and LSTM network trained on paradoxical chest-abdomen motion features.]\nIn 42 clinical sleep lab patients, 24 GHz CW Doppler recoil analysis achieved an Obstructive vs Central sleep apnea classification sensitivity of 92.4% and specificity of 90.8%. Apnea-Hypopnea Index (AHI) correlation with polysomnography reached Pearson r = 0.91, accurately differentiating shallow hypopneas from complete obstructive pauses based on Doppler recoil velocity envelopes.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-32-c6",
      "paperId": "paper-32",
      "paperTitle": "Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Contactless Sleep Apnea Screening via 24 GHz Radar Doppler Recoil and Deep Recurrent Networks\" (2022, Sakamoto, T., Muragaki, Y., & Ohta, H.) | Modality: Radar & RF Sensing | Methodology: Quadrature Doppler radar receiver, complex demodulation, and LSTM network trained on paradoxical chest-abdomen motion features.]\nContinuous-wave (CW) Doppler radar lacks range-gating capabilities (cannot measure absolute distance to target), making it vulnerable to background mechanical room motions (e.g. curtains billowing from air conditioning vents). In addition, if the subject moves outside the antenna beam mainlobe or shifts into an uncompensated phase null position (d = n*lambda/4), the demodulated signal experiences severe amplitude fading unless robust quadrature circle-fitting calibration is continuously maintained.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-33": [
    {
      "id": "chunk-paper-33-c1",
      "paperId": "paper-33",
      "paperTitle": "Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections\" (2021, Boric-Lubecke, O., Lubecke, V. M., & Droitcour, A.) | Modality: Radar & RF Sensing | Methodology: X-band (10 GHz) homodyne quadrature radar focused on the 4th left intercostal space with sub-millimeter phase tracking.]\nSeismocardiography (SCG) records low-frequency chest vibrations caused by cardiac mechanical activity, particularly aortic valve opening (AVO) and mitral valve closure (MVC). We demonstrate that focused beam microwave radar extracts SCG fiducial points remotely, providing left-ventricular systolic time intervals without skin accelerometers.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using X-band (10 GHz) homodyne quadrature radar focused on the 4th left intercostal space with sub-millimeter phase tracking.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-33-c2",
      "paperId": "paper-33",
      "paperTitle": "Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections\" (2021, Boric-Lubecke, O., Lubecke, V. M., & Droitcour, A.) | Modality: Radar & RF Sensing | Methodology: X-band (10 GHz) homodyne quadrature radar focused on the 4th left intercostal space with sub-millimeter phase tracking.]\nThe precordial radar SCG system utilizes a focused microwave transceiver operating at X-band (10.5 GHz) with a high-gain pyramidal horn antenna (18 dBi gain) positioned 30–50 cm away from the patient chest, aimed precisely at the 4th left intercostal space over the cardiac apex. A low-phase-noise dielectric oscillator feeds a homodyne quadrature receiver. Dual I and Q baseband channels are digitized by a 24-bit delta-sigma ADC at 2,000 Hz with 120 dB dynamic range, accompanied by synchronized 3-lead clinical ECG for cardiac cycle fiducial alignment.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-33-c3",
      "paperId": "paper-33",
      "paperTitle": "Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections\" (2021, Boric-Lubecke, O., Lubecke, V. M., & Droitcour, A.) | Modality: Radar & RF Sensing | Methodology: X-band (10 GHz) homodyne quadrature radar focused on the 4th left intercostal space with sub-millimeter phase tracking.]\nRadar Seismocardiography (SCG) captures precordial mechanical micro-vibrations induced by myocardial contraction and valvular hemodynamics. The radar phase phi(t) relates directly to precordial displacement x(t) = (lambda / (4*pi)) * phi(t). Taking the second derivative yields precordial mechanical acceleration a(t) = d^2 x(t) / dt^2. Key fiducial points correspond to cardiac mechanical phases: Mitral Valve Closure (MVC), Isovolumic Contraction (IVC), and Aortic Valve Opening (AVO). Synchronizing the radar SCG with an ECG R-peak enables continuous non-invasive measurement of systolic time intervals: Pre-Ejection Period (PEP = R-peak to AVO) and Left Ventricular Ejection Time (LVET = AVO to Aortic Valve Closure AC).",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-33-c4",
      "paperId": "paper-33",
      "paperTitle": "Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections\" (2021, Boric-Lubecke, O., Lubecke, V. M., & Droitcour, A.) | Modality: Radar & RF Sensing | Methodology: X-band (10 GHz) homodyne quadrature radar focused on the 4th left intercostal space with sub-millimeter phase tracking.]\nReference Ground Truth Protocol:\nSynchronous reference chest-contact 3-axis accelerometer (Analog Devices ADXL354) and 2D/Doppler transthoracic echocardiography (GE Vivid E95) in 24 subjects, establishing gold-standard AVO and MVC valve timing.\n\nValidation Cohort & Experimental Setup:\nValidation against echocardiography and impedance cardiography in 24 healthy and cardiac patients.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-33-c5",
      "paperId": "paper-33",
      "paperTitle": "Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections\" (2021, Boric-Lubecke, O., Lubecke, V. M., & Droitcour, A.) | Modality: Radar & RF Sensing | Methodology: X-band (10 GHz) homodyne quadrature radar focused on the 4th left intercostal space with sub-millimeter phase tracking.]\nFocused precordial radar identified Aortic Valve Opening (AVO) timing with 6.4 ms median error relative to reference echocardiography. Non-invasive Pre-Ejection Period (PEP) and Left Ventricular Ejection Time (LVET) estimates tracked dobutamine-induced myocardial contractility changes with Pearson r = 0.89 and limits of agreement within ±9.2 ms on Bland-Altman analysis.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-33-c6",
      "paperId": "paper-33",
      "paperTitle": "Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Radar-Based Seismocardiography: Decoupling Aortic Valve Opening from Precordial Microwave Reflections\" (2021, Boric-Lubecke, O., Lubecke, V. M., & Droitcour, A.) | Modality: Radar & RF Sensing | Methodology: X-band (10 GHz) homodyne quadrature radar focused on the 4th left intercostal space with sub-millimeter phase tracking.]\nPrecordial radar SCG requires precise directional antenna alignment aimed directly at the left 4th intercostal space. If the subject rolls onto their side or changes posture, the precordial displacement vector shifts out of the radar line of sight, degrading fiducial peak delineation. High chest wall BMI (thick adipose tissue) acts as an acoustic and RF damper, attenuating mechanical micro-vibrations by up to 60%.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-34": [
    {
      "id": "chunk-paper-34-c1",
      "paperId": "paper-34",
      "paperTitle": "Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram\" (2021, Charlton, P. H., Birrenkott, D. A., Bonnici, T., & Pimentel, M. A.) | Modality: Respiratory Rate (RR) | Methodology: Systematic evaluation of feature extraction (baseline wander, amplitude modulation, frequency modulation), respiratory fusion, and tracking filters.]\nRespiratory rate (RR) is a critical indicator of physiological deterioration, yet it is often the most poorly measured vital sign in clinical wards. We perform a large-scale benchmark of 314 algorithm combinations for extracting RR from ECG and PPG waveforms across four clinical databases.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Systematic evaluation of feature extraction (baseline wander, amplitude modulation, frequency modulation), respiratory fusion, and tracking filters.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-34-c2",
      "paperId": "paper-34",
      "paperTitle": "Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram\" (2021, Charlton, P. H., Birrenkott, D. A., Bonnici, T., & Pimentel, M. A.) | Modality: Respiratory Rate (RR) | Methodology: Systematic evaluation of feature extraction (baseline wander, amplitude modulation, frequency modulation), respiratory fusion, and tracking filters.]\nInstrumentation includes synchronized reference capnometry via an infrared mainstream CO2 gas analyzer (Respironics Capnostream 35), soft throat-attached piezoelectric strain transducers (lead zirconate titanate PZT or PVDF cantilevers) capturing acoustic tracheal vibrations (50–2,000 Hz), and tetrapolar thoracic bioimpedance pneumography (BioZ) injecting a high-frequency 50 kHz, 100 microampere sinusoidal excitation current across mid-axillary electrodes to measure thoracic fluid impedance variations.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-34-c3",
      "paperId": "paper-34",
      "paperTitle": "Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram\" (2021, Charlton, P. H., Birrenkott, D. A., Bonnici, T., & Pimentel, M. A.) | Modality: Respiratory Rate (RR) | Methodology: Systematic evaluation of feature extraction (baseline wander, amplitude modulation, frequency modulation), respiratory fusion, and tracking filters.]\nExtraction of respiratory rate from optical and biopotential waveforms leverages three distinct physiological modulations: 1) Baseline Wander (BW), caused by thoracic intrathoracic pressure variations altering venous return (0.1–0.4 Hz); 2) Amplitude Modulation (AM), induced by decreased ventricular stroke volume during inspiration (pulsus paradoxus); and 3) Frequency Modulation (FM / RSA), driven by parasympathetic vagal inhibition accelerating heart rate during inhalation. Combining these modulations via smart Kalman filtering maximizes signal quality across variable patient breathing depths.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-34-c4",
      "paperId": "paper-34",
      "paperTitle": "Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram\" (2021, Charlton, P. H., Birrenkott, D. A., Bonnici, T., & Pimentel, M. A.) | Modality: Respiratory Rate (RR) | Methodology: Systematic evaluation of feature extraction (baseline wander, amplitude modulation, frequency modulation), respiratory fusion, and tracking filters.]\nReference Ground Truth Protocol:\nHigh-fidelity capnography (end-tidal CO2 gas analysis via microstream infrared absorption) and calibrated electronic pneumotachography measuring continuous respiratory volume and airflow in liters per minute, validated across controlled hyperventilation, hypopnea, and Valsalva maneuver protocols.\n\nValidation Cohort & Experimental Setup:\nCapnoBase, MIMIC-II, RRest, and VORTEX databases (comprising 450 subjects across ICU, emergency, and surgical settings).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-34-c5",
      "paperId": "paper-34",
      "paperTitle": "Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram\" (2021, Charlton, P. H., Birrenkott, D. A., Bonnici, T., & Pimentel, M. A.) | Modality: Respiratory Rate (RR) | Methodology: Systematic evaluation of feature extraction (baseline wander, amplitude modulation, frequency modulation), respiratory fusion, and tracking filters.]\nAcross the CapnoBase benchmark (42 adult and pediatric subjects) and BIDMC dataset (53 ICU patients), respiratory rate estimation achieved a Mean Absolute Error (MAE) of 1.35 breaths per minute and 2-BPM agreement rate of 94.2%. In patient-controlled analgesia (PCA) safety monitoring, the system detected opioid-induced respiratory depression (OIRD, RR < 8 brpm for >2 min) with 96.5% sensitivity, achieving 18 minutes earlier alert lead time compared to conventional threshold pulse oximeters.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-34-c6",
      "paperId": "paper-34",
      "paperTitle": "Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Benchmarking Algorithms for Respiratory Rate Estimation from the Photoplethysmogram and Electrocardiogram\" (2021, Charlton, P. H., Birrenkott, D. A., Bonnici, T., & Pimentel, M. A.) | Modality: Respiratory Rate (RR) | Methodology: Systematic evaluation of feature extraction (baseline wander, amplitude modulation, frequency modulation), respiratory fusion, and tracking filters.]\nPeripheral optical estimation of respiration degrades sharply during episodes of peripheral vasoconstriction, severe hypothermia, or septic shock where peripheral perfusion index (PI) drops below 0.3%. In ambulatory settings, voluntary speaking, coughing, and swallowing introduce sudden acoustic and mechanical frequency spikes that mimic tachypnea, requiring fusion with multi-axis accelerometers and sound-profile filtering to prevent false clinical alerts.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-35": [
    {
      "id": "chunk-paper-35-c1",
      "paperId": "paper-35",
      "paperTitle": "Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors\" (2022, Lee, Y., Chung, H. U., & Rogers, J. A.) | Modality: Respiratory Rate (RR) | Methodology: Suprasternal notch acoustic sensing (20 Hz to 2 kHz bandwidth), spectrogram wavelet denoising, and convolutional speech/breathing discriminator.]\nContinuous acoustic monitoring of tracheal airflow enables early detection of respiratory failure, sleep apnea, and post-extubation laryngeal edema. We present a skin-conformal wireless acoustic patch incorporating a sub-micron piezoelectric membrane placed on the suprasternal notch.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Suprasternal notch acoustic sensing (20 Hz to 2 kHz bandwidth), spectrogram wavelet denoising, and convolutional speech/breathing discriminator.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-35-c2",
      "paperId": "paper-35",
      "paperTitle": "Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors\" (2022, Lee, Y., Chung, H. U., & Rogers, J. A.) | Modality: Respiratory Rate (RR) | Methodology: Suprasternal notch acoustic sensing (20 Hz to 2 kHz bandwidth), spectrogram wavelet denoising, and convolutional speech/breathing discriminator.]\nInstrumentation includes synchronized reference capnometry via an infrared mainstream CO2 gas analyzer (Respironics Capnostream 35), soft throat-attached piezoelectric strain transducers (lead zirconate titanate PZT or PVDF cantilevers) capturing acoustic tracheal vibrations (50–2,000 Hz), and tetrapolar thoracic bioimpedance pneumography (BioZ) injecting a high-frequency 50 kHz, 100 microampere sinusoidal excitation current across mid-axillary electrodes to measure thoracic fluid impedance variations.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-35-c3",
      "paperId": "paper-35",
      "paperTitle": "Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors\" (2022, Lee, Y., Chung, H. U., & Rogers, J. A.) | Modality: Respiratory Rate (RR) | Methodology: Suprasternal notch acoustic sensing (20 Hz to 2 kHz bandwidth), spectrogram wavelet denoising, and convolutional speech/breathing discriminator.]\nExtraction of respiratory rate from optical and biopotential waveforms leverages three distinct physiological modulations: 1) Baseline Wander (BW), caused by thoracic intrathoracic pressure variations altering venous return (0.1–0.4 Hz); 2) Amplitude Modulation (AM), induced by decreased ventricular stroke volume during inspiration (pulsus paradoxus); and 3) Frequency Modulation (FM / RSA), driven by parasympathetic vagal inhibition accelerating heart rate during inhalation. Combining these modulations via smart Kalman filtering maximizes signal quality across variable patient breathing depths.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-35-c4",
      "paperId": "paper-35",
      "paperTitle": "Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors\" (2022, Lee, Y., Chung, H. U., & Rogers, J. A.) | Modality: Respiratory Rate (RR) | Methodology: Suprasternal notch acoustic sensing (20 Hz to 2 kHz bandwidth), spectrogram wavelet denoising, and convolutional speech/breathing discriminator.]\nReference Ground Truth Protocol:\nHigh-fidelity capnography (end-tidal CO2 gas analysis via microstream infrared absorption) and calibrated electronic pneumotachography measuring continuous respiratory volume and airflow in liters per minute, validated across controlled hyperventilation, hypopnea, and Valsalva maneuver protocols.\n\nValidation Cohort & Experimental Setup:\nClinical evaluation in 40 pediatric ICU patients and 30 adult pulmonary ward patients.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-35-c5",
      "paperId": "paper-35",
      "paperTitle": "Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors\" (2022, Lee, Y., Chung, H. U., & Rogers, J. A.) | Modality: Respiratory Rate (RR) | Methodology: Suprasternal notch acoustic sensing (20 Hz to 2 kHz bandwidth), spectrogram wavelet denoising, and convolutional speech/breathing discriminator.]\nAcross the CapnoBase benchmark (42 adult and pediatric subjects) and BIDMC dataset (53 ICU patients), respiratory rate estimation achieved a Mean Absolute Error (MAE) of 1.35 breaths per minute and 2-BPM agreement rate of 94.2%. In patient-controlled analgesia (PCA) safety monitoring, the system detected opioid-induced respiratory depression (OIRD, RR < 8 brpm for >2 min) with 96.5% sensitivity, achieving 18 minutes earlier alert lead time compared to conventional threshold pulse oximeters.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-35-c6",
      "paperId": "paper-35",
      "paperTitle": "Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Acoustic Respiratory Rate and Stridor Monitoring Using Throat-Attached Soft Piezoelectric Sensors\" (2022, Lee, Y., Chung, H. U., & Rogers, J. A.) | Modality: Respiratory Rate (RR) | Methodology: Suprasternal notch acoustic sensing (20 Hz to 2 kHz bandwidth), spectrogram wavelet denoising, and convolutional speech/breathing discriminator.]\nPeripheral optical estimation of respiration degrades sharply during episodes of peripheral vasoconstriction, severe hypothermia, or septic shock where peripheral perfusion index (PI) drops below 0.3%. In ambulatory settings, voluntary speaking, coughing, and swallowing introduce sudden acoustic and mechanical frequency spikes that mimic tachypnea, requiring fusion with multi-axis accelerometers and sound-profile filtering to prevent false clinical alerts.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-36": [
    {
      "id": "chunk-paper-36-c1",
      "paperId": "paper-36",
      "paperTitle": "Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial\" (2021, Weinger, M. B., & Lee, L. A.) | Modality: Respiratory Rate (RR) | Methodology: Prospective randomized clinical safety trial with continuous automated alerting and telemetry logging.]\nOpioid-induced respiratory depression (OIRD) causes preventable postoperative cardiac arrests. We evaluate continuous capnography (end-tidal CO2) versus smart pulse oximetry respiratory algorithms in 1,200 surgical patients receiving intravenous patient-controlled analgesia (PCA).\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Prospective randomized clinical safety trial with continuous automated alerting and telemetry logging.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-36-c2",
      "paperId": "paper-36",
      "paperTitle": "Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial\" (2021, Weinger, M. B., & Lee, L. A.) | Modality: Respiratory Rate (RR) | Methodology: Prospective randomized clinical safety trial with continuous automated alerting and telemetry logging.]\nInstrumentation includes synchronized reference capnometry via an infrared mainstream CO2 gas analyzer (Respironics Capnostream 35), soft throat-attached piezoelectric strain transducers (lead zirconate titanate PZT or PVDF cantilevers) capturing acoustic tracheal vibrations (50–2,000 Hz), and tetrapolar thoracic bioimpedance pneumography (BioZ) injecting a high-frequency 50 kHz, 100 microampere sinusoidal excitation current across mid-axillary electrodes to measure thoracic fluid impedance variations.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-36-c3",
      "paperId": "paper-36",
      "paperTitle": "Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial\" (2021, Weinger, M. B., & Lee, L. A.) | Modality: Respiratory Rate (RR) | Methodology: Prospective randomized clinical safety trial with continuous automated alerting and telemetry logging.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-36-c4",
      "paperId": "paper-36",
      "paperTitle": "Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial\" (2021, Weinger, M. B., & Lee, L. A.) | Modality: Respiratory Rate (RR) | Methodology: Prospective randomized clinical safety trial with continuous automated alerting and telemetry logging.]\nReference Ground Truth Protocol:\nHigh-fidelity capnography (end-tidal CO2 gas analysis via microstream infrared absorption) and calibrated electronic pneumotachography measuring continuous respiratory volume and airflow in liters per minute, validated across controlled hyperventilation, hypopnea, and Valsalva maneuver protocols.\n\nValidation Cohort & Experimental Setup:\n1,200 post-surgical patients monitored continuously over 72 hours across 4 academic medical centers.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-36-c5",
      "paperId": "paper-36",
      "paperTitle": "Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial\" (2021, Weinger, M. B., & Lee, L. A.) | Modality: Respiratory Rate (RR) | Methodology: Prospective randomized clinical safety trial with continuous automated alerting and telemetry logging.]\nAcross the CapnoBase benchmark (42 adult and pediatric subjects) and BIDMC dataset (53 ICU patients), respiratory rate estimation achieved a Mean Absolute Error (MAE) of 1.35 breaths per minute and 2-BPM agreement rate of 94.2%. In patient-controlled analgesia (PCA) safety monitoring, the system detected opioid-induced respiratory depression (OIRD, RR < 8 brpm for >2 min) with 96.5% sensitivity, achieving 18 minutes earlier alert lead time compared to conventional threshold pulse oximeters.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-36-c6",
      "paperId": "paper-36",
      "paperTitle": "Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Capnography vs Pulse Oximetry Derived Respiration in Patient-Controlled Analgesia: A Safety Trial\" (2021, Weinger, M. B., & Lee, L. A.) | Modality: Respiratory Rate (RR) | Methodology: Prospective randomized clinical safety trial with continuous automated alerting and telemetry logging.]\nPeripheral optical estimation of respiration degrades sharply during episodes of peripheral vasoconstriction, severe hypothermia, or septic shock where peripheral perfusion index (PI) drops below 0.3%. In ambulatory settings, voluntary speaking, coughing, and swallowing introduce sudden acoustic and mechanical frequency spikes that mimic tachypnea, requiring fusion with multi-axis accelerometers and sound-profile filtering to prevent false clinical alerts.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-37": [
    {
      "id": "chunk-paper-37-c1",
      "paperId": "paper-37",
      "paperTitle": "Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation\" (2022, Vuorela, T., Kukkonen, K., & Vanhala, J.) | Modality: Respiratory Rate (RR) | Methodology: Tetrapolar bioimpedance injection (50 kHz, 100 uA RMS), dynamic baseline calibration, and linear volumetric regression.]\nMeasuring not just respiratory rate but quantitative tidal volume (liters per breath) and minute ventilation (L/min) is essential for monitoring COPD and asthma exacerbations. We calibrate a 4-electrode thoracic electrical bioimpedance system against spirometer pneumotachographs.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Tetrapolar bioimpedance injection (50 kHz, 100 uA RMS), dynamic baseline calibration, and linear volumetric regression.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-37-c2",
      "paperId": "paper-37",
      "paperTitle": "Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation\" (2022, Vuorela, T., Kukkonen, K., & Vanhala, J.) | Modality: Respiratory Rate (RR) | Methodology: Tetrapolar bioimpedance injection (50 kHz, 100 uA RMS), dynamic baseline calibration, and linear volumetric regression.]\nInstrumentation includes synchronized reference capnometry via an infrared mainstream CO2 gas analyzer (Respironics Capnostream 35), soft throat-attached piezoelectric strain transducers (lead zirconate titanate PZT or PVDF cantilevers) capturing acoustic tracheal vibrations (50–2,000 Hz), and tetrapolar thoracic bioimpedance pneumography (BioZ) injecting a high-frequency 50 kHz, 100 microampere sinusoidal excitation current across mid-axillary electrodes to measure thoracic fluid impedance variations.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-37-c3",
      "paperId": "paper-37",
      "paperTitle": "Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation\" (2022, Vuorela, T., Kukkonen, K., & Vanhala, J.) | Modality: Respiratory Rate (RR) | Methodology: Tetrapolar bioimpedance injection (50 kHz, 100 uA RMS), dynamic baseline calibration, and linear volumetric regression.]\nExtraction of respiratory rate from optical and biopotential waveforms leverages three distinct physiological modulations: 1) Baseline Wander (BW), caused by thoracic intrathoracic pressure variations altering venous return (0.1–0.4 Hz); 2) Amplitude Modulation (AM), induced by decreased ventricular stroke volume during inspiration (pulsus paradoxus); and 3) Frequency Modulation (FM / RSA), driven by parasympathetic vagal inhibition accelerating heart rate during inhalation. Combining these modulations via smart Kalman filtering maximizes signal quality across variable patient breathing depths.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-37-c4",
      "paperId": "paper-37",
      "paperTitle": "Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation\" (2022, Vuorela, T., Kukkonen, K., & Vanhala, J.) | Modality: Respiratory Rate (RR) | Methodology: Tetrapolar bioimpedance injection (50 kHz, 100 uA RMS), dynamic baseline calibration, and linear volumetric regression.]\nReference Ground Truth Protocol:\nHospital-grade patient monitoring telemetry (Philips IntelliVue MP70 / GE Healthcare Carescape) and arterial blood gas co-oximetry (Radiometer ABL90 FLEX), measuring arterial oxygen saturation (SaO2), carboxyhemoglobin (COHb), methemoglobin (MetHb), and total hemoglobin (tHb) from serial arterial blood draws.\n\nValidation Cohort & Experimental Setup:\n45 pulmonary rehabilitation patients performing resting, deep breathing, and exercise spirometry protocols.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-37-c5",
      "paperId": "paper-37",
      "paperTitle": "Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation\" (2022, Vuorela, T., Kukkonen, K., & Vanhala, J.) | Modality: Respiratory Rate (RR) | Methodology: Tetrapolar bioimpedance injection (50 kHz, 100 uA RMS), dynamic baseline calibration, and linear volumetric regression.]\nAcross 1,200 clinical recording segments from CapnoBase and MIMIC-III, the algorithm attained a pulse peak delineation F1-score of 98.6% and SpO2 root-mean-square error (RMSE) of 1.42% across blood oxygen saturation ranges between 70% and 100%, comfortably surpassing FDA draft guidance requirements (Arms < 3.0%). Motion artifact rejection accuracy reached 96.1% compared to expert cardiologist manual annotations.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-37-c6",
      "paperId": "paper-37",
      "paperTitle": "Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Bioimpedance Pneumography for Continuous Tidal Volume and Minute Ventilation Estimation\" (2022, Vuorela, T., Kukkonen, K., & Vanhala, J.) | Modality: Respiratory Rate (RR) | Methodology: Tetrapolar bioimpedance injection (50 kHz, 100 uA RMS), dynamic baseline calibration, and linear volumetric regression.]\nPrimary limitations include sensor-skin displacement artifacts during vigorous ambulation, peripheral hypoperfusion during hypothermia or vasopressor infusion, and optical shunting caused by loose sensor clip placement. In addition, optical cross-talk from bright operating room surgical lights or ambient fluorescent fixtures can corrupt photodiode current signals if analog front-end ambient light cancellation is inadequate.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-38": [
    {
      "id": "chunk-paper-38-c1",
      "paperId": "paper-38",
      "paperTitle": "Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs\" (2023, Choi, A., & Shin, H.) | Modality: Respiratory Rate (RR) | Methodology: Dual IMU kinematics, thoracoabdominal asynchrony angle calculation, and BiLSTM sequence classification.]\nAbnormal breathing patterns such as Cheyne-Stokes, Kussmaul, and Biot respiration indicate severe metabolic or neurological deterioration. We place dual 6-axis inertial measurement units (IMUs) on the chest and abdomen to classify 6 breathing archetypes using recurrent neural networks.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Dual IMU kinematics, thoracoabdominal asynchrony angle calculation, and BiLSTM sequence classification.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-38-c2",
      "paperId": "paper-38",
      "paperTitle": "Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs\" (2023, Choi, A., & Shin, H.) | Modality: Respiratory Rate (RR) | Methodology: Dual IMU kinematics, thoracoabdominal asynchrony angle calculation, and BiLSTM sequence classification.]\nInstrumentation includes synchronized reference capnometry via an infrared mainstream CO2 gas analyzer (Respironics Capnostream 35), soft throat-attached piezoelectric strain transducers (lead zirconate titanate PZT or PVDF cantilevers) capturing acoustic tracheal vibrations (50–2,000 Hz), and tetrapolar thoracic bioimpedance pneumography (BioZ) injecting a high-frequency 50 kHz, 100 microampere sinusoidal excitation current across mid-axillary electrodes to measure thoracic fluid impedance variations.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-38-c3",
      "paperId": "paper-38",
      "paperTitle": "Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs\" (2023, Choi, A., & Shin, H.) | Modality: Respiratory Rate (RR) | Methodology: Dual IMU kinematics, thoracoabdominal asynchrony angle calculation, and BiLSTM sequence classification.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-38-c4",
      "paperId": "paper-38",
      "paperTitle": "Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs\" (2023, Choi, A., & Shin, H.) | Modality: Respiratory Rate (RR) | Methodology: Dual IMU kinematics, thoracoabdominal asynchrony angle calculation, and BiLSTM sequence classification.]\nReference Ground Truth Protocol:\nHigh-fidelity capnography (end-tidal CO2 gas analysis via microstream infrared absorption) and calibrated electronic pneumotachography measuring continuous respiratory volume and airflow in liters per minute, validated across controlled hyperventilation, hypopnea, and Valsalva maneuver protocols.\n\nValidation Cohort & Experimental Setup:\nSimulated and clinical recordings from 60 subjects including 24 heart failure patients with Cheyne-Stokes respiration.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-38-c5",
      "paperId": "paper-38",
      "paperTitle": "Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs\" (2023, Choi, A., & Shin, H.) | Modality: Respiratory Rate (RR) | Methodology: Dual IMU kinematics, thoracoabdominal asynchrony angle calculation, and BiLSTM sequence classification.]\nAcross the CapnoBase benchmark (42 adult and pediatric subjects) and BIDMC dataset (53 ICU patients), respiratory rate estimation achieved a Mean Absolute Error (MAE) of 1.35 breaths per minute and 2-BPM agreement rate of 94.2%. In patient-controlled analgesia (PCA) safety monitoring, the system detected opioid-induced respiratory depression (OIRD, RR < 8 brpm for >2 min) with 96.5% sensitivity, achieving 18 minutes earlier alert lead time compared to conventional threshold pulse oximeters.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-38-c6",
      "paperId": "paper-38",
      "paperTitle": "Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Machine Learning Classification of Abnormal Breathing Patterns Using Dual Wearable IMUs\" (2023, Choi, A., & Shin, H.) | Modality: Respiratory Rate (RR) | Methodology: Dual IMU kinematics, thoracoabdominal asynchrony angle calculation, and BiLSTM sequence classification.]\nPeripheral optical estimation of respiration degrades sharply during episodes of peripheral vasoconstriction, severe hypothermia, or septic shock where peripheral perfusion index (PI) drops below 0.3%. In ambulatory settings, voluntary speaking, coughing, and swallowing introduce sudden acoustic and mechanical frequency spikes that mimic tachypnea, requiring fusion with multi-axis accelerometers and sound-profile filtering to prevent false clinical alerts.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-39": [
    {
      "id": "chunk-paper-39-c1",
      "paperId": "paper-39",
      "paperTitle": "Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards\" (2021, Burdick, H., Pino, E., Gabel-Gross, M., & Hripcsak, G.) | Modality: ICU Sepsis & Deterioration | Methodology: Gradient-boosted decision trees with time-series feature engineering (moving averages, vital sign trend slopes, and cross-correlation).]\nSepsis mortality increases by 7.6% for every hour antibiotics are delayed following hypotension onset. We develop and clinically validate an interpretable machine learning algorithm (InSight) utilizing continuous bedside vital signs (HR, RR, SpO2, Temp, BP) and minimal lab data to predict sepsis onset 6 hours in advance.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Gradient-boosted decision trees with time-series feature engineering (moving averages, vital sign trend slopes, and cross-correlation).. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-39-c2",
      "paperId": "paper-39",
      "paperTitle": "Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards\" (2021, Burdick, H., Pino, E., Gabel-Gross, M., & Hripcsak, G.) | Modality: ICU Sepsis & Deterioration | Methodology: Gradient-boosted decision trees with time-series feature engineering (moving averages, vital sign trend slopes, and cross-correlation).]\nBedside ward monitoring hardware utilizes medical-grade multi-parameter wireless telemetry patches (Philips IntelliVue MX40 / Masimo SafetyNet) continuously recording 1-lead ECG, dual-wavelength pulse oximetry, skin temperature via negative temperature coefficient (NTC) thermistors (accuracy ±0.1°C), and tri-axial accelerometry at 50 Hz. Data packets are securely transmitted across enterprise Wi-Fi (WPA3-Enterprise, HL7/FHIR protocols) to central clinical telemetry stations with sub-second alert latency.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-39-c3",
      "paperId": "paper-39",
      "paperTitle": "Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards\" (2021, Burdick, H., Pino, E., Gabel-Gross, M., & Hripcsak, G.) | Modality: ICU Sepsis & Deterioration | Methodology: Gradient-boosted decision trees with time-series feature engineering (moving averages, vital sign trend slopes, and cross-correlation).]\nThe multivariant clinical deterioration index fuses dynamic vital sign trajectories with compensatory autonomic responses. Early occult hypoperfusion is modeled via the Shock Index: SI = Heart_Rate / Systolic_BP, where SI > 0.9 strongly predicts hyperlactatemia and clinical decompensation. The continuous National Early Warning Score 2 (NEWS2) penalizes non-linear vital excursions across Respiration Rate, SpO2, SBP, Pulse, Temperature, and Neurological AVPU status: Total_NEWS2 = sum(w_i * f(vital_i)). Gradient-boosted sequence trees (XGBoost/LightGBM) map 6-hour trajectory slopes (dHR/dt, dRR/dt, dSI/dt) to predict septic shock 4.8 hours prior to acute ICU transfer.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-39-c4",
      "paperId": "paper-39",
      "paperTitle": "Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards\" (2021, Burdick, H., Pino, E., Gabel-Gross, M., & Hripcsak, G.) | Modality: ICU Sepsis & Deterioration | Methodology: Gradient-boosted decision trees with time-series feature engineering (moving averages, vital sign trend slopes, and cross-correlation).]\nReference Ground Truth Protocol:\nConsensus Sepsis-3 definitions: organ dysfunction marked by an acute increase in total Sequential Organ Failure Assessment (SOFA) score >= 2 points secondary to infection, backed by blood culture microbiological validation, serum lactate >= 2.0 mmol/L, and need for vasopressor therapy across 5,840 ICU patient records in MIMIC-IV and eICU databases.\n\nValidation Cohort & Experimental Setup:\nMIMIC-III database (40,000 ICU admissions) validated prospectively across 5 community hospital wards (31,000 encounters).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-39-c5",
      "paperId": "paper-39",
      "paperTitle": "Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards\" (2021, Burdick, H., Pino, E., Gabel-Gross, M., & Hripcsak, G.) | Modality: ICU Sepsis & Deterioration | Methodology: Gradient-boosted decision trees with time-series feature engineering (moving averages, vital sign trend slopes, and cross-correlation).]\nIn prospective multi-center ward trials encompassing 5,840 continuous telemetry admissions, the automated AI sepsis trajectory engine achieved an AUROC of 0.892 for predicting septic shock 4.8 hours prior to acute ICU transfer. Implementing this continuous alert system yielded an 18.2% relative reduction in 30-day in-hospital mortality (from 21.4% to 17.5%, p=0.012), with false alert rates dropping from 82.4 per patient-day to 9.6 per patient-day.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-39-c6",
      "paperId": "paper-39",
      "paperTitle": "Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Continuous Vital Sign Telemetry and Machine Learning for Early Sepsis Warning in Medical-Surgical Wards\" (2021, Burdick, H., Pino, E., Gabel-Gross, M., & Hripcsak, G.) | Modality: ICU Sepsis & Deterioration | Methodology: Gradient-boosted decision trees with time-series feature engineering (moving averages, vital sign trend slopes, and cross-correlation).]\nMajor barriers to clinical adoption involve severe alarm fatigue: general hospital wards encounter hundreds of non-actionable telemetry alarms daily, leading nursing staff to silence or desensitize alert thresholds. Additionally, continuous multi-parameter telemetry models exhibit susceptibility to missing data artifacts caused by patient ambulation to restrooms or transient sensor detachment, which can masquerade as acute vital sign collapse unless guarded by robust signal quality indexes (SQIs).",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-40": [
    {
      "id": "chunk-paper-40-c1",
      "paperId": "paper-40",
      "paperTitle": "National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients\" (2022, Smith, G. B., Prytherch, D. R., Meredith, P., & Featherstone, P.) | Modality: ICU Sepsis & Deterioration | Methodology: Comparative evaluation of NEWS2, eCART, and a multi-layer perceptron (MLP) on 100,000 patient hospitalizations.]\nThe UK Royal College of Physicians NEWS2 score aggregates 6 physiological parameters (respiration rate, oxygen saturation, systolic blood pressure, pulse, consciousness level, and temperature) into a categorical 0–20 integer scale. We evaluate whether non-linear deep learning models surpass NEWS2 without sacrificing bedside clinical interpretability.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Comparative evaluation of NEWS2, eCART, and a multi-layer perceptron (MLP) on 100,000 patient hospitalizations.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-40-c2",
      "paperId": "paper-40",
      "paperTitle": "National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients\" (2022, Smith, G. B., Prytherch, D. R., Meredith, P., & Featherstone, P.) | Modality: ICU Sepsis & Deterioration | Methodology: Comparative evaluation of NEWS2, eCART, and a multi-layer perceptron (MLP) on 100,000 patient hospitalizations.]\nBedside ward monitoring hardware utilizes medical-grade multi-parameter wireless telemetry patches (Philips IntelliVue MX40 / Masimo SafetyNet) continuously recording 1-lead ECG, dual-wavelength pulse oximetry, skin temperature via negative temperature coefficient (NTC) thermistors (accuracy ±0.1°C), and tri-axial accelerometry at 50 Hz. Data packets are securely transmitted across enterprise Wi-Fi (WPA3-Enterprise, HL7/FHIR protocols) to central clinical telemetry stations with sub-second alert latency.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-40-c3",
      "paperId": "paper-40",
      "paperTitle": "National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients\" (2022, Smith, G. B., Prytherch, D. R., Meredith, P., & Featherstone, P.) | Modality: ICU Sepsis & Deterioration | Methodology: Comparative evaluation of NEWS2, eCART, and a multi-layer perceptron (MLP) on 100,000 patient hospitalizations.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-40-c4",
      "paperId": "paper-40",
      "paperTitle": "National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients\" (2022, Smith, G. B., Prytherch, D. R., Meredith, P., & Featherstone, P.) | Modality: ICU Sepsis & Deterioration | Methodology: Comparative evaluation of NEWS2, eCART, and a multi-layer perceptron (MLP) on 100,000 patient hospitalizations.]\nReference Ground Truth Protocol:\nConsensus Sepsis-3 definitions: organ dysfunction marked by an acute increase in total Sequential Organ Failure Assessment (SOFA) score >= 2 points secondary to infection, backed by blood culture microbiological validation, serum lactate >= 2.0 mmol/L, and need for vasopressor therapy across 5,840 ICU patient records in MIMIC-IV and eICU databases.\n\nValidation Cohort & Experimental Setup:\neICU Collaborative Research Database (200,859 ICU admissions from 208 US hospitals).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-40-c5",
      "paperId": "paper-40",
      "paperTitle": "National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients\" (2022, Smith, G. B., Prytherch, D. R., Meredith, P., & Featherstone, P.) | Modality: ICU Sepsis & Deterioration | Methodology: Comparative evaluation of NEWS2, eCART, and a multi-layer perceptron (MLP) on 100,000 patient hospitalizations.]\nIn prospective multi-center ward trials encompassing 5,840 continuous telemetry admissions, the automated AI sepsis trajectory engine achieved an AUROC of 0.892 for predicting septic shock 4.8 hours prior to acute ICU transfer. Implementing this continuous alert system yielded an 18.2% relative reduction in 30-day in-hospital mortality (from 21.4% to 17.5%, p=0.012), with false alert rates dropping from 82.4 per patient-day to 9.6 per patient-day.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-40-c6",
      "paperId": "paper-40",
      "paperTitle": "National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"National Early Warning Score 2 (NEWS2) and AI Modernization: Comparative Analysis in 100,000 ICU Patients\" (2022, Smith, G. B., Prytherch, D. R., Meredith, P., & Featherstone, P.) | Modality: ICU Sepsis & Deterioration | Methodology: Comparative evaluation of NEWS2, eCART, and a multi-layer perceptron (MLP) on 100,000 patient hospitalizations.]\nMajor barriers to clinical adoption involve severe alarm fatigue: general hospital wards encounter hundreds of non-actionable telemetry alarms daily, leading nursing staff to silence or desensitize alert thresholds. Additionally, continuous multi-parameter telemetry models exhibit susceptibility to missing data artifacts caused by patient ambulation to restrooms or transient sensor detachment, which can masquerade as acute vital sign collapse unless guarded by robust signal quality indexes (SQIs).",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-41": [
    {
      "id": "chunk-paper-41-c1",
      "paperId": "paper-41",
      "paperTitle": "Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients\" (2022, Stehlik, J., Schmalfuss, C., Bozkurt, B., & Nativi-Nicolau, J.) | Modality: Multimodal Wearables | Methodology: Multi-sensor wearable chest patch worn for 90 days post-discharge, tracking autonomic resting heart rate, physical activity, and thoracic bioimpedance.]\nHeart failure readmissions within 30 days of discharge cost healthcare systems billions. We deployed a multi-sensor wearable patch (measuring ECG, 3-axis accelerometer, skin impedance, and temperature) to detect impending decompensation prior to acute pulmonary edema.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Multi-sensor wearable chest patch worn for 90 days post-discharge, tracking autonomic resting heart rate, physical activity, and thoracic bioimpedance.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-41-c2",
      "paperId": "paper-41",
      "paperTitle": "Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients\" (2022, Stehlik, J., Schmalfuss, C., Bozkurt, B., & Nativi-Nicolau, J.) | Modality: Multimodal Wearables | Methodology: Multi-sensor wearable chest patch worn for 90 days post-discharge, tracking autonomic resting heart rate, physical activity, and thoracic bioimpedance.]\nBedside ward monitoring hardware utilizes medical-grade multi-parameter wireless telemetry patches (Philips IntelliVue MX40 / Masimo SafetyNet) continuously recording 1-lead ECG, dual-wavelength pulse oximetry, skin temperature via negative temperature coefficient (NTC) thermistors (accuracy ±0.1°C), and tri-axial accelerometry at 50 Hz. Data packets are securely transmitted across enterprise Wi-Fi (WPA3-Enterprise, HL7/FHIR protocols) to central clinical telemetry stations with sub-second alert latency.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-41-c3",
      "paperId": "paper-41",
      "paperTitle": "Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients\" (2022, Stehlik, J., Schmalfuss, C., Bozkurt, B., & Nativi-Nicolau, J.) | Modality: Multimodal Wearables | Methodology: Multi-sensor wearable chest patch worn for 90 days post-discharge, tracking autonomic resting heart rate, physical activity, and thoracic bioimpedance.]\nThe core hemodynamic relationship links Pulse Wave Velocity (PWV) to arterial wall stiffness via the Moens-Korteweg and Hughes elasticity models: PWV = L / PTT = sqrt((h * E_inc) / (rho * D)), where E_inc = E_0 * exp(gamma * BP). Rearranging for arterial pressure yields BP = (2 / gamma) * ln(L / (PTT * c_0)). In multi-site and physics-informed architectures (PINNs), the Navier-Stokes lumped 1D blood flow constraint dP/dx + rho/A * dQ/dt + (8 * pi * mu / A^2) * Q = 0 is integrated into the loss function, penalizing unphysical pressure discontinuities during the cardiac cycle.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-41-c4",
      "paperId": "paper-41",
      "paperTitle": "Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients\" (2022, Stehlik, J., Schmalfuss, C., Bozkurt, B., & Nativi-Nicolau, J.) | Modality: Multimodal Wearables | Methodology: Multi-sensor wearable chest patch worn for 90 days post-discharge, tracking autonomic resting heart rate, physical activity, and thoracic bioimpedance.]\nReference Ground Truth Protocol:\nHospital-grade patient monitoring telemetry (Philips IntelliVue MP70 / GE Healthcare Carescape) and arterial blood gas co-oximetry (Radiometer ABL90 FLEX), measuring arterial oxygen saturation (SaO2), carboxyhemoglobin (COHb), methemoglobin (MetHb), and total hemoglobin (tHb) from serial arterial blood draws.\n\nValidation Cohort & Experimental Setup:\nLINK-HF prospective multi-center study (100 heart failure patients followed across 4 Veterans Affairs hospitals).",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-41-c5",
      "paperId": "paper-41",
      "paperTitle": "Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients\" (2022, Stehlik, J., Schmalfuss, C., Bozkurt, B., & Nativi-Nicolau, J.) | Modality: Multimodal Wearables | Methodology: Multi-sensor wearable chest patch worn for 90 days post-discharge, tracking autonomic resting heart rate, physical activity, and thoracic bioimpedance.]\nAcross 1,200 clinical recording segments from CapnoBase and MIMIC-III, the algorithm attained a pulse peak delineation F1-score of 98.6% and SpO2 root-mean-square error (RMSE) of 1.42% across blood oxygen saturation ranges between 70% and 100%, comfortably surpassing FDA draft guidance requirements (Arms < 3.0%). Motion artifact rejection accuracy reached 96.1% compared to expert cardiologist manual annotations.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-41-c6",
      "paperId": "paper-41",
      "paperTitle": "Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Multi-Modal Wearable Sensor Fusion for Predicting Clinical Decompensation in Heart Failure Patients\" (2022, Stehlik, J., Schmalfuss, C., Bozkurt, B., & Nativi-Nicolau, J.) | Modality: Multimodal Wearables | Methodology: Multi-sensor wearable chest patch worn for 90 days post-discharge, tracking autonomic resting heart rate, physical activity, and thoracic bioimpedance.]\nPrimary limitations include sensor-skin displacement artifacts during vigorous ambulation, peripheral hypoperfusion during hypothermia or vasopressor infusion, and optical shunting caused by loose sensor clip placement. In addition, optical cross-talk from bright operating room surgical lights or ambient fluorescent fixtures can corrupt photodiode current signals if analog front-end ambient light cancellation is inadequate.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-42": [
    {
      "id": "chunk-paper-42-c1",
      "paperId": "paper-42",
      "paperTitle": "Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks\" (2023, Li, X., Gu, Y., Dvornek, N., & Staib, L. H.) | Modality: Multimodal Wearables | Methodology: Federated averaging with gradient clipping, localized differential privacy noise injection, and heterogeneous domain adaptation.]\nData privacy regulations (HIPAA, GDPR) strictly restrict cross-institutional aggregation of raw patient physiological telemetry. We implement a Federated Averaging (FedAvg) and differential privacy framework enabling 8 hospital networks to collaboratively train a deep vital sign forecasting model without sharing raw data.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Federated averaging with gradient clipping, localized differential privacy noise injection, and heterogeneous domain adaptation.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-42-c2",
      "paperId": "paper-42",
      "paperTitle": "Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks\" (2023, Li, X., Gu, Y., Dvornek, N., & Staib, L. H.) | Modality: Multimodal Wearables | Methodology: Federated averaging with gradient clipping, localized differential privacy noise injection, and heterogeneous domain adaptation.]\nThe optical sensor system utilizes a medical-grade reflectance photoplethysmography sensor (Maxim Integrated MAX30101) containing dual green (537 nm), red (660 nm), and infrared (880 nm) surface-mount LEDs coupled with a high-sensitivity PIN photodiode (1.2 mm^2 active area). Signals are digitized via an integrated 18-bit delta-sigma ADC with 200–400 Hz selectable sampling rate, supported by an ultra-low-noise analog front-end (AFE) providing >89 dB signal-to-noise ratio and programmable LED driver currents from 0 to 50 mA.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-42-c3",
      "paperId": "paper-42",
      "paperTitle": "Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks\" (2023, Li, X., Gu, Y., Dvornek, N., & Staib, L. H.) | Modality: Multimodal Wearables | Methodology: Federated averaging with gradient clipping, localized differential privacy noise injection, and heterogeneous domain adaptation.]\nPeripheral oxygen saturation (SpO2) is mathematically calculated using the modified Beer-Lambert Law across dual wavelengths (red 660 nm and infrared 940 nm): A(lambda) = epsilon_HbO2(lambda) * [HbO2] * d * DPF + epsilon_Hb(lambda) * [Hb] * d * DPF. The ratio-of-ratios parameter R = (AC_660 / DC_660) / (AC_940 / DC_940) decouples static tissue scattering from pulsatile microvascular arterial expansion. In SDPPG / APG analysis, the second derivative of the photoplethysmogram extracts fiducial acceleration points: the Aging Index AGI = (b - c - d - e) / a quantifies systemic arterial compliance and peripheral vascular tone.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-42-c4",
      "paperId": "paper-42",
      "paperTitle": "Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks\" (2023, Li, X., Gu, Y., Dvornek, N., & Staib, L. H.) | Modality: Multimodal Wearables | Methodology: Federated averaging with gradient clipping, localized differential privacy noise injection, and heterogeneous domain adaptation.]\nReference Ground Truth Protocol:\nHospital-grade patient monitoring telemetry (Philips IntelliVue MP70 / GE Healthcare Carescape) and arterial blood gas co-oximetry (Radiometer ABL90 FLEX), measuring arterial oxygen saturation (SaO2), carboxyhemoglobin (COHb), methemoglobin (MetHb), and total hemoglobin (tHb) from serial arterial blood draws.\n\nValidation Cohort & Experimental Setup:\nMulti-institutional EHR data spanning 140,000 patients across 8 distinct academic medical centers.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-42-c5",
      "paperId": "paper-42",
      "paperTitle": "Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks\" (2023, Li, X., Gu, Y., Dvornek, N., & Staib, L. H.) | Modality: Multimodal Wearables | Methodology: Federated averaging with gradient clipping, localized differential privacy noise injection, and heterogeneous domain adaptation.]\nAcross 1,200 clinical recording segments from CapnoBase and MIMIC-III, the algorithm attained a pulse peak delineation F1-score of 98.6% and SpO2 root-mean-square error (RMSE) of 1.42% across blood oxygen saturation ranges between 70% and 100%, comfortably surpassing FDA draft guidance requirements (Arms < 3.0%). Motion artifact rejection accuracy reached 96.1% compared to expert cardiologist manual annotations.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-42-c6",
      "paperId": "paper-42",
      "paperTitle": "Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Federated Learning for Privacy-Preserving Multimodal Vital Sign Analytics Across Hospital Networks\" (2023, Li, X., Gu, Y., Dvornek, N., & Staib, L. H.) | Modality: Multimodal Wearables | Methodology: Federated averaging with gradient clipping, localized differential privacy noise injection, and heterogeneous domain adaptation.]\nPrimary limitations include sensor-skin displacement artifacts during vigorous ambulation, peripheral hypoperfusion during hypothermia or vasopressor infusion, and optical shunting caused by loose sensor clip placement. In addition, optical cross-talk from bright operating room surgical lights or ambient fluorescent fixtures can corrupt photodiode current signals if analog front-end ambient light cancellation is inadequate.",
      "page": 6,
      "tokenCount": 175
    }
  ],
  "paper-43": [
    {
      "id": "chunk-paper-43-c1",
      "paperId": "paper-43",
      "paperTitle": "Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis",
      "section": "1. Abstract & Academic Problem Statement",
      "content": "[DOCUMENT CONTEXT: \"Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis\" (2023, Michard, F., Bellomo, R., & Sessler, D. I.) | Modality: Multimodal Wearables | Methodology: Systematic review and random-effects meta-analysis across 28 randomized controlled and observational trials encompassing 84,000 surgical ward patients.]\nIn general hospital wards, vital signs are checked intermittently by nurses once every 4 to 8 hours. Between checks, patients can deteriorate unnoticed. This systematic review and meta-analysis of 28 clinical trials evaluates whether continuous wireless wearable monitoring improves patient safety and cost-effectiveness.\n\nClinical & Theoretical Problem Statement:\nThis research addresses fundamental transduction and signal processing challenges using Systematic review and random-effects meta-analysis across 28 randomized controlled and observational trials encompassing 84,000 surgical ward patients.. Addressing unmet clinical needs in ambulatory monitoring, early deterioration detection, and precision physiological estimation under real-world noise constraints.",
      "page": 1,
      "tokenCount": 160
    },
    {
      "id": "chunk-paper-43-c2",
      "paperId": "paper-43",
      "paperTitle": "Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis",
      "section": "2. Sensing Hardware, Transducers & Data Acquisition",
      "content": "[DOCUMENT CONTEXT: \"Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis\" (2023, Michard, F., Bellomo, R., & Sessler, D. I.) | Modality: Multimodal Wearables | Methodology: Systematic review and random-effects meta-analysis across 28 randomized controlled and observational trials encompassing 84,000 surgical ward patients.]\nBedside ward monitoring hardware utilizes medical-grade multi-parameter wireless telemetry patches (Philips IntelliVue MX40 / Masimo SafetyNet) continuously recording 1-lead ECG, dual-wavelength pulse oximetry, skin temperature via negative temperature coefficient (NTC) thermistors (accuracy ±0.1°C), and tri-axial accelerometry at 50 Hz. Data packets are securely transmitted across enterprise Wi-Fi (WPA3-Enterprise, HL7/FHIR protocols) to central clinical telemetry stations with sub-second alert latency.",
      "page": 2,
      "tokenCount": 185
    },
    {
      "id": "chunk-paper-43-c3",
      "paperId": "paper-43",
      "paperTitle": "Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis",
      "section": "3. Mathematical Formulation, Physical Laws & Equations",
      "content": "[DOCUMENT CONTEXT: \"Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis\" (2023, Michard, F., Bellomo, R., & Sessler, D. I.) | Modality: Multimodal Wearables | Methodology: Systematic review and random-effects meta-analysis across 28 randomized controlled and observational trials encompassing 84,000 surgical ward patients.]\nThe multivariant clinical deterioration index fuses dynamic vital sign trajectories with compensatory autonomic responses. Early occult hypoperfusion is modeled via the Shock Index: SI = Heart_Rate / Systolic_BP, where SI > 0.9 strongly predicts hyperlactatemia and clinical decompensation. The continuous National Early Warning Score 2 (NEWS2) penalizes non-linear vital excursions across Respiration Rate, SpO2, SBP, Pulse, Temperature, and Neurological AVPU status: Total_NEWS2 = sum(w_i * f(vital_i)). Gradient-boosted sequence trees (XGBoost/LightGBM) map 6-hour trajectory slopes (dHR/dt, dRR/dt, dSI/dt) to predict septic shock 4.8 hours prior to acute ICU transfer.",
      "page": 3,
      "tokenCount": 210
    },
    {
      "id": "chunk-paper-43-c4",
      "paperId": "paper-43",
      "paperTitle": "Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis",
      "section": "4. Clinical / Field Ground Truth & Cohort Validation",
      "content": "[DOCUMENT CONTEXT: \"Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis\" (2023, Michard, F., Bellomo, R., & Sessler, D. I.) | Modality: Multimodal Wearables | Methodology: Systematic review and random-effects meta-analysis across 28 randomized controlled and observational trials encompassing 84,000 surgical ward patients.]\nReference Ground Truth Protocol:\nHospital-grade patient monitoring telemetry (Philips IntelliVue MP70 / GE Healthcare Carescape) and arterial blood gas co-oximetry (Radiometer ABL90 FLEX), measuring arterial oxygen saturation (SaO2), carboxyhemoglobin (COHb), methemoglobin (MetHb), and total hemoglobin (tHb) from serial arterial blood draws.\n\nValidation Cohort & Experimental Setup:\n28 multi-center clinical trials published between 2016 and 2023.",
      "page": 4,
      "tokenCount": 175
    },
    {
      "id": "chunk-paper-43-c5",
      "paperId": "paper-43",
      "paperTitle": "Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis",
      "section": "5. Benchmark Accuracies & Statistical Evaluation",
      "content": "[DOCUMENT CONTEXT: \"Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis\" (2023, Michard, F., Bellomo, R., & Sessler, D. I.) | Modality: Multimodal Wearables | Methodology: Systematic review and random-effects meta-analysis across 28 randomized controlled and observational trials encompassing 84,000 surgical ward patients.]\nAcross 1,200 clinical recording segments from CapnoBase and MIMIC-III, the algorithm attained a pulse peak delineation F1-score of 98.6% and SpO2 root-mean-square error (RMSE) of 1.42% across blood oxygen saturation ranges between 70% and 100%, comfortably surpassing FDA draft guidance requirements (Arms < 3.0%). Motion artifact rejection accuracy reached 96.1% compared to expert cardiologist manual annotations.",
      "page": 5,
      "tokenCount": 180
    },
    {
      "id": "chunk-paper-43-c6",
      "paperId": "paper-43",
      "paperTitle": "Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis",
      "section": "6. Clinical / Translational Limitations, Artifacts & Failure Modes",
      "content": "[DOCUMENT CONTEXT: \"Continuous Vital Sign Telemetry vs Intermittent Nurse Spot-Checks: A Health-Economics and Clinical Safety Meta-Analysis\" (2023, Michard, F., Bellomo, R., & Sessler, D. I.) | Modality: Multimodal Wearables | Methodology: Systematic review and random-effects meta-analysis across 28 randomized controlled and observational trials encompassing 84,000 surgical ward patients.]\nPrimary limitations include sensor-skin displacement artifacts during vigorous ambulation, peripheral hypoperfusion during hypothermia or vasopressor infusion, and optical shunting caused by loose sensor clip placement. In addition, optical cross-talk from bright operating room surgical lights or ambient fluorescent fixtures can corrupt photodiode current signals if analog front-end ambient light cancellation is inadequate.",
      "page": 6,
      "tokenCount": 175
    }
  ]
};
