#!/bin/bash
# Script to check for broken links while excluding worker node_modules

# Temporarily move worker/node_modules if it exists
if [ -d "worker/node_modules" ]; then
    echo "Temporarily moving worker/node_modules..."
    mv worker/node_modules /tmp/flipt-docs-worker-node_modules
fi

# Run the broken links check
echo "Checking for broken links..."
npx mint broken-links

# Capture the exit code
EXIT_CODE=$?

# Restore worker/node_modules if we moved it
if [ -d "/tmp/flipt-docs-worker-node_modules" ]; then
    echo "Restoring worker/node_modules..."
    mv /tmp/flipt-docs-worker-node_modules worker/node_modules
fi

exit $EXIT_CODE