import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongoRemote.cnxStr, config.mongoRemote.options).catch(error => handleError(error));


class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async listar(id) {
        try {
            await this.coleccion.find({id : id});
        } catch (error) {
            
        }
    }

    async listarAll() {
        try {
          await this.coleccion.find({});
        } catch (error) {
            
        }
    }

    async guardar(nuevoElem) {
        try {
            const prodSaveModel = new this.coleccion.esquema(nuevoElem)
            await prodSaveModel.save()
        } catch (error) {
            
        }
    }

    async actualizar(nuevoElem,id) {
        try {
            await this.coleccion.updateOne({id : id},{$set: {nuevoElem}})
        } catch (error) {
            
        }
    }

    async borrar(id) {
        try {
            await this.coleccion.deleteOne({id : id});
        } catch (error) {
            
        }
    }

    async borrarAll() {
        try {
            await this.coleccion.deleteMany({ });
        } catch (error) {
            
        }
    }
}

export default ContenedorMongoDb