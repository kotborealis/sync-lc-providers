FROM node:12-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache ffmpeg && \
    rm -rf /usr/share/ffmpeg/*.ffpreset \
           /usr/share/ffmpeg/examples \
           /usr/bin/ffserver \
           /usr/bin/ffplay \
           /usr/bin/ffmpeg \
           /usr/bin/qt-faststart

RUN mkdir -p /app
WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY ./ ./

RUN npm test
