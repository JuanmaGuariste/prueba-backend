import express from 'express';
import handlebars from 'express-handlebars';
import { productsRouter } from './routers/products.router.js';
import { cartsRouter } from './routers/carts.router.js';

const app = express();

app.engine('handlebars', handlebars.engine());

app.set('view engine', 'handlebars');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
	console.log('Server levantado en puerto 8080');
});