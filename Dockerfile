FROM node:alpine

MAINTAINER Alex Friedrichsen <afriedrichsen@me.com>

ENV NODE_ENV=production

# Update
RUN apk add --update nodejs

WORKDIR /app

ADD . /app
#RUN node -v

RUN cd /app; npm install --production

EXPOSE 3000

CMD [ "npm","production"]