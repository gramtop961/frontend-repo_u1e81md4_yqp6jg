import React from 'react';
import { Home, Search, ListVideo, User } from 'lucide-react';

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-black/70 backdrop-blur border-t border-white/10">
      <div className="grid grid-cols-4 h-16 text-white">
        {[
          { icon: Home, label: 'Home' },
          { icon: Search, label: 'Search' },
          { icon: ListVideo, label: 'My List' },
          { icon: User, label: 'Profile' },
        ].map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-center justify-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
