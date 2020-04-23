FROM node:12-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache ffmpeg && \
    cp /usr/bin/ffprobe /usr/bin/ffprobe-standalone && \
    apk del ffmpeg && \
    cp /usr/bin/ffprobe-standalone /usr/bin/ffprobe

RUN mkdir -p /app
WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY ./ ./

RUN npm test
