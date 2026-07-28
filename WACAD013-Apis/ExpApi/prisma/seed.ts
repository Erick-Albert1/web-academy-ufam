import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const dbUrl = new URL(process.env.DATABASE_URL as string);

const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: Number(dbUrl.port) || 3306,
  user: decodeURIComponent(dbUrl.username),
  password: decodeURIComponent(dbUrl.password),
  database: dbUrl.pathname.replace(/^\//, ""),
});
const prisma = new PrismaClient({ adapter });

const userTypes = ["admin", "cliente"];

async function main() {
  for (const name of userTypes) {
    await prisma.userType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Seed de UserType concluído.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
