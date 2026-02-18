
import React from 'react';

interface BiasIndicatorProps {
  score: number; // -1 (Left) to 1 (Right)
  label?: string;
}

export const BiasIndicator: React.FC<BiasIndicatorProps> = ({ score, label }) => {
  // Normalize score from -1..1 to 0..100%
  const position = ((score + 1) / 2) * 100;
  
  return (
    <div className="w-full">
      {label && <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">{label}</div>}
      <div className="relative h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div className="absolute inset-0 flex justify-between px-2">
          <div className="h-full w-px bg-slate-300"></div>
          <div className="h-full w-px bg-slate-300"></div>
          <div className="h-full w-px bg-slate-300"></div>
          <div className="h-full w-px bg-slate-300"></div>
          <div className="h-full w-px bg-slate-300"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-slate-300 to-red-500 opacity-20"></div>
        <div 
          className="absolute top-0 h-full w-3 bg-slate-800 rounded-full border-2 border-white shadow-sm transition-all duration-500"
          style={{ left: `calc(${position}% - 6px)` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[10px] font-medium text-slate-400">
        <span>LEFT</span>
        <span>CENTER</span>
        <span>RIGHT</span>
      </div>
    </div>
  );
};
