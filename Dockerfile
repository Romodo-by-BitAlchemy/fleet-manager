FROM node:20-alpine

WORKDIR /

COPY package*.json yarn.lock ./

RUN yarn install --force

COPY . .

RUN yarn build

# Install `express` package
RUN yarn add express

EXPOSE 8080

CMD ["node", "-e",  "const express = require('express'); const path = require('path'); const app = express(); const distPath = path.resolve(__dirname, 'dist'); console.log('Serving files from:', distPath); app.use(express.static(distPath)); app.get('/', (req, res) => res.sendFile('index.html', { root: distPath })); app.listen(8080);"]