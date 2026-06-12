import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function WaveChart({ history }) {
    if (!history || history.length === 0) return null;

    // Process history for chart
    // history is array of { date, url, score, ... }
    // We want to show the trend of scores over time

    // Sort by date ascending
    const sortedHistory = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Take last 10 scans
    const recentHistory = sortedHistory.slice(-10);

    const dates = recentHistory.map(h => {
        const d = new Date(h.date);
        return `${d.getHours()}:${d.getMinutes()}`;
    });

    const scores = recentHistory.map(h => h.score);

    return (
        <div className="flex justify-center items-center h-full w-full">
            <LineChart
                series={[
                    {
                        data: scores,
                        label: 'Security Score Trend',
                        color: '#818cf8', // Indigo-400
                        area: true,
                        curve: "natural", // Wave effect
                        showMark: true,
                    },
                ]}
                height={300}
                xAxis={[{ scaleType: 'point', data: dates, label: 'Scan Time' }]}
                yAxis={[{ min: 0, max: 100 }]}
                sx={{
                    '.MuiLineElement-root': {
                        strokeWidth: 4,
                    },
                    '.MuiAreaElement-root': {
                        fillOpacity: 0.2,
                    },
                    // Axis styling
                    '.MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: '#475569' },
                    '.MuiChartsAxis-left .MuiChartsAxis-line': { stroke: '#475569' },
                    '.MuiChartsAxis-tick': { stroke: '#475569' },
                    '.MuiChartsAxis-tickLabel': { fill: '#94a3b8' },
                    '.MuiChartsLegend-root text': { fill: '#e2e8f0 !important' }
                }}
            />
        </div>
    );
}
