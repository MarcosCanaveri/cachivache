import { productRepository } from "../repositorios/product-repository.js";
import { CustomError } from "../utils/custom-error.js";

class ProductController {
    constructor(repository) {
        this.repository = repository;
    }

    getAll = async (req, res, next) => {
        try {
            const { page, limit, sort, query } = req.query;
            const response = await this.repository.getAll(page, limit, sort, query);
            res.json({
                totalDocs: response.totalDocs,
                status: 'success',
                payload: response.docs,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}&limit=${limit}` : null,
                nextLink: response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}&limit=${limit}` : null
            });
        } catch (error) {
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const response = await this.repository.getById(pid);
            if (!response) throw new CustomError('Product not found', 404);
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    getByName = async (req, res, next) => {
        try {
            const { name } = req.params;
            const response = await this.repository.getByName(name);
            if (!response) throw new CustomError('Product not found', 404);
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const response = await this.repository.create(req.body);
            if (!response) throw new CustomError('Product not found', 404);
            res.json(response);
        } catch (error) {
            next(error);
        }
        };

    update = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const response = await this.repository.update(pid, req.body );
            if (!response) throw new CustomError('Product not found', 404);
            res.json(response);
        } catch (error) {
            next(error);
        }
        };

    delete = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const response = await this.repository.delete(pid);
            if (!response) throw new CustomError('Product not found', 404);
            res.json(response);
        } catch (error) {
            next(error);
        }
};
}
export const productController = new ProductController(productRepository);