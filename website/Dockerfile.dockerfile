FROM node
RUN npm install -g serve
WORKDIR /usr/src/app
COPY ./client ./
WORKDIR /usr/src/app/client
CMD npm run build
CMD serve -s build