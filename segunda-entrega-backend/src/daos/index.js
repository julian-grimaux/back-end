import config from '../config.js'

let CarritoDao
switch (process.env.CAR) {
    case 'json':
        const { default: CarritoDaoArchivo } = await import('./carritos/CarritoDaoArchivo.js')
        CarritoDao = new CarritoDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: CarritoDaoFirebase } = await import('./carritos/CarritoDaoFirebase.js')
        CarritoDao = new CarritoDaoFirebase()
        break
    case 'mongodb':
        const { default: CarritoDaoMongoDb } = await import('./carritos/CarritoDaoMongoDb.js')
        CarritoDao = new CarritoDaoMongoDb()
        break
    default:
        const { default: CarritoDaoMemoria } = await import('./carritos/CarritoDaoMemoria.js')
        CarritoDao = new CarritoDaoMemoria()
        break
        
}

let ProductosDao

switch (process.env.PROD) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        ProductosDao = new ProductosDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        ProductosDao = new ProductosDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDB } = await import('./productos/ProductosDaoMongoDb.js')
        ProductosDao = new ProductosDaoMongoDB()
        break
    default:
        const { default: ProductosDaoMemoria } = await import('./productos/ProductosDaoMemoria.js')
        ProductosDao = new ProductosDaoMemoria()
        break
}
export { ProductosDao,CarritoDao }