import TicketsService from '../services/tickets.service.js';
import ticketDAO from '../dao/mongo/TicketDAO.js';
import cartsController from './carts.controller.js';
import productsController from './products.controller.js';

class TicketsController {
	constructor() {
		this.service = new TicketsService(ticketDAO);
	}

	async getTickets() {
		return await this.service.getTickets();
	}

	// async addTicket(cid) {		
	//     let cart = await cartsController.getCartById(cid);
	// 	let totalProducts = [];
	//console.log(cart.products)
	//cart.products.forEach(el => {			
	// console.log(el.product)
	// console.log(el.cant)
	//let prod = await productsController.getProductById(el.product.id);

	// console.log(el.product);
	// if (el.product.stock)	

	// let cart = await cartsController.getCartById(cid);
	// let totalProducts = [];
	// let prod = {};
	// cart.products.forEach(el => {		
	// 	prod.id = el.product._id;
	// 	prod.cant = el.cant;
	// 	totalProducts.push(prod);
	// 	console.log(totalProducts)						
	// });
	// let prr = await productsController.getProductById(totalProducts[1].id);
	// console.log(prr)
	// return cart
	// 	});
	//     return cart
	// }   

	async addTicket(cid, user) {
		let productsOk = [];
		let productsNotOk = [];
		let prodAux = {};

		let cart = await cartsController.getCartById(cid);
		for (const el of cart.products) {
			let prod = await productsController.getProductById(el.product._id);		
			if (prod.stock - el.cant >= 0) {
				prod.stock -= el.cant;
				await productsController.updateProduct(prod._id, prod);
				let prodAuxOk = {
					title: prod.title,
					cant: el.cant,
					price: prod.price
				};
				productsOk.push(prodAuxOk);			
			} else {
				let prodAuxNotOk = {
					title: prod.title,
					cant: el.cant,
					stock: prod.stock,
					price: prod.price
				};
				productsNotOk.push(prodAuxNotOk);	
			}			
		}
		let totalPrice = 0;
		productsOk.forEach(el => {
			totalPrice += el.cant * el.price
		})		

		let ticket = {
			code: "1",
			amount: totalPrice,
			purchaser: user.email,
			
		}
		console.log("ticket",ticket)
		//await this.service.addTicket(cart._id, productsOk);
		console.log("Se pudo comprar", productsOk)
		console.log("No se pudo comprar", productsNotOk)
		return cart
	}
}

const ticketsController = new TicketsController();

export default ticketsController;