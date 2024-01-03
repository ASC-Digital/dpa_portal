FROM node:16-slim

RUN getent passwd app || useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json $HOME/nodejs/

USER root
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/nodejs
RUN npm install

USER root
COPY app/ $HOME/nodejs/app/
COPY .env.example $HOME/nodejs/
RUN chmod -R 777 $HOME/ && chown -R app:app $HOME/*

USER node
EXPOSE 3000

CMD ["npm", "start"]