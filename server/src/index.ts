import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from 'fs';

import { analyzeResume } from "./services/analyzeResume";
import { extractTextFromFile } from "./services/fileParsing";

// Config & Routes
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(cors()); // Simplified cors configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Kept this as it's common for form data

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// File Upload Config (Multer for disk storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", message: "API is running" });
});

// Real analyze endpoint (Phase 3 - supports both text and file upload)
app.post(
  "/api/analyze",
  upload.single("resumeFile"),
  async (req: Request, res: Response) => {
    try {
      const { jobDescription, resumeText } = req.body || {};
      const file = (req as any).file as Express.Multer.File | undefined;

      // Validate job description
      if (!jobDescription || typeof jobDescription !== 'string') {
        return res.status(400).json({
          error: "Job description is required and must be a string.",
        });
      }

      const trimmedJobDesc = jobDescription.toString().trim();
      if (trimmedJobDesc.length < 50) {
        return res.status(400).json({
          error: "Job description must be at least 50 characters long.",
        });
      }

      if (trimmedJobDesc.length > 10000) {
        return res.status(400).json({
          error: "Job description is too long. Please keep it under 10,000 characters.",
        });
      }

      let finalResumeText = (resumeText || "").toString().trim();

      // Handle file upload
      if (file) {
        // Validate file type
        const allowedMimes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain'
        ];

        if (!allowedMimes.includes(file.mimetype)) {
          return res.status(415).json({
            error: "Unsupported file format. Please upload PDF, DOCX, or TXT files only.",
          });
        }

        try {
          const extracted = await extractTextFromFile(file);
          finalResumeText = extracted.trim();
        } catch (fileError) {
          console.error("File parsing error:", fileError);
          return res.status(422).json({
            error: "Failed to parse the uploaded file. Please ensure it's a valid PDF, DOCX, or TXT file.",
          });
        }
      }

      // Validate resume text
      if (!finalResumeText) {
        return res.status(400).json({
          error: "Resume content is empty. Please upload a valid file or provide resume text.",
        });
      }

      if (finalResumeText.length < 100) {
        return res.status(400).json({
          error: "Resume text is too short. Please provide at least 100 characters.",
        });
      }

      if (finalResumeText.length > 50000) {
        return res.status(400).json({
          error: "Resume text is too long. Please keep it under 50,000 characters.",
        });
      }

      // Perform analysis
      const analysis = analyzeResume(finalResumeText, trimmedJobDesc);

      // Validate analysis result
      if (!analysis || typeof analysis.atsScore !== 'number') {
        throw new Error("Analysis failed to produce valid results");
      }

      return res.json(analysis);

    } catch (err) {
      console.error("Error analyzing resume:", err);

      // Handle specific error types
      if (err instanceof Error) {
        // Check for known error patterns
        if (err.message.includes('file parsing') || err.message.includes('extract')) {
          return res.status(422).json({
            error: "Failed to process the resume file. Please try a different file or paste the text directly.",
          });
        }

        if (err.message.includes('analysis') || err.message.includes('algorithm')) {
          return res.status(422).json({
            error: "Failed to analyze the resume content. Please check the format and try again.",
          });
        }
      }

      return res.status(500).json({
        error: "An unexpected error occurred while analyzing the resume. Please try again.",
      });
    }
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
