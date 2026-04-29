import { ProductModel } from "../models/product-model.js";

class ProductRepository {
    constructor(model) {
        this.model = model;
    }

    getAll = async (page = 1, limit = 10, sort, query) => {
        try {
            let filter = {};
            if (query) {
                if (query === "true" || query === "false") {
                    filter = { status: query === "true" };
                } else {
                    filter = { category: query };
                }
            }
            
            const options = { limit, page };
            if (sort) options.sort = {price: sort === 'asc' ? 1 : -1};
            return await this.model.paginate(filter, options);
        } catch (error) {
            throw new Error(error);
        }
    };

    getById = async (pid) => {
        try {
            return await this.model.findById(pid);
        } catch (error) {
            throw new Error(error);
        }
    };

    getByName = async (name) => {
        try {
            return await this.model.findOne({ name: name });
        } catch (error) {
            throw new Error(error);
        }
    };


    create = async (body) => {
        try {
            return await this.model.create(body);
        } catch (error) {
            throw new Error(error);
        }
    };

    update = async (pid, body) => {
        try {
            return await this.model.findByIdAndUpdate(pid, body, { returnDocument: true });
        } catch (error) {
            throw new Error(error);
        }
    };

    delete = async (pid) => {
        try {
            return await this.model.findByIdAndDelete(pid);
        } catch (error) {
            throw new Error(error);
        }
    };
}

export const productRepository = new ProductRepository(ProductModel);