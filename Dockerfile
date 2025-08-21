# Build stage
FROM oven/bun:1.1.13 AS builder

WORKDIR /app

COPY bun.lockb package.json ./
COPY . .

RUN bun install
RUN bun run build

# Production stage
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/dist ./

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]