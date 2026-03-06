import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EventGrid } from './components/EventGrid';
import { Footer } from './components/Footer';
import { CommunityPage } from './pages/CommunityPage';

function App() {
  const [view, setView] = useState<'home' | 'community'>('home');

  if (view === 'community') {
    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <CommunityPage />
        {/* Simple floating button to return home for now */}
        <button 
          onClick={() => setView('home')}
          className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-800 p-3 rounded-full shadow-2xl border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform text-primary"
          title="Return Home"
        >
          <span className="material-symbols-outlined">home</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        {/* Temporary button to jump to community */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <button 
            onClick={() => setView('community')}
            className="w-full py-4 bg-primary/5 border-2 border-dashed border-primary/20 rounded-2xl text-primary font-bold hover:bg-primary/10 transition-colors flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">forum</span>
            Join the Community Chat
          </button>
        </section>
        <EventGrid />
      </main>
      <Footer />
    </>
  );
}

export default App;
