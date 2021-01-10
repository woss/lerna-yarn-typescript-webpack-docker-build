# Build box for all packages    
# this image does not contain the files or any env vars
FROM node:15-alpine as builder

WORKDIR /app

# manual step, for now
# copy package.json manually from the packages
COPY package.json yarn.lock lerna.json /app/
COPY packages/server/package.json /app/packages/server/package.json
COPY packages/utils/package.json /app/packages/utils/package.json

RUN yarn install --frozen-lockfile

COPY . /app

# RUN yarn lerna run build --stream --parallel
