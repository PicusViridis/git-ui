FROM node:lts-alpine

RUN apk add git

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn --production

COPY .babelrc .babelrc
COPY src src
COPY db db

RUN mkdir logs
RUN chown -R node:node logs

RUN chown -R node:node node_modules

USER node

CMD ["yarn", "start"]