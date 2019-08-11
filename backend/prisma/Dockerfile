FROM node:10.16.0
RUN npm install -g --unsafe-perm prisma2

RUN mkdir /app
WORKDIR /app

COPY ./ ./prisma/

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && prisma2 dev
