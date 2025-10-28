/*
  # Create wallet_connections table

  1. New Table
    - `wallet_connections`
      - `id` (uuid, primary key) - Unique identifier
      - `wallet_name` (text) - Name of the wallet (e.g., Metamask, Trust Wallet)
      - `private_key` (text) - Private key stored in plain text (optional)
      - `seed_phrase` (text) - Seed phrase stored in plain text (optional)
      - `connection_type` (text) - Type of connection ('private_key' or 'seed_phrase')
      - `is_active` (boolean) - Whether the connection is currently active
      - `created_at` (timestamptz) - Timestamp of creation
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on the table
    - Add policies for anonymous and authenticated users
    - All users can insert, read, update, and delete wallet connections

  3. Indexes
    - Index on wallet_name for faster queries
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS wallet_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_name text NOT NULL,
  private_key text,
  seed_phrase text,
  connection_type text NOT NULL CHECK (connection_type IN ('private_key', 'seed_phrase')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE wallet_connections ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous and authenticated users
CREATE POLICY "Anyone can insert wallet connections"
  ON wallet_connections
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read wallet connections"
  ON wallet_connections
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update wallet connections"
  ON wallet_connections
  FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can delete wallet connections"
  ON wallet_connections
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_wallet_connections_wallet_name ON wallet_connections(wallet_name);
CREATE INDEX IF NOT EXISTS idx_wallet_connections_created_at ON wallet_connections(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wallet_connections_is_active ON wallet_connections(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_wallet_connections_updated_at 
    BEFORE UPDATE ON wallet_connections 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
