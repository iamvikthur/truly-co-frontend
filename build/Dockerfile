FROM alpine:latest

ENV TIMEZONE="Europe/Kiev"

RUN apk update \
    && apk add \
    npm \
    tzdata \
    nodejs \
    && rm -rf /var/cache/apk/*

RUN adduser -D -u 1000 -g 'www' www && mkdir -p /www 

RUN rm -rf /etc/localtime \
    && ln -s /usr/share/zoneinfo/$TIMEZONE /etc/localtime \
    && echo "${TIMEZONE}" > /etc/timezone

COPY --chown=www:www app /www

WORKDIR /www

RUN npm i && npm run-script build