-- AlterTable
ALTER TABLE "User" ADD COLUMN     "acceptedPrivacyAt" TIMESTAMP(3),
ADD COLUMN     "acceptedTermsAt" TIMESTAMP(3),
ADD COLUMN     "consentVersion" TEXT DEFAULT 'v1',
ADD COLUMN     "ipAddress" TEXT;
