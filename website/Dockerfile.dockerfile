FROM node
#RUN npm install -g serve
RUN yarn global add serve
WORKDIR /usr/src/app
COPY ./client ./
RUN yarn
WORKDIR /usr/src/app/
RUN yarn build
#RUN npm run build
CMD serve -s build