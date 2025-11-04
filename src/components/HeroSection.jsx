import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

const HeroSection = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const translate = Math.min(y * 0.15, 60);
      const blur = Math.min(y * 0.02, 6);
      if (titleRef.current) {
        titleRef.current.style.transform = `translate3d(0, ${translate}px, 0)`;
        titleRef.current.style.filter = `blur(${blur}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/10 to-black" />

      <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-center text-white">
        <div ref={titleRef} className="transition-transform duration-300 will-change-transform">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            AnyKan: Watch Anything. Everywhere.
          </h1>
          <p className="mt-4 max-w-xl text-white/70 text-base sm:text-lg">
            A cinematic streaming experience built for speed, style, and total immersion.
          </p>
          <div className="mt-8">
            <a
              href="#content"
              className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white px-7 py-3 text-sm sm:text-base font-semibold shadow-lg shadow-purple-900/40 hover:shadow-purple-800/50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400/60"
            >
              Start Watching
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
