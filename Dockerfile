# Build React Frontend
FROM node:18-alpine AS builder
WORKDIR /build
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Build Node Backend
FROM node:18-alpine AS backend
WORKDIR /app/api
COPY api/package*.json ./
RUN npm install --production
COPY api/ ./

# Final Container
FROM nginx:alpine
RUN apk add --no-cache nodejs npm supervisor

# Setup Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/build /usr/share/nginx/html

# Setup Node API
WORKDIR /app/api
COPY --from=backend /app/api /app/api
ENV PORT=5000

# Supervisor to run both
COPY supervisord.conf /etc/supervisord.conf

EXPOSE 80
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
