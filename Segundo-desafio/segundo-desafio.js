import fs from 'fs'


class ProductManager {      
      
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
            this.products.push(product)
            console.log("Primer producto agregado correctamente " + product.code) 
        }else{ 
            const lastProduct = this.products [this.products.length-1] 
            product.id = lastProduct.id + 1;
            this.products.forEach(p => {
                if(p.code === product.code){
                    console.log("Codigo ya utilizado: -" +product.code+ "- Producto no ingresado ")
                    return
                }
                else{
                    console.log("Producto agregado correctamente: " + product.code)                 
                    this.products.push(product)                                           
                    fs.promises.writeFile(this.path,JSON.stringify(this.products,null,'\t')) //Agrega al archivo json
                }
            })
        }        
    }                   

    getProducts = async() => {
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path,'utf-8');
                const products = JSON.parse(data)
                console.log("Productos guardados en el archivo: " +JSON.stringify(products,null,'\t'))
                return products
            }
        }
            catch (error) {
                console.log(error)
            }
            return [];
    }

    checkId = async(id) => {
        try{        
            const getFileProducts = await fs.promises.readFile(this.path,'utf-8') //Leo los productos del archivo
            const productsJSON = JSON.parse(getFileProducts); //convierto los productos en string
            const productFound = productsJSON.find(p => p.id === id);      

               if(productFound) {            
               return productFound //retorno un objeto en formato object
               
               }
               else{                
                return null
               }                
        }
        catch (err){
            console.log(err)
        }
    }

    getProductById = async (id) => {   
        try{        
           const product = await this.checkId(id)
           if(product){
            return console.log("Producto solicitado: " + JSON.stringify(product,null,'\t'))
           }
           return console.log("NOT FOUND "+ id)
        }

        catch (err){
            console.log(err)
        }        
    }

    updateProduct = async (id,object) => {
        try {
            const prod2UpdateObj = await this.checkId(id)
            const array2UpdateObj = await fs.promises.readFile(this.path,'utf-8')   
            const array2UpdateParse = JSON.parse(array2UpdateObj)
            console.log("Se actualizara el id: " + id);         
            console.log("Producto a actualizar: " +(prod2UpdateObj),typeof(prod2UpdateObj))  
            console.log("arreglo del archivo a update" + array2UpdateParse)          
            
           
            console.log("HOLA")
            const arraux = array2UpdateParse.map(e => {
                if(e.id === id){
                    console.log("ADENTRO1" + object.title)
                    e = Object.assign(e,object)
                    console.log("ADENTRO" + e.title)
                }else{
                    console.log("NO")
                }                                    
            })  
            console.log("adentro 3" +arraux)    
        } 
    
        catch (error) {
            
        }
    }
    
    async deleteById(id) {
        try {
            this.products = this.products.filter((e) => e.id != id);
            await fs.promises.writeFile(this.path,JSON.stringify(this.products,null,'\t'));
            console.log("nuevo arreglo de productos" + this.products)
        } catch (err) {
            console.error(err);
        }
      }      

    async deleteAll(){
        try{
            this.products = [];
            await fs.promises.writeFile(this.path,JSON.stringify(this.products))
        }
        catch (err){
            console.log(err)
        }
      }
    }

    //-------------------------------------------------
    let productManager = new ProductManager()

    const prod1 = {
        title:"producto 1",
        description: "este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "code 1",
        stock: 25,        
    }

    const prod2 = {
        title:"producto 2",
        description: "Producto igual al prod1",
        price: 200,
        thumbnail: "Sin imagen",
        code: "code 1",
        stock: 25,        
    }

    const prod3 = {
        title:"producto 3",
        description: "Producto 3",
        price: 300,
        thumbnail: "Sin imagen",
        code: "code 3",
        stock: 30,
    }

    const updateProduct = {
        title: "producto a upgradear",
        description:"product descriptio",
        price: 400,
        thumbnail:"Sin imagen",
        stock: 1

    }



    /* productManager.addProducts(prod1)
    productManager.addProducts(prod2) 
    productManager.addProducts(prod3)  */ 

    //productManager.deleteAll()
    productManager.deleteById(2)

    //productManager.getProducts()
    //productManager.updateProduct(1,updateProduct)    


    //productManager.getProductById(3)
    //productManager.getProducts()

 