#!/bin/bash

set -e

echo "Deploying..."

git config --global --add safe.directory /var/www/equaldeals.com

git add .

git stash

git pull --rebase

export COMPOSER_ALLOW_SUPERUSER=1
composer install --optimize-autoloader --no-plugins --no-scripts

php artisan migrate --force

php artisan config:clear

supervisorctl restart all

npm install

npm run build

echo "Deploying completed"
