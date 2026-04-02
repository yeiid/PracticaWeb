# BUILD STAGE
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# RUNTIME STAGE
FROM node:22-alpine AS runtime
WORKDIR /app

# Instalar netcat para el healthcheck de la base de datos
RUN apk add --no-cache netcat-openbsd

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/docker-entrypoint.sh ./

# Permisos para el entrypoint
RUN chmod +x docker-entrypoint.sh

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
