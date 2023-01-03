# Build backend
FROM node:16-buster-slim AS backend-builder

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY apps/backend/package.json ./apps/backend/package.json
RUN npm install
# Copy project files and folders
COPY apps/backend ./apps/backend

# Build backend
RUN yarn run backend:build

# Build frontend
FROM node:16-buster-slim AS frontend-builder

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN npm install

# Copy project files and folders
COPY apps/frontend ./apps/frontend

# Build assets
RUN yarn run frontend:build

# Final image
FROM node:16-buster-slim AS lightning

# Change directory to '/app' 
WORKDIR /app

# Copy built code from build stages to '/app' directory
COPY --from=backend-builder /app/apps/backend/dist/ /app/apps/backend/dist/
COPY --from=frontend-builder /app/apps/frontend/build/ /app/apps/frontend/build/

EXPOSE 3007
CMD [ "npm", "run", "start" ]