FROM node:alpine:3.21

WORKDIR /app

COPY package.json ./
RUN npm install --production
COPY ./ ./

EXPOSE 4001

CMD ["node", "index.js"]
