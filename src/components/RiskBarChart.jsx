import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function RiskBarChart({ analysis }) {
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

    const dataset = [
        { severity: 'Low', count: severityCounts.Low, color: '#3b82f6' },
        { severity: 'Medium', count: severityCounts.Medium, color: '#f59e0b' },
        { severity: 'High', count: severityCounts.High, color: '#ef4444' },
    ];

    const chartSetting = {
        yAxis: [
            {
                label: 'Count',
            },
        ],
        width: 500,
        height: 300,
        sx: {
            '.MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: '#475569' },
            '.MuiChartsAxis-left .MuiChartsAxis-line': { stroke: '#475569' },
            '.MuiChartsAxis-tick': { stroke: '#475569' },
            '.MuiChartsAxis-tickLabel': { fill: '#94a3b8' },
            '.MuiChartsLegend-root text': { fill: '#e2e8f0 !important' },
            // Bar colors need to be set in series or logic
        }
    };

    return (
        <div className="flex justify-center items-center h-full w-full">
            <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'severity', label: 'Severity Level' }]}
                series={[{ dataKey: 'count', label: 'Missing Headers', color: '#6366f1' }]}
                {...chartSetting}
            />
        </div>
    );
}
