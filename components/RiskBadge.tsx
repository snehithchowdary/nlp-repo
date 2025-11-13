import React from 'react';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  level: RiskLevel;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center gap-x-1.5";
  let specificClasses = "";
  let dotClasses = "";

  switch (level) {
    case RiskLevel.Safe:
      specificClasses = "bg-green-500/10 text-green-700 dark:text-green-400";
      dotClasses = "bg-green-500";
      break;
    case RiskLevel.Review:
      specificClasses = "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      dotClasses = "bg-yellow-500";
      break;
    case RiskLevel.HighRisk:
      specificClasses = "bg-red-500/10 text-red-700 dark:text-red-400";
      dotClasses = "bg-red-500";
      break;
    default:
      specificClasses = "bg-gray-500/10 text-gray-700 dark:text-gray-400";
      dotClasses = "bg-gray-500";
  }

  return (
    <span className={`${baseClasses} ${specificClasses}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotClasses}`}></span>
      {level}
    </span>
  );
};