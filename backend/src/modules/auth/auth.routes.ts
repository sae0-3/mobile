import { Router } from 'express';
import { authenticateJwt, requireRole } from '../../core/common/middlewares';
import { createAuthController } from './auth.bootstrap';

const router = Router();
const controller = createAuthController();

router.post('/register', controller.register);
router.post('/login', controller.login);

router.post('/google', controller.loginGoogle);

router.use(authenticateJwt);
router.post('/register/dealer', requireRole(['admin']), controller.registerDealer);
router.post('/register/admin', requireRole(['admin']), controller.registerAdmin);

export default router;
