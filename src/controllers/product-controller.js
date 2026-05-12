import { productRepository } from "../repositorios/product-repository.js";
import { CustomError } from "../utils/custom-error.js";

class ProductController {
    constructor(repository) {
        this.repository = repository;
    }

getAll = async (req, res, next) => {
    try {
        
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const { sort, query } = req.query;

       
        const response = await this.repository.getAll(page, limit, sort, query);
       
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
        const createLink = (targetPage) => {
            let link = `${baseUrl}?page=${targetPage}&limit=${limit}`;
            if (sort) link += `&sort=${sort}`;
            if (query) link += `&query=${query}`;
            return link;
        };

        
        res.json({
            status: 'success', 
            payload: response.docs, 
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: response.hasPrevPage ? createLink(response.prevPage) : null,
            nextLink: response.hasNextPage ? createLink(response.nextPage) : null
        });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: null });
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