FROM node
CMD npm install -g serve
WORKDIR /usr/src/app
COPY ./client/build ./
CMD serve -s build