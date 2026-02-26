import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        data-alt="Vibrant concert crowd with colorful stage lighting" 
        style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIWhY0DtCABLEtiIU00i_ds6LusrlM0P2CmpOPuvMXCxNs8uA8HX0sM_bWDAjQdXSjL5N2N2bGsqWtZ0vTFSkWHx9105-fKrjF9FUi-hXXA5tTG8Y7kwxgxlYAljFxc06GYygDOJplXjxQm3K60EK3aGoGeCJobUvZEdPkKbwl8yRIPWJuqZFTlBVup68TZDP9zrr6YbU8TC9S0LE3x8FpcoU-SOnicVZw8JIzxva-Rvol5IHY3t1PPhohcB9gJ17kAgb6YG556PE')"}}
      ></div>
      <div className="absolute inset-0 hero-gradient"></div>
      
      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8 tracking-tighter">
            Discover Your Next <span className="text-primary">Unforgettable</span> Experience.
        </h2>
        
        <div className="w-full bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
          
          <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
            <span className="material-symbols-outlined text-primary/60">search</span>
            <input className="w-full border-0 bg-transparent focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none" placeholder="Keyword" type="text"/>
          </div>
          
          <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
            <span className="material-symbols-outlined text-primary/60">location_on</span>
            <input className="w-full border-0 bg-transparent focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none" placeholder="Location" type="text"/>
          </div>
          
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <span className="material-symbols-outlined text-primary/60">calendar_month</span>
            <input className="w-full border-0 bg-transparent focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none" placeholder="Date" type="text"/>
          </div>
          
          <button className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity">
            Search
          </button>
          
        </div>
      </div>
    </section>
  );
};
