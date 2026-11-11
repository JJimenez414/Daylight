-- CreateEnum
CREATE TYPE "trigger_type" AS ENUM ('sun', 'time');

-- CreateEnum
CREATE TYPE "sun_event" AS ENUM ('sunrise', 'sunset');

-- CreateTable
CREATE TABLE "routines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "light_id" INTEGER NOT NULL,
    "trigger_type" "trigger_type" NOT NULL,
    "sun_event" "sun_event",
    "offset_minutes" INTEGER NOT NULL DEFAULT 0,
    "max_sun_elevation" DOUBLE PRECISION,
    "start_time" TEXT,
    "end_time" TEXT,
    "days" INTEGER NOT NULL DEFAULT 127,
    "action_on" BOOLEAN NOT NULL DEFAULT true,
    "brightness" INTEGER,
    "kelvin" INTEGER,
    "transition_minutes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "routines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "overrides" (
    "light_id" INTEGER NOT NULL,
    "locked_until" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "overrides_pkey" PRIMARY KEY ("light_id")
);

-- CreateIndex
CREATE INDEX "routines_light_id_idx" ON "routines"("light_id");

-- AddForeignKey
ALTER TABLE "routines" ADD CONSTRAINT "routines_light_id_fkey" FOREIGN KEY ("light_id") REFERENCES "lights"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "overrides" ADD CONSTRAINT "overrides_light_id_fkey" FOREIGN KEY ("light_id") REFERENCES "lights"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- CHECK constraints (not expressible in schema.prisma)
ALTER TABLE "routines"
  ADD CONSTRAINT "routines_brightness_check" CHECK ("brightness" BETWEEN 1 AND 100),
  ADD CONSTRAINT "routines_kelvin_check" CHECK ("kelvin" BETWEEN 2000 AND 6500),
  ADD CONSTRAINT "routines_sun_event_required" CHECK ("trigger_type" <> 'sun' OR "sun_event" IS NOT NULL),
  ADD CONSTRAINT "routines_start_time_required" CHECK ("trigger_type" <> 'time' OR "start_time" IS NOT NULL),
  ADD CONSTRAINT "routines_start_time_format" CHECK ("start_time" ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  ADD CONSTRAINT "routines_end_time_format" CHECK ("end_time" ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  ADD CONSTRAINT "routines_days_check" CHECK ("days" BETWEEN 0 AND 127);
