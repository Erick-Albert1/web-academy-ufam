import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { compraService } from "./compra.service";
import { CartError } from "../../errors/CartError";

const getCart = async (req: Request, res: Response) => {
  const cart = req.session.cart ?? [];
  const detailedCart = await compraService.detailCart(cart);
  res.status(StatusCodes.OK).json(detailedCart);
};

const addItem = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const product = await compraService.findProduct(productId);

  if (!product) {
    res.status(StatusCodes.NOT_FOUND).json({ message: req.t("cart.invalidProduct") });
    return;
  }

  const cart = req.session.cart ?? [];
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  req.session.cart = cart;
  res.status(StatusCodes.OK).json({ message: req.t("cart.itemAdded"), cart });
};

const removeItem = (req: Request, res: Response) => {
  const productId = String(req.params.productId);
  const cart = (req.session.cart ?? []).filter((item) => item.productId !== productId);

  req.session.cart = cart;
  res.status(StatusCodes.OK).json({ message: req.t("cart.itemRemoved"), cart });
};

const finalize = async (req: Request, res: Response) => {
  const cart = req.session.cart ?? [];

  if (cart.length === 0) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: req.t("cart.empty") });
    return;
  }

  try {
    const purchase = await compraService.finalize(req.session.userId as string, cart);
    req.session.cart = [];
    res.status(StatusCodes.CREATED).json({ message: req.t("purchase.completed"), purchase });
  } catch (error) {
    if (error instanceof CartError) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: req.t(error.key) });
      return;
    }

    throw error;
  }
};

const index = async (req: Request, res: Response) => {
  const purchases = await compraService.index(req.session.userId as string);
  res.status(StatusCodes.OK).json(purchases);
};

const read = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const purchase = await compraService.read(id, req.session.userId as string);

  if (!purchase) {
    res.status(StatusCodes.NOT_FOUND).json({ message: req.t("purchase.notFound") });
    return;
  }

  res.status(StatusCodes.OK).json(purchase);
};

export const compraController = {
  getCart,
  addItem,
  removeItem,
  finalize,
  index,
  read,
};
