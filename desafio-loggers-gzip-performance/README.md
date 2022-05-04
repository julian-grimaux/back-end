# Desafío: Loggers, GZIP y Análisis de Performance

## Instalación del proyecto

Ejecutar el código ```npm install```.
Crear el archivo ```.env``` con el siguiente contenido
~~~
PORT=8080
NOD_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce
CORS=*

CONNECTION_STRING=mongodb+srv://root:coderhouse@cursonode.o3yqn.mongodb.net/proyecto?retryWrites=true&w=majority
SECRET=afterclass
© 2022 GitHub, Inc.
Terms
Privacy
Sec
~~~

## Ejecutar el proyecto con Prof
~~~
node --prof index.js
~~~
