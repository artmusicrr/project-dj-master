# Etapa 1: Construir a aplicação frontend
FROM node:18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build   # Isso vai gerar a build da sua aplicação, geralmente na pasta "build"

# Etapa 2: Usar Nginx para servir os arquivos
FROM nginx:alpine

# Copiar o nginx.conf para dentro do container
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar os arquivos da build gerada para o Nginx servir
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 80 para acessar o site
EXPOSE 80

# Executar o Nginx
CMD ["nginx", "-g", "daemon off;"]
