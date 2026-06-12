import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useColorMode } from '../ColorModeContext';

export default function SettingsPage() {
  const containerRef = useRef();
  const { isLightMode, toggleMode } = useColorMode();

  useGSAP(() => {
    gsap.from(".settings-panel", {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in w-full ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className={`text-3xl font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Platform Settings</h2>
          <p className={`${isLightMode ? 'text-slate-500' : 'text-slate-400'} text-sm mt-1`}>Manage your account, telemetry, and scanning preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Account Info */}
        <div className="md:col-span-1 space-y-8">
          <div className={`settings-panel border rounded-[2rem] p-8 backdrop-blur-3xl transition-colors ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)]' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]'}`}>
            <h3 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-6">Authenticated Identity</h3>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-slate-600 to-slate-400 mb-4 shadow-lg flex items-center justify-center bg-[#04060f]">
                <span className="text-4xl">👨‍💻</span>
              </div>
              <h4 className={`text-xl font-bold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Local Administrator</h4>
              <p className={`text-sm mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>administrator@localhost</p>
              
              <div className="mt-4 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-semibold rounded-full uppercase tracking-widest">
                Local Environment
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preferences */}
        <div className="md:col-span-2 space-y-8">
          
          <div className={`settings-panel border rounded-[2rem] p-8 backdrop-blur-3xl transition-colors ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)]' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]'}`}>
            <h3 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Scan Configuration
            </h3>
            
            <div className="space-y-6">
              <div className={`flex items-center justify-between p-4 border rounded-2xl transition-colors ${isLightMode ? 'bg-white/40 border-slate-200' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                <div>
                  <h4 className={`font-medium ${isLightMode ? 'text-slate-800' : 'text-white'}`}>Deep Passive Scanning</h4>
                  <p className={`text-sm mt-0.5 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Utilize aggressive non-invasive heuristics on all scan targets.</p>
                </div>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm shadow-[0_0_10px_#fff]" />
                </div>
              </div>

              <div className={`flex items-center justify-between p-4 border rounded-2xl transition-colors opacity-70 ${isLightMode ? 'bg-white/40 border-slate-200' : 'bg-white/5 border-white/5'}`}>
                <div>
                  <h4 className={`font-medium ${isLightMode ? 'text-slate-800' : 'text-white'}`}>Email Alerts (Coming Soon)</h4>
                  <p className={`text-sm mt-0.5 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Receive PDF summaries directly to your local instance after critical severity scans.</p>
                </div>
                <div className="w-12 h-6 bg-slate-800 rounded-full relative shadow-inner">
                  <div className="w-5 h-5 bg-slate-500 rounded-full absolute left-0.5 top-0.5" />
                </div>
              </div>
            </div>
          </div>

          <div className={`settings-panel border rounded-[2rem] p-8 backdrop-blur-3xl transition-colors ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)]' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]'}`}>
            <h3 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              UI Appearance
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => isLightMode && toggleMode()}
                className={`p-4 border-2 rounded-2xl flex items-center justify-center cursor-pointer transition-colors ${!isLightMode ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-600'}`}
              >
                <span className={`font-bold tracking-wide ${!isLightMode ? 'text-white' : ''}`}>Dark Glass {!isLightMode && '(Active)'}</span>
              </div>
              <div 
                onClick={() => !isLightMode && toggleMode()}
                className={`p-4 border-2 rounded-2xl flex items-center justify-center cursor-pointer transition-colors ${isLightMode ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-400'}`}
              >
                <span className={`font-bold tracking-wide ${isLightMode ? 'text-indigo-600' : ''}`}>Light Mode {isLightMode && '(Active)'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
