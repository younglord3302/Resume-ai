// src/types/analysis.ts

export interface ScoresBreakdown {
  keyword: number;
  section: number;
  format: number;
  readability: number;
}

export interface KeywordAnalysis {
  score: number; // 0-100 raw keyword score
  jdSkills: string[];
  resumeSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
}

export interface SectionAnalysis {
  score: number; // 0-100 raw section score
  presentSections: string[];
  missingSections: string[];
}

export interface FormatAnalysis {
  score: number; // 0-100 raw format score
  charCount: number;
  wordCount: number;
  bulletCount: number;
  hasPotentialTables: boolean;
}

export interface ReadabilityAnalysis {
  score: number; // 0-100 raw readability score
  wordCount: number;
  sentenceCount: number;
  avgSentenceLength: number;
  actionVerbCount: number;
}

export interface AnalysisResult {
  atsScore: number;
  scoresBreakdown: ScoresBreakdown;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}
