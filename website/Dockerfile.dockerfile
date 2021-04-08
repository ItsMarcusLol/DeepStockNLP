#FROM node:15.14.0-alpine3.10
FROM node:alpine

RUN npm install -g serve
WORKDIR /usr/src/app
COPY ./client ./
#WORKDIR /usr/src/app/client

RUN npm install

RUN npm run build
CMD serve -s build