// src/services/sectionScore.ts
import { SectionAnalysis } from "../types/analysis";

const SECTION_PATTERNS: { name: string; patterns: RegExp[] }[] = [
  {
    name: "Summary / Profile",
    patterns: [/summary/i, /profile/i, /about me/i],
  },
  {
    name: "Skills",
    patterns: [/skills/i, /technical skills/i, /key skills/i],
  },
  {
    name: "Experience",
    patterns: [/experience/i, /work history/i, /employment/i],
  },
  {
    name: "Projects",
    patterns: [/projects?/i, /personal projects?/i],
  },
  {
    name: "Education",
    patterns: [/education/i, /academics/i, /qualifications?/i],
  },
];

export function analyzeSections(resumeText: string): SectionAnalysis {
  const presentSections: string[] = [];
  const missingSections: string[] = [];

  for (const section of SECTION_PATTERNS) {
    const isPresent = section.patterns.some((pattern) =>
      pattern.test(resumeText)
    );
    if (isPresent) {
      presentSections.push(section.name);
    } else {
      missingSections.push(section.name);
    }
  }

  const totalSections = SECTION_PATTERNS.length;
  const presentCount = presentSections.length;

  const rawScore =
    totalSections === 0 ? 0 : (presentCount / totalSections) * 100;

  // Bonus if most core sections are present
  const bonus = presentCount >= totalSections - 1 ? 5 : 0;
  const score = Math.min(100, Math.round(rawScore + bonus));

  return {
    score,
    presentSections,
    missingSections,
  };
}
