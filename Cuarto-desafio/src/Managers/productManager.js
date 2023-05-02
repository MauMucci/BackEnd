import { error } from 'console'
import fs from 'fs'

export default class ProductManager {      
      
    constructor(){                   
        this.products = []  
        this.path = "./files/products.json"     
    }
    
    addProducts = ({title,description,price,thumbnail,code,stock}) =>{
        if(!title||!description || !price || !thumbnail || !code || !stock){
            console.log("datos incompletos")
            return null
        }

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if(this.products.length === 0){//Si no hay productos en el arreglo => le asignamos el id 1
            product.id = 1;            
            console.log("Primer producto agregado correctamente " + product.title + "id: "+product.id)                         
        }else{             
            this.products.forEach(p => {
                if(p.code === product.code){
                    console.log("Codigo ya utilizado: -" +product.code+ "- Producto no ingresado ")
                    return
                }
                else{
                                    
                    const lastProduct = this.products [this.products.length-1] 
                    product.id = lastProduct.id + 1;                                                                                                               
                }              
            })
        }  
        this.products.push(product) 
        console.log("Producto agregado correctamente: " + product.title + " ;id: "+product.id)     
        fs.promises.writeFile(this.path,JSON.stringify(this.products,null,'\t')) //Agrega al archivo json
          
    }                   

    getProducts = async() => {
        if(fs.existsSync(this.path)){
            try{            
                const data = await fs.promises.readFile(this.path,'utf-8');
                const products = JSON.parse(data)                  
                //console.log("Productos guardados en el archivo: " +JSON.stringify(products,null,'\t'))
                return products
            }        
            catch (error) {
                console.log(error)
                return [];
            }
        }
        console.log("ruta no encontrada")
        return [];                        
    }
    
     
    getProductById = async (id) => {   
        try{    

            const arr = JSON.parse(await fs.promises.readFile(this.path,'utf-8'));            
            let index = arr.findIndex((e) => e.id ===parseInt(id))

            if(index >= 0){ //cambie la condicion porque con <this.products.length> no entraba al bucle
            return console.log("Producto solicitado: " + JSON.stringify(arr[index],null,'\t'))
           
           }
           return console.log("NOT FOUND "+ id)
        }

        catch (error){
            console.log(error)
        }        
    }

    deleteById = async (id) => {
        //Para este metodo tuve que trabajar con el indice porque con filter no funcionaba
        try{
            const products = await this.getProducts()         
            let index = products.findIndex((p) => p.id === Number(id))
            
            if(index !==-1){ //verif que el index exista
                products.splice(index,1) //splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos.
                await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'))
                return products
            }
        }catch (error) {
            console.log(error)
        }
      }

    async deleteAll(){
        try{
            this.products = [];
            //await fs.promises.writeFile(this.path,JSON.stringify(this.products))
            await fs.promises.writeFile(this.path,this.products,null,'\t')
        }
        catch (error){
            console.log(error)
        }
      }   

    updateProduct = async (id,nuevoElemento) => {
        try {  
            const arr = await this.getProducts()         
            let index = arr.findIndex((e) => e.id ===id)

            if(index !==-1){ //verif que el index exista
                nuevoElemento.id = arr[index].id 
                arr.splice(index,1,nuevoElemento) //indice del elemento que deseamos reemplazar, cantidad de elementos,nuevo elemeento a agregar
                await fs.promises.writeFile(this.path,JSON.stringify(arr,null,'\t'))
                console.log(arr)                                                                        
            }
        }                          
        catch (error) {
            console.log(error)            
        }
    }
    
}

    //-------------------------------------------------
    let productManager = new ProductManager()

    const prod1 = {
        title:"Cheesecake",
        description: "Cheesecake",
        price: 1000,
        thumbnail: "Sin imagen",
        code: "code 1",
        stock: 10, 
    }
    const prod2 = {
        title:"Lemon pie",
        description: "Lemon pie",
        price: 2000,
        thumbnail: "Sin imagen",
        code: "code 2",
        stock: 25,        
    }
    const prod3 = {
        title:"Torta oreo",
        description: "Base de galletitas oreo con crema de queso y dulce de leche",
        price: 3000,
        thumbnail: "Sin imagen",
        code: "code 3",
        stock: 30,
    }
    const prod4 = {
        title:"Brownie",
        description: "Brownie de chocolate",
        price: 3400,
        thumbnail: "Sin imagen",
        code: "code 4",
        stock: 30,
    }
    const prod5 = {
        title:"Rogel",
        description: "Rogel",
        price: 3000,
        thumbnail: "Sin imagen",
        code: "code 5",
        stock: 30,
    }
    const prod6 = {
        title:"Alfajores",
        description: "Alfajores rellenos de dulce de leche",
        price: 3000,
        thumbnail: "Sin imagen",
        code: "code 6",
        stock: 30,
    }
    const prod7 = {
        title:"Selva negra",
        description: "Selva negra",
        price: 3000,
        thumbnail: "Sin imagen",
        code: "code 7",
        stock: 30,
    }
    const prod8 = {
        title:"Choco torta",
        description: "Choco torta",
        price: 3000,
        thumbnail: "Sin imagen",
        code: "code 8",
        stock: 30,
    }
    const prod9 = {
        title:"Pabloba",
        description: "Pablolba",
        price: 3000,
        thumbnail: "Sin imagen",
        code: "code 9",
        stock: 30,
    }
    const prod10 = {
        title:"Tiramisu",
        description: "Tiramisu",
        price: 3000,
        thumbnail: "Sin imagen",
        code: "code 10",
        stock: 30,
    }
    const newProd = {
        title: "producto a upgradear",
        description:"product description",
        price: 400,
        thumbnail:"Sin imagen",
        stock: 1,
        id: -1

    }

    /* productManager.addProducts(prod1)
    productManager.addProducts(prod2) 
    productManager.addProducts(prod3)
    productManager.addProducts(prod4)
    productManager.addProducts(prod5) 
    productManager.addProducts(prod6)
    productManager.addProducts(prod7)
    productManager.addProducts(prod8) 
    productManager.addProducts(prod9)
    productManager.addProducts(prod10)  */


    //productManager.deleteAll()
    //productManager.deleteById(1)

    //productManager.deleteById(1)

    //productManager.getProducts()
    //productManager.getProductById(1)
    //productManager.updateProduct(3,newProd)    

  



 