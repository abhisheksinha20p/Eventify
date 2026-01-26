# Template Dockerfile for Node.js Microservices
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
# Using --production to skip devDependencies (can be adjusted for dev)
RUN npm install

# Copy application code
COPY . .

# Expose the service's port (Override this in docker-compose or specific service config)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
