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

php artisan optimize:clear

supervisorctl restart all

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

/root/.nvm/versions/node/v24.11.1/bin/npm install

/root/.nvm/versions/node/v24.11.1/bin/npm run build

chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "Deploying completed"
