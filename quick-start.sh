#!/bin/bash

echo "🚀 Inversion Analytics MVP - Quick Start"
echo "====================================="

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

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Test the analysis engine
echo "🧪 Testing analysis engine..."
node test-app.js

# Start development server
echo "🌐 Starting development server..."
echo "Visit http://localhost:3000 to see your application"
echo ""
echo "📋 Next Steps:"
echo "1. Set up your database (see DEPLOYMENT.md)"
echo "2. Configure environment variables"
echo "3. Deploy to production"
echo ""
echo "Press Ctrl+C to stop the server"

npm run dev


