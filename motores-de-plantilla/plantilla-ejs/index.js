const express = require('express');
const products = require('./contenedor');

// App Express
const app = express();

// Settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './views');
app.set('view engine', 'ejs');


// Routes
app.get('/productos', (req, res) => {
    const items = products.viewAll()
    res.render('formulario', { items: items, mensaje: 'No hay productos' });
});

app.post('/productos', (req, res) => {

    products.addProduct(req.body)

    res.redirect('/productos');
})

app.get('/productos', (req, res) => {

    const items = products.viewAll()
    console.log(items)
    if (items.length > 0) {
        res.render('index', { items: products.viewAll(), productsExists: true })
    } else {
        res.render('index', { items: products.viewAll(), productsExists: false })
    }
})


// Server
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (error) => {
    console.log('Error en el servidor ', error)
})