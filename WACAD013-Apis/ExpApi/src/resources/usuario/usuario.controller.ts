import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { usuarioService } from "./usuario.service";

const index = async (req: Request, res: Response) => {
  const users = await usuarioService.index();
  res.status(StatusCodes.OK).json(users);
};

const read = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const user = await usuarioService.read(id);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: req.t("user.notFound") });
    return;
  }

  res.status(StatusCodes.OK).json(user);
};

const create = async (req: Request, res: Response) => {
  const user = await usuarioService.create(req.body);
  res.status(StatusCodes.CREATED).json(user);
};

const update = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const user = await usuarioService.update(id, req.body);
  res.status(StatusCodes.OK).json(user);
};

const remove = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  await usuarioService.remove(id);
  res.status(StatusCodes.NO_CONTENT).send();
};

export const usuarioController = {
  index,
  read,
  create,
  update,
  remove,
};
