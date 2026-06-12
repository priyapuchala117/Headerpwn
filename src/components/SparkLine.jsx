import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function SparkLine({ data, color }) {
    if (!data || data.length < 2) return <div className="h-full w-full bg-slate-800/30 rounded animate-pulse"></div>;

    const chartColor = color || '#818cf8';

    return (
        <div className="w-full h-full">
            <LineChart
                series={[
                    {
                        data: data,
                        color: chartColor,
                        area: true,
                        curve: "natural",
                        showMark: false,
                    },
                ]}
                height={80} // Slightly taller to fill container
                leftAxis={null}
                bottomAxis={null}
                rightAxis={null}
                topAxis={null}
                margin={{ top: 5, bottom: 0, left: 0, right: 0 }}
                sx={{
                    '.MuiAreaElement-root': {
                        fill: `url(#gradient-${chartColor.replace('#', '')})`,
                        fillOpacity: 1, // Handled by gradient
                    },
                    '.MuiLineElement-root': {
                        strokeWidth: 2,
                        stroke: chartColor,
                        filter: `drop-shadow(0 0 4px ${chartColor})`
                    }
                }}
            >
                <defs>
                    <linearGradient id={`gradient-${chartColor.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={chartColor} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={chartColor} stopOpacity={0.0} />
                    </linearGradient>
                </defs>
            </LineChart>
        </div>
    );
}
