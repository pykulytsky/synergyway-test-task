FROM node:17

WORKDIR /app/frontend

COPY package.json /app/package.json

RUN npm install --only=prod

COPY . /app/frontend

RUN npm run build

EXPOSE 3000

# FROM nginx:stable-alpine

# COPY --from=build /app/frontend/build /usr/share/nginx/html

# EXPOSE 80
