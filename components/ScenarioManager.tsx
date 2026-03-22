import React, { useState, useCallback } from 'react';
import Tooltip from './Tooltip';

export interface SavedScenario {
  id: string;
  name: string;
  description: string;
  timestamp: number;
  data: ScenarioData;
}

export interface ScenarioData {
  selectedPath: 'A' | 'B';
  investment: number;
  investmentVehicle: 'priced' | 'safe';
  preMoneyValuation: number;
  valuationCap: number;
  monthsElapsed: number;
  milestones: {
    capitalRaised: boolean;
    mrrTarget: boolean;
  };
  founders: Array<{
    id: string;
    name: string;
    equity: number;
  }>;
}

interface ScenarioManagerProps {
  currentScenario: ScenarioData;
  onLoadScenario?: (scenario: SavedScenario) => void;
}

const ScenarioManager: React.FC<ScenarioManagerProps> = ({
  currentScenario,
  onLoadScenario,
}) => {
  const [scenarios, setScenarios] = useState<SavedScenario[]>(() => {
    const saved = localStorage.getItem('cap_table_scenarios');
    return saved ? JSON.parse(saved) : [];
  });

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioDescription, setScenarioDescription] = useState('');
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);

  const saveScenario = useCallback(() => {
    if (!scenarioName.trim()) {
      alert('Please enter a scenario name');
      return;
    }

    const newScenario: SavedScenario = {
      id: `scenario_${Date.now()}`,
      name: scenarioName,
      description: scenarioDescription,
      timestamp: Date.now(),
      data: currentScenario,
    };

    const updated = [...scenarios, newScenario];
    setScenarios(updated);
    localStorage.setItem('cap_table_scenarios', JSON.stringify(updated));

    // Reset form
    setScenarioName('');
    setScenarioDescription('');
    setShowSaveModal(false);
  }, [currentScenario, scenarios, scenarioName, scenarioDescription]);

  const deleteScenario = useCallback((id: string) => {
    const updated = scenarios.filter((s) => s.id !== id);
    setScenarios(updated);
    localStorage.setItem('cap_table_scenarios', JSON.stringify(updated));
    setSelectedScenarios((prev) => prev.filter((sid) => sid !== id));
  }, [scenarios]);

  const toggleScenarioSelection = (id: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getScenarioSummary = (scenario: SavedScenario) => {
    const { data } = scenario;
    return `Path ${data.selectedPath} • ${data.founders.length} founder(s) • $${(data.investment / 1000).toFixed(0)}k investment`;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center space-x-2">
        <span>Scenario Manager</span>
        <Tooltip text="Save different deal scenarios for comparison and future reference.">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </Tooltip>
      </h2>

      <div className="space-y-4">
        {/* Save Current Scenario Button */}
        <button
          onClick={() => setShowSaveModal(true)}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
          </svg>
          <span>Save Current Scenario</span>
        </button>

        {/* Save Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 p-6 rounded-xl shadow-xl max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Save Scenario</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Scenario Name</label>
                  <input
                    type="text"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                    placeholder="e.g., Conservative Path A"
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-md py-2 px-3 text-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description (optional)</label>
                  <textarea
                    value={scenarioDescription}
                    onChange={(e) => setScenarioDescription(e.target.value)}
                    placeholder="e.g., Lower investment, higher valuation"
                    rows={3}
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-md py-2 px-3 text-white focus:border-indigo-500 outline-none resize-none"
                  />
                </div>

                <div className="bg-gray-800 p-3 rounded-md text-sm text-gray-300">
                  <p className="font-semibold mb-1">Current Scenario:</p>
                  <p className="text-xs text-gray-400">{getScenarioSummary({ id: '', name: '', timestamp: 0, description: '', data: currentScenario })}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={saveScenario}
                    className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowSaveModal(false);
                      setScenarioName('');
                      setScenarioDescription('');
                    }}
                    className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved Scenarios List */}
        {scenarios.length > 0 ? (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-400 tracking-widest">SAVED SCENARIOS ({scenarios.length})</h3>
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedScenarios.includes(scenario.id)
                    ? 'bg-indigo-500/20 border-indigo-500'
                    : 'bg-gray-900 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className="flex-1"
                    onClick={() => toggleScenarioSelection(scenario.id)}
                  >
                    <h4 className="font-semibold text-white text-sm">{scenario.name}</h4>
                    {scenario.description && (
                      <p className="text-xs text-gray-400 mt-1">{scenario.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1.5">{getScenarioSummary(scenario)}</p>
                    <p className="text-xs text-gray-600 mt-0.5">Saved {formatDate(scenario.timestamp)}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteScenario(scenario.id);
                    }}
                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                    aria-label={`Delete ${scenario.name}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {selectedScenarios.includes(scenario.id) && (
                  <button
                    onClick={() => onLoadScenario?.(scenario)}
                    className="w-full mt-3 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded transition-colors"
                  >
                    Load This Scenario
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
            </svg>
            <p className="text-sm">No saved scenarios yet</p>
            <p className="text-xs mt-1">Save your current scenario to compare deals</p>
          </div>
        )}

        {/* Comparison Info */}
        {selectedScenarios.length > 0 && (
          <div className="bg-indigo-500/10 border border-indigo-500/30 p-3 rounded-lg text-xs text-indigo-200">
            {selectedScenarios.length === 1
              ? 'Select a scenario to load it'
              : `${selectedScenarios.length} scenarios selected - compare coming in future updates`}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioManager;
export type { SavedScenario, ScenarioData };
