FROM node:14.15.1-alpine3.10 as build

WORKDIR /var/app

COPY package.json .

# `--ignore-scripts` ignores all scripts defined in `packson.json` to prevent husky from installing its hooks, since it needs a .git folder that is not present when running in docker
RUN yarn --ignore-scripts

COPY . .

RUN yarn build

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]