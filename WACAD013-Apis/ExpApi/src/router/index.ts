import { Router } from "express";
import { productRouter } from "../resources/product/product.router";
import { usuarioRouter } from "../resources/usuario/usuario.router";
import { authRouter } from "../resources/auth/auth.router";
import { compraRouter } from "../resources/compra/compra.router";
import { idiomaRouter } from "../resources/idioma/idioma.router";

const router = Router();

router.use("/products", productRouter);
router.use("/usuario", usuarioRouter);
router.use("/auth", authRouter);
router.use("/compra", compraRouter);
router.use("/idioma", idiomaRouter);

export { router };
