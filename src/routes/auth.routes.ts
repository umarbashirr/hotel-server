import { Router } from 'express';
import { RegisterUser } from '../controllers/auth.controllers';

const router = Router();

router.route('/sign-up').post(RegisterUser);

export { router as AuthRoutes };
