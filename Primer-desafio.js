class ProductManager {      
      
    constructor(){                   
        this.products = []       
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

        if(this.products.length === 0){//No hay productos en el arreglo => le asignamos el id 1
            product.id = 1;
        }else{ 
            const lastProduct = this.products [this.products.length-1] 
            product.id = lastProduct.id + 1; 
        }        
              
        if(this.products.length == 0){ //Verifico que el el arreglo este vacio y agrego el primer elemento 
            this.products.push(product)
        }
        else{
               this.products.forEach(p => {
                if(p.code == product.code){
                    console.log("Codigo ya ingresado" +product.code+ "Producto no ingresado ")
                    return
                }
                else{
                    console.log("Producto agregado correctamente " + product.code)   
                    this.products.push(product)             
                }                                                              
            })
        }    
    }

    getProducts = () => {
        if(this.products.length == 0){
            console.log("No hay productos")
        }
       return console.log(this.products);
    }

    getProductById = (id) => {
        let idCheck
        let requestedProduct
        this.products.forEach(p =>{
            if(p.id === id){
                idCheck = id
                requestedProduct = p
            }
        })
        if(idCheck){
                console.log("Producto solicitado: ",requestedProduct)
            }    
    }
    
}

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


    productManager.addProducts(prod1)
    productManager.addProducts(prod2) 
    productManager.addProducts(prod3) 

    //productManager.getProductById(1)
    
    console.log(productManager.getProducts())
 
