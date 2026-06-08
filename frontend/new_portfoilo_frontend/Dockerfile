FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

RUN apk add --no-cache gettext
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/http.conf.template /etc/nginx/portfolio-templates/http.conf.template
COPY nginx/https.conf.template /etc/nginx/portfolio-templates/https.conf.template
COPY nginx/40-select-config.sh /docker-entrypoint.d/40-select-config.sh
RUN chmod +x /docker-entrypoint.d/40-select-config.sh

EXPOSE 80 443
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/nginx-health || exit 1
