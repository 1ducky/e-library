import { PrismaClient } from "@prisma/client/extension";

// Deklarasi GlobalPrisma untuk menyimpan instance PrismaClient secara global
const GlobalPrisma = globalThis as unknown as { prisma: PrismaClient };

// Gunakan kembali instance PrismaClient jika sudah ada, atau buat yang baru
export const prisma = GlobalPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") GlobalPrisma.prisma = prisma;