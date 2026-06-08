# Portfolio Deployment

## Architecture

Only the `nginx` container is public. It serves the React build, terminates
HTTPS, and proxies `/api` to the private Express container. Certbot shares its
certificate and ACME volumes with Nginx. Visitor JSONL records and Nginx logs
use persistent Docker volumes.

## First Deployment

1. Point DNS `A` records for the apex domain and `www` to the VPS public IP.
2. Install Docker Engine and the Docker Compose plugin on a clean Ubuntu VPS.
3. Allow SSH, HTTP, and HTTPS:

   ```bash
   sudo ufw allow OpenSSH
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

4. Clone the repository, enter `updated_portfolio`, and configure production:

   ```bash
   cp .env.example .env
   nano .env
   chmod +x deploy.sh
   ./deploy.sh
   ```

`DOMAIN` must contain the apex hostname without `https://` or `www`.
`CERTBOT_EMAIL` receives certificate-expiry notices. The deployment requests
one certificate covering both the apex domain and `www`, then makes the apex
domain canonical.

## Traffic And Visitor Logs

Every incoming request, including static assets and API requests, appears in
the Nginx stream:

```bash
docker compose logs -f nginx
```

Structured API and visitor events appear in the backend stream:

```bash
docker compose logs -f backend
```

Visitor records are also written as daily JSONL files and retained for 30 days.
Inspect the current persistent file without needing its Docker volume path:

```bash
docker compose exec backend sh -c 'tail -f /app/logs/visits-$(date -u +%F).jsonl'
```

Persistent Nginx access logs can be inspected similarly:

```bash
docker compose exec nginx tail -f /var/log/nginx/portfolio-access.log
```

These records contain full client IP addresses. Keep VPS access restricted and
retain the privacy notice on the public site.

## Updates And Checks

Deploy a new revision:

```bash
git pull --ff-only
docker compose up -d --build
docker compose ps
curl -I "https://${DOMAIN}"
curl "https://${DOMAIN}/api/health"
```

Verify certificate renewal:

```bash
docker compose run --rm --entrypoint certbot certbot renew --dry-run
```

Inspect errors and container health:

```bash
docker compose ps
docker compose logs --tail=200 nginx backend certbot
```

## Rollback

Check out the previously deployed commit and rebuild:

```bash
git log --oneline -10
git checkout <previous-commit>
docker compose up -d --build
```

Return to the main branch after the incident is resolved. Docker volumes are
not removed by normal rebuilds, so certificates and logs survive updates. Do
not run `docker compose down -v` unless permanent volume deletion is intended.
