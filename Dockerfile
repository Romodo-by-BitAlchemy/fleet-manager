FROM node:14-alpine

RUN adduser -D appuser
USER appuser

WORKDIR /
VOLUME /node_modules

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "run", "dev", "--host", "--mode", "production", "--port", "8080"]