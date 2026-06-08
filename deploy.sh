#!/bin/sh
set -eu

if [ ! -f .env ]; then
  echo "Missing .env. Create it from .env.example before deployment." >&2
  exit 1
fi

set -a
. ./.env
set +a

if [ -z "${DOMAIN:-}" ] || [ -z "${CERTBOT_EMAIL:-}" ]; then
  echo "DOMAIN and CERTBOT_EMAIL must be set in .env." >&2
  exit 1
fi

case "$DOMAIN" in
  http://*|https://*|www.*|*/*)
    echo "DOMAIN must be an apex hostname without a scheme, www, or path." >&2
    exit 1
    ;;
esac

echo "Building and starting the HTTP bootstrap stack for ${DOMAIN}..."
docker compose up -d --build backend nginx

if ! docker compose run --rm --entrypoint certbot certbot certificates 2>/dev/null | grep -q "Certificate Name: ${DOMAIN}"; then
  echo "Requesting a Let's Encrypt certificate for ${DOMAIN} and www.${DOMAIN}..."
  docker compose run --rm --entrypoint certbot certbot certonly \
    --webroot \
    --webroot-path /var/www/certbot \
    --email "$CERTBOT_EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN" \
    -d "www.${DOMAIN}"
else
  echo "An existing certificate for ${DOMAIN} was found."
fi

echo "Restarting Nginx with HTTPS and starting certificate renewal..."
docker compose up -d --force-recreate nginx certbot
docker compose ps

echo "Deployment complete: https://${DOMAIN}"
