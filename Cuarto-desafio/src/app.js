import express from "express";
import ProductManager from './Managers/productManager.js'
import productsRouter from "./routes/products.router.js"; 
import cartsRouter from "./routes/carts.router.js";
import viewRouter from "./routes/views.routers.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from 'socket.io'



const app = express();

const pm = new ProductManager();


const server = app.listen(8081,()=>console.log(`Listening on PORT 8081`))
const io = new Server(server);


app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`)); //
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)
app.use("/",viewRouter)


  io.on('connection', socket => {
    console.log("Nuevo socket conectado");
  });