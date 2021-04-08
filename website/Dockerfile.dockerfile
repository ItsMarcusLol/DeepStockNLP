FROM node:15.14.0-alpine3.10

RUN npm install npm@7.9.0
RUN rm -rf /usr/local/lib.node_modules/npm
RUN mv node_modules/npm /usr/local/lib/node_modules/npm


RUN npm install -g serve
WORKDIR /usr/src/app
COPY ./client ./
WORKDIR /usr/src/app/

RUN npm run build
CMD serve -s build