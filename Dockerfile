FROM ubuntu:latest

WORKDIR /home/node/app

USER root

RUN apt-get update -y \
    && apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - \
    && apt-get install -y nodejs


CMD [ "tail", "-f", "/dev/null" ]