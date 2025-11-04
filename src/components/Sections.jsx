import React, { useEffect, useRef } from 'react';

const placeholderArray = (len) => Array.from({ length: len }, (_, i) => i);

const useRevealOnView = (selector = '[data-reveal]') => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-6');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
};

const Card = () => (
  <div className="group relative aspect-[2/3] w-[180px] min-w-[180px] bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-colors">
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">Placeholder</div>
    <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-300 will-change-transform" />
    <div className="absolute -inset-0.5 rounded-xl bg-purple-500/0 group-hover:bg-purple-500/10 blur-xl transition-colors" />
  </div>
);

const GridItem = () => (
  <div className="group relative aspect-video w-full bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-indigo-400/50 transition-colors">
    <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">New Title</div>
    <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-300 will-change-transform" />
  </div>
);

const AnimeItem = () => (
  <div className="group flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-pink-400/50 transition-colors">
    <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10" />
    <div className="flex-1">
      <div className="h-3 w-40 bg-white/10 rounded mb-2" />
      <div className="h-2 w-24 bg-white/10 rounded" />
    </div>
  </div>
);

const GenreTile = ({ label }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-colors">
    <div className="p-8 h-40 flex items-end">
      <span className="text-white text-lg font-semibold">{label}</span>
    </div>
    <div className="absolute inset-0 group-hover:scale-105 transition-transform" />
  </div>
);

const Sections = () => {
  const containerRef = useRef(null);
  useRevealOnView();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        el.scrollLeft += e.deltaY * 0.8;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div id="content" className="bg-gradient-to-b from-black to-[#0b0b12] text-white">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">🔥 Trending Globally</h2>
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
        >
          {placeholderArray(10).map((i) => (
            <div key={i} data-reveal className="opacity-0 translate-y-6 transition-all duration-700 ease-out snap-start">
              <Card />
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">✨ New on AnyKan</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {placeholderArray(12).map((i) => (
            <div key={i} data-reveal className="opacity-0 translate-y-6 transition-all duration-700 ease-out">
              <GridItem />
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl bg-[#0f0f18] border border-white/10 p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">🍥 Anime & Manga Central</h2>
          <div className="space-y-4">
            {placeholderArray(6).map((i) => (
              <div key={i} data-reveal className="opacity-0 translate-y-6 transition-all duration-700 ease-out">
                <AnimeItem />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">🎭 Genres & Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Movies', 'Dramas', 'Anime'].map((g) => (
            <div key={g} data-reveal className="opacity-0 translate-y-6 transition-all duration-700 ease-out">
              <GenreTile label={g} />
            </div>
          ))}
        </div>
      </section>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white/50">
        Made with a love for smooth pixels. © AnyKan
      </footer>
    </div>
  );
};

export default Sections;
