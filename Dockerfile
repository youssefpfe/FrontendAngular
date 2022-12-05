FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ .
FROM nginx:latest
RUN mkdir /app
COPY --from=build-stage /app/dist/frelationship/ /app
COPY nginx.conf /etc/nginx/nginx.conf
USER nginx
EXPOSE 80
