FROM maven:3.6.3-openjdk-8 AS build
ARG MVN_PROFILE
WORKDIR /app
COPY . /app/
RUN mvn -B -f /app/backend-prod/pom.xml clean package -P${MVN_PROFILE} -DskipTests
RUN ls /app

FROM tomcat:9.0
COPY --from=build /app/backend-prod/target/backend-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/backend.war
RUN sed -i 's/port="8080"/port="8009"/' /usr/local/tomcat/conf/server.xml
EXPOSE 8009
CMD ["catalina.sh", "run"]

