export type Address = {
  type?: string;
  address?: string;
  port?: number;
};

export type NodeInfo = {
  isLoading: boolean;
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
};

export type FeeRate = {
  perkw?: number;
  perkb?: number;
};

export type HTLC = {
  direction?: string;
  id?: number;
  amount_msat?: string;
  expiry?: string;
  payment_hash?: string;
  state?: string;
  local_trimmed?: boolean;
};

export type StateChange = {
  timestamp?: string;
  old_state?: string;
  new_state?: string;
  cause?: string;
  message?: string;
};

export type Funding = {
  local_funds_msat?: string;
  remote_funds_msat?: string;
  pushed_msat?: string;
  fee_paid_msat?: string;
  fee_rcvd_msat?: string;
};

export type Alias = {
  local?: string;
  remote?: string;
};

export type Channel = {
  state?: string;
  connected?: boolean;
  scratch_txid?: string;
  feerate?: FeeRate;
  owner?: string;
  short_channel_id?: string;
  direction?: number;
  channel_id?: string;
  funding_txid?: string;
  funding_outnum?: number;
  close_to_addr?: string;
  close_to?: string;
  private?: boolean;
  opener?: string;
  alias?: Alias;
  features?: string[];
  funding?: Funding;
  msatoshi_to_us?: number;
  msatoshi_to_us_min?: number;
  msatoshi_to_us_max?: number;
  msatoshi_total?: number;
  fee_proportional_millionths?: number;
  dust_limit_satoshis?: number;
  max_htlc_value_in_flight_msat?: number;
  their_channel_reserve_satoshis?: number;
  our_channel_reserve_satoshis?: number;
  spendable_msatoshi?: number;
  receivable_msatoshi?: number;
  htlc_minimum_msat?: number;
  their_to_self_delay?: number;
  our_to_self_delay?: number;
  max_accepted_htlcs?: number;
  state_changes?: StateChange[];
  status?: string[];
  in_payments_offered?: number;
  in_msatoshi_offered?: number;
  in_payments_fulfilled?: number;
  in_msatoshi_fulfilled?: number;
  out_payments_offered?: number;
  out_msatoshi_offered?: number;
  out_payments_fulfilled?: number;
  out_msatoshi_fulfilled?: number;
  htlcs?: HTLC[];
};

export type Peer = {
  id?: string;
  connected?: boolean;
  netaddr?: string[];
  features?: string;
  channels?: Channel[];
};

export type ListPeers = {
  isLoading: boolean;
  peers?: Peer[];
  error?: any;
}

export type Invoice = {
  bolt11?: string;
  bolt12?: string;
  description?: string;
  expires_at?: number;
  label?: string;
  msatoshi?: number;
  msatoshi_received?: number;
  local_offer_id?: string;
  invreq_payer_note?: string;
  paid_at?: number;
  pay_index?: number;
  payment_hash?: string;
  payment_preimage?: string;
  status?: string;
};

export type ListInvoices = {
  isLoading: boolean;
  invoices?: Invoice[];
  error?: any;
}

export type Payment = {
  id?: number;
  groupid?: number;
  payment_hash?: string;
  status?: string;
  created_at?: number;
  msatoshi?: number;
  msatoshi_sent?: number;
  destination?: string;
  label?: string;
  bolt11?: string;
  description?: string;
  bolt12?: string;
  payment_preimage?: string;
  erroronion?: string;
}

export type ListPayments = {
  isLoading: boolean;
  payments?: Payment[];
  error?: any;
}

export type TxInput = {
  txid?: string;
  index?: string;
  sequence?: string;
  type?: string;
  channel?: string;
}

export type TxOutput = {
  index?: string;
  amount_msat?: string;
  scriptPubKey?: string;
  type?: string;
  channel?: string;
}

export type Transaction = {
  hash?: string;
  rawtx?: string;
  blockheight?: string;
  txindex?: string;
  locktime?: string;
  version?: string;
  inputs?: TxInput[];
  outputs?: TxOutput[];
  type?: string[];
  channel?: string;
}

export type ListTransactions = {
  isLoading: boolean;
  transactions?: Transaction[];
  error?: any;
}

export type FundOutput = {
  txid?: string;
  output?: string;
  value?: number;
  amount_msat?: string;
  scriptpubkey?: string;
  status?: string;
  reserved?: boolean;
  address?: string;
  redeemscript?: string;
  blockheight?: string;
  reserved_to_block?: string;
}

export type FundChannel = {
  peer_id?: string;
  our_amount_msat?: string;
  amount_msat?: string;
  funding_txid?: string;
  funding_output?: string;
  connected?: boolean;
  state?: string;
  short_channel_id?: string;
  channel_sat?: number;
  channel_total_sat?: number;

}

export type Fund = {
  isLoading: boolean;
  channels?: FundChannel[];
  outputs?: FundOutput[];
  error?: any;
}

export type WalletBalances = {
  isLoading: boolean;
  clnLocalBalance?: number;
  clnRemoteBalance?: number;
  clnPendingBalance?: number;
  clnInactiveBalance?: number;
  btcConfBalance?: number;
  btcUnconfBalance?: number;
  btcTotalBalance?: number;
  error?: any;
}
