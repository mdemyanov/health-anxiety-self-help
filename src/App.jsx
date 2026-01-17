import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TabBar } from './components/layout';
import Onboarding from './components/Onboarding';

// Pages
import Home from './pages/Home';
import Tools from './pages/Tools';
import Stoic from './pages/Stoic';
import Diary from './pages/Diary';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import ChatTool from './pages/chat/ChatTool';
import { AbcDetail } from './pages/tools/index';
import { BoxBreathing, Breathing478 } from './pages/breathing/index';
import { Quotes } from './pages/stoic/index';
import { MoodTracker } from './pages/diary/index';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const profile = localStorage.getItem('user-profile');
    setShowOnboarding(!profile);
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider>
      {showOnboarding && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      <BrowserRouter>
        <div className="min-h-screen" style={{ background: 'var(--background)' }}>
          <Routes>
            {/* Main tabs */}
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/stoic" element={<Stoic />} />
            <Route path="/diary" element={<Diary />} />

            {/* Chat-based Tools */}
            <Route path="/tools/stop-pause" element={<ChatTool flowId="stop-pause" />} />
            <Route path="/tools/grounding" element={<ChatTool flowId="grounding" />} />
            <Route path="/tools/abc" element={<ChatTool flowId="abc-diary" />} />
            <Route path="/tools/decatastrophize" element={<ChatTool flowId="decatastrophize" />} />
            <Route path="/tools/dichotomy" element={<ChatTool flowId="dichotomy" />} />
            <Route path="/tools/double-standard" element={<ChatTool flowId="double-standard" />} />
            <Route path="/tools/triple-column" element={<ChatTool flowId="triple-column" />} />
            <Route path="/tools/facts-vs-feelings" element={<ChatTool flowId="facts-vs-feelings" />} />
            <Route path="/tools/should-statements" element={<ChatTool flowId="should-statements" />} />
            <Route path="/tools/impostor-syndrome" element={<ChatTool flowId="impostor-syndrome" />} />
            <Route path="/tools/decision" element={<ChatTool flowId="decision" />} />

            {/* Non-chat tools (breathing stays as is) */}
            <Route path="/tools/breathing" element={<BoxBreathing />} />
            <Route path="/tools/breathing-478" element={<Breathing478 />} />

            {/* Chat-based Stoic */}
            <Route path="/stoic/morning" element={<ChatTool flowId="morning" />} />
            <Route path="/stoic/evening" element={<ChatTool flowId="evening" />} />
            <Route path="/stoic/view-from-above" element={<ChatTool flowId="view-from-above" />} />
            <Route path="/stoic/quotes" element={<Quotes />} />

            {/* SOS - only accessible from Home */}
            <Route path="/sos" element={<ChatTool flowId="sos" />} />

            {/* Diary */}
            <Route path="/diary/:id" element={<AbcDetail />} />
            <Route path="/diary/mood" element={<MoodTracker />} />
            <Route path="/diary/statistics" element={<Statistics />} />

            {/* Settings */}
            <Route path="/settings" element={<Settings />} />
          </Routes>

          <TabBar />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
