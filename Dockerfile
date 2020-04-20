FROM node:12-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache ffmpeg

RUN mkdir -p /app
WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY ./ ./

RUN npm test
