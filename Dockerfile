# syntax=docker/dockerfile:1

# ---- Build stage: Node builds the static site into /app/dist ----
FROM node:26.13.0-alpine3.24 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG SITE_URL
ENV SITE_URL=${SITE_URL}
RUN npm run build

# ---- Runtime stage: unprivileged nginx serves dist/ on port 8080 ----
FROM nginxinc/nginx-unprivileged:1.31.7-alpine3.24

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

# The base image already runs as the non-root `nginx` user (uid 101).
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/ || exit 1
