import { Router } from "express";
import { productController } from "./product.controller";
import { validate } from "../../middlewares/validate";
import { productSchema } from "./product.schema";

const productRouter = Router();

productRouter.get("/", productController.index); // #swagger.tags = ['Produto'] #swagger.summary = 'Listagem de produtos.'
productRouter.get("/:id", productController.read); // #swagger.tags = ['Produto'] #swagger.summary = 'Detalhes de um produto.'
productRouter.post("/", validate(productSchema), productController.create); // #swagger.tags = ['Produto'] #swagger.summary = 'Adiciona um novo produto na base.'
productRouter.put("/:id", validate(productSchema), productController.update); // #swagger.tags = ['Produto'] #swagger.summary = 'Atualiza um produto existente.'
productRouter.delete("/:id", productController.remove); // #swagger.tags = ['Produto'] #swagger.summary = 'Remove um produto da base.'

export { productRouter };
