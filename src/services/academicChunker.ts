import { PaperChunk } from '../types';

export type AcademicChunkingStrategy = 
  | 'semantic-section'
  | 'recursive-structural'
  | 'sentence-window'
  | 'hierarchical-parent-child';

export interface AcademicChunkingStrategyInfo {
  id: AcademicChunkingStrategy;
  name: string;
  description: string;
}

export const ACADEMIC_CHUNKING_STRATEGIES: AcademicChunkingStrategyInfo[] = [
  {
    id: 'semantic-section',
    name: 'Semantic Section Chunker',
    description: 'Slices by academic discourse sections (Abstract, Intro, Method, Corpus, Findings) preserving logical structure.',
  },
  {
    id: 'recursive-structural',
    name: 'Recursive Structural Window',
    description: 'Overlapping paragraph-aware window (200 tokens, 40 overlap) preventing boundary fragmentation.',
  },
  {
    id: 'sentence-window',
    name: 'Sentence-Window Expansion',
    description: 'Retrieves granular focal sentences with sliding contextual window for pinpoint precision.',
  },
];

export interface ChunkingOptions {
  strategy: AcademicChunkingStrategy;
  targetChunkSizeTokens?: number; // e.g., 200 tokens
  overlapTokens?: number; // e.g., 40 tokens
  preserveHeadings?: boolean;
}

// Universal Academic Heading Regex across Humanities, CS, and Sciences
const ACADEMIC_SECTION_REGEX = /(?:^|\n)(?:(?:[0-9]+\.|\b[IVXLCDM]+\.|\bSection\s+[0-9]+:?|\bChapter\s+[0-9]+:?)\s*)?((?:Abstract|Introduction|Background|Theoretical Framework|Literature Review|Related Work|Methodology|Methods|Materials and Methods|Textual Analysis|Empirical Design|Corpus & Datasets|Experimental Setup|Results|Findings|Discussion|Ablation Studies|Limitations|Future Work|Conclusion|Works Cited|References|Appendix)[^\n]*)/gi;

/**
 * Strips LaTeX preamble and common command syntax while preserving mathematical formulas
 */
export function normalizeAcademicText(rawText: string): string {
  if (!rawText) return '';
  let text = rawText;

  // If LaTeX document, clean up basic boilerplate
  if (text.includes('\\documentclass') || text.includes('\\begin{document}')) {
    text = text.replace(/\\documentclass(\[[^\]]*\])?\{[^}]*\}/g, '');
    text = text.replace(/\\usepackage(\[[^\]]*\])?\{[^}]*\}/g, '');
    text = text.replace(/\\begin\{document\}/g, '');
    text = text.replace(/\\end\{document\}/g, '');
    text = text.replace(/\\section\*?\{([^}]+)\}/g, '\n## $1\n');
    text = text.replace(/\\subsection\*?\{([^}]+)\}/g, '\n### $1\n');
    text = text.replace(/\\subsubsection\*?\{([^}]+)\}/g, '\n#### $1\n');
    text = text.replace(/\\cite\{([^}]+)\}/g, '[$1]');
    text = text.replace(/\\ref\{([^}]+)\}/g, '$1');
    text = text.replace(/\\textbf\{([^}]+)\}/g, '$1');
    text = text.replace(/\\textit\{([^}]+)\}/g, '$1');
    text = text.replace(/\\emph\{([^}]+)\}/g, '$1');
  }

  // Normalize excessive whitespaces and carriage returns
  return text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * Estimates token count based on standard academic English heuristics (~4 chars per token)
 */
export function estimateTokens(text: string): number {
  return Math.max(1, Math.round(text.trim().length / 4));
}

/**
 * 1. Semantic Section-Aware Chunker (Best for Academic Research Papers)
 * Slices document by logical scholarly discourse sections
 */
