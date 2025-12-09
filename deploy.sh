#!/bin/bash

set -e

echo "Deploying..."

git config --global --add safe.directory /var/www/equaldeals.com

git pull --rebase

composer install --no-dev --optimize-autoloader

php artisan migrate --force

echo "Deploying completed"
