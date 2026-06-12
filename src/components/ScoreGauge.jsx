import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ScoreGauge({ value }) {
    const [displayValue, setDisplayValue] = useState(0);

    useGSAP(() => {
        const tracker = { val: 0 };
        gsap.to(tracker, {
            val: value,
            duration: 2,
            ease: "elastic.out(1, 0.5)",
            onUpdate: () => {
                setDisplayValue(Math.round(tracker.val));
            }
        });
    }, [value]);

    // Color based on score
    const getColor = (v) => {
        if (v >= 80) return '#34d399'; // Emerald-400
        if (v >= 50) return '#fbbf24'; // Amber-400
        return '#f43f5e'; // Rose-500
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 relative">
            {/* Glow effect background */}
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />

            <div className="relative w-64 h-40">
                <Gauge
                    value={displayValue}
                    startAngle={-90}
                    endAngle={90}
                    innerRadius="75%"
                    outerRadius="100%"
                    sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 48,
                            fontWeight: 900,
                            fill: '#ffffff',
                            transform: 'translate(0px, -10px)',
                            fontFamily: '"Inter", sans-serif',
                            filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))'
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                            fill: getColor(displayValue),
                            filter: `drop-shadow(0 0 10px ${getColor(displayValue)})` // Glowing arc
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                            fill: '#1e293b', // Slate-800
                        },
                    }}
                    text={
                        ({ value }) => `${value}%`
                    }
                />
                {/* Decorative ticks or elements could go here if using SVG overlays */}
            </div>
        </div>
    );
}
