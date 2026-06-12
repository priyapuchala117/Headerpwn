import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader = ({ onComplete }) => {
  const containerRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.1,
          filter: "blur(20px)",
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: onComplete
        });
      }
    });

    // Bring everything in
    gsap.set(".loader-ring", { scale: 0, opacity: 0 });
    gsap.set(".loader-text", { opacity: 0, y: 10 });
    gsap.set(".loader-bar", { width: "0%" });

    tl.to(".loader-ring", {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.5)"
    })
    .to(".loader-text", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.5")
    .to(".loader-bar", {
      width: "100%",
      duration: 1.5,
      ease: "power3.inOut"
    }, "-=0.2");

    // Continuous pulse for the loader ring
    gsap.to(".loader-pulse", {
      scale: 1.2,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: "power2.out"
    });

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#04060f] font-sans"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-600/20 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Loading Ring */}
        <div className="loader-ring relative w-24 h-24 flex items-center justify-center">
          <div className="loader-pulse absolute inset-0 rounded-full border-2 border-indigo-500/50" />
          <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
          <div className="absolute inset-0 rounded-full border-4 border-t-indigo-400 border-l-cyan-400 border-r-transparent border-b-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
            <svg className="w-8 h-8 text-cyan-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
        </div>

        {/* Text & Bar */}
        <div className="loader-text flex flex-col items-center gap-4">
          <h2 className="text-xl font-medium tracking-widest text-slate-200 uppercase">
            Authenticating
            <span className="inline-block animate-bounce ml-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">...</span>
          </h2>
          <div className="w-64 h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
            <div className="loader-bar absolute top-0 left-0 bottom-0 bg-gradient-to-r from-indigo-500 rounded-full to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
