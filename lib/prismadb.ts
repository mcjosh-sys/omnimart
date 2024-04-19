import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

interface Dependencies {
  prisma: PrismaClient | undefined;
}

declare global {
    var prisma: PrismaClient | undefined
}

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const initializePrisma = (): PrismaClient => {
  return new PrismaClient({adapter});
};

const setupDependencies = (dependencies: Dependencies): PrismaClient => {
  if (!dependencies.prisma) {
    dependencies.prisma = initializePrisma();
  }
  return dependencies.prisma;
};

const dependencies: Dependencies = {
  prisma: globalThis.prisma,
};

const prismadb = setupDependencies(dependencies);

if (process.env.NODE_ENV === 'production') {
  globalThis.prisma = prismadb;
}

export default prismadb;
