export type Address = {
  type?: string;
  address?: string;
  port?: number;
}

export type NodeInfo = {
  id?: string;
  alias?: string;
  color?: string;
  num_peers?: number;
  num_pending_channels?: number;
  num_active_channels?: number;
  num_inactive_channels?: number;
  address?: Address[];
  binding?: Address[];
  version?: string;
  blockheight?: number;
  network?: string;
  msatoshi_fees_collected?: number;
  fees_collected_msat?: string;
  'lightning-dir'?: string;
  warning_bitcoind_sync?: string;
  our_features?: any;
  error?: any;
}
