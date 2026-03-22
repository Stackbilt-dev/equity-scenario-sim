import React, { useMemo } from 'react';
import Tooltip from './Tooltip';
import { InvestmentVehicle } from '../types';

interface PartnerCapitalInfusionProps {
    investment: number;
    setInvestment: (value: number) => void;
    preMoneyValuation: number;
    setPreMoneyValuation: (value: number) => void;
    investmentVehicle: InvestmentVehicle;
    setInvestmentVehicle: (value: InvestmentVehicle) => void;
    valuationCap: number;
    setValuationCap: (value: number) => void;
}

const formatCurrency = (value: number, short = true) => {
    if (short) {
        if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
        if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
        return `$${value.toFixed(0)}`;
    }
    return `$${value.toLocaleString()}`;
};

const VehicleSelector: React.FC<{
    selected: InvestmentVehicle;
    setSelected: (vehicle: InvestmentVehicle) => void;
}> = ({ selected, setSelected }) => {
    const baseClasses = "w-full py-2 px-4 text-sm font-bold rounded-md transition-all duration-200 focus:outline-none";
    const selectedClasses = "bg-indigo-600 text-white shadow";
    const unselectedClasses = "bg-gray-700 text-gray-400 hover:bg-gray-600";

    return (
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-900 rounded-lg" aria-label="Investment Type">
            <button onClick={() => setSelected('priced')} className={`${baseClasses} ${selected === 'priced' ? selectedClasses : unselectedClasses}`}>
                Priced Round
            </button>
            <button onClick={() => setSelected('safe')} className={`${baseClasses} ${selected === 'safe' ? selectedClasses : unselectedClasses}`}>
                SAFE Note
            </button>
        </div>
    );
};

