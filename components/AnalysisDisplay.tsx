import React from 'react';
import type { AnalysisResult } from '../types';
import { Spinner } from './Spinner';
import { RiskBadge } from './RiskBadge';
import { EmotionChart } from './EmotionChart';

interface AnalysisDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

const EmptyState: React.FC = () => (
    <div className="text-center p-8 border-2 border-dashed border-muted dark:border-dark-muted rounded-xl h-full flex flex-col justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-muted-foreground/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
        </svg>
        <h3 className="text-lg font-medium text-foreground dark:text-dark-foreground">Analysis Results Appear Here</h3>
        <p className="text-muted-foreground mt-1 max-w-sm">Enter content and context, then click "Analyze" to see the AI's assessment of emotional tone and risk level.</p>
    </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
     <div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-xl h-full flex flex-col justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <h3 className="text-lg font-medium text-red-500">Analysis Failed</h3>
        <p className="text-red-500/80 mt-1">{message}</p>
    </div>
);


export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!result) {
    return <EmptyState />;
  }

  return (
    <div className="bg-card dark:bg-dark-card p-6 rounded-xl shadow-lg border border-muted dark:border-dark-muted space-y-6 animate-fade-in">
      <div>
        <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-2">Assessment</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <RiskBadge level={result.riskLevel} />
            <p className="italic text-card-foreground dark:text-dark-card-foreground">{result.summary}</p>
        </div>
      </div>
      
      <div className="p-4 bg-background dark:bg-dark-background rounded-lg border border-muted dark:border-dark-muted">
          <h3 className="font-semibold text-card-foreground dark:text-dark-card-foreground mb-1">AI Explanation</h3>
          <p className="text-sm text-muted-foreground">{result.explanation}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-3">Emotional Tone</h3>
        <div className="h-64 w-full">
            <EmotionChart data={result.emotions} />
        </div>
      </div>
    </div>
  );
};