#!/bin/bash

# ========================================
# NARA Platform - Integration Test Script
# ========================================
# Automated tests for local integration
# ========================================

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}🧪 NARA Platform - Integration Tests${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Test 1: Check Node and npm versions
echo -e "${YELLOW}Test 1: Checking Prerequisites...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js installed: $NODE_VERSION${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ Node.js not installed${NC}"
    ((TESTS_FAILED++))
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ npm installed: $NPM_VERSION${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ npm not installed${NC}"
    ((TESTS_FAILED++))
fi

if command -v firebase &> /dev/null; then
    FIREBASE_VERSION=$(firebase --version)
    echo -e "${GREEN}✓ Firebase CLI installed: $FIREBASE_VERSION${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ Firebase CLI not installed${NC}"
    echo -e "${YELLOW}  Install with: npm install -g firebase-tools${NC}"
    ((TESTS_FAILED++))
fi

echo ""

# Test 2: Check file structure
echo -e "${YELLOW}Test 2: Checking File Structure...${NC}"

FILES_TO_CHECK=(
    ".env.example"
    "nara-nexus/.env.example"
    "firebase.json"
    "firestore.unified.rules"
    "setup-firebase.sh"
    "src/config/firebase.js"
    "nara-nexus/src/config/firebase.ts"
    "src/services/authService.js"
    "src/services/graduationService.js"
    "nara-nexus/src/contexts/AuthContext.tsx"
)

for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file exists${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ $file missing${NC}"
        ((TESTS_FAILED++))
    fi
done

echo ""

# Test 3: Check .env files
echo -e "${YELLOW}Test 3: Checking Environment Configuration...${NC}"

if [ -f ".env" ]; then
    echo -e "${GREEN}✓ AquaSchool .env file exists${NC}"
    ((TESTS_PASSED++))

    # Check for required variables
    if grep -q "REACT_APP_FIREBASE_PROJECT_ID=" .env; then
        PROJECT_ID=$(grep "REACT_APP_FIREBASE_PROJECT_ID=" .env | cut -d '=' -f2)
        echo -e "${GREEN}  Project ID: $PROJECT_ID${NC}"

        if [ "$PROJECT_ID" = "nara-platform" ] || [ -n "$PROJECT_ID" ]; then
            echo -e "${GREEN}✓ Firebase project ID configured${NC}"
            ((TESTS_PASSED++))
        else
            echo -e "${RED}✗ Firebase project ID not set${NC}"
            ((TESTS_FAILED++))
        fi
    else
        echo -e "${RED}✗ PROJECT_ID not found in .env${NC}"
        ((TESTS_FAILED++))
    fi
else
    echo -e "${YELLOW}⚠ AquaSchool .env file not found${NC}"
    echo -e "${YELLOW}  Create from: cp .env.example .env${NC}"
    ((TESTS_FAILED++))
fi

if [ -f "nara-nexus/.env" ]; then
    echo -e "${GREEN}✓ Nexus .env file exists${NC}"
    ((TESTS_PASSED++))

    # Check if project IDs match
    if [ -f ".env" ]; then
        AQUA_PROJECT=$(grep "REACT_APP_FIREBASE_PROJECT_ID=" .env | cut -d '=' -f2)
        NEXUS_PROJECT=$(grep "REACT_APP_FIREBASE_PROJECT_ID=" nara-nexus/.env | cut -d '=' -f2)

        if [ "$AQUA_PROJECT" = "$NEXUS_PROJECT" ]; then
            echo -e "${GREEN}✓ Both apps use same Firebase project${NC}"
            ((TESTS_PASSED++))
        else
            echo -e "${RED}✗ Apps using different projects!${NC}"
            echo -e "${RED}  AquaSchool: $AQUA_PROJECT${NC}"
            echo -e "${RED}  Nexus: $NEXUS_PROJECT${NC}"
            ((TESTS_FAILED++))
        fi
    fi
else
    echo -e "${YELLOW}⚠ Nexus .env file not found${NC}"
    echo -e "${YELLOW}  Create from: cp nara-nexus/.env.example nara-nexus/.env${NC}"
    ((TESTS_FAILED++))
fi

echo ""

# Test 4: Check firebase.json configuration
echo -e "${YELLOW}Test 4: Checking Firebase Configuration...${NC}"

if [ -f "firebase.json" ]; then
    if grep -q '"target": "aquaschool"' firebase.json; then
        echo -e "${GREEN}✓ AquaSchool hosting target configured${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ AquaSchool hosting target missing${NC}"
        ((TESTS_FAILED++))
    fi

    if grep -q '"target": "nexus"' firebase.json; then
        echo -e "${GREEN}✓ Nexus hosting target configured${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ Nexus hosting target missing${NC}"
        ((TESTS_FAILED++))
    fi

    if grep -q "firestore.unified.rules" firebase.json; then
        echo -e "${GREEN}✓ Unified security rules configured${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ Security rules not configured${NC}"
        ((TESTS_FAILED++))
    fi
else
    echo -e "${RED}✗ firebase.json not found${NC}"
    ((TESTS_FAILED++))
fi

echo ""

# Test 5: Check dependencies
echo -e "${YELLOW}Test 5: Checking Dependencies...${NC}"

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ AquaSchool dependencies installed${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠ AquaSchool dependencies not installed${NC}"
    echo -e "${YELLOW}  Run: npm install${NC}"
    ((TESTS_FAILED++))
fi

if [ -d "nara-nexus/node_modules" ]; then
    echo -e "${GREEN}✓ Nexus dependencies installed${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠ Nexus dependencies not installed${NC}"
    echo -e "${YELLOW}  Run: cd nara-nexus && npm install --legacy-peer-deps${NC}"
    ((TESTS_FAILED++))
fi

echo ""

# Test 6: Check security rules syntax
echo -e "${YELLOW}Test 6: Validating Security Rules...${NC}"

if [ -f "firestore.unified.rules" ]; then
    if grep -q "function hasSchoolAccess()" firestore.unified.rules; then
        echo -e "${GREEN}✓ hasSchoolAccess() function found${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ hasSchoolAccess() function missing${NC}"
        ((TESTS_FAILED++))
    fi

    if grep -q "function hasNexusAccess()" firestore.unified.rules; then
        echo -e "${GREEN}✓ hasNexusAccess() function found${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ hasNexusAccess() function missing${NC}"
        ((TESTS_FAILED++))
    fi

    if grep -q "match /users/{userId}" firestore.unified.rules; then
        echo -e "${GREEN}✓ Users collection rules found${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ Users collection rules missing${NC}"
        ((TESTS_FAILED++))
    fi

    if grep -q "match /schoolProfiles/{userId}" firestore.unified.rules; then
        echo -e "${GREEN}✓ SchoolProfiles collection rules found${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ SchoolProfiles collection rules missing${NC}"
        ((TESTS_FAILED++))
    fi

    if grep -q "match /nexusProfiles/{userId}" firestore.unified.rules; then
        echo -e "${GREEN}✓ NexusProfiles collection rules found${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ NexusProfiles collection rules missing${NC}"
        ((TESTS_FAILED++))
    fi
else
    echo -e "${RED}✗ firestore.unified.rules not found${NC}"
    ((TESTS_FAILED++))
fi

echo ""

# Test 7: Check graduation service
echo -e "${YELLOW}Test 7: Checking Graduation Service...${NC}"

if [ -f "src/services/graduationService.js" ]; then
    if grep -q "export const graduateStudent" src/services/graduationService.js; then
        echo -e "${GREEN}✓ graduateStudent() function found${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ graduateStudent() function missing${NC}"
        ((TESTS_FAILED++))
    fi

    if grep -q "checkGraduationEligibility" src/services/graduationService.js; then
        echo -e "${GREEN}✓ checkGraduationEligibility() function found${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ checkGraduationEligibility() function missing${NC}"
        ((TESTS_FAILED++))
    fi
else
    echo -e "${RED}✗ graduationService.js not found${NC}"
    ((TESTS_FAILED++))
fi

echo ""

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}📊 Test Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! Ready for deployment.${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Run: ./setup-firebase.sh"
    echo "2. Configure .env files with Firebase credentials"
    echo "3. Deploy: firebase deploy"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests failed. Please fix the issues above.${NC}"
    echo ""
    echo -e "${BLUE}Common fixes:${NC}"
    echo "- Create .env files: cp .env.example .env"
    echo "- Install dependencies: npm install && cd nara-nexus && npm install --legacy-peer-deps"
    echo "- Configure Firebase: Edit .env files with your Firebase credentials"
    exit 1
fi
