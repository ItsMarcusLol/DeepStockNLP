FROM node
RUN npm install -g serve
WORKDIR /usr/src/app
COPY ./client ./
WORKDIR /usr/src/app/client
RUN npm run build
RUN serve -s build