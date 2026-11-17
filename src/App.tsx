import { useState } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { FloatingNav } from './components/FloatingNav';
import { BookOpeningExperience } from './components/BookOpeningExperience';
import { MusicToggleButton } from './components/MusicToggleButton';
import { HeroSection } from './sections/HeroSection';
import { QuranVerseSection } from './sections/QuranVerseSection';
import { CountdownSection } from './sections/CountdownSection';
import { WeddingDetailsSection } from './sections/WeddingDetailsSection';
import { LocationSection } from './sections/LocationSection';
import { DuaSection } from './sections/DuaSection';
import { FooterSection } from './sections/FooterSection';

export function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="invitation-shell">
      {/* 1. Interactive 3D Book & Card Pop-up Opening Experience */}
      {!hasEntered && <BookOpeningExperience onEnter={() => setHasEntered(true)} />}

      {/* 2. Main Wedding Invitation Website (100% Intact with Burgundy & Gold Theme) */}
      <ScrollProgressBar />
      <FloatingNav />

      <main className="invitation-main">
        <HeroSection />
        <QuranVerseSection />
        <CountdownSection />
        <WeddingDetailsSection />
        <LocationSection />
        <DuaSection />
      </main>

      <FooterSection />

      {/* 3. Small, elegant floating music icon fixed neatly at the side of the screen */}
      <MusicToggleButton />
    </div>
  );
}

export default App;
