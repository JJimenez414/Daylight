-- CreateTable
CREATE TABLE "lights" (
    "id" SERIAL NOT NULL,
    "hue_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "lights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lights_hue_id_key" ON "lights"("hue_id");
