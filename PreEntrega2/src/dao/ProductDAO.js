import productModel from "./models/products.model.js";

class ProductDAO {
    constructor() {
        this.model = productModel;
    }

    async getAllProducts(limit = 10, page = 1, category = false, status = false, sort) {
        let filter = {}

        if (category) {
            filter = { ...filter, category }
        }
        if (status) {
            filter = { ...filter, status }
        }

        // this.model.paginate(filter, { lean: true, page, limit, status });


        this.model.paginate(filter, { lean: true, page, limit, status });

        //const result = await studentsModel.aggregate([
        // 	{ $group: { _id: '$grade', students: { $push: '$$ROOT' } } },
        // 	{ $sort: { _id: -1 } },
        // ]);

        if (sort === "asc") {
            const prod = await this.model.aggregate(
                [
                    { $match: { $text: { $search: "operating" } } },
                    { $sort: { score: { $meta: "textScore" }, posts: -1 } }
                  ]
            );
            return prod;
        } else if (sort === "desc") {
            return this.model.aggregate([
                { $sort: { price: -1 } },
            ]);
        } else {
            return this.model.paginate(filter, { lean: true, page, limit, status });
        }
    }

    async getProductById(pid) {
        return await this.model.findOne({ _id: pid });
    }

    async addProduct(product) {
        return await this.model.create(product);
    }

    async updateProduct(pid, product) {
        if (!pid) {
            throw new Error('Missing required fields');
        }
        return await this.model.updateOne({ _id: pid }, product);
    }

    async deleteProduct(pid) {
        if (!pid) {
            throw new Error('Missing required fields');
        }
        return await this.model.deleteOne({ _id: pid });
    }
}

const productDAO = new ProductDAO();

export default productDAO;