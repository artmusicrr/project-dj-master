# Etapa 1: Build do React
FROM node:18 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:stable-alpine

# Copia o build para o Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
