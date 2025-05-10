# Stage 1: Збірка Angular додатку
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@17
# Встановлюємо залежності
RUN npm ci

COPY . .
# Збираємо додаток у продакшн-режимі
RUN ng build --configuration production

# Stage 2: Розгортання через Nginx
FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/angular_test_project /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
