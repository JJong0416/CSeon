FROM openjdk:11-jdk
EXPOSE 7070
ARG JAR_FILE=./back/build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
