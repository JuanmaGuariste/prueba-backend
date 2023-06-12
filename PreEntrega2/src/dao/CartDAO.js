import cartModel from "./models/carts.model.js";

class CartDAO {
    constructor() {
        this.model = cartModel;
    }

    async getAllCarts() {
        return await this.model.find();
    }

    async getCartById(cid) {
        console.log("hola")
        return await this.model.findOne({ _id: cid }).populate('products.product');
    }

    async addProductToCart(pid, cid) {
        let cart = await this.model.findOne({ _id: cid });
        const productIndex = cart.products.findIndex(obj => obj.product.toString() === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].cant += 1;
        } else {
            console.log(cart.products)
            cart.products.push({ product: pid, cant: 1 });
            console.log(cart.products)
        }
        return await this.model.updateOne({ _id: cid }, cart);
    }

    async addCart(cart) {
        return await this.model.create(cart);
    }

    async updateCart(cid, cart) {
        if (!cid) {
            throw new Error('Missing required fields');
        }
        return await this.model.updateOne({ _id: cid }, cart);
    }

    async deleteCart(cid) {
        if (!cid) {
            throw new Error('Missing required fields');
        }
        return await this.model.deleteOne({ _id: cid });
    }

    async deleteProductFromCart(pid, cid) {
        return await this.model.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: { product: pid } } },
            { new: true }
        );        
    }
}

const cartDAO = new CartDAO();

export default cartDAO;