# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the frontend project
RUN npm run build

# Step 7: Use a lightweight web server (e.g., nginx) to serve the static files
FROM nginx:alpine
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html

# Step 8: Expose the default nginx port
EXPOSE 5173

# Step 9: Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
