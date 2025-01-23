# Fase 1: Build dell'app Angular
FROM node:20 AS build

WORKDIR /webapp

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install --force

# Copia il resto dei file del progetto
COPY . .

# Esegui il build dell'app Angular
RUN npm run build --prod

# Fase 2: Utilizzo di Node.js per servire l'app Angular
FROM node:20

WORKDIR /webapp

# Installa un server HTTP per Node.js
RUN npm install -g http-server

# Copia i file di build dall'immagine di build
COPY --from=build /webapp/dist/wabapp .

# Espone la porta 80
EXPOSE 80

# Comando per avviare il server
CMD ["http-server", "-p", "80"]

