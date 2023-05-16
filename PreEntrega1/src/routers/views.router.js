import { Router } from 'express';
import CartController from '../controllers/CartController.js';
import ProductController from '../controllers/ProductController.js';


const viewsRouter = Router();
const cartController = new CartController("./carts.json");
const productController = new ProductController("./products.json");

viewsRouter.get('/', async (req, res) => {
	const product = await productController.getProducts();
	res.render('index', { product });
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
	// const product = await productController.getProducts();
	// res.render('index', { product });
});

// viewsRouter.get('/register', (req, res) => {
// 	res.render('register');
// });

export default viewsRouter;