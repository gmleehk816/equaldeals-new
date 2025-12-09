#!/bin/bash

set -e

echo "Deploying..."

# Add root's Node.js to PATH
export PATH="/root/.nvm/versions/node/v24.11.1/bin:$PATH"

git config --global --add safe.directory /var/www/equaldeals.com

git pull --rebase

php artisan down

composer install --no-dev --optimize-autoloader

php artisan optimize:clear

php artisan migrate --force

php artisan config:cache

# php artisan route:cache

php artisan view:cache

sudo supervisorctl restart all

php artisan up

echo "Deploying completed"
