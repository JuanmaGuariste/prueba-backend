import fs from 'fs';
const FAIL = 0;

export default class CartManager {
    #id = 0;

    constructor(path) {
        this.path = path;
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        } else {
            const actualCarts = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            if (actualCarts.length > 0) {
                // Se obtiene el último ID y se asigna a this.#id
                const lastCartId = Math.max(...actualCarts.map(prod => prod.id));
                this.#id = lastCartId;
            }
        }
    }

    async addCart() {
        try {
            let cart = { "products": [] }
            const actualCarts = await this.getCarts();
            actualCarts.push(cart)
            cart.id = this.#getID();
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(actualCarts)
            );
        } catch (err) {
            console.log('Error: No se pudo agregar el carrito');
        }
    }
    async getCarts() {
        try {
            const actualCarts = await fs.promises.readFile(
                this.path,
                'utf-8'
            );
            return JSON.parse(actualCarts);
        } catch (err) {
            console.log('Error: No es posible obtener los carritos');
        }
    }
    async getCartById(idCart) {
        try {
            const actualCarts = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));

            const cartIndex = actualCarts.findIndex(
                (item) => item.id === idCart
            );

            if (cartIndex === -1) {
                console.log(`Error: El producto con ID "${idCart}" no existe.`);
                return FAIL;
            }

            let cart = actualCarts[cartIndex]

            return cart;

        } catch (err) {
            console.log('Error: No es posible obtener el producto buscado por ID.');
        }
    }

    async addProductToCart(idProduct, idCart) {
        try {
            const actualCarts = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));

            const cartIndex = actualCarts.findIndex(
                (item) => item.id === idCart
            );

            if (cartIndex === -1) {
                console.log(`Error: El producto con ID "${idCart}" no existe.`);
                return FAIL;
            }

            const cart = actualCarts[cartIndex];
            console.log(idProduct)
            console.log(cart.products)

            const prodIndex = cart.products.findIndex(
                (item) => item.product == idProduct
               
            );
            if (prodIndex === -1) {
                const newProduct = { "product": idProduct, "quantity": 1 }
                cart.products.push(newProduct);
                return cart;
            }

            // newCart = cart[prodIndex];
            // let existProduct = 0;

            // cart.forEach((item) => {
            //     if (item.product === idProduct) {
            //         existProduct = 1;
            //     }
            // });

            // if (existProduct) {
            //     cart.forEach((item) => {
            //         if (item.product === idProduct) {
            //             quantity += 1;
            //         }
            //     });
            //     existProduct = 0;

            // } else {
            //     const newProduct = {"product": idProduct, "quantity": 1}
            //     cart.products.push(newProduct);   
            //     console.log(cart)  
            // }


            actualCarts[cartIndex] = cart;

            await fs.promises.writeFile(
                this.path,
                JSON.stringify(actualCarts)
            );
            return cart;

        } catch (err) {
            console.log('Error: No es posible obtener el producto buscado por ID.');
        }
    }

    #getID() {
        this.#id++;
        return this.#id;
    }
}