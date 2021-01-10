FROM node:15-alpine

WORKDIR /app

COPY ./dist /app/
COPY ./package.json /app/

RUN yarn install --production=true 

RUN ls -la .

EXPOSE 3000

CMD [ "node", "server.js" ]

