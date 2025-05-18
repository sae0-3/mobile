import { Router } from 'express';
import { authenticateJwt, requireRole } from '../../core/common/middlewares';
import { createLocationController } from './locations.bootstrap';

const router = Router();
const controller = createLocationController();

router.use(authenticateJwt, requireRole(['client']));

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

export default router;
