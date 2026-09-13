export interface SampleClinicalVisual {
  id: string;
  title: string;
  category: 'Figure' | 'Table' | 'Waveform';
  description: string;
  suggestedPrompt: string;
  dataUrl: string;
  svgContent: string;
  mimeType: string;
}

// Universal SVG Data URI helper
function makeSvgDataUri(svg: string): string {
  const clean = svg.trim();
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(clean)}`;
}

// 1. PPG Waveform & SDPPG Fiducials
const SVG_PPG_WAVEFORM = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460" style="background:#0b1329;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="800" height="460" fill="#0b1329" rx="12"/>
  <defs>
    <pattern id="grid-ppg" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#16223f" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="460" fill="url(#grid-ppg)" />

  <text x="30" y="38" fill="#38bdf8" font-size="16" font-weight="700">FIGURE 1: Photoplethysmogram (PPG) Morphological Contour &amp; SDPPG Fiducials</text>
  <text x="30" y="60" fill="#94a3b8" font-size="12">Microvascular Optical Plethysmography (660/940 nm) | Sampling: 125 Hz | Elgendi et al., Page 1-3</text>

  <line x1="60" y1="360" x2="740" y2="360" stroke="#334155" stroke-width="2"/>
  <line x1="60" y1="80" x2="60" y2="360" stroke="#334155" stroke-width="2"/>
  <text x="730" y="385" fill="#64748b" font-size="11" text-anchor="end">Time (ms) →</text>
  <text x="50" y="85" fill="#64748b" font-size="11" text-anchor="end">PPG (mV) ↑</text>

  <path d="M 80 340 C 110 338, 140 330, 160 300 C 180 230, 200 120, 230 110 C 250 100, 270 170, 290 220 C 300 245, 310 248, 320 235 C 335 220, 350 250, 380 300 C 400 330, 420 340, 450 340 C 480 338, 510 330, 530 300 C 550 230, 570 120, 600 110 C 620 100, 640 170, 660 220 C 670 245, 680 248, 690 235 C 705 220, 720 250, 740 310" 
        fill="none" stroke="#2dd4bf" stroke-width="3.5" stroke-linecap="round"/>

  <circle cx="160" cy="300" r="5" fill="#38bdf8"/>
  <text x="135" y="325" fill="#38bdf8" font-size="11" font-weight="600">Pulse Foot (Onset)</text>

  <circle cx="230" cy="110" r="6" fill="#f43f5e"/>
  <line x1="230" y1="110" x2="230" y2="80" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3,3"/>
  <text x="230" y="72" fill="#f43f5e" font-size="12" font-weight="700" text-anchor="middle">Systolic Peak (S)</text>

  <circle cx="310" cy="245" r="5" fill="#f59e0b"/>
  <line x1="310" y1="245" x2="310" y2="280" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3"/>
  <text x="310" y="295" fill="#f59e0b" font-size="11" font-weight="600" text-anchor="middle">Dicrotic Notch</text>

  <circle cx="335" cy="220" r="5" fill="#a855f7"/>
  <text x="350" y="210" fill="#a855f7" font-size="11" font-weight="600">Diastolic Peak (D)</text>

  <rect x="440" y="150" width="330" height="170" fill="#16223f" rx="8" stroke="#2a3c63"/>
  <text x="455" y="175" fill="#f8fafc" font-size="12" font-weight="700">Hemodynamic Indices Derived:</text>
  <text x="455" y="198" fill="#94a3b8" font-size="11">• Augmentation Index (AIx) = (H_diastolic / H_systolic) × 100%</text>
  <text x="455" y="218" fill="#94a3b8" font-size="11">• Stiffness Index (SI) = Subject Height / ΔT (Peak-to-Notch)</text>
  <text x="455" y="238" fill="#94a3b8" font-size="11">• Reflection Index (RI) = Reflected Wave Amplitude / Forward Wave</text>
  <text x="455" y="258" fill="#94a3b8" font-size="11">• Acceleration APG Index: AGI = (b - c - d - e) / a</text>
  <text x="455" y="280" fill="#38bdf8" font-size="11" font-weight="600">Referenced in Papers: Elgendi (p. 2-4), Pereira (p. 3), Slapnicar (p. 3)</text>
  <text x="455" y="302" fill="#2dd4bf" font-size="11" font-weight="600">CapnoBase Dataset &amp; MIMIC-III (n=1,200 recordings)</text>
</svg>`;

// 2. Dual-Lead PTT & Cuffless BP Model
const SVG_PTT_BP_MODEL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460" style="background:#0b1329;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="800" height="460" fill="#0b1329" rx="12"/>
  
  <text x="30" y="38" fill="#38bdf8" font-size="16" font-weight="700">FIGURE 2: Dual-Lead Pulse Transit Time (PTT) vs Pulse Arrival Time (PAT)</text>
  <text x="30" y="60" fill="#94a3b8" font-size="12">Hemodynamic Relationship: Moens-Korteweg &amp; Hughes Elasticity | Mukkamala et al. (Paper 07, Page 2)</text>

  <text x="50" y="105" fill="#ec4899" font-size="12" font-weight="700">Lead II ECG (Ventricular Depolarization)</text>
  <path d="M 50 150 L 150 150 L 165 155 L 175 145 L 185 80 L 195 170 L 205 150 L 240 150 C 260 150, 270 130, 285 130 C 300 130, 310 150, 330 150 L 440 150" 
        fill="none" stroke="#ec4899" stroke-width="3"/>
  <circle cx="185" cy="80" r="5" fill="#f43f5e"/>
  <text x="185" y="70" fill="#f43f5e" font-size="11" font-weight="700" text-anchor="middle">R-Peak (t_ECG)</text>

  <text x="50" y="235" fill="#14b8a6" font-size="12" font-weight="700">Finger PPG (Peripheral Arterial Arrival)</text>
  <path d="M 50 280 L 250 280 C 280 280, 300 250, 320 200 C 335 170, 345 175, 360 220 C 370 230, 380 230, 390 225 C 405 220, 420 250, 440 280" 
        fill="none" stroke="#14b8a6" stroke-width="3"/>
  <circle cx="280" cy="280" r="5" fill="#38bdf8"/>
  <text x="280" y="305" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">PPG Foot (t_PPG)</text>

  <line x1="185" y1="80" x2="185" y2="340" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="4,4"/>
  <line x1="280" y1="200" x2="280" y2="340" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4,4"/>

  <line x1="185" y1="330" x2="280" y2="330" stroke="#fbbf24" stroke-width="3"/>
  <circle cx="185" cy="330" r="3" fill="#fbbf24"/>
  <circle cx="280" cy="330" r="3" fill="#fbbf24"/>
  <text x="232" y="355" fill="#fbbf24" font-size="12" font-weight="700" text-anchor="middle">PAT = PEP + PTT (~180 ms)</text>

  <rect x="460" y="85" width="310" height="325" fill="#16223f" rx="8" stroke="#2a3c63"/>
  <text x="475" y="110" fill="#38bdf8" font-size="13" font-weight="700">Hemodynamic Physics Formulation</text>
  
  <text x="475" y="138" fill="#e2e8f0" font-size="11" font-weight="600">1. Pulse Wave Velocity (PWV):</text>
  <text x="490" y="158" fill="#94a3b8" font-size="11">PWV = Distance (L) / PTT = √(h · E_inc / (ρ · D))</text>

  <text x="475" y="188" fill="#e2e8f0" font-size="11" font-weight="600">2. Hughes Elastic Modulus Equation:</text>
  <text x="490" y="208" fill="#94a3b8" font-size="11">E_inc = E_0 · exp(γ · Blood_Pressure)</text>

  <text x="475" y="238" fill="#e2e8f0" font-size="11" font-weight="600">3. Cuffless Blood Pressure Inverse Law:</text>
  <text x="490" y="258" fill="#34d399" font-size="11" font-weight="700">BP ≈ (2/γ) · ln(L / (PTT · c_0))</text>
  
  <text x="475" y="290" fill="#f59e0b" font-size="11" font-weight="600">Clinical Confounding Warning (Paper 09):</text>
  <text x="475" y="310" fill="#94a3b8" font-size="10">• Pre-Ejection Period (PEP) varies with posture &amp; stress.</text>
  <text x="475" y="325" fill="#94a3b8" font-size="10">• Single-site PPG cannot decouple PEP from vascular PTT.</text>
  <text x="475" y="340" fill="#94a3b8" font-size="10">• Must evaluate perturbation per IEEE 1708 (±15 mmHg).</text>
  <text x="475" y="360" fill="#38bdf8" font-size="10" font-weight="600">Validation: VitalDB &amp; MIMIC-III (n=1,420 subjects)</text>
