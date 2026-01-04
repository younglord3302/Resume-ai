import React from 'react';
import { CheckCircle2, AlertTriangle, Lightbulb, Share2, Download } from 'lucide-react';
import ScoreChart from './ScoreChart';
import Button from './Button';

interface AnalysisResultProps {
  result: {
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
}

const COLORS = {
  primary: "#6366f1",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444"
};

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return COLORS.success;
    if (score >= 60) return COLORS.warning;
    return COLORS.error;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };


  const radarData = [
    { subject: 'Keywords', score: result.scoresBreakdown.keyword },
    { subject: 'Sections', score: result.scoresBreakdown.section },
    { subject: 'Format', score: result.scoresBreakdown.format },
    { subject: 'Readability', score: result.scoresBreakdown.readability }
  ];

  const skillsData = [
    { name: 'Matched', value: result.matchedSkills.length, fill: COLORS.success },
    { name: 'Missing', value: result.missingSkills.length, fill: COLORS.error }
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Top Section: Score & Radial */}
      <section className="bg-linear-to-br from-slate-900 via-slate-900 to-primary/10 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="text-center lg:text-left space-y-4">
            <h2 className="text-3xl font-bold">Analysis Complete</h2>
            <p className="text-slate-400">Here's how your resume stacks up against the job description.</p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-6">
              <Button variant="outline" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>Share</Button>
              <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>Export PDF</Button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-slate-950/50 rounded-2xl border border-white/5 backdrop-blur-sm">
             <div className="relative mb-2">
                <div className="text-6xl font-black tracking-tighter" style={{ color: getScoreColor(result.atsScore) }}>
                  {result.atsScore}
                </div>
                <div className="absolute -top-4 -right-6 text-2xl animate-bounce">
                  {result.atsScore >= 80 ? '🚀' : result.atsScore >= 60 ? '👍' : '⚠️'}
                </div>
             </div>
             <div className="text-lg font-medium text-slate-300 mb-4">{getScoreLabel(result.atsScore)}</div>
             <div className="w-full max-w-xs h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                  style={{ width: `${result.atsScore}%`, backgroundColor: getScoreColor(result.atsScore) }}
                />
             </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Charts Column */}
        <div className="space-y-6">
           <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Score Breakdown
              </h3>
              <ScoreChart type="radar" data={radarData} />
           </div>

           <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-emerald-500 rounded-full" />
                Matched vs Missing
              </h3>
              <div className="h-48">
                 <ScoreChart type="pie" data={skillsData} />
              </div>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-300">Matched ({result.matchedSkills.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-slate-300">Missing ({result.missingSkills.length})</span>
                </div>
              </div>
           </div>
        </div>

        {/* Detailed Skills & Suggestions Column (Spans 2) */}
        <div className="xl:col-span-2 space-y-6">
           
           {/* Skills */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl border-t-4 border-t-emerald-500/50">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Matched Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills.length > 0 ? result.matchedSkills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm border border-emerald-500/20">
                      {skill}
                    </span>
                  )) : <p className="text-slate-500 text-sm italic">No skills matched yet.</p>}
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border-t-4 border-t-amber-500/50">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.length > 0 ? result.missingSkills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-sm border border-amber-500/20">
                      {skill}
                    </span>
                  )) : <p className="text-slate-500 text-sm italic">Great job! No major skills missing.</p>}
                </div>
              </div>
           </div>

           {/* Suggestions */}
           <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                AI Recommendations
              </h3>
              <div className="space-y-3">
                {result.suggestions.length > 0 ? result.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                    <span className="text-primary font-bold text-lg opacity-50 select-none">#{idx + 1}</span>
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base">{suggestion}</p>
                  </div>
                )) : (
                  <p className="text-slate-500 italic">No suggestions available.</p>
                )}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default AnalysisResult;
