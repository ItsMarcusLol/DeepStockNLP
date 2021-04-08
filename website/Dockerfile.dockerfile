FROM node:15.14.0-alpine3.10
RUN npm install npm@7.9.0

RUN npm install -g serve
WORKDIR /usr/src/app
COPY ./client ./
WORKDIR /usr/src/app/

RUN npm run build
CMD serve -s build