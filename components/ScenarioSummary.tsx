import React from 'react';
import Tooltip from './Tooltip';

interface ScenarioSummaryProps {
  investmentEquity: number;
  vestedGrantEquity: number;
  partnerTotalPotentialEquity: number;
  unallocatedPool: number;
  totalFounderEquity: number;
  selectedPath: 'A' | 'B';
}

const ScenarioSummary: React.FC<ScenarioSummaryProps> = ({
  investmentEquity,
  vestedGrantEquity,
  partnerTotalPotentialEquity,
  unallocatedPool,
  totalFounderEquity,
  selectedPath,
}) => {
  const partnerVestedTotal = investmentEquity + vestedGrantEquity;
  const upside = partnerTotalPotentialEquity - partnerVestedTotal;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center space-x-2">
        <span>Scenario Summary</span>
        <Tooltip text="Overview of the current deal structure showing current vested equity and potential upside.">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </Tooltip>
      </h2>

      <div className="space-y-4">
        {/* Partner Equity Breakdown */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="text-sm font-bold text-gray-400 tracking-widest mb-3">PARTNER EQUITY</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">From Investment</span>
              <span className="font-mono text-white">{investmentEquity.toFixed(2)}%</span>
            </div>
            {selectedPath === 'B' && vestedGrantEquity > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-300">From Vested Grant</span>
                <span className="font-mono text-white">{vestedGrantEquity.toFixed(2)}%</span>
              </div>
            )}
            <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between items-center">
              <span className="text-gray-200 font-semibold">Total Vested</span>
              <span className="font-mono text-lg text-indigo-300">{partnerVestedTotal.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        {/* Upside Potential */}
        {selectedPath === 'B' && upside > 0 && (
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="text-sm font-bold text-gray-400 tracking-widest mb-3 flex items-center space-x-1.5">
              <span>POTENTIAL UPSIDE</span>
              <Tooltip text="Additional equity partner could receive if all milestones are achieved.">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </Tooltip>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">From Milestones</span>
              <span className="font-mono text-yellow-300">{upside.toFixed(2)}%</span>
            </div>
          </div>
        )}

        {/* Cap Table Overview */}
        <div className="bg-gray-900 p-4 rounded-lg space-y-2">
          <div className="text-sm font-bold text-gray-400 tracking-widest mb-3">CAP TABLE OVERVIEW</div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-300">Founders</span>
            <span className="font-mono text-green-300">{totalFounderEquity.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-300">Partner (Vested)</span>
            <span className="font-mono text-indigo-300">{partnerVestedTotal.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-300">Option Pool</span>
            <span className={`font-mono ${unallocatedPool < 8 ? 'text-red-300' : 'text-gray-300'}`}>
              {unallocatedPool.toFixed(2)}%
            </span>
          </div>
          {unallocatedPool < 8 && (
            <div className="mt-2 text-xs text-red-300 bg-red-500/20 p-2 rounded">
              Pool below recommended 8% minimum
            </div>
          )}
        </div>

        {/* Key Insight */}
        <div className="bg-indigo-500/10 border border-indigo-500/30 p-3 rounded-lg text-sm text-indigo-200">
          {selectedPath === 'A' ? (
            <span>Path A: Fixed equity structure with {investmentEquity.toFixed(2)}% purchased and {vestedGrantEquity.toFixed(2)}% from time-based vesting.</span>
          ) : (
            <span>Path B: Flexible structure with performance equity. Partner could reach {partnerTotalPotentialEquity.toFixed(2)}% if milestones are hit.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioSummary;
