# ScholarFlow AI — Universal Academic Research & Literature RAG

> **Enterprise Multi-Tenant Literature Intelligence & Evidence-Grounded Research Synthesis Platform**  
> Serving scholars, researchers, faculty, and students across **all academic disciplines** with dual interfaces, isolated session management, and dedicated single-LLM orchestration.

---

## 📖 Executive Summary & Core Philosophy

**ScholarFlow AI** is a universal research and literature synthesis platform designed for the entire academic community—from Computer Science, Artificial Intelligence, and Applied Engineering, to English Literature, Linguistics, History, Law, and Biomedical Sciences.

### 🌟 Fundamental Design Directives:
1. **Universal for All Disciplines**: No artificial discipline silos or forced domain pickers. Whether you are uploading a 17th-century literary treatise, a machine learning benchmark paper, or a clinical cardiology trial, the system ingests, semantically segments, and synthesizes the literature with equal precision.
2. **Dual-Interface System**:
   - **Researcher Workspace (User Interface)**: Focused on paper ingestion, deep document chat, cross-paper comparative matrices, literature reviews, and personal citation notebooks.
   - **Administrator Portal (Admin Interface)**: Comprehensive oversight of active isolated sessions, single-LLM multi-tenant telemetry, global RAG hyperparameters, and query audit logging.
3. **Session-Isolated, Single-LLM Architecture**: Thousands of users are served simultaneously by a single foundation LLM (Google Gemini 2.5 Flash / local Ollama) with guaranteed zero cross-tenant data leakage and custom dedicated assistance per user session.

---

## 🔬 State-of-the-Art RAG Pipeline & Semantic Routing Architecture

ScholarFlow AI utilizes an advanced multi-stage **Retrieval-Augmented Generation (RAG)** pipeline designed to guarantee evidentiary precision and eliminate hallucination across diverse sensing modalities and academic corpora.

```
                              [ INCOMING USER RESEARCH INQUIRY ]
                                              │
                                              ▼
                             ┌──────────────────────────────────┐
                             │    Domain Token Decomposition    │
                             │  • Domain Expansion Dicts        │
                             │  • Acronym & Math Extraction     │
                             └────────────────┬─────────────────┘
                                              │
                        ┌─────────────────────┴─────────────────────┐
                        ▼                                           ▼
          ┌───────────────────────────┐               ┌───────────────────────────┐
          │  Okapi BM25 Sparse Index  │               │   Dense Cosine Vector     │
          │  k1 = 1.5, b = 0.75       │               │   TF-IDF Normalized       │
          └─────────────┬─────────────┘               └─────────────┬─────────────┘
                        │                                           │
                        └─────────────────────┬─────────────────────┘
                                              ▼
                             ┌──────────────────────────────────┐
                             │  Reciprocal Rank Fusion (RRF)    │
                             │  Score = Σ 1 / (60 + rank_i)     │
                             └────────────────┬─────────────────┘
                                              │
                                              ▼
                             ┌──────────────────────────────────┐
                             │       Semantic Router            │
                             │  • IR-UWB Impulse vs FMCW Radar  │
                             │  • MIMO Beamforming vs WiFi CSI  │
                             │  • Cuffless BP vs Remote rPPG    │
                             │  • Target Modality Boost (2.4x)  │
                             │  • Contrast Modality Suppression │
                             └────────────────┬─────────────────┘
                                              │
                                              ▼
                             ┌──────────────────────────────────┐
                             │  Intent-Aware Section Reranking  │
                             │  • Equations/Math Formulation    │
                             │  • Transducers & Hardware        │
                             │  • Clinical Datasets & Benchmarks│
                             └────────────────┬─────────────────┘
                                              │
                                              ▼
                             ┌──────────────────────────────────┐
                             │   Maximal Marginal Relevance     │
                             │   & Balanced Multi-Paper MMR     │
                             └────────────────┬─────────────────┘
                                              │
                                              ▼
                             ┌──────────────────────────────────┐
                             │  Context-Anchored Prompt Engine  │
                             │  + Dynamic Technical Directives  │
                             └────────────────┬─────────────────┘
                                              │
                                              ▼
                             ┌──────────────────────────────────┐
                             │    Gemini 2.5 Flash / Ollama     │
                             │   Evidence-Grounded Synthesis    │
                             └──────────────────────────────────┘
```

