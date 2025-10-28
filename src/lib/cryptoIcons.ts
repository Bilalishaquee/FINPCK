// Cryptocurrency icon mapping with reliable URLs
export const cryptoIcons: Record<string, string> = {
  // Major cryptocurrencies with reliable CDN URLs
  'BNB': 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
  'USDT': 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
  'CAKE': 'https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.png',
  'BTC': 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  'BTCB': 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  'ETH': 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  'USDC': 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
  'DAI': 'https://assets.coingecko.com/coins/images/9956/large/4943.png',
  'WBTC': 'https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png',
  'LINK': 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
  'BUSD': 'https://assets.coingecko.com/coins/images/9576/large/BUSD.png',
  'DOGE': 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
  '$BABYDOGEINU': 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
  '$SCAPE': 'https://assets.coingecko.com/coins/images/34420/large/5scape.png',
  '$BABYLONG': 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  '$BIAO': 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  '$BMC': 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
};

// Fallback colors for different currencies
export const cryptoColors: Record<string, string> = {
  'BNB': 'from-yellow-400 to-yellow-600',
  'USDT': 'from-green-400 to-green-600',
  'CAKE': 'from-pink-400 to-red-500',
  'BTC': 'from-orange-400 to-orange-600',
  'BTCB': 'from-orange-400 to-orange-600',
  'ETH': 'from-blue-400 to-blue-600',
  'USDC': 'from-blue-400 to-blue-600',
  'DAI': 'from-yellow-400 to-yellow-600',
  'WBTC': 'from-orange-400 to-orange-600',
  'LINK': 'from-blue-400 to-blue-600',
  'BUSD': 'from-yellow-400 to-yellow-600',
  'DOGE': 'from-yellow-400 to-yellow-600',
  '$BABYDOGEINU': 'from-yellow-400 to-yellow-600',
  '$SCAPE': 'from-purple-400 to-purple-600',
  '$BABYLONG': 'from-blue-400 to-blue-600',
  '$BIAO': 'from-gray-400 to-gray-600',
  '$BMC': 'from-blue-400 to-blue-600',
};

export function getCryptoIcon(symbol: string): string {
  return cryptoIcons[symbol] || '';
}

export function getCryptoColor(symbol: string): string {
  return cryptoColors[symbol] || 'from-gray-400 to-gray-600';
}
