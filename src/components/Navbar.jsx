import React from 'react';
import { Search, Film } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Film className="w-6 h-6 text-purple-400" />
          <span className="font-semibold tracking-wide">AnyKan</span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search titles, people, genres"
              className="w-[320px] rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder-white/40 px-4 py-2 pl-10 outline-none focus:border-purple-400/60 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
