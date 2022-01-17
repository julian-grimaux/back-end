const express = require('express');
const fs = require('fs');

const app = express();
const puerto = 8080;

app.get('/productos', (req, res) => {
    const data = fs.readFileSync(`./productos.txt`, 'utf-8');
    const arrayProductos = JSON.parse(data);
    res.json({
        items: arrayProductos,
        cantidad: arrayProductos.length
    });
});

app.get('/productosRandom', (req, res) => {
    const data = fs.readFileSync(`./productos.txt`, 'utf-8');
    const arrayProductos = JSON.parse(data);
    let numeroAleatorio = Math.floor(Math.random() * arrayProductos.length)
    let producto = arrayProductos[numeroAleatorio];
    res.json({ item: producto });
});


const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});


server.on('error', error => {
    console.log('error en el servidor:', error);
});