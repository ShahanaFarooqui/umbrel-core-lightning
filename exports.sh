export APP_BITCOIN_NETWORK="regtest"
export APP_BITCOIN_RPC_USER="umbrel"
export APP_BITCOIN_RPC_PASS="moneyprintergobrrr"
export APP_BITCOIN_NODE_IP="172.23.0.2"

export TOR_PROXY_IP=""
export TOR_PROXY_PORT=""
export TOR_PASSWORD=""

export APP_CORE_LIGHTNING_IP="172.23.0.4"
export APP_CORE_LIGHTNING_PORT="2103"
export APP_CORE_LIGHTNING_DAEMON_IP="172.23.0.3"
export APP_CORE_LIGHTNING_DAEMON_PORT=9736

export APP_CORE_LIGHTNING_BITCOIN_NETWORK="${APP_BITCOIN_NETWORK}"
if [[ "${APP_BITCOIN_NETWORK}" == "mainnet" ]]; then
	export APP_CORE_LIGHTNING_BITCOIN_NETWORK="bitcoin"
fi

export APP_CORE_LIGHTNING_WS_PORT=5001
export APP_CORE_LIGHTNING_APPLICATION_MODE="development"
export APP_CORE_LIGHTNING_TOR_HOST=""

export APP_CORE_LIGHTNING_RUNE="NZ0wOuBtKlKdmQ_MBsME6Hlbo0kKYNNBo8gUZFYuFpI9MA=="
export APP_CORE_LIGHTNING_NODE_PUBKEY="034c46fcb1a954ca34f61a3248c1854ff7f97b27217ffa9c9caafa81f78c772894"
export APP_CORE_LIGHTNING_CONFIG_LOCATION="/data/app/config.json"
export APP_CORE_LIGHTNING_LOG_FILE_LOCATION="/app/apps/backend/dist/log/cln.log"

# export APP_CORE_LIGHTNING_IP="localhost"
# export APP_CORE_LIGHTNING_PORT="3007"
# export APP_CORE_LIGHTNING_RUNE="bfoeiPMx3rZslYvQZq6hjtDXRMmT_JKxEgXDHjLRpyU9MA=="
# export APP_CORE_LIGHTNING_NODE_PUBKEY="037610b58f47e78ea5178e56f4c793656da5cf093d6269a37f5b0709b7d610e627"
# export APP_CORE_LIGHTNING_CONFIG_LOCATION="../../../../data/app/config.json"
# export APP_CORE_LIGHTNING_LOG_FILE_LOCATION="./app/apps/backend/dist/log/cln.log"
