import React, { useState } from 'react';
import Tooltip from './Tooltip';

interface PoolTargetInputProps {
  currentPool: number;
  founders: { equity: number }[];
  partnerEquity: number;
  onPoolRecommendation?: (recommendation: PoolRecommendation) => void;
}

interface PoolRecommendation {
  target: number;
  healthy: boolean;
  message: string;
  reducerNeeded?: number;
}

const PoolTargetInput: React.FC<PoolTargetInputProps> = ({
  currentPool,
  founders,
  partnerEquity,
  onPoolRecommendation,
}) => {
  const [poolTarget, setPoolTarget] = useState<number>(15);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const founderTotal = founders.reduce((sum, f) => sum + f.equity, 0);
  const availableSpace = 100 - founderTotal - partnerEquity;

  // Calculate what valuation/investment would achieve target
  const calculatePoolRecommendation = (): PoolRecommendation => {
    const healthy = currentPool >= poolTarget;

    if (healthy) {
      return {
        target: poolTarget,
        healthy: true,
        message: `✓ Current pool (${currentPool.toFixed(1)}%) meets your target of ${poolTarget}%.`,
      };
    }

    const poolShortfall = poolTarget - currentPool;
    return {
      target: poolTarget,
      healthy: false,
      message: `Your option pool is ${poolShortfall.toFixed(1)} percentage points below your ${poolTarget}% target.`,
      reducerNeeded: poolShortfall,
    };
  };

  const recommendation = calculatePoolRecommendation();

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center space-x-2">
        <span>Option Pool Target</span>
        <Tooltip text="Set your desired option pool percentage. This helps you plan how much equity to reserve for future employees and advisors. Typical targets are 10-20%.">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </Tooltip>
      </h2>

      <div className="space-y-6">
        {/* Pool Target Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-gray-300">Target Pool %</label>
            <span className="px-3 py-1 text-lg font-bold text-amber-300 bg-amber-500/20 rounded-md">
              {poolTarget}%
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={poolTarget}
            onChange={(e) => {
              setPoolTarget(Number(e.target.value));
              setShowRecommendation(true);
            }}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            aria-label="Option pool target percentage"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Current vs Target Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-xs font-bold text-gray-500 tracking-widest mb-1">CURRENT POOL</div>
            <p className={`text-2xl font-bold ${currentPool >= poolTarget ? 'text-green-300' : 'text-yellow-300'}`}>
              {currentPool.toFixed(1)}%
            </p>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-xs font-bold text-gray-500 tracking-widest mb-1">TARGET POOL</div>
            <p className="text-2xl font-bold text-amber-300">{poolTarget}%</p>
          </div>
        </div>

        {/* Recommendation Box */}
        {showRecommendation && (
          <div
            className={`p-4 rounded-lg ${
              recommendation.healthy
                ? 'bg-green-500/20 border border-green-500/40 text-green-200'
                : 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-200'
            }`}
          >
            <p className="text-sm font-semibold mb-2">{recommendation.message}</p>
            {!recommendation.healthy && recommendation.reducerNeeded && (
              <div className="text-xs space-y-1">
                <p className="font-semibold">Recommendations to increase pool:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>Reduce investment check size by ${(recommendation.reducerNeeded * 1000).toLocaleString()}</li>
                  <li>Increase company pre-money valuation</li>
                  <li>Reduce founder equity allocation before partner joins</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Pool Composition Bar */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="text-xs font-bold text-gray-500 tracking-widest mb-3">EQUITY COMPOSITION</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Founders</span>
              <span className="font-mono text-green-300">{founderTotal.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Partner</span>
              <span className="font-mono text-indigo-300">{partnerEquity.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Option Pool</span>
              <span className="font-mono text-amber-300">{currentPool.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-700">
              <span className="text-gray-200 font-semibold">Total</span>
              <span className="font-mono">{(founderTotal + partnerEquity + currentPool).toFixed(1)}%</span>
            </div>
          </div>

          {/* Visual bar representation */}
          <div className="mt-4 h-6 bg-gray-800 rounded-md flex overflow-hidden border border-gray-700">
            <div
              className="bg-green-500/60"
              style={{ width: `${(founderTotal / 100) * 100}%` }}
              title={`Founders: ${founderTotal.toFixed(1)}%`}
            />
            <div
              className="bg-indigo-500/60"
              style={{ width: `${(partnerEquity / 100) * 100}%` }}
              title={`Partner: ${partnerEquity.toFixed(1)}%`}
            />
            <div
              className="bg-amber-500/60"
              style={{ width: `${(currentPool / 100) * 100}%` }}
              title={`Pool: ${currentPool.toFixed(1)}%`}
            />
          </div>
        </div>

        {/* Health Indicators */}
        <div className="space-y-2">
          {currentPool >= 15 && (
            <div className="flex items-center space-x-2 p-2 bg-green-500/20 rounded-md text-green-300 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Healthy option pool for hiring</span>
            </div>
          )}
          {currentPool >= 8 && currentPool < 15 && (
            <div className="flex items-center space-x-2 p-2 bg-yellow-500/20 rounded-md text-yellow-300 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Adequate pool, but consider growing it</span>
            </div>
          )}
          {currentPool < 8 && (
            <div className="flex items-center space-x-2 p-2 bg-red-500/20 rounded-md text-red-300 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 112.5 6a1 1 0 000 2A4 4 0 1114.362 10H12a1 1 0 100 2h3.809a1 1 0 00.946-.662l1.285-3.957A1 1 0 0016 9V7a1 1 0 00-1-1h-.263l.544-1.632a1 1 0 10-1.882-.628l-.539 1.616h-2.182l.539-1.616a1 1 0 10-1.882-.628l-.544 1.632H9a1 1 0 100 2h1.363a6 6 0 01-3.886 3.89z" clipRule="evenodd" />
              </svg>
              <span>Inadequate pool, reduce investment to grow it</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoolTargetInput;
