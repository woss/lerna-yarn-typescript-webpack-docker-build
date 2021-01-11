# Build box for all packages    
# this image does not contain the files or any env vars
FROM node:15-alpine as builder

WORKDIR /app

# manual step, for now
# copy package.json manually from the packages
COPY package.json yarn.lock lerna.json /app/

COPY packages/client/package.json /app/packages/client/package.json
COPY packages/server/package.json /app/packages/server/package.json
COPY packages/utils/package.json /app/packages/utils/package.json

RUN yarn install --frozen-lockfile

# copy ALL the files -- tis might not work if multiple packages are changed and you want to install only one .... figure this out
COPY . /app


# this is super unoptimised approach
RUN yarn lerna run build --stream --parallel


### SERVER IMAGE ###
FROM node:15-alpine as server

WORKDIR /app
# copy the package.json so we can install prod deps, ones that are in the "dependencies" key
COPY --from=builder /app/packages/server/package.json .

# copy the yarn.lock to save time resolving packages
COPY --from=builder /app/yarn.lock .

# copy the built dist
COPY --from=builder /app/packages/server/dist .

# install prod deps
RUN yarn install --production=true --ignore-optional

# remove the yarn cache
RUN yarn cache clean

EXPOSE 3000

CMD [ "node", "server.js" ]


### CLIENT IMAGE ###
FROM nginx as client

#Copy production build files from builder phase to nginx
COPY --from=builder /app/packages/client/dist /usr/share/nginx/html
