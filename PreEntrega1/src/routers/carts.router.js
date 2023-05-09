import { Router } from 'express';
import CartManager from '../models/CartManager.js';
import ProductManager from '../models/ProductManager.js';


const cartManager = new CartManager("./carts.json");
const productManager = new ProductManager("./products.json");


const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
    
    try {
        await cartManager.addCart();
        res.send({ status: "succes", code: "Se agregó con éxito" })
    } catch (err) {
        res.status(400).send({ status: "error", error: "Ocurrió un error" })
    }
})

// cartsRouter.get("/", async (req, res) => {
//     try {
//         let limit = req.query.limit;
//         let allCarts = await cartManager.getCarts();
//         if (!limit) {
//             res.send(allCarts);
//         } else {
//             const totalCarts = allCarts.slice(0, limit)
//             res.send({ status: "succes", payload: totalCarts });
//         }
//     } catch (err) {
//         res.status(400).send({ status: "error", error: "Ocurrió un error" })
//     }
// })

cartsRouter.get("/:cid", async (req, res) => {
    try {
        let id = Number(req.params.cid)
        let cart = await cartManager.getCartById(id);
        if (!cart) {
            res.send(`<p style="color: red; font-size: 30px; margin: 10px;">ID de carrito "${id}" inexistente</p>`);
        } else {
            res.send({ status: "succes", payload: cart });            
        }
    } catch (err) {
        res.status(400).send({ status: "error", error: "Ocurrió un error" })
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        let cid = Number(req.params.cid)
        let pid = Number(req.params.pid)        
        let product = await productManager.getProductById(pid);
        if (!product) {
            res.send(`<p style="color: red; font-size: 30px; margin: 10px;"> ID producto "${pid}" inexistente</p>`);
        } else {
            await cartManager.addProductToCart(pid, cid);           
            res.send({ status: "succes", payload: product }); 
        }       


    } catch (err) {
        res.status(400).send({ status: "error", error: "Ocurrió un error" })
    }
});

export { cartsRouter };

