const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorProductos = require('./contenedores/ContenedorProductos.js')
const ContenedorMensajes = require('./contenedores/ContenedorMensajes.js')

// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productos = new ContenedorProductos()
const mensajes = new ContenedorMensajes('mensajes.json')

// configuro el socket

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos
    socket.emit('productos', productos.listarAll());

    // actualizacion de productos
    socket.on('update', producto => {
        productos.guardar(producto)
        io.sockets.emit('productos', productos.listarAll());
    })

    // carga inicial de mensajes
    socket.emit('mensajes', await mensajes.listarAll());

    // actualizacion de mensajes
    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajes.guardar(mensaje)
        io.sockets.emit('mensajes', await mensajes.listarAll());
    })
});

// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
