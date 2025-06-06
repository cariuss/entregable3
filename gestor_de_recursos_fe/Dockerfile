# Usa la variante “slim” (Debian) en lugar de Alpine, así Rollup podrá cargar el binario ARM estándar
FROM node:18-slim

# Crea la carpeta de trabajo
WORKDIR /app

# Copiamos package.json / package-lock.json para cachear la instalación de dependencias
COPY package.json package-lock.json /app/

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código del frontend
COPY . /app

# Exponemos el puerto que Vite usa por defecto (5173)
EXPOSE 5173

# Arrancamos Vite en modo desarrollo, escuchando en 0.0.0.0 para que sea accesible fuera del contenedor
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
