#Usando uma imagem oficial do Node.Js
FROM node:20

#Definindo o diretório de trabalho no container
WORKDIR /usr/src/app

#Copiar os arquivos de dependência da aplicação
COPY package*.json ./

#Instalar as dependências da aplicação
RUN npm install

#Copiar o restante dos arquivos da aplicação
COPY . .

#Expor a porta na qual a aplicação será executada (3000)
EXPOSE 3000

#Definindo o comando para iniciar a aplicação
CMD ["npx","nodemon", "src/app.js"]