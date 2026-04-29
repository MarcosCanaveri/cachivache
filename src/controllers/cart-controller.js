import { cartRepository } from "../repositorios/cart-repository.js";
import { CustomError } from "../utils/custom-error.js";

class CartController {
    constructor(repository) {
        this.repository = repository;
    }

    getAll = async (_req, res, next) => {
        try {
            const response = await this.repository.getAll();
            res.json({ status: 'success', payload: response });
        } catch (error) {
            next(error);
        }
    };


    getById = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const response = await this.repository.getById(cid);
            if (!response) throw new CustomError('Cart not found', 404);
            res.json({ status: 'success', payload: response });
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const response = await this.repository.create(req.body);
            if (!response) throw new CustomError('Cart not found', 404);
            res.json({ status: 'success', payload: response });
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const response = await this.repository.update(cid, req.body);
            if (!response) throw new CustomError('Cart not found', 404);
            res.json({ status: 'success', payload: response });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const response = await this.repository.delete(cid);
            if (!response) throw new CustomError('Cart not found', 404);
            res.json({ status: 'success', payload: response });
        } catch (error) {
            next(error);
        }
    };

    addProductToCart = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const response = await this.repository.addProductToCart(cid, pid);
            if (!response) throw new CustomError('Cart not found', 404);
            res.json({ status: 'success', payload: response });
        } catch (error) {
            next(error);
        }
    };

    deleteProductFromCart = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const response = await this.repository.deleteProductFromCart(cid, pid);
            if (!response) throw new CustomError('Cart not found', 404);
            res.json({ status: 'success', payload: response });
        } catch (error) {
            next(error);
        }
    };

    deleteAllProductsFromCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const response = await this.repository.deleteAllProductsFromCart(cid);
            if (!response) throw new CustomError('Cart not found', 404);
            res.json({ status: 'success', payload: response });
        } catch (error) {
            next(error);
        }
    };

    updateProductQuantityInCart = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const response = await this.repository.updateProductQuantityInCart(cid, pid, quantity);
            if (!response) throw new CustomError('Cart not found', 404);
            res.json({ status: 'success', payload: response });
        } catch (error) {
            next(error);
        }
    };

    updateCartProducts = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            const response = await this.repository.updateCartProducts(cid, products);
            if (!response) throw new CustomError('Cart not found', 404);
            res.json({ status: 'success', payload: response });
    } catch (error) {            
        next(error);
        }
    };


};

export const cartController = new CartController(cartRepository);