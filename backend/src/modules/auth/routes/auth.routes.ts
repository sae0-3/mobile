import { Router } from 'express';
import { createAuthController } from '../bootstrap';

const router = Router();
const controller = createAuthController();

router.post('/register', controller.register);
router.post('/login', controller.login);

export default router;
