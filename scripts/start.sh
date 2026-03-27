#!/bin/sh

# Ensure the entry point is running from the app directory
cd /app

echo "Starting O Mundo de Lizzie..."

# Fix: Use the schema from the root (not hidden by volume)
echo "Initializing database using /app/schema.prisma..."
npx prisma db push --schema /app/schema.prisma --accept-data-loss

# Start the Next.js server
echo "Starting Next.js server..."
node server.js
