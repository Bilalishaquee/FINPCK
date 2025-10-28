/*
  # Create tokens and chains tables

  1. New Tables
    - `chains`
      - `id` (text, primary key) - Unique identifier for the chain
      - `name` (text) - Chain name (e.g., BNB Chain, Ethereum)
      - `icon` (text) - Icon emoji or URL
      - `created_at` (timestamptz) - Timestamp of creation

    - `tokens`
      - `id` (uuid, primary key) - Unique identifier
      - `symbol` (text) - Token symbol (e.g., BNB, USDT)
      - `name` (text) - Full token name
      - `logo` (text) - Logo emoji or URL
      - `chain_id` (text) - Foreign key to chains table
      - `is_popular` (boolean) - Whether token appears in popular section
      - `created_at` (timestamptz) - Timestamp of creation

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (tokens are public data)

  3. Data
    - Seed initial chain and token data
*/

CREATE TABLE IF NOT EXISTS chains (
  id text PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text NOT NULL,
  name text NOT NULL,
  logo text NOT NULL,
  chain_id text NOT NULL REFERENCES chains(id),
  is_popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chains ENABLE ROW LEVEL SECURITY;
ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read chains"
  ON chains
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read tokens"
  ON tokens
  FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO chains (id, name, icon) VALUES
  ('bnb', 'BNB Chain', '🟡'),
  ('eth', 'Ethereum', '💎'),
  ('base', 'Base', '🔵'),
  ('opbnb', 'opBNB', '⭕'),
  ('arb', 'Arbitrum', '🔷'),
  ('zkSync', 'zkSync', '⚡'),
  ('linea', 'Linea', '🟣')
ON CONFLICT (id) DO NOTHING;

INSERT INTO tokens (symbol, name, logo, chain_id, is_popular) VALUES
  ('BNB', 'Binance Chain Native Token', 'https://cryptologos.cc/logos/bnb-bnb-logo.png', 'bnb', true),
  ('USDT', 'Tether USD', 'https://cryptologos.cc/logos/tether-usdt-logo.png', 'bnb', true),
  ('CAKE', 'PancakeSwap Token', 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png', 'bnb', true),
  ('BTCB', 'Bitcoin BEP20', 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', 'bnb', true),
  ('$SCAPE', '5th Scape', 'https://cryptologos.cc/logos/ethereum-eth-logo.png', 'bnb', false),
  ('$BABYDOGEINU', 'Baby Doge Inu', 'https://cryptologos.cc/logos/dogecoin-doge-logo.png', 'bnb', false),
  ('$BABYLONG', 'BABYLONG', 'https://cryptologos.cc/logos/ethereum-eth-logo.png', 'bnb', false),
  ('$BIAO', 'Biaoqing', 'https://cryptologos.cc/logos/ethereum-eth-logo.png', 'bnb', false),
  ('$BMC', 'BullishMarketCap', 'https://cryptologos.cc/logos/ethereum-eth-logo.png', 'bnb', false),
  ('BUSD', 'Binance USD', 'https://cryptologos.cc/logos/binance-usd-busd-logo.png', 'bnb', false),
  ('ETH', 'Ethereum', 'https://cryptologos.cc/logos/ethereum-eth-logo.png', 'eth', true),
  ('USDC', 'USD Coin', 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png', 'eth', true),
  ('DAI', 'Dai Stablecoin', 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png', 'eth', false),
  ('WBTC', 'Wrapped Bitcoin', 'https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png', 'eth', false),
  ('LINK', 'Chainlink', 'https://cryptologos.cc/logos/chainlink-link-logo.png', 'eth', false)
ON CONFLICT DO NOTHING;
