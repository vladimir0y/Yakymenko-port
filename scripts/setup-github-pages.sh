#!/bin/bash

# GitHub Pages Setup Script for HTML Projects
# This script helps create separate GitHub repositories for each HTML project

echo "🚀 GitHub Pages Setup for HTML Projects"
echo "========================================"

# Configuration
GITHUB_USERNAME="vladimir0y"
BASE_REPO_PREFIX="portfolio-project"

# Projects to set up
declare -a PROJECTS=("GBL" "Time_Management" "Time_Management_Main" "rock-climbing-raw-v2ojS82U")

# Function to create and setup a repository
setup_project() {
    local project_name=$1
    local repo_name="${BASE_REPO_PREFIX}-${project_name,,}"  # Convert to lowercase
    local project_path="Projects/${project_name}"
    
    echo "📁 Setting up: ${project_name}"
    echo "   Repository: ${repo_name}"
    echo "   Path: ${project_path}"
    
    # Check if project directory exists
    if [ ! -d "${project_path}" ]; then
        echo "   ❌ Project directory not found: ${project_path}"
        return 1
    fi
    
    # Create temporary directory for the repository
    local temp_dir="temp_${repo_name}"
    
    echo "   📋 Creating temporary repository directory..."
    mkdir -p "${temp_dir}"
    
    # Copy project files to temp directory
    echo "   📂 Copying project files..."
    cp -r "${project_path}/"* "${temp_dir}/"
    
    # Create README.md
    cat > "${temp_dir}/README.md" << EOF
# ${project_name}

This is a portfolio project showcasing interactive web development.

## Live Demo

Visit the live demo: [https://${GITHUB_USERNAME}.github.io/${repo_name}](https://${GITHUB_USERNAME}.github.io/${repo_name})

## About

This project is part of Vladimir's portfolio. View the complete portfolio at: [https://${GITHUB_USERNAME}.github.io/Website-Portfolio](https://${GITHUB_USERNAME}.github.io/Website-Portfolio)

## Technology Stack

- HTML5
- CSS3
- JavaScript
- Interactive Media Elements

## Setup

To run this project locally:

1. Clone this repository
2. Open \`index.html\` or \`story.html\` in your browser
3. Enjoy the interactive experience!

---

© 2024 Vladimir. All rights reserved.
EOF

    # Initialize git repository
    echo "   🔧 Initializing git repository..."
    cd "${temp_dir}"
    git init
    git add .
    git commit -m "Initial commit: Add ${project_name} project files

- Interactive HTML/CSS/JavaScript project
- Ready for GitHub Pages deployment
- Part of Vladimir's portfolio collection"
    
    echo "   📤 Instructions for GitHub setup:"
    echo "      1. Create repository '${repo_name}' on GitHub"
    echo "      2. Run these commands in ${temp_dir}:"
    echo "         git remote add origin https://github.com/${GITHUB_USERNAME}/${repo_name}.git"
    echo "         git branch -M main"
    echo "         git push -u origin main"
    echo "      3. Enable GitHub Pages in repository settings"
    echo "      4. Set source to 'Deploy from a branch' -> 'main' -> '/ (root)'"
    echo ""
    
    cd ..
    
    return 0
}

# Main execution
echo "This script will prepare your HTML projects for GitHub Pages deployment."
echo "Each project will be copied to a temporary directory ready for GitHub upload."
echo ""

for project in "${PROJECTS[@]}"; do
    setup_project "$project"
    echo "----------------------------------------"
done

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Create each repository on GitHub"
echo "2. Push the code from each temp directory"
echo "3. Enable GitHub Pages for each repository"
echo "4. Update your portfolio with the live URLs"
echo ""
echo "GitHub Pages URLs will be:"
for project in "${PROJECTS[@]}"; do
    repo_name="${BASE_REPO_PREFIX}-${project,,}"
    echo "   ${project}: https://${GITHUB_USERNAME}.github.io/${repo_name}"
done
