From node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 
RUN npm i body-parser --save

COPY . .

EXPOSE  8005

CMD [ "npm", "start" ]

