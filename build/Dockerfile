FROM node:24-slim

RUN apt-get update && apt-get install -y git openssh-client gnupg && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

VOLUME /root

WORKDIR /app

ENTRYPOINT ["/entrypoint.sh"]
