import { Router } from 'express'
const routerCarrito = new Router()

let devuelvoError = (error,metodo,path) => {
    if (metodo) return ({error:error, descripcion: `La ruta http://${path} con el metodo ${metodo} no esta autorizada`})
    else return 'Carrito no encontrado'
}

import {ProductosDao as a} from '../daos/index.js'
import {CarritoDao as b} from '../daos/index.js'

let administrador = false

let loadUser = (req,res,next) => {
    const {user} = req.query
    if(user == 'admin') {
        administrador= true
        next();
    }
    else {
        administrador= false
        next();
    }
}

//Me permite listar todos los productos guardados en el carrito
routerCarrito.get('/:id/productos',loadUser, async (req,res)=> {
    if (!administrador)  res.status(401).json(devuelvoError(-1,req.method,req.headers.host+req.originalUrl))
    else {
        const {id}= req.params
        let carrrito=await b.getById(id)
        if(carrrito.length == 0) res.status(404).json(devuelvoError())
        else res.json(carrrito[0].producto)
    }
})

//Crea un carrito y devuelve su id.
routerCarrito.post('/',loadUser, async (req,res)=> {
    if (!administrador)  res.status(401).json(devuelvoError(-1,req.method,req.headers.host+req.originalUrl))
    else {
        const time = new Date()
        const nuevoCarrito = { producto: [], timestamp: time.toLocaleString() }
        res.json(await b.save(nuevoCarrito))
    }
})

//Para incorporar productos al carrito por su id, solo se envia el id de producto a agregar.
routerCarrito.post('/:id/productos',loadUser, async (req,res)=> {
    if (!administrador)  res.status(401).json(devuelvoError(-1,req.method,req.headers.host+req.originalUrl))
    else {
        const {id}= req.params
        let newProd = req.body.producto
        let carrito=await b.getById(id)
        const productos= await a.getAll()
        if(carrito.length == 0) res.status(404).json(devuelvoError())
        else {
            const productoIndex = productos.findIndex(p => p.id == newProd.id)
            if (productoIndex === -1) {
                res.json(`Error al actualizar carrito. Producto ID: ${newProd.id} no existe`)
            }
            newProd =  {
                    "nombre": productos[productoIndex].nombre,
                    "precio": productos[productoIndex].precio,
                    "descripcion": productos[productoIndex].descripcion,
                    "codigo": productos[productoIndex].codigo,
                    "Stock": productos[productoIndex].Stock,
                    "foto": productos[productoIndex].foto,
                    "timestamp": productos[productoIndex].timestamp,
                    "id": productos[productoIndex].id
                } 
            carrito[0].producto.push(newProd)   
            await b.update(id,carrito[0])
            res.json(await b.getById(id))
        }
    }
})

//Vacía un carrito y lo elimina por su id
routerCarrito.delete('/:id',loadUser, async (req,res)=> {
    if (!administrador)  res.status(401).json(devuelvoError(-1,req.method,req.headers.host+req.originalUrl))
    else {
        const { id } = req.params
        let carrito=await b.getById(id)
        if(carrito.length == 0) {res.status(404).json(devuelvoError())}
        else  {
            await b.deleteById(id)
            res.json(`Producto ID: ${id} eliminado OK!`)
        }
    }
})

//Eliminar un producto del carrito por su id de carrito y de producto
routerCarrito.delete('/:id/productos/:id_prod',loadUser, async (req,res)=> {
    if (!administrador)  res.status(401).json(devuelvoError(-1,req.method,req.headers.host+req.originalUrl))
    else {
        const { id,id_prod } = req.params
        let carrito=await b.getById(id)
        if(carrito.length == 0) res.status(404).json(devuelvoError())
        else {
            const newCarrito = {producto: carrito[0].producto.filter(p => p.id != id_prod), timestamp: carrito[0].timestamp,id: id}
            await b.update(id,newCarrito)
            res.json(await b.getById(id))
        }
    }
})

export {routerCarrito}