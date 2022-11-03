FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /var/jenkins_home/workspace/S07P31A606/front/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/S07P31A606/front/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g","daemon off;"]
