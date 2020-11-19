FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules

WORKDIR /home/node/api

COPY package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3000

CMD ["yarn", "dev"]