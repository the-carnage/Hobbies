#!/bin/bash

echo "🌱 Starting Hobbies Development Environment..."
echo ""

# Check if node_modules exist
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

echo ""
echo "🚀 Starting backend server on http://localhost:5001..."
cd server && npm start &
SERVER_PID=$!

echo "🚀 Starting frontend on http://localhost:3000..."
cd client && npm run dev &
CLIENT_PID=$!

echo ""
echo "✅ Development servers started!"
echo "   Backend: http://localhost:5001"
echo "   Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $SERVER_PID $CLIENT_PID; exit" INT
wait
