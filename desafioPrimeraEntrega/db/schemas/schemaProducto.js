const mongoose = require('mongoose')

const esquemaProducto = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    thumnail: {type: String, require: true},
    stock: {type: Number, require: true},
    idP: {type: Number, require: true},
    idC: {type: Number, require: false},
    time: {type: String, require: false}
})

module.exports = mongoose.model('productos', esquemaProducto)