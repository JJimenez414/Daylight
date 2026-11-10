import { Router } from "express";
import { checkDatabase } from "../db/prisma.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  const db = await checkDatabase();
  res.json({
    status: "ok",
    database: db.ok ? "ok" : "error",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
