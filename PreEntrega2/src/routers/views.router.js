import { Router } from 'express';
import productDAO from '../dao/ProductDAO.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
	const {limit, page, category, title } = req.query;
	const product = await productDAO.getAllProducts(limit, page, category, title);
	product.category = category;
	product.title = title;
	res.render('index', product);
});

viewsRouter.get('/realtimeproducts', (req, res) => {
	res.render('realTimeProducts');
});

viewsRouter.get('/chat', (req, res) => {
	res.render('chat');
});
export default viewsRouter;