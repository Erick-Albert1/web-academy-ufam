import { Router } from "express";
import { idiomaController } from "./idioma.controller";

const idiomaRouter = Router();

idiomaRouter.put("/:code", idiomaController.update); // #swagger.tags = ['Idioma'] #swagger.summary = 'Troca o idioma da aplicação via cookie.'

export { idiomaRouter };
