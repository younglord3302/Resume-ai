// src/services/formatScore.ts
import { FormatAnalysis } from "../types/analysis";

export function analyzeFormat(resumeText: string): FormatAnalysis {
  const text = resumeText || "";
  const charCount = text.length;
  const words = text
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);
  const wordCount = words.length;

  const bulletCount =
    (text.match(/^\s*[-*•]/gm) || []).length +
    (text.match(/•/g) || []).length;

  // crude table detection (markdown tables, etc.)
  const hasPotentialTables =
    /\|.+\|/.test(text) || /table/i.test(text) || /\bcolumns?\b/i.test(text);

  // --- Scoring heuristics ---

  // Length score (ideal between roughly 500–4000 chars)
  let lengthScore = 100;
  if (charCount < 500) {
    lengthScore = Math.max(40, (charCount / 500) * 100);
  } else if (charCount > 6000) {
    lengthScore = Math.max(40, 100 - (charCount - 6000) / 100);
  }

  // Bullet score
  let bulletScore = 40;
  if (bulletCount >= 5 && bulletCount <= 60) {
    bulletScore = 100;
  } else if (bulletCount > 0) {
    bulletScore = 70;
  }

  // Table penalty
  const tablePenalty = hasPotentialTables ? 20 : 0;

  const combined =
    0.6 * lengthScore + 0.4 * bulletScore - tablePenalty;

  const score = Math.max(0, Math.min(100, Math.round(combined)));

  return {
    score,
    charCount,
    wordCount,
    bulletCount,
    hasPotentialTables,
  };
}
