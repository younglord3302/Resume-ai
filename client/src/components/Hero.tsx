import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, Sparkles, Upload } from 'lucide-react';
import Button from './Button';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-20 pb-32">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-slate-300">AI-Powered Resume Optimization</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
          Craft the Perfect <br />
          <span className="text-gradient">Resume for ATS</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Unlock your career potential with our advanced AI analyzer. Get instant scoring, 
          skill gap analysis, and tailored suggestions to beat the bots and get hired.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/analyze">
            <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />} className="shadow-primary/50 shadow-2xl">
              Start Analyzing for Free
            </Button>
          </Link>
          <Button variant="outline" size="lg" leftIcon={<FileCheck className="w-5 h-5" />}>
            View Sample Report
          </Button>
        </div>

        {/* Floating cards for visual interest */}
        <div className="hidden lg:block absolute top-1/2 -left-12 -rotate-6 glass p-4 rounded-xl shadow-2xl animate-float">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg"><FileCheck className="w-5 h-5 text-green-400" /></div>
            <div>
              <div className="text-xs text-slate-400">ATS Score</div>
              <div className="text-lg font-bold text-green-400">92/100</div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute top-1/3 -right-8 rotate-6 glass p-4 rounded-xl shadow-2xl animate-float" style={{ animationDelay: '2s' }}>
           <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg"><Upload className="w-5 h-5 text-accent" /></div>
            <div>
              <div className="text-xs text-slate-400">File Parsed</div>
              <div className="text-sm font-bold text-white">Resume_v2.pdf</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
