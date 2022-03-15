class ContenedorMemoria {

    constructor() {
        this.producto = []
    }

    async save(prod) {
        try {
            let newId
            if (this.producto.length == 0) {
                newId = 1
            } else {
                newId = this.producto[ this.producto.length - 1 ].id + 1
            }
            const newProd = { ...prod, id: newId }
            this.producto.push(newProd)
            return newProd.id
            } catch (error) {
            this.MuestroError(error, "save");
        }
    }

    async update(number,elem) {
        try {
            const index = this.producto.findIndex(p => p.id == number)
            if (index == -1) {
                throw new Error(`Error al actualizar id ${number}: elemento no encontrado`)
            } else {
                this.producto[index] = elem
                return elem
            }
        } catch (error) {
            this.MuestroError(error, "update");
            return [];
        }
    }

    async getAll() {
        try {
            return [ ...this.producto ]
        } catch (error) {
            this.MuestroError(error, "getAll");
            return [];
        }
    }

    async getById(id) {
        try {
            let filtrado = this.producto.filter((a) => a.id == id);
            if (!filtrado) filtrado = null
            return filtrado
        } catch (error) {
            this.MuestroError(error, "getById");
            return "Error en conseguir el id: " + id;
        }
    }

    async deleteById(id) {
        try {
            const index = this.producto.findIndex(elem => elem.id == id)
            if (index == -1) {
                throw new Error(this.MuestroError(error, "deleteById"))
            } else {
                console.log(`Borrado id: ${id} ok!`)
                return this.producto.splice(index, 1)[ 0 ]
            }
        } catch (error) {
            this.MuestroError(error, "deleteById");
        }
    }

    async deleteAll() {
        try {
            this.producto = []
            console.log("Borrado Completo ok!");
        } catch (error) {
        this.MuestroError(error, "deleteAll");
        }
    }

    MuestroError(error, fnName) {
        console.log(`#!% --> Error en funcion ${fnName}:\n#!% --> ${error}`);
      } 
}

export default ContenedorMemoria