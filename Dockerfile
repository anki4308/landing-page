# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the specific directory
COPY screen\ landing\ page/external-screen-landing/package.json screen\ landing\ page/external-screen-landing/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application into the container
COPY screen\ landing\ page/external-screen-landing ./

# Expose the port your application uses
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

