#!/bin/bash
# TencentNexus - Quick Deployment Script

echo "🚀 TencentNexus Deployment Helper"
echo "=================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Get GitHub username
echo "📝 Enter your GitHub username:"
read GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Username cannot be empty"
    exit 1
fi

# Confirm
echo ""
echo "Your site will be: https://$GITHUB_USERNAME.github.io/TencentNexus/"
echo "Is this correct? (y/n)"
read CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

# Update app.js
echo ""
echo "🔧 Updating app.js with your username..."
sed -i.bak "s/YOUR_GITHUB_USERNAME/$GITHUB_USERNAME/g" app.js
rm app.js.bak

# Update index.html
echo "🔧 Updating index.html with your URL..."
sed -i.bak "s/YOUR_USERNAME/$GITHUB_USERNAME/g" index.html
rm index.html.bak

# Update sitemap.xml
echo "🔧 Updating sitemap.xml..."
sed -i.bak "s/YOUR_USERNAME/$GITHUB_USERNAME/g" sitemap.xml
rm sitemap.xml.bak

# Update robots.txt
echo "🔧 Updating robots.txt..."
sed -i.bak "s/YOUR_USERNAME/$GITHUB_USERNAME/g" robots.txt
rm robots.txt.bak

# Initialize git if not already
if [ ! -d ".git" ]; then
    echo ""
    echo "📦 Initializing git repository..."
    git init
    git branch -M main
fi

# Add files
echo "📦 Adding files to git..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "Initial commit: TencentNexus URL Shortener configured for $GITHUB_USERNAME"

# Check if remote exists
if git remote | grep -q "origin"; then
    echo "ℹ️  Remote 'origin' already exists"
else
    echo ""
    echo "🔗 Adding remote repository..."
    git remote add origin "https://github.com/$GITHUB_USERNAME/TencentNexus.git"
fi

echo ""
echo "✅ Configuration complete!"
echo ""
echo "📋 Next steps:"
echo "1. Create a repository named 'TencentNexus' on GitHub"
echo "2. Run: git push -u origin main"
echo "3. Go to Settings → Pages → Enable GitHub Pages (main branch, root folder)"
echo "4. Go to Settings → Features → Enable Issues"
echo "5. Visit: https://$GITHUB_USERNAME.github.io/TencentNexus/"
echo ""
echo "📖 For detailed instructions, see SETUP_GUIDE.md"
echo ""
