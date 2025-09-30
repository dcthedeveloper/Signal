#!/bin/bash

# Signal Quick Start Script
# This script helps you get Signal up and running quickly

set -e

echo "🚀 Signal - Financial Intelligence Platform Setup"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm --version) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚙️  Setting up environment variables..."
    cp .env.example .env
    echo "✅ .env file created from .env.example"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your API keys:"
    echo "   - VITE_ANTHROPIC_API_KEY"
    echo "   - VITE_ALPHA_VANTAGE_API_KEY"
    echo "   - VITE_FINNHUB_API_KEY"
    echo "   - VITE_NEWS_API_KEY"
    echo ""
    echo "   The app will work with mock data if you don't have keys yet."
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Run linter
echo "🔍 Running code quality checks..."
npm run lint

if [ $? -ne 0 ]; then
    echo "⚠️  Linting issues found, but continuing..."
else
    echo "✅ Code quality checks passed"
fi
echo ""

# Build the project
echo "🏗️  Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "To preview the production build:"
echo "  npm run preview"
echo ""
echo "To deploy:"
echo "  See DEPLOYMENT.md for instructions"
echo ""
echo "Happy coding! 💻"