### 1. Granular Modality Chunking & Contextual Anchoring
Every manuscript chunk in the corpus is enriched with an upfront **Contextual Document Anchor**:
```
[DOCUMENT CONTEXT: "Ultra-Wideband (UWB) Impulse Radar for Through-Wall Trapped Disaster Victim Vital Sign Detection" (2022, Li et al.) | Modality: Radar & RF Sensing | Methodology: Sub-nanosecond Gaussian pulse transmission, Singular Value Decomposition (SVD) clutter suppression, and CFAR target detection]
```
This ensures the language model immediately recognizes the exact technological paradigm, preventing cross-modality conflation even when discussing common physiological phenomena (e.g., distinguishing chest wall displacement via 60 GHz FMCW phase interferometry from Time-of-Flight range-gated IR-UWB pulse reflections).

### 2. Multi-Stage Hybrid Retrieval
1. **Okapi BM25 Sparse Scoring**: Evaluated with parameters $k_1 = 1.5$ and $b = 0.75$, using document length normalization against the dynamic corpus average.
2. **Dense Cosine Semantic Scoring**: Evaluates query vectors against document TF-IDF vector representations with weighted acronym boosts (e.g., `IR-UWB`, `FMCW`, `PTT`, `PWV`, `rPPG`).
3. **Reciprocal Rank Fusion (RRF)**: Combines dense semantic and sparse lexical ranked lists with smoothing parameter $k = 60$:
   $$\text{RRF}(d) = \sum_{m \in \{\text{dense}, \text{bm25}\}} \frac{1}{60 + \text{rank}_m(d)}$$

### 3. First-Class Semantic Router (`SemanticRouter`)
The retrieval engine features an automated Semantic Router that classifies user queries into distinct technical sensing routes:
- **`IR_UWB`**: Impulse Radio Ultra-Wideband Radar (Paper 29: Li et al.). Boosts sub-nanosecond baseband Gaussian pulse mechanics, Time-of-Flight range gating ($\tau_0 = \frac{2R}{v}$), fast-time/slow-time 2D matrix analysis, and SVD clutter filtering through concrete/rubble. Downweights FMCW frequency chirp papers unless explicitly requested.
- **`FMCW`**: 60 GHz Millimeter-Wave FMCW Radar (Paper 28: Wang et al.). Emphasizes linear chirp synthesis, intermediate frequency (IF) beat signals, and phase interferometry ($\Delta \phi = \frac{4\pi}{\lambda} \Delta x$).
- **`MIMO`**: Multi-Patient Separation via MIMO Beamforming (Paper 30: Zhang et al.). Focuses on virtual ULA synthesis, Capon MVDR spatial beamforming, and angle-of-arrival (AoA) resolution.
- **`WIFI_CSI`**: WiFi Channel State Information Sensing (Paper 31: Liu et al.). Details OFDM subcarrier phase sanitization and Fresnel zone diffraction boundaries.
- **`CW_DOPPLER`**: 24 GHz Continuous-Wave Doppler Radar (Paper 32: Sakamoto et al.). Details homodyne quadrature demodulation and sleep apnea screening.
- **`RADAR_SCG`**: Precordial Radar Seismocardiography (Paper 33: Euzébio et al.). Decouples Aortic Valve Opening (AVO) and Mitral Valve Closure (MVC) via second-derivative acceleration.
- **`CUFFLESS_BP`**: Pulse Transit Time, PWV, Moens-Korteweg equation, Hughes arterial elasticity, and physics-informed neural networks (PINNs) (Papers 7–13).
- **`RPPG`**: Remote Camera Photoplethysmography, Plane-Orthogonal-to-Skin (POS) projection, CHROM, and melanin optical attenuation (Papers 21–27).
- **`RESPIRATORY`**: Respiration Rate, Tracheal Acoustic Stridor, Capnography, and Bioimpedance Pneumography (Papers 34–38).
- **`SEPSIS_DETERIORATION`**: ICU Deterioration Surveillance, dynamic Shock Index, and non-linear NEWS2 scoring (Papers 39–43).