</svg>`;

// 3. Remote rPPG & Melanin Attenuation Plane
const SVG_RPPG_MELANIN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460" style="background:#0b1329;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="800" height="460" fill="#0b1329" rx="12"/>
  
  <text x="30" y="38" fill="#38bdf8" font-size="16" font-weight="700">FIGURE 3: Remote Camera rPPG Plane-Orthogonal-to-Skin (POS) &amp; Melanin Space</text>
  <text x="30" y="60" fill="#94a3b8" font-size="12">Color Space Projection: POS &amp; CHROM Models | Wang et al. (Paper 21) &amp; Nowara et al. (Paper 23)</text>

  <!-- Color Space Axes -->
  <line x1="80" y1="340" x2="360" y2="340" stroke="#334155" stroke-width="2"/>
  <line x1="80" y1="120" x2="80" y2="340" stroke="#334155" stroke-width="2"/>
  <text x="350" y="365" fill="#64748b" font-size="11" text-anchor="end">Normalized G-B Axis →</text>
  <text x="70" y="125" fill="#64748b" font-size="11" text-anchor="end">G+B-2R Axis ↑</text>

  <!-- Skin Tone Vectors -->
  <line x1="80" y1="340" x2="320" y2="160" stroke="#fbbf24" stroke-width="3" stroke-dasharray="6,4"/>
  <text x="330" y="165" fill="#fbbf24" font-size="11" font-weight="700">Skin Tone Vector (Specular Base)</text>

  <!-- Pulsatile Vector -->
  <line x1="160" y1="280" x2="220" y2="200" stroke="#f43f5e" stroke-width="3.5"/>
  <polygon points="220,200 212,207 222,212" fill="#f43f5e"/>
  <text x="235" y="205" fill="#f43f5e" font-size="11" font-weight="700">Pulsatile Capillary Hemoglobin</text>

  <!-- Projection Plane -->
  <line x1="120" y1="180" x2="280" y2="300" stroke="#38bdf8" stroke-width="2"/>
  <text x="285" y="315" fill="#38bdf8" font-size="11" font-weight="600">Orthogonal Projection Plane (POS)</text>

  <!-- Right Details Box -->
  <rect x="420" y="85" width="350" height="325" fill="#16223f" rx="8" stroke="#2a3c63"/>
  <text x="435" y="110" fill="#38bdf8" font-size="13" font-weight="700">Algorithmic Formulation &amp; Bias Mitigation</text>

  <text x="435" y="135" fill="#e2e8f0" font-size="11" font-weight="600">1. POS Transformation Matrices:</text>
  <text x="445" y="155" fill="#94a3b8" font-size="11">S_1 = G - B</text>
  <text x="445" y="172" fill="#94a3b8" font-size="11">S_2 = G + B - 2R</text>
  <text x="445" y="190" fill="#34d399" font-size="11" font-weight="700">S = S_1 + (σ(S_1) / σ(S_2)) · S_2</text>

  <text x="435" y="220" fill="#e2e8f0" font-size="11" font-weight="600">2. Melanin Damping Correction (Paper 23):</text>
  <text x="445" y="240" fill="#94a3b8" font-size="10">Fitzpatrick V-VI skin absorbs ~65% more incident green light.</text>
  <text x="445" y="255" fill="#94a3b8" font-size="10">Adversarial domain adaptation balances SNR across phototypes.</text>
  <text x="445" y="270" fill="#94a3b8" font-size="10">DeepPhys 3D-CNN attention isolates pulsatile regions-of-interest.</text>

  <text x="435" y="300" fill="#f59e0b" font-size="11" font-weight="600">Clinical Benchmark (UBFC-rPPG, PURE):</text>
  <text x="445" y="320" fill="#94a3b8" font-size="10">• HR MAE (Resting): 1.15 BPM | Motion HR MAE: 3.42 BPM</text>
  <text x="445" y="335" fill="#94a3b8" font-size="10">• Respiration RMSE: 1.45 breaths/min | SpO2 RMSE: 2.1%</text>
  <text x="445" y="350" fill="#94a3b8" font-size="10">• Camera: 1080p @ 30 FPS under natural ambient lighting</text>
</svg>`;

// 4. 60 GHz FMCW Radar Micron Chest Displacement
const SVG_RADAR_DISPLACEMENT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460" style="background:#0b1329;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="800" height="460" fill="#0b1329" rx="12"/>
  
  <text x="30" y="38" fill="#38bdf8" font-size="16" font-weight="700">FIGURE 4: 60 GHz FMCW Radar Phase-to-Chest Micron Displacement Waveform</text>
  <text x="30" y="60" fill="#94a3b8" font-size="12">Microwave Phase Interferometry (λ = 5 mm) | Alizadeh et al. (Paper 28) &amp; Sleep Apnea (Paper 32)</text>

  <!-- Large Respiration Wave with Superimposed Cardiac Ballistocardiogram -->
  <text x="50" y="105" fill="#38bdf8" font-size="12" font-weight="700">Chest Wall Displacement: Respiration (2-12 mm) + Ballistocardiogram (50-200 µm)</text>
  
  <path d="M 50 250 C 90 140, 130 140, 170 250 C 210 360, 250 360, 290 250 C 330 140, 370 140, 410 250 C 450 360, 490 360, 530 250 C 570 140, 610 140, 650 250 C 690 360, 730 360, 750 250" 
        fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3,3"/>

  <!-- High-frequency BCG micro-ripples on top of breathing -->
  <path d="M 50 250 Q 60 230, 70 245 Q 80 200, 90 205 Q 110 145, 130 148 Q 150 190, 170 250 Q 185 300, 200 290 Q 220 355, 240 348 Q 265 310, 290 250 Q 305 200, 320 195 Q 345 145, 370 148 Q 390 200, 410 250 Q 430 310, 450 300 Q 470 355, 490 350 Q 510 310, 530 250 Q 550 200, 570 195 Q 590 145, 610 148 Q 630 200, 650 250 Q 670 310, 690 300 Q 710 355, 730 350 Q 740 300, 750 250" 
        fill="none" stroke="#22c55e" stroke-width="3"/>

  <!-- Annotations -->
  <rect x="50" y="380" width="700" height="60" fill="#16223f" rx="6" stroke="#2a3c63"/>
  <text x="65" y="402" fill="#38bdf8" font-size="11" font-weight="700">Microwave Interferometric Equation:</text>
  <text x="65" y="424" fill="#34d399" font-size="11" font-weight="600">Δx(t) = (λ / (4π)) · Δφ(t)</text>
  <text x="250" y="424" fill="#94a3b8" font-size="11">| Carrier f_c = 60 GHz, Bandwidth B = 4 GHz, λ = 5 mm</text>
  <text x="560" y="424" fill="#fbbf24" font-size="11">Phase Sensitivity: ~1.2 µm / degree</text>
