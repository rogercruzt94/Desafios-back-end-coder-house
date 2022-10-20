const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);
//fin configuracion del motor
let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 103, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

app.get('/products', (req, res) => {
  res.render('productslist', { products: productsHC, productsExist: true });
});
app.get('/products/:id',(req,res)=>{
  const {id} =req.params
  try{
    let found = productsHC.find(e=>e.id == id)
    if(found){
      res.render('oneProduct',{product:found, title:"Detalle del producto"});

    }else{
      res.render('errorProduct',{errorMessage:"Producto no Encontrado"});

    }
  }catch(error){
    console.log(error)
  }

})


app.get('/form', (req, res) => {

  res.render('form', { title: 'Ingrese un producto', products: productsHC });
});
function getRandom(){
  return Math.random();
}
app.post('/products', (req, res) => {
  const {body}=req;
  const name = req.body.title;
  const price = Number(req.body.price);
  const url = req.body.thumbnail;
  const id=getRandom(100);

  const newProducto = {
    title: `${name}`,
    price: price,
    thumbnail: `${url}`,
    id: id
  };
 
  console.log(id)
  productsHC.push(body)
  console.log(body)
  //  res.json(body)
   res.redirect(301,'products')
  
});

