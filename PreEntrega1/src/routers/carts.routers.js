import { Router } from 'express';


const carts = [];

const cartsRouter = Router();

cartsRouter.get("/", (req, res) => {
    res.send(carts)
})
