import express, { request, response } from "express";
import  ProductManager from './Managers/productManager.js' //importante que lo escriba sin {} (Por que??)



const app = express();

//Genero una instancia de un PM
const pm = new ProductManager();

app.get('/products', async (request, response) => {
    
    const prods = await pm.getProducts();   

    //console.log(request.query)
    let limit  = request.query["limit"] //guardo en limit lo que solicita el front
    //asigna el valor de la consulta "limit" en una solicitud http a la variable limit

    //Valido que limit no sea un falsy
    if (!limit) return response.send(prods) 
 
    if (prods.length > limit) {
        const limitProduct = prods.slice(0, limit)  //slice se utiliza para crear un nuevo array que contiene los primeros limit elementos de products
        return response.send({ limitProduct });
    }
    else{response.send(prods)}
})

app.get('/products/:pid', async (request, response) => {
    const {pid} = request.params
    console.log(pid,typeof(pid))
    const pidNumber = parseInt(pid)
    console.log(pidNumber,typeof(pidNumber))

    // Consulta si el parámetro es un número ya que el ID es numérico
    if (isNaN(Number(pidNumber))) {
        return response.status(400).send({ status: 'Error', message: 'Invalid identification' });
    }

    // Se devuelve el resultado
    const result = await pm.getProductById(pidNumber)

    return response.send( result );
})



app.listen(8081,()=>console.log("Listening on PORT 8081"))