
import { AssessmentData, Rule } from '../types';

/**
 * Fuzzy Logic Membership Functions (Triangular)
 */
export const getMembership = (value: number) => {
  // Low: 0 to 50, peaks at 0
  const low = value <= 25 ? 1 : value >= 50 ? 0 : (50 - value) / 25;
  
  // Medium: 25 to 75, peaks at 50
  const medium = value <= 25 || value >= 75 ? 0 : value <= 50 ? (value - 25) / 25 : (75 - value) / 25;
  
  // High: 50 to 100, peaks at 100
  const high = value <= 50 ? 0 : value >= 75 ? 1 : (value - 50) / 25;

  return { low, medium, high };
};

export const getDominantLevel = (memberships: { low: number, medium: number, high: number }): 'low' | 'medium' | 'high' => {
  if (memberships.high >= memberships.medium && memberships.high >= memberships.low) return 'high';
  if (memberships.medium >= memberships.low) return 'medium';
  return 'low';
};

/**
 * Forward Chaining Rules Engine
 */
export const RULES: Rule[] = [
  {
    id: 'R1',
    conditions: [
      { metric: 'rawMaterials', level: 'high' },
      { metric: 'financialStability', level: 'high' }
    ],
    consequent: 'Sangat Tahan (Very Secure)'
  },
  {
    id: 'R2',
    conditions: [
      { metric: 'rawMaterials', level: 'medium' },
      { metric: 'productionCapacity', level: 'medium' }
    ],
    consequent: 'Tahan (Secure)'
  },
  {
    id: 'R3',
    conditions: [
      { metric: 'marketDemand', level: 'low' },
      { metric: 'financialStability', level: 'low' }
    ],
    consequent: 'Rentan (Vulnerable)'
  },
  {
    id: 'R4',
    conditions: [
      { metric: 'distributionReach', level: 'low' }
    ],
    consequent: 'Kurang Tahan (Less Secure)'
  }
];

export const runAssessment = (
  msmeName: string, 
  userId: string, 
  metrics: AssessmentData['metrics']
): AssessmentData => {
  const fuzzyResults: any = {};
  const linguisticMetrics: any = {};

  Object.entries(metrics).forEach(([key, val]) => {
    const membership = getMembership(val);
    fuzzyResults[key] = membership;
    linguisticMetrics[key] = getDominantLevel(membership);
  });

  // Forward Chaining Logic
  let conclusion = 'Cukup Tahan (Moderate)';
  for (const rule of RULES) {
    const isMatch = rule.conditions.every(cond => linguisticMetrics[cond.metric] === cond.level);
    if (isMatch) {
      conclusion = rule.consequent;
      break; 
    }
  }

  // Simple weighted score calculation for visual representation
  const score = Object.values(metrics).reduce((acc, curr) => acc + curr, 0) / 5;

  return {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    msmeName,
    date: new Date().toISOString(),
    metrics,
    fuzzyResults,
    conclusion,
    score
  };
};