</svg>`;

// 5. Dual-Wavelength Hemoglobin Absorption Spectra
const SVG_HEMOGLOBIN_SPECTRA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460" style="background:#0b1329;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="800" height="460" fill="#0b1329" rx="12"/>
  
  <text x="30" y="38" fill="#38bdf8" font-size="16" font-weight="700">FIGURE 5: Hemoglobin Molar Extinction Spectra (Hb vs HbO2) &amp; Isosbestic Point</text>
  <text x="30" y="60" fill="#94a3b8" font-size="12">Modified Beer-Lambert Law &amp; Pulse Oximetry Ratio of Ratios | Webster et al. &amp; Elgendi (Paper 01)</text>

  <line x1="80" y1="360" x2="740" y2="360" stroke="#334155" stroke-width="2"/>
  <line x1="80" y1="90" x2="80" y2="360" stroke="#334155" stroke-width="2"/>
  <text x="730" y="385" fill="#64748b" font-size="11" text-anchor="end">Wavelength λ (nm) →</text>
  <text x="70" y="95" fill="#64748b" font-size="11" text-anchor="end">Extinction ε (cm^-1 / M) ↑</text>

  <!-- Hb Curve (Deoxyhemoglobin, blue/purple) -->
  <path d="M 100 130 C 160 140, 220 200, 300 240 C 380 270, 440 270, 500 280 C 580 290, 660 300, 720 310" 
        fill="none" stroke="#818cf8" stroke-width="3.5"/>
  <text x="210" y="190" fill="#818cf8" font-size="12" font-weight="700">Deoxygenated Hb</text>

  <!-- HbO2 Curve (Oxyhemoglobin, red) -->
  <path d="M 100 320 C 160 310, 220 290, 300 280 C 380 270, 440 250, 500 210 C 580 180, 660 170, 720 165" 
        fill="none" stroke="#f43f5e" stroke-width="3.5"/>
  <text x="630" y="160" fill="#f43f5e" font-size="12" font-weight="700">Oxygenated HbO2</text>

  <!-- Wavelength Markers -->
  <!-- 660 nm Red -->
  <line x1="220" y1="90" x2="220" y2="360" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4"/>
  <text x="220" y="80" fill="#ef4444" font-size="11" font-weight="700" text-anchor="middle">660 nm (Red)</text>

  <!-- 805 nm Isosbestic -->
  <circle cx="390" cy="270" r="6" fill="#fbbf24"/>
  <line x1="390" y1="90" x2="390" y2="360" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,4"/>
  <text x="390" y="80" fill="#fbbf24" font-size="11" font-weight="700" text-anchor="middle">805 nm (Isosbestic)</text>
  <text x="390" y="295" fill="#fbbf24" font-size="10" font-weight="600" text-anchor="middle">ε_Hb = ε_HbO2</text>

  <!-- 940 nm IR -->
  <line x1="620" y1="90" x2="620" y2="360" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,4"/>
  <text x="620" y="80" fill="#10b981" font-size="11" font-weight="700" text-anchor="middle">940 nm (Infrared)</text>

  <rect x="420" y="290" width="320" height="60" fill="#16223f" rx="6" stroke="#2a3c63"/>
  <text x="430" y="310" fill="#38bdf8" font-size="11" font-weight="700">Ratio-of-Ratios Calibration Formula:</text>
  <text x="430" y="332" fill="#34d399" font-size="11" font-weight="600">R = (AC_660 / DC_660) / (AC_940 / DC_940)</text>
</svg>`;

// 6. Invasive Radial A-Line vs Cuffless PINN
const SVG_ALINE_VS_PINN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460" style="background:#0b1329;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="800" height="460" fill="#0b1329" rx="12"/>
  
  <text x="30" y="38" fill="#38bdf8" font-size="16" font-weight="700">FIGURE 6: Invasive Radial Arterial Line (A-Line) vs Cuffless PINN Waveform</text>
  <text x="30" y="60" fill="#94a3b8" font-size="12">Continuous Hemodynamic Pressure Tracking | VitalDB &amp; MIMIC-III ICU Cohort (Paper 07 &amp; 08)</text>

  <line x1="70" y1="360" x2="740" y2="360" stroke="#334155" stroke-width="2"/>
  <line x1="70" y1="80" x2="70" y2="360" stroke="#334155" stroke-width="2"/>
  <text x="730" y="385" fill="#64748b" font-size="11" text-anchor="end">Time (seconds) →</text>
  <text x="60" y="85" fill="#64748b" font-size="11" text-anchor="end">Blood Pressure (mmHg) ↑</text>

  <!-- Grid lines for pressure -->
  <line x1="70" y1="120" x2="740" y2="120" stroke="#1e293b" stroke-width="1" stroke-dasharray="2,2"/>
  <text x="60" y="125" fill="#64748b" font-size="10" text-anchor="end">140</text>
  <line x1="70" y1="180" x2="740" y2="180" stroke="#1e293b" stroke-width="1" stroke-dasharray="2,2"/>
  <text x="60" y="185" fill="#64748b" font-size="10" text-anchor="end">110</text>
  <line x1="70" y1="260" x2="740" y2="260" stroke="#1e293b" stroke-width="1" stroke-dasharray="2,2"/>
  <text x="60" y="265" fill="#64748b" font-size="10" text-anchor="end">80</text>

  <!-- Gold Standard A-Line (Red) -->
  <path d="M 80 260 C 95 255, 110 230, 130 140 C 145 100, 155 120, 170 190 C 180 215, 190 210, 205 200 C 220 220, 240 250, 260 260 C 275 255, 290 230, 310 140 C 325 100, 335 120, 350 190 C 360 215, 370 210, 385 200 C 400 220, 420 250, 440 260 C 455 255, 470 230, 490 140 C 505 100, 515 120, 530 190 C 540 215, 550 210, 565 200 C 580 220, 600 250, 620 260" 
        fill="none" stroke="#ef4444" stroke-width="3"/>

  <!-- Cuffless PINN (Teal dashed) -->
  <path d="M 80 262 C 95 258, 110 232, 130 144 C 145 104, 155 123, 170 192 C 180 217, 190 212, 205 203 C 220 222, 240 252, 260 262 C 275 258, 290 232, 310 144 C 325 104, 335 123, 350 192 C 360 217, 370 212, 385 203 C 400 222, 420 252, 440 262 C 455 258, 470 232, 490 144 C 505 104, 515 123, 530 192 C 540 217, 550 212, 565 203 C 580 222, 600 252, 620 262" 
        fill="none" stroke="#2dd4bf" stroke-width="2.5" stroke-dasharray="4,3"/>

  <!-- Legend -->
  <rect x="480" y="90" width="260" height="75" fill="#16223f" rx="6" stroke="#2a3c63"/>
  <line x1="495" y1="110" x2="525" y2="110" stroke="#ef4444" stroke-width="3"/>
  <text x="535" y="114" fill="#f8fafc" font-size="11" font-weight="600">Invasive A-Line (Gold Standard)</text>

  <line x1="495" y1="135" x2="525" y2="135" stroke="#2dd4bf" stroke-width="2.5" stroke-dasharray="4,3"/>
  <text x="535" y="139" fill="#2dd4bf" font-size="11" font-weight="600">Cuffless PINN Model (MAE: 3.8 mmHg)</text>
