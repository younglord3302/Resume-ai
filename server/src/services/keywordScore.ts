// src/services/keywordScore.ts
import { KeywordAnalysis } from "../types/analysis";

// Basic skills dictionary – extend as needed
const SKILLS_DICTIONARY = [
  "javascript",
  "typescript",
  "react",
  "node.js",
  "node",
  "express",
  "mongo",
  "mongodb",
  "sql",
  "postgres",
  "mysql",
  "html",
  "css",
  "tailwind",
  "redux",
  "next.js",
  "docker",
  "kubernetes",
  "aws",
  "gcp",
  "azure",
  "git",
  "jest",
  "cypress",
  "rest",
  "graphql",
];

function normalize(text: string): string {
  return text.toLowerCase();
}

function extractSkillsFromText(text: string): string[] {
  const normalized = normalize(text);
  const found = new Set<string>();

  for (const skill of SKILLS_DICTIONARY) {
    // Match skill as a whole word (roughly)
    const pattern = new RegExp(`\\b${skill.replace(".", "\\.")}\\b`, "i");
    if (pattern.test(normalized)) {
      found.add(skill);
    }
  }

  return Array.from(found);
}

export function analyzeKeywords(
  resumeText: string,
  jobDescription: string
): KeywordAnalysis {
  const jdSkills = extractSkillsFromText(jobDescription);
  const resumeSkills = extractSkillsFromText(resumeText);

  const jdSet = new Set(jdSkills);
  const resumeSet = new Set(resumeSkills);

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const skill of jdSet) {
    if (resumeSet.has(skill)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }

  const coverage =
    jdSkills.length === 0
      ? 0
      : (matchedSkills.length / jdSkills.length) * 100;

  const score = Math.min(100, Math.round(coverage));

  return {
    score,
    jdSkills,
    resumeSkills,
    matchedSkills,
    missingSkills,
  };
}
