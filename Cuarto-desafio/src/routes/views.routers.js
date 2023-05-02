import { Router } from "express";
import ProductManager from "../Managers/productManager.js";

const pm = new ProductManager();
const products = pm.getProducts();

const viewRouter = Router();


viewRouter.get("/", async (req, res) => {
  const allProducts = await products;
  res.render("home", { allProducts, css: "products" });
});

viewRouter.get("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts", { css: "realTimeProducts" });
});


export default viewRouter;