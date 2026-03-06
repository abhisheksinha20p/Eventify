import { mockEvents } from '../data/mockData';

interface EventDetailsProps {
  eventId: string;
  onNavigate: (view: any) => void;
}

export const EventDetailsPage: React.FC<EventDetailsProps> = ({ eventId, onNavigate }) => {
  const event = mockEvents.find(e => e.id === eventId) || mockEvents[0];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
        <button 
          onClick={() => onNavigate('home')}
          className="absolute top-6 left-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{event.tag || 'POPULAR'}</span>
                <span className="text-slate-400 text-sm font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  2.4k views
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                {event.title}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date & Time</p>
                    <p className="text-slate-900 dark:text-white font-bold">{event.date.split(' • ')[0]}</p>
                    <p className="text-slate-500 text-xs mt-1">8:00 PM - 11:30 PM EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-slate-900 dark:text-white font-bold">{event.location}</p>
                    <p className="text-primary text-xs mt-1 font-bold hover:underline cursor-pointer">Open in Maps</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">About this experience</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Join us for an extraordinary evening featuring world-class performances and an immersive atmosphere. This event is designed to bring together enthusiasts and professionals for a night of networking, learning, and celebration. Attendees will have exclusive access to all sessions and premium amenities provided by our sponsors.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Live Performance', 'Networking', 'Open Bar', 'Keynote', 'VIP Lounge'].map(tag => (
                  <div key={tag} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Ticket/CTA */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 sticky top-24">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Ticket Price</p>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{event.price}</p>
                </div>
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                  Available
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Standard Entry</span>
                  <span className="font-bold text-slate-900 dark:text-white">{event.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Service Fee</span>
                  <span className="font-bold text-slate-900 dark:text-white">$12.50</span>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Total</span>
                  <span className="font-extrabold text-xl text-primary">$132.50</span>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('tickets')}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
              >
                Book Your Slot
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>

              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white Leading-none">42 Slots Left</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">Selling fast! 85% filled</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 dark:bg-slate-900 p-6 rounded-3xl border border-primary/20">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">shield</span>
                Secure Booking
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your payment is handled securely via Stripe. Instant confirmation and QR ticket generation after successful checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
