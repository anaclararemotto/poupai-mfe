FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@latest

COPY . .

EXPOSE 4201
CMD ["npm", "start"]