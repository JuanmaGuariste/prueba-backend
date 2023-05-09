import { Router } from 'express';
import CartManager from '../models/CartManager.js';

const cartManager = new CartManager("./carts.json");

const carts = [];

const cartsRouter = Router();

cartsRouter.post("/", (req, res) => {
    res.send(carts)
})

export { cartsRouter };

