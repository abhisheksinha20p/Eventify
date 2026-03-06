import { mockEvents } from '../data/mockData';

export const MyTicketsPage = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const tickets = [
    { id: 't1', eventId: 'f1', status: 'Approved', code: 'E-1234' },
    { id: 't2', eventId: 'f2', status: 'Pending', code: 'E-5678' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">My Tickets</h2>
          <p className="text-slate-500">Manage your bookings and access your entry codes.</p>
        </div>
        <button 
          onClick={() => onNavigate('home')}
          className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Find More Events
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tickets.map(ticket => {
          const event = mockEvents.find(e => e.id === ticket.eventId) || mockEvents[0];
          return (
            <div key={ticket.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row group hover:border-primary/30 transition-all">
              <div className="sm:w-48 h-48 sm:h-auto overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                    ticket.status === 'Approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600'
                  }`}>
                    {ticket.status}
                  </span>
                  <span className="text-slate-400 font-mono text-xs">{ticket.code}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{event.title}</h4>
                <p className="text-slate-500 text-sm mb-4">{event.date.split(' • ')[0]}</p>
                <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Entry Code:</span>
                  <button 
                    onClick={() => onNavigate('qr-ticket')}
                    className="text-primary font-bold hover:underline flex items-center gap-1"
                  >
                    View QR <span className="material-symbols-outlined text-sm text-primary">qr_code_2</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {tickets.length === 0 && (
        <div className="py-24 text-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <span className="material-symbols-outlined text-4xl">confirmation_number</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No tickets found</h3>
          <p className="text-slate-500 mb-8 max-w-xs mx-auto">You haven't booked any events yet. Start exploring now!</p>
          <button onClick={() => onNavigate('home')} className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            Browse Events
          </button>
        </div>
      )}
    </div>
  );
};
