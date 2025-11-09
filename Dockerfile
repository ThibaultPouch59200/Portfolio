# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build argument for admin password
ARG VITE_ADMIN_PASSWORD

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Set environment variable for build
ENV VITE_ADMIN_PASSWORD=${VITE_ADMIN_PASSWORD}

# Build the application
RUN npm run build

# Stage 2: Serve with Node.js
FROM node:20-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start serve with SPA routing support
CMD ["serve", "-s", "dist", "-l", "3000"]

