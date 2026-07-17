FROM node:20-alpine

WORKDIR /app

RUN npm init -y

COPY backend.js .

EXPOSE 4000

CMD ["node", "backend.js"]
