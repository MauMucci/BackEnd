import { Router } from "express";
import ProductsManager from "../Managers/productsManager.js";

const productsRouter = Router(); //defino la ruta de products

const pm = new ProductsManager()

productsRouter.get('/', async (req, res) => {

    const prods = await pm.getProducts();   

    let limit  = req.query["limit"] //guardo en limit lo que solicita el front
    //asigna el valor de la consulta "limit" en una solicitud http a la variable limit

    //Valido que limit no sea un falsy
    if (!limit) return res.send(prods) 
 
    if (prods.length > limit) {
        const limitProduct = prods.slice(0, limit)  //slice se utiliza para crear un nuevo array que contiene los primeros <limit> elementos de products
        return res.send({ limitProduct });
    }
    else{res.send(prods)}
})

productsRouter.get('/:pid', async (req, res) => {
    try{
        const {pid} = req.params //desestructuro

         // Consulta si el parámetro es un número ya que el ID es numérico
         if (isNaN(Number(pid))) {
            return res.status(400).send({ status: 'Error', message: 'Invalid identification' });
        }
        // Se devuelve el resultado
        const result = await pm.getProductById(pid)

        return res.send( result );
    }
        catch (err) {
            console.log(err)
            }
})

productsRouter.post('/', async (req, res) => {
    try {
        const product = req.body

        const result = await pm.addProducts(product)
        console.log("hola "+result)
        
        //console.log(result.status)

        //if (result.status === 'error') return res.status(400).send({ result });

        return res.status(200).send({ result });
    }
    catch (err) {
        console.log(err);
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const product = res.body

        const result = await pm.updateProduct(Number(pid), product)

        if (result.status === 'error') return res.status(400).send({ result });

        return res.status(200).send({ result })
    }
    catch (err) {
        console.log(err);
    }
})

productsRouter.delete(':/pid', async (req,res) => {
    try{
        const { pid } = req.params;
        await productManager.deleteById(pid);
        res.send("Producto con ${pid} eliminad");        
        }  

        catch (err){
        console.log(err)
    }
})

export default productsRouter;