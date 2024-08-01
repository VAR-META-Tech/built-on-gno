FROM node:18 AS base

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    openssl \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && pnpm install -g turbo

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

COPY --from=installer --chown=expressjs:nodejs /app/apps/server/package.json /app/apps/server/package.json
COPY --from=installer --chown=expressjs:nodejs /app/apps/server/tsconfig.json /app/apps/server/tsconfig.json
COPY --from=installer --chown=expressjs:nodejs /app/apps/server/tsconfig-paths.js /app/apps/server/tsconfig-paths.js
COPY --from=installer --chown=expressjs:nodejs /app/apps/server/dist /app/apps/server/dist
COPY --from=installer --chown=expressjs:nodejs /app/apps/server/node_modules /app/apps/server/node_modules
COPY --from=installer --chown=expressjs:nodejs /app/node_modules /app/node_modules

WORKDIR /app/apps/server
EXPOSE 3001
ENV PORT 3001
ENV LOG_DIR logs

CMD ["npm","start"]
