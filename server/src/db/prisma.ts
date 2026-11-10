import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { config } from "../config.js";

const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL,
  // Fail fast instead of hanging if the database can't be reached
  connectionTimeoutMillis: 5000,
});

export const prisma = new PrismaClient({ adapter });

// Runs a trivial query to confirm the database is reachable
export async function checkDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { ok: true as const };
  } catch (err) {
    // Prisma's message is often empty; the real reason is in `code` (e.g. ECONNREFUSED)
    // or in the Postgres error the driver adapter attaches to `meta`
    const e = err as {
      code?: string;
      meta?: { driverAdapterError?: { cause?: { originalMessage?: string } } };
    };
    const reason =
      e.meta?.driverAdapterError?.cause?.originalMessage ??
      (err instanceof Error ? err.message.trim() : String(err));
    return { ok: false as const, error: e.code ? `${e.code}: ${reason}` : reason };
  }
}
