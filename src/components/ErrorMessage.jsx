import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
      <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
      <div>
        <h3 className="font-semibold text-red-900 mb-1">Error Occurred</h3>
        <p className="text-red-700 text-sm leading-relaxed">
          {message || "We couldn't find that user or something went wrong. Please check the username and try again."}
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage;
