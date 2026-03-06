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
        <CommunityPage onNavigate={setView} />
      </div>
    );
  }

  return (
    <>
      <Header onNavigate={setView} />
      <main className="pt-20">
        <Hero />
        <EventGrid />
      </main>
      <Footer />
    </>
  );
}

export default App;
