# Stage 1: Build the React app
FROM node:20 AS builder

WORKDIR /app

COPY public public
COPY src src
COPY package*.json .
COPY index.html .
COPY tsconfig.json .
COPY tsconfig.app.json .
COPY tsconfig.node.json .
COPY vite.config.ts .
COPY .env.production .

RUN npm install && npm run build

# Stage 2: Serve with Nginx
# This image exposes port 8080 by default
# ports below 1024 require elevated privileges (e.g 80 is for root-enabled users)
FROM nginxinc/nginx-unprivileged:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]