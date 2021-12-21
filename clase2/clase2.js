class Usuario {

    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        return console.log(`${this.nombre} ${this.apellido}`)
    }

    addMascotas(mascota) {

        for (let i = 0; i < mascota.length; i++) {
             this.mascotas.push(mascota[i]);     
        }

        return console.log(this.mascotas)
    }

    countMascotas() {
        return console.log(this.mascotas.length)
    }

    AddBook(libro) {

        for (let i = 0; i < libro.length; i++) {
           this.libros.push(libro[i]);     
        }
        
        return console.log(this.libros)
    }

    getBookNames() {
        return console.log (this.libros.map((libro) => {
            return libro.nombre
        }))
    }
}

const julian = new Usuario('Julian', 'Grimaux', [{ nombre: 'politica', autor: 'juan' }],['perro','gato'])

julian.getFullName()
julian.addMascotas(['pez'])
julian.countMascotas()
julian.AddBook([{nombre:'videojuegos', autor:'jose'}])
julian.getBookNames()




