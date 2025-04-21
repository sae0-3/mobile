import { Router } from 'express';
import { authenticateJwt, requireRole } from '../../core/common/middlewares';
import { createCatalogController } from './catalog.bootstrap';

const router = Router();
const productRouter = Router();
const categoryRouter = Router();
const {
  categoryController,
  productController,
  productCategoryController
} = createCatalogController();

router.use(authenticateJwt);

productRouter.get('/', productController.getAll);
productRouter.post('/', requireRole(['admin']), productController.insert);
productRouter.get('/:id', productController.getById);
productRouter.put('/:id', requireRole(['admin']), productController.updateById);
productRouter.delete('/:id', requireRole(['admin']), productController.deleteById);
productRouter.get('/:id/categories', productController.getCategoriesById);

productRouter.post('/:productId/categories/:categoryId', productCategoryController.add);
productRouter.delete('/:productId/categories/:categoryId', productCategoryController.remove);

categoryRouter.get('/', categoryController.getAll);
categoryRouter.post('/', requireRole(['admin']), categoryController.insert);
categoryRouter.get('/:id', categoryController.getById);
categoryRouter.put('/:id', requireRole(['admin']), categoryController.updateById);
categoryRouter.delete('/:id', requireRole(['admin']), categoryController.deleteById);
categoryRouter.get('/:id/products', categoryController.getProductCategories);

router.use('/products', productRouter);
router.use('/categories', categoryRouter);

export default router;
