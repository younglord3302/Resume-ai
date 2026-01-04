import React from "react";
import { Link } from "react-router-dom";
import { Layout, Hero, FeatureCard } from "../components";
import { BarChart3, Target, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-mono">Why Choose Us?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our advanced AI analyzes your resume against industry standards and job descriptions 
              to give you the competitive edge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <FeatureCard 
              icon={<BarChart3 className="w-8 h-8" />}
              title="ATS Scoring"
              description="Get a detailed breakdown of how well your resume parses through Applicant Tracking Systems."
              delay={0}
            />
            <FeatureCard 
              icon={<Target className="w-8 h-8" />}
              title="Skill Gap Analysis"
              description="Instantly identify missing keywords and skills that recruiters are looking for."
              delay={100}
            />
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8" />}
              title="Smart Suggestions"
              description="Receive actionable, AI-powered recommendations to improve clarity, impact, and formatting."
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Trust/Social Proof Section */}
      <section className="py-20 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 mb-8 border border-emerald-500/20">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">Verified by Industry Experts</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-12">Optimize for Success</h2>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Logos - Replace with real ones if available, avoiding simple text for now */}
             <div className="text-2xl font-black text-slate-300 flex items-center gap-2"><div className="w-8 h-8 bg-slate-300 rounded-lg"></div> TechCorp</div>
             <div className="text-2xl font-black text-slate-300 flex items-center gap-2"><div className="w-8 h-8 bg-slate-300 rounded-full"></div> InnovateLabs</div>
             <div className="text-2xl font-black text-slate-300 flex items-center gap-2"><div className="w-8 h-8 bg-slate-300 rotate-45"></div> FutureWorks</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-30" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to land your dream job?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their callback rates with our AI analyzer.
          </p>
          <Link 
            to="/analyze" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;

