import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EventGrid } from './components/EventGrid';
import { Footer } from './components/Footer';
import { CommunityPage } from './pages/CommunityPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { MyTicketsPage } from './pages/MyTicketsPage';
import { TicketQRPage } from './pages/TicketQRPage';
import { JoinPrivateEventPage } from './pages/JoinPrivateEventPage';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import { CreateEventPage } from './pages/CreateEventPage';
import { AttendeeManagementPage } from './pages/AttendeeManagementPage';

type View = 'home' | 'community' | 'login' | 'register' | 'events' | 'tickets' | 'create-event' | 'manage-attendees' | 'event-details' | 'qr-ticket' | 'join-private';

function AppContent() {
  const [view, setView] = useState<View>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { isLoggedIn, user } = useAuth();

  const handleSelectEvent = (id: string) => {
    setSelectedEventId(id);
    setView('event-details');
  };

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
            {isLoggedIn && user?.role === 'organizer' ? (
              <OrganizerDashboard onNavigate={setView} />
            ) : (
              <>
                <Hero />
                <EventGrid onSelectEvent={handleSelectEvent} />
              </>
            )}
          </>
        )}

        {view === 'event-details' && selectedEventId && (
          <EventDetailsPage eventId={selectedEventId} onNavigate={setView} />
        )}

        {view === 'tickets' && <MyTicketsPage onNavigate={setView} />}
        {view === 'qr-ticket' && <TicketQRPage onNavigate={setView} />}
        {view === 'join-private' && <JoinPrivateEventPage onNavigate={setView} />}
        {view === 'create-event' && <CreateEventPage onNavigate={setView} />}
        {view === 'manage-attendees' && <AttendeeManagementPage onNavigate={setView} />}
        
        {/* Placeholder for other views */}
        {(['events'].includes(view)) && (
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
