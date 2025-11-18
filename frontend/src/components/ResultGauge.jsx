import React from 'react';

/**
 * 1. ResultGauge: Shows the final classification
 */
export default function ResultGauge({ classification }) {
  const gaugeColor = {
    "Easy": "bg-green-100 text-green-800 border-green-200",
    "Moderate": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Difficult": "bg-red-100 text-red-800 border-red-200",
    "N/A": "bg-slate-100 text-slate-800 border-slate-200"
  };

  // Default to N/A color if classification is unexpected
  const colorClass = gaugeColor[classification] || gaugeColor["N/A"];

  return (
    <div className="p-4 rounded-lg bg-white shadow-sm border">
      <h3 className="text-sm font-medium text-slate-500 mb-2">Readability Classification</h3>
      <div className={`p-4 rounded-md text-center border ${colorClass}`}>
        <span className="text-3xl font-bold">{classification || 'N/A'}</span>
      </div>
    </div>
  );
}