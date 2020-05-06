FROM node:14-alpine as build-stage

WORKDIR /app
RUN apk add --update dumb-init

COPY ./yarn.lock /app
COPY ./package.json  /app

RUN yarn global add serve && \
  yarn && \
  yarn cache clean

COPY . /app
RUN yarn run build

ENV NODE_ENV=production
ENV PUBLIC_URL=http://localhost

ENTRYPOINT [ "dumb-init" ]
CMD ["serve", "-s", "build", "-l", "80"]
