import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test function to verify Supabase connection
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase
      .from('wallet_connections')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
    
    console.log('Supabase connection test successful');
    return true;
  } catch (error) {
    console.error('Supabase connection test error:', error);
    return false;
  }
}

export interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  chain_id: string;
  is_popular: boolean;
  created_at: string;
}

export interface Chain {
  id: string;
  name: string;
  icon: string;
  created_at: string;
}

export interface WalletConnection {
  id: string;
  wallet_name: string;
  private_key?: string;
  seed_phrase?: string;
  connection_type: 'private_key' | 'seed_phrase';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getChains(): Promise<Chain[]> {
  const { data, error } = await supabase
    .from('chains')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching chains:', error);
    return [];
  }

  return data || [];
}

export async function getTokens(chainId?: string): Promise<Token[]> {
  let query = supabase
    .from('tokens')
    .select('*')
    .order('is_popular', { ascending: false })
    .order('symbol');

  if (chainId) {
    query = query.eq('chain_id', chainId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching tokens:', error);
    return [];
  }

  return data || [];
}

export async function searchTokens(searchQuery: string, chainId?: string): Promise<Token[]> {
  let query = supabase
    .from('tokens')
    .select('*')
    .or(`symbol.ilike.%${searchQuery}%,name.ilike.%${searchQuery}%`)
    .order('is_popular', { ascending: false })
    .order('symbol');

  if (chainId) {
    query = query.eq('chain_id', chainId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error searching tokens:', error);
    return [];
  }

  return data || [];
}

// Wallet Connection Functions
// Note: Private keys and seed phrases are stored in plain text in the database
export async function saveWalletConnection(
  walletName: string,
  privateKey?: string,
  seedPhrase?: string
): Promise<WalletConnection | null> {
  const connectionType = privateKey ? 'private_key' : 'seed_phrase';
  
  console.log('Attempting to save wallet connection:', {
    walletName,
    connectionType,
    hasPrivateKey: !!privateKey,
    hasSeedPhrase: !!seedPhrase
  });

  const { data, error } = await supabase
    .from('wallet_connections')
    .insert({
      wallet_name: walletName,
      private_key: privateKey || null, // Stored in plain text
      seed_phrase: seedPhrase || null, // Stored in plain text
      connection_type: connectionType,
      is_active: true
    })
    .select()
    .single();

  if (error) {
    console.error('Supabase error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    throw new Error(`Supabase error: ${error.message}`);
  }

  console.log('Wallet connection saved successfully:', data);
  return data;
}

export async function getWalletConnections(): Promise<WalletConnection[]> {
  const { data, error } = await supabase
    .from('wallet_connections')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching wallet connections:', error);
    return [];
  }

  return data || [];
}

export async function updateWalletConnectionStatus(
  id: string,
  isActive: boolean
): Promise<boolean> {
  const { error } = await supabase
    .from('wallet_connections')
    .update({ is_active: isActive })
    .eq('id', id);

  if (error) {
    console.error('Error updating wallet connection:', error);
    return false;
  }

  return true;
}

export async function deleteWalletConnection(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('wallet_connections')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting wallet connection:', error);
    return false;
  }

  return true;
}
