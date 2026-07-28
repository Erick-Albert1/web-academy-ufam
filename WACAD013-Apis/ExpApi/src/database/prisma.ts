import { PrismaClient } from "../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const dbUrl = new URL(process.env.DATABASE_URL as string);

const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: Number(dbUrl.port) || 3306,
  user: decodeURIComponent(dbUrl.username),
  password: decodeURIComponent(dbUrl.password),
  database: dbUrl.pathname.replace(/^\//, ""),
});

export const prisma = new PrismaClient({ adapter });
