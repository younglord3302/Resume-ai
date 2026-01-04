import React, { useState } from "react";
import axios from "axios";
import { Layout, FileUpload, AnalysisResult, Button } from "../components";
import { FileText, Sparkles, AlertCircle } from "lucide-react";

type AnalysisResultType = {
  atsScore: number;
  scoresBreakdown: {
    keyword: number;
    section: number;
    format: number;
    readability: number;
  };
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const AnalyzerPage: React.FC = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [useFile, setUseFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    resume?: string;
    jobDescription?: string;
  }>({});

  const validateInputs = () => {
    const errors: { resume?: string; jobDescription?: string } = {};

    if (!jobDescription.trim()) {
      errors.jobDescription = "Job description is required";
    } else if (jobDescription.trim().length < 50) {
      errors.jobDescription = "Job description should be at least 50 characters";
    }

    if (!useFile && !resumeText.trim()) {
      errors.resume = "Resume text is required";
    } else if (!useFile && resumeText.trim().length < 100) {
      errors.resume = "Resume text should be at least 100 characters";
    }

    if (useFile && !resumeFile) {
      errors.resume = "Please select a resume file";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAnalyze = async () => {
    if (!validateInputs()) {
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    // Smooth scroll to loading state if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      let response;

      if (useFile && resumeFile) {
        const formData = new FormData();
        formData.append("jobDescription", jobDescription);
        formData.append("resumeFile", resumeFile);

        response = await axios.post(
          `${API_BASE_URL}/api/analyze`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 30000,
          }
        );
      } else {
        response = await axios.post(`${API_BASE_URL}/api/analyze`, {
          resumeText,
          jobDescription,
        }, {
          timeout: 30000,
        });
      }

      setResult(response.data);
    } catch (err: any) {
      console.error("Analysis error:", err);

      let errorMessage = "Something went wrong while analyzing. Please try again.";

      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          errorMessage = "Request timed out. Please check your connection and try again.";
        } else if (err.response?.status === 413) {
          errorMessage = "File is too large. Please upload a file smaller than 5MB.";
        } else if (err.response?.status === 415) {
          errorMessage = "Unsupported file format. Please use PDF, DOCX, or TXT files.";
        } else if (err.response?.status === 429) {
          errorMessage = "Too many requests. Please wait a moment and try again.";
        } else if (err.response?.data?.error) {
          errorMessage = err.response.data.error;
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            Analysis Dashboard
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Upload your resume and the job description to get AI-powered insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Resume Input Column */}
          <div className="space-y-4 animate-fade-in-left">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xl font-semibold flex items-center gap-2">
                <FileText className="text-primary" /> Resume
              </label>
              <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/5">
                <button
                  onClick={() => { setUseFile(false); setValidationErrors({}); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    !useFile ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Paste Text
                </button>
                <button
                  onClick={() => { setUseFile(true); setValidationErrors({}); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    useFile ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Upload File
                </button>
              </div>
            </div>

            <div className="bg-slate-900/30 backdrop-blur-sm p-6 rounded-2xl border border-white/5 shadow-inner">
               {useFile ? (
                 <FileUpload 
                    onFileSelect={(file) => setResumeFile(file)} 
                    selectedFile={resumeFile}
                    error={validationErrors.resume}
                 />
               ) : (
                 <div className="relative">
                    <textarea
                      className={`w-full h-80 bg-slate-950/50 border rounded-xl p-4 text-sm font-mono leading-relaxed outline-none focus:ring-2 transition-all resize-none
                        ${validationErrors.resume 
                          ? 'border-red-500/50 focus:ring-red-500/50' 
                          : 'border-white/10 focus:ring-primary/50 focus:border-primary/50'
                        }
                      `}
                      placeholder="Paste your resume content here..."
                      value={resumeText}
                      onChange={(e) => {
                        setResumeText(e.target.value);
                        if (validationErrors.resume) setValidationErrors({...validationErrors, resume: undefined});
                      }}
                    />
                    {validationErrors.resume && (
                      <p className="absolute bottom-4 left-4 text-red-400 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {validationErrors.resume}
                      </p>
                    )}
                 </div>
               )}
            </div>
          </div>

          {/* JD Input Column */}
          <div className="space-y-4 animate-fade-in-right">
             <label className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Sparkles className="text-accent" /> Job Description
             </label>
             
             <div className="bg-slate-900/30 backdrop-blur-sm p-6 rounded-2xl border border-white/5 shadow-inner h-full">
                <div className="relative h-full">
                  <textarea
                    className={`w-full h-80 lg:h-[calc(100%-2rem)] bg-slate-950/50 border rounded-xl p-4 text-sm font-mono leading-relaxed outline-none focus:ring-2 transition-all resize-none
                      ${validationErrors.jobDescription 
                        ? 'border-red-500/50 focus:ring-red-500/50' 
                        : 'border-white/10 focus:ring-accent/50 focus:border-accent/50'
                      }
                    `}
                    placeholder="Paste the job requirements here..."
                    value={jobDescription}
                    onChange={(e) => {
                      setJobDescription(e.target.value);
                      if (validationErrors.jobDescription) setValidationErrors({...validationErrors, jobDescription: undefined});
                    }}
                  />
                  {validationErrors.jobDescription && (
                    <p className="absolute bottom-4 left-4 text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {validationErrors.jobDescription}
                    </p>
                  )}
                </div>
             </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-6 mb-16">
          <Button 
            size="lg" 
            onClick={handleAnalyze} 
            isLoading={loading}
            className="w-full sm:w-auto px-12 shadow-primary/20 shadow-xl"
            rightIcon={!loading && <Sparkles className="w-5 h-5" />}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </Button>

          {error && (
            <div className="flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Results Area */}
        <div id="results">
           {result && <AnalysisResult result={result} />}
        </div>
      </div>
    </Layout>
  );
};

export default AnalyzerPage;

