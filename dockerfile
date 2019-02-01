FROM node:8.11.3-alpine
WORKDIR /home/react
COPY ./ ./
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000