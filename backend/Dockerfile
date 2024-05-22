FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY . .

RUN npm install --only-prod
RUN npm run build

CMD ["npm","run","start"]