FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y nginx

ARG PORTA_ARG=7000
ENV PORTA=${PORTA_ARG}

EXPOSE ${PORTA_ARG}

CMD ["nginx", "-g", "daemon off;"]
# docker build -t ubuntu-nginx-custom --build-arg PORTA_ARG=7000 .
# docker run -d --name meu-servidor-nginx -p 7000:7000 ubuntu-nginx-custom