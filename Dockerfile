FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY vite.config.js ./

# Install dependencies
RUN npm ci

# Copy source files
COPY src/ ./src/
COPY public/ ./public/
COPY index.html privacy.html terms.html ./

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the app
RUN npm install -g serve

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
CMD ["serve", "-s", "dist", "-l", "5000"]
