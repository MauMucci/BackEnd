import fs from 'fs'
import ProductManager from './productManager.js'


const pm = new ProductManager()


export default class CartManager {      
      
    constructor(){                   
        this.cart = []  
        this.path = "./files/carts.json"     
    }
    
    getCarts = async () => { //tomo los carritos del archivo
        try{
            const data = fs.existsSync(this.path);
            if (data) {
                const info = await fs.promises.readFile(this.path, "utf-8");
                if(info.length > 0) { //verif si el archivo esta vacio
                    const productsToAdd = JSON.parse(info);
                    return productsToAdd;
                } else {
                    console.log("El archivo está vacío");
                    return [];
                }
            }
            else {
                console.log("El archivo no existe");
                return [];
            }
        }catch(error){
            console.log(error)
        }
    }


    addCart = async () => {
        const cart = await this.getCarts();
        const newCart = {products: [],};
        console.log(cart)
        console.log(cart.length)

        if(cart.length === 0){//Si no hay carritos en el arreglo => le asignamos el id 1
            newCart.id = 1;   
            cart.push(newCart)    
            console.log("primer carrito agregado")                                
        }else{             
           newCart.id = cart[cart.length-1].id+1
           cart.push(newCart)           
           console.log("carrito agregado correctamente")
        }
        fs.promises.writeFile(this.path,JSON.stringify(cart,null,"\t"))
        /* console.log(cart)
        console.log(cart.length) */
    }

    addProductToCart = async (idCart, productsToAdd) => {
        const carts = await this.getCarts();
        const cartSelected = carts.find((c) => c.id == idCart);//selecciono el carrito deseado mediante el id
        //Verif si el producto ya estaba en el carrito seleccionado
        const alreadyInCart = cartSelected.products.find((p) => p.product == productsToAdd.product);
        if (!alreadyInCart) {
            cartSelected.products.push(productsToAdd);
            console.log(productsToAdd);
        } else {
            const index = cartSelected.products.findIndex((p) => p.product == productsToAdd.product);
            cartSelected.products[index].quantity += productsToAdd.quantity;
        }
        const newCart = carts.map((c) =>
        c.id == idCart ? { ...c, ...cartSelected } : c);
        fs.promises.writeFile(this.path, JSON.stringify(newCart, null, "\t"));
    };
}                                                                                                                         
 
    let cartManager = new CartManager()
 

    //await cartManager.addCart();


    