import React from 'react';

export default function ReportSection({ data }) {
    if (!data) return null;

    const highRiskHeaders = data.analysis.filter(h => h.severity.toLowerCase() === 'high' && !h.present);
    const medRiskHeaders = data.analysis.filter(h => h.severity.toLowerCase() === 'medium' && !h.present);

    const highRiskCount = highRiskHeaders.length;
    const medRiskCount = medRiskHeaders.length;

    // Convert Risk Score (0=Good, 100=Bad) to Security Score (100=Good, 0=Bad)
    const overallScore = 100 - (data.risk_score || 0);

    let grade = 'A';
    let color = 'text-emerald-400';

    if (overallScore < 40) { grade = 'F'; color = 'text-rose-500'; }
    else if (overallScore < 60) { grade = 'D'; color = 'text-orange-500'; }
    else if (overallScore < 70) { grade = 'C'; color = 'text-amber-400'; }
    else if (overallScore < 80) { grade = 'B'; color = 'text-blue-400'; }

    return (
        <div className="card-panel relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl select-none group-hover:scale-110 transition-transform duration-500">
                {grade}
            </div>

            <h2 className="text-xl text-primary mb-4 font-semibold relative z-10">Scan Summary Report</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div>
                    <div className="flex items-baseline space-x-4 mb-2">
                        <span className={`text-6xl font-bold ${color}`}>{grade}</span>
                        <span className="text-2xl text-slate-300 font-medium">Grade</span>
                    </div>
                    <div className="text-slate-300 text-sm leading-relaxed mb-4 font-medium">
                        This target has a security score of <span className="text-white font-bold text-lg">{overallScore}/100</span>.
                        We identified:
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            {highRiskCount > 0 && (
                                <li>
                                    <span className="text-rose-400 font-bold">{highRiskCount} critical</span> missing: <span className="text-slate-200 italic">{highRiskHeaders.map(h => h.header).join(', ')}</span>
                                </li>
                            )}
                            {medRiskCount > 0 && (
                                <li>
                                    <span className="text-amber-400 font-bold">{medRiskCount} medium</span> missing: <span className="text-slate-200 italic">{medRiskHeaders.map(h => h.header).join(', ')}</span>
                                </li>
                            )}
                            {highRiskCount === 0 && medRiskCount === 0 && (
                                <li className="text-emerald-400 font-bold">No critical or medium vulnerabilities found.</li>
                            )}
                        </ul>
                    </div>
                    <button
                        onClick={async () => {
                            try {
                                const response = await fetch('http://localhost:8000/api/scan/report', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data)
                                });
                                const blob = await response.blob();
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = "Headerpwn_Report.pdf";
                                document.body.appendChild(a);
                                a.click();
                                a.remove();
                            } catch (error) {
                                console.error("Download failed", error);
                                alert("Failed to download report");
                            }
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        <span>Download PDF Report</span>
                    </button>
                </div>

                <div className="space-y-3 border-l border-slate-700 pl-6">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                        {['A', 'B'].includes(grade) ? "Security Recommendations" : "Top Priority Fixes"}
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-300">
                        {highRiskHeaders.slice(0, 3).map((h, i) => (
                            <li key={i} className="flex items-start space-x-2">
                                <span className="text-rose-500 mt-1 text-lg">●</span>
                                <span>Add <strong className="text-white">{h.header}</strong>: {h.recommendation || "See detailed table."}</span>
                            </li>
                        ))}
                        {medRiskHeaders.slice(0, 2).map((h, i) => (
                            <li key={i} className="flex items-start space-x-2">
                                <span className="text-amber-500 mt-1 text-lg">●</span>
                                <span>Add <strong className="text-white">{h.header}</strong>.</span>
                            </li>
                        ))}
                        {highRiskCount === 0 && medRiskCount === 0 && (
                            <li className="text-emerald-400 flex items-center font-bold">
                                <span className="mr-2 text-xl">✓</span> All major headers present. Good job!
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
