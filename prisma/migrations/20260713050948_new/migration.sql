-- AlterTable
ALTER TABLE "audit_session" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "locked_by" TEXT,
ADD COLUMN     "max_attempts" INTEGER NOT NULL DEFAULT 3;

-- CreateTable
CREATE TABLE "background_job" (
    "id" TEXT NOT NULL,
    "job_type" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "locked_by" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "max_attempts" INTEGER NOT NULL DEFAULT 3,
    "entry_ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updt_ts" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "background_job_pkey" PRIMARY KEY ("id")
);
