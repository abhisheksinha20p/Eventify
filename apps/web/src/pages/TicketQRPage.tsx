export const TicketQRPage = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
        {/* Animated Background Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        
        <header className="mb-8">
          <button 
            onClick={() => onNavigate('tickets')}
            className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Your Entry Pass</h2>
          <p className="text-sm text-slate-500 mt-1">Scan this code at the venue entrance</p>
        </header>

        <div className="relative mb-10 inline-block p-6 bg-white rounded-3xl shadow-inner border-4 border-slate-50">
          <div className="w-64 h-64 bg-slate-950 rounded-2xl flex flex-col items-center justify-center gap-4 text-white overflow-hidden relative group">
            <span className="material-symbols-outlined text-8xl opacity-10 group-hover:scale-150 transition-transform duration-1000">qr_code_2</span>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950">
               {/* Real QR would go here */}
               <img 
                 src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EVENTIFY-TICKET-SECURE-ID-12345" 
                 alt="QR Code" 
                 className="w-48 h-48"
               />
            </div>
          </div>
          <div className="absolute -inset-1 border-2 border-dashed border-primary/30 rounded-[2rem] animate-[spin_20s_linear_infinite]"></div>
        </div>

        <div className="space-y-4 text-left">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ticket Holder</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Alex Chen</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Event Reference</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Grand Symphony • E-1234</p>
          </div>
        </div>

        <footer className="mt-10">
          <div className="flex items-center justify-center gap-2 text-green-500 text-xs font-bold mb-6">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            VERIFIED SECURE TICKET
          </div>
          <button 
            className="w-full py-4 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold text-sm transition-colors border-t border-slate-100 dark:border-slate-800 pt-6"
          >
            Download Pass (PDF)
          </button>
        </footer>
      </div>
    </div>
  );
};
