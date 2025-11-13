import React from 'react';

const AnalysisIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.528L16.25 22.5l-.648-1.972a4.5 4.5 0 01-3.09-3.09l-1.972-.648 1.972-.648a4.5 4.5 0 013.09-3.09l.648-1.972.648 1.972a4.5 4.5 0 013.09 3.09l1.972.648-1.972.648a4.5 4.5 0 01-3.09 3.09z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-card/80 dark:bg-dark-card/80 backdrop-blur-sm border-b border-muted dark:border-dark-muted sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center space-x-4">
         <AnalysisIcon />
        <div>
            <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary-light to-primary-dark text-transparent bg-clip-text">
            Emotion-Aware Moderation
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
            Leverage AI to understand the emotional nuance in your community's content.
            </p>
        </div>
      </div>
    </header>
  );
};