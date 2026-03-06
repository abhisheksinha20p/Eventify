import { mockParticipants } from '../../data/mockData';

export const ParticipantsSidebar: React.FC = () => {
  return (
    <aside className="w-80 bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col h-screen overflow-y-auto sticky top-0">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">People</h3>
      </div>

      <div className="p-4 space-y-8">
        <div>
          <div className="flex justify-between items-center px-2 mb-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hosts & Speakers</h4>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 px-1.5 py-0.5 rounded">
              {mockParticipants.hosts.length}
            </span>
          </div>
          <div className="space-y-1">
            {mockParticipants.hosts.map(person => (
              <div key={person.id} className="p-2 rounded-xl group hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
                      {person.name.charAt(0)}
                    </div>
                    <div className="absolute -top-1 -right-1 bg-yellow-400 text-[10px] flex items-center justify-center w-4 h-4 rounded-full border-2 border-slate-50 dark:border-slate-900">
                      <span className="material-symbols-outlined text-[10px]">star</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1 group-hover:text-primary transition-colors">
                      {person.name}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">{person.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center px-2 mb-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Online</h4>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 px-1.5 py-0.5 rounded">
              {mockParticipants.onlineCount}
            </span>
          </div>
          <div className="space-y-1">
            {mockParticipants.online.map(person => (
              <div key={person.id} className="p-2 rounded-xl group hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 font-bold group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                      {person.name.charAt(0)}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-50 dark:border-slate-900 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1 group-hover:text-primary transition-colors">
                      {person.name}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">{person.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-slate-100 dark:border-slate-800">
        <button className="w-full py-3 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all flex items-center justify-center gap-2 border border-dashed border-slate-200 dark:border-slate-800">
          <span className="material-symbols-outlined text-sm">group_add</span>
          Invite Participants
        </button>
      </div>
    </aside>
  );
};
