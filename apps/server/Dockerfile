FROM node:18-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat
RUN corepack enable
RUN npm add -g turbo

FROM base AS builder
WORKDIR /app
COPY . .
RUN turbo prune server --docker

FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo build --filter=server...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

USER expressjs

COPY --from=installer --chown=expressjs:nodejs /app ./

WORKDIR /app/apps/server
EXPOSE 3001
ENV PORT 3001
ENV LOG_DIR logs

CMD ["npm","start"]
