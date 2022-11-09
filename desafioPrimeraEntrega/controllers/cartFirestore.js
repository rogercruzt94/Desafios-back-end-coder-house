const admin = require('firebase-admin')
const config= require('../db/firebaseConnection.json')
const Producto = require('./productoMongo')



const Productos = new Producto()

class Carrito {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(config),
            databaseURL: 'https://entregafinal-ca5c8.firebaseio.com'
        })
    }

    async newCarrito() {
        const db = admin.firestore()
        const query = db.collection('carritos')
        let time = new Date()
        try {
            const doc = query.doc()
            const carrito = await doc.create({
                timestamp: time.toString(),
                productos: []
            })
            return carrito
        }catch (error){
            throw Error(error.message)
        }
    }

    async getCarritoById(idC) {
        try {
            const db = admin.firestore()
            const query = db.collection('carritos')
            const doc = query.doc(String(idC))
            const encontrado = await doc.get()
            return encontrado.data()
    
        } catch (error){
            throw Error(error.message)
        }
    }

    async deleteCarritoById(idC) {
        try {
            const db = admin.firestore()
            const query = db.collection('carritos')
            const doc = query.doc(String(idC))
            await doc.delete()

    
        } catch (error){
            throw Error(error.message)
        }
    }


    async deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito) {
        try {
            function random(min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            }
            
            let productoAtlas = await Productos.getById(idProducto)


            const db = admin.firestore()
            const query = db.collection('carritos')
            const doc = query.doc(idCarrito)

            productoAtlas.idC = idEnCarrito

            const item = await doc.update({
                productos: admin.firestore.FieldValue.arrayRemove(String(productoAtlas))
            })

        } catch (error){
            throw Error(error.message)
        }
    }

    async agregarProducto(idCarrito, idProducto) {
        try {
            function random(min, max) {
                return Math.floor((Math.random() * (max - min + 1)) + min);
            }
            
            let productoAtlas = await Productos.getById(idProducto)


            const db = admin.firestore()
            const query = db.collection('carritos')
            const doc = query.doc(idCarrito)

            let idrand = random(1,10000)

            productoAtlas.idC = String(idrand)

            const item = await doc.update({
                productos: admin.firestore.FieldValue.arrayUnion(String(productoAtlas))
            })

        } catch (error){
            throw Error(error.message)
        }
    }
}

module.exports = Carrito