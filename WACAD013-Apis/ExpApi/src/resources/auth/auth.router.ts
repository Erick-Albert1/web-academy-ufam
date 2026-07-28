import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../middlewares/validate";
import { registerSchema, loginSchema } from "./auth.schema";
import { isAuth } from "../../middlewares/isAuth";

const authRouter = Router();

authRouter.post("/", validate(registerSchema), authController.register); // #swagger.tags = ['Auth'] #swagger.summary = 'Registro de novos clientes.'
authRouter.put("/", validate(loginSchema), authController.login); // #swagger.tags = ['Auth'] #swagger.summary = 'Login de usuários.'
authRouter.delete("/", isAuth, authController.logout); // #swagger.tags = ['Auth'] #swagger.summary = 'Logout de usuário logado.'

export { authRouter };
