// const promediar = (a,b) => (a + b) / 2
// const p = promediar(4,8)
// console.log(p) //6


// const ejecutar = cualquierFuncion => cualquierFuncion()

// const decirHola = () => console.log('hola')

// ejecutar(()=> console.log("buenas!"))
// ejecutar(decirHola)

// /////////////////

// const ejecutar2 = (unaFuncion, params) => unaFuncion(params)

// const saludar = nombre => console.log(`saludos, ${nombre}`)

// ejecutar2(saludar, 'terricolas')

//////////////


// const operacion = (a, b, funcion) => funcion(a,b)

// const suma = (a,b) => console.log(a + b)

// const resta = (a,b) => console.log(a - b)

// const producto = (a,b) => console.log(a * b)

// const division = (a,b) => console.log(a / b)

// operacion(2,2,suma)
// operacion(2,4,resta)


const copiarArchivo = async (nombreArchivo) => {
    const archivo = await buscarArchivo(nombreArchivo)
    const contenidoArchivo = await leerArchivo(nombreArchivo)
    const archivoCopiado = await copyArchivo("NuevoNombre", contenidoArchivo)
}