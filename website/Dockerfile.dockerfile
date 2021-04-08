FROM alpine:3.7
RUN npm install -g serve
WORKDIR /usr/src/app
COPY ./client ./
WORKDIR /usr/src/app/client
RUN npm run build
CMD serve -s build