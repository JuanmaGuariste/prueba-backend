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
	// console.log(req.body);
	//const product = await productController.getProducts();
	res.render('realTimeProducts');
});
viewsRouter.post('/realtimeproducts', async (req, res) => {
	console.log(req.body);
				// try {
				// 	let prodComplete = await productController.addProduct(req.body);
				// 	console.log(prodComplete)
				// 	if (prodComplete) {
				// 		res.send({ status: "succes", payload: req.body });
				// 	} else {
				// 		res.status(400).send({ status: "error", error: "Es necesario completar todos los campos del producto" })
				// 	}
				// } catch (err) {
				// 	res.status(400).send({ status: "error", error: "Ocurrió un error" })
				// }
	//const product = await productController.getProducts();
	//res.render('realTimeProducts');
});

// userRouter.post('/', (req, res) => {
// 	userController.addUser(req.body);
// 	res.status(201).send();
// });

// viewsRouter.get('/register', (req, res) => {
// 	res.render('register');
// });

export default viewsRouter;