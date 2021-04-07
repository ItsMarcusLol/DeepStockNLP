FROM node
RUN  yarn global add serve
WORKDIR /usr/src/app
COPY ./client/package.json yarn.lock ./
RUN yarn
COPY ./client ./
RUN yarn build
CMD serve -s build