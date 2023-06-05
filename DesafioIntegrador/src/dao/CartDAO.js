import cartModel from "./models/carts.model.js";

class CartDAO {
    constructor() {
        this.model = cartModel;
    }

    async getAll() {
        return await this.model.find();
    }

    async getCartById(cid) {
        return await this.model.findOne({ _id: cid }).populate('products.product');
    }
    // async addProductToCart(pid, cid) {
    //     let cart = await this.model.findOne({ _id: cid });
    //     const productIds = cart.products.map(obj => obj.product.toString());
    //     const existProduct = productIds.some((item) => item === pid);
    //     if (existProduct) {
    //         cart.products.forEach(elem => {
    //             if (elem.product.toString() === pid) {
    //                 elem.cant += 1;
    //             }
    //         })            
    //         return await this.model.updateOne({ _id: cid }, cart);
    //     } else {
    //         await cart.products.push({ product: pid, cant: 1 });
    //         return await this.model.updateOne({ _id: cid }, cart);
    //     }
    // }
    async addProductToCart(pid, cid) {
        let cart = await this.model.findOne({ _id: cid });

        const productIndex = cart.products.findIndex(obj => obj.product.toString() === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].cant += 1;
        } else {
            cart.products.push({ product: pid, cant: 1 });
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
}

const cartDAO = new CartDAO();

export default cartDAO;