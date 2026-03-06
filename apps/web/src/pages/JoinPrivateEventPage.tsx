import { useState } from 'react';

export const JoinPrivateEventPage = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const [code, setCode] = useState('');

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6 shadow-2xl shadow-primary/10">
            <span className="material-symbols-outlined text-4xl">key</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Join Private Event</h2>
          <p className="text-slate-500 max-w-sm mx-auto">Enter the unique 6-digit code provided by the organizer to access hidden events.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">Event Invite Code</label>
              <input 
                type="text" 
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="000000"
                className="w-full text-center text-4xl font-extrabold tracking-[0.5em] py-6 border-2 border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-200 dark:placeholder:text-slate-700"
              />
            </div>
            
            <button 
              disabled={code.length < 6}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${
                code.length === 6 
                  ? 'bg-primary text-white shadow-primary/30 hover:opacity-90 hover:-translate-y-1' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              Verify Code
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span className="material-symbols-outlined text-sm">info</span>
            Don't have a code? Contact the event organizer.
          </div>
          <button 
            onClick={() => onNavigate('home')}
            className="text-primary font-bold hover:underline"
          >
            Go back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
