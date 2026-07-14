import { PrismaClient } from "../../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { CreateProductDTO, UpdateProductDTO } from "./product.types";

const dbUrl = new URL(process.env.DATABASE_URL as string);

const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: Number(dbUrl.port) || 3306,
  user: decodeURIComponent(dbUrl.username),
  password: decodeURIComponent(dbUrl.password),
  database: dbUrl.pathname.replace(/^\//, ""),
});
const prisma = new PrismaClient({ adapter });

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
