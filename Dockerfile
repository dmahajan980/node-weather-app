FROM node:14
# Create app directory
WORKDIR /usr/src/app
# Install all dependencies
COPY package*.json ./
RUN npm ci
# Bundle app source
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]
