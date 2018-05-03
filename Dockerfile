FROM node:alpine

MAINTAINER Alex Friedrichsen <afriedrichsen@me.com>

ENV NODE_ENV=production
ENV DOCKER_FLAG=docker
ENV PORT=3000

# Update
RUN apk add --update nodejs

WORKDIR /app

ADD . /app
#RUN node -v

RUN cd /app; npm install --production

EXPOSE 3000

CMD [ "npm","start"]