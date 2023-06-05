import { Router } from 'express';
import productDAO from '../dao/ProductDAO.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
	const product = await productDAO.getAll();
	console.log(product)
	res.render('index',  {product} );
});

viewsRouter.get('/realtimeproducts', (req, res) => {
	res.render('realTimeProducts');	
});

viewsRouter.get('/chat', (req, res) => {
	// Renderizamos la vista index
	res.render('chat');
});
export default viewsRouter;