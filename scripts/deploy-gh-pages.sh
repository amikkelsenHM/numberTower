#!/bin/bash

# Exit on error
set -e

# Build the project
echo "Building the project..."
npm run build

# Create a temporary directory for deployment
TEMP_DIR="$(mktemp -d)"

echo "Setting up deployment in $TEMP_DIR..."

# Copy build output to temp directory
cp -r build/* "$TEMP_DIR/"

# Add .nojekyll file
touch "$TEMP_DIR/.nojekyll"

# Create a temporary git repository
cd "$TEMP_DIR"
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Add the remote
git remote add origin "https://github.com/amikkelsenHM/numberTower.git"

# Force push to the gh-pages branch
echo "Deploying to GitHub Pages..."
git push -f origin "HEAD:gh-pages"

# Cleanup
cd -
rm -rf "$TEMP_DIR"

echo ""
echo "Deployment complete! Your game should be available at:"
echo "https://amikkelsenhm.github.io/numberTower/"
echo ""
echo "Note: It may take a few minutes for the changes to be visible."
echo "If you see a 404, wait a few minutes and refresh the page."
