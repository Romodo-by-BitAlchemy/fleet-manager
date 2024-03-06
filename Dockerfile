FROM node:20-alpine

WORKDIR /

COPY package*.json yarn.lock ./

RUN yarn install --force

COPY . .

RUN yarn build

# Install `express` package
RUN yarn add express

EXPOSE 8080

# Start an Express server to serve the built assets
CMD ["node", "-e", "const express = require('express'); const app = express(); app.use(express.static('dist')); app.listen(8080);"]