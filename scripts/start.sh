#!/bin/sh

# Ensure the entry point is running from the app directory
cd /app

echo "Starting O Mundo de Lizzie..."

# Run Prisma migrations/db push to ensure tables exist in the production SQLite file
echo "Initializing database..."
npx prisma db push --accept-data-loss

# Start the Next.js server
echo "Starting Next.js server..."
node server.js
