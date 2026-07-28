import bcrypt from "bcrypt";
import { prisma } from "../../database/prisma";
import { RegisterDTO } from "./auth.types";

const SALT_ROUNDS = 10;
const DEFAULT_USER_TYPE = "cliente";

const findByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    include: { userType: true },
  });
};

const register = async (data: RegisterDTO) => {
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const userType = await prisma.userType.findUniqueOrThrow({
    where: { name: DEFAULT_USER_TYPE },
  });

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      userTypeId: userType.id,
    },
    include: { userType: true },
  });

  const { password, ...safeUser } = user;
  return safeUser;
};

export const authService = {
  findByEmail,
  register,
};
