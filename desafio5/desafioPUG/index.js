const express = require('express');
const app = express();
const PORT = 8080;
const pug = require('pug')

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', './views');

let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 103, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

app.get('/hello', (req, res) => {
  res.render('hello.pug', { msg: 'Esto Funciona Bien' });
});


app.get('/products', (req, res) => {
  res.render('products.pug', { title: 'listado de perros', products: productsHC });
});

app.get('/products/:id', (req, res) => {
  let{id}=req.params;
  const productoEncontrado=productsHC.find(e=>e.id==id)
  if (productoEncontrado){
    res.render('unproducto.pug', { title: 'Un Producto Encontrado', productoEncontrado });

  }else{
    res.render('noEncontrado.pug', { title: 'Producto No Encontrado', productoEncontrado });

  }
});

app.get('/form', (req, res) => {
  res.render('form.pug', { title: 'Ingrese su Producto'});
});

app.post('/products', (req, res) => {
  // const {body}=req;
  // console.log(req)
  // productsHC.push(body)
  // console.log(body)
  // // res.json(body)
  // res.redirect(301,'/products')
  console.log("saludos")
});