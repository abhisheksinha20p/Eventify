import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 w-full glass-header border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-2xl">confirmation_number</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Eventify</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Browse Events</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Host an Event</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Pricing</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-primary/5 rounded-lg transition-all">Log In</button>
          <button className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">Sign Up</button>
        </div>
      </div>
    </header>
  );
};
