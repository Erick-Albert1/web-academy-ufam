import { prisma } from "../../database/prisma";
import { CreateProductDTO, UpdateProductDTO } from "./product.types";

const index = async () => {
  return prisma.product.findMany();
};

const read = async (id: string) => {
  return prisma.product.findUnique({ where: { id } });
};

const create = async (data: CreateProductDTO) => {
  return prisma.product.create({ data });
};

const update = async (id: string, data: UpdateProductDTO) => {
  return prisma.product.update({ where: { id }, data });
};

const remove = async (id: string) => {
  return prisma.product.delete({ where: { id } });
};

export const productService = {
  index,
  read,
  create,
  update,
  remove,
};
