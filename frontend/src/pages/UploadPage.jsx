import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import HighlightedText from "../components/HighlightedText";
import MetricsDisplay from "../components/MetricsDisplay";
import ResultGauge from "../components/ResultGauge";

const UploadPage = () => {
  const [results, setResults] = useState([]);
  const [files, setFiles] = useState([]);

  const hasResults = results.length > 0;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full h-full relative">
        {/* Header - Always visible */}
        <nav className="bg-white shadow-sm border-b border-teal-700 z-30 shrink-0">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-teal-700 dark:text-teal-400 tracking-tight">
              ReadTrack
            </h1>
            {/* Simple Settings/Profile Icon */}
            <div className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
          </div>
        </nav>

        {/* 1. WELCOME MESSAGE (Fades out when results appear) */}
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500 ${hasResults ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Shifted up slightly so it doesn't overlap the centered input */}
          <div className="-mt-32 text-center space-y-4">
            <div className="bg-teal-100 w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-teal-600 mb-6 shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Ready to Analyze?</h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Upload a document or paste text to get instant readability insights using our AI model.
            </p>
          </div>
        </div>

        {/* 2. RESULTS CONTAINER (Fades in) */}
        <div 
          className={`flex-1 overflow-y-auto p-6 pb-48 space-y-6 scroll-smooth transition-opacity duration-700 ${hasResults ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
           {results.map((result, index) => (
              <div key={index} className="max-w-6xl mx-auto animate-fade-in">
                <div className="flex flex-col lg:flex-row gap-8 relative">
                  {/* Left Column: Highlighted Text */}
                  <div className="flex-1 w-full min-w-0">
                    <HighlightedText
                      text={result.data.text}
                      highlights={
                        result.data.result?.highlights || {
                          difficult_words: [],
                          long_sentence_indices: [],
                        }
                      }
                      file={null}
                    />
                  </div>

                  {/* Right Column: Sticky Metrics */}
                  <div className="w-full lg:w-[380px] shrink-0">
                    <div className="sticky top-0 space-y-6">
                      <ResultGauge
                        classification={result.data?.result?.classification}
                      />
                      <MetricsDisplay
                        metrics={result.data?.result}
                        rawStats={result.data?.result}
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {index < results.length - 1 && (
                  <hr className="border-gray-300 dark:border-gray-700 my-12" />
                )}
              </div>
            ))}
        </div>

        {/* 3. INPUT CONTAINER (Animated Transition) */}
        {/* - absolute: positions it relative to the main content area
            - transition-all duration-700 ease-in-out: handles the smooth glide
            - State 1 (No Results): top-1/2 (center), max-w-2xl (narrow)
            - State 2 (Results): bottom-0 (bottom), max-w-5xl (wide)
        */}
        <div 
          className={`
            absolute left-0 right-0 p-4 z-20 
            transition-all duration-700 ease-in-out
            mx-auto
            ${hasResults 
              ? 'bottom-0 translate-y-0 max-w-5xl bg-gradient-to-t from-white via-white to-transparent' 
              : 'top-3/4 -translate-y-1/2 max-w-3xl'
            }
          `}
        >
          <div className={`
             bg-white border border-teal-700 rounded-t-2xl p-4
             ${hasResults ? 'shadow-xl shadow-teal-900/10' : 'rounded-2xl shadow-md'}
          `}>
             <Input setResults={setResults} files={files} setFiles={setFiles} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default UploadPage; 