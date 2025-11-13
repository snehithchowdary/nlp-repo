import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { analyzeContent } from './services/geminiService';
import type { AnalysisResult } from './types';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (content: string, context: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    if (!content.trim() || !context.trim()) {
      setError("Content and community context cannot be empty.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await analyzeContent(content, context);
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      setError("Failed to analyze content. The AI model may be unavailable or an error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen font-sans bg-background text-foreground dark:bg-dark-background dark:text-dark-foreground">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="lg:sticky lg:top-24">
            <InputForm onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>
          <div className="min-h-[400px] lg:min-h-0">
            <AnalysisDisplay result={analysisResult} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-xs text-muted-foreground">
        <p>Powered by Gemini API. Designed for nuanced content moderation.</p>
      </footer>
    </div>
  );
};

export default App;