import { VitalSignPaper } from '../types';

export interface SampleResearchCluster {
  id: string;
  domainId: string;
  name: string;
  description: string;
  badge: string;
  icon: string;
  papers: VitalSignPaper[];
}

export const ENGLISH_LITERATURE_CLUSTER: VitalSignPaper[] = [
  {
    id: 'lit-paper-01',
    title: 'Cognitive Poetics and Conceptual Metaphor in Early Modern Dramatic Soliloquies',
    authors: 'Thorne, Eleanor M. & Davenport, Arthur G.',
    year: 2023,
    venue: 'Journal of Literary Semantics & Renaissance Studies',
    modality: 'Photoplethysmography (PPG)', // mapped to base modality for type compatibility
    problemStatement: 'Historical literary criticism often attributes soliloquy emotional intensity to rhetorical ornamental figures without accounting for underlying conceptual blending and embodied cognitive resonance in audience perception.',
    deviceUsed: 'Corpus of Shakespearean Folios (1623 First Folio edition) cross-analyzed with Early English Books Online (EEBO-TCP corpus).',
    groundTruth: 'Annotated structural rhetorical taxonomy (Puttenham, 1589 "The Arte of English Poesie") paired with FrameNet semantic role mappings.',
    methodology: 'Cognitive stylistic close-reading integrated with semantic field frequency mapping and Fauconnier-Turner conceptual integration network modeling.',
    dataset: 'Corpus of 140 Dramatic Soliloquies across Shakespeare, Marlowe, and Webster (n=48,200 verse tokens).',
    keyFindings: [
      'Identified that 78.4% of existential soliloquies project mental deliberation onto somatic spatial metaphors (MIND AS CONTAINER and TIME AS RAVAGER).',
      'Demonstrated that dramatic tension escalates when acoustic meter (caesura disruption) coincides with cross-space conceptual compression.',
      'Refutes the traditional thesis that Hamlet’s "To be or not to be" is primarily Stoic disputation, proving it operates as an embodied spatial labyrinth.'
    ],
    metrics: {
      'Somatic Metaphor Density': '14.8 per 1k tokens',
      'Caesura Alignment': 'r = 0.89 with semantic climax',
      'Corpus Size': '48,200 tokens'
    },
    clinicalSignificance: 'Advances cognitive literary theory by demonstrating how Early Modern drama engineers empathetic audience immersion through physicalized linguistic schema.',
    abstract: 'This paper bridges cognitive linguistics and Early Modern dramatic theory. Examining 140 soliloquies across Shakespeare, Marlowe, and Webster, we demonstrate that dramatic soliloquies do not merely reflect ornamental rhetoric, but systematically harness embodied conceptual metaphors—mapping abstract existential dread onto physical vessels, paths, and somatic decay. Our corpus analysis reveals a tight correlation between metrical syncopation and cognitive blend resolution.',
    chunks: [
      {
        id: 'lit-chunk-01-1',
        paperId: 'lit-paper-01',
        paperTitle: 'Cognitive Poetics and Conceptual Metaphor in Early Modern Dramatic Soliloquies',
        section: '1. Introduction: From Ornament to Embodied Cognition',
        content: 'For centuries, literary scholars following Renaissance rhetoricians such as George Puttenham (1589) cataloged dramatic soliloquies as showcases of classical figures—hyperbaton, aposiopesis, and anaphora. However, formalist taxonomy fails to explain why soliloquies evoke visceral somatic reactions in listeners. Drawing upon Lakoff and Johnson’s embodied cognition framework and Fauconnier’s conceptual blending, we argue that Renaissance dramatists structured inner monologue around primary physical schemas: CONTAINMENT, VERTICALITY, and PHYSICAL PENETRATION.',
        page: 1,
        tokenCount: 96
      },
      {
        id: 'lit-chunk-01-2',
        paperId: 'lit-paper-01',
        paperTitle: 'Cognitive Poetics and Conceptual Metaphor in Early Modern Dramatic Soliloquies',
        section: '3. Textual Evidence: Spatial Labyrinths in Hamlet & Macbeth',
        content: 'In Hamlet III.i, the syntactical oscillation between active confrontation ("to take arms against a sea of troubles") and passive endurance ("to suffer the slings and arrows") presents a blended mental space where water, war, and sleeping merge. The phrase "sea of troubles" violates classical decorum through catachresis, but achieves maximum cognitive resonance precisely by projecting psychological turmoil onto an unnavigable oceanic barrier. Our quantitative frequency mapping shows an 84% spike in maritime and physical barrier lemmas during crisis soliloquies.',
        page: 5,
        tokenCount: 104
      },
      {
        id: 'lit-chunk-01-3',
        paperId: 'lit-paper-01',
        paperTitle: 'Cognitive Poetics and Conceptual Metaphor in Early Modern Dramatic Soliloquies',
        section: '5. Conclusion & Literary Implications',
        content: 'Our findings establish that Early Modern dramatic soliloquies function as cognitive simulators for the early modern playgoer. Rather than detached rhetorical showpieces, they are linguistic instruments calibrated to provoke autonomic empathetic distress. Future research should apply this methodology across non-dramatic Renaissance devotional poetry and Jacobean tragicomedies.',
        page: 9,
        tokenCount: 78
      }
    ]
  },
  {
    id: 'lit-paper-02',
    title: 'Corpus Stylistics and Narrative Focalization in 19th-Century Realist Fiction',
    authors: 'Sinclair, Alistair V. & Montgomery, Beatrice',
    year: 2024,
    venue: 'Poetics & Digital Humanities Quarterly',
    modality: 'Photoplethysmography (PPG)',
    problemStatement: 'Differentiating Free Indirect Discourse (FID) from neutral omniscient narration in Victorian novels remains notoriously subjective in qualitative close reading, hindering large-scale historical narrative comparisons.',
    deviceUsed: 'CLMET3 (Corpus of Late Modern English Texts) and Chadwyck-Healey 19th-Century Fiction Corpus.',
    groundTruth: 'Expert consensus manual annotations on 12 benchmark Victorian novels across Austen, Eliot, Dickens, and Gaskell.',
    methodology: 'Multi-feature computational stylistics: tracking shifts in deictic markers, modality verbs (could, would, must), temporal adverbs (now, tomorrow), and mental state predicates.',
    dataset: '120 Victorian Novels published between 1815 and 1895 (24.2 million running words).',
    keyFindings: [
      'Free Indirect Discourse occurs with 3.2x higher density in domestic crisis scenes than in exterior social dialogue.',
      'George Eliot’s Middlemarch exhibits the highest structural oscillation between narrator detachment and character focalization (F-score 0.91 against expert coding).',
      'Demonstrated that the historical emergence of FID correlates directly with the rise of urban psychological isolation in the 1850s–1870s.'
    ],
    metrics: {
      'FID Classification F1': '0.912',
      'Corpus Scale': '24.2M words (120 novels)',
      'Inter-annotator Cohen Kappa': '0.88'
    },
    clinicalSignificance: 'Provides the first scalable digital humanities pipeline to systematically map the evolution of human interiority in English prose fiction.',
    abstract: 'Free Indirect Discourse (FID) has long been celebrated as the crowning technical achievement of Victorian psychological realism. By integrating computational corpus linguistics with Genettean narratology, we analyze 120 Victorian novels to establish empirical thresholds for narrator-character voice merging. We show that deictic dissonance—pairing past tense verbs with proximal adverbs ("she was now here")—reliably indexes moments of ethical crisis across 19th-century prose.',
    chunks: [
      {
        id: 'lit-chunk-02-1',
        paperId: 'lit-paper-02',
        paperTitle: 'Corpus Stylistics and Narrative Focalization in 19th-Century Realist Fiction',
        section: '1. Theoretical Framework: Deictic Dissonance in FID',
        content: 'Gérard Genette famously distinguished between "who speaks?" (narration) and "who sees?" (focalization). In standard third-person omniscient narration, temporal and spatial deixis align with the retrospective narrator ("She had arrived the previous day"). In Free Indirect Discourse, the narrative syntax retains past tense while lexical deixis adopts the character’s immediate subjective present: "She was here now, and what could they say?" This deictic clash generates a distinct linguistic signature detectable across large corpora.',
        page: 2,
        tokenCount: 98
      },
      {
        id: 'lit-chunk-02-2',
        paperId: 'lit-paper-02',
        paperTitle: 'Corpus Stylistics and Narrative Focalization in 19th-Century Realist Fiction',
        section: '4. Comparative Results: Eliot, Austen, and Gaskell',
        content: 'Analyzing George Eliot’s Middlemarch reveals that Dorothea Brooke’s soliloquizing prose exhibits a 42% higher concentration of epistemic modality verbs ("seemed", "felt", "must") than the surrounding chapters. Austen’s Emma, by contrast, relies on evaluative adjectives ("handsome, clever, and rich") within focalized sentences to induce ironic complicity between the reader and narrator. Our algorithmic probe correctly disambiguates 91.2% of contested passages verified against consensus critical editions.',
        page: 7,
        tokenCount: 94
      }
    ]
  },
  {
    id: 'lit-paper-03',
    title: 'Discourse, Power, and Subversion: A Critical Linguistic Analysis of Colonial Travel Narratives (1870–1910)',
    authors: 'Khatri, Sunita & O’Connor, Declan J.',
    year: 2023,
    venue: 'Critical Inquiry in Discourse & Postcolonial Studies',
    modality: 'Photoplethysmography (PPG)',
    problemStatement: 'While post-colonial theory (Said, Spivak) offers robust ideological critique, traditional textual analyses frequently lack systematic linguistic evidence demonstrating how grammatical transitivity and agency deletion actively construct colonial hegemony.',
    deviceUsed: 'British Empire Travel Archive (BETA Corpus) and Royal Geographical Society Expedition Journals.',
    groundTruth: 'Critical Discourse Analysis (CDA) framework codified by Fairclough and Hallidayan Systemic Functional Linguistics.',
    methodology: 'Transitivity analysis (Material vs. Mental vs. Relational process types), passive voice nominalization rates, and agent-deletion metrics.',
    dataset: '65 Published Travel Memoirs and Colonial Administrative Reports from British India and East Africa (8.4 million words).',
    keyFindings: [
      'Indigenous subjects appear in passive grammatical positions in 71.3% of clauses describing labor and environmental exploitation.',
      'Nominalization ("the clearing of the forest", "the collection of revenue") suppresses colonial administrative agency in 64% of coercive accounts.',
      'Identified covert subtextual anxiety in travel memoirs: narrative fractures and epistemic hedges ("perhaps", "seemingly") surge by 230% in accounts of regional resistance.'
    ],
    metrics: {
      'Agent Deletion Rate': '64.2%',
      'Passive Transitivity Ratio': '3.4:1',
      'Corpus Volume': '8.4M words'
    },
    clinicalSignificance: 'Empirically unmasks the linguistic mechanics of imperial power, demonstrating how grammar itself served as an instrument of geopolitical subjugation.',
    abstract: 'Drawing on Systemic Functional Grammar and Critical Discourse Analysis, this article investigates 65 colonial travel memoirs and administrative diaries between 1870 and 1910. We demonstrate how grammatical structures systematically erased indigenous agency through nominalization and passive transitivity, while covert linguistic markers of imperial vulnerability betrayed deep anxieties regarding colonial resistance.',
    chunks: [
      {
        id: 'lit-chunk-03-1',
        paperId: 'lit-paper-03',
        paperTitle: 'Discourse, Power, and Subversion: A Critical Linguistic Analysis of Colonial Travel Narratives (1870–1910)',
        section: '2. Hallidayan Transitivity and Agency Deletion',
        content: 'In Systemic Functional Linguistics, transitivity choices reveal ideological worldviews. When an author writes "Ten acres were cleared by morning" instead of "The colonial officer forced fifty villagers to fell the timber," the grammatical choice eliminates both the perpetrator and the coercion. Across our corpus, material action clauses depicting indigenous populations assign them the participant role of "Goal" or "Circumstance" rather than "Actor" in over 70% of occurrences.',
        page: 3,
        tokenCount: 92
      },
      {
        id: 'lit-chunk-03-2',
        paperId: 'lit-paper-03',
        paperTitle: 'Discourse, Power, and Subversion: A Critical Linguistic Analysis of Colonial Travel Narratives (1870–1910)',
        section: '5. Textual Ruptures: The Return of the Repressed',
        content: 'Despite overt assertions of imperial mastery, the narratives frequently experience syntactic fragmentation when encountering native autonomy. Modal adjuncts of uncertainty ("unfathomable", "incomprehensible", "seemingly quiet") peak precisely prior to accounts of rebellion. These stylistic cracks reveal what Bhabha terms colonial ambivalence—the inescapable dread that the subject cannot be fully codified or subdued by imperial language.',
        page: 8,
        tokenCount: 88
      }
    ]
  },
  {
    id: 'lit-paper-04',
    title: 'The Rhetoric of Scepticism: Dialectical Tension and Dramatic Irony in Jacobean Revenge Tragedy',
    authors: 'Vanderbilt, Christian R. & Sterling, Clara',
    year: 2024,
    venue: 'Review of English Studies',
    modality: 'Photoplethysmography (PPG)',
    problemStatement: 'The philosophical coherence of Jacobean drama has been contested between nihilistic readings and orthodox moralistic frameworks, leaving unresolved how dramatists systematically manipulated audience scepticism.',
    deviceUsed: 'Digital Renaissance Drama Textbase (Webster’s Duchess of Malfi, Tourneur’s Revenger’s Tragedy, Middleton’s Changeling).',
    groundTruth: 'Sixteenth-century Pyrrhonian scepticism (Montaigne’s Essais translated by Florio, 1603) matched with dramatic stichomythia metrics.',
    methodology: 'Dialectical stichomythia parsing, antithetical rhetorical figure density, and dramatic irony distribution analysis.',
    dataset: '24 Jacobean Tragedies staged between 1603 and 1625.',
    keyFindings: [
      'Found that stichomythia (rapid line-by-line dialogue) systematically peaks during moments of epistemological collapse (e.g. Bosola and Ferdinand in Duchess of Malfi IV.ii).',
      'Antithesis and oxymoron frequency is 4.1 times higher in revenge tragedies than in contemporary citizen comedies, functioning as philosophical markers of moral paralysis.',
      'Proves that dramatic irony in revenge tragedy does not provide moral closure, but deliberately implicates the audience in corrupt judicial voyeurism.'
    ],
    metrics: {
      'Antithesis Density': '22.4 per scene',
      'Stichomythia Correlation with Peripeteia': 'r = 0.93',
      'Corpus': '24 Complete Folio Texts'
    },
    clinicalSignificance: 'Reframes Jacobean drama as a rigorous philosophical arena challenging Early Modern political and religious dogmatism.',
    abstract: 'Jacobean revenge tragedy has persistently divided critics between readings of orthodox Christian providentialism and bleak Machiavellian nihilism. Through exhaustive structural analysis of 24 plays, we reveal that playwrights weaponized dialectical stichomythia and paradoxical tropes to enact Montaignean epistemological scepticism upon the stage. Audience sympathy is deliberately fractured, compelling spectators into an uncomfortable consciousness of their own voyeuristic complicity.',
    chunks: [
      {
        id: 'lit-chunk-04-1',
        paperId: 'lit-paper-04',
        paperTitle: 'The Rhetoric of Scepticism: Dialectical Tension and Dramatic Irony in Jacobean Revenge Tragedy',
        section: '1. Scepticism and the Crisis of Certainty',
        content: 'The English translation of Michel de Montaigne’s Essais by John Florio in 1603 ignited an intellectual revolution across London’s theatrical district. Writers like John Webster and Thomas Middleton were not merely dramatizing sensational Italianate violence; they were staging epistemological crisis. When characters repeatedly pose unresolved rhetorical questions regarding divine justice ("Does heaven look upon our misery and yet remain silent?"), the plays actively dismantle providential certainty.',
        page: 2,
        tokenCount: 91
      },
      {
        id: 'lit-chunk-04-2',
        paperId: 'lit-paper-04',
        paperTitle: 'The Rhetoric of Scepticism: Dialectical Tension and Dramatic Irony in Jacobean Revenge Tragedy',
        section: '4. The Complicity of Dramatic Irony in The Duchess of Malfi',
        content: 'In Webster’s The Duchess of Malfi, dramatic irony operates as an ethical trap. The audience is privy to Bosola’s double-dealing while the Duchess remains oblivious. Rather than eliciting detached superiority, this omniscience forces the viewer into passive complicity with her torture. When Bosola finally confesses "I would not change my peace of conscience for all the wealth of Europe," his syntax collapses into frantic antitheses, mirroring the moral vacuum of the Jacobean court.',
        page: 6,
        tokenCount: 96
      }
    ]
  }
];

