FROM node:19.9.0-slim
WORKDIR /usr/src/app
COPY package.json .
RUN npm i -g @angular/cli@~16.1.1
RUN npm i
COPY . .
RUN ng build
CMD ng serve --host 0.0.0.0
