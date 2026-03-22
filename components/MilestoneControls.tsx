import React from 'react';
import { Milestones } from '../types';
import Tooltip from './Tooltip';

interface MilestoneControlsProps {
  milestones: Milestones;
  setMilestones: React.Dispatch<React.SetStateAction<Milestones>>;
  isDisabled: boolean;
}

const MilestoneControls: React.FC<MilestoneControlsProps> = ({ milestones, setMilestones, isDisabled }) => {
  const handleToggle = (milestone: keyof Milestones) => {
    if (isDisabled) return;
    setMilestones(prev => ({ ...prev, [milestone]: !prev[milestone] }));
  };

  const baseClasses = "w-full p-4 rounded-lg transition-all duration-300 flex items-center justify-between text-left";
  const disabledClasses = "bg-gray-800 opacity-50 cursor-not-allowed";
  const enabledClasses = "bg-gray-700 hover:bg-gray-600 cursor-pointer";

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center space-x-2">
        <span>Milestone Controls</span>
        <Tooltip text="Performance equity vests only when these specific goals are achieved. This applies only to the Operating Partner path.">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
        </Tooltip>
      </h2>
      <div className="space-y-4">
        <button
          onClick={() => handleToggle('capitalRaised')}
          disabled={isDisabled}
          className={`${baseClasses} ${isDisabled ? disabledClasses : enabledClasses}`}
        >
          <div>
            <div className="font-bold">Capital Raise Milestone</div>
            <div className="text-sm text-gray-400">$250,000 raised → +2.5% equity</div>
          </div>
          <div className={`w-6 h-6 rounded-md flex items-center justify-center ${milestones.capitalRaised && !isDisabled ? 'bg-path-b' : 'bg-gray-600'}`}>
            {milestones.capitalRaised && !isDisabled && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>
        <button
          onClick={() => handleToggle('mrrTarget')}
          disabled={isDisabled}
          className={`${baseClasses} ${isDisabled ? disabledClasses : enabledClasses}`}
        >
          <div>
            <div className="font-bold">Revenue Milestone</div>
            <div className="text-sm text-gray-400">$25,000 MRR achieved → +2.5% equity</div>
          </div>
          <div className={`w-6 h-6 rounded-md flex items-center justify-center ${milestones.mrrTarget && !isDisabled ? 'bg-path-b' : 'bg-gray-600'}`}>
            {milestones.mrrTarget && !isDisabled && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default MilestoneControls;
