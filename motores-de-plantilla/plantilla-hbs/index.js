const express = require('express');
const products = require('./contenedor');
const handlebars = require('express-handlebars');

// App Express
const app = express();

// Settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: '',
        layoutsDir: ''
    })
);
app.set('view engine', 'hbs');
app.set("views", "./views/layouts");

// Routes

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/productos', (req, res) => {

    const items = products.viewAll()
    console.log(items)
    if (items.length > 0) {
        res.render('vista', { items: products.viewAll(), productsExists: true })
    } else {
        res.render('vista', { items: products.viewAll(), productsExists: false })
    }
})

app.post('/productos', (req, res) => {

    products.addProduct(req.body)

    res.redirect('/productos');
})


// Server
const PORT = 4000;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (error) => {
    console.log('Error en el servidor ', error)
})