import React from 'react';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
      <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 font-medium">Fetching developer intelligence...</p>
    </div>
  );
};

export const Skeleton = ({ className }) => (
  <div className={`bg-slate-200 animate-pulse rounded ${className}`}></div>
);
