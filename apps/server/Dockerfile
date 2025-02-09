FROM node:18-alpine AS base
# RUN apk add --update openssl \
#     && apk --no-cache -U -a upgrade \
#     && apk add --no-cache libc6-compat
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm install -g turbo
RUN turbo prune server --docker

FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm install -g pnpm
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
