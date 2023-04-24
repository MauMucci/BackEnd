import fs from 'fs'

export default class CartManager {      
      
    constructor(){                   
        this.cart = []  
        this.path = "./files/carts.json"     
    }
    
    addCart = async (product) => {

        if(this.cart.length === 0){//Si no hay productos en el arreglo => le asignamos el id 1
            cart.id = 1;            
            console.log("Primer carrito agregado correctamente " + this.cart.code)                         
        }else{             
            this.cart.forEach(c => {
                if(c.code === cart.code){
                    console.log("Codigo ya utilizado: -" +cart.code+ "- Carro no ingresado ")
                    return
                }
                else{
                                    
                    const lastCart = this.cart [this.cart.length-1] 
                    cart.id = lastCart.id + 1;                                                                                                               
                }              
            })
        }  
        this.cart.push(product) 
        console.log("Producto agregado correctamente: " + cart.title)     
        fs.promises.writeFile(this.path,JSON.stringify(this.cart,null,'\t')) //Agrega al archivo json
            }                         
        }       
/* 
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

        catch (err){
            console.log(err)
        }        
    }

    deleteById = async (id) => {
        //Para este metodo tuve que trabajar con el indice porque con filter no funcionaba
        try{
            const arr = JSON.parse(await fs.promises.readFile(this.path,'utf-8'));            
            let index = arr.findIndex((e) => e.id ===id)
            
            if(index !==-1){ //verif que el index exista
                arr.splice(index,1)
                await fs.promises.writeFile(this.path,JSON.stringify(arr,null,'\t'))
                console.log(arr)
            }
        }catch (err) {
            console.log(err)
        }

      }

    async deleteAll(){
        try{
            this.products = [];
            //await fs.promises.writeFile(this.path,JSON.stringify(this.products))
            await fs.promises.writeFile(this.path,this.products,null,'\t')
        }
        catch (err){
            console.log(err)
        }
      }   

    updateProduct = async (id,nuevoElemento) => {
        try {
            const arr = JSON.parse(await fs.promises.readFile(this.path,'utf-8'));            
            let index = arr.findIndex((e) => e.id ===id)

            if(index !==-1){ //verif que el index exista
                arr.splice(index,1,nuevoElemento) //indice del elemento que deseamos reemplazar, cantidad de elementos,nuevo elemeento a agregar
                await fs.promises.writeFile(this.path,JSON.stringify(arr,null,'\t'))
                console.log(arr)                                                                        
            }
        }                          
        catch (error) {
            console.log(error)            
        }
    }
     */

    let cartManager = new CartManager()
    cartManager.addCart()