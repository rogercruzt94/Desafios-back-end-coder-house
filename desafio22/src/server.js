import express from "express";
import session from 'express-session';
import {engine} from 'express-handlebars';
import path from 'path';
import {fileURLToPath} from 'url';
import mongoStore from 'connect-mongo';
import compression from 'compression';
import minimist from 'minimist';
import logger from "./utils/loggers/Log4jsLogger.js";
import loggerMiddleware from "./middlewares/routesLogger.middleware.js";
import {graphqlHTTP} from "express-graphql";
import cors from 'cors';
import {schema} from "./graphql/Schema.js";
import {CarritoService} from "./services/carrito.service.js";
import {ProductoService} from "./services/producto.service.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(loggerMiddleware);
app.use(express.static('public'));
app.use(compression());
app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.use(
    session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            options: {
                userNewParser: true,
                useUnifiedTopology: true,
            }
        }),
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 600000} //10 min.
        
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

async function getAllCarritos() {
    return CarritoService.getInstance().getAll();
}

async function getAllProductos() {
    return ProductoService.getInstance().getAll();
}

async function createCarrito() {
    return CarritoService.getInstance().create();
}

async function deleteCarritoById({id}) {
    return CarritoService.getInstance().deleteById(id);
}

async function getAllProductsFromCartById({id}) {
    return CarritoService.getInstance().getAllProductsFromCart(id);
}

async function saveProductToCart({id, idProd}) {
    return CarritoService.getInstance().saveProductToCart(id, idProd);
}

async function deleteProductFromCart({id, idProd}) {
    return CarritoService.getInstance().deleteProductFromCart(id, idProd);
}

async function getProductById({id}) {
    return ProductoService.getInstance().getProductById(id);
}

async function createProduct({data}) {
    return ProductoService.getInstance().create(data);
}

async function updateProductById({id, data}) {
    return ProductoService.getInstance().updateProductById(id, data);
}

async function deleteProductById({id}) {
    return ProductoService.getInstance().deleteById(id);
}

app.use(
    '/graphql',
    graphqlHTTP({
            schema,
            rootValue: {
                getAllCarritos,
                getAllProductos,
                createCarrito,
                deleteCarritoById,
                getAllProductsFromCartById,
                saveProductToCart,
                deleteProductFromCart,
                getProductById,
                createProduct,
                updateProductById,
                deleteProductById
            },
            graphiql: true
        }
    )
);

app.all("*", (req, res) => {
    res.status(404).json({"error": "ruta no existente"})
  });

/* --------------- Leer el puerto por consola o setear default -------------- */

const options = {
    alias: {
        "p": "PORT"
    },
    default: {
        "PORT": 8080
    }
};

app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      console.log(r.route.path)
    }
  });

const { PORT } = minimist(process.argv.slice(2), options);

const server = app.listen(PORT, () => {
    logger.info(`🚀 Server started at http://localhost:${PORT}`)
    })
    
server.on('error', (err) => logger.error(err));

