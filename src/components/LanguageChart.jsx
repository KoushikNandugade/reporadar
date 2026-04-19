import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981', '#475569'];

const LanguageChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-[#121214] border border-white/5 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-blue-600 rounded-full shadow-lg shadow-blue-600/50"></span>
        Language Breakdown
      </h3>
      <div className="h-[300px] w-full" style={{ height: '300px', minHeight: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1c', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.05)',
                color: '#fff' 
              }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              formatter={(value) => <span className="text-gray-400 text-sm font-medium">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguageChart;
