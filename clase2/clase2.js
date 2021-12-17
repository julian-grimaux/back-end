class Usuario {

    constructor(nombre, apellido, libro, mascota) {
        this.nombre = nombre
        this.apellido = apellido
        this.libro = libro
        this.mascota = mascota
        this.mascotas = []
        this.libros = []
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascotas() {

        this.mascotas.push(`${this.mascota}`, 'gato', 'pajaro', 'pez')

        return this.mascotas
    }

    countMascotas() {
        return this.mascotas.length
    }

    AddBook() {

     this.libros.push({ nombre: 'videojuegos', autor: 'pepe' },
            { nombre: 'programacion', autor: 'jose' },
            (this.libro))
        return this.libros
    }

    getBookNames() {
        return this.libros.map((libro) => {
            return libro.nombre;
        })
    }
}

const julian = new Usuario('Julian', 'Grimaux', { nombre: 'politica', autor: 'juan' }, 'perro')

console.log(julian.getFullName())
console.log(julian.addMascotas())
console.log(julian.countMascotas())
console.log(julian.AddBook())
console.log(julian.getBookNames())


