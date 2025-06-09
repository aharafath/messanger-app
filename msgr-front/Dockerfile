# msgr-front/Dockerfile
FROM node:22

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "dev"]
