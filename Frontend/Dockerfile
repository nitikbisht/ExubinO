# 1. Use Node base image
FROM node:18

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package.json and install deps
COPY package.json ./
RUN npm install

# 4. Copy rest of app files
COPY . .

# 5. Build React app for production
RUN npm run build

# 6. Use nginx to serve it
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
