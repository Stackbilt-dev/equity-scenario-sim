import React from 'react';
import { Path, Milestones } from '../types';

const Warning: React.FC<{ children: React.ReactNode; type: 'strategic' | 'info' }> = ({ children, type }) => {
  const baseClasses = "p-4 rounded-lg flex items-start space-x-3 text-sm";
  const colors = {
    strategic: "bg-red-500/20 text-red-300",
    info: "bg-yellow-500/20 text-yellow-300"
  };
  
  return (
    <div className={`${baseClasses} ${colors[type]}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
      <div>{children}</div>
    </div>
  );
};


interface WarningsProps {
  isPartnerOverCap: boolean;
  isPoolTooSmall: boolean;
  partnerTotalPotentialEquity: number;
  unallocatedPool: number;
  selectedPath: Path;
  milestones: Milestones;
  monthsElapsed: number;
}

const Warnings: React.FC<WarningsProps> = ({
  isPartnerOverCap,
  isPoolTooSmall,
  partnerTotalPotentialEquity,
  unallocatedPool,
  selectedPath,
  milestones,
  monthsElapsed
}) => {
  const warnings: { content: React.ReactNode, type: 'strategic' | 'info' }[] = [];

  // --- Strategic Guardrail Warnings ---
  if (isPartnerOverCap) {
    warnings.push({
      type: 'strategic',
      content: (
        <>
          <strong>Risk: Partner's stake is high.</strong> At <strong>{partnerTotalPotentialEquity.toFixed(1)}%</strong>, the partner's potential ownership is above the typical 12% limit for this stage. To reduce this, try increasing the company's valuation or lowering their cash investment.
        </>
      )
    });
  }

  if (isPoolTooSmall) {
    warnings.push({
      type: 'strategic',
      content: (
          <>
            <strong>Risk: Not enough equity for future hires.</strong> Your unallocated pool for future employees is only <strong>{unallocatedPool.toFixed(1)}%</strong>. This could make it hard to attract key talent. Aim for at least 8-10%.
          </>
      ) 
    });
  }
  
  // --- Informational Warnings ---
  if (selectedPath === 'B') {
    const cliff = 12;
    if (monthsElapsed < cliff && !warnings.some(w => w.type === 'info')) {
      warnings.push({
        type: 'info',
        content: <p><strong>FYI: Partner is in their trial 'cliff' period.</strong> They haven't earned any of their granted equity yet. This is normal before {cliff} months.</p>
      });
    }
    
    if (!milestones.capitalRaised || !milestones.mrrTarget) {
      warnings.push({
        type: 'info',
        content: <p><strong>FYI: Performance goals are not met.</strong> The partner won't earn their bonus equity unless the selected milestones are achieved.</p>
      });
    }
  }
  
  if (warnings.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-6 space-y-4">
      {warnings.map((warning, index) => <Warning key={index} type={warning.type}>{warning.content}</Warning>)}
    </div>
  );
};

export default Warnings;
