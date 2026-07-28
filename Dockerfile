# BUILD STAGE
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# RUNTIME STAGE
FROM node:22-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/docker-entrypoint.sh ./

RUN chmod +x docker-entrypoint.sh

ENV NODE_ENV=production
ENV PORT=4328
EXPOSE 4328

ENTRYPOINT ["./docker-entrypoint.sh"]
