import express from 'express';

import ProductManager from './ProductManager.js';

const app = express();

const productManager = new ProductManager("./products.json");

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
	try {
        let limit = req.query.limit;
		let allProducts = await productManager.getProducts();
        if (!limit){
            res.send(allProducts);
        } else {
            const totalProducts = allProducts.slice(0, limit)            
            res.send(totalProducts);
        }
	} catch (err) {
		res.send(err);
	}
});

app.get('/products/:pid', async (req, res) => {
	try {
        let id = Number(req.params.pid)
		let product = await productManager.getProductById(id);
       
        if (!product){
            // res.send(allProducts);
        } else {
            res.send(product);
        }
	} catch (err) {
		res.send(err);
	}
});

app.listen(8080, () => {
    console.log("Estoy escuchando el 8080")
})