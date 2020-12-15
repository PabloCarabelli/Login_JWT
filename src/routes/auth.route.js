import { Router } from "express";
import { verifySignUp } from "../middlewares";
import * as authController from '../controllers/auth.controller'
const router = Router();



router.post(
    '/signup', 
    [verifySignUp.checkDuplicatedUserNameOrEmail, verifySignUp.checkRolesExisted],
    authController.signUp);
router.post('/signin', authController.signIn);

export default router;