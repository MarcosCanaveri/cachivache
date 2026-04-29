import { Router } from "express";
import { cartController } from "../controllers/cart-controller.js";

const router = Router();

router.get("/", cartController.getAll);
router.post("/", cartController.create);
router.get("/:cid", cartController.getById);
router.delete("/remove/:cid", cartController.delete);
router.delete("/:cid", cartController.deleteAllProductsFromCart);
router.put("/:cid", cartController.update);
router.delete("/:cid/products/:pid", cartController.deleteProductFromCart);
router.put("/:cid/products/:pid", cartController.updateProductQuantityInCart);
router.post("/add/:cid/products/:pid", cartController.addProductToCart);

export default router;