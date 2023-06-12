import { Router } from 'express';
import productDAO from '../dao/ProductDAO.js';

const viewsRouter = Router();

// viewsRouter.get('/', async (req, res) => {
// 	const product = await productDAO.getAllProducts();
// 	res.render('index', { product });
// });

viewsRouter.get('/products', async (req, res) => {
    const { limit, page, category, status, sort } = req.query;

    try {
        let product = await productDAO.getAllProducts(limit, page, category, status, sort);
		// product.limit = limit;
		// product.page = page;
		// product.category = category;
		// product.status = status ;
		// product.sort = sort ;
		// console.log(product)
        res.render('index',  product );
        //res.status(200).render('index', product);
    }
    catch (err) {
        res.status(500).send({ status: "error", error: err })
    }
});


viewsRouter.get('/realtimeproducts', (req, res) => {
	res.render('realTimeProducts');
});

viewsRouter.get('/chat', (req, res) => {
	res.render('chat');
});
export default viewsRouter;