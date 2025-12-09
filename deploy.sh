#!/bin/bash

set -e

echo "Deploying..."

# Load NVM if available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Or add Node to PATH if installed globally
export PATH="/usr/local/bin:/usr/bin:$PATH"

git config --global --add safe.directory /var/www/equaldeals.com

git pull --rebase

php artisan down

composer install --no-dev --optimize-autoloader

npm install

npm run build

php artisan optimize:clear

php artisan migrate --force

php artisan config:cache

# php artisan route:cache

php artisan view:cache

sudo supervisorctl restart all

php artisan up

echo "Deploying completed"