### 4. Balanced Multi-Target Representation
When a researcher asks a comparative question (e.g., *"Compare IR-UWB with FMCW radar"*), the engine activates balanced multi-target allocation, reserving guaranteed top-K slots for both modalities and ensuring that hardware, mathematical laws, and clinical validation evidence from both technologies are represented in the synthesized response.

---

## 🔬 How We Manage Each Session Differently & Provide Dedicated Assistance with a Single Foundation LLM

A central engineering challenge of multi-tenant AI systems is:  
**"How can one single foundation model serve every user dedicatedly, with completely different uploaded papers and customized research perspectives, without fine-tuning separate models and without data leaking between users?"**

Below is the exact architectural specification of how ScholarFlow AI accomplishes this:

```
                                  [ USER SESSION INGESTION ]
                                (PDF, LaTeX, TXT, MD Documents)
                                               │
                                               ▼
                              ┌───────────────────────────────────┐
                              │  Cryptographic Session Token Gen   │
                              │  (UUID: session-7x92k1p)          │
                              └─────────────────┬─────────────────┘
                                                │
                                                ▼
                         ┌──────────────────────────────────────────────┐
                         │   Session-Scoped In-Memory Vector Store      │
                         │   & Inverted Token Index (BM25 + Cosine)     │
                         │  [Namespace: /sessions/session-7x92k1p]      │
                         └──────────────────────┬───────────────────────┘
                                                │
       [ USER QUERY ] ──────────────────────────┤ (Query Isolation)
                                                ▼
                         ┌──────────────────────────────────────────────┐
                         │       Scoped Top-K Chunk Retrieval           │
                         │   (Filters ONLY session-7x92k1p chunks)      │
                         └──────────────────────┬───────────────────────┘
                                                │
                                                ▼
                         ┌──────────────────────────────────────────────┐
                         │    Dynamic Ephemeral Prompt Assembly         │
                         │  • User Role & Personal Directives           │
                         │  • Session Retrieved Evidence [CITATION 1..K]│
                         │  • Grounding Constraints & Strict Citations  │
                         └──────────────────────┬───────────────────────┘
                                                │
                                                ▼
                         ┌──────────────────────────────────────────────┐
                         │       Stateless Single Foundation LLM        │
                         │   (Gemini 2.5 Flash API or Local Ollama)      │
                         │     *No session memory retained in model*    │
                         └──────────────────────┬───────────────────────┘
                                                │
                                                ▼
                         ┌──────────────────────────────────────────────┐
                         │      Dedicated, Isolated User Response       │
                         │      • Grounded Citations with Page #s       │
                         │      • Immediate Context Discard from RAM    │
                         └──────────────────────────────────────────────┘
```

### 1. Cryptographic Session Namespacing
When a user launches the web application or opens a new tab:
- A unique cryptographic session token (e.g. `session-4f891a2`) is generated and registered in application state and client memory.
- In authenticated mode with Firebase, this token is linked with the authenticated `user.uid` namespace.
- In guest mode, the session token operates entirely within the isolated client memory space.

### 2. Isolated Chunk Indexing & Zero-Spillover Vector Store
- When a user uploads a paper (PDF, LaTeX, TXT, or Markdown), the document is parsed into semantic sliding-window chunks (200–500 tokens with 50-token overlap).
- Every extracted chunk is tagged with its parent `paperId` and `sessionId`.
- The inverted index (`term -> chunk IDs`) and the TF-IDF / vector embeddings are strictly bounded to the active session. When computing cosine similarity:
  $$\text{sim}(q, c_i) \quad \text{evaluated only for } c_i \in \mathcal{C}_{\text{session}}$$
  Chunks from another user's session are never loaded into the retrieval candidate pool.

