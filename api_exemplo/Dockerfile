# Exemplo do Dockerfile na pasta api_exemplo
FROM node:20

# Define o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos, incluindo o schema.prisma
COPY prisma/schema.prisma ./prisma/schema.prisma
# Realiza a migração
RUN npx prisma migrate dev --name tabelas_com_docker

# Copie o restante do código
COPY . .

# Comando para iniciar sua aplicação
CMD ["npm", "run", "dev"]
