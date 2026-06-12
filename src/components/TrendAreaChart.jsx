import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function TrendAreaChart({ history }) {
    if (!history || history.length === 0) return null;

    // We want to stack High, Medium, Low counts over time
    // history items likely don't have detailed counts stored directly in the top level unless we added them?
    // Previous `App.js` saved `newScan` which included `analysis`.

    // Extract data series
    const data = history.slice(-10).map(scan => {
        let high = 0, med = 0, low = 0;
        if (scan.analysis) {
            scan.analysis.forEach(item => {
                if (!item.present) {
                    if (item.severity === 'High') high++;
                    else if (item.severity === 'Medium') med++;
                    else if (item.severity === 'Low') low++;
                }
            });
        }
        return {
            date: new Date(scan.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            high, med, low
        };
    });

    return (
        <div className="w-full h-[300px]">
            <LineChart
                dataset={data}
                xAxis={[{ scaleType: 'point', dataKey: 'date' }]}
                series={[
                    {
                        dataKey: 'high',
                        label: 'High Risk',
                        stack: 'total',
                        area: true,
                        color: '#ef4444', // Red-500
                        showMark: false,
                    },
                    {
                        dataKey: 'med',
                        label: 'Medium Risk',
                        stack: 'total', // Stacked area
                        area: true,
                        color: '#f59e0b', // Amber-500
                        showMark: false,
                    },
                    {
                        dataKey: 'low',
                        label: 'Low Risk',
                        stack: 'total',
                        area: true,
                        color: '#3b82f6', // Blue-500
                        showMark: false,
                    },
                ]}
                height={300}
                sx={{
                    '.MuiAreaElement-root': {
                        fillOpacity: 0.6, // Higher opacity for stacked
                    },
                    // Axis styling
                    '.MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: '#334155' },
                    '.MuiChartsAxis-left .MuiChartsAxis-line': { stroke: '#334155' },
                    '.MuiChartsAxis-tick': { stroke: '#334155' },
                    '.MuiChartsAxis-tickLabel': { fill: '#94a3b8' },
                    '.MuiChartsLegend-root text': { fill: '#cbd5e1 !important' }
                }}
                grid={{ horizontal: true }}
            />
        </div>
    );
}
