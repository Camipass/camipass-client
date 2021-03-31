FROM node:alpine as builder

WORKDIR '/app'

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

FROM nginx:stable-alpine

RUN rm -rf nginx/conf.d/default.conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
