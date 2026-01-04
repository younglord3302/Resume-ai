// src/services/readabilityScore.ts
import { ReadabilityAnalysis } from "../types/analysis";

const ACTION_VERBS = [
  "led",
  "managed",
  "built",
  "created",
  "implemented",
  "improved",
  "designed",
  "developed",
  "optimized",
  "launched",
  "owned",
  "increased",
  "reduced",
  "delivered",
  "architected",
];

export function analyzeReadability(resumeText: string): ReadabilityAnalysis {
  const text = resumeText || "";

  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const sentenceCount = sentences.length || 1;

  const words = text
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);
  const wordCount = words.length;

  const avgSentenceLength = wordCount / sentenceCount;

  // Sentence length score
  // Ideal: 12–25 words per sentence
  let lengthScore = 100;
  if (avgSentenceLength < 8) {
    lengthScore = Math.max(50, (avgSentenceLength / 8) * 100);
  } else if (avgSentenceLength > 30) {
    lengthScore = Math.max(
      40,
      100 - (avgSentenceLength - 30) * 3
    );
  }

  // Action verbs usage
  const lower = text.toLowerCase();
  let actionVerbCount = 0;
  for (const verb of ACTION_VERBS) {
    const matches = lower.match(
      new RegExp(`\\b${verb}\\b`, "g")
    );
    if (matches) {
      actionVerbCount += matches.length;
    }
  }

  const actionVerbRatio =
    sentenceCount === 0 ? 0 : actionVerbCount / sentenceCount;

  let actionScore = 60;
  if (actionVerbRatio >= 0.7) actionScore = 100;
  else if (actionVerbRatio >= 0.4) actionScore = 85;
  else if (actionVerbRatio >= 0.2) actionScore = 70;

  const combined = 0.6 * lengthScore + 0.4 * actionScore;
  const score = Math.max(0, Math.min(100, Math.round(combined)));

  return {
    score,
    wordCount,
    sentenceCount,
    avgSentenceLength,
    actionVerbCount,
  };
}
