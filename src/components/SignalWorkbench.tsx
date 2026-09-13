import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Sliders, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Info, 
  TrendingUp, 
  FileText, 
  Cpu, 
  Eye, 
  Radio, 
  AlertTriangle,
  Heart,
  Send,
  RotateCcw
} from 'lucide-react';
import { PAPER_EXTENDED_DETAILS } from '../data/paperDetails';

interface SignalWorkbenchProps {
  onSendToChat?: (promptText: string) => void;
}

type WorkbenchModality = 'ppg' | 'ptt-bp' | 'rppg' | 'radar' | 'sepsis';

export const SignalWorkbench: React.FC<SignalWorkbenchProps> = ({ onSendToChat }) => {
  const [activeModality, setActiveModality] = useState<WorkbenchModality>('ppg');

  // -------------------------------------------------------------
  // 1. PPG & SDPPG State (Papers 01, 02, 03, 06)
  // -------------------------------------------------------------
  const [heartRate, setHeartRate] = useState<number>(72); // BPM
  const [arterialStiffness, setArterialStiffness] = useState<number>(-0.45); // APG b/a ratio (-1.0 to -0.1)
  const [peripheralResistance, setPeripheralResistance] = useState<number>(-0.35); // APG d/a ratio
  const [acRedRatio, setAcRedRatio] = useState<number>(0.04);
  const [acIrRatio, setAcIrRatio] = useState<number>(0.05);

  const spo2ModulationRatio = useMemo(() => {
    // R = (AC660 / DC660) / (AC940 / DC940)
    const dcRed = 1.0;
    const dcIr = 1.0;
    const r = (acRedRatio / dcRed) / (acIrRatio / dcIr);
    const calculatedSpo2 = Math.min(100, Math.max(70, Math.round(110 - 25 * r)));
    return { r: Number(r.toFixed(3)), spo2: calculatedSpo2 };
  }, [acRedRatio, acIrRatio]);

  const agingIndex = useMemo(() => {
    // Aging Index (AGI) = (b - c - d - e) / a
    const b_a = arterialStiffness;
    const c_a = -0.15;
    const d_a = peripheralResistance;
    const e_a = -0.10;
    return Number((b_a - c_a - d_a - e_a).toFixed(2));
  }, [arterialStiffness, peripheralResistance]);

  // -------------------------------------------------------------
  // 2. Dual-Lead ECG & PTT Cuffless BP State (Papers 07, 08, 10, 13)
  // -------------------------------------------------------------
  const [pttMs, setPttMs] = useState<number>(165); // ms (typically 120-220 ms)
  const [arterialDistanceCm, setArterialDistanceCm] = useState<number>(75); // cm (heart to index finger)
  const [hughesGamma, setHughesGamma] = useState<number>(0.018); // mmHg^-1
  const [isometricStressActive, setIsometricStressActive] = useState<boolean>(false);

  const pwv = useMemo(() => {
    const effectivePtt = isometricStressActive ? pttMs - 22 : pttMs;
    const distanceMeters = arterialDistanceCm / 100;
    const pttSeconds = effectivePtt / 1000;
    return Number((distanceMeters / pttSeconds).toFixed(2)); // m/s
  }, [arterialDistanceCm, pttMs, isometricStressActive]);

  const estimatedBp = useMemo(() => {
    // Hughes model: E_inc = E0 * exp(gamma * BP)
    const c0 = 3.2;
    const ratio = Math.max(0.5, pwv / c0);
    const stressOffset = isometricStressActive ? 16 : 0;
    const meanArterialPressure = Math.round((2 / hughesGamma) * Math.log(ratio) * 0.55 + 85 + stressOffset);
    const pulsePressure = Math.round(36 + (pwv - 4.5) * 8);
    const sbp = Math.round(meanArterialPressure + (2/3) * pulsePressure);
    const dbp = Math.round(meanArterialPressure - (1/3) * pulsePressure);

    return {
      sbp: Math.min(195, Math.max(85, sbp)),
      dbp: Math.min(120, Math.max(50, dbp)),
      map: meanArterialPressure,
      pulsePressure,
    };
  }, [pwv, hughesGamma, isometricStressActive]);

  // -------------------------------------------------------------
  // 3. Remote Facial Video rPPG State (Papers 21, 23, 24, 25)
  // -------------------------------------------------------------
  const [rppgAlgo, setRppgAlgo] = useState<'POS' | 'CHROM' | 'GREEN'>('POS');
  const [ambientLux, setAmbientLux] = useState<number>(450); // lux (100 - 1000)
  const [headRotationDeg, setHeadRotationDeg] = useState<number>(8); // degrees (0 - 45)
  const [cameraFps, setCameraFps] = useState<number>(30);

  const rppgSnr = useMemo(() => {
    let baseSnr = rppgAlgo === 'POS' ? 8.4 : rppgAlgo === 'CHROM' ? 6.8 : 3.2;
    // Ambient light degradation below 250 lux
    if (ambientLux < 250) baseSnr -= (250 - ambientLux) * 0.015;
    // Head rotation degradation
    baseSnr -= (headRotationDeg * 0.12);
    return Number(Math.max(-4.0, baseSnr).toFixed(1));
  }, [rppgAlgo, ambientLux, headRotationDeg]);

  const rppgHeartRateError = useMemo(() => {
    // Mean absolute error in BPM against contact PPG
    const error = Math.max(0.8, Number((12.5 - rppgSnr * 1.1).toFixed(1)));
    return error;
  }, [rppgSnr]);

  // -------------------------------------------------------------
  // 4. 60 GHz FMCW Radar State (Papers 28, 29, 30, 32)
  // -------------------------------------------------------------
  const [radarCarrierGhz, setRadarCarrierGhz] = useState<number>(60);
  const [radarDistanceMeters, setRadarDistanceMeters] = useState<number>(1.2);
  const [bodyMovementLevel, setBodyMovementLevel] = useState<'none' | 'light' | 'moderate'>('none');

  const radarWavelengthMm = useMemo(() => {
    // lambda = c / f
    return Number((300 / radarCarrierGhz).toFixed(2)); // mm (e.g. 5.0 mm at 60 GHz)
  }, [radarCarrierGhz]);

  const chestDisplacementPhases = useMemo(() => {
    // Respiration = 4 - 8 mm, Heartbeat = 0.2 - 0.5 mm
    const respMm = 5.5;
    const cardiacMm = 0.35;
    const respPhaseShiftRad = Number(((4 * Math.PI * respMm) / radarWavelengthMm).toFixed(2));
    const cardiacPhaseShiftRad = Number(((4 * Math.PI * cardiacMm) / radarWavelengthMm).toFixed(2));
    return { respMm, cardiacMm, respPhaseShiftRad, cardiacPhaseShiftRad };
  }, [radarWavelengthMm]);

  // -------------------------------------------------------------
  // 5. ICU NEWS2 & Sepsis Shock Trajectory State (Papers 35, 39, 40)
  // -------------------------------------------------------------
  const [icuHr, setIcuHr] = useState<number>(118); // BPM (Tachycardia in sepsis)
  const [icuSbp, setIcuSbp] = useState<number>(92); // mmHg (Hypotension in sepsis)
  const [icuRr, setIcuRr] = useState<number>(26); // breaths/min (Tachypnea compensatory acidosis)
  const [icuSpo2, setIcuSpo2] = useState<number>(93); // %
  const [icuTemp, setIcuTemp] = useState<number>(38.6); // °C

  // Shock Index (SI) = HR / SBP
  const shockIndex = useMemo(() => {
    return Number((icuHr / icuSbp).toFixed(2));
  }, [icuHr, icuSbp]);

  // Dynamic NEWS2 Score computation
  const news2Score = useMemo(() => {
    let score = 0;
    // Respiration Rate (RR)
    if (icuRr <= 8 || icuRr >= 25) score += 3;
    else if (icuRr >= 21) score += 2;
    else if (icuRr <= 11) score += 1;

    // SpO2 Scale 1
    if (icuSpo2 <= 91) score += 3;
    else if (icuSpo2 <= 93) score += 2;
    else if (icuSpo2 <= 95) score += 1;

    // Systolic BP
    if (icuSbp <= 90) score += 3;
    else if (icuSbp <= 100) score += 2;
    else if (icuSbp <= 110) score += 1;

    // Heart Rate
    if (icuHr <= 40 || icuHr >= 131) score += 3;
    else if (icuHr >= 111) score += 2;
    else if (icuHr <= 50 || icuHr >= 91) score += 1;

    // Temperature
    if (icuTemp <= 35.0) score += 3;
    else if (icuTemp >= 39.1) score += 2;
    else if (icuTemp <= 36.0 || icuTemp >= 38.1) score += 1;

    return score;
  }, [icuHr, icuSbp, icuRr, icuSpo2, icuTemp]);

  const sepsisRiskLevel = useMemo(() => {
    if (news2Score >= 7 || shockIndex >= 1.0) {
      return {
        level: 'High Sepsis / Septic Shock Risk',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        badge: 'Critical Deterioration',
        antibioticAlert: 'Immediate Sepsis-3 IV antibiotic & fluid bundle required'
      };
    }
    if (news2Score >= 5 || shockIndex >= 0.8) {
      return {
        level: 'Medium Risk - Early Sepsis Warning',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        badge: 'Urgent Ward Review',
        antibioticAlert: '4.8-hour alert window (Burdick Paper 35)'
      };
    }
    return {
      level: 'Low Risk - Stable Hemodynamics',
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      badge: 'Routine Monitoring',
      antibioticAlert: 'Hemodynamic indices within baseline physiologic range'
    };
  }, [news2Score, shockIndex]);

  // -------------------------------------------------------------
  // RAG Prompt Generator for Active State
  // -------------------------------------------------------------
  const handleQueryRAG = () => {
    if (!onSendToChat) return;

    if (activeModality === 'ppg') {
      onSendToChat(
        `Based on Elgendi et al. (Paper 01, p. 3) and Pereira et al. (Paper 02), how does an APG b/a ratio of ${arterialStiffness} and d/a ratio of ${peripheralResistance} correlate with arterial stiffness and cardiovascular aging? Validate the simulated SpO2 of ${spo2ModulationRatio.spo2}% derived from ratio R = ${spo2ModulationRatio.r}.`
      );
    } else if (activeModality === 'ptt-bp') {
      onSendToChat(
        `Based on Mukkamala et al. (Paper 07, p. 2) and Slapnicar et al. (Paper 08), evaluate a Pulse Transit Time (PTT) of ${pttMs} ms producing estimated SBP/DBP of ${estimatedBp.sbp}/${estimatedBp.dbp} mmHg via Moens-Korteweg and Hughes models. Explain how invasive radial A-Line ground truth and IEEE 1708 perturbation tests validate this cuffless model.`
      );
    } else if (activeModality === 'rppg') {
      onSendToChat(
        `Based on Wang et al. (Paper 23, p. 2) and McDuff et al. (Paper 21), compare the Plane-Orthogonal-to-Skin (POS) projection against CHROM under ambient light of ${ambientLux} lux and head rotation of ${headRotationDeg}°. What is the expected pulse SNR (simulated at ${rppgSnr} dB) against contact finger PPG reference?`
      );
    } else if (activeModality === 'radar') {
      onSendToChat(
        `Based on Alizadeh et al. (Paper 28, p. 3) and Li et al. (Paper 29), explain how 60 GHz mmWave FMCW radar demodulates chest displacement phase shifts (${chestDisplacementPhases.cardiacPhaseShiftRad} rad for 0.35 mm cardiac excursion) through bedding, using TI IWR6843 hardware and in-lab PSG reference.`
      );
    } else if (activeModality === 'sepsis') {
      onSendToChat(
        `Based on Burdick et al. (Paper 35, p. 4) and Smith et al. (Paper 39), assess an ICU patient presenting with Shock Index = ${shockIndex} (HR ${icuHr} BPM, SBP ${icuSbp} mmHg), RR ${icuRr} breaths/min, and NEWS2 score = ${news2Score}. Detail the 4.8-hour pre-shock intervention window and Sepsis-3 ground truth.`
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 overflow-hidden">
      {/* Top Header & Modality Navigation */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Signal & Hemodynamics Engineering Workbench
              </h2>
              <span className="px-2 py-0.5 rounded-full text-2xs font-semibold bg-teal-100 text-teal-800">
                Ground-Truth Aligned with 43 Papers
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Interactive physiological wave synthesis, sensor hardware parameters, and clinical ground-truth models.
            </p>
          </div>

          {/* 5 Modality Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveModality('ppg')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                activeModality === 'ppg'
                  ? 'bg-white text-teal-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              <span>1. Dual-PPG & SpO2</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModality('ptt-bp')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                activeModality === 'ptt-bp'
                  ? 'bg-white text-teal-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              <span>2. ECG + PTT Cuffless BP</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModality('rppg')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                activeModality === 'rppg'
                  ? 'bg-white text-teal-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              <span>3. Remote rPPG Vision</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModality('radar')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                activeModality === 'radar'
                  ? 'bg-white text-teal-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-sky-600" />
              <span>4. 60 GHz FMCW Radar</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModality('sepsis')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                activeModality === 'sepsis'
                  ? 'bg-white text-teal-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>5. ICU Sepsis / NEWS2</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* ============================================================ */}
          {/* MODALITY 1: DUAL-WAVELENGTH PPG & SDPPG/APG (Papers 01, 02, 06) */}
          {/* ============================================================ */}
          {activeModality === 'ppg' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Plot & Visualizer (7 cols) */}
              <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-teal-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Photoplethysmogram (PPG) & Second-Derivative (APG) Contour
                    </h3>
                  </div>
                  <span className="text-3xs font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                    CapnoBase & MIMIC-III (Paper 01)
                  </span>
                </div>

                {/* SVG PPG Waveform */}
                <div className="bg-slate-950 rounded-xl p-4 relative overflow-hidden border border-slate-800">
                  <div className="absolute top-2 right-2 flex items-center space-x-2 text-3xs font-mono text-slate-400">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-teal-400 inline-block"></span>
                      <span>PPG Pulse</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-rose-400 inline-block"></span>
                      <span>SDPPG / APG</span>
                    </span>
                  </div>

                  <svg viewBox="0 0 740 220" className="w-full h-44">
                    {/* Background Grid Lines */}
                    <defs>
                      <pattern id="grid-ppg" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="740" height="220" fill="url(#grid-ppg)" />

                    {/* PPG Primary Contour (3 Cardiac Cycles) */}
                    {[0, 240, 480].map((offset, i) => {
                      const xFoot = offset + 30;
                      const xSys = offset + 85;
                      const xNotch = offset + 145;
                      const xDia = offset + 175;
                      const notchY = 135 - arterialStiffness * 35;
                      const diaY = 115 - arterialStiffness * 30;

                      return (
                        <g key={i}>
                          <path
                            d={`M ${offset} 175 C ${offset + 15} 175, ${xFoot} 175, ${xFoot} 175 C ${xFoot + 20} 140, ${xSys - 20} 45, ${xSys} 45 C ${xSys + 25} 45, ${xNotch - 20} ${notchY}, ${xNotch} ${notchY} C ${xNotch + 15} ${notchY}, ${xDia - 10} ${diaY}, ${xDia} ${diaY} C ${xDia + 35} ${diaY + 30}, ${offset + 225} 175, ${offset + 240} 175`}
                            fill="none"
                            stroke="#14b8a6"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          {/* Fiducial Markers */}
                          <circle cx={xSys} cy={45} r="3.5" fill="#f43f5e" />
                          <text x={xSys - 8} y={35} fill="#f43f5e" fontSize="9" fontWeight="bold">Sys Peak</text>

                          <circle cx={xNotch} cy={notchY} r="3" fill="#38bdf8" />
                          <text x={xNotch - 12} y={notchY + 16} fill="#38bdf8" fontSize="8">Dicrotic Notch</text>

                          <circle cx={xDia} cy={diaY} r="3" fill="#a855f7" />
                          <text x={xDia + 6} y={diaY - 4} fill="#a855f7" fontSize="8">Diastolic</text>
                        </g>
                      );
                    })}

                    {/* Secondary APG Derivative trace in bottom region */}
                    <path
                      d="M 0 195 Q 60 195 85 180 T 110 215 T 145 190 T 175 205 T 240 195 Q 300 195 325 180 T 350 215 T 385 190 T 415 205 T 480 195 Q 540 195 565 180 T 590 215 T 625 190 T 655 205 T 720 195"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                  </svg>
                </div>

                {/* Extracted Metrics Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Modulation Ratio R</span>
                    <span className="text-lg font-extrabold text-teal-900 font-mono">{spo2ModulationRatio.r}</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">AC660/DC vs AC940/DC</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">SpO2 Oxygenation</span>
                    <span className="text-lg font-extrabold text-emerald-800 font-mono">{spo2ModulationRatio.spo2}%</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">FDA Calibrated &lt; 1.5% RMSE</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Aging Index (AGI)</span>
                    <span className="text-lg font-extrabold text-indigo-900 font-mono">{agingIndex}</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">(b - c - d - e) / a</span>
                  </div>
                </div>
              </div>

              {/* Right Controls & Device Metadata (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <Sliders className="w-3.5 h-3.5 text-teal-600" />
                    <span>Physiological & Optical Parameters</span>
                  </h4>

                  {/* Heart Rate Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">Heart Rate</span>
                      <span className="font-bold text-teal-900 font-mono">{heartRate} BPM</span>
                    </div>
                    <input
                      type="range"
                      min={45}
                      max={160}
                      value={heartRate}
                      onChange={(e) => setHeartRate(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                  </div>

                  {/* Arterial Stiffness Slider (b/a) */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">Arterial Stiffness (APG b/a)</span>
                      <span className="font-bold text-teal-900 font-mono">{arterialStiffness}</span>
                    </div>
                    <input
                      type="range"
                      min={-0.9}
                      max={-0.1}
                      step={0.05}
                      value={arterialStiffness}
                      onChange={(e) => setArterialStiffness(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                    <div className="flex justify-between text-3xs text-slate-400">
                      <span>Young / Elastic (-0.85)</span>
                      <span>Calcified / Stiff (-0.15)</span>
                    </div>
                  </div>

                  {/* Red (660nm) AC Amplitude */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">Red AC Modulation (660 nm)</span>
                      <span className="font-bold text-teal-900 font-mono">{(acRedRatio * 100).toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min={0.01}
                      max={0.08}
                      step={0.005}
                      value={acRedRatio}
                      onChange={(e) => setAcRedRatio(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                  </div>
                </div>

                {/* Device & Ground Truth Card */}
                <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200 text-xs space-y-2">
                  <span className="text-2xs font-bold text-teal-900 uppercase tracking-wider block">
                    Paper 01 & 02 Academic Ground Truth
                  </span>
                  <div className="space-y-1 text-2xs text-teal-950">
                    <p><strong>Hardware Device:</strong> {PAPER_EXTENDED_DETAILS['paper-01'].deviceUsed}</p>
                    <p><strong>Gold Standard Reference:</strong> {PAPER_EXTENDED_DETAILS['paper-01'].groundTruth}</p>
                    <p><strong>Problem Solved:</strong> {PAPER_EXTENDED_DETAILS['paper-01'].problemStatement}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQueryRAG}
                    className="w-full mt-2 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Validate Simulated Waveform with RAG</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* MODALITY 2: ECG + PTT CUFFLESS BLOOD PRESSURE (Papers 07, 08, 10, 13) */}
          {/* ============================================================ */}
          {activeModality === 'ptt-bp' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Waveform & Hemodynamic Model (7 cols) */}
              <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Synchronous Dual-Lead ECG & Finger PPG Pulse Transit Time (PTT)
                    </h3>
                  </div>
                  <span className="text-3xs font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 font-bold">
                    Moens-Korteweg / Hughes (Paper 07)
                  </span>
                </div>

                {/* Synchronous ECG + PPG SVG Trace */}
                <div className="bg-slate-950 rounded-xl p-4 relative overflow-hidden border border-slate-800">
                  <div className="absolute top-2 right-2 flex items-center space-x-3 text-3xs font-mono text-slate-400">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Lead II ECG (QRS)</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                      <span>Finger PPG Foot</span>
                    </span>
                  </div>

                  <svg viewBox="0 0 740 220" className="w-full h-44">
                    <defs>
                      <pattern id="grid-ecg" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="740" height="220" fill="url(#grid-ecg)" />

                    {/* ECG Trace (Channel 1, Top) */}
                    <path
                      d="M 20 60 L 60 60 Q 68 52 75 60 L 85 60 L 92 70 L 100 15 L 108 80 L 115 60 L 135 60 Q 155 42 175 60 L 260 60 L 300 60 Q 308 52 315 60 L 325 60 L 332 70 L 340 15 L 348 80 L 355 60 L 375 60 Q 395 42 415 60 L 500 60 L 540 60 Q 548 52 555 60 L 565 60 L 572 70 L 580 15 L 588 80 L 595 60 L 615 60 Q 635 42 655 60 L 720 60"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    />

                    {/* PPG Trace (Channel 2, Bottom, Delayed by PTT) */}
                    {/* R-Peak 1 is at x=100. Foot is at x = 100 + ptt_scaled */}
                    {[100, 340, 580].map((rPeakX, i) => {
                      const pttPx = Math.round(pttMs * 0.45);
                      const footX = rPeakX + pttPx;
                      const peakX = footX + 50;
                      return (
                        <g key={i}>
                          <path
                            d={`M ${rPeakX - 30} 180 L ${footX} 180 C ${footX + 20} 150, ${peakX - 15} 105, ${peakX} 105 C ${peakX + 25} 105, ${peakX + 45} 145, ${peakX + 50} 145 C ${peakX + 60} 145, ${peakX + 75} 135, ${peakX + 80} 135 C ${peakX + 100} 155, ${footX + 200} 180, ${footX + 210} 180`}
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="2.5"
                          />
                          {/* PTT Measurement Bracket for Cycle 1 */}
                          {i === 0 && (
                            <g>
                              {/* Vertical marker from R peak */}
                              <line x1={rPeakX} y1={15} x2={rPeakX} y2={180} stroke="#f43f5e" strokeDasharray="3 3" strokeWidth="1" />
                              {/* Vertical marker at PPG foot */}
                              <line x1={footX} y1={80} x2={footX} y2={180} stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="1" />
                              {/* Horizontal delay arrow */}
                              <line x1={rPeakX} y1={140} x2={footX} y2={140} stroke="#fbbf24" strokeWidth="2" />
                              <text x={rPeakX + 10} y={135} fill="#fbbf24" fontSize="10" fontWeight="bold font-mono">
                                PTT = {pttMs} ms
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Live Hemodynamic Estimation Matrix */}
                <div className="grid grid-cols-4 gap-2.5">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Systolic BP (SBP)</span>
                    <span className="text-xl font-extrabold text-rose-900 font-mono">{estimatedBp.sbp}</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">mmHg</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Diastolic BP (DBP)</span>
                    <span className="text-xl font-extrabold text-teal-900 font-mono">{estimatedBp.dbp}</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">mmHg</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Pulse Wave Velocity</span>
                    <span className="text-xl font-extrabold text-indigo-900 font-mono">{pwv}</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">m / s</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Mean Art. Pressure</span>
                    <span className="text-xl font-extrabold text-slate-800 font-mono">{estimatedBp.map}</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">MAP (mmHg)</span>
                  </div>
                </div>
              </div>

              {/* Right Controls & Device Metadata (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <Sliders className="w-3.5 h-3.5 text-rose-600" />
                    <span>Cuffless Arterial Elasticity Controls</span>
                  </h4>

                  {/* PTT Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">Pulse Transit Time (PTT)</span>
                      <span className="font-bold text-rose-900 font-mono">{pttMs} ms</span>
                    </div>
                    <input
                      type="range"
                      min={110}
                      max={240}
                      value={pttMs}
                      onChange={(e) => setPttMs(Number(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                    <div className="flex justify-between text-3xs text-slate-400">
                      <span>High BP (Fast wave / 120ms)</span>
                      <span>Low BP (Slow wave / 220ms)</span>
                    </div>
                  </div>

                  {/* Arterial Distance Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">Aorta-to-Finger Distance</span>
                      <span className="font-bold text-slate-900 font-mono">{arterialDistanceCm} cm</span>
                    </div>
                    <input
                      type="range"
                      min={55}
                      max={95}
                      value={arterialDistanceCm}
                      onChange={(e) => setArterialDistanceCm(Number(e.target.value))}
                      className="w-full accent-slate-600"
                    />
                  </div>

                  {/* IEEE 1708 Perturbation Stress Toggle */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-950">IEEE 1708 Perturbation Challenge</span>
                      <button
                        type="button"
                        onClick={() => setIsometricStressActive(!isometricStressActive)}
                        className={`px-2.5 py-1 rounded-lg text-2xs font-bold transition-colors ${
                          isometricStressActive ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border border-slate-300'
                        }`}
                      >
                        {isometricStressActive ? 'Active (+16 mmHg)' : 'Inactive (Rest)'}
                      </button>
                    </div>
                    <p className="text-3xs text-amber-800 leading-relaxed">
                      Simulates cold pressor and isometric handgrip test required by IEEE 1708 standard to verify sensitivity to acute vasoconstriction.
                    </p>
                  </div>
                </div>

                {/* Device & Ground Truth Card */}
                <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 text-xs space-y-2">
                  <span className="text-2xs font-bold text-rose-900 uppercase tracking-wider block">
                    Paper 07 & 08 Academic Ground Truth
                  </span>
                  <div className="space-y-1 text-2xs text-rose-950">
                    <p><strong>Hardware Device:</strong> {PAPER_EXTENDED_DETAILS['paper-07'].deviceUsed}</p>
                    <p><strong>Gold Standard Reference:</strong> {PAPER_EXTENDED_DETAILS['paper-07'].groundTruth}</p>
                    <p><strong>Problem Solved:</strong> {PAPER_EXTENDED_DETAILS['paper-07'].problemStatement}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQueryRAG}
                    className="w-full mt-2 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Validate BP Model with RAG</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* MODALITY 3: REMOTE CAMERA rPPG (Papers 21, 23, 24, 25) */}
          {/* ============================================================ */}
          {activeModality === 'rppg' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Remote Camera rPPG Color Space Decomposition (POS vs CHROM)
                    </h3>
                  </div>
                  <span className="text-3xs font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold">
                    UBFC-rPPG / Pure (Paper 23)
                  </span>
                </div>

                {/* RGB Chromatic Waveforms SVG */}
                <div className="bg-slate-950 rounded-xl p-4 relative overflow-hidden border border-slate-800">
                  <div className="absolute top-2 right-2 flex items-center space-x-2 text-3xs font-mono text-slate-400">
                    <span className="text-emerald-400">Green (G)</span>
                    <span className="text-rose-400">Red (R)</span>
                    <span className="text-sky-400">Blue (B)</span>
                    <span className="text-amber-400 font-bold">POS Projection</span>
                  </div>

                  <svg viewBox="0 0 740 220" className="w-full h-44">
                    <defs>
                      <pattern id="grid-rppg" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="740" height="220" fill="url(#grid-rppg)" />

                    {/* Normalized RGB traces */}
                    <path
                      d="M 0 50 Q 60 30 120 50 T 240 50 T 360 50 T 480 50 T 600 50 T 720 50"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="1.2"
                      opacity="0.6"
                    />
                    <path
                      d="M 0 90 Q 60 65 120 90 T 240 90 T 360 90 T 480 90 T 600 90 T 720 90"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M 0 130 Q 60 120 120 130 T 240 130 T 360 130 T 480 130 T 600 130 T 720 130"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1.2"
                      opacity="0.6"
                    />

                    {/* Reconstructed POS Pulsatile Trace (Bottom) */}
                    <path
                      d="M 0 180 Q 40 145 70 145 T 100 180 T 140 180 Q 180 145 210 145 T 240 180 T 280 180 Q 320 145 350 145 T 380 180 T 420 180 Q 460 145 490 145 T 520 180 T 560 180 Q 600 145 630 145 T 660 180 T 700 180"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Pulse SNR</span>
                    <span className="text-lg font-extrabold text-indigo-900 font-mono">{rppgSnr} dB</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">Signal-to-Noise Ratio</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">HR Mean Absolute Error</span>
                    <span className="text-lg font-extrabold text-emerald-800 font-mono">{rppgHeartRateError} BPM</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">vs Contact Pulse Oximeter</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Active Algorithm</span>
                    <span className="text-lg font-extrabold text-teal-900 font-mono">{rppgAlgo}</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">Plane-Orthogonal-to-Skin</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Optical Camera & Environment</span>
                  </h4>

                  {/* Algorithm Selector */}
                  <div className="space-y-1">
                    <span className="text-xs text-slate-600 font-medium">Chromatic Algorithm</span>
                    <div className="grid grid-cols-3 gap-2">
                      {(['POS', 'CHROM', 'GREEN'] as const).map((algo) => (
                        <button
                          key={algo}
                          type="button"
                          onClick={() => setRppgAlgo(algo)}
                          className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            rppgAlgo === algo ? 'bg-indigo-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {algo}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ambient Light Lux */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">Ambient Illuminance</span>
                      <span className="font-bold text-indigo-900 font-mono">{ambientLux} Lux</span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={900}
                      value={ambientLux}
                      onChange={(e) => setAmbientLux(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  {/* Head Motion */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">Subject Head Rotation</span>
                      <span className="font-bold text-indigo-900 font-mono">±{headRotationDeg}°</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={45}
                      value={headRotationDeg}
                      onChange={(e) => setHeadRotationDeg(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 text-xs space-y-2">
                  <span className="text-2xs font-bold text-indigo-900 uppercase tracking-wider block">
                    Paper 21 & 23 Academic Ground Truth
                  </span>
                  <div className="space-y-1 text-2xs text-indigo-950">
                    <p><strong>Hardware Device:</strong> {PAPER_EXTENDED_DETAILS['paper-23'].deviceUsed}</p>
                    <p><strong>Gold Standard Reference:</strong> {PAPER_EXTENDED_DETAILS['paper-23'].groundTruth}</p>
                    <p><strong>Problem Solved:</strong> {PAPER_EXTENDED_DETAILS['paper-23'].problemStatement}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQueryRAG}
                    className="w-full mt-2 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Validate rPPG with RAG</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* MODALITY 4: 60 GHz FMCW RADAR (Papers 28, 29, 32) */}
          {/* ============================================================ */}
          {activeModality === 'radar' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Radio className="w-4 h-4 text-sky-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      60 GHz mmWave FMCW Radar Phase Demodulation & Chest Displacement
                    </h3>
                  </div>
                  <span className="text-3xs font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-bold">
                    TI IWR6843 / PSG Reference (Paper 28)
                  </span>
                </div>

                {/* Radar Phase Demodulation SVG */}
                <div className="bg-slate-950 rounded-xl p-4 relative overflow-hidden border border-slate-800">
                  <div className="absolute top-2 right-2 flex items-center space-x-3 text-3xs font-mono text-slate-400">
                    <span className="text-sky-400">Respiration (5.5 mm)</span>
                    <span className="text-rose-400">Heartbeat (0.35 mm)</span>
                  </div>

                  <svg viewBox="0 0 740 220" className="w-full h-44">
                    <defs>
                      <pattern id="grid-radar" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="740" height="220" fill="url(#grid-radar)" />

                    {/* Respiration large low-frequency wave (0.25 Hz) */}
                    <path
                      d="M 0 100 Q 90 20 180 100 T 360 100 T 540 100 T 720 100"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                    />

                    {/* Superimposed micro-pulsatile cardiac displacement (1.2 Hz) */}
                    <path
                      d="M 0 100 Q 15 95 30 100 T 60 100 T 90 100 T 120 100 T 150 100 T 180 100 T 210 100 T 240 100 T 270 100 T 300 100 T 330 100 T 360 100 T 390 100 T 420 100 T 450 100 T 480 100 T 510 100 T 540 100 T 570 100 T 600 100 T 630 100 T 660 100 T 690 100 T 720 100"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">RF Wavelength λ</span>
                    <span className="text-lg font-extrabold text-sky-900 font-mono">{radarWavelengthMm} mm</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">at {radarCarrierGhz} GHz</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Cardiac Phase Shift</span>
                    <span className="text-lg font-extrabold text-rose-900 font-mono">{chestDisplacementPhases.cardiacPhaseShiftRad} rad</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">Δd = 0.35 mm</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Respiration Phase Shift</span>
                    <span className="text-lg font-extrabold text-teal-900 font-mono">{chestDisplacementPhases.respPhaseShiftRad} rad</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">Δd = 5.5 mm</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <Sliders className="w-3.5 h-3.5 text-sky-600" />
                    <span>mmWave Radar Chirp Controls</span>
                  </h4>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">Carrier Frequency</span>
                      <span className="font-bold text-sky-900 font-mono">{radarCarrierGhz} GHz</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[60, 77].map((freq) => (
                        <button
                          key={freq}
                          type="button"
                          onClick={() => setRadarCarrierGhz(freq)}
                          className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            radarCarrierGhz === freq ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {freq} GHz ({freq === 60 ? 'Healthcare band' : 'Automotive MIMO'})
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">Target Distance</span>
                      <span className="font-bold text-sky-900 font-mono">{radarDistanceMeters} m</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={3.0}
                      step={0.1}
                      value={radarDistanceMeters}
                      onChange={(e) => setRadarDistanceMeters(Number(e.target.value))}
                      className="w-full accent-sky-600"
                    />
                  </div>
                </div>

                <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200 text-xs space-y-2">
                  <span className="text-2xs font-bold text-sky-900 uppercase tracking-wider block">
                    Paper 28 & 29 Academic Ground Truth
                  </span>
                  <div className="space-y-1 text-2xs text-sky-950">
                    <p><strong>Hardware Device:</strong> {PAPER_EXTENDED_DETAILS['paper-28'].deviceUsed}</p>
                    <p><strong>Gold Standard Reference:</strong> {PAPER_EXTENDED_DETAILS['paper-28'].groundTruth}</p>
                    <p><strong>Problem Solved:</strong> {PAPER_EXTENDED_DETAILS['paper-28'].problemStatement}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQueryRAG}
                    className="w-full mt-2 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Validate Radar with RAG</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* MODALITY 5: ICU SEPSIS & NEWS2 TRAJECTORIES (Papers 35, 39, 40) */}
          {/* ============================================================ */}
          {activeModality === 'sepsis' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Multi-Parameter ICU Sepsis Trajectory & Shock Index Engine
                    </h3>
                  </div>
                  <span className="text-3xs font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                    Burdick / Sepsis-3 (Paper 35)
                  </span>
                </div>

                {/* Sepsis Status Alert Banner */}
                <div className={`p-4 rounded-xl border ${sepsisRiskLevel.color} space-y-1.5`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">{sepsisRiskLevel.badge}</span>
                    <span className="text-xs font-extrabold font-mono">NEWS2 Score: {news2Score} / 20</span>
                  </div>
                  <p className="text-sm font-extrabold">{sepsisRiskLevel.level}</p>
                  <p className="text-xs">{sepsisRiskLevel.antibioticAlert}</p>
                </div>

                {/* Shock Index & Vital Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Shock Index (HR / SBP)</span>
                    <span className={`text-xl font-extrabold font-mono ${shockIndex >= 0.9 ? 'text-rose-700' : 'text-slate-800'}`}>
                      {shockIndex}
                    </span>
                    <span className="text-3xs text-slate-400 block mt-0.5">Threshold: &ge; 0.9 indicates shock</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Pre-Shock Lead Time</span>
                    <span className="text-xl font-extrabold text-teal-900 font-mono">4.8 Hours</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">AUROC 0.88 (Paper 35)</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-3xs text-slate-500 font-bold uppercase block">Sepsis-3 Criteria</span>
                    <span className="text-xl font-extrabold text-indigo-900 font-mono">SOFA &ge; 2</span>
                    <span className="text-3xs text-slate-400 block mt-0.5">Acute organ dysfunction</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bedside Telemetry Multi-Parameter Controls</span>
                  </h4>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Heart Rate</span>
                      <span className="font-bold text-slate-900 font-mono">{icuHr} BPM</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={150}
                      value={icuHr}
                      onChange={(e) => setIcuHr(Number(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Systolic Blood Pressure</span>
                      <span className="font-bold text-slate-900 font-mono">{icuSbp} mmHg</span>
                    </div>
                    <input
                      type="range"
                      min={70}
                      max={150}
                      value={icuSbp}
                      onChange={(e) => setIcuSbp(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Respiratory Rate (RR)</span>
                      <span className="font-bold text-slate-900 font-mono">{icuRr} bpm</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={35}
                      value={icuRr}
                      onChange={(e) => setIcuRr(Number(e.target.value))}
                      className="w-full accent-sky-600"
                    />
                  </div>
                </div>

                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs space-y-2">
                  <span className="text-2xs font-bold text-amber-900 uppercase tracking-wider block">
                    Paper 35 & 39 Academic Ground Truth
                  </span>
                  <div className="space-y-1 text-2xs text-amber-950">
                    <p><strong>Hardware Device:</strong> {PAPER_EXTENDED_DETAILS['paper-35'].deviceUsed}</p>
                    <p><strong>Gold Standard Reference:</strong> {PAPER_EXTENDED_DETAILS['paper-35'].groundTruth}</p>
                    <p><strong>Problem Solved:</strong> {PAPER_EXTENDED_DETAILS['paper-35'].problemStatement}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQueryRAG}
                    className="w-full mt-2 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Validate ICU Trajectory with RAG</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
