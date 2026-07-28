import { Router } from "express";
import { usuarioController } from "./usuario.controller";
import { validate } from "../../middlewares/validate";
import { createUserSchema, updateUserSchema } from "./usuario.schema";
import { isAdmin } from "../../middlewares/isAdmin";

const usuarioRouter = Router();

usuarioRouter.use(isAdmin);

usuarioRouter.get("/", usuarioController.index); // #swagger.tags = ['Usuário'] #swagger.summary = 'Listagem de usuários.'
usuarioRouter.get("/:id", usuarioController.read); // #swagger.tags = ['Usuário'] #swagger.summary = 'Detalhes de um usuário.'
usuarioRouter.post("/", validate(createUserSchema), usuarioController.create); // #swagger.tags = ['Usuário'] #swagger.summary = 'Cria um novo usuário.'
usuarioRouter.put("/:id", validate(updateUserSchema), usuarioController.update); // #swagger.tags = ['Usuário'] #swagger.summary = 'Atualiza um usuário existente.'
usuarioRouter.delete("/:id", usuarioController.remove); // #swagger.tags = ['Usuário'] #swagger.summary = 'Remove um usuário.'

export { usuarioRouter };
