import express from 'express';
import { productsRouter } from './routers/products.router.js';
import { cartsRouter } from './routers/carts.router.js';

const app = express();

// const error = {        
//     idError: "Error: el ID ingresado no existe."
// }

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
	console.log('Server levantado en puerto 8080');
});