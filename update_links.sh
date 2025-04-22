#!/bin/bash

# Find all .mdx files in v1 directory
find v1 -name "*.mdx" -type f | while read file; do
  # Use perl to replace links that don't start with /v1
  perl -i -pe 's/\[(.*?)\]\(\/((?!v1)[^)]+)\)/[$1](\/v1\/$2)/g' "$file"
  
  # Log files that were modified
  if [ $? -eq 0 ]; then
    echo "Updated links in: $file"
  fi
done

echo "Link update complete!" 