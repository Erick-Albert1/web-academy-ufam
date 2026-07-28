import { Router } from "express";
import { compraController } from "./compra.controller";
import { validate } from "../../middlewares/validate";
import { addCartItemSchema } from "./compra.schema";
import { isAuth } from "../../middlewares/isAuth";

const compraRouter = Router();

compraRouter.use(isAuth);

compraRouter.get("/carrinho", compraController.getCart); // #swagger.tags = ['Compra'] #swagger.summary = 'Visualiza o carrinho de compras.'
compraRouter.post("/carrinho", validate(addCartItemSchema), compraController.addItem); // #swagger.tags = ['Compra'] #swagger.summary = 'Adiciona um produto ao carrinho.'
compraRouter.delete("/carrinho/:productId", compraController.removeItem); // #swagger.tags = ['Compra'] #swagger.summary = 'Remove um produto do carrinho.'

compraRouter.get("/", compraController.index); // #swagger.tags = ['Compra'] #swagger.summary = 'Listagem de compras do usuário.'
compraRouter.get("/:id", compraController.read); // #swagger.tags = ['Compra'] #swagger.summary = 'Detalhes de uma compra.'
compraRouter.post("/", compraController.finalize); // #swagger.tags = ['Compra'] #swagger.summary = 'Conclui a compra, salvando os itens do carrinho.'

export { compraRouter };
