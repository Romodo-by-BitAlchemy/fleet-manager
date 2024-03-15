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
CMD ["node", "-e", "const express = require('express'); const path = require('path'); const app = express(); app.use(express.static('dist')); app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'dist', 'index.html')); }); app.listen(8080);"]