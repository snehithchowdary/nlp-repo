import React, { useState } from 'react';

interface InputFormProps {
  onAnalyze: (content: string, context: string) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading }) => {
  const [content, setContent] = useState('');
  const [context, setContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(content, context);
  };

  return (
    <div className="bg-card dark:bg-dark-card p-6 rounded-xl shadow-lg border border-muted dark:border-dark-muted">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="context" className="block text-sm font-medium text-card-foreground dark:text-dark-card-foreground mb-2">
            Community Context
          </label>
          <input
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g., A hobbyist woodworking forum"
            className="w-full px-4 py-2 bg-background dark:bg-dark-background border border-muted dark:border-dark-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
            required
          />
          <p className="text-xs text-muted-foreground mt-2">
            Providing context helps the AI make a more accurate assessment.
          </p>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-card-foreground dark:text-dark-card-foreground mb-2">
            Content to Analyze
          </label>
          <textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="e.g., 'Wow, that new table saw is a total piece of junk. I can't believe I wasted my money on it. What a disappointment.'"
            className="w-full px-4 py-2 bg-background dark:bg-dark-background border border-muted dark:border-dark-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !content || !context}
          className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-dark-background disabled:bg-muted-foreground/50 disabled:cursor-not-allowed transition-all duration-150 ease-in-out shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5"
        >
          {isLoading ? (
             <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
            </>
          ) : (
            'Analyze Content'
          )}
        </button>
      </form>
    </div>
  );
};