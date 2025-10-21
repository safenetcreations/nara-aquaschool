#!/bin/bash

# Quick Deploy Script for NARA AquaSchool to Nexus
# This script ensures fresh authentication and deployment

set -e  # Exit on error

echo "🌊 NARA AquaSchool - Quick Deploy to Nexus"
echo "==========================================="
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

echo "📍 Working directory: $(pwd)"
echo ""

# Check if build exists
if [ ! -d "build" ] || [ ! -f "build/index.html" ]; then
    echo "❌ Build directory missing or incomplete!"
    echo "   Running fresh build..."
    echo ""
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed!"
        exit 1
    fi
fi

echo "✅ Build directory exists"
echo ""

# Show build info
echo "📦 Build Information:"
echo "   Size: $(du -sh build | cut -f1)"
echo "   Files: $(find build -type f | wc -l | xargs)"
echo ""

# Check Firebase CLI
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found!"
    echo "   Install with: npm install -g firebase-tools"
    exit 1
fi

echo "✅ Firebase CLI: $(firebase --version)"
echo ""

# Show deployment target
echo "🎯 Deployment Target:"
echo "   Project: nara-aquaschool"
echo "   Target: nexus"
echo "   Site: nexus-nara"
echo "   URL: https://nexus-nara.web.app"
echo ""

echo "🚀 Starting deployment..."
echo ""
echo "NOTE: If authentication is required, your browser will open."
echo "      Log in with: info@safenetcreations.com"
echo ""

# Try to deploy
firebase deploy --only hosting:nexus

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ DEPLOYMENT SUCCESSFUL!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🌐 Your site is live at:"
    echo "   https://nexus-nara.web.app"
    echo "   https://nexus-nara.firebaseapp.com"
    echo ""
    echo "💡 Tips:"
    echo "   - Clear browser cache if you see old content"
    echo "   - Try incognito/private browsing"
    echo "   - Check browser console for errors"
    echo ""
else
    echo ""
    echo "❌ DEPLOYMENT FAILED"
    echo ""
    echo "Troubleshooting:"
    echo "1. Run: firebase login --reauth"
    echo "2. Then run this script again"
    echo ""
    exit 1
fi