export function chunkBySemanticSections(
  text: string,
  paperId: string,
  paperTitle: string,
  targetChunkTokens = 200
): PaperChunk[] {
  const normalized = normalizeAcademicText(text);
  const chunks: PaperChunk[] = [];

  // Match all section boundaries
  const matches = [...normalized.matchAll(ACADEMIC_SECTION_REGEX)];

  if (matches.length < 2) {
    // Fall back to recursive structural if no distinct formal headings were matched
    return chunkRecursively(normalized, paperId, paperTitle, targetChunkTokens, 35);
  }

  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i];
    const sectionTitle = currentMatch[1]?.trim() || `Section ${i + 1}`;
    const startIndex = (currentMatch.index || 0) + currentMatch[0].length;
    const endIndex = i + 1 < matches.length ? (matches[i + 1].index || normalized.length) : normalized.length;
    
    const sectionBody = normalized.slice(startIndex, endIndex).trim();
    if (!sectionBody) continue;

    const sectionTokens = estimateTokens(sectionBody);

    // If section fits comfortably within reasonable token bounds
    if (sectionTokens <= targetChunkTokens * 1.8) {
      chunks.push({
        id: `chunk-${paperId}-sec-${i + 1}`,
        paperId,
        paperTitle,
        section: sectionTitle,
        content: sectionBody,
        page: Math.floor(i / 1.5) + 1,
        tokenCount: sectionTokens
      });
    } else {
      // Subdivide long section into paragraph-coherent sub-chunks
      const paragraphs = sectionBody.split(/\n\s*\n/).filter(p => p.trim().length > 30);
      let buffer = '';
      let subIdx = 1;

      for (const para of paragraphs) {
        if (estimateTokens(buffer + '\n\n' + para) > targetChunkTokens && buffer.length > 0) {
          chunks.push({
            id: `chunk-${paperId}-sec-${i + 1}-p${subIdx}`,
            paperId,
            paperTitle,
            section: `${sectionTitle} (Part ${subIdx})`,
            content: buffer.trim(),
            page: Math.floor(i / 1.5) + 1,
            tokenCount: estimateTokens(buffer)
          });
          subIdx++;
          buffer = para;
        } else {
          buffer = buffer ? `${buffer}\n\n${para}` : para;
        }
      }

      if (buffer.trim()) {
        chunks.push({
          id: `chunk-${paperId}-sec-${i + 1}-p${subIdx}`,
          paperId,
          paperTitle,
          section: subIdx > 1 ? `${sectionTitle} (Part ${subIdx})` : sectionTitle,
          content: buffer.trim(),
          page: Math.floor(i / 1.5) + 1,
          tokenCount: estimateTokens(buffer)
        });
      }
    }
  }

  return chunks.length > 0 
    ? chunks 
    : chunkRecursively(normalized, paperId, paperTitle, targetChunkTokens, 35);
}

/**
 * 2. Recursive Structural Chunker
 * Recursively splits text along structural separators with guaranteed token overlap
 */
export function chunkRecursively(
  text: string,
  paperId: string,
  paperTitle: string,
  targetChunkTokens = 200,
  overlapTokens = 35
): PaperChunk[] {
  const normalized = normalizeAcademicText(text);
  const targetChars = targetChunkTokens * 4;
  const overlapChars = overlapTokens * 4;

  const rawParagraphs = normalized.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const chunks: PaperChunk[] = [];
  let currentBuffer = '';
  let chunkCount = 1;

  for (const para of rawParagraphs) {
    if ((currentBuffer.length + para.length) > targetChars && currentBuffer.length > 0) {
      chunks.push({
        id: `chunk-${paperId}-rec-${chunkCount}`,
        paperId,
        paperTitle,
        section: `Corpus Excerpt ${chunkCount}`,
        content: currentBuffer.trim(),
        page: Math.floor(chunkCount / 2) + 1,
        tokenCount: estimateTokens(currentBuffer)
      });
      chunkCount++;

      // Retain sliding window overlap
      const overlapStart = Math.max(0, currentBuffer.length - overlapChars);
      const overlapText = currentBuffer.slice(overlapStart);
      currentBuffer = overlapText + '\n\n' + para;
    } else {
      currentBuffer = currentBuffer ? `${currentBuffer}\n\n${para}` : para;
    }
  }

  if (currentBuffer.trim()) {
    chunks.push({
      id: `chunk-${paperId}-rec-${chunkCount}`,
      paperId,
      paperTitle,
      section: `Corpus Excerpt ${chunkCount}`,
      content: currentBuffer.trim(),
      page: Math.floor(chunkCount / 2) + 1,
      tokenCount: estimateTokens(currentBuffer)
    });
  }

  return chunks;
}

/**
 * 3. Sentence-Window / Contextual Expansion Chunker
 * Retains micro-propositions with expanded surrounding context
 */
export function chunkBySentenceWindow(
  text: string,
  paperId: string,
  paperTitle: string
): PaperChunk[] {
  const normalized = normalizeAcademicText(text);
  // Split into sentences
  const sentences = normalized.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [normalized];
  const chunks: PaperChunk[] = [];
  const windowSize = 4; // 4 sentences per chunk with 1 sentence sliding overlap

  for (let i = 0; i < sentences.length; i += 3) {
    const windowSentences = sentences.slice(i, i + windowSize).join(' ').trim();
    if (windowSentences.length < 40) continue;

    chunks.push({
      id: `chunk-${paperId}-win-${Math.floor(i / 3) + 1}`,
      paperId,
      paperTitle,
      section: `Contextual Window ${Math.floor(i / 3) + 1}`,
      content: windowSentences,
      page: Math.floor(i / 12) + 1,
      tokenCount: estimateTokens(windowSentences)
    });
  }

  return chunks.length > 0 
    ? chunks 
    : chunkRecursively(normalized, paperId, paperTitle, 150, 30);
}

/**
 * Main dispatcher for academic chunking
 */
export function executeAcademicChunking(
  text: string,
  paperId: string,
  paperTitle: string,
  options: ChunkingOptions
): PaperChunk[] {
  switch (options.strategy) {
    case 'semantic-section':
      return chunkBySemanticSections(text, paperId, paperTitle, options.targetChunkSizeTokens || 200);
    case 'sentence-window':
      return chunkBySentenceWindow(text, paperId, paperTitle);
    case 'hierarchical-parent-child':
    case 'recursive-structural':
    default:
      return chunkRecursively(
        text, 
        paperId, 
        paperTitle, 
        options.targetChunkSizeTokens || 200, 
        options.overlapTokens || 40
      );
  }
}
