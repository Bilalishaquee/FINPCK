import { Settings, ChevronDown, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import ConnectWalletModal from './ConnectWalletModal';

interface HeaderProps {
  theme: 'dark' | 'light';
}

export default function Header({ theme }: HeaderProps) {
  const [showConnectModal, setShowConnectModal] = useState(false);
  return (
    <header className={`${theme === 'dark' ? 'bg-[#0B0E11]' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <img 
                src="https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.png" 
                alt="PancakeSwap" 
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg hidden">
                🥞
              </div>
              <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>PancakeSwap</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-[#9a6aff] font-medium hover:opacity-80 transition-opacity border-b-2 border-[#9a6aff] pb-1">Trade</a>
              <a href="#" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-medium hover:text-[#9a6aff] transition-colors`}>Perps</a>
              <a href="#" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-medium hover:text-[#9a6aff] transition-colors`}>Earn</a>
              <a href="#" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-medium hover:text-[#9a6aff] transition-colors`}>Bridge</a>
              <a href="#" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-medium hover:text-[#9a6aff] transition-colors`}>Play</a>
              <button className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-[#9a6aff] transition-colors`}>
                <MoreHorizontal size={20} />
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[#1FC7D4] text-white px-3 py-1.5 rounded-full font-medium">
              <img 
                src="https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.png" 
                alt="CAKE" 
                className="w-5 h-5 rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-5 h-5 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center text-xs hidden">
                🥞
              </div>
              <span className="font-semibold">$2.637</span>
            </div>

            <button className={`hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-[#27262c] text-white' : 'bg-gray-100 text-gray-900'} hover:opacity-80 transition-opacity`}>
              <Settings size={18} />
            </button>

            <button className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-[#27262c] text-white' : 'bg-gray-100 text-gray-900'} hover:opacity-80 transition-opacity`}>
              <img 
                src="https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png" 
                alt="BNB" 
                className="w-5 h-5 rounded"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center text-xs hidden">🎁</div>
              <span className="font-medium">BNB Chain</span>
              <ChevronDown size={16} />
            </button>

            <button 
              onClick={() => setShowConnectModal(true)}
              className="bg-[#1FC7D4] text-white px-4 py-2 rounded-full font-bold hover:bg-[#1BC5D1] transition-colors"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
      
      <ConnectWalletModal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        theme={theme}
      />
    </header>
  );
}
