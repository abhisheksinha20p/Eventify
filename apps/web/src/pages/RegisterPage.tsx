import { useState } from 'react';
import { AuthLayout } from '../components/Auth/AuthLayout';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'attendee' | 'organizer' | null>(null);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      login(email, role);
      onNavigate('home');
    }
  };

  return (
    <AuthLayout title="Create an account" subtitle="Join the Eventify community today">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            type="button"
            onClick={() => setRole('attendee')}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              role === 'attendee' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-primary mb-2">person</span>
            <p className="font-bold text-sm text-slate-900 dark:text-white">Attendee</p>
            <p className="text-[10px] text-slate-500 mt-1 leading-tight">I want to discover and join amazing events.</p>
          </button>
          <button
            type="button"
            onClick={() => setRole('organizer')}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              role === 'organizer' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-primary mb-2">event_seat</span>
            <p className="font-bold text-sm text-slate-900 dark:text-white">Organizer</p>
            <p className="text-[10px] text-slate-500 mt-1 leading-tight">I want to create and manage my own events.</p>
          </button>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            className="block w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Password
          </label>
          <input
            type="password"
            required
            className="block w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!role}
          className={`w-full py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all ${
            role ? 'bg-primary shadow-primary/20 hover:opacity-90' : 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed shadow-none'
          }`}
        >
          Create Account
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <button type="button" onClick={() => onNavigate('login')} className="font-bold text-primary hover:text-primary/80">Sign in</button>
        </p>
      </form>
    </AuthLayout>
  );
};
