FROM  node:alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -al

RUN npm run build

EXPOSE 3001

CMD [ "npm", "start" ]