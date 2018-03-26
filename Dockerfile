FROM node:7

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build
RUN npm run clone-repo

EXPOSE 3000

CMD npm start