# Step 1: Use Node.js image to install dependencies and build the app
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite application (this will generate static files)
RUN npm run build

# Step 2: Use Nginx to serve the built app
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the Nginx port (default: 80)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
