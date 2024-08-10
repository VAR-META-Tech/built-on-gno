FROM node:18-alpine AS base
# RUN apk add --update openssl \
#     && apk --no-cache -U -a upgrade \
#     && apk add --no-cache libc6-compat
RUN corepack enable 

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm install -g turbo
RUN turbo prune web --docker

FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm install -g pnpm
RUN pnpm install
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo build --filter=web...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/package.json /app/apps/web/package.json
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/next.config.mjs /app/apps/web/next.config.mjs
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next /app/apps/web/.next
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/node_modules /app/apps/web/node_modules
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public /app/apps/web/public
COPY --from=installer --chown=nextjs:nodejs /app/node_modules /app/node_modules

WORKDIR /app/apps/web
EXPOSE 3000

CMD ["npm", "start"]