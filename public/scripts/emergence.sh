#!/bin/bash

# Emergence CLI Tool - Secure Version
# Distribution: curl -L https://emergence.science/scripts/emergence -o emergence && chmod +x emergence

VERSION="1.2.0"
CONFIG_DIR="$HOME/.emergence"
CONFIG_FILE="$CONFIG_DIR/credentials.json"
API_URL=${EMERGENCE_API_URL:-"https://api.emergence.science"}

# Helper: Read value from JSON config
get_config_val() {
    local key=$1
    if [ -f "$CONFIG_FILE" ]; then
        python3 -c "import json, os; print(json.load(open('$CONFIG_FILE')).get('$key', ''))" 2>/dev/null
    fi
}

# Resolve API_KEY: priority Env Var > Config File
API_KEY=${EMERGENCE_API_KEY:-$(get_config_val "api_key")}

show_help() {
    echo "Emergence CLI v$VERSION"
    echo "Usage: emergence [command] [options]"
    echo ""
    echo "Commands:"
    echo "  auth init        Initialize credentials (saves to $CONFIG_FILE)"
    echo "  render <engine> <code>   Render a diagram (mermaid, d2, graphviz, tikz)"
    echo "  balance                 Check your credit balance"
    echo "  version                 Show version info"
    echo "  update                  Self-update the CLI tool"
    echo ""
    echo "Options:"
    echo "  --format <ext>          Output format (png, svg, pdf). Default: png"
    echo ""
    echo "Environment:"
    echo "  EMERGENCE_API_KEY       Override stored API key"
}

check_auth() {
    if [ -z "$API_KEY" ]; then
        echo "Error: API Key not found."
        echo "Run 'emergence auth init' or set EMERGENCE_API_KEY environment variable."
        exit 1
    fi
}

auth_init() {
    mkdir -p "$CONFIG_DIR"
    echo "Enter your Emergence API Key:"
    read -s KEY
    if [ -z "$KEY" ]; then
        echo "Error: Key cannot be empty."
        exit 1
    fi
    echo "{\"api_key\": \"$KEY\"}" > "$CONFIG_FILE"
    chmod 600 "$CONFIG_FILE"
    echo "Credentials saved to $CONFIG_FILE"
}

render() {
    check_auth
    ENGINE=$1
    CODE=$2
    FORMAT=${3:-"png"}

    if [ -z "$ENGINE" ] || [ -z "$CODE" ]; then
        echo "Usage: emergence render <engine> <code>"
        exit 1
    fi

    echo "Rendering $ENGINE diagram..." >&2

    RESPONSE=$(curl -s -X POST "$API_URL/tools/render" \
        -H "Authorization: Bearer $API_KEY" \
        -H "Content-Type: application/json" \
        -d "{
            \"engine\": \"$ENGINE\",
            \"code\": \"$(echo "$CODE" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read())[1:-1])')\",
            \"format\": \"$FORMAT\"
        }")

    STATUS=$(echo "$RESPONSE" | jq -r '.status')

    if [ "$STATUS" == "success" ]; then
        echo "$RESPONSE" | jq -r '.data.image_base64' | base64 -d > "output.$FORMAT"
        echo "Success! Saved to output.$FORMAT"
        echo "$RESPONSE" | jq -r '.billing'
    else
        echo "Error: $(echo "$RESPONSE" | jq -r '.detail')"
        exit 1
    fi
}

case "$1" in
    auth)
        if [ "$2" == "init" ]; then
            auth_init
        else
            show_help
        fi
        ;;
    render)
        render "$2" "$3" "$4"
        ;;
    balance)
        check_auth
        curl -s -H "Authorization: Bearer $API_KEY" "$API_URL/accounts/balance" | jq .
        ;;
    version)
        echo "Emergence CLI v$VERSION"
        ;;
    update)
        echo "Updating Emergence CLI..."
        curl -sL https://emergence.science/scripts/emergence -o emergence
        chmod +x emergence
        echo "Update complete."
        ;;
    *)
        show_help
        ;;
esac
