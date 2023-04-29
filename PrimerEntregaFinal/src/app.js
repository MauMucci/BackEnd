import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';


const app = express();
const PORT = 8080

app.use(express.json());// Me permite leer jsons en las peticiones

app.use(express.urlencoded({extended:true})); //OBjetos codificados desde URL

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
//

app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}`);
        console.log("http://localhost:8080/api/carts")
    }
    catch (err) {
        console.log(err);
    }
});