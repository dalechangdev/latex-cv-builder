FROM node:22-slim AS base

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

# Install production deps (includes playwright, now a runtime dependency)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Install Chromium and its system libraries (must run as root)
RUN npx playwright install --with-deps chromium

# Copy built app and lock down ownership
COPY --from=builder /app/build ./
RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid 1001 sveltekit \
 && chown -R sveltekit:nodejs /app

USER sveltekit
EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "index.js"]
