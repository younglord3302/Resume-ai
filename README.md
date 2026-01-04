# AI Resume Analyzer 🧠📄

An AI-assisted **ATS-style resume analyzer** built with a modern full-stack stack.

Upload your resume (PDF/DOCX/TXT) and paste a job description to get:

- An **ATS-style score** (0–100)
- **Skill match vs job description**
- **Skill gaps** (missing skills)
- **Score breakdown** (keywords, sections, format, readability)
- **Actionable suggestions** to improve your resume

Perfect for job seekers who want to tailor their resume to specific roles, and a great portfolio project to showcase full-stack + ATS-style logic skills.

---

## ✨ Features

### Core Functionality

- ✅ **Resume Upload**
  - Supports **PDF**, **DOCX**, **TXT**
  - Uses `pdf-parse` and `mammoth` to extract text
  - 5MB file size limit with clear error messages

- ✅ **Text Input**
  - Paste raw resume text if you don't want to upload files
  - Works side-by-side with file upload (shared `/api/analyze` endpoint)

- ✅ **Job Description Input**
  - Paste full job descriptions from job portals
  - Engine compares resume vs JD for alignment

- ✅ **ATS-Style Scoring**
  - **Total score (0–100)** with weighted components:
    - 50% – **Keyword match**
    - 20% – **Section completeness**
    - 15% – **Formatting**
    - 15% – **Readability**

### Analysis Engine

- 🔍 **Keyword Analysis**
  - Extracts skills from JD & resume using a skills dictionary
  - Computes coverage (% of JD skills present in resume)
  - Returns **matched skills** and **missing skills**

- 🧩 **Section Detection**
  - Detects presence of:
    - Summary / Profile
    - Skills
    - Experience
    - Projects
    - Education
  - Scores completeness and suggests missing sections

- 🧱 **Format Analysis**
  - Estimates:
    - Character & word counts
    - Bullet count
    - Possible table/complex layout usage
  - Penalizes overly short/long resumes and ATS-unfriendly patterns

- 📚 **Readability Scoring**
  - Counts sentences, words, and average sentence length
  - Detects **action verbs** (Led, Built, Implemented, Improved, etc.)
  - Scores clarity and impact-focused writing

- 💡 **Suggestion Engine**
  - Generates **context-aware suggestions** based on:
    - Missing skills
    - Missing sections
    - Length & bullets
    - Readability & action verbs
  - Avoids generic "improve resume" advice and suggests specific fixes

### UI / UX

- 🎛️ **Score Breakdown Visualization**
  - Radial bar chart showing:
    - Keyword score
    - Sections score
    - Format score
    - Readability score
  - Built with `recharts`

- 📊 **Skills Overview**
  - Colored chips for:
    - ✅ Matched skills
    - ⚠️ Missing skills

- 🧾 **Suggestions Panel**
  - Scrollable list of concrete improvement tips

- 📱 **Responsive Layout**
  - Clean, modern design with Tailwind CSS
  - Works on mobile, tablet, and desktop

---

## 🧱 Tech Stack

**Frontend**
- React (Vite + TypeScript)
- Tailwind CSS
- React Router
- Axios
- Recharts (data visualization)

**Backend**
- Node.js + Express
- TypeScript
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- mammoth (DOCX text extraction)
- Helmet, CORS, dotenv

---

## 🏗️ Project Structure

```bash
ai-resume-analyzer/
  client/        # React frontend (Vite + TS)
  server/        # Node + Express backend (TS)
  shared/        # (optional) shared types in the future
  README.md
```

**Backend (server)**

```bash
server/
  src/
    index.ts                 # Express app entrypoint
    types/
      analysis.ts            # Shared analysis-related TS types
    services/
      analyzeResume.ts       # Orchestrator, combines all services
      keywordScore.ts        # JD/resume skill extraction & scoring
      sectionScore.ts        # Section detection & scoring
      formatScore.ts         # Format & length analysis
      readabilityScore.ts    # Readability + action verbs
      suggestionEngine.ts    # Suggestion generator
      fileParsing.ts         # PDF/DOCX/TXT text extraction
```

**Frontend (client)**

```bash
client/
  src/
    main.tsx                 # Entry, Router setup
    App.tsx                  # Layout & routes
    pages/
      LandingPage.tsx        # Marketing/intro page
      AnalyzerPage.tsx       # Main analyzer UI (file upload + chart)
```

---

## 🚀 Getting Started (Local)

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` in `server/`:

```env
PORT=5000
```

Run in development:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

Test:

```text
GET http://localhost:5000/api/health
```

You should see a small JSON health response.

### 3. Frontend Setup

In another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🧪 Usage

1. Open `http://localhost:5173`
2. On the landing page, click **"Get Started"** → `/analyze`
3. Choose **Paste Text** or **Upload File** for your resume:

   * Paste your resume text **or**
   * Upload a `PDF`, `DOCX`, or `TXT` file
4. Paste a **full job description** in the JD input on the right
5. Click **"Analyze Resume"**
6. Review:

   * Total ATS Score
   * Score breakdown chart
   * Matched & missing skills
   * Suggestions to improve your resume

---

## 🌐 Deployment

You can deploy this with:

* **Backend** → Render / Railway / any Node hosting
* **Frontend** → Netlify / Vercel / GitHub Pages

### Backend (Render example)

1. Push code to GitHub
2. On Render:

   * New **Web Service**
   * Root directory: `server`
   * Build command: `npm install && npm run build`
   * Start command: `npm start`
   * Environment variable: `PORT=10000` (or leave default)
3. Deploy and note the backend URL (e.g.):

```text
https://ai-resume-analyzer-backend.onrender.com
```

### Frontend (Netlify example)

1. In `client/`, create `.env`:

```env
VITE_API_BASE_URL=https://ai-resume-analyzer-backend.onrender.com
```

2. Build:

```bash
cd client
npm run build
```

3. On Netlify:

   * New Site → From Git
   * Base directory: `client`
   * Build command: `npm run build`
   * Publish directory: `dist`
   * Environment variable: `VITE_API_BASE_URL` → your backend URL

4. Deploy and open the Netlify URL.

---

## 🛤️ Roadmap / Future Enhancements

* 🔑 Authentication (save multiple resumes & analyses per user)
* 🧠 LLM integration for:

  * Bullet point rewriting
  * Tailored summary generation
  * Deeper semantic match scoring
* 📊 Resume version comparison
* ⬇️ Export as PDF / shareable report
* 🌐 Multi-language support

---

## 📸 Screenshots

> *Add screenshots here after deployment, for example:*

* `screenshots/landing.png`
* `screenshots/analyzer.png`
* `screenshots/score-breakdown.png`

---

## 📜 License

MIT License – feel free to use this project as inspiration or starter code.
