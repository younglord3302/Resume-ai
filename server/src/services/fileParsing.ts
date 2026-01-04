// src/services/fileParsing.ts
import type { Express } from "express";
import * as pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function extractTextFromFile(
  file: Express.Multer.File
): Promise<string> {
  const mime = file.mimetype.toLowerCase();
  const name = file.originalname.toLowerCase();

  // PDF
  if (mime === "application/pdf" || name.endsWith(".pdf")) {
    const parsed = await pdfParse(file.buffer);
    return parsed.text || "";
  }

  // DOCX
  if (
    mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({
      buffer: file.buffer,
    } as any);
    return result.value || "";
  }

  // Plain text
  if (mime === "text/plain" || name.endsWith(".txt")) {
    return file.buffer.toString("utf8");
  }

  throw new Error(
    `Unsupported file type: ${mime}. Please upload PDF, DOCX, or TXT.`
  );
}
