import bcrypt from "bcrypt";
import { prisma } from "../../database/prisma";
import { CreateUserDTO, UpdateUserDTO } from "./usuario.types";

const SALT_ROUNDS = 10;

const userSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  userTypeId: true,
  userType: true,
};

const index = async () => {
  return prisma.user.findMany({ select: userSelect });
};

const read = async (id: string) => {
  return prisma.user.findUnique({ where: { id }, select: userSelect });
};

const create = async (data: CreateUserDTO) => {
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  return prisma.user.create({
    data: { ...data, password: hashedPassword },
    select: userSelect,
  });
};

const update = async (id: string, data: UpdateUserDTO) => {
  const hashedPassword = data.password
    ? await bcrypt.hash(data.password, SALT_ROUNDS)
    : undefined;

  return prisma.user.update({
    where: { id },
    data: { ...data, password: hashedPassword },
    select: userSelect,
  });
};

const remove = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};

export const usuarioService = {
  index,
  read,
  create,
  update,
  remove,
};
