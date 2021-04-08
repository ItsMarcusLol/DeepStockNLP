FROM node
RUN npm install -g serve
RUN npm install -g npm@7.8.0
WORKDIR /usr/src/app
COPY ./client ./
WORKDIR /usr/src/app/client
RUN npm run build
CMD serve -s build