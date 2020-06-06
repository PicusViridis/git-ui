FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn --production

COPY .babelrc .babelrc
COPY src src
COPY db db

USER node

CMD ["yarn", "start"]