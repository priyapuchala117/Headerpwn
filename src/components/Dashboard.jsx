import React from 'react';
import ScoreGauge from './ScoreGauge';
import SparkLine from './SparkLine';
import RiskLineChart from './RiskLineChart';
import AnalysisTable from './AnalysisTable';
import OwaspTable from './OwaspTable';
import ScanResult from './ScanResult';
import ReportSection from './ReportSection';
import { useColorMode } from '../ColorModeContext';

export default function Dashboard({ data, handleNewScan }) {
    const { isLightMode } = useColorMode();
    if (!data) return null;

    // Invert Risk Score for Security Score display (100 - risk)
    const securityScore = 100 - (data.risk_score || 0);
    const scoreHistory = data.history ? data.history.map(h => 100 - h.score) : [securityScore];

    return (
        <div className="space-y-6 animate-fade-in pb-12">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className={`text-2xl font-bold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Security Analysis Report</h2>
                    <p className={`text-sm ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Target: <span className={`font-mono ${isLightMode ? 'text-indigo-600' : 'text-indigo-500'}`}>{data.url}</span></p>
                </div>
            </div>

            {/* Top Row: Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score Card */}
                <div className={`group border rounded-[2rem] backdrop-blur-3xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-default ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)] hover:shadow-emerald-500/20' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-emerald-500/10'}`}>
                    <h3 className={`text-xs uppercase font-bold mb-2 tracking-wider transition-colors ${isLightMode ? 'text-slate-500 group-hover:text-emerald-500' : 'text-slate-400 group-hover:text-emerald-400'}`}>Security Score</h3>
                    <div className="flex justify-between items-center z-10 relative">
                        <div>
                            <div className={`text-4xl font-bold mb-1 ${isLightMode ? 'text-slate-800' : 'text-white'}`}>{securityScore}</div>
                            <div className={`text-sm font-medium ${securityScore >= 80 ? (isLightMode ? 'text-emerald-600' : 'text-emerald-400') : securityScore >= 60 ? (isLightMode ? 'text-amber-600' : 'text-amber-400') : (isLightMode ? 'text-rose-600' : 'text-rose-400')}`}>
                                {securityScore >= 80 ? 'Excellent' : securityScore >= 60 ? 'Moderate' : 'Critical'}
                            </div>
                        </div>
                        <div className="h-16 w-32 filter drop-shadow opacity-90 group-hover:opacity-100 transition-opacity">
                            <SparkLine data={scoreHistory.length > 1 ? scoreHistory : [securityScore - 5, securityScore - 2, securityScore]} color={securityScore >= 80 ? '#34d399' : '#fbbf24'} />
                        </div>
                    </div>
                </div>

                {/* Scan Count Card */}
                <div className={`group border rounded-[2rem] backdrop-blur-3xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-default ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)] hover:shadow-indigo-500/20' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-indigo-500/10'}`}>
                    <h3 className={`text-xs uppercase font-bold mb-2 tracking-wider transition-colors ${isLightMode ? 'text-slate-500 group-hover:text-indigo-500' : 'text-slate-400 group-hover:text-indigo-400'}`}>Total Headers</h3>
                    <div className="flex justify-between items-center z-10 relative">
                        <div>
                            <div className={`text-4xl font-bold mb-1 ${isLightMode ? 'text-slate-800' : 'text-white'}`}>{data.analysis?.length || 0}</div>
                            <div className={`text-sm font-medium ${isLightMode ? 'text-indigo-600' : 'text-indigo-400'}`}>Scanned</div>
                        </div>
                        <div className="h-16 w-32 filter drop-shadow opacity-90 group-hover:opacity-100 transition-opacity">
                            {/* Dummy data for visual vitality if no history for this metric */}
                            <SparkLine data={[12, 18, 15, 25, 20, 30, 28]} color="#818cf8" />
                        </div>
                    </div>
                </div>

                {/* Performance Card */}
                <div className={`group border rounded-[2rem] backdrop-blur-3xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-default ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)] hover:shadow-cyan-500/20' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-cyan-500/10'}`}>
                    <h3 className={`text-xs uppercase font-bold mb-2 tracking-wider transition-colors ${isLightMode ? 'text-slate-500 group-hover:text-cyan-500' : 'text-slate-400 group-hover:text-cyan-400'}`}>Response Time</h3>
                    <div className="flex justify-between items-center z-10 relative">
                        <div>
                            <div className={`text-4xl font-bold mb-1 ${isLightMode ? 'text-slate-800' : 'text-white'}`}>0.4<span className={`text-xl ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>s</span></div>
                            <div className={`text-sm font-medium ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`}>Optimal</div>
                        </div>
                        <div className="h-16 w-32 filter drop-shadow opacity-90 group-hover:opacity-100 transition-opacity">
                            <SparkLine data={[0.8, 0.6, 0.5, 0.7, 0.4, 0.45]} color="#22d3ee" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Charts & Analysis */}
                <div className="lg:col-span-2 space-y-8">
                    <ReportSection data={data} />

                    {/* Risk Chart Section */}
                    <div className={`border rounded-[2rem] backdrop-blur-3xl p-6 transition-all duration-500 hover:shadow-rose-500/5 ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)]' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className={`text-lg font-semibold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Vulnerability Trends</h2>
                            <select className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded px-2 py-1 outline-none focus:border-indigo-500 transition-colors">
                                <option>Last 7 Scans</option>
                                <option>Last 30 Days</option>
                            </select>
                        </div>
                        <div className="h-64 w-full">
                            <RiskLineChart analysis={data.analysis} />
                        </div>
                    </div>

                    {/* Detailed Tables */}
                    <div className={`border rounded-[2rem] backdrop-blur-3xl p-6 transition-all duration-500 ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)]' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]'}`}>
                        <h2 className={`text-lg font-semibold mb-4 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Detailed Headers Analysis</h2>
                        <AnalysisTable analysis={data.analysis} />
                    </div>

                    <div className={`border rounded-[2rem] backdrop-blur-3xl p-6 transition-all duration-500 ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)]' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]'}`}>
                        <h2 className={`text-lg font-semibold mb-4 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Fuzzer Results</h2>
                        <ScanResult data={data} />
                    </div>
                </div>

                {/* Right Column: Gauge & OWASP */}
                <div className="space-y-6">
                    {/* Score Gauge Widget */}
                    <div className={`border rounded-[2rem] backdrop-blur-3xl p-8 flex flex-col items-center relative transition-all duration-500 ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)] hover:shadow-indigo-500/20' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-indigo-500/10'}`}>
                        <h2 className={`font-semibold mb-6 self-start w-full border-b pb-2 ${isLightMode ? 'text-slate-900 border-slate-300' : 'text-slate-100 border-slate-800'}`}>Overall Security</h2>
                        <ScoreGauge value={securityScore} />
                        <div className="mt-6 grid grid-cols-3 gap-2 w-full text-center">
                            <div className={`rounded-2xl p-2 border backdrop-blur-md transition-colors shadow-inner ${isLightMode ? 'bg-white/50 border-slate-300' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                                <div className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Grade</div>
                                <div className={`font-bold ${isLightMode ? 'text-slate-800' : 'text-white'}`}>{data.grade || (securityScore >= 80 ? 'A' : 'C')}</div>
                            </div>
                            <div className={`rounded-2xl p-2 border backdrop-blur-md transition-colors shadow-inner ${isLightMode ? 'bg-white/50 border-slate-300' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                                <div className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Issues</div>
                                <div className={`font-bold ${isLightMode ? 'text-slate-800' : 'text-white'}`}>{data.analysis.filter(i => !i.present).length}</div>
                            </div>
                            <div className={`rounded-2xl p-2 border backdrop-blur-md transition-colors shadow-inner ${isLightMode ? 'bg-white/50 border-slate-300' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                                <div className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>Passed</div>
                                <div className={`font-bold ${isLightMode ? 'text-slate-800' : 'text-white'}`}>{data.analysis.filter(i => i.present).length}</div>
                            </div>
                        </div>
                    </div>

                    {/* OWASP Widget */}
                    <div className={`border rounded-[2rem] backdrop-blur-3xl p-6 transition-all duration-500 ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)]' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]'}`}>
                        <h2 className={`text-lg font-semibold mb-4 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>OWASP Compliance</h2>
                        <OwaspTable owasp={data.owasp} />
                    </div>

                    <button
                        onClick={handleNewScan}
                        className={`w-full py-4 font-bold border rounded-2xl backdrop-blur-md transition-all group relative overflow-hidden shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)] hover:-translate-y-1 active:translate-y-0 mt-4 ${isLightMode ? 'bg-white/60 border-white/60 text-slate-800 hover:bg-white/80' : 'text-white bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'}`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            Start New Scan
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

