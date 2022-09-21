FROM node:12.18-alpine AS build
ARG SCRIPT_TO_RUN
WORKDIR /app
COPY package*.json /app/
COPY . /app/
RUN npm install
RUN npm run ${SCRIPT_TO_RUN}
RUN ls /app

FROM nginx:alpine AS deploy
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/
EXPOSE 6262
CMD ["nginx", "-g", "daemon off;"]