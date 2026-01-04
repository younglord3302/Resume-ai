// src/services/suggestionEngine.ts
import {
  KeywordAnalysis,
  SectionAnalysis,
  FormatAnalysis,
  ReadabilityAnalysis,
} from "../types/analysis";

export function generateSuggestions(
  keyword: KeywordAnalysis,
  section: SectionAnalysis,
  format: FormatAnalysis,
  readability: ReadabilityAnalysis
): string[] {
  const suggestions: string[] = [];

  // Keyword / skills suggestions
  if (keyword.missingSkills.length > 0) {
    suggestions.push(
      `Your resume is missing some skills mentioned in the job description: ${keyword.missingSkills.join(
        ", "
      )}. If you truly have experience with them, add them to a dedicated Skills section and relevant bullet points.`
    );
  } else if (keyword.score < 80) {
    suggestions.push(
      "Align your resume language more closely to the job description keywords. Mirror important terms naturally in your experience bullets."
    );
  }

  // Section suggestions
  if (section.missingSections.length > 0) {
    suggestions.push(
      `Consider adding these sections for a more complete resume: ${section.missingSections.join(
        ", "
      )}.`
    );
  }

  // Format suggestions
  if (format.score < 70) {
    if (format.charCount < 500) {
      suggestions.push(
        "Your resume seems very short. Add more detail to your experience and projects, including concrete outcomes."
      );
    } else if (format.charCount > 6000) {
      suggestions.push(
        "Your resume appears quite long. Try to keep it to 1–2 pages by removing outdated or less relevant details."
      );
    }

    if (format.bulletCount < 5) {
      suggestions.push(
        "Use bullet points for responsibilities and achievements instead of paragraphs to improve scannability for recruiters and ATS."
      );
    }

    if (format.hasPotentialTables) {
      suggestions.push(
        "Avoid complex tables or multi-column layouts as some ATS systems may parse these incorrectly."
      );
    }
  }

  // Readability suggestions
  if (readability.score < 70) {
    if (readability.avgSentenceLength > 30) {
      suggestions.push(
        "Many of your sentences are quite long. Break them into shorter, clearer statements that highlight your impact."
      );
    }

    if (readability.actionVerbCount < readability.sentenceCount * 0.3) {
      suggestions.push(
        "Start more bullet points with strong action verbs (e.g., 'Led', 'Built', 'Implemented', 'Improved') to emphasize your contributions."
      );
    }
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Your resume looks fairly strong for this job description. You can still fine-tune it by tailoring a short summary at the top to match the role more closely."
    );
  }

  return suggestions;
}