</svg>`;

// 7. 12-Lead Diagnostic ECG & HRV Poincaré Plot
const SVG_ECG_POINCARE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460" style="background:#0b1329;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="800" height="460" fill="#0b1329" rx="12"/>
  
  <text x="30" y="38" fill="#38bdf8" font-size="16" font-weight="700">FIGURE 7: 12-Lead ECG QRS Depolarization Waveform &amp; HRV Poincaré Scatter Plot</text>
  <text x="30" y="60" fill="#94a3b8" font-size="12">Ventricular Depolarization &amp; Autonomic Parasympathetic SD1/SD2 Metrics | Hannun et al. (Paper 14) &amp; Shaffer et al. (Paper 15)</text>

  <!-- ECG Trace on left -->
  <text x="50" y="105" fill="#f43f5e" font-size="12" font-weight="700">Lead II Normal Sinus Rhythm (1,000 Hz)</text>
  <path d="M 50 200 L 90 200 C 100 200, 105 185, 115 185 C 125 185, 130 200, 140 200 L 155 200 L 165 210 L 175 100 L 185 240 L 195 200 L 220 200 C 235 200, 245 165, 260 165 C 275 165, 285 200, 300 200 L 350 200" 
        fill="none" stroke="#f43f5e" stroke-width="3"/>

  <!-- Poincaré Plot on right -->
  <rect x="420" y="90" width="340" height="320" fill="#16223f" rx="8" stroke="#2a3c63"/>
  <text x="435" y="115" fill="#38bdf8" font-size="13" font-weight="700">HRV Poincaré Scatter Plot (RR_n vs RR_n+1)</text>

  <line x1="450" y1="360" x2="720" y2="360" stroke="#334155" stroke-width="1.5"/>
  <line x1="450" y1="140" x2="450" y2="360" stroke="#334155" stroke-width="1.5"/>
  <text x="710" y="380" fill="#64748b" font-size="10" text-anchor="end">RR_n (ms) →</text>
  <text x="440" y="145" fill="#64748b" font-size="10" text-anchor="end">RR_n+1 (ms) ↑</text>

  <!-- Identity line -->
  <line x1="460" y1="350" x2="710" y2="150" stroke="#334155" stroke-width="1" stroke-dasharray="3,3"/>

  <!-- Fitted Ellipse -->
  <ellipse cx="585" cy="250" rx="75" ry="32" transform="rotate(-45 585 250)" fill="#38bdf8" fill-opacity="0.15" stroke="#38bdf8" stroke-width="2"/>
  
  <!-- Random Scatter points within ellipse -->
  <circle cx="580" cy="255" r="3" fill="#2dd4bf"/>
  <circle cx="590" cy="245" r="3" fill="#2dd4bf"/>
  <circle cx="570" cy="265" r="3" fill="#2dd4bf"/>
  <circle cx="610" cy="230" r="3" fill="#2dd4bf"/>
  <circle cx="560" cy="275" r="3" fill="#2dd4bf"/>
  <circle cx="625" cy="215" r="3" fill="#2dd4bf"/>
  <circle cx="575" cy="240" r="3" fill="#2dd4bf"/>
  <circle cx="600" cy="260" r="3" fill="#2dd4bf"/>

  <text x="435" y="398" fill="#e2e8f0" font-size="10">SD1 (Short-term parasympathetic): 28.4 ms</text>
  <text x="435" y="412" fill="#e2e8f0" font-size="10">SD2 (Long-term sympathovagal): 74.2 ms | RMSSD: 39.8 ms</text>
</svg>`;

// 8. Cross-Modal Benchmark Accuracy Matrix Table
const SVG_BENCHMARK_TABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460" style="background:#0b1329;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="800" height="460" fill="#0b1329" rx="12"/>

  <text x="30" y="35" fill="#38bdf8" font-size="16" font-weight="700">TABLE 1: Cross-Modal Benchmark Evaluation Across 43 Research Papers</text>
  <text x="30" y="55" fill="#94a3b8" font-size="11">Standardized Clinical Metrics: MAE (mmHg), RMSE (BPM), AUROC, Pearson r | IEEE 1708 &amp; ISO 81060-2 Protocols</text>

  <!-- Table Header -->
  <rect x="30" y="75" width="740" height="32" fill="#16223f" rx="4"/>
  <text x="45" y="96" fill="#cbd5e1" font-size="11" font-weight="700">Modality / Method</text>
  <text x="210" y="96" fill="#cbd5e1" font-size="11" font-weight="700">Primary Paper &amp; Author</text>
  <text x="390" y="96" fill="#cbd5e1" font-size="11" font-weight="700">Benchmark Dataset</text>
  <text x="560" y="96" fill="#cbd5e1" font-size="11" font-weight="700">State-of-the-Art Accuracy</text>
  <text x="720" y="96" fill="#cbd5e1" font-size="11" font-weight="700">Std</text>

  <!-- Row 1 -->
  <line x1="30" y1="145" x2="770" y2="145" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="130" fill="#38bdf8" font-size="11" font-weight="600">Dual-PPG PTT Cuffless BP</text>
  <text x="210" y="130" fill="#e2e8f0" font-size="11">Mukkamala et al. (Paper 07)</text>
  <text x="390" y="130" fill="#94a3b8" font-size="11">MIMIC-III &amp; VitalDB (n=1,420)</text>
  <text x="560" y="130" fill="#34d399" font-size="11" font-weight="700">SBP MAE: 4.12, DBP: 3.25 mmHg</text>
  <text x="720" y="130" fill="#fbbf24" font-size="10">IEEE 1708</text>

  <!-- Row 2 -->
  <line x1="30" y1="190" x2="770" y2="190" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="175" fill="#38bdf8" font-size="11" font-weight="600">Facial Video rPPG (POS)</text>
  <text x="210" y="175" fill="#e2e8f0" font-size="11">Wang et al. (Paper 21)</text>
  <text x="390" y="175" fill="#94a3b8" font-size="11">UBFC-rPPG &amp; PURE (n=57)</text>
  <text x="560" y="175" fill="#34d399" font-size="11" font-weight="700">HR RMSE: 1.34 BPM, r = 0.982</text>
  <text x="720" y="175" fill="#fbbf24" font-size="10">FDA POC</text>

  <!-- Row 3 -->
  <line x1="30" y1="235" x2="770" y2="235" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="220" fill="#38bdf8" font-size="11" font-weight="600">60 GHz FMCW Radar</text>
  <text x="210" y="220" fill="#e2e8f0" font-size="11">Alizadeh et al. (Paper 28)</text>
  <text x="390" y="220" fill="#94a3b8" font-size="11">Sleep Lab Cohort (n=32)</text>
  <text x="560" y="220" fill="#34d399" font-size="11" font-weight="700">RR RMSE: 0.38 BrPM, HR: 1.82</text>
  <text x="720" y="220" fill="#fbbf24" font-size="10">AASM PSG</text>

  <!-- Row 4 -->
  <line x1="30" y1="280" x2="770" y2="280" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="265" fill="#38bdf8" font-size="11" font-weight="600">Deep ICU Sepsis Alert</text>
  <text x="210" y="265" fill="#e2e8f0" font-size="11">Burdick et al. (Paper 39)</text>
  <text x="390" y="265" fill="#94a3b8" font-size="11">Multi-Center Trial (n=5,840)</text>
  <text x="560" y="265" fill="#34d399" font-size="11" font-weight="700">Lead Time: 4.8 hrs, AUROC: 0.89</text>
  <text x="720" y="265" fill="#fbbf24" font-size="10">Sepsis-3</text>

  <!-- Row 5 -->
  <line x1="30" y1="325" x2="770" y2="325" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="310" fill="#38bdf8" font-size="11" font-weight="600">Ambulatory SpO2 Oximetry</text>
  <text x="210" y="310" fill="#e2e8f0" font-size="11">Elgendi et al. (Paper 01)</text>
  <text x="390" y="310" fill="#94a3b8" font-size="11">CapnoBase &amp; MIMIC-III (n=1,200)</text>
  <text x="560" y="310" fill="#34d399" font-size="11" font-weight="700">SpO2 RMSE: 1.42%, F1: 99.4%</text>
  <text x="720" y="310" fill="#fbbf24" font-size="10">ISO 80601</text>

  <!-- Row 6 -->
  <line x1="30" y1="370" x2="770" y2="370" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="355" fill="#38bdf8" font-size="11" font-weight="600">12-Lead ECG Infarct AI</text>
  <text x="210" y="355" fill="#e2e8f0" font-size="11">Hannun et al. (Paper 18)</text>
  <text x="390" y="355" fill="#94a3b8" font-size="11">PTB-XL Database (n=21,837)</text>
  <text x="560" y="355" fill="#34d399" font-size="11" font-weight="700">STEMI AUROC: 0.94, Sens: 92.1%</text>
  <text x="720" y="355" fill="#fbbf24" font-size="10">AHA/ACC</text>

  <text x="45" y="415" fill="#64748b" font-size="10">Adheres strictly to ISO 81060-2 error bounds (Mean Error ≤ 5 mmHg, SD ≤ 8 mmHg across diverse cohorts).</text>
