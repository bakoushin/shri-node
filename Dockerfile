FROM node:7

ENV NPM_CONFIG_LOGLEVEL=warn

WORKDIR /usr/src/app

COPY . .

RUN npm install --only=production
RUN npm run build
RUN npm run clone-repo

CMD npm start