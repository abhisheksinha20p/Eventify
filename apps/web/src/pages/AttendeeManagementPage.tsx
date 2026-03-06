export const AttendeeManagementPage = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const applicants = [
    { id: 'a1', name: 'James Wilson', email: 'james@example.com', status: 'Pending', time: '2h ago' },
    { id: 'a2', name: 'Sarah Miller', email: 'sarah.m@example.com', status: 'Pending', time: '5h ago' },
    { id: 'a3', name: 'David Lee', email: 'dlee@example.com', status: 'Approved', time: '1d ago' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <button 
            onClick={() => onNavigate('home')}
            className="text-primary font-bold flex items-center gap-1 mb-4 hover:underline"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Dashboard
          </button>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Attendee Management</h2>
          <p className="text-slate-500 mt-2">Approve or reject requests for **Secret Garden Gala**</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-2xl flex items-center gap-4">
          <div className="text-center">
            <p className="text-lg font-black text-slate-900 dark:text-white">12</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Approved</p>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:border-slate-700"></div>
          <div className="text-center">
            <p className="text-lg font-black text-primary">8</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Pending</p>
          </div>
        </div>
      </header>

      <div className="space-y-4">
        {applicants.map(applicant => (
          <div key={applicant.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6 group hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-3xl font-light">account_circle</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{applicant.name}</h4>
              <p className="text-sm text-slate-500">{applicant.email}</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1">
              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                applicant.status === 'Approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600'
              }`}>
                {applicant.status}
              </span>
              <p className="text-[10px] text-slate-400 font-medium">Applied {applicant.time}</p>
            </div>
            <div className="flex gap-2">
              {applicant.status === 'Pending' ? (
                <>
                  <button className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-lg hover:opacity-90 transition-all">
                    <span className="material-symbols-outlined">check</span>
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 text-red-500 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm hover:bg-red-50 transition-all">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </>
              ) : (
                <button className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  Revoke
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