### 3. Dynamic Ephemeral Prompt Composition
The foundation model (Gemini 2.5 Flash) is inherently **stateless**. It does not retain historical memory across HTTP/RPC calls. For every user query:
- The system dynamically gathers:
  1. The user's role (e.g., *Academic Researcher, Professor, Student, Administrator*).
  2. The user's custom instructions or methodological tone directives.
  3. The top-K retrieved evidence passages retrieved **exclusively** from that user's session index.
  4. Explicit citation instructions with page and section metadata.
- This composite payload is passed to the Gemini API as a single, isolated execution context.

### 4. Ephemeral Execution & Immediate Memory Discard
- Once the LLM generates the response with grounded evidence citations (`[CITATION 1]`, `[CITATION 2]`), the execution cycle finishes.
- The context window is immediately discarded by the API. The single LLM is now ready to serve the next user's completely different prompt with zero cross-session memory bleed.
- Users experience a completely dedicated, private AI assistant that feels like their own custom model, running efficiently on a shared enterprise infrastructure.

---

## 🖥️ Dual Interfaces: User Workspace vs. Administrator Portal

ScholarFlow AI is structured into two purpose-built interfaces:

### 1. Researcher Workspace (User Interface)
Designed for researchers, educators, and students for daily literature interaction:
- **Scholar Chat**:
  - Grounded RAG conversation with real-time citation cards, page references, and similarity score indicators.
  - Multimodal research figure, waveform, and benchmark table inspection.
  - Prompt injection with personalized research directives and temperature tuning.
- **Literature Matrix & Synthesis**:
  - Multi-paper cross-comparison matrix evaluating methodology, theoretical frameworks, datasets, and key findings side-by-side.
  - Scholarly consensus and controversy synthesis.
- **Research Corpus Explorer**:
  - Drag-and-drop ingestion of bulk research papers (PDF, LaTeX, TXT, MD).
  - Document anatomy inspector: View abstracts, chunk distributions, token counts, and full extracted text.
- **Personal Evidence Notebook**:
  - Bookmark citations, key quotes, and equations directly from chat.
  - One-click BibTeX export (`scholarflow_citations.bib`) formatted for LaTeX/Overleaf.
- **Streamlit & LaTeX Submission Exporter**:
  - Export structured research papers and reproducible Streamlit interactive code.

### 2. Administrator Portal (Admin Interface)
Designed for platform administrators, lab directors, and systems engineers:
- **Single-LLM Multi-Tenant Telemetry**:
  - Real-time tracking of active isolated sessions.
  - Real-time LLM query counts, token throughput, and latency distribution.
  - Status indicator for Google Gemini 2.5 Flash and local Ollama bridges.
- **Active Session Manager**:
  - Directory of active sessions with Session IDs, associated user emails, organizations, ingested paper counts, and memory chunk vectors.
  - **Session Inspection Drawer**: Click any session to inspect its vector boundary and verify zero cross-tenant contamination.
- **Global RAG & Policy Controls**:
  - Global Top-K retrieval clamp (1–10 chunks).
  - Global cosine similarity cutoff threshold.
  - Hypothetical Document Embeddings (HyDE) toggle.
  - Global academic integrity and citation verification rules.
- **Live Query Audit Stream**:
  - Real-time terminal log displaying recent queries, latency in milliseconds, tokens processed, and status codes.

---

## 🎯 Dynamic Feature & Topic Adaptation (User-Customized Research Scope)

