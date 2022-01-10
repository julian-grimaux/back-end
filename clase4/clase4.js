
class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
        this.fs = require('fs');

        if(this.fs.existsSync(`./${archivo}.txt`)){

            try{
                this.data = JSON.parse(this.fs.readFileSync(`./${archivo}.txt`, 'utf-8'));
                console.log(`Abriendo archivo ${archivo}.txt`);
            } catch (error){
                console.error (`No se pudo leer el archivo: ${error}`);
            }
        } else {
            this.data = {
                objects : 0
            }
            try {
                this.fs.writeFileSync(`./${this.archivo}.txt`, JSON.stringify(this.data));
            } catch (error){
                console.error(`No se pudo reescribir el archivo: ${error}`);
            }
        }
    }

    rewritre() {
        try {
            this.fs.writeFileSync(`./${this.archivo}.txt`,JSON.stringify(this.data)); 
        } catch (error) {
          console.error(`No se pudo reescribir el archivo: ${error}`);  
        }
    }

    async save(object){
        let id = ++this.data.objects;
        this.data[id] = object;
        await this.rewritre();
        console.log(`Objecto ${id} añadido a ${this.archivo}.txt`);
        return id;
    }

    getById(id){
        return this.data[id];
    }

    getAll(){
        return this.data;
    }

    async deleteById(id){
        if(this.data[id]){
            this.data.objects --;
            this.data[id] = '';
            delete this.data[ id ];
            await this.rewritre();
            console.log(`Borrado el objeto ${id} de ${this.archivo}.txt`); 
            return true
        }
        console.error(`Producto no encontrado`);
    }

    async deleteAll(cb){
        try {
            await this.fs.promises.unlink(`./${this.archivo}.txt`);
            
        } catch (error) {
            console.error(`No se pudo borrar archivo : ${error}`);
        }
    }
}

module.exports = Contenedor;