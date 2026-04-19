import React from 'react';
import { Zap, TrendingUp, Flame, Award, Lightbulb } from 'lucide-react';

const InsightPanel = ({ score, insights }) => {
  if (!score) return null;

  const getBadgeColor = (type) => {
    switch (type) {
      case 'strong': return 'from-orange-500 to-red-600 shadow-orange-500/20';
      case 'active': return 'from-blue-500 to-indigo-600 shadow-blue-500/20';
      default: return 'from-gray-600 to-gray-800 shadow-gray-500/10';
    }
  };

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'strong': return <Flame className="w-8 h-8" />;
      case 'active': return <Zap className="w-8 h-8" />;
      default: return <Award className="w-8 h-8" />;
    }
  };

  return (
    <div className="bg-[#121214] border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/5 blur-[60px] -ml-16 -mt-16"></div>
      
      <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 relative z-10">
        <span className="w-2 h-6 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50"></span>
        Intelligence Analysis
      </h3>

      <div className="flex flex-col items-center mb-10 relative z-10">
        <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${getBadgeColor(score.type)} flex items-center justify-center text-white shadow-2xl mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-500 cursor-default border border-white/10`}>
          {getBadgeIcon(score.type)}
        </div>
        <div className="text-center">
          <h4 className="text-2xl font-black text-white mb-2">{score.label}</h4>
          <div className="flex items-center justify-center gap-3">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Developer Score</span>
            <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs font-black rounded-lg border border-blue-500/20">{score.value}/100</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-orange-500" /> Smart Insights
        </p>
        {insights.map((insight, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
            <div className="mt-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform"></div>
            </div>
            <p className="text-gray-400 text-sm font-medium leading-relaxed group-hover:text-gray-300 transition-colors">
              {insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightPanel;
