#자바 버전
FROM openjdk:11-jdk

#라벨
#포트번호 설정
EXPOSE 7071

#가져올 파일 jar
ARG JAR_FILE=build/libs/

#jar파일 복사
COPY ${JAR_FILE} app.jar

#ENTRYPOINT 명령을 지정, app.jar 실행
ENTRYPOINT ["java","-jar","/app.jar"]
