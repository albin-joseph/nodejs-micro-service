#Specify a base image
FROM node:alpine

WORKDIR /app

#Install some dpendencies
COPY package.json ./
RUN npm install
COPY ./ ./

#Default commands
CMD [ "npm", "start" ]