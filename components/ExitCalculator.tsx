import React, { useState, useMemo } from 'react';
import { Path, ExitPayout } from '../types';
import Tooltip from './Tooltip';

interface ExitCalculatorProps {
  selectedPath: Path;
  partnerVestedEquity: number;
  founders: { name: string; dilutedEquity: number }[];
}

const formatCurrency = (value: number) => {
    if (value >= 1_000_000_000) {
        return `$${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(2)}M`;
    }
    if (value >= 1_000) {
        return `$${(value / 1_000).toFixed(1)}k`;
    }
    return `$${value.toFixed(0)}`;
};

const ExitCalculator: React.FC<ExitCalculatorProps> = ({ selectedPath, partnerVestedEquity, founders }) => {
  const [exitValue, setExitValue] = useState<number>(10000000);
  const [customExitValue, setCustomExitValue] = useState<string>("10M");

  const presets = [1000000, 5000000, 10000000];

  const calculateExitProceeds = (exitVal: number): ExitPayout => {
    const baselineValuation = 300000;
    const deltaCarryPercentage = 0.10;
    
    const totalFoundersEquity = founders.reduce((sum, f) => sum + f.dilutedEquity, 0);
    const unallocatedPoolEquity = 100 - totalFoundersEquity - partnerVestedEquity;
    
    const founderPayouts = founders.map(f => ({
      name: f.name,
      amount: exitVal * (f.dilutedEquity / 100)
    }));

    if (selectedPath === 'A' || exitVal <= baselineValuation) {
      return {
        founderPayouts,
        partner: exitVal * (partnerVestedEquity / 100),
        unallocatedPool: exitVal * (unallocatedPoolEquity / 100),
        deltaCarryTotal: 0,
      };
    } else {
      const deltaValue = exitVal - baselineValuation;
      const deltaCarryAmount = deltaValue * deltaCarryPercentage;
      
      const partnerFromEquity = exitVal * (partnerVestedEquity / 100);
      
      return {
        founderPayouts,
        partner: {
          fromEquity: partnerFromEquity,
          fromDeltaCarry: deltaCarryAmount,
          total: partnerFromEquity + deltaCarryAmount,
        },
        unallocatedPool: exitVal * (unallocatedPoolEquity / 100),
        deltaCarryTotal: deltaCarryAmount,
      };
    }
  };

  const payout = useMemo(() => calculateExitProceeds(exitValue), [exitValue, selectedPath, partnerVestedEquity, founders]);

  const handleCustomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^0-9.MK]/g, '');
    setCustomExitValue(value);
    
    let numericValue = parseFloat(value);
    if (value.includes('M')) {
        numericValue *= 1000000;
    } else if (value.includes('K')) {
        numericValue *= 1000;
    }
    
    if (!isNaN(numericValue)) {
        setExitValue(numericValue);
    }
  };

  const isPartnerComplex = typeof payout.partner === 'object';

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Exit Scenario Calculator</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 grid grid-cols-3 gap-2">
            {presets.map(preset => (
                <button 
                    key={preset}
                    onClick={() => {
                      setExitValue(preset);
                      setCustomExitValue(formatCurrency(preset).replace('$', ''));
                    }}
                    className={`py-2 px-4 rounded-lg transition-colors duration-200 ${exitValue === preset ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                    {formatCurrency(preset)}
                </button>
            ))}
        </div>
        <input 
            type="text"
            value={customExitValue}
            onChange={handleCustomValueChange}
            placeholder="Custom (e.g., 25M)"
            className="flex-1 bg-gray-900 border-2 border-gray-600 rounded-lg py-2 px-4 text-center focus:border-indigo-500 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div className="bg-gray-900 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-center mb-4 flex items-center justify-center space-x-2">
          <span>Payout at <span className="text-indigo-400">{formatCurrency(exitValue)}</span> Exit</span>
            {isPartnerComplex && payout.partner.fromDeltaCarry > 0 && (
                <Tooltip text="Why can the total payout be more than the exit value? The 'Delta Carry' is a cash bonus paid *after* all equity is distributed. It's a separate profit-sharing agreement on top of the cap table.">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                </Tooltip>
            )}
        </h3>
        <div className="space-y-3 text-lg">
          {payout.founderPayouts.map((founderPayout) => (
            <div className="flex justify-between" key={founderPayout.name}>
                <span>{founderPayout.name}</span>
                <span className="font-mono text-founder">{formatCurrency(founderPayout.amount)}</span>
            </div>
          ))}
          <div className="flex justify-between">
            <span>Partner</span> 
            <span className={`font-mono ${selectedPath === 'A' ? 'text-path-a' : 'text-path-b'}`}>{formatCurrency(isPartnerComplex ? payout.partner.total : payout.partner as number)}</span>
          </div>
            {isPartnerComplex && (
                <div className="pl-6 text-sm text-gray-400 border-l-2 border-gray-700 ml-2 space-y-1">
                    <div className="flex justify-between"><span>From Equity ({partnerVestedEquity.toFixed(2)}%)</span> <span className="font-mono">{formatCurrency(payout.partner.fromEquity)}</span></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-1.5">
                            <span>From Profit Share</span>
                            <Tooltip text="A cash bonus equal to 10% of the exit value above a $300k baseline. This is a profit-sharing right, not equity.">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                            </Tooltip>
                        </div>
                        <span className="font-mono">{formatCurrency(payout.partner.fromDeltaCarry)}</span>
                    </div>
                </div>
            )}
           {payout.unallocatedPool > 0.01 && <div className="flex justify-between border-t border-gray-700 pt-3 mt-3"><span>Unallocated Pool</span> <span className="font-mono text-pool">{formatCurrency(payout.unallocatedPool)}</span></div>}
        </div>
      </div>
    </div>
  );
};

export default ExitCalculator;
