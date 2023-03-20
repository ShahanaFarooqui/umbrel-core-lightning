#!/bin/bash
ENV_FILE_PATH="/root/.lightning/.commando-env"
export APP_BITCOIN_NETWORK="regtest"
export APP_BITCOIN_RPC_USER="umbrel"
export APP_BITCOIN_RPC_PASS="moneyprintergobrrr"
export APP_BITCOIN_NODE_IP="172.23.0.2"
export APP_CORE_LIGHTNING_DAEMON_IP="172.23.0.3"
export LIGHTNING_GRPC_PORT=5010
export APP_CORE_LIGHTNING_WS_PORT=5011
export APP_CORE_LIGHTNING_BITCOIN_NETWORK="regtest"
echo $APP_BITCOIN_NODE_IP
echo $APP_BITCOIN_RPC_USER
echo $APP_BITCOIN_RPC_PASS
echo $APP_CORE_LIGHTNING_DAEMON_IP
echo $APP_CORE_LIGHTNING_BITCOIN_NETWORK
echo $APP_CORE_LIGHTNING_DAEMON_GRPC_PORT
echo $APP_CORE_LIGHTNING_WS_PORT

sleep 1

if [[ -f "$ENV_FILE_PATH" ]]; then
  rm -f $ENV_FILE_PATH
else
  echo "File does not exist"
fi

echo "GET INFO"
GETINFO=$(/root/.lightning/lightning-cli --network=regtest getinfo)
echo $GETINFO

echo "PUBKEY"
regex='"id"[[:space:]]*:[[:space:]]*"((\\.|[^"\\])*)"'
if [[ $GETINFO =~ $regex ]]; then
  PUBKEY=${BASH_REMATCH[1]}
fi
echo $PUBKEY

echo APP_CORE_LIGHTNING_NODE_PUBKEY="$PUBKEY" >> $ENV_FILE_PATH

# echo "CHECK IF RUNE ALREADY EXISTS"
# echo $(/root/.lightning/lightning-cli --network=regtest commando-listrunes)

# echo "GET RUNE"
# echo $(/root/.lightning/lightning-cli --network=regtest getinfo)

# echo "SAVE RUNE IN DATASTORE"
# echo $(/root/.lightning/lightning-cli --network=regtest getinfo)

echo "START APPLICATION"
exec "$@"
