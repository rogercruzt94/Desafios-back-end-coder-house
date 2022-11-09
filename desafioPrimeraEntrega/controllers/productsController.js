
const CrudProductos = require(`../controllers/products`);

let abm = new CrudProductos(`./db/productos.txt`);
let administrator = true;

const getAllProducts = async (req, res) => {
    try {
        let allProducts = await abm.getAll();
        return res.json(allProducts);
    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
}

const getProductById = async (req, res) => {
    try {
        let productbyId = await abm.getById(req.params.id);
        if (productbyId.length == 0) {
            return res.status(404).json({
                error: `Error producto no encontrado`
            });
        } else {
            return res.json(productbyId);
        }
    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
}

const addProduct = async (req, res) => {
    if (administrator) {
        try {
            const name = req.body.nombre;
            const price = Number(req.body.precio);
            const url = req.body.thumbnail;
            const description = req.body.descripcion;
            const date = new Date().toDateString();
            const code = Number(req.body.codigo);
            const stock = Number(req.body.stock);

            const newProducto = {
                timestamp: date,
                nombre: `${name}`,
                descripcion: `${description}`,
                codigo: code,
                thumbnail: `${url}`,
                precio: price,
                stock: stock
            };
            const id = await abm.save(newProducto);

            return res.json(`El id asignado es ${id}`);
        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
    } else {
        return res.status(404).json({
            error: `Ruta no permitida, no es usuario con perfil administrador.`
        });
    }
}

const updateProductById = async (req, res) => {
    if (administrator) {
        try {
            const id = Number(req.params.id);
            const name = req.body.nombre;
            const price = Number(req.body.precio);
            const url = req.body.thumbnail;
            const description = req.body.descripcion;
            const date = new Date().toDateString();
            const code = Number(req.body.codigo);
            const stock = Number(req.body.stock);

            let allProducts = await abm.getAll();
            const productIndex = allProducts.findIndex(product => product.id === id);

            if (productIndex < 0) {
                return res.status(401).json({
                    error: "producto no encontrado"
                });
            }
            allProducts[productIndex].nombre = name;
            allProducts[productIndex].thumbnail = url;
            allProducts[productIndex].timestamp = date;
            allProducts[productIndex].descripcion = description;
            allProducts[productIndex].codigo = code;
            allProducts[productIndex].precio = price;
            allProducts[productIndex].stock = stock;

            await abm.write(allProducts, `Mensaje modificado`);
            return res.json(`Se actualizó el id ${id}`);

        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
    } else {
        return res.status(404).json({
            error: `Ruta no permitida, no es usuario con perfil administrador.`
        });
    }
}

const deleteProductById = async (req, res) => {
    if (administrator) {
        try {
            const id = Number(req.params.id);
            await abm.deleteById(id);

            return res.json(`Se eliminó de forma correcta el ID:${id}`);
        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
    } else {
        return res.status(404).json({
            error: `Ruta no permitida, no es usuario con perfil administrador.`
        });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
};