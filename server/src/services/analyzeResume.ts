// src/services/analyzeResume.ts
import {
  AnalysisResult,
  ScoresBreakdown,
} from "../types/analysis";
import { analyzeKeywords } from "./keywordScore";
import { analyzeSections } from "./sectionScore";
import { analyzeFormat } from "./formatScore";
import { analyzeReadability } from "./readabilityScore";
import { generateSuggestions } from "./suggestionEngine";

export function analyzeResume(
  resumeText: string,
  jobDescription: string
): AnalysisResult {
  const keywordAnalysis = analyzeKeywords(resumeText, jobDescription);
  const sectionAnalysis = analyzeSections(resumeText);
  const formatAnalysis = analyzeFormat(resumeText);
  const readabilityAnalysis = analyzeReadability(resumeText);

  // Weighting for final ATS score
  // 50% keywords, 20% sections, 15% format, 15% readability
  const keywordComponent = (keywordAnalysis.score * 0.5);
  const sectionComponent = (sectionAnalysis.score * 0.2);
  const formatComponent = (formatAnalysis.score * 0.15);
  const readabilityComponent = (readabilityAnalysis.score * 0.15);

  const atsScore = Math.round(
    keywordComponent +
      sectionComponent +
      formatComponent +
      readabilityComponent
  );

  const scoresBreakdown: ScoresBreakdown = {
    keyword: Math.round(keywordComponent),
    section: Math.round(sectionComponent),
    format: Math.round(formatComponent),
    readability: Math.round(readabilityComponent),
  };

  const suggestions = generateSuggestions(
    keywordAnalysis,
    sectionAnalysis,
    formatAnalysis,
    readabilityAnalysis
  );

  return {
    atsScore,
    scoresBreakdown,
    matchedSkills: keywordAnalysis.matchedSkills,
    missingSkills: keywordAnalysis.missingSkills,
    suggestions,
  };
}
