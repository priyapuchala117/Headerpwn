import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const IntroPage = ({ onEnterApp }) => {
  const containerRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    // Reset initial states
    gsap.set(".hero-text", { y: 50, opacity: 0 });
    gsap.set(".glass-card", { scale: 0.9, opacity: 0, y: 20 });
    gsap.set(".orb", { scale: 0, opacity: 0 });
    gsap.set(".cta-btn", { opacity: 0, y: 20 });

    // Animate glowing orbs in the background
    tl.to(".orb", {
      scale: 1,
      opacity: 0.6,
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Stagger in the typography
    tl.to(".hero-text", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: "expo.out",
    }, "-=1");

    // Pop in the aesthetic glass cards
    tl.to(".glass-card", {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.6");

    // Fade in CTA button
    tl.to(".cta-btn", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    }, "-=0.4");

    // Continuous floating animation for orbs
    gsap.to(".orb-1", {
      y: "-=30",
      x: "+=20",
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    gsap.to(".orb-2", {
      y: "+=40",
      x: "-=30",
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  const handleEnterClick = () => {
    // Exit animation before going to dashboard
    gsap.to(containerRef.current, {
      opacity: 0,
      filter: "blur(20px)",
      scale: 1.05,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: onEnterApp
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#020617] flex items-center justify-center font-sans"
    >
      {/* Background Orbs */}
      <div className="orb orb-1 absolute top-[20%] left-[15%] w-72 h-72 rounded-full bg-indigo-600/40 blur-[100px] pointer-events-none" />
      <div className="orb orb-2 absolute bottom-[10%] right-[15%] w-96 h-96 rounded-full bg-cyan-600/30 blur-[120px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* Left Side: Typography & CTA */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block hero-text mb-4 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md">
            <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">Next-Gen Intelligence</span>
          </div>

          <h1 className="hero-text text-6xl md:text-8xl font-black mb-6 text-slate-100 leading-tight tracking-tight">
            Header<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">pwn</span>
          </h1>

          <p className="hero-text text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
            Unleash the ultimate security header analysis. Scan, discover, and harden your web architecture effortlessly.
          </p>

          <button
            onClick={handleEnterClick}
            className="cta-btn group relative px-8 py-4 bg-indigo-600 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(79,70,229,0.8)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              Initialize Platform
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

        {/* Right Side: Glassmorphic Features */}
        <div className="flex-1 w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col justify-between sm:translate-y-8">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 border border-indigo-500/30">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">Deep Scanning</h3>
              <p className="text-slate-400 text-sm">Real-time heuristics to detect misconfigurations and vulnerabilities.</p>
            </div>
          </div>

          <div className="glass-card bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6 border border-cyan-500/30 relative z-10">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-200 mb-2">Lightning Fast</h3>
              <p className="text-slate-400 text-sm">Powered by modern async infrastructure for ultra-low latency.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IntroPage;