</svg>`;

// 9. NEWS2 Early Warning & ICU Sepsis Escalation Matrix
const SVG_SEPSIS_NEWS2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460" style="background:#0b1329;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="800" height="460" fill="#0b1329" rx="12"/>

  <text x="30" y="35" fill="#38bdf8" font-size="16" font-weight="700">TABLE 2: NEWS2 &amp; Continuous Multi-Parameter Sepsis Trajectory Scoring Matrix</text>
  <text x="30" y="55" fill="#94a3b8" font-size="11">National Early Warning Score 2 (NEWS2) Parameter Thresholds &amp; Algorithmic Escalation Protocol</text>

  <!-- Headers -->
  <rect x="30" y="75" width="740" height="30" fill="#16223f" rx="4"/>
  <text x="45" y="95" fill="#f8fafc" font-size="11" font-weight="700">Vital Parameter</text>
  <text x="190" y="95" fill="#ef4444" font-size="11" font-weight="700">Score 3 (High)</text>
  <text x="300" y="95" fill="#f97316" font-size="11" font-weight="700">Score 2 (Med)</text>
  <text x="410" y="95" fill="#eab308" font-size="11" font-weight="700">Score 1 (Low)</text>
  <text x="520" y="95" fill="#22c55e" font-size="11" font-weight="700">Score 0 (Normal)</text>
  <text x="645" y="95" fill="#38bdf8" font-size="11" font-weight="700">Corpus Paper</text>

  <!-- Row 1: RR -->
  <line x1="30" y1="135" x2="770" y2="135" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="122" fill="#e2e8f0" font-size="11" font-weight="600">Respiration (BrPM)</text>
  <text x="190" y="122" fill="#ef4444" font-size="11">≤ 8 or ≥ 25</text>
  <text x="300" y="122" fill="#f97316" font-size="11">21 - 24</text>
  <text x="410" y="122" fill="#eab308" font-size="11">9 - 11</text>
  <text x="520" y="122" fill="#22c55e" font-size="11">12 - 20</text>
  <text x="645" y="122" fill="#94a3b8" font-size="11">Charlton (Paper 34, p. 2)</text>

  <!-- Row 2: SpO2 -->
  <line x1="30" y1="175" x2="770" y2="175" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="162" fill="#e2e8f0" font-size="11" font-weight="600">SpO2 Oxygen (%)</text>
  <text x="190" y="162" fill="#ef4444" font-size="11">≤ 91%</text>
  <text x="300" y="162" fill="#f97316" font-size="11">92 - 93%</text>
  <text x="410" y="162" fill="#eab308" font-size="11">94 - 95%</text>
  <text x="520" y="162" fill="#22c55e" font-size="11">≥ 96%</text>
  <text x="645" y="162" fill="#94a3b8" font-size="11">Elgendi (Paper 01, p. 3)</text>

  <!-- Row 3: SBP -->
  <line x1="30" y1="215" x2="770" y2="215" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="202" fill="#e2e8f0" font-size="11" font-weight="600">Systolic BP (mmHg)</text>
  <text x="190" y="202" fill="#ef4444" font-size="11">≤ 90 or ≥ 220</text>
  <text x="300" y="202" fill="#f97316" font-size="11">91 - 100</text>
  <text x="410" y="202" fill="#eab308" font-size="11">101 - 110</text>
  <text x="520" y="202" fill="#22c55e" font-size="11">111 - 219</text>
  <text x="645" y="202" fill="#94a3b8" font-size="11">Mukkamala (Paper 07, p. 3)</text>

  <!-- Row 4: Heart Rate -->
  <line x1="30" y1="255" x2="770" y2="255" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="242" fill="#e2e8f0" font-size="11" font-weight="600">Heart Rate (BPM)</text>
  <text x="190" y="242" fill="#ef4444" font-size="11">≤ 40 or ≥ 131</text>
  <text x="300" y="242" fill="#f97316" font-size="11">111 - 130</text>
  <text x="410" y="242" fill="#eab308" font-size="11">41-50 / 91-110</text>
  <text x="520" y="242" fill="#22c55e" font-size="11">51 - 90</text>
  <text x="645" y="242" fill="#94a3b8" font-size="11">Pereira (Paper 02, p. 4)</text>

  <!-- Row 5: Temperature -->
  <line x1="30" y1="295" x2="770" y2="295" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="282" fill="#e2e8f0" font-size="11" font-weight="600">Body Temp (°C)</text>
  <text x="190" y="282" fill="#ef4444" font-size="11">≤ 35.0 (Hypo)</text>
  <text x="300" y="282" fill="#f97316" font-size="11">≥ 39.1 (Hyper)</text>
  <text x="410" y="282" fill="#eab308" font-size="11">38.1 - 39.0</text>
  <text x="520" y="282" fill="#22c55e" font-size="11">36.1 - 38.0</text>
  <text x="645" y="282" fill="#94a3b8" font-size="11">Burdick (Paper 39, p. 2)</text>

  <!-- Summary Callout -->
  <rect x="30" y="325" width="740" height="95" fill="#16223f" rx="8" stroke="#2a3c63"/>
  <text x="45" y="348" fill="#38bdf8" font-size="12" font-weight="700">Clinical Early Warning Synthesis (Burdick et al. 2021 &amp; Michard et al. 2023):</text>
  <text x="45" y="370" fill="#94a3b8" font-size="11">Total NEWS2 score ≥ 7 or any single parameter score = 3 triggers immediate emergency sepsis evaluation.</text>
  <text x="45" y="390" fill="#94a3b8" font-size="11">Continuous algorithmic vital sign tracking reduces sepsis in-hospital mortality from 21.4% to 17.5% (p=0.012, lead time 4.8 hrs).</text>
</svg>`;

