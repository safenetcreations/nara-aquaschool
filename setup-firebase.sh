#!/bin/bash

# ========================================
# NARA Platform - Firebase Setup Script
# ========================================
# This script helps you set up the unified Firebase project
# for both AquaSchool and Nexus applications.
# ========================================

set -e  # Exit on error

echo "🚀 NARA Platform - Firebase Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}❌ Firebase CLI is not installed${NC}"
    echo "Install it with: npm install -g firebase-tools"
    exit 1
fi

echo -e "${GREEN}✅ Firebase CLI found${NC}"
echo ""

# Step 1: Login to Firebase
echo "📝 Step 1: Firebase Login"
echo "-------------------------"
echo "Opening browser for Firebase login..."
firebase login
echo ""

# Step 2: Check if .env files exist
echo "📝 Step 2: Environment Files Check"
echo "-----------------------------------"

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found for AquaSchool${NC}"
    echo "Creating from template..."
    cp .env.example .env
    echo -e "${YELLOW}Please edit .env and add your Firebase credentials${NC}"
    ENV_NEEDS_CONFIG=true
fi

if [ ! -f "nara-nexus/.env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found for Nexus${NC}"
    echo "Creating from template..."
    cp nara-nexus/.env.example nara-nexus/.env
    echo -e "${YELLOW}Please edit nara-nexus/.env with SAME credentials as AquaSchool${NC}"
    ENV_NEEDS_CONFIG=true
fi

if [ "$ENV_NEEDS_CONFIG" = true ]; then
    echo ""
    echo -e "${RED}⚠️  STOP: Configure .env files before continuing!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Create Firebase project 'nara-platform' at https://console.firebase.google.com"
    echo "2. Get your Firebase config from Project Settings"
    echo "3. Edit .env files with your credentials"
    echo "4. Run this script again"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Environment files configured${NC}"
echo ""

# Step 3: Initialize or use existing Firebase project
echo "📝 Step 3: Firebase Project Setup"
echo "----------------------------------"
read -p "Enter your Firebase project ID (e.g., nara-platform): " PROJECT_ID

if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}❌ Project ID cannot be empty${NC}"
    exit 1
fi

echo "Using Firebase project: $PROJECT_ID"
firebase use "$PROJECT_ID" || {
    echo -e "${YELLOW}Project not found. Creating new project...${NC}"
    firebase projects:create "$PROJECT_ID" --display-name "NARA Platform"
    firebase use "$PROJECT_ID"
}

echo -e "${GREEN}✅ Using project: $PROJECT_ID${NC}"
echo ""

# Step 4: Set up hosting targets
echo "📝 Step 4: Configure Multi-Site Hosting"
echo "---------------------------------------"
echo "Setting up hosting targets..."

# Create or update .firebaserc
cat > .firebaserc << EOF
{
  "projects": {
    "default": "$PROJECT_ID"
  },
  "targets": {
    "$PROJECT_ID": {
      "hosting": {
        "aquaschool": [
          "aquaschool"
        ],
        "nexus": [
          "nexus"
        ]
      }
    }
  }
}
EOF

echo -e "${GREEN}✅ Hosting targets configured${NC}"
echo ""

# Step 5: Deploy Firestore rules
echo "📝 Step 5: Deploy Firestore Security Rules"
echo "------------------------------------------"
read -p "Deploy unified Firestore rules? (y/n): " DEPLOY_RULES

if [ "$DEPLOY_RULES" = "y" ] || [ "$DEPLOY_RULES" = "Y" ]; then
    echo "Deploying security rules..."
    firebase deploy --only firestore:rules --project "$PROJECT_ID"
    echo -e "${GREEN}✅ Firestore rules deployed${NC}"
else
    echo "⏭️  Skipped Firestore rules deployment"
fi
echo ""

# Step 6: Build and deploy apps
echo "📝 Step 6: Build & Deploy Applications"
echo "--------------------------------------"
read -p "Build and deploy both apps? (y/n): " DEPLOY_APPS

if [ "$DEPLOY_APPS" = "y" ] || [ "$DEPLOY_APPS" = "Y" ]; then
    # Build AquaSchool
    echo "Building AquaSchool..."
    npm install
    npm run build

    # Build Nexus
    echo "Building Nexus..."
    cd nara-nexus
    npm install --legacy-peer-deps
    npm run build
    cd ..

    # Deploy both
    echo "Deploying to Firebase Hosting..."
    firebase deploy --only hosting --project "$PROJECT_ID"

    echo -e "${GREEN}✅ Apps deployed successfully!${NC}"
else
    echo "⏭️  Skipped deployment"
fi
echo ""

# Summary
echo "=================================="
echo "✨ Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Go to Firebase Console: https://console.firebase.google.com/project/$PROJECT_ID"
echo "2. Enable Authentication (Email/Password + Google)"
echo "3. Create Firestore Database (production mode, asia-south1)"
echo "4. Enable Cloud Storage"
echo "5. Test the applications:"
echo "   - AquaSchool: https://aquaschool-$PROJECT_ID.web.app"
echo "   - Nexus: https://nexus-$PROJECT_ID.web.app"
echo ""
echo "📚 Documentation:"
echo "   - Architecture: NARA_UNIFIED_ARCHITECTURE.md"
echo "   - Setup Guide: INTEGRATION_SETUP_GUIDE.md"
echo "   - Summary: IMPLEMENTATION_SUMMARY.md"
echo ""
echo -e "${GREEN}🎉 Happy coding!${NC}"
