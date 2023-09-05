FROM node:18

WORKDIR /var/www

EXPOSE 3000

COPY . ./

RUN npm install

#RUN npm run migrate