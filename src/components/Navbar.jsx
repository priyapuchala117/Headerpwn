import React from 'react';
import { useColorMode } from '../ColorModeContext';

export default function Navbar({ onNavigate, onNewScan }) {
    const { isLightMode } = useColorMode();
    return (
        <nav className={`px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl transition-colors ${isLightMode ? 'bg-white/40 border-b border-slate-200' : 'bg-white/[0.02] border-b border-white/10'}`}>
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                <span className="text-2xl">🛡️</span>
                <div>
                    <h1 className={`text-xl font-bold tracking-wide ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>Headerpwn</h1>
                    <p className={`text-xs font-medium ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Security Header Analysis</p>
                </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
                <button
                    onClick={onNewScan}
                    className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-[11px] font-bold py-1.5 px-4 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_20px_rgba(79,70,229,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-1.5 tracking-wide border border-white/10 uppercase"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Scan
                </button>
                <button onClick={() => onNavigate('dashboard')} className={`text-sm font-medium transition-colors hover:text-indigo-500 ${isLightMode ? 'text-slate-600' : 'text-slate-300 hover:text-indigo-400'}`}>Dashboard</button>
                <button onClick={() => onNavigate('history')} className={`text-sm font-medium transition-colors hover:text-indigo-500 ${isLightMode ? 'text-slate-600' : 'text-slate-300 hover:text-indigo-400'}`}>History</button>
                <button onClick={() => onNavigate('settings')} className={`text-sm font-medium transition-colors hover:text-indigo-500 ${isLightMode ? 'text-slate-600' : 'text-slate-300 hover:text-indigo-400'}`} title="Settings">
                    Settings
                </button>
            </div>
        </nav>
    );
}
