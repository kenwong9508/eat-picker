-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "eatpicker";

-- CreateEnum
CREATE TYPE "eatpicker"."speed_enum" AS ENUM ('fast', 'normal', 'slow');

-- CreateEnum
CREATE TYPE "eatpicker"."cuisine_enum" AS ENUM ('chinese', 'congee', 'noodle', 'hotpot', 'japanese', 'korean', 'western', 'fastfood', 'thai');

-- CreateTable
CREATE TABLE "eatpicker"."restaurants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "avg_price" DOUBLE PRECISION NOT NULL,
    "speed" "eatpicker"."speed_enum" NOT NULL,
    "cuisine" "eatpicker"."cuisine_enum" NOT NULL,
    "takeaway" BOOLEAN NOT NULL DEFAULT false,
    "dine_in" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "address" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);