const PartnerCapitalInfusion: React.FC<PartnerCapitalInfusionProps> = ({
    investment,
    setInvestment,
    preMoneyValuation,
    setPreMoneyValuation,
    investmentVehicle,
    setInvestmentVehicle,
    valuationCap,
    setValuationCap,
}) => {
    const { equityFromInvestment, explanation } = useMemo(() => {
        if (investmentVehicle === 'priced') {
            const postMoney = preMoneyValuation + investment;
            const equity = postMoney > 0 ? (investment / postMoney) * 100 : 0;
            return {
                equityFromInvestment: equity,
                explanation: "You agree on the company's value today (the 'pre-money valuation') and sell a slice of the company for cash. It's straightforward but locks in a valuation early."
            };
        } else { // 'safe'
            const equity = valuationCap > 0 ? (investment / valuationCap) * 100 : 0;
            return {
                equityFromInvestment: equity,
                explanation: "A flexible agreement where the partner invests cash now for the right to own equity in the future. The 'Valuation Cap' protects them by setting a maximum company value for their investment."
            };
        }
    }, [investment, preMoneyValuation, investmentVehicle, valuationCap]);

    const parseCurrencyInput = (val: string): number | null => {
        const cleaned = val.toUpperCase().replace(/[^0-9.KM]/g, '');
        if (!cleaned) return null;
        let num = parseFloat(cleaned.replace(/[^0-9.]/g, ''));
        if (isNaN(num)) return null;
        if (cleaned.includes('M')) num *= 1_000_000;
        if (cleaned.includes('K')) num *= 1_000;
        return Math.max(0, Math.round(num));
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Partner's Cash Investment</h2>
            
            <div className="space-y-6">
                <VehicleSelector selected={investmentVehicle} setSelected={setInvestmentVehicle} />

                <div className="bg-gray-900 p-3 rounded-md text-center text-sm text-gray-400">{explanation}</div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="font-medium text-gray-300 flex items-center space-x-1.5">
                            <span>Investment Amount</span>
                            <Tooltip text="The amount of cash the partner is investing into the business." />
                        </label>
                        <span className="px-3 py-1 text-lg font-bold text-indigo-300 bg-indigo-500/20 rounded-md">{formatCurrency(investment)}</span>
                    </div>
                    <div className="flex gap-3 items-center">
                      <input type="range" min="0" max="100000" step="5000" value={investment} onChange={e => setInvestment(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                      <input
                        aria-label="Investment amount"
                        className="w-36 bg-gray-900 border-2 border-gray-700 rounded-md py-2 px-3 text-right focus:border-indigo-500 outline-none"
                        value={formatCurrency(investment, false)}
                        onChange={(e) => {
                          const parsed = parseCurrencyInput(e.target.value);
                          if (parsed !== null) setInvestment(Math.min(1_000_000, parsed));
                        }}
                      />
                    </div>
                </div>

                {investmentVehicle === 'priced' ? (
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="font-medium text-gray-300 flex items-center space-x-1.5">
                                <span>Pre-Money Valuation</span>
                                <Tooltip text="What you agree the company is worth *before* accepting the partner's cash. A higher valuation means the partner's cash buys a smaller percentage of the company." />
                            </label>
                            <span className="px-3 py-1 text-lg font-bold text-indigo-300 bg-indigo-500/20 rounded-md">{formatCurrency(preMoneyValuation)}</span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <input type="range" min="100000" max="1000000" step="50000" value={preMoneyValuation} onChange={e => setPreMoneyValuation(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                          <input
                            aria-label="Pre-money valuation"
                            className="w-36 bg-gray-900 border-2 border-gray-700 rounded-md py-2 px-3 text-right focus:border-indigo-500 outline-none"
                            value={formatCurrency(preMoneyValuation, false)}
                            onChange={(e) => {
                              const parsed = parseCurrencyInput(e.target.value);
                              if (parsed !== null) setPreMoneyValuation(Math.min(5_000_000, Math.max(50_000, parsed)));
                            }}
                          />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center mb-1">
                             <label className="font-medium text-gray-300 flex items-center space-x-1.5">
                                <span>SAFE Valuation Cap</span>
                                <Tooltip text="The *maximum* valuation used to calculate the partner's shares when their SAFE converts. A lower cap is better for the partner, as it gets them more equity for their investment." />
                            </label>
                            <span className="px-3 py-1 text-lg font-bold text-indigo-300 bg-indigo-500/20 rounded-md">{formatCurrency(valuationCap)}</span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <input type="range" min="250000" max="1500000" step="50000" value={valuationCap} onChange={e => setValuationCap(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                          <input
                            aria-label="SAFE valuation cap"
                            className="w-36 bg-gray-900 border-2 border-gray-700 rounded-md py-2 px-3 text-right focus:border-indigo-500 outline-none"
                            value={formatCurrency(valuationCap, false)}
                            onChange={(e) => {
                              const parsed = parseCurrencyInput(e.target.value);
                              if (parsed !== null) setValuationCap(Math.min(10_000_000, Math.max(100_000, parsed)));
                            }}
                          />
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm font-bold text-gray-400 tracking-widest flex items-center justify-center space-x-1.5">
                        <span>EQUITY PURCHASED</span>
                        <Tooltip text={investmentVehicle === 'priced' ? "The percentage of the company purchased with this cash investment." : "The potential percentage of the company this investment will convert into, based on the valuation cap."} />
                    </div>
                    <p className="text-3xl font-bold text-purchased mt-1">{equityFromInvestment.toFixed(2)}%</p>
                    {equityFromInvestment > 15 && (
                      <div className="mt-3 text-xs bg-yellow-500/20 text-yellow-300 p-2 rounded-md">
                        Risk: Purchased equity is high for an early partnership. Consider a higher valuation, a smaller check, or staging the investment.
                      </div>
                    )}
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm font-bold text-gray-400 tracking-widest flex items-center justify-center space-x-1.5">
                        <span>COMPANY VALUATION BASIS</span>
                         <Tooltip text="The company valuation being used to calculate the equity from this investment. For a SAFE, it's the cap; for a priced round, it's the pre-money valuation." />
                    </div>
                    <p className="text-3xl font-bold text-white mt-1">{formatCurrency(investmentVehicle === 'priced' ? preMoneyValuation : valuationCap)}</p>
                </div>
            </div>
        </div>
    );
};

export default PartnerCapitalInfusion;
