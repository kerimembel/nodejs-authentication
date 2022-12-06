FROM node:14

WORKDIR /auth-service
COPY package.json .
RUN npm install
COPY . .
CMD npm start