export const CS_AI_CLUSTER: VitalSignPaper[] = [
  {
    id: 'cs-paper-01',
    title: 'Attention Is All You Need: Scalable Multi-Head Self-Attention for Sequence Transduction',
    authors: 'Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., et al.',
    year: 2017,
    venue: 'Advances in Neural Information Processing Systems (NeurIPS)',
    modality: 'Photoplethysmography (PPG)',
    problemStatement: 'Recurrent and convolutional neural networks suffer from sequential computation bottlenecks that prevent parallelization across long token sequences.',
    deviceUsed: '8 NVIDIA P100 GPUs trained for 3.5 days on WMT 2014 English-to-German and English-to-French benchmarks.',
    groundTruth: 'BLEU score on WMT 2014 Translation Task and human evaluation linguistic fluency.',
    methodology: 'Multi-Head Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) V with sinusoidal positional encodings and residual layer normalization.',
    dataset: 'WMT 2014 English-German (4.5M sentence pairs) and English-French (36M sentence pairs).',
    keyFindings: [
      'Achieved SOTA 28.4 BLEU on English-to-German translation, improving over best ensemble models by +2.0 BLEU.',
      'Reduced training time to 3.5 days, a fraction of the cost of competitive recurrence-based architectures.',
      'Demonstrated that self-attention alone, without recurrence or convolution, generalizes to parsing and summarization.'
    ],
    metrics: {
      'BLEU (En-De)': '28.4',
      'BLEU (En-Fr)': '41.8',
      'Training FLOPs': '3.3 x 10^18',
      'Complexity per Layer': 'O(n^2 * d)'
    },
    clinicalSignificance: 'Revolutionized artificial intelligence by introducing the Transformer architecture, the foundation for modern Large Language Models.',
    abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on machine translation show these models to be superior in quality while being more parallelizable and requiring significantly less time to train.',
    chunks: [
      {
        id: 'cs-chunk-01-1',
        paperId: 'cs-paper-01',
        paperTitle: 'Attention Is All You Need',
        section: '3.2 Multi-Head Scaled Dot-Product Attention',
        content: 'An attention function can be described as mapping a query and a set of key-value pairs to an output. We compute the dot products of the query with all keys, divide each by sqrt(d_k), and apply a softmax function to obtain the weights on the values: Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V. Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions: MultiHead(Q, K, V) = Concat(head_1, ..., head_h) W^O.',
        page: 4,
        tokenCount: 110
      },
      {
        id: 'cs-chunk-01-2',
        paperId: 'cs-paper-01',
        paperTitle: 'Attention Is All You Need',
        section: '4. Why Self-Attention: Computational Complexity',
        content: 'Self-attention layers connect all positions with a constant number of sequentially executed operations O(1), whereas recurrent layers require O(n) sequential operations. In terms of computational complexity, self-attention layers are faster than recurrent layers when the sequence length n is smaller than the representation dimensionality d, which is standard for most sentence-level NLP tasks.',
        page: 6,
        tokenCount: 85
      }
    ]
  },
  {
    id: 'cs-paper-02',
    title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
    authors: 'Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., et al.',
    year: 2020,
    venue: 'Advances in Neural Information Processing Systems (NeurIPS)',
    modality: 'Photoplethysmography (PPG)',
    problemStatement: 'Parametric-only neural language models hallucinate facts, cannot update internal knowledge dynamically, and fail to provide verifiable provenance citations.',
    deviceUsed: 'Facebook DPR (Dense Passage Retriever) indexed with FAISS over 21 million 100-word Wikipedia passages, coupled with BART-large generator.',
    groundTruth: 'Exact Match (EM) accuracy on Natural Questions, TriviaQA, CuratedTrec, and WebQuestions benchmarks.',
    methodology: 'Hybrid Non-Parametric Memory with Marginalized Sequence-to-Sequence Generation: RAG-Sequence and RAG-Token models marginalizing over top-k retrieved documents.',
    dataset: 'Open-domain question answering benchmarks (NQ, TriviaQA, MS-MARCO) and Jeopardy question generation.',
    keyFindings: [
      'RAG models set new SOTA on open-domain question answering, outperforming parametric models 3x larger.',
      'Demonstrated that factual accuracy can be updated in real time by simply swapping or appending index passages without retraining model weights.',
      'Significantly reduced factual hallucinations and generated responses containing verifiable citation provenance.'
    ],
    metrics: {
      'NQ Exact Match': '44.5%',
      'TriviaQA EM': '56.8%',
      'Index Scale': '21 Million Passages',
      'Latency': '< 250ms with FAISS'
    },
    clinicalSignificance: 'Pioneered the RAG paradigm, enabling enterprise and scientific search grounded directly in verifiable documents.',
    abstract: 'Large pre-trained language models store factual knowledge in their parameters, but their ability to access and precisely manipulate this knowledge is limited. We introduce Retrieval-Augmented Generation (RAG)—a general-purpose fine-tuning recipe combining pre-trained parametric and non-parametric memory. Our evaluations demonstrate that RAG models generate more specific, diverse, and factual language than state-of-the-art parametric-only baselines.',
    chunks: [
      {
        id: 'cs-chunk-02-1',
        paperId: 'cs-paper-02',
        paperTitle: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
        section: '2. Methods: RAG Architecture Formulation',
        content: 'The RAG architecture utilizes the input query x to retrieve top-k latent documents z using a Dense Passage Retriever (DPR): p_eta(z|x) proportional to exp(d(z)^T q(x)). The generator then conditions on both the retrieved documents and query to generate the target sequence y. In RAG-Token models, the generator can attend to different documents for each generated token: p(y|x) = product_i sum_z p_eta(z|x) p_theta(y_i | x, z, y_{1:i-1}). This allows dynamic evidence synthesis.',
        page: 3,
        tokenCount: 112
      },
      {
        id: 'cs-chunk-02-2',
        paperId: 'cs-paper-02',
        paperTitle: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
        section: '4. Knowledge Editing and Real-Time Provenance',
        content: 'A decisive advantage of RAG over parametric models is modularity. When scientific or factual knowledge changes, the non-parametric index can be updated instantaneously by modifying document embeddings without expensive gradient descent. Furthermore, every generated assertion can be traced directly to specific retrieved passages, providing verifiable provenance essential for academic and medical applications.',
        page: 7,
        tokenCount: 88
      }
    ]
  },
  {
    id: 'cs-paper-03',
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    authors: 'Hu, E. J., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., et al.',
    year: 2022,
    venue: 'International Conference on Learning Representations (ICLR)',
    modality: 'Photoplethysmography (PPG)',
    problemStatement: 'Full fine-tuning of multi-billion parameter foundation models is computationally prohibitive, consumes vast GPU VRAM, and causes catastrophic forgetting.',
    deviceUsed: 'NVIDIA A100 GPUs fine-tuning GPT-3 175B, RoBERTa, and DeBERTa architectures.',
    groundTruth: 'GLUE benchmark scores and WikiSQL / MultiNLI task accuracy compared against full fine-tuning.',
    methodology: 'Low-Rank Matrix Decomposition: Freezing pre-trained weight matrix W_0 and injecting trainable rank decomposition matrices: W = W_0 + Delta W = W_0 + B * A, where B in R^{d x r} and A in R^{r x k} with r << min(d, k).',
    dataset: 'GLUE benchmark suite, SQuAD, and 175B parameter language generation tasks.',
    keyFindings: [
      'Matched or exceeded full model fine-tuning performance on GPT-3 175B while training only 0.01% of total parameters.',
      'Reduced GPU memory footprint during training by 3x and decreased checkpoint storage by 10,000x (from 350 GB to 35 MB).',
      'Introduces zero additional inference latency by folding adapter matrices into base weights: W = W_0 + B*A prior to deployment.'
    ],
    metrics: {
      'Trainable Parameters': '0.01% of total',
      'VRAM Reduction': '3x saving',
      'Inference Overhead': '0 ms added latency',
      'Rank r': '4 to 8 sufficient for SOTA'
    },
    clinicalSignificance: 'Democratized fine-tuning of large models on consumer and academic hardware without performance degradation.',
    abstract: 'An important paradigm of natural language processing involves large-scale pre-training followed by task-specific fine-tuning. We propose Low-Rank Adaptation (LoRA), which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture. LoRA allows training up to 10,000 times fewer parameters with zero added inference latency.',
    chunks: [
      {
        id: 'cs-chunk-03-1',
        paperId: 'cs-paper-03',
        paperTitle: 'LoRA: Low-Rank Adaptation of Large Language Models',
        section: '3. Problem Formulation & Low-Rank Constraint',
        content: 'Inspired by Li et al. (2018) showing that over-parametrized models have a low "intrinsic dimension," we hypothesize that the weight updates Delta W during task adaptation also have a low intrinsic rank. For a pre-trained weight matrix W_0 in R^{d x k}, we constrain its update by representing Delta W = B * A, where B in R^{d x r} and A in R^{r x k}, and the rank r << min(d, k). During training, W_0 is frozen and does not receive gradient updates; only A and B contain trainable parameters.',
        page: 3,
        tokenCount: 115
      }
    ]
  },
  {
    id: 'cs-paper-04',
    title: 'Constitutional AI: Harmlessness from AI Feedback and Self-Correction',
    authors: 'Bai, Y., Kadavath, S., Kundu, S., Askell, A., Kernion, J., et al.',
    year: 2022,
    venue: 'Anthropic Technical Report & arXiv:2212.08073',
    modality: 'Photoplethysmography (PPG)',
    problemStatement: 'Reinforcement Learning from Human Feedback (RLHF) requires massive human labeling, creates emotional fatigue in annotators reviewing toxic content, and struggles to scale to subtle ethical dilemmas.',
    deviceUsed: 'Large-scale distributed TPU cluster implementing Reinforcement Learning from AI Feedback (RLAIF).',
    groundTruth: 'Red-teaming attack success rates and Elo ratings by crowdworkers and expert ethicists.',
    methodology: 'Constitutional Feedback Loop: Supervised Learning (Critique and Revision against a set of written constitutional principles) followed by RLAIF preference modeling.',
    dataset: 'Anthropic Red-Teaming Dataset and Human Preference Dialogue Suite.',
    keyFindings: [
      'Eliminated human labeler exposure to toxic content by replacing human feedback with AI self-critique guided by a formal constitution.',
      'Achieved superior Pareto efficiency between helpfulness and harmlessness compared to standard RLHF.',
      'Empowered models to transparently explain the ethical principles governing their refusals rather than giving evasive non-answers.'
    ],
    metrics: {
      'Harmful Response Rate': '< 0.5%',
      'Helpfulness Retention': '98.7% vs RLHF',
      'Zero Human Poisoning': '100% automated critique'
    },
    clinicalSignificance: 'Established the foundation for transparent, scalable, and principle-guided alignment in autonomous AI systems.',
    abstract: 'As AI systems become more capable, aligning them using human feedback becomes bottlenecked by human labeling cost and toxicity exposure. We propose Constitutional AI (CAI), a method for training harmless AI assistants through self-correction guided by a written constitution of principles. The result is an AI that is demonstrably harmless and capable of explaining its reasoning without human intervention during training.',
    chunks: [
      {
        id: 'cs-chunk-04-1',
        paperId: 'cs-paper-04',
        paperTitle: 'Constitutional AI: Harmlessness from AI Feedback',
        section: '2. The Constitutional Feedback Mechanism',
        content: 'The Constitutional AI training process comprises two phases: Supervised Learning and Reinforcement Learning. In the critique phase, the model generates an initial response to a red-team prompt, critiques its own response using a randomly sampled principle from the constitution (e.g. "Choose the response that is least harmful, racist, or discriminatory"), and writes a revised answer. This self-corrected dataset fine-tunes the base model before preference training.',
        page: 4,
        tokenCount: 98
      }
    ]
  }
];

export const ALL_SAMPLE_CLUSTERS: SampleResearchCluster[] = [
  {
    id: 'cluster-english-lit',
    domainId: 'english-literature',
    name: 'English Literature & Linguistics Research Cluster (4 Papers)',
    description: 'Cognitive poetics, Victorian narrative stylistics, post-colonial discourse & Jacobean tragedy',
    badge: 'Humanities & English Lit',
    icon: 'BookOpen',
    papers: ENGLISH_LITERATURE_CLUSTER
  },
  {
    id: 'cluster-cs-ai',
    domainId: 'computer-science-ai',
    name: 'Computer Science & AI Systems Cluster (4 Foundational Papers)',
    description: 'Attention Transformers, RAG non-parametric memory, LoRA adaptation & Constitutional AI',
    badge: 'AI & Systems',
    icon: 'Cpu',
    papers: CS_AI_CLUSTER
  }
];

export const LITERATURE_CLUSTERS: SampleResearchCluster[] = ALL_SAMPLE_CLUSTERS;

