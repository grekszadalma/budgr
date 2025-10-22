
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
RUN npm install react-router-dom
RUN npm install @tanstack/react-query


COPY . .
CMD npm run dev -- --host 0.0.0.0


