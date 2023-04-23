import { Router } from "express";

const cartsRouter = Router(); //defino la ruta para el carrito

cartsRouter.get('/',(req,res) =>{
    res.send("HOLA DESDE CARRITO")
})

export default cartsRouter;