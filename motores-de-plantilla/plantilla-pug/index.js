const express = require('express');
const products = require('./contenedor');

// App Express
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Settings

app.set('views', './views');
app.set('view engine', 'pug');


// Routes

app.get('/productos', (req, res) => {
    const productos = products.viewAll()
    console.log('productos', productos)
    if (productos.length > 0) {
        res.render('tabla', { productos: products.viewAll(), productsExists: true })
    } else {
        res.render('tabla', { productos: products.viewAll(), productsExists: false })
    }
})

app.post('/productos', (req, res) => {

    products.addProduct(req.body)

    res.redirect('/productos');
})


// Server
const PORT = 4040;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (error) => {
    console.log('Error en el servidor ', error)
})