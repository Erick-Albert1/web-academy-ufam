import { Router } from "express";
import { productController } from "./product.controller";
import { validate } from "../../middlewares/validate";
import { productSchema } from "./product.schema";

const productRouter = Router();

productRouter.get("/", productController.index);
productRouter.get("/:id", productController.read);
productRouter.post("/", validate(productSchema), productController.create);
productRouter.put("/:id", validate(productSchema), productController.update);
productRouter.delete("/:id", productController.remove);

export { productRouter };
