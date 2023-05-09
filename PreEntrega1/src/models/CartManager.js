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
            // const actualProducts = await this.getProducts();
            // const productIndex = actualProducts.findIndex(
            //     (prod) => prod.code === code
            // );

            // if (!(productIndex === -1)) {
            //     console.log('');
            //     console.log(`Error: El producto con código "${code}" ya existe.`);
            //     return FAIL;
            // }

            actualProducts.push(product);
            product.id = this.#getID();

            await fs.promises.writeFile(
                this.path,
                JSON.stringify(actualProducts)
            );

        } catch (err) {
            console.log('Error: No se pudo agregar el producto');
        }
    }

    #getID() {
        this.#id++;
        return this.#id;
    }
}