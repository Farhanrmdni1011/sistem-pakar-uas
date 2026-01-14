
export type UserRole = 'ADMIN' | 'USER' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional for security simulation
  role: UserRole;
}

export interface AssessmentData {
  id: string;
  userId: string;
  msmeName: string;
  date: string;
  metrics: {
    rawMaterials: number; 
    productionCapacity: number; 
    marketDemand: number; 
    financialStability: number; 
    distributionReach: number; 
  };
  fuzzyResults: {
    [key: string]: {
      low: number;
      medium: number;
      high: number;
    };
  };
  conclusion: string;
  score: number;
}

export interface Rule {
  id: string;
  conditions: {
    metric: string;
    level: 'low' | 'medium' | 'high';
  }[];
  consequent: string;
}
