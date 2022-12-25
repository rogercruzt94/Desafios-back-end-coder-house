const mongoose = require('mongoose');

const URL = 'mongodb+srv://admin:admin@cluster0.ugciapi.mongodb.net/?retryWrites=true&w=majority';
const connection = mongoose.connect(URL, {
    useNewUrlParser: true
});

module.exports = connection;
