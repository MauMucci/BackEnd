import { Router } from "express";
import ProductsManager from "../Managers/productsManager.js";

const productsRouter = Router(); //defino la ruta de products

const pm = new ProductsManager()

productsRouter.get('/', async (request, response) => {
    
    const prods = await pm.getProducts();   

    let limit  = request.query["limit"] //guardo en limit lo que solicita el front
    //asigna el valor de la consulta "limit" en una solicitud http a la variable limit

    //Valido que limit no sea un falsy
    if (!limit) return response.send(prods) 
 
    if (prods.length > limit) {
        const limitProduct = prods.slice(0, limit)  //slice se utiliza para crear un nuevo array que contiene los primeros <limit> elementos de products
        return response.send({ limitProduct });
    }
    else{response.send(prods)}
})

productsRouter.get('/:pid', async (request, response) => {
    try{
        const pid = request.params
        
        console.log(pid)

         // Consulta si el parámetro es un número ya que el ID es numérico
         if (isNaN(Number(pid))) {
            return response.status(400).send({ status: 'Error', message: 'Invalid identification' });
        }

        // Se devuelve el resultado
        const result = await pm.getProductById(pid)

        return response.send( result );

    }
        catch (err) {
            console.log(err)
            }
})


export default productsRouter;