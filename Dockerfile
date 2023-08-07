
FROM node:16-alpine AS angular-deploy
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Stage 2: Serve the app with NGINX
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=angular-deploy /app/dist/fuse /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]