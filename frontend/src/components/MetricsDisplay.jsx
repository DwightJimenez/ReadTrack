import React from "react";
import { BarChart } from "lucide-react";

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
          <span className="text-slate-600">Fixation</span>
          <span className="font-medium text-slate-800">{(metrics.simulated_metrics.fixation_index * 100).toFixed(1)}%</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span className="text-slate-600">Regression  Index</span>
          <span className="font-medium text-slate-800">
            {(metrics.simulated_metrics.regression_index* 100).toFixed(1)}%
          </span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span className="text-slate-600">Estimated Reading Time</span>
          <span className="font-medium text-slate-800">
            {(metrics.simulated_metrics.est_reading_time_min)} min
          </span>
        </li>
      </ul>
      <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center">
        <BarChart className="w-4 h-4 mr-2" />
        Raw Status
      </h3>
      <ul className="divide-y divide-slate-100">
        <li className="flex justify-between items-center py-2">
          <span className="text-slate-600">Total Words</span>
          <span className="font-medium text-slate-800">{metrics.raw_stats.word_count}</span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span className="text-slate-600">Average Sentence Length</span>
          <span className="font-medium text-slate-800">
            {metrics.raw_stats.avg_len} words
          </span>
        </li>
        <li className="flex justify-between items-center py-2">
          <span className="text-slate-600">Difficult Word Ratio</span>
          <span className="font-medium text-slate-800">
            {(metrics.raw_stats.complexity_ratio * 100).toFixed(1)}%
          </span>
        </li>
      </ul>
    </div>
  );
}
