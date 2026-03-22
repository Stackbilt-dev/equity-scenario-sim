import React, { useMemo } from 'react';
import Tooltip from './Tooltip';
import { Path, Milestones } from '../types';

interface MilestoneTimelineProps {
  selectedPath: Path;
  monthsElapsed: number;
  milestones: Milestones;
  vestingSchedule?: {
    cliff: number;
    period: number;
    grant: number;
    baseGrant: number;
    performanceGrant: number;
  };
}

interface TimelineEvent {
  month: number;
  title: string;
  description: string;
  type: 'cliff' | 'milestone' | 'vesting';
  percentVested?: number;
  equityAmount?: number;
}

const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  selectedPath,
  monthsElapsed,
  milestones,
  vestingSchedule = {
    cliff: selectedPath === 'A' ? 3 : 12,
    period: selectedPath === 'A' ? 24 : 48,
    grant: 5.0,
    baseGrant: 5.0,
    performanceGrant: 0,
  },
}) => {
  const timeline = useMemo((): TimelineEvent[] => {
    const events: TimelineEvent[] = [];

    // Cliff event
    events.push({
      month: vestingSchedule.cliff,
      title: `Vesting Cliff (${vestingSchedule.cliff} months)`,
      description: 'First equity vests. Schedule begins.',
      type: 'cliff',
      equityAmount: (vestingSchedule.grant / vestingSchedule.period) * vestingSchedule.cliff,
    });

    // Performance milestone events (Path B only)
    if (selectedPath === 'B') {
      events.push({
        month: 6,
        title: 'Capital Raise Milestone',
        description: 'Unlock +2.5% performance equity if achieved',
        type: 'milestone',
        equityAmount: milestones.capitalRaised ? 2.5 : 0,
      });

      events.push({
        month: 12,
        title: 'MRR Target Milestone',
        description: 'Unlock +2.5% performance equity if achieved',
        type: 'milestone',
        equityAmount: milestones.mrrTarget ? 2.5 : 0,
      });
    }

    // Full vesting
    events.push({
      month: vestingSchedule.period,
      title: `Full Vesting (${vestingSchedule.period} months)`,
      description: '100% of grant vests',
      type: 'vesting',
      percentVested: 100,
      equityAmount: vestingSchedule.grant,
    });

    return events.sort((a, b) => a.month - b.month);
  }, [selectedPath, vestingSchedule, milestones]);

  const getMonthLabel = (month: number) => {
    if (month === 0) return 'Day 1';
    if (month === 1) return '1 mo';
    if (month < 12) return `${month} mo`;
    const years = month / 12;
    return years === Math.floor(years) ? `${Math.floor(years)}y` : `${years.toFixed(1)}y`;
  };

  const maxMonths = Math.max(vestingSchedule.period, 60);
  const progressPercent = (monthsElapsed / maxMonths) * 100;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center space-x-2">
        <span>Vesting Timeline</span>
        <Tooltip text="Visual representation of when equity vests and when performance milestones can be achieved.">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </Tooltip>
      </h2>

      <div className="space-y-6">
        {/* Timeline visualization */}
        <div className="bg-gray-900 p-6 rounded-lg">
          {/* Timeline bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>0 mo</span>
              <span>Current: {getMonthLabel(monthsElapsed)}</span>
              <span>{getMonthLabel(maxMonths)}</span>
            </div>

            {/* Progress bar */}
            <div className="relative h-10 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              {/* Filled progress */}
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-indigo-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />

              {/* Current position indicator */}
              <div
                className="absolute top-0 h-full w-1 bg-white shadow-lg z-10 transition-all duration-300"
                style={{ left: `${progressPercent}%` }}
              />

              {/* Timeline events markers */}
              {timeline.map((event, idx) => {
                const eventPercent = (event.month / maxMonths) * 100;
                const isReached = monthsElapsed >= event.month;
                const isCurrent = Math.abs(monthsElapsed - event.month) < 1;

                return (
                  <div
                    key={idx}
                    className="absolute top-0 h-full flex items-center justify-center cursor-pointer group"
                    style={{ left: `${eventPercent}%`, transform: 'translateX(-50%)' }}
                    title={event.title}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        isReached
                          ? 'bg-green-400 border-green-300'
                          : isCurrent
                            ? 'bg-yellow-400 border-yellow-300'
                            : 'bg-gray-600 border-gray-500'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone legend */}
          <div className="text-xs text-gray-400 space-y-1 bg-gray-800 p-3 rounded-md border border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Milestone reached</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <span>Current</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-600" />
              <span>Upcoming</span>
            </div>
          </div>
        </div>

        {/* Events list */}
        <div className="space-y-3">
          {timeline.map((event, idx) => {
            const isReached = monthsElapsed >= event.month;
            const monthsUntil = event.month - monthsElapsed;

            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border-l-4 ${
                  isReached
                    ? 'bg-green-500/10 border-green-500 text-green-100'
                    : monthsUntil <= 3
                      ? 'bg-yellow-500/10 border-yellow-500 text-yellow-100'
                      : 'bg-gray-900 border-gray-700 text-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sm">{event.title}</h3>
                    <p className="text-xs mt-1 opacity-80">{event.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono opacity-70 mb-1">{getMonthLabel(event.month)}</div>
                    {!isReached && monthsUntil > 0 && (
                      <div className="text-xs font-semibold opacity-70">
                        In {monthsUntil.toFixed(0)} month{monthsUntil !== 1 ? 's' : ''}
                      </div>
                    )}
                    {isReached && (
                      <div className="text-xs font-semibold text-green-300">✓ Completed</div>
                    )}
                  </div>
                </div>

                {/* Equity value display */}
                {event.equityAmount !== undefined && event.equityAmount > 0 && (
                  <div className="mt-2 pt-2 border-t border-current/20">
                    <span className="text-xs font-mono">
                      {event.type === 'milestone'
                        ? `+${event.equityAmount.toFixed(1)}% if achieved`
                        : `${event.equityAmount.toFixed(1)}% vested`}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vesting progress indicator */}
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="text-xs font-bold text-gray-500 tracking-widest mb-3">VESTING PROGRESS</div>
          <div className="space-y-2">
            {/* Time-based vesting */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Time-Based Grant</span>
                <span className="font-mono text-white">
                  {monthsElapsed < vestingSchedule.cliff
                    ? '0%'
                    : Math.min(100, ((monthsElapsed / vestingSchedule.period) * 100).toFixed(1)) + '%'}
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500"
                  style={{
                    width:
                      monthsElapsed < vestingSchedule.cliff
                        ? '0%'
                        : `${Math.min(100, ((monthsElapsed / vestingSchedule.period) * 100).toFixed(1))}%`,
                  }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {vestingSchedule.baseGrant.toFixed(1)}% over {vestingSchedule.period} months (cliff: {vestingSchedule.cliff} months)
              </div>
            </div>

            {/* Performance grants (Path B only) */}
            {selectedPath === 'B' && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Performance Grants</span>
                  <span className="font-mono text-white">
                    {(
                      (milestones.capitalRaised ? 2.5 : 0) +
                      (milestones.mrrTarget ? 2.5 : 0)
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="space-y-1 text-xs">
                  {milestones.capitalRaised ? (
                    <div className="flex items-center space-x-2 text-green-300">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Capital Raised: +2.5%</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-400">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Capital Raised: +2.5% (pending)</span>
                    </div>
                  )}
                  {milestones.mrrTarget ? (
                    <div className="flex items-center space-x-2 text-green-300">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>MRR Target: +2.5%</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-400">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>MRR Target: +2.5% (pending)</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneTimeline;
