import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import HeroSection from './components/HeroSection';
import Sections from './components/Sections';

// Smooth scrolling container using a virtual scroll with rAF for buttery motion.
const App = () => {
  const contentRef = useRef(null);
  const spacerRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Disable custom smooth scroll on reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnabled(!mq.matches);
    const listener = () => setEnabled(!mq.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  useLayoutEffect(() => {
    const content = contentRef.current;
    const spacer = spacerRef.current;
    if (!content || !spacer) return;

    let target = window.scrollY;
    let current = target;
    let rafId = 0;

    const setHeights = () => {
      spacer.style.height = `${content.getBoundingClientRect().height}px`;
    };

    const onResize = () => setHeights();

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const animate = () => {
      target = window.scrollY;
      current = lerp(current, target, 0.12);
      content.style.transform = `translate3d(0, ${-current}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    setHeights();
    const ro = new ResizeObserver(setHeights);
    ro.observe(content);

    if (enabled) {
      rafId = requestAnimationFrame(animate);
      document.body.style.overflowY = 'scroll';
    } else {
      content.style.transform = 'none';
    }

    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [enabled]);

  return (
    <div className="bg-black text-white">
      <Navbar />

      {/* Smooth scroll layers */}
      <div ref={spacerRef} aria-hidden className="pointer-events-none" />
      <div className="fixed inset-0 overflow-hidden will-change-transform">
        <main ref={contentRef}>
          <HeroSection />
          <Sections />
          <div className="h-24 md:h-0" />
        </main>
      </div>

      {/* Mobile only bottom nav */}
      <MobileNav />
    </div>
  );
};

export default App;
