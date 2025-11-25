FROM node:alpine

WORKDIR /app

COPY package.json ./
RUN npm install --production
COPY ./ ./

EXPOSE 4003

CMD ["node", "index.js"]
