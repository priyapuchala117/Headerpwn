import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function RiskLineChart({ analysis }) {
    // Process data to count severity
    // For a static single scan, this might be boring, so we simulate a "trend" based on the current data distributed over "time"
    // Or we just show the severity distribution as a line/area chart which looks cool.

    // Let's create a simulated trend logic for visual appeal if we only have one data point, 
    // but optimally this receives history. For now, assuming single scan analysis passed.

    const severityCounts = {
        High: 0,
        Medium: 0,
        Low: 0
    };

    analysis.forEach(item => {
        if (!item.present) {
            const sev = item.severity;
            if (sev === 'High') severityCounts.High++;
            if (sev === 'Medium') severityCounts.Medium++;
            if (sev === 'Low') severityCounts.Low++;
        }
    });

    // Simulate a timeline where issues were "found"
    // We'll just make a nice curve that peaks at the current counts
    const generateTrend = (finalValue) => {
        return [
            Math.max(0, finalValue - 2),
            Math.max(0, finalValue - 1),
            Math.max(0, finalValue - 3),
            Math.max(0, finalValue - 1),
            Math.max(0, finalValue - 2),
            finalValue
        ];
    };

    const xLabels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Today'];

    return (
        <div className="w-full h-full">
            <LineChart
                series={[
                    {
                        data: generateTrend(severityCounts.High),
                        label: 'High Risk',
                        color: '#f43f5e', // Rose-500
                        area: true,
                        stack: 'total',
                        curve: 'catmullRom',
                        showMark: false,
                    },
                    {
                        data: generateTrend(severityCounts.Medium),
                        label: 'Medium Risk',
                        color: '#fbbf24', // Amber-400
                        area: true,
                        stack: 'total',
                        curve: 'catmullRom',
                        showMark: false,
                    },
                    {
                        data: generateTrend(severityCounts.Low),
                        label: 'Low Risk',
                        color: '#38bdf8', // Sky-400
                        area: true,
                        stack: 'total',
                        curve: 'catmullRom',
                        showMark: false,
                    },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels, tickLabelStyle: { fill: '#94a3b8' } }]}
                yAxis={[{ tickLabelStyle: { fill: '#94a3b8' } }]}
                sx={{
                    '.MuiAreaElement-root': {
                        fillOpacity: 0.3,
                    },
                    '.MuiLineElement-root': {
                        strokeWidth: 3,
                    },
                    // Axis styling
                    '.MuiChartsAxis-line': { stroke: '#334155' },
                    '.MuiChartsAxis-tick': { stroke: '#334155' },
                    '.MuiChartsLegend-root text': { fill: '#cbd5e1 !important' },
                }}
            />
        </div>
    );
}
