import { Router } from 'express';
import * as productController from '../controllers/products.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();

// Public routes
router.get('/', productController.getProducts);
router.get('/:slug', productController.getBySlug);
router.get('/:slug/related', productController.getRelated);

// Admin routes
router.post('/', authenticate, authorize('ADMIN'), productController.createProduct);
router.put('/:id', authenticate, authorize('ADMIN'), productController.updateProduct);
router.delete('/:id', authenticate, authorize('ADMIN'), productController.deleteProduct);

export default router;
