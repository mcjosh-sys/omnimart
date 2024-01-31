import { PrismaClient } from "@prisma/client";

interface Dependencies {
  prisma: PrismaClient | undefined;
}

declare global {
    var prisma: PrismaClient | undefined
}

const initializePrisma = (): PrismaClient => {
  return new PrismaClient();
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
