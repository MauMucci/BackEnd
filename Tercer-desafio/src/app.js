import express, { request, response } from "express";
import  ProductManager from './Managers/productManager.js' //importante que lo escriba sin {} (Por que??)



const app = express();

//Genero una instancia de un PM
const pm = new ProductManager();

app.get('/products', async (request, response) => {
    
    const prods = await pm.getProducts();    
    let limit  = request.query //guardo en limit lo que solicita el front


    console.log(limit)
    console.log(typeof(limit))

    if (isNaN(Number(limit))) return response.send({ status: 'error', message: 'The limit is invalid' })
    limit = Number(limit)

    console.log(limit)
    console.log(typeof(limit))
    
    response.send(prods)

    if (!limit) return response.send({prods}) //pregunto si limit es falsy

    if (prods.length > limit) {
        const limitProduct = prods.slice(0, limit)  //. La función slice se utiliza para crear un nuevo array que contiene los primeros limit elementos de products
        return response.send({ limitProduct });
    }
})

app.get('/products/:pid', async (request, response) => {
    const pid = request.params

    // Se devuelve el resultado
    const result = await pm.getProductById(pid)

    return response.send({ result });
})



app.listen(8081,()=>console.log("Listening on PORT 8081"))