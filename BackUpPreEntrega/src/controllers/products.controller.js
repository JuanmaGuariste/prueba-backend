import ProductsService from '../services/products.service.js';
//import productMongoDAO from '../dao/mongo/productMongo.dao.js';
import {Products} from '../dao/factory.js'
let products = Products
class ProductsController {
	constructor() {
		this.service = new ProductsService(products);
	}

	getProducts(limit, page, category, status, sort) {
		return this.service.getProducts(limit, page, category, status, sort);
	}
	getAllProducts() {
		return this.service.getAllProducts();
	}

	addProduct(product) {
		return this.service.addProduct(product);
	}

	getProductById(id) {
		return this.service.getProductById(id);
	}
	deleteProduct(id) {
		return this.service.deleteProduct(id);
	}

	updateProduct(id, product) {
		return this.service.updateProduct(id, product);
	}
}

const productsController = new ProductsController();

export default productsController;