// const express = require(`express`);

// const Contenedor = require(`./contenedor.js`);

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(`public`));

// const PORT = process.env.PORT || 8080;

// let myContenedor = new Contenedor(`productos.txt`);

// app.get(`/`, (req, res) => {
//     res.send(`<h1> desafio 3</h1>`);
// });

// app.get(`/productos`, (req, res) => {
//     ; (async () => {
//         try {
//             let data = await myContenedor.getAll();
//             res.send(data);
//         } catch (err) {
//             console.error(err);
//         }
//     })();
// });

// app.get(`/productoRandom`, (req, res) => {
//     ; (async () => {
//         try {
//             let allData = await myContenedor.getAll();
//             let random = Math.trunc(Math.random() * ((allData.length) - 0) + 0);
//             let dataRandom = await myContenedor.getById(random);
//             res.send(dataRandom);
//         } catch (err) {
//             console.error(err);
//         }
//     })();
// });

// const server = app.listen(PORT, () => {
//     console.log("servidor http escuchando en el puerto: "+PORT)
// });

// server.on(`Error`, (error) => console.log(`Error en servidor: ${error}`));


const express = require(`express`);
const { Router } = express;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));

//Routers import
const productsRouter = require("./routes/productsRoutes");
const cartRouter = require("./routes/cartRoutes");
const routerProductos = require("./routes/productsRoutesMongo");
const cartRouterFirestore = require("./routes/cartRoutesFirestore");

//Routers
// app.use(`/api/products`, productsRouter);
// app.use(`/api/cart`, cartRouter);
//router mongo y firestore
app.use(`/api/productsMongo`, routerProductos);
app.use(`/api/cartFirestore`, cartRouterFirestore);

app.use(express.static(`public`));
let administrador=true;
if(administrador==false){
    console.log("no sos admin")
}
app.use((req, res, next) => {
    res.status(404).json({ error: 500, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` });
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Servidor HHTP escuchando puerto ${PORT}`));

server.on(`error`, err => console.log(`error en el servidor ${err}`));
