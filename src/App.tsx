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
          <h1>Pancake Swap - Decentralized Exchange for BNB Chain</h1>
          <h2>Trade BEP20 Tokens with Low Fees</h2>
          <p>Pancake Swap is the best decentralized exchange (DEX) on Binance Smart Chain (BNB Chain) to swap tokens, provide liquidity, and collect yield. Trade popular cryptocurrencies like BNB, CAKE, and thousands of other BEP20 tokens with minimal slippage and competitive fees.</p>
          <p>Features: Token swap, liquidity pools, yield farming, staking, low trading fees, fast transactions on BNB Chain</p>
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
