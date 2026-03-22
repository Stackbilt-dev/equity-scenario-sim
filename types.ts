export type Path = 'A' | 'B';
export type InvestmentVehicle = 'priced' | 'safe';

export interface Founder {
  id: string;
  name: string;
  equity: number;
}

export interface CapTableEntry {
  shareholder: string;
  equity: number;
  color: string;
  tooltip?: string;
}

export interface Milestones {
  capitalRaised: boolean;
  mrrTarget: boolean;
}

export interface ExitPayout {
  founderPayouts: { name: string; amount: number }[];
  partner: number | { fromEquity: number; fromDeltaCarry: number; total: number; };
  unallocatedPool: number;
  deltaCarryTotal: number;
}