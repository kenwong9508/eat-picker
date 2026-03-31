# syntax=docker/dockerfile:1

ARG NODE_VERSION=20-bookworm-slim

# -----------------------------------
# Stage 1
# Install dependencies and build the app
# -----------------------------------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

RUN npm run build

# -----------------------------------
# Stage 2
# Final production image
# -----------------------------------
FROM node:${NODE_VERSION} AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

RUN addgroup --system --gid 1001 app \
  && adduser --system --uid 1001 --ingroup app app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER app

EXPOSE 3000

CMD ["npm", "run", "start"]