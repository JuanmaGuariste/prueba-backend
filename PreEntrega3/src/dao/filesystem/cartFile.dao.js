import fs from 'fs';
const FAIL = 0;

class CartFileDAO {
    #id = 0;
    constructor() {
        this.path = './carts.json';
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        } else {
            const actualCarts = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            if (actualCarts.length > 0) {
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
    async getAllCarts() {
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

    async getCartById(cid) {
        try {
            // Leer el archivo carts.json para obtener todos los carritos.
            //const cartsData = fs.readFileSync('carts.json');
            const carts = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));
            //const carts = JSON.parse(cartsData);

            // Buscar el carrito correspondiente por su ID.
            const cart = carts.find((cart) => cart._id === cid);

            if (!cart) {
                // Si no se encuentra el carrito, puedes manejar el error aquí.
                throw new Error('Carrito no encontrado');
            }

            // Leer el archivo products.json para obtener todos los productos.
            const products = JSON.parse(fs.readFileSync('"../products.json"'));

            // Obtener los productos asociados al carrito y añadirlos al carrito.
            const cartProducts = cart.products.map((product) => {
                const productInfo = products.find((p) => p._id === product.product);

                if (productInfo) {
                    return { ...product, product: productInfo };
                }

                // Si el producto no se encuentra, puedes manejar el error aquí.
                throw new Error('Producto no encontrado');
            });

            // Devolver el carrito con los productos populados.
            return { ...cart, products: cartProducts };
        } catch (err) {
            throw new Error('Error al obtener el carrito');
        }
    }
    async addProductToCart(pid, cid) {
        try {
            // Leer el archivo carts.json para obtener todos los carritos.
            const carts = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));

            // Buscar el carrito correspondiente por su ID.
            const cartIndex = carts.findIndex((cart) => cart._id === cid);

            if (cartIndex === -1) {
                // Si no se encuentra el carrito, puedes manejar el error aquí.
                throw new Error('Carrito no encontrado');
            }

            // Obtener el carrito.
            const cart = carts[cartIndex];

            // Verificar si el producto ya existe en el carrito.
            const productIndex = cart.products.findIndex((obj) => obj.product === pid);

            if (productIndex !== -1) {
                // Si el producto ya existe, actualizar la cantidad.
                cart.products[productIndex].cant += 1;
            } else {
                // Si el producto no existe, agregarlo al carrito.
                cart.products.push({ product: pid, cant: 1 });
            }

            // Actualizar la información del carrito en el arreglo de carritos.
            carts[cartIndex] = cart;

            // Guardar los cambios en el archivo carts.json.
            //await fs.writeFileSync('carts.json', JSON.stringify(carts, null, 2));
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(carts)
            );
            // Devolver el carrito actualizado.
            return cart;
        } catch (err) {
            throw new Error('Error al agregar el producto al carrito');
        }
    }

    async updateCart(cid, cart) {
        try {
            if (!cid) {
                throw new Error('Missing required fields');
            }

            // Leer el archivo carts.json para obtener todos los carritos.
            const carts = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));

            // Buscar el carrito correspondiente por su ID.
            const cartIndex = carts.findIndex((cart) => cart._id === cid);

            if (cartIndex === -1) {
                // Si no se encuentra el carrito, puedes manejar el error aquí.
                throw new Error('Carrito no encontrado');
            }

            // Actualizar la información del carrito con los datos proporcionados.
            carts[cartIndex] = cart;

            // Guardar los cambios en el archivo carts.json.
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(carts)
            );
            // Devolver el carrito actualizado.
            return cart;
        } catch (err) {
            throw new Error('Error al actualizar el carrito');
        }
    }

    async deleteCart(cid) {
        try {
            if (!cid) {
                throw new Error('Missing required fields');
            }

            // Leer el archivo carts.json para obtener todos los carritos.
            const carts = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));

            // Buscar el carrito correspondiente por su ID.
            const cartIndex = carts.findIndex((cart) => cart._id === cid);

            if (cartIndex === -1) {
                // Si no se encuentra el carrito, puedes manejar el error aquí.
                throw new Error('Carrito no encontrado');
            }

            // Eliminar el carrito del arreglo.
            carts.splice(cartIndex, 1);

            // Guardar los cambios en el archivo carts.json.
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(carts)
            );
            // Devolver algún mensaje o indicador de éxito.
            return carts;
        } catch (err) {
            throw new Error('Error al eliminar el carrito');
        }
    }

    async deleteCartContent(cid) {
        try {
            if (!cid) {
                throw new Error('Missing required fields');
            }

            // Leer el archivo carts.json para obtener todos los carritos.
            const carts = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));

            // Buscar el carrito correspondiente por su ID.
            const cartIndex = carts.findIndex((cart) => cart._id === cid);

            if (cartIndex === -1) {
                // Si no se encuentra el carrito, puedes manejar el error aquí.
                throw new Error('Carrito no encontrado');
            }

            // Eliminar el contenido de productos del carrito.
            carts[cartIndex].products = [];

            // Guardar los cambios en el archivo carts.json.
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(carts)
            );
            // Devolver el carrito actualizado.
            return carts[cartIndex];
        } catch (err) {
            throw new Error('Error al eliminar el contenido del carrito');
        }
    }

    async updateProductInCart(pid, cid, newCant) {
        try {
            if (!pid || !cid || newCant === undefined) {
                throw new Error('Missing required fields');
            }

            // Leer el archivo carts.json para obtener todos los carritos.
            const carts = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));

            // Buscar el carrito correspondiente por su ID.
            const cartIndex = carts.findIndex((cart) => cart._id === cid);

            if (cartIndex === -1) {
                // Si no se encuentra el carrito, puedes manejar el error aquí.
                throw new Error('Carrito no encontrado');
            }

            // Buscar el producto dentro del carrito por su ID.
            const productIndex = carts[cartIndex].products.findIndex((product) => product.product === pid);

            if (productIndex === -1) {
                // Si no se encuentra el producto en el carrito, puedes manejar el error aquí.
                throw new Error('Producto no encontrado en el carrito');
            }

            // Actualizar la cantidad del producto.
            carts[cartIndex].products[productIndex].cant = newCant;

            // Guardar los cambios en el archivo carts.json.
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(carts)
            );
            // Devolver el carrito actualizado.
            return carts[cartIndex];
        } catch (err) {
            throw new Error('Error al actualizar el producto en el carrito');
        }
    }

    #getID() {
        this.#id++;
        return this.#id;
    }
}

const cartFileDAO = new CartFileDAO();

export default cartFileDAO