import { PrismaPg } from "@prisma/adapter-pg";
import { pagination } from "prisma-extension-pagination";
import { PrismaClient } from "./generated/prisma/client";

function prismaClientSingleton() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  return new PrismaClient({
    adapter,
    transactionOptions: {
      maxWait: 10_000, // Global maxWait of 10 seconds
      timeout: 20_000, // Global timeout of 20 seconds
    },
  }).$extends(pagination({ pages: { includePageCount: true } }));
}

export type PrismaExtendedType = ReturnType<typeof prismaClientSingleton>;

declare global {
  var prisma: PrismaExtendedType | undefined;
}

export const prisma: PrismaExtendedType =
  global.prisma ?? prismaClientSingleton();

// Keep singleton in dev mode
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
