#!/bin/bash

# Build the project
cd insstanto-frontend
npm ci
npm run build

# Move to the build folder
cd dist

# Create a .nojekyll file to bypass Jekyll processing
touch .nojekyll

# Initialize a new Git repository
git init
git add -A
git commit -m "Deploy to GitHub Pages"

# Force push to the gh-pages branch
git push -f https://github.com/CodeWithTheSaurabh/insstanto.git master:gh-pages

cd ..
