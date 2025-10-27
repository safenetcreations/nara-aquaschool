#!/bin/bash

# Translation Quality Agent Installation Script

set -e

echo "╔═══════════════════════════════════════════════════════╗"
echo "║  Translation Quality Agent - Installation             ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version check passed: $(node -v)"

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << 'EOF'
# Claude AI Configuration
ANTHROPIC_API_KEY=your_claude_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Translation Quality Settings
CHECK_INTERVAL=*/30 * * * *
AUTO_UPDATE=true
QUALITY_THRESHOLD=80
MAX_CONCURRENT_CHECKS=5

# React App Integration
REACT_APP_URL=http://localhost:3000
TRANSLATION_API_ENDPOINT=/api/translations

# Logging Configuration
LOG_LEVEL=info
LOG_MAX_SIZE=10m
LOG_MAX_FILES=5

# Security Settings
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:3000

# Quality Standards
GOVERNMENT_STANDARDS=true
FORMALITY_LEVEL=high
CULTURAL_SENSITIVITY=true
EOF
    echo "⚠️  IMPORTANT: Please edit .env and add your ANTHROPIC_API_KEY"
    echo "   Get your API key from: https://console.anthropic.com/"
    echo ""
fi

# Create logs directory with proper permissions
chmod 755 logs 2>/dev/null || true

echo ""
echo "✅ Installation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env and add your Claude API key"
echo "2. Update REACT_APP_URL if your React app runs on a different port"
echo "3. Run: npm start"
echo "4. Integrate with your React app (see README.md)"
echo ""
echo "🔗 Useful commands:"
echo "  npm start          - Start the agent"
echo "  npm run dev        - Start in development mode"
echo "  npm test           - Run tests"
echo ""
echo "📖 For integration help, see README.md"
echo ""

# Check if .env has API key
if grep -q "your_claude_api_key_here" .env; then
    echo "⚠️  REMINDER: Don't forget to add your Claude API key to .env"
    echo ""
fi