import { Router } from 'express';
import { LoginUser, RegisterUser } from '../controllers/auth.controllers';

const router = Router();

router.route('/sign-up').post(RegisterUser);
router.route('/sign-in').post(LoginUser);

export { router as AuthRoutes };
