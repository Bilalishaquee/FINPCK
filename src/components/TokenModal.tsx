import { X, Search, Settings, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getChains, getTokens, searchTokens, type Token as DBToken, type Chain as DBChain } from '../lib/supabase';
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

export interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  chain_id: string;
  is_popular: boolean;
}

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectToken: (token: Token) => void;
  theme: 'dark' | 'light';
  title: string;
}

export default function TokenModal({ isOpen, onClose, onSelectToken, theme, title }: TokenModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChain, setSelectedChain] = useState<string>('bnb');
  const [showMoreChains, setShowMoreChains] = useState(false);
  const [chains, setChains] = useState<DBChain[]>([]);
  const [tokens, setTokens] = useState<DBToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      loadData();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      loadTokens();
    }
  }, [selectedChain, searchQuery, isOpen]);

  async function loadData() {
    setLoading(true);
    const [chainsData, tokensData] = await Promise.all([
      getChains(),
      getTokens(selectedChain)
    ]);
    setChains(chainsData);
    setTokens(tokensData);
    setLoading(false);
  }

  async function loadTokens() {
    if (searchQuery.trim()) {
      const results = await searchTokens(searchQuery, selectedChain);
      setTokens(results);
    } else {
      const results = await getTokens(selectedChain);
      setTokens(results);
    }
  }

  if (!isOpen) return null;

  const popularTokens = tokens.filter(token => token.is_popular);
  const allTokens = tokens;

  const visibleChains = showMoreChains ? chains : chains.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative ${theme === 'dark' ? 'bg-[#27262c]' : 'bg-white'} rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
          <button
            onClick={onClose}
            className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className={`flex-1 flex items-center gap-3 ${theme === 'dark' ? 'bg-[#353547]' : 'bg-gray-100'} rounded-2xl px-4 py-3`}>
              <Search size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
              <input
                type="text"
                placeholder="Search name / address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 ${theme === 'dark' ? 'bg-transparent text-white placeholder-gray-400' : 'bg-transparent text-gray-900 placeholder-gray-500'} outline-none`}
              />
            </div>
            <button className={`${theme === 'dark' ? 'bg-[#353547] text-gray-300' : 'bg-gray-100 text-gray-600'} p-3 rounded-2xl hover:opacity-80 transition-opacity`}>
              <Settings size={20} />
            </button>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Network: BNB Chain</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {visibleChains.map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => setSelectedChain(chain.id)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    selectedChain === chain.id
                      ? 'bg-cyan-400 scale-110'
                      : theme === 'dark'
                      ? 'bg-[#353547] hover:bg-[#4a4a5e]'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  title={chain.name}
                >
                  <span className="text-xl">{chain.icon}</span>
                </button>
              ))}
              <button
                onClick={() => setShowMoreChains(!showMoreChains)}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  theme === 'dark' ? 'bg-[#353547] hover:bg-[#4a4a5e] text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                } transition-all`}
              >
                <span className="text-sm font-bold">{showMoreChains ? '−' : `+${chains.length - 6}`}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {popularTokens.length > 0 && (
            <div className="mb-4">
              <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Popular tokens</h3>
              <div className="flex flex-wrap gap-2">
                {popularTokens.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => {
                      onSelectToken(token);
                      onClose();
                    }}
                    className={`flex items-center gap-2 ${
                      theme === 'dark' ? 'bg-[#353547] hover:bg-[#4a4a5e] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    } px-3 py-2 rounded-full transition-colors`}
                  >
                    <TokenIcon 
                      src={getCryptoIcon(token.symbol) || token.logo} 
                      alt={token.symbol} 
                      className="w-6 h-6 rounded-full object-cover" 
                    />
                    <span className="font-medium">{token.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            {allTokens.map((token) => (
              <button
                key={token.id}
                onClick={() => {
                  onSelectToken(token);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl ${
                  theme === 'dark' ? 'hover:bg-[#353547]' : 'hover:bg-gray-100'
                } transition-colors group`}
              >
                <div className="flex items-center gap-3">
                  <TokenIcon 
                    src={getCryptoIcon(token.symbol) || token.logo} 
                    alt={token.symbol} 
                    className="w-10 h-10 rounded-full object-cover" 
                  />
                  <div className="text-left">
                    <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{token.symbol}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{token.name}</div>
                  </div>
                </div>
                <ArrowRight size={20} className={`${theme === 'dark' ? 'text-gray-600 group-hover:text-gray-400' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`} />
              </button>
            ))}
          </div>

          {allTokens.length === 0 && (
            <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>No tokens found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
