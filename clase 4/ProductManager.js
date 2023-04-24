const fs = require('fs');

class ProductManager {
    #id = 0;

    constructor(path) {
        this.path = path;
        fs.promises.writeFile(this.path, JSON.stringify([]));

    }

    /**
     * Permite agregar un producto persistente
     * @param {object} product Producto a agregar un producto al array
     */
    async addProduct(product) {
        // async addProduct(tittle, description, price, thumbnail, code, stock) {

        const { tittle, description, price, thumbnail, code, stock } = product;

        // const paramsProduct = Object.values(product);
        if (!tittle || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error: Para agregar el producto debe completar todos los campos.");
            return;
        }
        // if (paramsProduct.includes(undefined)) {
        //     console.log("Error: Para agregar el producto debe completar todos los campos.");
        //     return;
        // }

        try {

            const actualProducts = await this.getProducts();

            const productIndex = actualProducts.findIndex(
                (prod) => prod.code === code
            );

            if (!(productIndex === -1)) {
                console.log('');
                console.log(`Error: El producto con código "${code}" ya existe.`);
                return code;
            }

            actualProducts.push(product);
            product.id = this.#getID();

            await fs.promises.writeFile(
                this.path,
                JSON.stringify(actualProducts)
            );

        } catch (err) {
            console.log('Error: No puedo agregar el producto');
        }
    }

    #getID() {
        this.#id++;
        return this.#id;
    }


    async getProducts() {
        try {
            const actualProducts = await fs.promises.readFile(
                this.path,
                'utf-8'
            );
            return JSON.parse(actualProducts);
        } catch (err) {
            console.log('Error: No puedo darte los productos');
        }
    }

    async getProductById(idProduct) {
        try {
            const actualProducts = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));

            const productIndex = actualProducts.findIndex(
                (prod) => prod.id === idProduct
            );
            if (productIndex === -1) {
                console.log(`Error: El producto con ID "${idProduct}" no existe.`);
                return idProduct;
            }
            const product = actualProducts[productIndex];
            console.log(`El producto es:`);
            return product;
        } catch (err) {
            console.log('Error: No puedo darte el producto buscado por ID.');
        }

    }
    async updateProduct(idProduct, updatedProduct) {
        try {
            const actualProducts = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));
            const productIndex = actualProducts.findIndex(
                (prod) => prod.id === idProduct
            );
            if (productIndex === -1) {
                console.log(`Error: El producto con ID "${idProduct}" no existe.`);
                return idProduct;
            }
            const newProduct = {
                ...actualProducts[productIndex],
                tittle: updatedProduct.tittle,
                description: updatedProduct.description,
                price: updatedProduct.price,
                thumbnail: updatedProduct.thumbnail,
                code: updatedProduct.code,
                stock: updatedProduct.stock,
            };

            actualProducts[productIndex] = newProduct;
            // actualProducts[productIndex] = [...actualProducts[productIndex], updatedProduct];
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(actualProducts)
            );
            return actualProducts;
        } catch (err) {
            console.log('Error: No pude actualizar el producto.');
        }

    }
    async deleteProduct(idProduct) {
        try {
            const actualProducts = await fs.promises.readFile(
                this.path,
                'utf-8'
            );
            const totalProducts = JSON.parse(actualProducts);

            const filteredProducts = totalProducts.filter((prod) => {
                return prod.id != idProduct;
            })
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(filteredProducts)
            );
            // console.log(`La lista de productos actualizada es:`);
            return filteredProducts;
        } catch (err) {
            console.log('Error: No puedo eliminar el producto.');
        }

    }
}

/*------------------------------------Testing----------------------------------------------*/

// // Creación de instancia de ProductManager
// const pm = new ProductManager();
// //Llamado a getProducts con la instancia recién creada
// const prod1 = pm.getProducts()
// console.log(prod1)
// //Llamado al método "addProduct" para agregar diferentes productos
// pm.addProduct("mate", "verde", 1500, "sin imagen", "abc123", 150);
// pm.addProduct("parlante", "azul", 3000, "sin imagen", "ad32", 60);
// pm.addProduct("vaso", "violeta", 800, "sin imagen", "gaf43", 700);
// //Llamado a "getproducts" para visualizar los productos agregados
// const prod2 = pm.getProducts()
// console.log(prod2)
// //intento agregar un producto repetido y llamo a "getproduct" para verificar que no se agregó
// pm.addProduct("mate", "verde", 1500, "sin imagen", "abc123", 150);
// const prod3 = pm.getProducts()
// console.log(prod3)
// //Busco un producto por ID con éxito
// const prodID = pm.getProductById(2);
// //Busco un producto por ID con fallo
// const prodID2 = pm.getProductById(20);

const pm = new ProductManager("./products.json");

const test = async () => {
    // intento
    try {
        // Agregar usuario
        // async addProduct(tittle, description, price, thumbnail, code, stock) {

        await pm.addProduct({
            tittle: "mate",
            description: "verde",
            price: 1500,
            thumbnail: "sin imagen",
            code: "abc123",
            stock: 150,
        });
        await pm.addProduct({
            tittle: "parlante",
            description: "azul",
            price: 2900,
            thumbnail: "sin imagen",
            code: "afg121",
            stock: 36,
        });
        await pm.addProduct({
            tittle: "cinta",
            description: "naranja",
            price: 5260,
            thumbnail: "sin imagen",
            code: "aasdad",
            stock: 4,
        });
        // await pm.addProduct({
        //     tittle: "pala",
        //     description: "roja",
        //     price: 460,
        //     thumbnail: "sin imagen",
        //     code: "aasdad",
        //     stock: 22,
        // });

        // Imprimo los usuarios que administra
        console.log(await pm.getProducts());
        //await pm.deleteProduct(2);
        //console.log(await pm.getProducts());
        // console.log("Ahora busqueda por ID:")
        //  console.log(await pm.getProductById(2));
        console.log(await pm.updateProduct(1, {
            tittle: "mate",
            description: "azul",
            price: 1500,
            thumbnail: "sin imagen",
            code: "abc123",
            stock: 300,
        }));
        console.log(await pm.updateProduct(2, {
            tittle: "termo",
            description: "azul",
            price: 1500,
            thumbnail: "sin imagen",
            code: "abc123",
            stock: 300,
        }));
        // console.log(await pm.getProductById(3));
    } catch (err) {
        // Si hay error imprimo el error en consola
        console.log('Salio mal el Test');
    }

};
test();