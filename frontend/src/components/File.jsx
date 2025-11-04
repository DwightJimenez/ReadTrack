import React from "react";

const File = ({ name = "unknown.pdf" }) => {
  const parts = name.split(".");
  const ext = parts.length > 1 ? "." + parts.pop() : "";
  const base = parts.join(".");

  return (
    <div className="rounded-xl min-w-40 h-10 border-2 text-teal-dark border-teal-dark flex items-center justify-between cursor-pointer bg-white dark:bg-gray-900 dark:border-gray-700 px-1">
      {/* filename area */}
      <div className="flex-1 flex items-center min-w-0">
        <span className="truncate block">{base}</span>
        <span className="flex-shrink-0">{ext}</span>
      </div>

      {/* close icon */}
      <button> 
        <div className="dark:text-gray-200 ml-2 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path 
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default File;
