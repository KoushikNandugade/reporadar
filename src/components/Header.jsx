import React from 'react';
import { Radar } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 mb-8 border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Radar className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Repo<span className="text-blue-600">Radar</span>
          </h1>
        </div>
        <div className="hidden md:block">
          <p className="text-sm text-slate-500 font-medium">GitHub Profile Intelligence Dashboard</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
