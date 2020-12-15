import { Router } from "express";
import * as productsController from "../controllers/products.Controllers";
import  {authJWT}  from "../middlewares";
const router = Router();

router.get('/', [authJWT.verifyToken], productsController.getProducts);
router.get('/:productId', [authJWT.verifyToken], productsController.getProductById);
router.post('/', [authJWT.verifyToken, authJWT.isAdmin], productsController.createProduct);
router.put('/:productId', [authJWT.verifyToken, authJWT.isModerator], productsController.updateProductById);
router.delete('/:productId', [authJWT.verifyToken, authJWT.isAdmin], productsController.deleteProductById);

export default router;