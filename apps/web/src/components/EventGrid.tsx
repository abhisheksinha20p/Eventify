import React from 'react';
import { mockCategories, mockEvents } from '../data/mockData';

export const EventGrid: React.FC = () => {
  const featuredEvents = mockEvents.filter(e => e.isFeatured);
  const upcomingEvents = mockEvents.filter(e => !e.isFeatured);

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-12 overflow-x-auto">
        <div className="flex items-center gap-4 min-w-max pb-4">
          {mockCategories.map((category, idx) => (
            <div 
              key={idx} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium ${
                category.active 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:border-primary transition-colors cursor-pointer'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-3xl font-bold mb-2">Featured Experiences</h3>
            <p className="text-slate-500">Hand-picked premium events just for you.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:underline">
            View Gallery <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <div key={event.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  data-alt={event.alt} 
                  src={event.image} 
                  alt={event.title}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1 text-xs font-bold text-slate-900">
                  {event.tag}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{event.date}</span>
                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{event.title}</h4>
                <p className="text-slate-500 text-sm">{event.location}</p>
                <p className="text-lg font-bold mt-2">{event.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary/5 dark:bg-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h3 className="text-4xl font-extrabold mb-4">Upcoming Events</h3>
            <p className="text-slate-500 max-w-xl">Don't miss out on these trending activities happening soon in your area.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-800 group">
                <div className="relative h-56">
                  <img 
                    className="w-full h-full object-cover" 
                    data-alt={event.alt} 
                    src={event.image} 
                    alt={event.title}
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-primary">{event.date}</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{event.price.replace('From ', '')}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h4>
                  <p className="text-slate-500 text-sm mb-4">{event.location}</p>
                  <button className="w-full py-3 rounded-lg border-2 border-primary/20 text-primary font-bold hover:bg-primary hover:text-white transition-all">
                    Get Tickets
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-16">
            <button className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl">
              Load More Events
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
