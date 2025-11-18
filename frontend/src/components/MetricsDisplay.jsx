import React from 'react';
import { BarChart } from 'lucide-react';

/**
 * 4. MetricsDisplay: Shows the "Simulated Metrics"
 */
export default function MetricsDisplay({ metrics }) {
  if (!metrics) {
    return null; // Don't render if no metrics
  }

  return (
    <div className="p-4 rounded-lg bg-white shadow-sm border">
      <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center">
        <BarChart className="w-4 h-4 mr-2" />
        Simulated Metrics
      </h3>
      <ul className="divide-y divide-slate-100">
        <li className="flex justify-between items-center py-2">
          <span className="text-slate-600">Total Words</span>
          <span className="font-medium text-slate-800">{metrics.total_words}</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span className="text-slate-600">Average Sentence Length</span>
          <span className="font-medium text-slate-800">{metrics.avg_sentence_length} words</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span className="text-slate-600">Difficult Word Ratio</span>
          <span className="font-medium text-slate-800">{ (metrics.difficult_word_ratio * 100).toFixed(1) }%</span>
        </li>
      </ul>
    </div>
  );
}