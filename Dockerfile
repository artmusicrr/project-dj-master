# Etapa 1: Build do React
# Use a imagem oficial do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo package.json e o package-lock.json para o container
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto para o container
COPY . .

# Construa a aplicação React
RUN npm run build

# Exponha a porta que o Nginx vai usar
EXPOSE 80

# Use o Nginx para servir a aplicação
CMD ["nginx", "-g", "daemon off;"]
