import { mockJoinedEvents, mockDirectMessages } from '../../data/mockData';

export const CommunitySidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined font-bold">confirmation_number</span>
          <span className="text-xl font-bold text-slate-900 dark:text-white">Eventify</span>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-8">
        <div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <span className="material-symbols-outlined">calendar_month</span>
                <span className="font-medium">Events</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg transition-colors">
                <span className="material-symbols-outlined">forum</span>
                <span className="font-medium">Community</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Joined Events</h3>
          <ul className="space-y-1">
            {mockJoinedEvents.map(event => (
              <li key={event.id}>
                <a 
                  href="#" 
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    event.active 
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700' 
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${event.active ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}></span>
                  <span className="text-sm font-medium">{event.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Direct Messages</h3>
          <ul className="space-y-1">
            {mockDirectMessages.map(dm => (
              <li key={dm.id}>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <div className="relative">
                    <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">
                      {dm.name.charAt(0)}
                    </div>
                    {dm.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-50 dark:border-slate-900 rounded-full"></div>}
                  </div>
                  <span className="text-sm font-medium">{dm.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};
