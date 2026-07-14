import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { productService } from "./product.service";

const index = async (req: Request, res: Response) => {
  const products = await productService.index();
  res.status(StatusCodes.OK).json(products);
};

const read = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const product = await productService.read(id);

  if (!product) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    return;
  }

  res.status(StatusCodes.OK).json(product);
};

const create = async (req: Request, res: Response) => {
  const product = await productService.create(req.body);
  res.status(StatusCodes.CREATED).json(product);
};

const update = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const product = await productService.update(id, req.body);
  res.status(StatusCodes.OK).json(product);
};

const remove = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  await productService.remove(id);
  res.status(StatusCodes.NO_CONTENT).send();
};

export const productController = {
  index,
  read,
  create,
  update,
  remove,
};
