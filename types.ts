
export enum RiskLevel {
  Safe = 'Safe',
  Review = 'Review Recommended',
  HighRisk = 'High Risk',
}

export interface Emotion {
  name: string;
  score: number;
}

export interface AnalysisResult {
  summary: string;
  riskLevel: RiskLevel;
  explanation: string;
  emotions: Emotion[];
}
