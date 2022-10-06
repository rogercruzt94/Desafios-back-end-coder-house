const express = require(`express`);

const Contenedor = require(`../desafio2/desafio2.js`);

const app = express();

const PORT = 8080;

let myContenedor = new Contenedor(`productos.txt`);

app.get(`/`, (req, res) => {
    res.send(`<h1> desafio 3</h1>`);
});

app.get(`/productos`, (req, res) => {
    ; (async () => {
        try {
            let data = await myContenedor.getAll();
            res.send(data);
        } catch (err) {
            console.error(err);
        }
    })();
});

app.get(`/productoRandom`, (req, res) => {
    ; (async () => {
        try {
            let allData = await myContenedor.getAll();
            let random = Math.trunc(Math.random() * ((allData.length) - 0) + 0);
            let dataRandom = await myContenedor.getById(random);
            res.send(dataRandom);
        } catch (err) {
            console.error(err);
        }
    })();
});

const server = app.listen(PORT, () => {
    console.log("servidor http escuchando en el puerto: "+PORT)
});

server.on(`Error`, (error) => console.log(`Error en servidor: ${error}`));