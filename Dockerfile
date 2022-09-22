# FROM node:18
# COPY . .
# RUN npm install
# EXPOSE 3000
# CMD ["npm", "run", "dev"]

FROM node:14-alpine3.15
WORKDIR /app
# COPY package.json .
COPY package.json /app
RUN npm install
COPY . ./
ENV PORT 3000
EXPOSE $PORT
# CMD ["node", "index.js"]
# for using nodemon
CMD ["npm", "run", "dev"]
# dev is name added to d scripts section in package.json


