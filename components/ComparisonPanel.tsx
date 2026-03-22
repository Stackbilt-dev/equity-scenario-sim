import React from 'react';
import { Path } from '../types';
import Tooltip from './Tooltip';

interface ComparisonPanelProps {
  selectedPath: Path;
  partnerTotalPotentialEquity: number;
}

const PathDetail: React.FC<{ title: string; value: string | React.ReactNode; tooltip?: string }> = ({ title, value, tooltip }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
        <span className="text-gray-400 flex items-center space-x-1.5">
            <span>{title}</span>
            {tooltip && (
                <Tooltip text={tooltip}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                </Tooltip>
            )}
        </span>
        <span className="font-bold text-white">{value}</span>
    </div>
);

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ selectedPath, partnerTotalPotentialEquity }) => {
    const pathData = {
        A: {
            title: "Path A: Strategic Advisor",
            color: "text-path-a",
            details: [
                { title: "Role Focus", value: "High-level strategy, fundraising" },
                { title: "Time Commitment", value: "Part-time, advisory" },
                { title: "Base Equity Grant", value: "5.0%", tooltip: "The core equity the partner earns over time for their work, separate from any equity they buy with cash." },
                { title: "Performance Equity", value: "N/A" },
                { title: "Vesting Period", value: "24 Months", tooltip: "The total time it takes for the partner to earn their full equity grant." },
                { title: "Vesting Cliff", value: "3 Months", tooltip: "A trial period. The partner must stay for this long to earn their first chunk of equity. If they leave before the cliff, they get nothing." },
                { title: "Profit Share (Delta Carry)", value: "No", tooltip: "A cash bonus paid to the partner from the proceeds of a successful company sale. Not applicable in this path." },
            ]
        },
        B: {
            title: "Path B: Operating Partner",
            color: "text-path-b",
            details: [
                { title: "Role Focus", value: "Hands-on execution, team building" },
                { title: "Time Commitment", value: "Significant, operational" },
                { title: "Base Equity Grant", value: "5.0%", tooltip: "The core equity the partner earns over time for their work, separate from any equity they buy with cash." },
                { title: "Performance Equity", value: "+5.0% (max)", tooltip: "Bonus equity the partner only earns if the company hits specific, pre-agreed targets. This aligns their incentives with key business goals." },
                { title: "Vesting Period", value: "48 Months", tooltip: "The total time it takes for the partner to earn their full equity grant." },
                { title: "Vesting Cliff", value: "12 Months", tooltip: "A trial period. The partner must stay for this long to earn their first chunk of equity. If they leave before the cliff, they get nothing." },
                { title: "Profit Share (Delta Carry)", value: "Yes", tooltip: "A 10% cash bonus on the exit value above a $300k baseline. This rewards the partner for a big outcome, on top of their equity." },
            ]
        }
    };

    const currentPath = pathData[selectedPath];

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className={`text-2xl font-bold mb-4 text-center ${currentPath.color}`}>{currentPath.title}</h2>
            
            <div className="bg-gray-900 p-4 rounded-lg mb-4">
                 <div className="text-sm font-bold text-gray-400 tracking-widest text-center">TOTAL POTENTIAL EQUITY</div>
                 <p className="text-3xl font-bold text-center mt-1">{partnerTotalPotentialEquity.toFixed(2)}%</p>
                 <p className="text-xs text-gray-500 text-center mt-1">(Purchased Equity + Max Grant)</p>
            </div>
            
            <div className="space-y-1">
                {currentPath.details.map(detail => <PathDetail key={detail.title} {...detail} />)}
            </div>
        </div>
    );
};

export default ComparisonPanel;
