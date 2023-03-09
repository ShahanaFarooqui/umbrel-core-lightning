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
if [ "${APP_BITCOIN_NETWORK}" == "mainnet" ]; then
	export APP_CORE_LIGHTNING_BITCOIN_NETWORK="bitcoin"
fi

export APP_CORE_LIGHTNING_WS_PORT=5001

# Docker Variables
# export APP_DATA_DIR="."
# export APP_CORE_LIGHTNING_APPLICATION_MODE="production"
# export APP_CORE_LIGHTNING_RUNE="RdADhiHfnAYvWqt9w8ecqbba8JtOEXek_Of89v4Ptq89MA=="
# export APP_CORE_LIGHTNING_NODE_PUBKEY="033c44a135863100451b447d7ff2460bf13ef63d6dd8eb9e0e1446df6e53c65d31"
# echo "Docker Environment Variables Set"

# Local Variables
export APP_DATA_DIR="../../../.."
export APP_CORE_LIGHTNING_APPLICATION_MODE="development"
export APP_CORE_LIGHTNING_DAEMON_IP="localhost"

# Local Node 1
export APP_CORE_LIGHTNING_RUNE="bfoeiPMx3rZslYvQZq6hjtDXRMmT_JKxEgXDHjLRpyU9MA=="
export APP_CORE_LIGHTNING_NODE_PUBKEY="037610b58f47e78ea5178e56f4c793656da5cf093d6269a37f5b0709b7d610e627"

# Local Node 2
export APP_CORE_LIGHTNING_WS_PORT=5002
export APP_CORE_LIGHTNING_RUNE="EnY-PL3S27YClWAuGTQQdjHUutOe-fb1YooiD3jyyuE9MQ=="
export APP_CORE_LIGHTNING_NODE_PUBKEY="027bff0162504153dd48cb92a13d2ea781a7f33a014678beeb43a328c88e21bd7f"

# Local Node 3
export APP_CORE_LIGHTNING_WS_PORT=5003
export APP_CORE_LIGHTNING_RUNE="kZEsce8OZ4VjCsVEeGypUAbNbI1YznbW4CPfSP1c_aY9MA=="
export APP_CORE_LIGHTNING_NODE_PUBKEY="03f07d99b14a16b6d456cf36d15e4b07178573d534290e8e22242c9eac9e85e238"

echo "Local Environment Variables Set"