// 10. IEEE 1708 & ISO 81060-2 Regulatory Standards
const SVG_REGULATORY_MATRIX = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460" style="background:#0b1329;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="800" height="460" fill="#0b1329" rx="12"/>

  <text x="30" y="35" fill="#38bdf8" font-size="16" font-weight="700">TABLE 3: IEEE 1708 &amp; ISO 81060-2 Wearable Cuffless BP Regulatory Standards</text>
  <text x="30" y="55" fill="#94a3b8" font-size="11">Validation Testing Tiers, Perturbation Protocols &amp; Error Ceilings | Stergiou et al. (Paper 13)</text>

  <rect x="30" y="75" width="740" height="30" fill="#16223f" rx="4"/>
  <text x="45" y="95" fill="#f8fafc" font-size="11" font-weight="700">Testing Tier</text>
  <text x="180" y="95" fill="#f8fafc" font-size="11" font-weight="700">Clinical Protocol</text>
  <text x="380" y="95" fill="#f8fafc" font-size="11" font-weight="700">Perturbation Requirement</text>
  <text x="590" y="95" fill="#f8fafc" font-size="11" font-weight="700">Pass / Fail Threshold</text>

  <line x1="30" y1="135" x2="770" y2="135" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="122" fill="#38bdf8" font-size="11" font-weight="600">Static Accuracy</text>
  <text x="180" y="122" fill="#e2e8f0" font-size="11">Resting seated auscultation (n≥85)</text>
  <text x="380" y="122" fill="#94a3b8" font-size="11">Baseline rest (3 min intervals)</text>
  <text x="590" y="122" fill="#34d399" font-size="11" font-weight="700">Mean error ≤ 5 mmHg, SD ≤ 8</text>

  <line x1="30" y1="185" x2="770" y2="185" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="172" fill="#38bdf8" font-size="11" font-weight="600">Dynamic Tracking</text>
  <text x="180" y="172" fill="#e2e8f0" font-size="11">Isometric handgrip / cold pressor</text>
  <text x="380" y="172" fill="#94a3b8" font-size="11">SBP shift ≥ 15 mmHg induced</text>
  <text x="590" y="172" fill="#34d399" font-size="11" font-weight="700">Tracking grade: A or B</text>

  <line x1="30" y1="235" x2="770" y2="235" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="222" fill="#38bdf8" font-size="11" font-weight="600">Calibration Drift</text>
  <text x="180" y="222" fill="#e2e8f0" font-size="11">Longitudinal monitoring (30 days)</text>
  <text x="380" y="222" fill="#94a3b8" font-size="11">No recalibration during interval</text>
  <text x="590" y="222" fill="#34d399" font-size="11" font-weight="700">Cumulative drift &lt; 5 mmHg</text>

  <line x1="30" y1="285" x2="770" y2="285" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="272" fill="#38bdf8" font-size="11" font-weight="600">Cohort Diversity</text>
  <text x="180" y="272" fill="#e2e8f0" font-size="11">Fitzpatrick I-VI, age 18-85, SBP &gt;160</text>
  <text x="380" y="272" fill="#94a3b8" font-size="11">≥30% hypertensive, ≥30% dark skin</text>
  <text x="590" y="272" fill="#34d399" font-size="11" font-weight="700">Zero demographic bias drop</text>

  <rect x="30" y="325" width="740" height="95" fill="#16223f" rx="8" stroke="#2a3c63"/>
  <text x="45" y="348" fill="#38bdf8" font-size="12" font-weight="700">Enterprise Commercialization Warning (Stergiou et al. Paper 13):</text>
  <text x="45" y="370" fill="#94a3b8" font-size="11">92% of smartphone cuffless apps fail dynamic perturbation because they regress to cohort mean values rather than true vascular PTT.</text>
  <text x="45" y="390" fill="#94a3b8" font-size="11">FDA 510(k) clearance requires independent clinical validation across the full pressure range (SBP 80–190 mmHg).</text>
</svg>`;

// 11. Clinical Datasets Cohort Benchmark Comparison
const SVG_DATASETS_TABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460" style="background:#0b1329;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="800" height="460" fill="#0b1329" rx="12"/>

  <text x="30" y="35" fill="#38bdf8" font-size="16" font-weight="700">TABLE 4: Clinical Biomedical Datasets Benchmark Comparison in Corpus</text>
  <text x="30" y="55" fill="#94a3b8" font-size="11">MIMIC-III, VitalDB, CapnoBase, UBFC-rPPG, PTB-XL | Reference Sensors, Demographics &amp; Sizes</text>

  <rect x="30" y="75" width="740" height="30" fill="#16223f" rx="4"/>
  <text x="45" y="95" fill="#f8fafc" font-size="11" font-weight="700">Dataset Name</text>
  <text x="180" y="95" fill="#f8fafc" font-size="11" font-weight="700">Cohort Size</text>
  <text x="300" y="95" fill="#f8fafc" font-size="11" font-weight="700">Modalities Captured</text>
  <text x="490" y="95" fill="#f8fafc" font-size="11" font-weight="700">Gold Standard Reference</text>
  <text x="690" y="95" fill="#f8fafc" font-size="11" font-weight="700">Corpus Paper</text>

  <line x1="30" y1="135" x2="770" y2="135" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="122" fill="#38bdf8" font-size="11" font-weight="600">VitalDB</text>
  <text x="180" y="122" fill="#e2e8f0" font-size="11">6,388 surgical patients</text>
  <text x="300" y="122" fill="#94a3b8" font-size="11">High-res ECG, PPG, EEG, CO2</text>
  <text x="490" y="122" fill="#34d399" font-size="11">Radial A-Line Cannula (500 Hz)</text>
  <text x="690" y="122" fill="#cbd5e1" font-size="11">Paper 07, 08</text>

  <line x1="30" y1="185" x2="770" y2="185" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="172" fill="#38bdf8" font-size="11" font-weight="600">MIMIC-III Waveform</text>
  <text x="180" y="172" fill="#e2e8f0" font-size="11">38,597 ICU stays</text>
  <text x="300" y="172" fill="#94a3b8" font-size="11">Multi-lead ECG, PPG, ABP, Resp</text>
  <text x="490" y="172" fill="#34d399" font-size="11">Bedside A-line &amp; Clinical Labs</text>
  <text x="690" y="172" fill="#cbd5e1" font-size="11">Paper 01, 39</text>

  <line x1="30" y1="235" x2="770" y2="235" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="222" fill="#38bdf8" font-size="11" font-weight="600">CapnoBase</text>
  <text x="180" y="222" fill="#e2e8f0" font-size="11">42 subjects (adults/ped)</text>
  <text x="300" y="222" fill="#94a3b8" font-size="11">Fingertip PPG, ECG, Capnometry</text>
  <text x="490" y="222" fill="#34d399" font-size="11">Infrared CO2 gas analyzer</text>
  <text x="690" y="222" fill="#cbd5e1" font-size="11">Paper 01, 34</text>

  <line x1="30" y1="285" x2="770" y2="285" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="272" fill="#38bdf8" font-size="11" font-weight="600">UBFC-rPPG / PURE</text>
  <text x="180" y="272" fill="#e2e8f0" font-size="11">57 video trials</text>
  <text x="300" y="272" fill="#94a3b8" font-size="11">Facial uncompressed RGB video</text>
  <text x="490" y="272" fill="#34d399" font-size="11">CMS50E contact pulse oximeter</text>
  <text x="690" y="272" fill="#cbd5e1" font-size="11">Paper 21, 23</text>

  <rect x="30" y="325" width="740" height="95" fill="#16223f" rx="8" stroke="#2a3c63"/>
  <text x="45" y="348" fill="#38bdf8" font-size="12" font-weight="700">Data Engineering Best Practice:</text>
  <text x="45" y="370" fill="#94a3b8" font-size="11">Never train and test cuffless BP models on consecutive beats from the same subject. Models memorize patient baseline rather than hemodynamics.</text>
  <text x="45" y="390" fill="#94a3b8" font-size="11">Always enforce strict subject-independent (leave-one-subject-out or 5-fold patient-split) cross validation.</text>
</svg>`;

