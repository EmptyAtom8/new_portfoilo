#!/bin/sh
set -eu

DOMAIN="${DOMAIN:-example.com}"
WWW_DOMAIN="${WWW_DOMAIN:-www.${DOMAIN}}"
export DOMAIN WWW_DOMAIN

if [ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
  template="/etc/nginx/portfolio-templates/https.conf.template"
  echo "Using HTTPS configuration for ${DOMAIN}"
else
  template="/etc/nginx/portfolio-templates/http.conf.template"
  echo "Certificate not found; using HTTP bootstrap configuration for ${DOMAIN}"
fi

envsubst '${DOMAIN} ${WWW_DOMAIN}' < "$template" > /etc/nginx/conf.d/default.conf

# Reload periodically so renewed certificates are picked up without downtime.
(while sleep 21600; do nginx -s reload; done) &
