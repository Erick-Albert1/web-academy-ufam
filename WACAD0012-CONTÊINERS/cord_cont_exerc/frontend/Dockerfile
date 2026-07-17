FROM node:20-alpine

WORKDIR /app

RUN npm init -y
RUN npm install querystring

COPY frontend.js .

EXPOSE 3000

CMD ["node", "frontend.js"]
