FROM node
RUN  yarn global add serve
WORKDIR /usr/src/app
COPY ./client ./
RUN yarn
RUN yarn build
CMD serve -s build