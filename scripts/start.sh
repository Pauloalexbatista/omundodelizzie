#!/bin/sh

# Ensure the entry point is running from the app directory
cd /app

echo "Starting O Mundo de Lizzie..."

# Fix: If the volume at /app/prisma hides the image files, restore from backup
if [ ! -f /app/prisma/schema.prisma ]; then
  echo "Restoring Prisma schema from backup into persistent volume..."
  cp -r /app/prisma_backup/* /app/prisma/
fi

# Run Prisma migrations/db push to ensure tables exist in the production SQLite file
echo "Initializing database..."
npx prisma db push --accept-data-loss

# Start the Next.js server
echo "Starting Next.js server..."
node server.js
