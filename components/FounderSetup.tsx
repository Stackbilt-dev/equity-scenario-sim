import React from 'react';
import { Founder } from '../types';
import Tooltip from './Tooltip';

interface FounderSetupProps {
  founders: Founder[];
  setFounders: React.Dispatch<React.SetStateAction<Founder[]>>;
}

const FounderSetup: React.FC<FounderSetupProps> = ({ founders, setFounders }) => {

  const handleAddFounder = () => {
    setFounders(prev => [...prev, { id: String(Date.now() + Math.random()), name: `Founder ${prev.length + 1}`, equity: 10 }]);
  };

  const handleRemoveFounder = (id: string) => {
    if (founders.length <= 1) return; // Prevent removing the last founder
    setFounders(prev => prev.filter(f => f.id !== id));
  };

  const handleUpdateFounder = (id: string, field: 'name' | 'equity', value: string | number) => {
    setFounders(prev => prev.map(f => {
      if (f.id === id) {
        if (field === 'equity') {
          const numValue = Number(value);
          if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
            return { ...f, equity: numValue };
          }
        } else {
          return { ...f, name: String(value) };
        }
      }
      return f;
    }));
  };

  const totalEquity = founders.reduce((acc, f) => acc + f.equity, 0);
  const maxFounder = Math.max(...founders.map(f => f.equity));
  const minFounder = Math.min(...founders.map(f => f.equity));
  const disparity = maxFounder - minFounder;
  const founderConcentrationRisk = maxFounder > 70;
  const founderTotalHigh = totalEquity > 92; // leaves little room for pool/partners
  const founderDisparityHigh = founders.length > 1 && disparity > 30;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center space-x-2">
        <span>Founder Setup</span>
         <Tooltip text="Define the founding team's ownership *before* the partner joins. The total should be less than 100% to leave room for an unallocated pool for future employees.">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </Tooltip>
      </h2>
      <div className="space-y-3">
        {founders.map((founder, index) => (
          <div key={founder.id} className="grid grid-cols-12 gap-2 items-center">
            <input
              type="text"
              value={founder.name}
              onChange={(e) => handleUpdateFounder(founder.id, 'name', e.target.value)}
              className="col-span-6 bg-gray-900 border-2 border-gray-700 rounded-md py-2 px-3 focus:border-indigo-500 outline-none"
            />
            <div className="col-span-5 relative">
                <input
                    type="number"
                    value={founder.equity}
                    onChange={(e) => handleUpdateFounder(founder.id, 'equity', e.target.value)}
                    className="w-full bg-gray-900 border-2 border-gray-700 rounded-md py-2 px-3 text-right focus:border-indigo-500 outline-none pr-6"
                    min="0"
                    max="100"
                    step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
            </div>
            <div className="col-span-1 text-right">
                <button 
                    onClick={() => handleRemoveFounder(founder.id)}
                    className="p-2 text-gray-500 hover:text-red-400 disabled:opacity-50 disabled:hover:text-gray-500 transition-colors"
                    disabled={founders.length <= 1}
                    aria-label={`Remove ${founder.name}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={handleAddFounder}
        className="w-full mt-4 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
      >
        + Add Founder
      </button>
       <div className="mt-4 pt-4 border-t border-gray-700 text-right">
            <span className="font-bold text-lg">Total Founder Equity: </span>
            <span className={`font-mono text-lg ${totalEquity > 100 ? 'text-red-400' : 'text-white'}`}>{totalEquity.toFixed(2)}%</span>
            {totalEquity > 100 && <p className="text-xs text-red-400 mt-1">Warning: Total exceeds 100%. This will result in a negative unallocated pool.</p>}
      </div>
      {(founderTotalHigh || founderConcentrationRisk || founderDisparityHigh) && (
        <div className="mt-3 space-y-2">
          {founderTotalHigh && (
            <div className="p-3 rounded-md bg-yellow-500/20 text-yellow-300 text-sm">
              Risk: Founders hold {totalEquity.toFixed(1)}%. Consider reducing to leave 10–15% for an option pool and future partners.
            </div>
          )}
          {founderConcentrationRisk && (
            <div className="p-3 rounded-md bg-yellow-500/20 text-yellow-300 text-sm">
              Risk: One founder at {maxFounder.toFixed(1)}% may create concentration issues. Document roles/vesting to align incentives.
            </div>
          )}
          {founderDisparityHigh && (
            <div className="p-3 rounded-md bg-yellow-500/20 text-yellow-300 text-sm">
              Risk: Founder disparity of {disparity.toFixed(1)} pp. Ensure contribution and vesting reflect the gap.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FounderSetup;
