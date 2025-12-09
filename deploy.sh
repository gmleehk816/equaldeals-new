#!/bin/bash

set -e

echo "Deploying..."

git config --global --add safe.directory /var/www/equaldeals.com

git add .

git stash

git pull --rebase

composer install --optimize-autoloader

php artisan migrate --force

php artisan config:clear

supervisorctl restart all

npm install

npm run build

echo "Deploying completed"
