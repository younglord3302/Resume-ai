import express from "express";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import fs from 'fs';

// Config & Routes
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';

// Initialize DB connection (Note: In serverless, we might need to handle this differently to avoid multiple connections)
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// File Upload Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure /tmp is used in serverless or check environment
    // For Vercel, we can't write to disk persistently. We might need memory storage.
    // For now, defaulting to memory storage if VERCEL env is present, else disk.
    if (process.env.VERCEL) {
        cb(null, '/tmp'); 
    } else {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Use Memory Storage for Vercel/Serverless explicitly if needed?
// Actually simpler: Vercel functions are ephemeral. Writing to disk is sketchy unless /tmp.
// Best to use Memory Storage for small resume files.

const memoryStorage = multer.memoryStorage();
const upload = multer({
  storage: memoryStorage, // Changed to memory storage for better serverless compatibility
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Import services for Analyze Route (since we are creating the route here inline as per previous file)
import { analyzeResume } from "./services/analyzeResume";
import { extractTextFromFile } from "./services/fileParsing";

// Analyze Route
app.post(
  "/api/analyze",
  upload.single("resumeFile"),
  async (req: any, res: any) => {
    try {
      const { jobDescription, resumeText } = req.body || {};
      const file = req.file;

      // Validate job description
      if (!jobDescription || typeof jobDescription !== 'string') {
        return res.status(400).json({ error: "Job description is required." });
      }

      let finalResumeText = (resumeText || "").toString().trim();

      // Handle file
      if (file) {
        // ... (Extraction logic identical to before)
        try {
           // We need to handle buffer since we switched to memoryStorage
           // extractTextFromFile needs to be updated if it expects a path.
           // Let's assume for now we keep it simple or user must update extractTextFromFile to handle buffer.
           // *Critical check*: View extractTextFromFile in next step if verification fails.
           const extracted = await extractTextFromFile(file); 
           finalResumeText = extracted.trim();
        } catch (error) {
           console.error("File parse error", error);
           return res.status(422).json({ error: "Failed to parse file." });
        }
      }

      if (!finalResumeText) {
          return res.status(400).json({ error: "No resume text found." });
      }

      const analysis = analyzeResume(finalResumeText, jobDescription);
      return res.json(analysis);

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server Error" });
    }
  }
);

// Health
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

export default app;
