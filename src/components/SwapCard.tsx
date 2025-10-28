import { ChevronDown, ArrowDown, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import TokenModal, { type Token } from './TokenModal';
import ConnectWalletModal from './ConnectWalletModal';
import { getCryptoIcon, getCryptoColor } from '../lib/cryptoIcons';

// Token Icon Component with fallback
function TokenIcon({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  
  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (imgLoading) {
        console.log('Image loading timeout:', src);
        setImgError(true);
        setImgLoading(false);
      }
    }, 3000); // 3 second timeout
    
    return () => clearTimeout(timer);
  }, [imgLoading, src]);
  
  if (imgError) {
    // Fallback to colored circle with first letter
    const colorClass = getCryptoColor(alt);
    return (
      <div className={`${className} bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-xs`}>
        {alt.charAt(0)}
      </div>
    );
  }
  
  return (
    <div className={`${className} relative`}>
      {imgLoading && (
        <div className={`${className} bg-gray-300 animate-pulse rounded-full flex items-center justify-center absolute`}>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`${className} ${imgLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
        onError={() => {
          console.log('Image failed to load:', src);
          setImgError(true);
          setImgLoading(false);
        }}
        onLoad={() => {
          console.log('Image loaded successfully:', src);
          setImgLoading(false);
        }}
      />
    </div>
  );
}

interface SwapCardProps {
  theme: 'dark' | 'light';
}

export default function SwapCard({ theme }: SwapCardProps) {
  const [fromToken, setFromToken] = useState<Token | null>({
    id: '1',
    symbol: 'BNB',
    name: 'Binance Chain Native Token',
    logo: getCryptoIcon('BNB'),
    chain_id: 'bnb',
    is_popular: true
  });
  const [toToken, setToToken] = useState<Token | null>({
    id: '3',
    symbol: 'CAKE',
    name: 'PancakeSwap Token',
    logo: getCryptoIcon('CAKE'),
    chain_id: 'bnb',
    is_popular: true
  });
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className={`${theme === 'dark' ? 'bg-[#27262c]' : 'bg-white'} rounded-3xl shadow-xl p-4`}>
        <div className="flex items-center gap-2 mb-6">
          <button className={`flex-1 ${theme === 'dark' ? 'bg-[#9a6aff] text-white' : 'bg-[#9a6aff] text-white'} py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity`}>
            Swap
          </button>
          <button className={`flex-1 ${theme === 'dark' ? 'bg-[#353547] text-gray-300' : 'bg-gray-100 text-gray-600'} py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity`}>
            TWAP
          </button>
          <button className={`flex-1 ${theme === 'dark' ? 'bg-[#353547] text-gray-300' : 'bg-gray-100 text-gray-600'} py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity`}>
            Limit
          </button>
          <button className={`${theme === 'dark' ? 'bg-[#353547] text-gray-300' : 'bg-gray-100 text-gray-600'} p-3 rounded-2xl hover:opacity-90 transition-opacity`}>
            📊
          </button>
        </div>

        <div className="space-y-1">
          <div className={`${theme === 'dark' ? 'bg-[#353547]' : 'bg-gray-50'} rounded-2xl p-4`}>
            <div className="flex justify-between items-center mb-3">
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>From:</span>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowFromModal(true)}
                className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-[#4a4a5e] text-white' : 'bg-white text-gray-900'} px-3 py-2 rounded-xl hover:opacity-90 transition-opacity`}
              >
                <TokenIcon 
                  src={getCryptoIcon(fromToken?.symbol || '') || fromToken?.logo || ''} 
                  alt={fromToken?.symbol || ''} 
                  className="w-6 h-6 rounded-full object-cover" 
                />
                <span className="font-bold">{fromToken?.symbol}</span>
                <ChevronDown size={16} />
              </button>
              <input
                type="text"
                placeholder="0.00"
                className={`${theme === 'dark' ? 'bg-transparent text-white' : 'bg-transparent text-gray-900'} text-right text-2xl font-semibold outline-none w-32`}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>BNB Chain</span>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>~$0.00</span>
            </div>
          </div>

          <div className="flex justify-center -my-2 relative z-10">
            <button className="bg-[#1FC7D4] p-2 rounded-xl hover:bg-[#1BC5D1] transition-colors">
              <ArrowDown size={20} className="text-white" />
            </button>
          </div>

          <div className={`${theme === 'dark' ? 'bg-[#353547]' : 'bg-gray-50'} rounded-2xl p-4`}>
            <div className="flex justify-between items-center mb-3">
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>To:</span>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowToModal(true)}
                className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-[#4a4a5e] text-white' : 'bg-white text-gray-900'} px-3 py-2 rounded-xl hover:opacity-90 transition-opacity`}
              >
                <TokenIcon 
                  src={getCryptoIcon(toToken?.symbol || '') || toToken?.logo || ''} 
                  alt={toToken?.symbol || ''} 
                  className="w-6 h-6 rounded-full object-cover" 
                />
                <span className="font-bold">{toToken?.symbol}</span>
                <ChevronDown size={16} />
              </button>
              <input
                type="text"
                placeholder="0.00"
                className={`${theme === 'dark' ? 'bg-transparent text-white' : 'bg-transparent text-gray-900'} text-right text-2xl font-semibold outline-none w-32`}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>BNB Chain</span>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>~$0.00</span>
            </div>
          </div>
        </div>

        <div className={`flex items-center justify-between mt-4 px-2 py-3 ${theme === 'dark' ? 'bg-[#353547]' : 'bg-gray-50'} rounded-xl`}>
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Slippage Tolerance</span>
          <div className="flex items-center gap-2">
            <span className="text-[#1FC7D4] font-medium text-sm">Auto: 0.50%</span>
            <button className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} hover:text-[#1FC7D4] transition-colors`}>
              <Settings size={16} />
            </button>
          </div>
        </div>

        <button 
          onClick={() => setShowConnectModal(true)}
          className="w-full bg-[#1FC7D4] text-white py-4 rounded-2xl font-bold text-lg mt-4 hover:bg-[#1BC5D1] transition-colors flex items-center justify-center gap-2"
        >
          Connect Wallet
          <span className="text-xl">💼</span>
        </button>
      </div>

      <TokenModal
        isOpen={showFromModal}
        onClose={() => setShowFromModal(false)}
        onSelectToken={(token) => {
          setFromToken(token);
          setShowFromModal(false);
        }}
        theme={theme}
        title="From"
      />

      <TokenModal
        isOpen={showToModal}
        onClose={() => setShowToModal(false)}
        onSelectToken={(token) => {
          setToToken(token);
          setShowToModal(false);
        }}
        theme={theme}
        title="To"
      />

      <ConnectWalletModal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        theme={theme}
      />
    </div>
  );
}
