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

        return res.status(200).send({ result });
    }
    catch (err) {
        console.log(err);
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const  pid  = req.params.pid//obtiene el valor del parametro de ruta
       
        const newProduct = req.body
        //console.log(newProduct)

        const allProducts = await pm.getProducts()
        const index = allProducts.findIndex((p) => p.id == pid)
        if(index == -1){
            return res.status(404).send({status:"error",error:"not found"});
        }
        
        newProduct.id = allProducts[index].id //debo mantener el id del elemento que reemplazo
        allProducts[index] = newProduct //reemplazo en el arreglo de productos, el elemento que quiero reemplazar

        const result = await pm.updateProduct(pid,newProduct)
        //console.log(result)
        res.send({status:"succes",message:"product updated"})

    }
    catch (err) {
        console.log(err);
    }
})

productsRouter.delete('/:pid', async (req,res) => {

    try {
        const  pid  = req.params.pid
        const result = await pm.deleteById(pid)
        console.log(result)

        if (result) {
            res.status(200).json({ status: 'success', message: 'Product deleted' });
          } else {
            res.status(404).json({ status: 'error', error: 'Product not found' });
          }
        

    } catch (err) {
        console.log(err);
    }
}); 

export default productsRouter;