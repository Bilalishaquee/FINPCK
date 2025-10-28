import { useState } from 'react';
import Header from './components/Header';
import SwapCard from './components/SwapCard';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0B0E11]' : 'bg-gray-100'}`}>
      <Header theme={theme} />
      <main className="container mx-auto px-4 py-12">
        {/* SEO-only headings (hidden visually, readable by screen readers and crawlers) */}
        <div className="sr-only">
          <h1>Swap BEP20 Tokens on BNB Chain - Decentralized Exchange</h1>
          <p>The best DEX to flip tokens, provide liquidity, and collect yield on Binance Smart Chain</p>
        </div>

        <div className="flex gap-8 justify-center">
          <SwapCard theme={theme} />
        </div>
      </main>
      <Footer theme={theme} onThemeToggle={toggleTheme} />
    </div>
  );
}

export default App;
