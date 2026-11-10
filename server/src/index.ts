import { createApp } from "./app.js";
import { config } from "./config.js";
import { checkDatabase } from "./db/prisma.js";
import { logger } from "./lib/logger.js";

const app = createApp();

app.listen(config.PORT, async () => {
  logger.info(`Server running on http://localhost:${config.PORT}`);

  const db = await checkDatabase();
  if (db.ok) logger.info("Database connected");
  else logger.error(`Database connection failed: ${db.error}`);
});
