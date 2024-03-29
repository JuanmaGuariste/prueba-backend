import ProductsService from '../services/products.service.js';
import productDAO from '../dao/mongo/ProductDAO.js';

class ProductsController {
	constructor() {
		this.service = new ProductsService(productDAO);
	}

	async getProducts(limit, page, category, status, sort) {
		return await this.service.getProducts(limit, page, category, status, sort);
	}
	async getAllProducts() {
		return await this.service.getAllProducts();
	}

	async addProduct(product) {
		return await this.service.addProduct(product);
	}

	async getProductById(id) {
		return await this.service.getProductById(id);
	}
	async deleteProduct(id, user) {
		let prod = await this.service.getProductById(id);	
		if (user.rol == "admin" ){
			return await this.service.deleteProduct(id);
		} else if ((user.rol == "premium") && (`${prod.owner}` === user._id)) {
			return await this.service.deleteProduct(id);
		} else {
			return false
		}		
	}

	async updateProduct(id, product) {
		return await this.service.updateProduct(id, product);
	}
}

const productsController = new ProductsController();

export default productsController;