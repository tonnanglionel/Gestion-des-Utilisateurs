FROM nginx:alpine AS deploy
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]