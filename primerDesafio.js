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
        

        
        //this.products.push(product)

        this.products.forEach(p => {                
            //console.log(p.code)  
            if(p.code == product.code){
            console.log("adentro " + p.code + " " + product.code)   
            this.products.push(product) }
            else{
                console.log("no entre")
            }                                  
                           
        })

        
       
        
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
        if(idCheck)
            {
                console.log("Producto solicitado: ",requestedProduct)
            }    
    }
    
}

    let productManager = new ProductManager()

    const prod1 = {
        title:"producto 1",
        description: "este e sun producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "AAA",
        stock: 25,        
    }
    const prod2 = {
        title:"producto 2",
        description: "este e sun producto pasdasdasdasdasdasdasdsadrueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc1232",
        stock: 25,        
    }
   


    productManager.addProducts(prod1)
    productManager.addProducts(prod2) 

    //productManager.getProductById(1)
    //productManager.addProducts(prod3) 

    //console.log(prod1)
    //console.log(productManager.getProducts())
  /*   productManager.getProductById(2) */

    //productManager.getProducts()
