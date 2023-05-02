import { Router } from "express";
import CartManager from "../Managers/cartManager.js";
import ProductManager from "../Managers/productManager.js";

const router = Router();

export default router;

const pm = new ProductManager();
const cm = new CartManager();

const products = pm.getProducts();
const carts = cm.getCarts();

router.get(`/:cid`, async (req, res) => {
    try {
      const idCart = req.params.cid;
      const allCarts = await carts;
      const selected = allCarts.find((c) => c.id == idCart);
      res.send(selected);
    } catch (error) {
        console.log(error);
        return res.status(404).send({ status: "error", error: "not found" });
    }
  });

router.post(`/`, async (req, res) => {
    try {
        cm.addCart();
        res.send("cart created");
    } catch (error) {
        console.log(error);
        return res.status(404).send({ status: "error", error: "cart not created" });
    }
});

router.post(`/:cId/product/:pId`, async (req, res) => {
    const allCarts = await carts;
    const idCart = req.params.cId;
    const CartExist = allCarts.find((c) => c.id == idCart);
    if (!CartExist) {
        return res.status(404).send({ status: "error", error: "cart not found" });
    }
    const idProduct = req.params.pId;
    let quantity = req.body.quantity;
    quantity ? (quantity = quantity) : (quantity = 1);
    const allProducts = await products;
    const productSelected = allProducts.find((p) => p.id == idProduct);
    productSelected
    ? res.send({ status: "succes ", code: "Product and Cart found" })
    : res.send("product not found");
    const productSelectedId = productSelected.id;
    const cartToSend = {
        product: productSelectedId,
        quantity: quantity,
    };
    cm.addProductToCart(idCart, cartToSend);
});

