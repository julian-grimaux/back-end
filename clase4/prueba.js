const Contenedor = require('./clase4');

const contenedor = new Contenedor('prueba')

contenedor.save({
    title: 'prueba',
    price: 5,
    thumbnail : 'prueba.png'
});

contenedor.save({
    title: 'prueba2',
    price: 10,
    thumbnail : 'prueba.png'
});

contenedor.save({
    title: 'prueba3',
    price: 20,
    thumbnail : 'prueba.png'
});

contenedor.save({
    title: 'prueba4',
    price: 50,
    thumbnail : 'prueba.png'
});

contenedor.deleteById(1);
console.table(contenedor.getAll()); 
contenedor.deleteAll();