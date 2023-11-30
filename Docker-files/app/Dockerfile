# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app
RUN git clone https://github.com/L00179719/nodeJS.git
RUN cd nodeJS

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm install bcrypt

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run your app
CMD ["node", "app.js"]
