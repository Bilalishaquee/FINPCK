import { X, Check } from 'lucide-react';
import { useState } from 'react';
import WalletConnectModal from './WalletConnectModal';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export default function ConnectWalletModal({ isOpen, onClose, theme }: ConnectWalletModalProps) {
  const [showWalletConnectModal, setShowWalletConnectModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('');

  if (!isOpen) return null;

  const handleWalletClick = (walletName: string) => {
    // Only show popup for specific wallets
    const allowedWallets = ['Metamask', 'Trust Wallet', 'Binance Wallet', 'Binance Wall...', 'OKX Wallet'];
    if (allowedWallets.includes(walletName)) {
      setSelectedWallet(walletName);
      setShowWalletConnectModal(true);
    } else {
      console.log(`Connecting to ${walletName} - no popup needed`);
    }
  };

  const handleSocialLogin = () => {
    console.log('Social login clicked - no popup needed');
    // Add social login logic here
  };

  const handleMoreWallets = () => {
    console.log('More wallets clicked - no popup needed');
    // Add more wallets logic here
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-[#27262c] rounded-3xl overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
        >
          <X size={20} className="text-white" />
        </button>

        <div className="flex min-h-[600px]">
          {/* Left Column - Wallet Options */}
          <div className="flex-1 bg-[#27262c] p-6">
            {/* Header */}
            <h2 className="text-2xl font-bold text-white mb-6">Connect Wallet</h2>
            
            {/* Social Login Section */}
            <div className="mb-8">
              <button
                onClick={handleSocialLogin}
                className="w-full bg-[#353547] hover:bg-[#4a4a5e] rounded-lg p-4 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Social Login Icons - Original social media icons */}
                    <div className="flex items-center gap-2">
                      {/* Google */}
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                        alt="Google" 
                        className="w-6 h-6 rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center text-white text-xs hidden">
                        G
                      </div>
                      
                      {/* X (Twitter) */}
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6f/X_logo_2023_original.svg" 
                        alt="X" 
                        className="w-6 h-6 rounded-full bg-black p-1"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-xs hidden">
                        X
                      </div>
                      
                      {/* Telegram */}
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" 
                        alt="Telegram" 
                        className="w-6 h-6 rounded-full bg-blue-500 p-1"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs hidden">
                        📱
                      </div>
                      
                      {/* Discord */}
                      <img 
                        src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" 
                        alt="Discord" 
                        className="w-6 h-6 rounded-full bg-purple-600 p-1"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs hidden">
                        🎮
                      </div>
                    </div>
                    <div className="text-white font-semibold">
                      Social Login
                    </div>
                  </div>
                  <svg 
                    viewBox="0 0 24 24" 
                    width="24px" 
                    height="24px" 
                    className="text-gray-400 rotate-[-90deg]"
                  >
                    <path 
                      d="M8.71005 11.71L11.3001 14.3C11.6901 14.69 12.3201 14.69 12.7101 14.3L15.3001 11.71C15.9301 11.08 15.4801 10 14.5901 10H9.41005C8.52005 10 8.08005 11.08 8.71005 11.71Z" 
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </button>
            </div>

            {/* Top Wallets Section */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">TOP WALLETS</h3>
              <div className="grid grid-cols-4 gap-2">
                {/* Metamask */}
                <button
                  onClick={() => handleWalletClick('Metamask')}
                  className="bg-[#353547] hover:bg-[#4a4a5e] rounded-xl p-3 transition-colors group relative max-w-[106px] w-full"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallets/metamask.png" 
                        alt="Metamask" 
                        className="w-12 h-12 rounded-xl"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white text-lg hidden">
                        🦊
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded flex items-center justify-center">
                        <Check size={8} className="text-white" />
                      </div>
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallet-ui/network-tag-evm.svg" 
                        alt="EVM network" 
                        width="16" 
                        height="16" 
                        className="block"
                      />
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallet-ui/network-tag-solana.png" 
                        alt="Solana network" 
                        width="16" 
                        height="16" 
                        className="block"
                      />
                    </div>
                    <div className="text-white font-medium text-xs text-center">
                      Metamask
                    </div>
                  </div>
                </button>

                {/* Trust Wallet */}
                <button
                  onClick={() => handleWalletClick('Trust Wallet')}
                  className="bg-[#353547] hover:bg-[#4a4a5e] rounded-xl p-3 transition-colors group relative max-w-[106px] w-full"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallets/trust.png" 
                        alt="Trust Wallet" 
                        className="w-12 h-12 rounded-xl"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white text-lg hidden">
                        🛡️
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded flex items-center justify-center">
                        <Check size={8} className="text-white" />
                      </div>
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallet-ui/network-tag-evm.svg" 
                        alt="EVM network" 
                        width="16" 
                        height="16" 
                        className="block"
                      />
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallet-ui/network-tag-solana.png" 
                        alt="Solana network" 
                        width="16" 
                        height="16" 
                        className="block"
                      />
                    </div>
                    <div className="text-white font-medium text-xs text-center">
                      Trust Wallet
                    </div>
                  </div>
                </button>

                {/* Binance Wallet */}
                <button
                  onClick={() => handleWalletClick('Binance Wallet')}
                  className="bg-[#353547] hover:bg-[#4a4a5e] rounded-xl p-3 transition-colors group relative max-w-[106px] w-full"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallets/binance-w3w.png" 
                        alt="Binance Wallet" 
                        className="w-12 h-12 rounded-xl"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-white text-lg hidden">
                        💎
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded flex items-center justify-center">
                        <Check size={8} className="text-white" />
                      </div>
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallet-ui/network-tag-evm.svg" 
                        alt="EVM network" 
                        width="16" 
                        height="16" 
                        className="block"
                      />
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallet-ui/network-tag-solana.png" 
                        alt="Solana network" 
                        width="16" 
                        height="16" 
                        className="block"
                      />
                    </div>
                    <div className="text-white font-medium text-xs text-center">
                      Binance Wallet
                    </div>
                  </div>
                </button>

                {/* OKX Wallet */}
                <button
                  onClick={() => handleWalletClick('OKX Wallet')}
                  className="bg-[#353547] hover:bg-[#4a4a5e] rounded-xl p-3 transition-colors group relative max-w-[106px] w-full"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative mb-2">
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallets/okx-wallet.png" 
                        alt="OKX Wallet" 
                        className="w-12 h-12 rounded-xl"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-white text-lg hidden">
                        ⚡
                      </div>
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallet-ui/network-tag-evm.svg" 
                        alt="EVM network" 
                        width="16" 
                        height="16" 
                        className="block"
                      />
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallet-ui/network-tag-solana.png" 
                        alt="Solana network" 
                        width="16" 
                        height="16" 
                        className="block"
                      />
                    </div>
                    <div className="text-white font-medium text-xs text-center">
                      OKX Wallet
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* More Wallets Section */}
            <div>
              <button
                onClick={handleMoreWallets}
                className="w-full bg-[#353547] hover:bg-[#4a4a5e] rounded-lg p-4 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* More Wallet Icons */}
                    <div className="flex items-center gap-1">
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallets/coinbase.png" 
                        alt="Coinbase Wallet" 
                        width="22" 
                        height="22" 
                        className="rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs hidden">
                        🔵
                      </div>
                      
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallets/walletconnect.png" 
                        alt="WalletConnect" 
                        width="22" 
                        height="22" 
                        className="rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs hidden">
                        W
                      </div>
                      
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallets/opera.png" 
                        alt="Opera Wallet" 
                        width="22" 
                        height="22" 
                        className="rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs hidden">
                        O
                      </div>
                      
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallets/brave.png" 
                        alt="Brave Wallet" 
                        width="22" 
                        height="22" 
                        className="rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs hidden">
                        🦁
                      </div>
                      
                      <img 
                        src="https://assets.pancakeswap.finance/web/wallets/rabby.png" 
                        alt="Rabby Wallet" 
                        width="22" 
                        height="22" 
                        className="rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs hidden">
                        🐰
                      </div>
                      
                      {/* More +10 */}
                      <div className="w-6 h-6 rounded-full bg-[#353547] flex items-center justify-center text-white text-xs">
                        +10
                      </div>
                    </div>
                    <div className="text-white font-semibold">
                      More Wallets
                    </div>
                  </div>
                  <svg 
                    viewBox="0 0 24 24" 
                    width="24px" 
                    height="24px" 
                    className="text-gray-400 rotate-[-90deg]"
                  >
                    <path 
                      d="M8.71005 11.71L11.3001 14.3C11.6901 14.69 12.3201 14.69 12.7101 14.3L15.3001 11.71C15.9301 11.08 15.4801 10 14.5901 10H9.41005C8.52005 10 8.08005 11.08 8.71005 11.71Z" 
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column - Mascot and Disclaimer */}
          <div className="flex-1 bg-[#27262c] flex flex-col items-center justify-center p-6">
            {/* Mascot and Content Container */}
            <div className="flex flex-col items-center gap-3">
              {/* Bunny Mascot */}
              <div className="flex justify-center">
                <img 
                  src="https://assets.pancakeswap.finance/web/wallet-ui/intro.png" 
                  alt="PancakeSwap Bunny" 
                  className="w-auto h-auto max-w-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-4xl hidden">
                  🐰
                </div>
              </div>
              
              {/* Content Container */}
              <div className="flex flex-col items-center gap-3">
                {/* Card with text and links */}
                <div className="bg-[#353547] rounded-xl p-4 w-full max-w-sm">
                  {/* Description Text */}
                  <div className="text-white text-center text-sm leading-relaxed mb-3">
                    Manage and store your private keys and assets securely.
                  </div>
                  
                  {/* Links */}
                  <div className="flex items-center justify-center gap-2 text-[#1FC7D4] text-xs">
                    <a 
                      href="https://docs.pancakeswap.finance/get-started/wallet-guide" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#1BC5D1] transition-colors cursor-pointer"
                    >
                      How to connect
                    </a>
                    <div className="text-[#1FC7D4]">|</div>
                    <a 
                      href="https://pancakeswap.finance/terms-of-service" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#1BC5D1] transition-colors cursor-pointer"
                    >
                      Disclaimer
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={showWalletConnectModal}
        onClose={() => setShowWalletConnectModal(false)}
        walletName={selectedWallet}
        theme={theme}
      />
    </div>
  );
}
