import React from 'react';
import { CapTableEntry } from '../types';
import Tooltip from './Tooltip';

interface CapTableViewProps {
  data: CapTableEntry[];
  title: string;
}

const CapTableView: React.FC<CapTableViewProps> = ({ data, title }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <div className="space-y-4">
        {data.map((entry) => (
          <div key={entry.shareholder} className="flex justify-between items-center text-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: entry.color }}></div>
              <span className="font-medium text-gray-300">{entry.shareholder}</span>
              {entry.tooltip && (
                <Tooltip text={entry.tooltip}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </Tooltip>
              )}
            </div>
            <span className="font-semibold text-white">{entry.equity.toFixed(2)}%</span>
          </div>
        ))}
      </div>
      <div className="mt-6 h-8 w-full bg-gray-700 rounded-full flex overflow-hidden">
        {data.map((entry) => (
          <div 
            key={`${entry.shareholder}-bar`}
            className="h-full transition-all duration-500"
            style={{ width: `${entry.equity}%`, backgroundColor: entry.color }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CapTableView;
