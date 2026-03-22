import React from 'react';
import { Path } from '../types';

interface PathSelectorProps {
  selectedPath: Path;
  setSelectedPath: (path: Path) => void;
}

const PathSelector: React.FC<PathSelectorProps> = ({ selectedPath, setSelectedPath }) => {
  const buttonBaseClasses = "w-full py-4 px-6 text-lg font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4";
  const selectedClasses = {
    A: "bg-path-a text-white shadow-lg scale-105 ring-blue-400",
    B: "bg-path-b text-white shadow-lg scale-105 ring-red-400"
  };
  const unselectedClasses = "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white";

  return (
    <div className="grid grid-cols-2 gap-4 p-2 bg-gray-800 rounded-xl">
      <button 
        onClick={() => setSelectedPath('A')}
        className={`${buttonBaseClasses} ${selectedPath === 'A' ? selectedClasses.A : unselectedClasses}`}
      >
        <div className="flex flex-col items-center">
          <span>Path A</span>
          <span className="text-sm font-normal">Strategic Advisor</span>
        </div>
      </button>
      <button 
        onClick={() => setSelectedPath('B')}
        className={`${buttonBaseClasses} ${selectedPath === 'B' ? selectedClasses.B : unselectedClasses}`}
      >
         <div className="flex flex-col items-center">
          <span>Path B</span>
          <span className="text-sm font-normal">Operating Partner</span>
        </div>
      </button>
    </div>
  );
};

export default PathSelector;
