import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function RiskPie({ score }) {
  const data = [
    { id: 0, value: score, label: 'Risk', color: '#ef4444' }, // Red for Risk
    { id: 1, value: 100 - score, label: 'Safe', color: '#3b82f6' }, // Blue for Safe (No Green)
  ];

  return (
    <div className="flex justify-center items-center h-full w-full">
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            innerRadius: 60,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
        width={400}
        height={250}
        slotProps={{
          legend: {
            hidden: true
          }
        }}
        tooltip={{ trigger: 'item' }}
      />
      {/* Centered Score Label (Optional visual flair) */}
      <div className="absolute font-mono text-xl font-bold text-white pointer-events-none">
        {score}%
      </div>
    </div>
  );
}