ScholarFlow AI includes an intelligent **Topic-Adaptive Feature Switcher**:
- **"All Research Domains" (Default)**: Displays the comprehensive multidisciplinary suite, showing all 25+ peer-reviewed papers across Radar, PPG, ECG, AI, and clinical systems, along with universal research synthesis tools.
- **Selective Domain / Topic Mode**: If a researcher is focused on a specific topic (e.g., *FMCW Radar Sensing*, *Photoplethysmography & Cuffless BP*, *Biomedical DSP*, *Deep Learning*, or *Critical Care Deterioration*), they can toggle their active focus via the **Active Focus Dropdown** or **Domain Manager Modal**:
  - The **Home Dashboard** immediately reprioritizes domain-specific quick-action query pills, research metrics, and literature focus.
  - The **Scholar Chat** automatically configures RAG chunk filters to retrieve evidence strictly relevant to the researcher's topic.
  - The **Biomedical & Signal Lab** presets its initial modality to match the researcher's topic (e.g., FMCW radar micro-Doppler vs PPG systolic peak delineation).
  - The **Literature Review Generator** builds consensus matrices tailored to the chosen discipline.

---

## 🌐 Universal Support Across All Disciplines

The platform does not restrict or bias research towards any single domain. It works seamlessly for:
- **Computer Science & AI**: Neural networks, transformer architectures, LoRA fine-tuning, retrieval pipelines, complexity theory, systems design.
- **Humanities & English Literature**: Narrative theory, focalization, stylistic analysis, postcolonial discourse, close readings, historical manuscripts.
- **Biomedical Sciences & Engineering**: Hemodynamic monitoring, ECG/PPG waveforms, cuffless blood pressure, medical devices, clinical trials.
- **Physical & Material Sciences**: Quantum mechanics, condensed matter, fluid dynamics, chemical spectroscopy, thermodynamics.
- **Economics & Social Sciences**: Econometric modeling, behavioral surveys, policy evaluations, statistical regressions.

---

## ⚡ Technical Architecture & Tech Stack

- **Frontend**: React 18 with TypeScript, Vite, Tailwind CSS.
- **Icons**: Lucide React.
- **Full-Stack Routing & API Proxy**: Express.js server on Node.js running on Port 3000.
- **AI / LLM Engine**:
  - **Cloud Engine**: Google Gemini API via `@google/genai` (Gemini 2.5 Flash).
  - **Local Offline Engine**: Ollama REST bridge (`http://localhost:11434`) supporting LLaMA 3.2, Qwen 2.5, DeepSeek R1, Gemma 3, and Nomic Embeddings.
- **Persistence & Multi-Tenancy**: Firebase Authentication & Cloud Firestore (`ai-studio-vitalsignrag-*`), with partitioned security rules:
  - `/users/{userId}/...`
  - `/sessions/{sessionId}/...`
- **Retrieval Engine**: Hybrid Retrieval combining BM25 keyword frequency with Cosine Similarity vector scoring, query expansion, and HyDE hallucination vectors.

---

## 🚀 Getting Started & Deployment

### 1. Prerequisites
- Node.js 20+ installed
- npm or yarn

### 2. Environment Variables
Create a `.env` file in the root directory:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Development Server
```bash
# Install dependencies
npm install

# Launch Vite + Express dev server on port 3000
npm run dev
```
Open your browser at `http://localhost:3000`.

### 4. Switching Between User Workspace & Admin Portal
- Use the **Interface Switcher** in the top navigation bar to toggle between **Researcher Workspace** and **Admin Portal**.
- Sign in with an administrative email (e.g. `mtalhajahangir@mnsuet.edu.pk` or create an account with role `Administrator`) to unlock persistent admin privileges.

### 5. Running with Local Ollama (100% Offline Mode)
1. Install Ollama from [ollama.ai](https://ollama.ai).
2. Pull your preferred model:
   ```bash
   ollama pull llama3.2:3b
   ```
3. In the application header, toggle the Provider from **Gemini 2.5 Flash** to **Local Ollama**.
4. All vector parsing, embeddings, and chat synthesis will run locally on your hardware.

---

## 📄 License & Attribution
Developed with ❤️ for the global research community. Designed to provide enterprise-grade, evidence-grounded research intelligence with uncompromising privacy and publication standards.
