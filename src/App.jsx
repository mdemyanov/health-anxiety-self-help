import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TabBar, SosButton } from './components/layout';

// Pages
import Home from './pages/Home';
import Tools from './pages/Tools';
import Stoic from './pages/Stoic';
import Diary from './pages/Diary';
import { SosStart, SosFlow } from './pages/sos';
import { StopPause, Grounding54321, AbcDiary, AbcDetail, Decatastrophize, Dichotomy } from './pages/tools/index';
import { BoxBreathing, Breathing478 } from './pages/breathing/index';
import { MorningPractice, EveningReflection, ViewFromAbove, Quotes } from './pages/stoic/index';
import { MoodTracker } from './pages/diary/index';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen" style={{ background: 'var(--background)' }}>
          <Routes>
            {/* Main tabs */}
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/stoic" element={<Stoic />} />
            <Route path="/diary" element={<Diary />} />

            {/* SOS */}
            <Route path="/sos" element={<SosStart />} />
            <Route path="/sos/flow" element={<SosFlow />} />

            {/* Tools */}
            <Route path="/tools/breathing" element={<BoxBreathing />} />
            <Route path="/tools/breathing-478" element={<Breathing478 />} />
            <Route path="/tools/stop-pause" element={<StopPause />} />
            <Route path="/tools/grounding" element={<Grounding54321 />} />
            <Route path="/tools/abc" element={<AbcDiary />} />
            <Route path="/tools/decatastrophize" element={<Decatastrophize />} />
            <Route path="/tools/dichotomy" element={<Dichotomy />} />

            {/* Stoic */}
            <Route path="/stoic/morning" element={<MorningPractice />} />
            <Route path="/stoic/evening" element={<EveningReflection />} />
            <Route path="/stoic/quotes" element={<Quotes />} />
            <Route path="/stoic/view-from-above" element={<ViewFromAbove />} />

            {/* Diary */}
            <Route path="/diary/:id" element={<AbcDetail />} />
            <Route path="/diary/mood" element={<MoodTracker />} />
          </Routes>

          <SosButton />
          <TabBar />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
