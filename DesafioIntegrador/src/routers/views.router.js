import { Router } from 'express';
import productDAO from '../dao/ProductDAO.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
	const product = await productDAO.getAll();
	console.log(product)
	res.render('index',  {product} );
});


viewsRouter.get('/realtimeproducts', async (req, res) => {
	res.render('realTimeProducts');
});

viewsRouter.get('/realtimeproducts', (req, res) => {
	res.render('realTimeProducts');	
});

export default viewsRouter;