export const OrganizerDashboard = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const stats = [
    { label: 'Total Revenue', value: '$12,450', icon: 'payments', trend: '+12.5%', color: 'text-primary' },
    { label: 'Tickets Sold', value: '458', icon: 'confirmation_number', trend: '+8.2%', color: 'text-blue-500' },
    { label: 'Active Events', value: '12', icon: 'event', trend: '0%', color: 'text-green-500' },
    { label: 'Avg. Rating', value: '4.8', icon: 'star', trend: '+0.2', color: 'text-yellow-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Organizer Dashboard</h2>
          <p className="text-slate-500">Welcome back! Here's what's happening with your events today.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate('create-event')}
            className="px-6 py-3.5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Create New Event
          </button>
          <button 
            className="px-6 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">qr_code_scanner</span>
            Scan Entry
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group hover:shadow-xl transition-all">
            <div className={`w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-end gap-2">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</h4>
              <span className="text-[10px] font-bold text-green-500 pb-1">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Events List */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Active Events</h3>
          <button className="text-sm font-bold text-primary hover:underline">View All Events</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Event Name</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Sales</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {[
                { name: 'Neon Nights Festival', type: 'Public', status: 'Active', sales: '85%', color: 'text-primary' },
                { name: 'Secret Garden Gala', type: 'Private', status: 'Pending', sales: 'n/a', color: 'text-yellow-500' },
                { name: 'Tech Summit 2026', type: 'Public', status: 'Sold Out', sales: '100%', color: 'text-green-500' }
              ].map((event, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-900 dark:text-white">{event.name}</p>
                    <p className="text-xs text-slate-500">Last updated 2h ago</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{event.type}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 ${event.color}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full bg-primary`} style={{ width: event.sales === 'n/a' ? '0%' : event.sales }}></div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{event.sales}</p>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => onNavigate('manage-attendees')}
                      className="p-2 text-slate-400 hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined">monitoring</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
