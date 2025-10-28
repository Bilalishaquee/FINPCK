import { ArrowUp, Moon, Sun } from 'lucide-react';

interface FooterProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export default function Footer({ theme, onThemeToggle }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`${theme === 'dark' ? 'bg-[#27262c]' : 'bg-gray-50'} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} mt-20`}>
      <div className="container mx-auto px-4 py-12">
        {/* Main Content - Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* ECOSYSTEM */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-[#9a6aff] uppercase tracking-wider">ECOSYSTEM</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Trade</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Earn</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Play</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Merchandise</a></li>
            </ul>
          </div>

          {/* BUSINESS */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-[#9a6aff] uppercase tracking-wider">BUSINESS</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>CAKE Incentives</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Staking Pools</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Token Launches</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Brand Assets</a></li>
            </ul>
          </div>

          {/* DEVELOPERS */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-[#9a6aff] uppercase tracking-wider">DEVELOPERS</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Contributing</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Github</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Developer Doc</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Bug Bounty</a></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-[#9a6aff] uppercase tracking-wider">SUPPORT</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Get Help</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Troubleshooting</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Documentation</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Audits</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Legacy products</a></li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-bold text-sm mb-4 text-[#9a6aff] uppercase tracking-wider">ABOUT</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Tokenomics</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>CAKE Emission Projection</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Blog</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Careers</a></li>
              <li><a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm font-bold`}>Terms Of Service</a></li>
            </ul>
          </div>
        </div>

        {/* PancakeSwap Logo */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-2">
            <img 
              src="https://assets.pancakeswap.finance/web/wallet-ui/intro.png" 
              alt="PancakeSwap Logo" 
              className="w-8 h-8"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center hidden">
              <span className="text-white text-sm">🥞</span>
            </div>
            <span className="text-white font-bold text-lg">PancakeSwap</span>
          </div>
        </div>

        {/* Bottom Section - Utility Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pt-8 border-t border-gray-700">
          {/* Left Side - Social Media Icons */}
          <div className="flex flex-col gap-4">
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {/* X (Twitter) */}
              <a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Telegram */}
              <a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              {/* Reddit */}
              <a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              {/* Discord */}
              <a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={onThemeToggle}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform ${
                  theme === 'dark' 
                    ? 'bg-gray-800 transform translate-x-6' 
                    : 'bg-white transform translate-x-0'
                }`}>
                  {theme === 'dark' ? (
                    <Moon size={12} className="text-gray-400 m-0.5" />
                  ) : (
                    <Sun size={12} className="text-yellow-500 m-0.5" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Right Side - CAKE Price and Buy Button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img 
                  src="https://assets.pancakeswap.finance/web/wallet-ui/intro.png" 
                  alt="CAKE Token" 
                  className="w-5 h-5"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-5 h-5 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center hidden">
                  <span className="text-white text-xs">🥞</span>
                </div>
                <span className="text-white font-bold">$2.659</span>
              </div>
              <button className="bg-[#1FC7D4] text-white px-4 py-2 rounded-full font-bold hover:bg-[#1BC5D1] transition-colors flex items-center gap-2">
                Buy CAKE
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#1FC7D4] text-white p-3 rounded-full shadow-lg hover:bg-[#1BC5D1] transition-colors z-50"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
}