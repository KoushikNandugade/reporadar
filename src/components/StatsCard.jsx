import React from 'react';

const StatsCard = ({ icon: Icon, label, value, color }) => {
  const colors = {
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-blue-500/5",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20 shadow-purple-500/5",
    orange: "bg-orange-500/10 text-orange-500 border-orange-500/20 shadow-orange-500/5",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-emerald-500/5",
  };

  return (
    <div className="bg-[#121214] border border-white/5 p-6 rounded-2xl flex items-center gap-5 shadow-xl transition-transform hover:scale-[1.02] cursor-default">
      <div className={`p-4 rounded-xl border ${colors[color] || colors.blue} shadow-lg`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.1em] mb-1">{label}</p>
        <p className="text-2xl font-bold text-white tracking-tight leading-none">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
