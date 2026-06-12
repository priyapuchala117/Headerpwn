import { useState, useEffect, useRef } from "react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import HeaderForm from "./components/HeaderForm";
import Dashboard from "./components/Dashboard"; // New Dashboard Component
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HistoryPage from "./components/HistoryPage";
import IntroPage from "./components/IntroPage";
import Loader from "./components/Loader";
import SettingsPage from "./components/SettingsPage";
import { useColorMode } from "./ColorModeContext";

// CustomCursor removed
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function App() {
  const { isLightMode } = useColorMode();
  const [data, setData] = useState(null);
  const [view, setView] = useState("intro"); // Initial view
  const [history, setHistory] = useState([]);

  const containerRef = useRef();

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem("scanHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // GSAP Animations
  useGSAP(() => {
    if (view === 'dashboard' && !data) {
      // Intro Animation
      gsap.from(".intro-text", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from(".intro-card", { y: 50, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });
    }
  }, [view, data]);

  // Save scan to history
  const handleScanResult = (result) => {
    const newScan = { ...result, date: new Date().toISOString(), score: result.risk_score };
    setData(newScan);

    // Add to history and save
    const updatedHistory = [...history, newScan];
    setHistory(updatedHistory);
    localStorage.setItem("scanHistory", JSON.stringify(updatedHistory));

    // Ensure we are on dashboard
    setView("dashboard");
  };

  const loadFromHistory = (scan) => {
    setData(scan);
    setView("dashboard");
  };

  const handleNewScan = () => {
    setData(null);
    setView("dashboard");
  };

  const handleDeleteHistory = (e, scanToDelete) => {
    e.stopPropagation();
    const updatedHistory = history.filter(scan => scan.date !== scanToDelete.date);
    setHistory(updatedHistory);
    localStorage.setItem("scanHistory", JSON.stringify(updatedHistory));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {view === 'intro' ? (
        <IntroPage onEnterApp={() => setView('loading')} />
      ) : view === 'loading' ? (
        <Loader onComplete={() => setView('dashboard')} />
      ) : (
        <div ref={containerRef} className={`relative min-h-screen flex flex-col font-sans overflow-hidden transition-colors duration-500 ${isLightMode ? 'bg-[#f8fafc] text-slate-800' : 'bg-[#04060f] text-slate-200'}`}>
          {/* Global Liquid Background Orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className={`absolute top-[10%] left-[20%] w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-indigo-600/40 to-purple-600/20 blur-[120px] mix-blend-screen ${isLightMode ? 'mix-blend-multiply opacity-50' : ''}`} />
            <div className={`absolute bottom-[10%] right-[15%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-bl from-cyan-600/30 to-blue-500/20 blur-[150px] mix-blend-screen ${isLightMode ? 'mix-blend-multiply opacity-50' : ''}`} />
          </div>

          <div className="relative z-10 flex flex-col flex-grow">
            {/* CustomCursor removed */}
            <Navbar onNavigate={setView} onNewScan={handleNewScan} activeView={view} />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">

              {/* DASHBOARD VIEW */}
              {view === 'dashboard' && (
                <>
                  {!data ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12">
                      <div className="text-center intro-text">
                        <h1 className={`text-5xl md:text-6xl mb-6 font-bold text-transparent bg-clip-text drop-shadow-sm ${isLightMode ? 'bg-gradient-to-r from-indigo-600 to-cyan-600' : 'bg-gradient-to-r from-indigo-300 to-cyan-300'}`}>
                          Headerpwn
                        </h1>
                        <p className={`text-lg max-w-2xl mx-auto font-light ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                          The next-generation security header analysis platform.
                        </p>
                      </div>

                      <div className="w-full max-w-xl z-10 intro-card">
                        <div className={`card-panel p-8 rounded-[2rem] backdrop-blur-3xl border relative overflow-hidden transition-colors shadow-2xl ${isLightMode ? 'bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(100,116,139,0.15)]' : 'bg-white/[0.03] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]'}`}>
                          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 ${isLightMode ? 'bg-indigo-300/40' : 'bg-indigo-500/20'}`} />
                          <HeaderForm onResult={handleScanResult} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Dashboard data={data} handleNewScan={handleNewScan} />
                  )}
                </>
              )}

              {/* HISTORY VIEW */}
              {view === "history" && (
                <HistoryPage history={history} onLoadReport={loadFromHistory} onDeleteHistory={handleDeleteHistory} />
              )}

              {/* SETTINGS VIEW */}
              {view === "settings" && (
                <SettingsPage />
              )}

            </main>

            <Footer />
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
