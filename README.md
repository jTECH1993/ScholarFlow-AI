# ScholarFlow AI — Multi-Agent Research Intelligence System

> **Enterprise Multi-Tenant Literature Intelligence & Evidence-Grounded Research Synthesis Platform**  
> Serving scholars, researchers, faculty, and students across **all academic disciplines** with dual interfaces, isolated session management, and dedicated single-LLM orchestration.

---

## 📖 Table of Contents
1. [Executive Summary & Core Philosophy](#-executive-summary--core-philosophy)
2. [Universal Academic Architecture (All Disciplines)](#-universal-academic-architecture-all-disciplines)
3. [Enterprise Multi-Tenant Security & Authentication](#-enterprise-multi-tenant-security--authentication)
4. [Dual-Interface System: Workspace vs. Administrator Portal](#-dual-interface-system-workspace-vs-administrator-portal)
5. [Single-LLM Multi-Tenant Session Isolation Architecture](#-single-llm-multi-tenant-session-isolation-architecture)
6. [State-of-the-Art RAG Pipeline & Semantic Routing](#-state-of-the-art-rag-pipeline--semantic-routing)
7. [AI Engine: Google Gemini & Offline Local Ollama](#-ai-engine-google-gemini--offline-local-ollama)
8. [Collaborative Multi-Agent Intelligence Swarm](#-collaborative-multi-agent-intelligence-swarm)
9. [Dynamic Domain & Modality Adaptation](#-dynamic-domain--modality-adaptation)
10. [Project Structure & Tech Stack](#-project-structure--tech-stack)
11. [Getting Started, Configuration & Deployment](#-getting-started-configuration--deployment)
12. [Verification & Quality Assurance](#-verification--quality-assurance)

---

## 📖 Executive Summary & Core Philosophy

**ScholarFlow AI** is a universal research intelligence and literature synthesis platform designed for the entire academic community—from Computer Science, Artificial Intelligence, and Applied Engineering to English Literature, Linguistics, History, Law, and Biomedical Sciences.

### 🌟 Fundamental Design Directives:
1. **Universal for All Disciplines**: No artificial discipline silos or forced domain lockouts. Whether ingesting a 17th-century literary treatise, a deep learning transformer benchmark, or a clinical trial manuscript, the system parses, semantically segments, and synthesizes the literature with mathematical rigor and evidence grounding.
2. **Dual-Interface System**:
   - **Researcher Workspace (User Interface)**: Focused on literature ingestion, multi-paper chat, cross-manuscript comparative matrices, evidence notebooks with BibTeX export, and automated review generation.
   - **Administrator Portal (Admin Interface)**: Comprehensive oversight of active isolated sessions, multi-tenant single-LLM telemetry, global RAG hyperparameters, and query audit logging.
3. **Session-Isolated, Single-LLM Architecture**: Hundreds or thousands of concurrent users are served simultaneously by a single foundation LLM (Google Gemini 2.5 Flash / local Ollama) with guaranteed zero cross-tenant data leakage and custom dedicated assistance per user session.
4. **Zero-Hallucination Evidentiary Standard**: Turnitin-grade academic citation integrity. Every generative insight is anchored directly to verified manuscript text spans, complete with paper titles, authors, publication years, section headings, and page numbers.

---

## 🌐 Universal Academic Architecture (All Disciplines)

ScholarFlow AI eliminates the friction of domain-specific tooling by providing universal analytical paradigms:

- **Computer Science & AI / ML**:
  - Ingests neural network architectures, ablation studies, benchmark tables, and mathematical formulations.
  - Automatically identifies complexity proofs, loss function derivations, and algorithmic pseudo-code.
- **Biomedical & Clinical Sciences**:
  - Parses clinical trials, physiology metrics (ECG, PPG, blood pressure, Doppler radar), cohort demographics, and FDA/CE regulatory validations.
  - Built-in signal processing visualizer for hemodynamic waveforms and radar micro-Doppler spectrograms.
- **Humanities & English Literature**:
  - Performs close readings, narrative structure breakdowns, stylistic and rhetorical analyses, and thematic concordance.
  - Links critical theoretical frameworks (e.g., postcolonial discourse, structuralism, narratology) to source citations.
- **Physical & Material Sciences**:
  - Extracts thermodynamic formulas, spectroscopy data, crystal lattice properties, and experimental setup parameters.
- **Law, Policy & Social Sciences**:
  - Compares statutory provisions, legal precedents, econometric models, and survey methodologies across multiple documents simultaneously.

---

## 🔐 Enterprise Multi-Tenant Security & Authentication

ScholarFlow AI adheres strictly to institutional enterprise standards, featuring a clean, uncompromised authentication flow:

```
                  ┌───────────────────────────────────────────────┐
                  │          Universal Academic Sign In           │
                  │  • Institutional Email / Academic ID          │
                  │  • Standard Registration Flow                 │
                  │  • Self-Service Password Reset Token          │
                  └───────────────────────┬───────────────────────┘
                                          │
                                          ▼
                  ┌───────────────────────────────────────────────┐
                  │       Firebase Auth & Firestore Sync          │
                  │  • Cryptographic User UID Token               │
                  │  • Partitioned Profile Record in Firestore    │
                  │  • Role-Based Access: Researcher / Admin      │
                  └───────────────────────┬───────────────────────┘
                                          │
                        ┌─────────────────┴─────────────────┐
                        ▼                                   ▼
          ┌───────────────────────────┐       ┌───────────────────────────┐
          │   Researcher Workspace    │       │    Administrator Portal   │
          │ • Tenant-Isolated Memory  │       │ • Verified 'Administrator'│
          │ • User-Only Vectors & RAG │       │ • Hardware Passkey Check  │
          │ • Personal BibTeX Export  │       │ • Multi-Tenant Telemetry  │
          └───────────────────────────┘       └───────────────────────────┘
```

### 1. Standard Multi-Tenant Authentication
- **No Hardcoded Accounts or Demo Shortcuts**: All authentication is authenticated through Firebase Authentication using institutional emails and secure passwords.
- **Registration**: Allows researchers to specify their full name, institutional email, academic role (*Faculty Researcher*, *Graduate Student*, *Administrator*), and affiliated institution/university.
- **Self-Service Password Recovery**: Secure token dispatch through Firebase Authentication reset flow.
- **Firestore Profile Synchronization**: Creates and maintains user metadata in Firestore under partitioned namespaces (`/users/{uid}`).

### 2. Role-Based Access Control (RBAC) & Admin Gate
- **Role Verification**: Persistent administrative privileges require an authenticated profile with `role: "Administrator"`.
- **Admin Security Modal**: Protects administrative actions and the Administrator Portal with cryptographic role verification and hardware passkey checks.

---

## 🖥️ Dual-Interface System: Workspace vs. Administrator Portal

ScholarFlow AI is partitioned into two specialized interfaces designed for distinct user personas:

### 1. Researcher Workspace (User Interface)
The primary laboratory environment for faculty, researchers, and students:
- **Scholar Chat**:
  - Real-time conversation grounded in uploaded or curated papers.
  - Interactive citation badges displaying similarity scores, publication metadata, and exact text excerpts.
  - Research perspective customization: adjust tone, methodological focus, and temperature on the fly.
- **Literature Review & Matrix Generator**:
  - Dynamic multi-paper synthesis matrix comparing methodology, theoretical frameworks, datasets, and key findings.
  - Identification of scholarly consensus, ongoing debates, and research gaps.
- **Corpus Explorer & Ingestion**:
  - Drag-and-drop ingestion of PDF, LaTeX, TXT, and Markdown documents.
  - In-depth document anatomy: inspect abstracts, semantic chunk distributions, and extracted text.
- **Personal Evidence Notebook**:
  - Save key quotes, equations, and citations directly from chat threads.
  - One-click BibTeX export (`scholarflow_citations.bib`) formatted for direct import into LaTeX/Overleaf.
- **Biomedical & Sensing Lab**:
  - Interactive signal visualizer demonstrating pulse wave velocity, FMCW radar chirps, and ECG peak detection algorithms.

### 2. Administrator Portal (Admin Interface)
The central command center for lab directors and platform administrators:
- **Single-LLM Multi-Tenant Telemetry**:
  - Real-time monitoring of active isolated user sessions.
  - Aggregate token consumption, query volume, and millisecond-level latency metrics.
  - Live health status for both cloud (Gemini 2.5 Flash) and local (Ollama) inference engines.
- **Active Session Directory**:
  - Complete list of active sessions with Session IDs, associated user emails, organizations, ingested paper counts, and memory chunk vectors.
  - **Session Inspection Drawer**: Click any session to inspect its vector boundary and verify zero cross-tenant contamination.
- **Global RAG Hyperparameter Controls**:
  - Global Top-K retrieval clamp (1–10 chunks).
  - Global cosine similarity cutoff threshold.
  - Hypothetical Document Embeddings (HyDE) toggle.
  - Global academic integrity and citation verification rules.
- **Live Query Audit Stream**:
  - Real-time audit log capturing recent queries, latency in milliseconds, token counts, and execution status.

---

## 🔬 Single-LLM Multi-Tenant Session Isolation Architecture

A fundamental innovation of ScholarFlow AI is its ability to serve thousands of concurrent users with completely different documents using a **single, shared foundation model** without data leakage.

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

### 1. Cryptographic Namespacing
Each active user session is assigned an isolated cryptographic identifier (`sessionId`). When authenticated, this is permanently tied to the user's Firestore partition (`/users/{uid}/sessions/{sessionId}`).

### 2. Session-Bounded Chunk Partitioning
When papers are uploaded:
- Text is segmented into semantic chunks of 200–500 tokens with 50-token sliding overlap.
- Each chunk is permanently tagged with `paperId`, `sessionId`, and `userId`.
- The inverted index (`term -> chunk IDs`) and dense vector tables are query-filtered:
  $$\text{sim}(q, c_i) \quad \text{evaluated only for } c_i \in \mathcal{C}_{\text{session}}$$
  Chunks from other sessions are never evaluated or loaded into memory during retrieval.

### 3. Ephemeral Prompt Assembly & Context Discard
- The foundation LLM is **stateless** and does not retain memory across inference requests.
- For every query, an ephemeral prompt is dynamically constructed combining:
  1. User role and methodology instructions.
  2. Scoped top-K retrieved evidence passages.
  3. Grounding rules requiring explicit citations (`[CITATION 1]`, `[CITATION 2]`).
- Once inference completes and the streaming response is sent to the client, the context is immediately discarded from memory.

---

## 🔬 State-of-the-Art RAG Pipeline & Semantic Routing

ScholarFlow AI utilizes a multi-stage hybrid RAG pipeline optimized for factual accuracy:

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

### 1. Okapi BM25 Sparse Scoring
Evaluates keyword density normalized against dynamic corpus lengths:
$$\text{Score}_{\text{BM25}}(D, Q) = \sum_{i=1}^{N} \text{IDF}(q_i) \cdot \frac{f(q_i, D) \cdot (k_1 + 1)}{f(q_i, D) + k_1 \cdot \left(1 - b + b \cdot \frac{|D|}{\text{avgdl}}\right)}$$
Standard configuration: $k_1 = 1.5$, $b = 0.75$.

### 2. Dense Semantic Cosine Scoring
Calculates cosine angle between query and document vectors, enhanced by domain-specific acronym expansions (e.g. `IR-UWB`, `FMCW`, `PTT`, `PWV`, `rPPG`, `LoRA`, `Transformer`).

### 3. Reciprocal Rank Fusion (RRF)
Combines ranked candidate lists from sparse and dense retrievers to achieve optimal recall:
$$\text{RRF}(d) = \sum_{m \in \{\text{dense}, \text{bm25}\}} \frac{1}{k + \text{rank}_m(d)} \quad (k = 60)$$

### 4. Semantic Routing & Conflict Mitigation
Automatically classifies research inquiries into target scientific routes:
- **Radar & RF Sensing**: IR-UWB impulse radio, 60 GHz mmWave FMCW, MIMO array beamforming, WiFi CSI diffraction.
- **Optics & Hemodynamics**: Remote photoplethysmography (rPPG), Pulse Transit Time (PTT), Moens-Korteweg arterial elasticity.
- **Computer Science & AI**: Deep architectures, self-attention mechanisms, parameter-efficient fine-tuning (PEFT), distributed training.
- **Multidisciplinary Cross-Synthesis**: When queries compare multiple paradigms, the engine allocates balanced representation slots for each domain.

---

## 🤖 AI Engine: Google Gemini & Offline Local Ollama

ScholarFlow AI offers dual model support, catering to both cloud computing and zero-trust air-gapped laboratory environments:

| Feature | Google Gemini 2.5 Flash (Cloud) | Local Ollama Bridge (100% Offline) |
| :--- | :--- | :--- |
| **Model** | `gemini-2.5-flash` / `gemini-1.5-pro` | `llama3.2`, `qwen2.5`, `deepseek-r1`, `mistral`, `gemma2` |
| **Hosting** | Google Cloud / Server-Side API | Local workstation (`http://localhost:11434`) |
| **Privacy** | Enterprise TLS 1.3 & Server-Side Key | Completely local; zero bytes leave the machine |
| **Latency** | ~350–600ms streaming | Dependent on local hardware (GPU/Metal/CPU) |
| **Internet Required** | Yes | No (Fully Air-Gapped) |
| **Switch Mechanism** | One-click toggle in top navigation bar | One-click toggle in top navigation bar |

---

## 🤖 Collaborative Multi-Agent Intelligence Swarm

ScholarFlow AI includes a **Multi-Agent Collaboration Architecture** where **5 specialized AI agents** collaborate sequentially and in dynamic consensus loops to execute complex research tasks:

```
[ USER RESEARCH INQUIRY / TASK ]
                │
                ▼
┌──────────────────────────────────────────────┐
│  🔍 Agent 1: Retrieval & Evidence Scout      │ ◄── [ Hybrid Vector / BM25 RAG Corpus ]
│  • Extracts exact quotes & page numbers      │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  ⚖️ Agent 2: Methodology & Statistical Auditor│ ◄── [ Hardware, Cohort & Error Metric Audit ]
│  • Evaluates sample size, MAE/RMSE, bias     │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  ⚡ Agent 3: Controversy & Consensus Analyst │ ◄── [ Cross-Paper Debate & Agreement Map ]
│  • Identifies agreeing vs competing claims   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  🧠 Agent 4: Lead Academic Synthesis Author  │ ◄── [ Publication-Grade Manuscript Drafting ]
│  • Integrates insights with citations        │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  🛡️ Agent 5: Peer Reviewer & Quality Guard   │ ◄── [ Citation Audit & Scorecard ]
│  • Verifies fidelity & computes score (0-100)│
└──────────────────────────────────────────────┘
```

### 🌟 Specialized Agent Roles & Configuration
1. **🔍 Agent 1: Retrieval & Evidence Scout**: Searches the indexed literature corpus using hybrid BM25 + dense vector embeddings, isolates exact quotes, page numbers, and empirical datasets.
2. **⚖️ Agent 2: Methodology & Statistical Auditor**: Audits experimental setups, transducer hardware (e.g. green PPG vs 60 GHz mmWave FMCW radar), sample sizes, ground truth reference standards, and statistical error bounds (MAE, RMSE, AUROC).
3. **⚡ Agent 3: Controversy & Consensus Analyst**: Detects areas of cross-paper agreement vs active scholarly debate, opposing viewpoints, and unresolved theoretical tensions.
4. **🧠 Agent 4: Lead Academic Synthesis Author**: Combines evidence, methodology audits, and controversy maps into a publication-grade academic review manuscript with formal citations and formatted comparison tables.
5. **🛡️ Agent 5: Peer Reviewer & Quality Guard**: Audits the draft manuscript against raw source chunks to verify citation accuracy, eliminate hallucinated claims, and produce a Peer Review Scorecard (Quality Score, Citation Fidelity Score, Hallucination Risk Rating).

### ⚙️ Multi-Task Execution Workflows
- **Deep Multi-Agent Literature Review**: Full sequential 5-agent synthesis producing publication-ready manuscripts.
- **Hypothesis Stress-Test & Devil's Advocate**: Adversarial agent debate challenging scientific hypotheses against counter-evidence.
- **Cross-Corpus Benchmark & Gap Analysis**: Quantitative extraction of reported numerical error bounds and unaddressed research gaps.
- **Custom Multi-Agent Swarm Collaboration**: User-configured collaborative research pipelines.

### 🔌 Per-Agent LLM Provider Assignment (Ollama & Gemini)
Each of the 5 agents can be assigned its own LLM provider independently:
- **Local Ollama Models**: Run `llama3.2:3b`, `mistral:7b`, `deepseek-r1:7b`, `qwen2.5:7b`, `gemma2:9b`, or `phi3:3.8b` locally via `http://localhost:11434`.
- **Google Gemini 2.5 Flash**: Cloud inference with multimodal vision support.
- **1-Click Swarm Presets**: Apply "All Local Ollama", "All Gemini Flash", or "Hybrid Swarm" across all agents in one click.

---

## 🎯 Dynamic Domain & Modality Adaptation

Researchers can seamlessly adapt the platform to their specific research scope:
- **All Research Domains (Default)**: Multidisciplinary mode displaying universal literature across AI, physical sciences, engineering, and medical domains.
- **Targeted Topic Focus**: Select a specialized discipline via the header dropdown:
  - Updates quick-action query templates on the home dashboard.
  - Pre-filters RAG retrieval scopes to relevant methodologies.
  - Automatically adjusts the default visualization mode in the analytical laboratories.

---

## 📁 Project Structure & Tech Stack

```
├── index.html                   # Application entry point with semantic metadata
├── metadata.json                # Project identity and capabilities configuration
├── package.json                 # Dependencies and build scripts
├── server.ts                    # Express backend, Gemini API proxy, Ollama bridge & Vite middleware
├── src/
│   ├── main.tsx                 # React DOM mount
│   ├── App.tsx                  # Master application controller, navigation & session state
│   ├── index.css                # Tailwind CSS global styles
│   ├── types.ts                 # Comprehensive TypeScript interfaces, multi-agent schemas & types
│   ├── services/
│   │   ├── multiAgentEngine.ts  # Multi-Agent Swarm Orchestrator (5 specialized agents, task workflows)
│   │   ├── ragEngine.ts         # BM25, Cosine, RRF, SemanticRouter & MMR implementation
│   │   ├── academicChunker.ts   # Semantic section-based academic chunking engine
│   │   └── academicClassifier.ts# Multidisciplinary research category classification
│   ├── lib/
│   │   └── firebase.ts          # Firebase Auth, Firestore persistence & error handling
│   ├── data/
│   │   ├── vitalSignPapers.ts   # Pre-indexed benchmark research corpus
│   │   ├── researchDomainTopics.ts # Discipline topics and example query prompts
│   │   └── clinicalPerspectives.ts # Role perspective guidelines and system prompts
│   └── components/
│       ├── TopHeader.tsx        # Brand header, model selector & profile dropdown
│       ├── LeftSidebar.tsx      # Application navigation sidebar with Multi-Agent Swarm link
│       ├── MultiAgentWorkbench.tsx # Collaborative 5-Agent Swarm Canvas & Ollama controller
│       ├── HomeDashboard.tsx    # Multi-domain dashboard & quick-start research cards
│       ├── LoginScreen.tsx      # Multi-tenant authentication (Sign In / Register / Reset)
│       ├── AdminPortal.tsx      # Telemetry, active sessions & global hyperparameter controls
│       ├── AdminSecurityModal.tsx # Passkey & RBAC authentication barrier for Admin Portal
│       ├── ChatInterface.tsx    # Evidence-grounded conversational research interface
│       ├── LiteratureReviewGenerator.tsx # Automated multi-paper synthesis generator
│       ├── CorpusExplorer.tsx   # Paper repository, chunk inspector & uploader
│       ├── UploadManagePage.tsx # Drag-and-drop document ingestion & batch analysis
│       ├── BenchmarkMatrix.tsx  # Cross-paper comparative performance matrix
│       ├── SignalWorkbench.tsx  # Interactive biomedical waveform & radar signal laboratory
│       └── SubmissionExporter.tsx # LaTeX manuscript, BibTeX & Streamlit script exporter
```

---

## 🚀 Getting Started, Configuration & Deployment

### 1. Prerequisites
- **Node.js**: Version 20.x or higher
- **npm**: Version 10.x or higher

### 2. Environment Setup
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 3. Local Development
```bash
# 1. Install dependencies
npm install

# 2. Start the development server (Express + Vite on Port 3000)
npm run dev
```
Navigate to `http://localhost:3000` in your web browser.

### 4. Running with Local Ollama (Air-Gapped / Offline)
1. Install [Ollama](https://ollama.ai).
2. Download a model (e.g. `llama3.2`):
   ```bash
   ollama pull llama3.2:3b
   ```
3. Ensure the Ollama service is active (`ollama serve`).
4. In ScholarFlow AI, open the **Multi-Agent Swarm Workbench** or model selector and select **Local Ollama**.

### 5. Production Build & Deployment
```bash
# Build Vite client and bundle server with esbuild
npm run build

# Launch production server
npm start
```

---

## ✅ Verification & Quality Assurance

ScholarFlow AI enforces strict code quality and compilation checks:
- **TypeScript**: Strict type compliance verified via `tsc --noEmit`.
- **Linting**: Framework-level best practices checked with `npm run lint`.
- **Build Verification**: Production compilation verified using `npm run build`.

---

## 📄 Summary of Recent System Refactoring
- **Collaborative Multi-Agent Swarm**: Introduced a 5-agent AI pipeline (*Retrieval Scout, Methodology Auditor, Controversy Analyst, Lead Synthesis Author, Peer Reviewer*) with live pipeline visualization, turn-by-turn thought streams, and scorecard audits.
- **Local Ollama & Multi-Model Integration**: Full support for Local Ollama models (`llama3.2`, `mistral`, `deepseek-r1`, `qwen2.5`, `gemma2`) assigned per-agent or globally with 1-click presets.
- **Universal Enterprise Authentication**: Standardized multi-tenant registration, login, and password recovery via Firebase Auth without hardcoded accounts.
- **Isolated Multi-Tenant Security**: Guaranteed cryptographic boundaries between user sessions, ensuring document chunks and chat histories are never cross-pollinated.
- **Enhanced Role-Based Controls**: Administrative privileges strictly require verified `Administrator` roles and secure hardware passkeys.
- **Enhanced Role-Based Controls**: Elevated administrative privileges strictly require verified `Administrator` roles and secure hardware passkeys.
- **Disciplined Documentation**: Fully articulated architecture, mathematical formulations, and engineering principles across this README.
