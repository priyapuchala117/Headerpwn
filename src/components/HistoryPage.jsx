import React from 'react';
import { useColorMode } from '../ColorModeContext';

export default function HistoryPage({ history, onLoadReport, onDeleteHistory }) {
    const { isLightMode } = useColorMode();
    if (!history || history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                <p>No scan history available yet.</p>
                <p className="text-sm">Run a scan to see it here.</p>
            </div>
        );
    }

    // Sort by date descending
    const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>Scan History</h2>
            <div className={`card-panel overflow-hidden border rounded-[2rem] backdrop-blur-3xl transition-colors shadow-2xl ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)]' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]'}`}>
                <div className="overflow-x-auto">
                    <table className={`w-full text-left text-sm ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        <thead className={`uppercase text-xs font-semibold ${isLightMode ? 'bg-slate-200/50 text-slate-700' : 'bg-slate-900 text-slate-300'}`}>
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Target URL</th>
                                <th className="px-6 py-4">Score</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isLightMode ? 'divide-slate-200' : 'divide-slate-800'}`}>
                            {sortedHistory.map((scan, index) => (
                                <tr key={index} className={`transition-colors ${isLightMode ? 'hover:bg-white/50' : 'hover:bg-slate-800/50'}`}>
                                    <td className="px-6 py-4">{new Date(scan.date).toLocaleString()}</td>
                                    <td className={`px-6 py-4 font-mono ${isLightMode ? 'text-indigo-600' : 'text-indigo-400'}`}>{scan.url}</td>
                                    <td className="px-6 py-4">
                                        <span className={`font-bold ${100 - (scan.score || 0) >= 80 ? 'text-emerald-500' : 100 - (scan.score || 0) >= 60 ? 'text-amber-500' : 'text-rose-500'}`}>
                                            {100 - (scan.score || 0)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-4">
                                        <button
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                try {
                                                    const response = await fetch('http://localhost:8000/api/scan/report', {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify(scan)
                                                    });
                                                    const blob = await response.blob();
                                                    const url = window.URL.createObjectURL(blob);
                                                    const a = document.createElement('a');
                                                    a.href = url;
                                                    a.download = `Headerpwn_Report_${scan.url}.pdf`;
                                                    document.body.appendChild(a);
                                                    a.click();
                                                    a.remove();
                                                } catch (error) {
                                                    console.error("Download failed", error);
                                                    alert("Failed to download PDF");
                                                }
                                            }}
                                            className="text-slate-400 hover:text-indigo-400 transition-colors"
                                            title="Download PDF"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                        </button>
                                        <button
                                            onClick={() => onLoadReport(scan)}
                                            className="text-indigo-400 hover:text-white font-medium hover:underline"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={(e) => onDeleteHistory(e, scan)}
                                            className="text-slate-500 hover:text-red-500 transition-colors"
                                            title="Delete Scan"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
