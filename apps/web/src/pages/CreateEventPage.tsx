import { useState } from 'react';

export const CreateEventPage = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const [eventType, setEventType] = useState<'public' | 'private'>('public');

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-12">
        <button 
          onClick={() => onNavigate('home')}
          className="text-primary font-bold flex items-center gap-1 mb-4 hover:underline"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Dashboard
        </button>
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Create New Event</h2>
        <p className="text-slate-500 mt-2">Fill in the details below to launch your next experience.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Form */}
        <div className="md:col-span-2 space-y-8">
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
              Event Type
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setEventType('public')}
                className={`p-6 rounded-[2rem] border-2 text-left transition-all ${
                  eventType === 'public' ? 'border-primary bg-primary/5 shadow-xl shadow-primary/5' : 'border-slate-100 dark:border-slate-800'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary mb-4 shadow-sm">
                  <span className="material-symbols-outlined">public</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">Public Event</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">Discovery-based, paid entry via location mapping.</p>
              </button>
              <button 
                onClick={() => setEventType('private')}
                className={`p-6 rounded-[2rem] border-2 text-left transition-all ${
                  eventType === 'private' ? 'border-primary bg-primary/5 shadow-xl shadow-primary/5' : 'border-slate-100 dark:border-slate-800'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary mb-4 shadow-sm">
                  <span className="material-symbols-outlined">vpn_lock</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">Private Event</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">Hidden from search, code-based invite only.</p>
              </button>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
              General Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Event Title</label>
                <input className="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-primary transition-all text-sm" placeholder="e.g. Summer Music Festival 2026" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Date</label>
                  <input type="date" className="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-primary transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Location</label>
                  <input className="w-full px-6 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-primary transition-all text-sm" placeholder="City name" />
                </div>
              </div>
            </div>
          </section>

          <button 
            className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-2xl hover:opacity-90 transition-all uppercase tracking-widest text-sm"
          >
            Launch Event
          </button>
        </div>

        {/* Preview / Info */}
        <div className="space-y-6">
          <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary/30">
            <h4 className="font-bold text-xl mb-4">Pro Tip</h4>
            <p className="text-sm opacity-90 leading-relaxed mb-6">
              {eventType === 'public' 
                ? "Public events will be visible to everyone in your city. Make sure your banner image is high quality to attract more attendees!"
                : "Private events generate a unique 6-digit code. You'll need to share this code manually with your invitees."}
            </p>
            <div className="pt-6 border-t border-white/20">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">verified</span>
                Verified Host
              </div>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
             <span className="material-symbols-outlined text-slate-300 text-4xl mb-4">image</span>
             <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">Visual Branding</p>
             <p className="text-xs text-slate-500 mb-6">Upload a key visual for your event. 16:9 aspect ratio recommended.</p>
             <button className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-500 hover:border-primary hover:text-primary transition-all">
               Select Image
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
