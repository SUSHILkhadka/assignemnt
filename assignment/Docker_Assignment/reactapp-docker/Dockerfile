FROM node:alpine

WORKDIR /usr/app
ENV PATH /home/node/app/node_modules/.bin:$PATH

COPY . /usr/app

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
