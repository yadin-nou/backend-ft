FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY . .

EXPOSE 8000

CMD ["node", "server.js"]