FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
COPY . .
RUN npm install --only-prod
RUN npm run build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html