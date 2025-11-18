import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

/**
 * 2. SuggestionsList: Shows the AI-generated tips
 */
export default function SuggestionsList({ suggestions = [] }) {
  return (
    <div className="p-4 rounded-lg bg-white shadow-sm border">
      <h3 className="text-sm font-medium text-slate-500 mb-3">AI Suggestions</h3>
      <ul className="space-y-3">
        {suggestions.map((tip, index) => {
          // Check if the tip is a "good news" message
          const isGood = tip.includes("well-suited");
          return (
            <li key={index} className="flex items-start">
              {isGood ? (
                <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5" />
              ) : (
                <AlertTriangle className="flex-shrink-0 w-5 h-5 text-yellow-500 mt-0.5" />
              )}
              <span className="ml-2 text-slate-700">{tip}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}