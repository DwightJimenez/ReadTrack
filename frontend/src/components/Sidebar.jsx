import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  // DUMMY DATA FOR HISTORY
  const dummyHistory = [
    { id: 1, title: "Thesis_Chapter_1.pdf", date: "Just now" },
    { id: 2, title: "Research_Notes_2025.txt", date: "2 hours ago" },
    { id: 3, title: "Biology_Abstract_Final.docx", date: "Yesterday" },
    { id: 4, title: "Meeting_Minutes_Nov.pdf", date: "Nov 24, 2025" },
    { id: 5, title: "Code_Snippet_React.js", date: "Nov 22, 2025" },
    { id: 6, title: "Poem_Draft_Haiku.txt", date: "Nov 20, 2025" },
    { id: 7, title: "Financial_Report_Q3.xlsx", date: "Nov 18, 2025" },
  ];

  return (
    <aside
      className={`
        flex flex-col h-screen py-4 
        text-teal-900 bg-teal-50 border-r border-teal-200
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64 px-5" : "w-20 px-2"} 
      `}
    >
      {/* 1. TOP: Toggle Button */}
      <div className={`pb-6 flex ${isOpen ? "justify-start" : "justify-center"}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-teal-200/50 text-teal-700 transition-colors focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* 2. MIDDLE: History List (Scrollable) */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
        
        {/* Section Label - Only visible when open */}
        <div className={`text-xs font-bold text-teal-600 uppercase tracking-wider mb-2 transition-opacity duration-200 ${isOpen ? "opacity-100 px-2" : "opacity-0 hidden"}`}>
          Recent Analysis
        </div>

        {dummyHistory.map((item) => (
          <div
            key={item.id}
            className={`
              flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-teal-100/60 transition-colors
              ${isOpen ? "justify-start" : "justify-center"}
            `}
          >
            {/* Icon (Always visible) */}
            <div className="text-teal-600 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>

            {/* Text Details (Hidden when closed) */}
            {isOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-teal-900 truncate w-36">
                  {item.title}
                </p>
                <p className="text-xs text-teal-600/70 truncate">
                  {item.date}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Separator Line */}
      <div className="my-2 border-t border-teal-200/60 mx-2"></div>

      {/* 3. BOTTOM: User Profile */}
      {/* <div
        className={`flex items-center gap-3 mt-auto p-2 rounded-xl hover:bg-teal-100/40 transition-all cursor-pointer ${
          isOpen ? "justify-start" : "justify-center"
        }`}
      >
        <div className="shrink-0 text-teal-800 bg-teal-200 rounded-full p-1">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
            </svg>
        </div>
        
     
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? "w-32 opacity-100" : "w-0 opacity-0"}
          `}
        >
          <p className="text-sm font-semibold text-teal-900 whitespace-nowrap">User Name</p>
          <p className="text-xs text-teal-600 whitespace-nowrap">Free Plan</p>
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;