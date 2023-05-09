import { Router } from 'express';
import ProductManager from '../models/ProductManager.js';

const productManager = new ProductManager("./products.json");


const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    try {
        let limit = req.query.limit;
        let allProducts = await productManager.getProducts();
        if (!limit) {
            res.send(allProducts);
        } else {
            const totalProducts = allProducts.slice(0, limit)
            res.send({ status: "succes", payload: totalProducts });
        }
    } catch (err) {
        res.status(400).send({ status: "error", error: "Ocurrió un error" })
    }
})

productsRouter.get("/:pid", async (req, res) => {
    try {
        let id = Number(req.params.pid)
        let product = await productManager.getProductById(id);
        if (!product) {
            res.send(`<p style="color: red; font-size: 30px; margin: 10px;"> ${error.idError}</p>`);
        } else {
            res.send({ status: "succes", payload: product });            
        }
    } catch (err) {
        res.status(400).send({ status: "error", error: "Ocurrió un error" })
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        await productManager.addProduct(req.body);
        res.status(201).send(req.body);
    } catch (err) {
        res.status(400).send({ status: "error", error: "Ocurrió un error" })
    }

});

productsRouter.put('/:pid', async (req, res) => { 
    try {
        let id = Number(req.params.pid);        
        await productManager.updateProduct(id, req.body);
        res.status(201).send(req.body);
    } catch (err) {
        res.status(400).send({ status: "error", error: "Ocurrió un error" })
    }
});

productsRouter.delete('/:pid', async (req, res) => { 
    try {
        let id = Number(req.params.pid);        
        await productManager.deleteProduct(id);
        res.status(201).send(id);
    } catch (err) {
        res.status(400).send({ status: "error", error: "Ocurrió un error" })
    }
});

export { productsRouter };