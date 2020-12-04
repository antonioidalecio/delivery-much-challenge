FROM node:14.15.1-alpine3.10 as build

WORKDIR /var/app

COPY package.json *.lock postinstall.sh ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]