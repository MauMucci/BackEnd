import express from "express";
import ProductsManager from './Managers/productsManager.js' 


import productsRouter from './routes/products.router.js';
import cartsRouter from "./routes/carts.router.js";


const app = express();//crea una insancia de express, permitiendo usar sus metodos y propiedades

const PORT = 8080

app.use(express.json()); //
app.use(express.urlencoded({extended:true})); 

app.use('/api/products', productsRouter) //conecta app con el router
app.use('/api/carts', cartsRouter)

app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}`);
        console.log("http://localhost:8080/api/products")
    }
    catch (err) {
        console.log(err);
    }
});