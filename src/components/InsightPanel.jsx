import React from 'react';
import { Zap, TrendingUp, Flame, Award, Lightbulb } from 'lucide-react';

const InsightPanel = ({ score, insights }) => {
  if (!score) return null;

  const getBadgeColor = (type) => {
    switch (type) {
      case 'strong': return 'from-orange-500 to-red-600 shadow-orange-200';
      case 'active': return 'from-blue-500 to-indigo-600 shadow-blue-200';
      default: return 'from-slate-400 to-slate-600 shadow-slate-200';
    }
  };

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'strong': return <Flame className="w-6 h-6" />;
      case 'active': return <Zap className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="glass-card p-8 h-full bg-gradient-to-br from-white to-slate-50">
      <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
        <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
        Intelligence Analysis
      </h3>

      <div className="flex flex-col items-center mb-10">
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getBadgeColor(score.type)} flex items-center justify-center text-white shadow-xl mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300`}>
          {getBadgeIcon(score.type)}
        </div>
        <div className="text-center">
          <h4 className="text-2xl font-black text-slate-900 mb-1">{score.label}</h4>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Developer Score</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-black rounded-md">{score.value}/100</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" /> Smart Insights
        </p>
        {insights.map((insight, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="mt-1">
              <div className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
            </div>
            <p className="text-slate-700 text-sm font-medium leading-relaxed">
              {insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightPanel;
