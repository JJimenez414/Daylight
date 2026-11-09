import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "node:path";
import { pinoHttp } from "pino-http";
import { config } from "./config.js";
import { logger } from "./lib/logger.js";
import { errorHandler, notFound } from "./middleware/error-handler.js";
import { apiRouter } from "./routes/index.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: config.CLIENT_ORIGIN }));
  app.use(express.json());
  app.use(pinoHttp({ logger }));

  app.use("/api", apiRouter);

  // In production, Express also serves the built React app (client/dist)
  if (config.NODE_ENV === "production") {
    const clientDist = path.resolve(import.meta.dirname, "../../client/dist");
    app.use(express.static(clientDist));
    // Any non-API route returns index.html so the React app can handle it
    app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(clientDist, "index.html")));
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
