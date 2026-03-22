import React from 'react';
import { Path } from '../types';
import Tooltip from './Tooltip';

interface VestingClockProps {
  monthsElapsed: number;
  setMonthsElapsed: (months: number) => void;
  selectedPath: Path;
}

const VestingClock: React.FC<VestingClockProps> = ({ monthsElapsed, setMonthsElapsed, selectedPath }) => {
  const vestingPeriod = selectedPath === 'A' ? 24 : 48;
  const cliff = selectedPath === 'A' ? 3 : 12;

  const cliffMet = monthsElapsed >= cliff;
  const cliffPercentage = (cliff / vestingPeriod) * 100;
  const progressPercentage = (monthsElapsed / vestingPeriod) * 100;

  const pathColor = selectedPath === 'A' ? 'bg-path-a' : 'bg-path-b';
  
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center space-x-2">
        <span>Vesting Clock</span>
        <Tooltip text="Simulate the passage of time to see how the partner's equity vests based on the selected path's schedule.">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </Tooltip>
      </h2>
      <div className="space-y-4">
        <div className="text-center">
            <span className="text-4xl font-bold text-white">{monthsElapsed}</span>
            <span className="text-lg text-gray-400"> / {vestingPeriod} months</span>
        </div>

        {/* Visual Progress Bar */}
        <div className="relative pt-5 pb-2">
          <div className="relative w-full h-3 bg-gray-700 rounded-full">
            {/* Progress Fill */}
            <div
              className={`h-full rounded-full transition-all duration-150 ${cliffMet ? pathColor : 'bg-gray-500'}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
            
            {/* Cliff Marker */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 h-5 w-1 bg-yellow-400 transform -translate-x-1/2" 
              style={{ left: `${cliffPercentage}%` }}
            >
            </div>
             <div 
                className="absolute -top-1 text-xs font-bold text-yellow-400 transform -translate-x-1/2"
                style={{ left: `${cliffPercentage}%` }}
             >
                Cliff
             </div>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max={vestingPeriod}
          value={monthsElapsed}
          onChange={(e) => setMonthsElapsed(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>{vestingPeriod} months</span>
        </div>

        <div className={`p-3 rounded-lg text-center transition-colors duration-300 ${cliffMet ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
            <div className="font-bold flex items-center justify-center space-x-2">
                {cliffMet 
                    ? <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>Cliff Met & Vesting</span></>
                    : <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg> <span>Pre-Cliff (0% Vested)</span></>
                }
            </div>
            <div className="text-sm mt-1">
                {cliffMet ? `After the cliff, the partner earns a piece of their equity grant each month.` : `The partner must complete the ${cliff}-month trial 'cliff' period before they start earning any equity.`}
            </div>
        </div>
      </div>
    </div>
  );
};

export default VestingClock;
