FROM node:18.14.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_PAWRA_BASE_URL=https://pawra-backend-api-2gso7b5r3q-et.a.run.app

EXPOSE 3000

RUN npm run build
CMD [ "npm", "run", "start" ]