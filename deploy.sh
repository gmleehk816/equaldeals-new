#!/bin/bash

set -e

echo "Deploying..."

git config --global --add safe.directory /var/www/equaldeals.com

git pull --rebase

composer install --no-dev --optimize-autoloader

php artisan optimize:clear

php artisan migrate --force

php artisan config:cache

# php artisan route:cache

php artisan view:cache

echo "Deploying completed"
