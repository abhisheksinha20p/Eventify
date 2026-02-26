import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EventGrid } from './components/EventGrid';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <EventGrid />
      </main>
      <Footer />
    </>
  );
}

export default App;
