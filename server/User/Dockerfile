FROM node:alpine

WORKDIR /server/Order

COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]
