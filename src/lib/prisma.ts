import { PrismaClient } from "@/generated/prisma/client" // Foi ajustado para o caminho correto do Prisma Client atualizado
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prisma = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma