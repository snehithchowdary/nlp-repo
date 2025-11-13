import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Emotion } from '../types';

interface EmotionChartProps {
  data: Emotion[];
}

export const EmotionChart: React.FC<EmotionChartProps> = ({ data }) => {
    const sortedData = [...data].sort((a, b) => b.score - a.score);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={sortedData}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsla(210, 15%, 50%, 0.2)" />
        <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(210, 15%, 50%)' }} />
        <YAxis dataKey="name" type="category" width={80} tick={{ fill: 'hsl(210, 15%, 50%)' }} />
        <Tooltip
          cursor={{ fill: 'hsla(244, 80%, 60%, 0.1)' }}
          contentStyle={{ 
              backgroundColor: 'hsl(222, 47%, 11%)', 
              borderColor: 'hsl(244, 80%, 60%)',
              color: '#ffffff',
              borderRadius: '0.5rem',
          }}
          labelStyle={{ fontWeight: 'bold' }}
          formatter={(value: number) => [`${value}%`, "Confidence"]}
        />
        <Bar dataKey="score" fill="hsl(244, 80%, 60%)" background={{ fill: 'rgba(128, 128, 128, 0.1)' }} />
      </BarChart>
    </ResponsiveContainer>
  );
};