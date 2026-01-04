# AI Resume Analyzer

An intelligent resume analysis tool that uses AI to score resumes against job descriptions, identifying key strengths and missing keywords to help users improve their ATS (Applicant Tracking System) ranking.

## Features
- **AI-Powered Analysis**: Scores resumes based on keyword matching, readability, and section completeness.
- **ATS Score**: detailed breakdown of match percentage.
- **Keyword Gap Analysis**: Identifies missing critical skills/keywords from the job description.
- **Modern UI**: Built with React, Tailwind CSS v4, and Framer Motion for a premium glassmorphism aesthetic.
- **Authentication**: User accounts to save progress (JWT-based).
- **Admin Dashboard**: Analytics for platform usage.

## Tech Stack
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Lucide Icons, Axios.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, PDF/Docx Parsing.
- **Deployment**: Vercel (Frontend & Backend).

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/younglord3302/Resume-ai.git
    cd Resume-ai
    ```

2.  **Install dependencies**:
    ```bash
    # Client
    cd client
    npm install

    # Server
    cd ../server
    npm install
    ```

3.  **Environment Setup**:
    -   **Server**: Create `server/.env` based on `server/.env.example`.
        ```env
        MONGO_URI=mongodb://localhost:27017/ai-resume-analyzer
        JWT_SECRET=your_secret_key
        ```
    -   **Client**: Create `client/.env` based on `client/.env.example`.
        ```env
        VITE_API_BASE_URL=http://localhost:5000
        ```

4.  **Run Locally**:
    Open two terminals:
    -   Terminal 1 (Server): `cd server && npm run dev`
    -   Terminal 2 (Client): `cd client && npm run dev`

---

## Deployment (Vercel)

The project is structured to be deployed easily on Vercel as two separate projects (or a monorepo).

### 1. Deploy Backend (Server)
1.  Push your code to GitHub.
2.  Go to Vercel Dashboard -> **Add New Project**.
3.  Import the `Resume-ai` repository.
4.  **Important**: In "Project Settings":
    -   **Root Directory**: Edit and select `server`.
5.  **Environment Variables**: Add `MONGO_URI` (use MongoDB Atlas) and `JWT_SECRET`.
6.  Deploy. Vercel will detect the `api/index.ts` and deploy it as a Serverless Function.
7.  **Copy the assigned Domain** (e.g., `https://resume-ai-server.vercel.app`).

### 2. Deploy Frontend (Client)
1.  Go to Vercel Dashboard -> **Add New Project**.
2.  Import the same `Resume-ai` repository.
3.  **Important**: In "Project Settings":
    -   **Root Directory**: Edit and select `client`.
    -   **Framework Preset**: Vite (should auto-detect).
4.  **Environment Variables**:
    -   `VITE_API_BASE_URL`: Paste the backend URL from step 1 (e.g., `https://resume-ai-server.vercel.app`).
5.  Deploy.

Done! Your AI Resume Analyzer is now live.
