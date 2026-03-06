import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EventGrid } from './components/EventGrid';
import { Footer } from './components/Footer';
import { CommunityPage } from './pages/CommunityPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

type View = 'home' | 'community' | 'login' | 'register' | 'events' | 'tickets' | 'create-event' | 'manage-attendees';

function AppContent() {
  const [view, setView] = useState<View>('home');
  const { user, isLoggedIn } = useAuth();

  // Root level rendering based on view
  if (view === 'login') return <LoginPage onNavigate={setView} />;
  if (view === 'register') return <RegisterPage onNavigate={setView} />;

  if (view === 'community') {
    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <CommunityPage onNavigate={setView} />
      </div>
    );
  }

  // Common Layout (Home, Event Details, Dashboard etc)
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Header onNavigate={setView} />
      <main className="pt-20">
        {view === 'home' && (
          <>
            <Hero />
            <EventGrid />
          </>
        )}
        
        {/* Placeholder for other views */}
        {(['events', 'tickets', 'create-event', 'manage-attendees'].includes(view)) && (
          <div className="max-w-7xl mx-auto px-6 py-32 text-center text-slate-400">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-20">construction</span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{view.replace('-', ' ').toUpperCase()}</h2>
            <p>This module is currently under construction. Please check back later.</p>
            <button onClick={() => setView('home')} className="mt-8 text-primary font-bold hover:underline">Return Home</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
