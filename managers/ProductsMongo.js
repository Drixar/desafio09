
import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
import { productSchema } from "../models/products.js";

class ProductsMongo{
    constructor(){
        this.model = mongoose.model("products", productSchema.plugin(mongoosePaginate))
    }

    async getAll() {
        try {
            const datos = await this.model.find();
            console.log(datos)
            return ['200', "Archivo de leído Correctamente", datos];
        } catch (error) {
            return [error, `Error ${error}`, null];
        }
    }

    async getAllPaginated(limit, page, sort, query) {
        try {
            console.log(limit, page, sort, query) 
            console.log("llegamos hasta acá")
            let datos;
            switch(sort){
                case 1:
                    datos = await this.model.paginate(query, { page: page, limit: limit, sort: {price: 1} });
                    break;
                case -1:
                    datos = await this.model.paginate(query, { page: page, limit: limit, sort: {price: -1} });
                    break;
                case 0:
                    datos = await this.model.paginate(query, { page: page, limit: limit });
                    console.log("llegamos hasta acá")
            }
            console.log(datos)
            return ['200', "Archivo de leído Correctamente", datos];
        } catch (error) {
            return [error, `Error ${error}`, null];
        }
    }

    async getById(id) {
        try {
            const dato = await this.model.findById(id);         
            return ['200', "Archivo de leído Correctamente", dato];
        } catch (error) {
            return [error, `Error ${error}`, null];
        }
    }

    async add(newData){
        try {
            const dato = await this.model.create(newData);
            console.log("archivo guardado correctamente");
            return ['200', "Archivo grabado Correctamente", dato];
        } catch (error) {
            return [error, `Error ${error}`, null];
        }
    }

    async updateById(id, newData){
        try {
            const data = await this.model.updateOne({_id:id}, {$set: newData});
            return ['200', `Registro ${id} actualizado Correctamente`, await this.model.findById(id)];
        } catch (error) {
            return [error, `Error ${error}`, null];
        }
    }

    async deleteById(id){
        try {
            const data = await this.model.deleteOne({_id: id});
            return ['200', `Registro ${id} borrado Correctamente`, null];
        } catch (error) {
            return [error, `Error ${error}`, null];
        }
    }

    async deleteAll(){
        try {
            const data = await this.model.deleteMany({});
            return ['200', `Archivo borrado Correctamente`, null];
        } catch (error) {
            return [error, `Error ${error}`, null];
        }
    }
}

export {ProductsMongo};