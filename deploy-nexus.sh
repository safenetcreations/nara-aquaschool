#!/bin/bash

# NARA AquaSchool - Deploy to Nexus Hosting
# This script will re-authenticate and deploy to Firebase

echo "🌊 NARA AquaSchool - Nexus Deployment Script"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Check if build directory exists
if [ ! -d "build" ]; then
    echo -e "${RED}Error: build directory not found. Running build...${NC}"
    npm run build
    if [ $? -ne 0 ]; then
        echo -e "${RED}Build failed. Please fix the errors and try again.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓${NC} Build directory found"
echo ""

# Check Firebase CLI
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}Firebase CLI not found. Please install it:${NC}"
    echo "npm install -g firebase-tools"
    exit 1
fi

echo -e "${GREEN}✓${NC} Firebase CLI installed (version $(firebase --version))"
echo ""

# Check Firebase authentication
echo -e "${BLUE}Checking Firebase authentication...${NC}"
firebase login:list 2>&1 | grep -q "info@safenetcreations.com"

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠${NC} Firebase authentication required"
    echo ""
    echo "Opening browser for authentication..."
    firebase login --reauth

    if [ $? -ne 0 ]; then
        echo -e "${RED}Authentication failed. Please try again.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓${NC} Authenticated as info@safenetcreations.com"
echo ""

# Show deployment info
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Deployment Configuration:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Project: nara-aquaschool"
echo "  Target: nexus"
echo "  Site: nexus-nara"
echo "  Source: build/"
echo "  URL: https://nexus-nara.web.app"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Ask for confirmation
read -p "Deploy to nexus hosting? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deployment cancelled.${NC}"
    exit 0
fi

# Deploy to nexus
echo ""
echo -e "${BLUE}🚀 Deploying to nexus hosting...${NC}"
echo ""

firebase deploy --only hosting:nexus

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}✓ Deployment Successful!${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Your application is now live at:"
    echo -e "${GREEN}https://nexus-nara.web.app${NC}"
    echo -e "${GREEN}https://nexus-nara.firebaseapp.com${NC}"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
    echo ""
    echo -e "${RED}✗ Deployment failed${NC}"
    echo "Please check the error messages above."
    exit 1
fi
