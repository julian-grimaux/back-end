let productos = [
    {id:1, nombre:'Yerba',  precio: 100},
    {id:2, nombre:'Azucar', precio: 200},
    {id:3, nombre:'Fideos', precio: 50}
]

const nombre = productos.map((p)=>{
    return p.nombre
})

const total = productos.map(p=>p.precio).reduce((a,b)=> a+b,0)

const promedio = total / productos.length

const max = Math.max.apply(null,productos.map(e=>e.precio))
const min = Math.min.apply(null,productos.map(e=>e.precio))

console.log(nombre)
console.log(total)
console.log(promedio)
console.log(max)
console.log(min)
