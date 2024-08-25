#Specify a base image
FROM node:alpine

WORKDIR /app

#Install some dpendencies
COPY ./ ./
RUN npm install

#Default commands
CMD [ "node", "start" ]