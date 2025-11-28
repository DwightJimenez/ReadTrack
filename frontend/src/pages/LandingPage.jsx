import { Link } from "react-router-dom";
// import React from "react"; 

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* 1. NAVBAR */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-teal-700 tracking-tight">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            ReadTrack
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {/* <a href="#objectives" className="hover:text-teal-600 transition">
              Objectives
            </a>
            <a href="#features" className="hover:text-teal-600 transition">
              Methodology
            </a> */}
            <Link to="/uploadpage">
              <button className="cursor-pointer bg-teal-700 hover:bg-teal-800 text-white px-5 py-2.5 rounded-full transition-all shadow-lg shadow-teal-700/20">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      {/* Centered and Thesis-Aligned */}
      <header className="min-h-screen flex items-center pt-16 px-6 bg-gradient-to-b from-teal-50 to-white relative overflow-hidden">
        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/50 text-teal-800 text-xs font-bold uppercase tracking-wide border border-teal-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              PGCHS Grade 7 Assessment Tool
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              AI-Driven <span className="text-teal-600">Readability Assessment</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Enhancing literacy outcomes through technology. ReadTrack uses 
              <strong> Natural Language Processing (NLP)</strong> to classify English learning materials as 
              <span className="font-semibold text-teal-700"> Easy, Moderate, or Difficult</span>.
            </p>
            <div className="flex gap-4">
              <Link to="/uploadpage">
                <button className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-4 rounded-xl font-semibold transition-all shadow-xl shadow-teal-600/20 hover:-translate-y-1">
                  Evaluate Material
                </button>
              </Link>
            </div>
            <div className="text-sm text-slate-500 pt-2">
              Aligned with <strong>ISO/IEC 25010</strong> Quality Standards.
            </div>
          </div>

          {/* Right Image / Abstract Representation */}
          <div className="relative z-10 w-full max-w-lg mx-auto lg:max-w-none">
            {/* Background Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-2xl blur opacity-30 animate-pulse"></div>
            
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
              {/* Browser Header Mockup */}
              <div className="bg-slate-50 border-b p-3 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              {/* Content Mockup */}
              <div className="p-6 grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-3">
                  <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded w-full"></div>
                  <div className="h-4 bg-teal-100 rounded w-full border border-teal-200 shadow-sm flex items-center px-2">
                    <span className="text-[10px] text-teal-800 font-mono">syntactic_depth: 4.2</span>
                  </div> 
                  <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-100 rounded w-full"></div>
                </div>
                <div className="col-span-1 space-y-3">
                  <div className="h-24 bg-teal-50 rounded-full border-4 border-teal-500 flex flex-col items-center justify-center text-teal-700 shadow-inner">
                    <span className="text-2xl font-bold">Mod</span>
                    <span className="text-xs uppercase">Level</span>
                  </div>
                  <div className="h-20 bg-slate-50 rounded border border-slate-100 flex items-center justify-center p-2 text-center">
                    <span className="text-[10px] text-slate-400">Simulated Metrics Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. FEATURES SECTION (Thesis Aligned) */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why use ReadTrack?
            </h2>
            <p className="text-slate-600">
              A teacher-centered solution integrating AI, NLP, and ML to assess reading materials efficiently for Polangui General Comprehensive High School.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Classification */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Automated Classification</h3>
              <p className="text-slate-600">
                Classifies passages as <strong>Easy, Moderate, or Difficult</strong> to ensure materials match students' cognitive capacities.
              </p>
            </div>

            {/* Feature 2: Simulated Metrics */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Simulated Reading Metrics</h3>
              <p className="text-slate-600">
                Uses AI to estimate reading behaviors—such as focus and reading time—without the need for physical eye-tracking devices.
              </p>
            </div>

            {/* Feature 3: Linguistic Analysis */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Linguistic Analysis</h3>
              <p className="text-slate-600">
                Extracts features like sentence length, word frequency, and syntactic complexity using NLP to determine text difficulty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl text-white mb-4 md:mb-0">
            ReadTrack
          </div>
          <div className="text-sm text-center md:text-right">
            <p>© 2025 ReadTrack. All rights reserved.</p>
            <p className="text-xs text-slate-600 mt-1">
              Developed by Jimenez, Balmedina, & Labini.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;