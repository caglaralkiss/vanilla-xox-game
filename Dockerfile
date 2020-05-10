FROM node:latest as node

COPY package*.json ./

RUN npm install && mkdir /xox && mv ./node_modules ./xox

WORKDIR /xox

COPY . .

RUN npm run serve

FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=node /xox/dist /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
