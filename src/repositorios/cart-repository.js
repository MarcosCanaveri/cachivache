import { CartModel } from "../models/cart-model.js";
import { productRepository } from "./product-repository.js";

class CartRepository {
    constructor(model) {
        this.model = model;
    }

    getAll = async () => {
        try {
            return await this.model.find();
        } catch (error) {
            throw new Error(error);
        }
    };

    getById = async (cid) => {
        try {
            return await this.model.findById(cid).populate('products.product', { _id: 0 });
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

    update = async (cid, body) => {
        try {
            return await this.model.findByIdAndUpdate(cid, body, { returnDocument: true });
        } catch (error) {
            throw new Error(error);
        }
    };

    delete = async (cid) => {
        try {
            return await this.model.findByIdAndDelete(cid);
        } catch (error) {
            throw new Error(error);
        }
    };

    addProductToCart = async (cid, pid) => {
        try {
            const product = await productRepository.getById(pid);
            if (!product) {
                throw new Error("Product not found");
            }
            return await this.model.findByIdAndUpdate(
                cid, 
                { $push: { products: {product: pid, quantity: 1 } } }, 
                { returnDocument: true });
        } catch (error) {
            throw new Error(error);
        }
};

    deleteProductFromCart = async (cid, pid) => {
        try {
            const product = await productRepository.getById(pid);
            if (!product) {
                throw new Error("Product not found");
            }
            return await this.model.findByIdAndUpdate(
                cid,
                { $pull: { products: {product: pid} } },
                { returnDocument: true }
            );
        } catch (error) {
            throw new Error(error);
        }
    };

    deleteAllProductsFromCart = async (cid) => {
        try {
            return await this.model.findByIdAndUpdate(
                cid,
                { $set: { products: [] } },
                { returnDocument: true }
            );
        } catch (error) {
            throw new Error(error);
        }
    };

    updateProductQuantityInCart = async (cid, pid, quantity) => {
        try {
            const product = await productRepository.getById(pid);
            if (!product) {
                throw new Error("Product not found");
            }
            return await this.model.findByIdAndUpdate(
                cid,
                { $set: { "products.$[elem].quantity": quantity } },
                { arrayFilters: [{ "elem.product": pid }], returnDocument: true }
            );
        } catch (error) {
            throw new Error(error);
        }
    };

    updateCartProducts = async (cid, products) => {
        try {
            for (const item of products) {
                const product = await productRepository.getById(item.product);
                if (!product) {
                    throw new Error("Product not found");
                }
            }
            return await this.model.findByIdAndUpdate(
                cid,
                { $set: { products: products } },
                { returnDocument: true }
            );
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const cartRepository = new CartRepository(CartModel);