FROM node:20-alpine AS base

ENV TZ=Asia/Seoul
ENV DB_HOST=
ENV DB_PORT=
ENV DB_USER=
ENV DB_PASSWORD=
ENV DB_NAME=
ENV SESSION_SECRET=

FROM base AS deps
    WORKDIR /app

    COPY package.json pnpm-lock.yaml ./
    RUN corepack enable pnpm
    RUN pnpm install --frozen-lockfile

FROM base AS deps-prod
    WORKDIR /app

    COPY package.json pnpm-lock.yaml ./
    RUN corepack enable pnpm
    RUN pnpm install --frozen-lockfile --prod

FROM base AS builder
    WORKDIR /app

    COPY . .
    COPY --from=deps /app/node_modules ./node_modules
    RUN corepack enable pnpm
    RUN pnpm build

FROM base AS runner
    WORKDIR /app

    COPY --from=deps-prod /app/node_modules ./node_modules
    COPY --from=builder /app/dist ./dist

    USER node

    EXPOSE 3000

    CMD ["node", "dist/index.js"]
