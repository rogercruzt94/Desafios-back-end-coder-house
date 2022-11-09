const express = require('express')
const Carrito = require('../db/mainDAOS').CarritoDaos
const routerCarrito = express.Router()

const Carro = new Carrito()

routerCarrito.post('/', async function(req, res){
    try {
        const carrito = await Carro.newCarrito()
        res.status(200).send({
            status: 200,
            data: {
                carrito,
            },
            message:'carrito agregado'
            })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}
);

routerCarrito.delete('/carrito/:id', async function(req, res){
    const num = req.params.id
    try {
        const borrado = await Carro.deleteCarritoById(num)
        res.status(200).send({
            status: 200,
            data: {
                borrado,
            },
            message:'carrito borrado'
            })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
});




routerCarrito.post('/productos', async function(req, res){
        
    try {
            let idCarrito = req.body.idCart
            let idProducto = req.body.idP
            const agregado = await Carro.agregarProducto(idCarrito, idProducto)
            res.status(200).send({
                status: 200,
                data: {
                    agregado,
                },
                message:'producto agregado a carrito'
                })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: error.message
            })
        }
            
            
});


routerCarrito.delete('/eliminarProducto/:idC', async function(req, res){
    const idCart = req.params.idC
    try {
        let idCarrito = req.body.idCart
        let idProducto = req.body.idP
        let idEnCarrito = idCart
        const agregado = await Carro.deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito)
        res.status(200).send({
            status: 200,
            data: {
                agregado,
            },
            message:'producto eliminado del carrito'
            })
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
    
}
);

module.exports = routerCarrito