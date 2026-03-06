import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onNavigate: (view: 'home' | 'community' | 'login' | 'register') => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full glass-header border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-2xl">confirmation_number</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Eventify</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => onNavigate('home')}
            className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
          >
            Browse Events
          </button>
          <a className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors" href="#">Host an Event</a>
          <button 
            onClick={() => onNavigate('community')}
            className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
          >
            Community
          </button>
          <a className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors" href="#">Pricing</a>
        </nav>
        
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <button 
                onClick={() => onNavigate('login')}
                className="px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-primary/5 rounded-lg transition-all"
              >
                Log In
              </button>
              <button 
                onClick={() => onNavigate('register')}
                className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">{user?.email.split('@')[0]}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{user?.role}</p>
              </div>
              <button 
                onClick={logout}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                title="Logout"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
