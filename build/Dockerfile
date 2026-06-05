FROM node:24-slim

RUN apt-get update && apt-get install -y git openssh-client gnupg && rm -rf /var/lib/apt/lists/*

RUN npm install -g @angular/cli@latest

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

VOLUME /root
VOLUME /app/node_modules

WORKDIR /app

ENTRYPOINT ["/entrypoint.sh"]
