#!/bin/bash

# Test script for Flipt Documentation Redirect Worker
# Run this after starting the worker with `npm run dev`

BASE_URL="http://localhost:8787"

echo "Testing Flipt Documentation Redirect Worker..."
echo "============================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to test a URL and check if it redirects correctly
test_redirect() {
    local path=$1
    local expected=$2
    local should_redirect=$3
    
    response=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "$BASE_URL$path")
    http_code=$(echo $response | cut -d' ' -f1)
    redirect_url=$(echo $response | cut -d' ' -f2)
    
    if [ "$should_redirect" = true ]; then
        if [ "$http_code" = "301" ] && [[ "$redirect_url" == *"$expected"* ]]; then
            echo -e "${GREEN}✓${NC} $path → $expected (301)"
        else
            echo -e "${RED}✗${NC} $path - Expected redirect to $expected, got: $http_code $redirect_url"
        fi
    else
        if [ "$http_code" != "301" ]; then
            echo -e "${GREEN}✓${NC} $path - No redirect (pass-through)"
        else
            echo -e "${RED}✗${NC} $path - Should not redirect, but got: $http_code → $redirect_url"
        fi
    fi
}

echo "Testing paths that SHOULD redirect to /v1/..."
echo "----------------------------------------------"
test_redirect "/concepts" "/v1/concepts" true
test_redirect "/introduction" "/v1/introduction" true
test_redirect "/configuration/storage" "/v1/configuration/storage" true
test_redirect "/guides/user/gitops" "/v1/guides/user/gitops" true
test_redirect "/authentication/overview" "/v1/authentication/overview" true
test_redirect "/reference/flags/list-flags" "/v1/reference/flags/list-flags" true

echo ""
echo "Testing paths that should NOT redirect..."
echo "-----------------------------------------"
test_redirect "/" "/" false
test_redirect "/v1/concepts" "" false
test_redirect "/v2/introduction" "" false
test_redirect "/favicon.svg" "" false
test_redirect "/logo/light-logo.svg" "" false
test_redirect "/snippets/v2-pro.mdx" "" false

echo ""
echo "============================================="
echo "Test complete!"