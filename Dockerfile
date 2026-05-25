FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 sveltekit

# adapter-node bundles everything into build/
COPY --from=builder --chown=sveltekit:nodejs /app/build ./

USER sveltekit
EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "index.js"]
