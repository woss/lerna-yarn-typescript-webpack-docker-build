# use the built image as a builder, it contains all the code. keep this safe
FROM main:latest as builder

RUN yarn lerna run build --scope=@app/server

# main image
FROM node:15-alpine

WORKDIR /app

# copy the package.json so we can install prod deps, ones that are in the "dependencies" key
COPY --from=builder /app/packages/server/package.json .

# copy the built dist
COPY --from=builder /app/packages/server/dist .

# install prod deps
RUN yarn install --production=true --ignore-optional

# remove the yarn cache
RUN yarn cache clean

EXPOSE 3000

CMD [ "node", "server.js" ]

