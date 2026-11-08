import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().default(""),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
});

export const config = envSchema.parse(process.env);