// 12. Biosensor Analog Front-End (AFE) Architecture
const SVG_AFE_HARDWARE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" width="800" height="460" style="background:#0b1329;font-family:system-ui,-apple-system,sans-serif;">
  <rect width="800" height="460" fill="#0b1329" rx="12"/>

  <text x="30" y="35" fill="#38bdf8" font-size="16" font-weight="700">TABLE 5: Biosensor Analog Front-End (AFE) Hardware &amp; Optical Architecture</text>
  <text x="30" y="55" fill="#94a3b8" font-size="11">MAX30001, AFE4404, AD8232, TI IWR6843 Radar | Sampling Rates, SNR &amp; Power</text>

  <rect x="30" y="75" width="740" height="30" fill="#16223f" rx="4"/>
  <text x="45" y="95" fill="#f8fafc" font-size="11" font-weight="700">AFE Chipset</text>
  <text x="180" y="95" fill="#f8fafc" font-size="11" font-weight="700">Sensing Modality</text>
  <text x="310" y="95" fill="#f8fafc" font-size="11" font-weight="700">Sampling Rate &amp; ADC</text>
  <text x="490" y="95" fill="#f8fafc" font-size="11" font-weight="700">Dynamic Range / SNR</text>
  <text x="660" y="95" fill="#f8fafc" font-size="11" font-weight="700">Power Draw</text>

  <line x1="30" y1="135" x2="770" y2="135" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="122" fill="#38bdf8" font-size="11" font-weight="600">Maxim MAX30001</text>
  <text x="180" y="122" fill="#e2e8f0" font-size="11">Single-Lead ECG &amp; BioZ</text>
  <text x="310" y="122" fill="#94a3b8" font-size="11">128 - 512 Hz (18-bit delta-sigma)</text>
  <text x="490" y="122" fill="#34d399" font-size="11">CMRR: 110 dB, SNR: 92 dB</text>
  <text x="660" y="122" fill="#fbbf24" font-size="11">85 µW (Ultra-low)</text>

  <line x1="30" y1="185" x2="770" y2="185" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="172" fill="#38bdf8" font-size="11" font-weight="600">TI AFE4404</text>
  <text x="180" y="172" fill="#e2e8f0" font-size="11">Optical PPG &amp; SpO2 (3 LEDs)</text>
  <text x="310" y="172" fill="#94a3b8" font-size="11">Up to 1,000 Hz (22-bit ADC)</text>
  <text x="490" y="172" fill="#34d399" font-size="11">Dynamic range: 100 dB</text>
  <text x="660" y="172" fill="#fbbf24" font-size="11">1.2 mW (Pulsed)</text>

  <line x1="30" y1="235" x2="770" y2="235" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="222" fill="#38bdf8" font-size="11" font-weight="600">ADI AD8232</text>
  <text x="180" y="222" fill="#e2e8f0" font-size="11">Single-Lead ECG Heart Rate</text>
  <text x="310" y="222" fill="#94a3b8" font-size="11">Analog output (External MCU ADC)</text>
  <text x="490" y="222" fill="#34d399" font-size="11">CMRR: 80 dB</text>
  <text x="660" y="222" fill="#fbbf24" font-size="11">170 µA</text>

  <line x1="30" y1="285" x2="770" y2="285" stroke="#1e293b" stroke-width="1"/>
  <text x="45" y="272" fill="#38bdf8" font-size="11" font-weight="600">TI IWR6843</text>
  <text x="180" y="272" fill="#e2e8f0" font-size="11">60 GHz FMCW Radar</text>
  <text x="310" y="272" fill="#94a3b8" font-size="11">Chirp rate: 100 Hz, 4 GHz sweep</text>
  <text x="490" y="272" fill="#34d399" font-size="11">Micron range: &lt;50 µm phase</text>
  <text x="660" y="272" fill="#fbbf24" font-size="11">1.8 W (Duty-cycled)</text>

  <rect x="30" y="325" width="740" height="95" fill="#16223f" rx="8" stroke="#2a3c63"/>
  <text x="45" y="348" fill="#38bdf8" font-size="12" font-weight="700">Hardware Integration Insight:</text>
  <text x="45" y="370" fill="#94a3b8" font-size="11">To achieve multi-day battery life in wearable clinical smartbands, AFEs utilize programmable ambient light cancellation (ALC) up to 200 µA</text>
  <text x="45" y="390" fill="#94a3b8" font-size="11">and duty-cycled LED pulses with sub-1% active time, dropping average optical subsystem power to &lt;500 µW.</text>
