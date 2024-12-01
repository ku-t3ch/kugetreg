##### DEPENDENCIES

FROM --platform=linux/amd64 node:21-alpine AS deps
RUN apk add --no-cache libc6-compat openssl build-base python3
RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium
WORKDIR /app

# Install Prisma Client - remove if not using Prisma

COPY prisma ./

# Install dependencies based on the preferred package manager

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN yarn global add pnpm && pnpm i

##### BUILDER

FROM --platform=linux/amd64 node:21-alpine AS builder
ARG NEXT_PUBLIC_BUILD_MESSAGE
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn global add pnpm && SKIP_ENV_VALIDATION=1 pnpm run build

##### RUNNER

FROM --platform=linux/amd64 node:21-alpine AS runner
RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
EXPOSE 10000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]