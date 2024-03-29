# Use uma imagem base Node.js
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /vue-app

# Copie os arquivos do projeto para o diretório de trabalho
COPY . .

# Instale as dependências do projeto
RUN npm install

# Exponha a porta 8080 para que o aplicativo Vue.js possa ser acessado
EXPOSE 8080

# Comando para iniciar o servidor de desenvolvimento Vue.js
CMD ["npm", "run", "serve"]