</svg>`;

export const SAMPLE_CLINICAL_VISUALS: SampleClinicalVisual[] = [
  {
    id: 'visual-ppg-contour',
    title: 'Figure 1: PPG Pulse Contour & SDPPG Fiducials',
    category: 'Waveform',
    description: 'Photoplethysmogram pulse contour displaying Systolic Peak, Dicrotic Notch, Diastolic Peak, and APG fiducial points.',
    suggestedPrompt: 'Analyze this PPG pulse contour figure: explain the physiological origin of the systolic peak and dicrotic notch, and how arterial stiffness (b/a ratio) is derived according to Elgendi et al. and the corpus.',
    svgContent: SVG_PPG_WAVEFORM,
    dataUrl: makeSvgDataUri(SVG_PPG_WAVEFORM),
    mimeType: 'image/svg+xml',
  },
  {
    id: 'visual-ptt-bp-model',
    title: 'Figure 2: Dual-Lead PTT & Cuffless BP Model',
    category: 'Waveform',
    description: 'Lead II ECG R-peak to finger PPG foot delay (PTT vs PAT) and Hughes nonlinear elasticity equation.',
    suggestedPrompt: 'Interpret this dual-lead PTT waveform and mathematical model: why does single-site PPG conflate the pre-ejection period (PEP), and how does the Hughes equation link PTT to blood pressure?',
    svgContent: SVG_PTT_BP_MODEL,
    dataUrl: makeSvgDataUri(SVG_PTT_BP_MODEL),
    mimeType: 'image/svg+xml',
  },
  {
    id: 'visual-rppg-melanin',
    title: 'Figure 3: Remote Camera rPPG POS & Melanin Attenuation',
    category: 'Figure',
    description: 'Subsurface facial capillary scattering in RGB color space, Plane-Orthogonal-to-Skin (POS) projection, and Fitzpatrick skin tone bias mitigation.',
    suggestedPrompt: 'Explain how the POS algorithm in this figure decouples specular reflection from diffuse pulsatile hemoglobin absorption, and what strategies mitigate melanin optical damping in Fitzpatrick phototypes V-VI.',
    svgContent: SVG_RPPG_MELANIN,
    dataUrl: makeSvgDataUri(SVG_RPPG_MELANIN),
    mimeType: 'image/svg+xml',
  },
  {
    id: 'visual-radar-displacement',
    title: 'Figure 4: 60 GHz FMCW Radar Micron Phase Displacement',
    category: 'Waveform',
    description: 'Millimeter-wave radar phase interferometry converting microwave phase shifts into sub-millimeter chest wall respiratory and cardiac ballistocardiogram motion.',
    suggestedPrompt: 'How does 60 GHz FMCW radar extract micron-level chest wall displacement through blankets, and what equation converts phase change Δφ into displacement Δx as shown in Figure 4?',
    svgContent: SVG_RADAR_DISPLACEMENT,
    dataUrl: makeSvgDataUri(SVG_RADAR_DISPLACEMENT),
    mimeType: 'image/svg+xml',
  },
  {
    id: 'visual-hemoglobin-spectra',
    title: 'Figure 5: Dual-Wavelength Hemoglobin Molar Extinction',
    category: 'Figure',
    description: 'Absorption curves of Oxyhemoglobin (HbO2) vs Deoxyhemoglobin (Hb) across 600-1000 nm with 660 nm, 805 nm isosbestic, and 940 nm LED wavelengths.',
    suggestedPrompt: 'Based on this extinction spectra diagram, why are 660 nm and 940 nm selected for dual-wavelength pulse oximetry, and what is the physical significance of the 805 nm isosbestic point?',
    svgContent: SVG_HEMOGLOBIN_SPECTRA,
    dataUrl: makeSvgDataUri(SVG_HEMOGLOBIN_SPECTRA),
    mimeType: 'image/svg+xml',
  },
  {
    id: 'visual-aline-vs-pinn',
    title: 'Figure 6: Invasive Radial A-Line vs Cuffless PINN BP',
    category: 'Waveform',
    description: 'Beat-to-beat hemodynamic arterial pressure tracking comparing radial catheter gold standard against Physics-Informed Neural Network cuffless reconstruction.',
    suggestedPrompt: 'Compare the morphology of the invasive radial A-line pressure waveform against the cuffless PINN prediction in Figure 6. What physical hemodynamic constraints allow PINNs to track dicrotic notch pressure without an occlusive cuff?',
    svgContent: SVG_ALINE_VS_PINN,
    dataUrl: makeSvgDataUri(SVG_ALINE_VS_PINN),
    mimeType: 'image/svg+xml',
  },
  {
    id: 'visual-ecg-poincare',
    title: 'Figure 7: 12-Lead ECG QRS & HRV Poincaré Scatter Plot',
    category: 'Waveform',
    description: 'Normal sinus rhythm P-QRS-T complex alongside Poincaré non-linear scatter plot demonstrating autonomic parasympathetic SD1 and sympathetic SD2 ellipse fitting.',
    suggestedPrompt: 'Analyze the Poincaré scatter plot in Figure 7: how are SD1 and SD2 calculated from consecutive RR intervals, and what does the SD1/SD2 ratio indicate about autonomic sympathovagal balance?',
    svgContent: SVG_ECG_POINCARE,
    dataUrl: makeSvgDataUri(SVG_ECG_POINCARE),
    mimeType: 'image/svg+xml',
  },
  {
    id: 'visual-benchmark-table',
    title: 'Table 1: Cross-Modal Benchmark Accuracy Matrix',
    category: 'Table',
    description: 'Empirical benchmark comparison of Cuffless BP, rPPG, FMCW Radar, and Sepsis prediction across standard clinical datasets.',
    suggestedPrompt: 'Read this benchmark table and compare the state-of-the-art accuracies across contact PPG, facial rPPG, and 60 GHz radar, citing the respective papers and page numbers.',
    svgContent: SVG_BENCHMARK_TABLE,
    dataUrl: makeSvgDataUri(SVG_BENCHMARK_TABLE),
    mimeType: 'image/svg+xml',
  },
  {
    id: 'visual-sepsis-news2',
    title: 'Table 2: NEWS2 & ICU Sepsis Trajectory Matrix',
    category: 'Table',
    description: 'Clinical parameter thresholds for Heart Rate, Respiration, SBP, SpO2, and Temperature for early deterioration escalation.',
    suggestedPrompt: 'Analyze this NEWS2 vital signs scoring table: how do subtle multi-parameter trajectories predict sepsis deterioration 4.8 hours before overt shock according to Burdick et al. and Michard et al.?',
    svgContent: SVG_SEPSIS_NEWS2,
    dataUrl: makeSvgDataUri(SVG_SEPSIS_NEWS2),
    mimeType: 'image/svg+xml',
  },
  {
    id: 'visual-regulatory-matrix',
    title: 'Table 3: IEEE 1708 & ISO 81060-2 Regulatory Standards',
    category: 'Table',
    description: 'Testing tiers, dynamic perturbation requirements (handgrip/cold pressor), and calibration drift limits for cuffless BP devices.',
    suggestedPrompt: 'Summarize the regulatory validation tiers in Table 3: why is static resting validation insufficient for cuffless BP, and what perturbation tests does IEEE 1708 mandate to prevent regression to the mean?',
    svgContent: SVG_REGULATORY_MATRIX,
    dataUrl: makeSvgDataUri(SVG_REGULATORY_MATRIX),
    mimeType: 'image/svg+xml',
  },
  {
    id: 'visual-datasets-table',
    title: 'Table 4: Clinical Biomedical Datasets Benchmark',
    category: 'Table',
    description: 'Comparison of MIMIC-III, VitalDB, CapnoBase, UBFC-rPPG, and PTB-XL: sample sizes, reference sensors, and cross-validation rules.',
    suggestedPrompt: 'Using Table 4, compare the clinical utility of VitalDB vs MIMIC-III for hemodynamic machine learning, and explain why subject-independent validation splits are critical.',
    svgContent: SVG_DATASETS_TABLE,
    dataUrl: makeSvgDataUri(SVG_DATASETS_TABLE),
    mimeType: 'image/svg+xml',
  },
  {
    id: 'visual-afe-hardware',
    title: 'Table 5: Biosensor Analog Front-End (AFE) Hardware',
    category: 'Table',
    description: 'Integrated circuits (MAX30001, AFE4404, AD8232, IWR6843) specifications: sampling rates, dynamic range, CMRR, and micro-watt power.',
    suggestedPrompt: 'Compare the power consumption and sampling rate trade-offs between optical PPG AFEs (AFE4404), biopotential ECG (MAX30001), and 60 GHz radar (IWR6843) as shown in Table 5.',
    svgContent: SVG_AFE_HARDWARE,
    dataUrl: makeSvgDataUri(SVG_AFE_HARDWARE),
    mimeType: 'image/svg+xml',
  },
];
