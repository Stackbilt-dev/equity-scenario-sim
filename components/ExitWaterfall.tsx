import React, { useState, useMemo } from 'react';
import Tooltip from './Tooltip';

interface WaterfallEntry {
  step: number;
  description: string;
  amount: number;
  remaining: number;
}

interface ExitWaterfallProps {
  exitValuation: number;
  setExitValuation: (value: number) => void;
  partnerEquity: number;
  foundersEquity: number;
  poolEquity: number;
  debts?: number;
}

const formatCurrency = (value: number) => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
  return `$${value.toFixed(0)}`;
};

const ExitWaterfall: React.FC<ExitWaterfallProps> = ({
  exitValuation,
  setExitValuation,
  partnerEquity,
  foundersEquity,
  poolEquity,
  debts = 0,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'base' | 'optimistic'>('base');

  const valuationScenarios = useMemo(() => {
    const base = exitValuation;
    return {
      conservative: base * 0.7,
      base: base,
      optimistic: base * 1.5,
    };
  }, [exitValuation]);

  const selectedVal = valuationScenarios[selectedScenario];

  const waterfall = useMemo(() => {
    const entries: WaterfallEntry[] = [];
    let remaining = selectedVal;
    let step = 1;

    // Step 1: Gross proceeds
    entries.push({
      step,
      description: 'Exit Valuation (Gross)',
      amount: selectedVal,
      remaining: selectedVal,
    });
    step++;

    // Step 2: Debt payoff
    if (debts > 0) {
      remaining -= debts;
      entries.push({
        step,
        description: 'Debt & Obligations',
        amount: -debts,
        remaining,
      });
      step++;
    }

    // Step 3: Net proceeds for equity holders
    entries.push({
      step,
      description: 'Net Proceeds (for equity holders)',
      amount: remaining,
      remaining,
    });
    step++;

    // Equity distribution
    const totalEquity = partnerEquity + foundersEquity + poolEquity;

    // Partner gets their share
    if (totalEquity > 0) {
      const partnerPayout = (partnerEquity / totalEquity) * remaining;
      entries.push({
        step,
        description: `Partner (${partnerEquity.toFixed(1)}%)`,
        amount: partnerPayout,
        remaining: partnerPayout,
      });
      step++;

      // Founders get their share
      const foundersPayout = (foundersEquity / totalEquity) * remaining;
      entries.push({
        step,
        description: `Founders (${foundersEquity.toFixed(1)}%)`,
        amount: foundersPayout,
        remaining: foundersPayout,
      });
      step++;

      // Option pool (typically goes to current employees)
      const poolPayout = (poolEquity / totalEquity) * remaining;
      entries.push({
        step,
        description: `Option Pool (${poolEquity.toFixed(1)}%)`,
        amount: poolPayout,
        remaining: poolPayout,
      });
    }

    return entries;
  }, [selectedVal, debts, partnerEquity, foundersEquity, poolEquity]);

  const getPartnerPayout = () => {
    const totalEquity = partnerEquity + foundersEquity + poolEquity;
    if (totalEquity === 0) return 0;
    const netProceeds = selectedVal - debts;
    return (partnerEquity / totalEquity) * netProceeds;
  };

  const getFoundersPayout = () => {
    const totalEquity = partnerEquity + foundersEquity + poolEquity;
    if (totalEquity === 0) return 0;
    const netProceeds = selectedVal - debts;
    return (foundersEquity / totalEquity) * netProceeds;
  };

  const getPoolPayout = () => {
    const totalEquity = partnerEquity + foundersEquity + poolEquity;
    if (totalEquity === 0) return 0;
    const netProceeds = selectedVal - debts;
    return (poolEquity / totalEquity) * netProceeds;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center space-x-2">
        <span>Exit Waterfall</span>
        <Tooltip text="See how exit proceeds are distributed among partners, founders, and employees based on exit valuation.">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </Tooltip>
      </h2>

      <div className="space-y-6">
        {/* Exit Valuation Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-gray-300 flex items-center space-x-1.5">
              <span>Exit Valuation</span>
              <Tooltip text="The company sale price. Use this to model different exit scenarios.">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </Tooltip>
            </label>
            <span className="px-3 py-1 text-lg font-bold text-emerald-300 bg-emerald-500/20 rounded-md">
              {formatCurrency(exitValuation)}
            </span>
          </div>
          <input
            type="range"
            min="500000"
            max="50000000"
            step="500000"
            value={exitValuation}
            onChange={(e) => setExitValuation(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            aria-label="Exit valuation"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$500k</span>
            <span>$50M</span>
          </div>
        </div>

        {/* Scenario Selector */}
        <div className="grid grid-cols-3 gap-2">
          {(['conservative', 'base', 'optimistic'] as const).map((scenario) => {
            const scenarioLabel = {
              conservative: '30% Discount',
              base: 'Base Case',
              optimistic: '50% Premium',
            }[scenario];

            const scenarioValue = valuationScenarios[scenario];

            return (
              <button
                key={scenario}
                onClick={() => setSelectedScenario(scenario)}
                className={`py-3 px-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedScenario === scenario
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <div className="text-xs opacity-75 mb-0.5">{scenarioLabel}</div>
                <div className="text-sm font-mono">{formatCurrency(scenarioValue)}</div>
              </button>
            );
          })}
        </div>

        {/* Payout Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-gray-900 p-3 rounded-lg border border-indigo-500/30">
            <div className="text-xs font-bold text-gray-500 tracking-widest mb-1">PARTNER PAYOUT</div>
            <p className="text-2xl font-bold text-indigo-300">{formatCurrency(getPartnerPayout())}</p>
            <p className="text-xs text-gray-400 mt-1">
              {partnerEquity.toFixed(1)}% of {formatCurrency(selectedVal - debts)}
            </p>
          </div>

          <div className="bg-gray-900 p-3 rounded-lg border border-green-500/30">
            <div className="text-xs font-bold text-gray-500 tracking-widest mb-1">FOUNDERS PAYOUT</div>
            <p className="text-2xl font-bold text-green-300">{formatCurrency(getFoundersPayout())}</p>
            <p className="text-xs text-gray-400 mt-1">
              {foundersEquity.toFixed(1)}% of {formatCurrency(selectedVal - debts)}
            </p>
          </div>

          <div className="bg-gray-900 p-3 rounded-lg border border-amber-500/30">
            <div className="text-xs font-bold text-gray-500 tracking-widest mb-1">POOL PAYOUT</div>
            <p className="text-2xl font-bold text-amber-300">{formatCurrency(getPoolPayout())}</p>
            <p className="text-xs text-gray-400 mt-1">
              {poolEquity.toFixed(1)}% of {formatCurrency(selectedVal - debts)}
            </p>
          </div>
        </div>

        {/* Waterfall Steps */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="text-xs font-bold text-gray-500 tracking-widest mb-4">WATERFALL STEPS</div>

          <div className="space-y-2">
            {waterfall.map((entry, idx) => (
              <div key={idx} className="text-sm">
                {/* Header step (valuation, net proceeds) */}
                {(entry.step === 1 || entry.description.includes('Net Proceeds')) ? (
                  <div className="bg-gray-800 p-2 rounded font-semibold text-gray-200 flex justify-between border border-gray-700">
                    <span>{entry.description}</span>
                    <span className="font-mono text-white">{formatCurrency(entry.amount)}</span>
                  </div>
                ) : entry.amount < 0 ? (
                  // Debt line
                  <div className="text-gray-400 flex justify-between px-2 py-1 border-l-2 border-red-500/50">
                    <span className="text-red-300">− {entry.description}</span>
                    <span className="font-mono text-red-300">{formatCurrency(entry.amount)}</span>
                  </div>
                ) : (
                  // Equity payout lines
                  <div className="text-gray-300 flex justify-between px-2 py-1 border-l-2 border-indigo-500/50">
                    <span>{entry.description}</span>
                    <span className="font-mono text-indigo-200">{formatCurrency(entry.amount)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-indigo-500/10 border border-indigo-500/30 p-3 rounded-lg text-sm text-indigo-200 space-y-1">
          <p className="font-semibold">Exit Insights:</p>
          <ul className="text-xs space-y-0.5 list-disc list-inside">
            <li>
              Partner receives {((partnerEquity / (partnerEquity + foundersEquity + poolEquity)) * 100).toFixed(0)}% of
              net proceeds
            </li>
            <li>Founders receive {((foundersEquity / (partnerEquity + foundersEquity + poolEquity)) * 100).toFixed(0)}% of net proceeds</li>
            <li>
              Total equity holder return:{' '}
              {formatCurrency(getPartnerPayout() + getFoundersPayout() + getPoolPayout())}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExitWaterfall;
