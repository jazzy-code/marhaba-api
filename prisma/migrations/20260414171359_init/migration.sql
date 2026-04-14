-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "PriceModel" AS ENUM ('FIXED', 'FROM', 'CONSULT');

-- CreateEnum
CREATE TYPE "CallToActionType" AS ENUM ('INTERNAL', 'EXTERNAL');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'CONTACTED');

-- CreateEnum
CREATE TYPE "ServiceModality" AS ENUM ('SALE', 'RENT');

-- CreateEnum
CREATE TYPE "DriveMode" AS ENUM ('SELFDRIVE', 'CHAUFFER');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('AUTOMATIC', 'MANUAL');

-- CreateEnum
CREATE TYPE "MotorType" AS ENUM ('GASOLINE', 'DIESEL', 'GAS', 'ELECTRIC', 'HYBRID');

-- CreateEnum
CREATE TYPE "OwnerType" AS ENUM ('SINGLE', 'MULTIPLE');

-- CreateEnum
CREATE TYPE "LuxuryStayCancelation" AS ENUM ('STRICT', 'FLEXIBLE');

-- CreateEnum
CREATE TYPE "MedicalCareResponse" AS ENUM ('IMMEDIATELY', 'PREVIOUS_APPOINTMENT');

-- CreateEnum
CREATE TYPE "SecurityGuardDiscretion" AS ENUM ('VISIBLE', 'INCOGNITO');

-- CreateEnum
CREATE TYPE "SecurityGuardMinContractUnity" AS ENUM ('HOURS', 'DAYS');

-- CreateEnum
CREATE TYPE "PrivateStaffRegime" AS ENUM ('LIVE_IN', 'LIVE_OUT', 'HOURLY');

-- CreateEnum
CREATE TYPE "TrainingCoachLevel" AS ENUM ('BEGINNER', 'AMATEUR', 'EXPERIENCED', 'PROFESSIONAL');

-- CreateEnum
CREATE TYPE "TrainingCoachPlace" AS ENUM ('PRIVATE_GYM', 'PUBLIC_GYM', 'IN_VILLA', 'OUTDOORS');

-- CreateEnum
CREATE TYPE "TrainingCoachEquipment" AS ENUM ('COACH_HAS', 'CLIENT_HAS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "userType" "UserType" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iso" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MalagaRegion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MalagaRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MalagaCity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "MalagaCity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ServiceStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" INTEGER,

    CONSTRAINT "ServiceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "serviceTypeId" INTEGER NOT NULL,
    "reference" VARCHAR(100),
    "title" VARCHAR(100) NOT NULL,
    "subtitle" VARCHAR(200),
    "shortDescription" VARCHAR(300),
    "longDescription" VARCHAR(1000),
    "regionId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "district" TEXT,
    "address" TEXT,
    "postalCode" TEXT,
    "locationUrl" TEXT,
    "exclusiveListing" BOOLEAN,
    "latitute" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "privacyLevel" INTEGER NOT NULL,
    "priceModel" "PriceModel",
    "price" DOUBLE PRECISION,
    "currency" TEXT,
    "heroImageUrl" TEXT,
    "providerLogoUrl" TEXT,
    "videoUrl" TEXT,
    "callToActionType" "CallToActionType" NOT NULL DEFAULT 'EXTERNAL',
    "callToActionText" TEXT,
    "callToActionUrl" TEXT,
    "serviceStatusId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceFile" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "FileType" NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceComment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "serviceStatusId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealEstateType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RealEstateType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealEstateStayType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RealEstateStayType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealEstateHousingStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RealEstateHousingStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceRealEstate" (
    "id" SERIAL NOT NULL,
    "modality" "ServiceModality" NOT NULL,
    "realEstateTypeId" INTEGER NOT NULL,
    "surfaceBuiltMt2" DOUBLE PRECISION,
    "surfaceTerraceMt2" DOUBLE PRECISION,
    "surfacePlotMt2" DOUBLE PRECISION,
    "rooms" INTEGER,
    "fullBathrooms" INTEGER,
    "halfBathrooms" INTEGER,
    "realEstateStayTypeId" INTEGER,
    "touristLicense" TEXT,
    "guestsCapacity" INTEGER,
    "realEstateHousingStatusId" INTEGER,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceRealEstate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealEstateService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lucideIcon" TEXT,

    CONSTRAINT "RealEstateService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealEstateHasServices" (
    "id" SERIAL NOT NULL,
    "serviceRealEstateId" INTEGER NOT NULL,
    "realEstateServiceId" INTEGER NOT NULL,

    CONSTRAINT "RealEstateHasServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealEstateAmenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lucideIcon" TEXT,

    CONSTRAINT "RealEstateAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RealEstateHasAmenities" (
    "id" SERIAL NOT NULL,
    "serviceRealEstateId" INTEGER NOT NULL,
    "realEstateAmenityId" INTEGER NOT NULL,

    CONSTRAINT "RealEstateHasAmenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuxuryCarColor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL,

    CONSTRAINT "LuxuryCarColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuxuryCarLegalSituation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LuxuryCarLegalSituation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceLuxuryCar" (
    "id" SERIAL NOT NULL,
    "modality" "ServiceModality" NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "edition" TEXT,
    "year" INTEGER NOT NULL,
    "transmission" "Transmission" DEFAULT 'AUTOMATIC',
    "motorType" "MotorType" DEFAULT 'GASOLINE',
    "cv" INTEGER,
    "luxuryCarExteriorColorId" INTEGER NOT NULL,
    "luxuryCarInteriorColorId" INTEGER NOT NULL,
    "passengersCapacity" INTEGER,
    "fullServiceHistory" BOOLEAN NOT NULL DEFAULT true,
    "driveMode" "DriveMode" DEFAULT 'SELFDRIVE',
    "securityDeposit" DOUBLE PRECISION,
    "dailyKilometers" INTEGER,
    "minAge" INTEGER,
    "kilometers" INTEGER,
    "ownerType" "OwnerType" DEFAULT 'SINGLE',
    "luxuryCarLegalSituationId" INTEGER,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceLuxuryCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuxuryCarAmenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lucideIcon" TEXT,

    CONSTRAINT "LuxuryCarAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuxuryCarHasAmenities" (
    "id" SERIAL NOT NULL,
    "serviceLuxuryCarId" INTEGER NOT NULL,
    "luxuryCarAmenityId" INTEGER NOT NULL,

    CONSTRAINT "LuxuryCarHasAmenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceYacht" (
    "id" SERIAL NOT NULL,
    "modality" "ServiceModality" NOT NULL,
    "shipyard" TEXT,
    "model" TEXT,
    "constructionYear" INTEGER,
    "refitYear" INTEGER,
    "minHours" INTEGER,
    "maxHours" INTEGER,
    "lengthMeters" INTEGER,
    "maxSpeed" INTEGER,
    "totalCabins" INTEGER,
    "passengersCapacity" INTEGER,
    "port" TEXT,
    "fuelPerformance" DOUBLE PRECISION,
    "apa" DOUBLE PRECISION,
    "motorHours" INTEGER,
    "countryId" INTEGER,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceYacht_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YachtTripulationRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "YachtTripulationRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YachtTripulation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "yachtTripulationRoleId" INTEGER NOT NULL,
    "serviceYachtId" INTEGER NOT NULL,

    CONSTRAINT "YachtTripulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YachtAmenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lucideIcon" TEXT,

    CONSTRAINT "YachtAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YachtHasAmenities" (
    "id" SERIAL NOT NULL,
    "serviceYachtId" INTEGER NOT NULL,
    "yachtAmenityId" INTEGER NOT NULL,

    CONSTRAINT "YachtHasAmenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JetCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JetCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JetCatering" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JetCatering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceJet" (
    "id" SERIAL NOT NULL,
    "modality" "ServiceModality" NOT NULL,
    "model" TEXT NOT NULL,
    "jetCategoryId" INTEGER NOT NULL,
    "nmRange" DOUBLE PRECISION,
    "passengersCapacity" INTEGER NOT NULL,
    "lengthMeters" INTEGER NOT NULL,
    "maxSpeed" DOUBLE PRECISION,
    "jetCateringId" INTEGER,
    "totalHours" INTEGER,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceJet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JetAmenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lucideIcon" TEXT,

    CONSTRAINT "JetAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JetHasAmenities" (
    "id" SERIAL NOT NULL,
    "serviceJetId" INTEGER NOT NULL,
    "jetAmenityId" INTEGER NOT NULL,

    CONSTRAINT "JetHasAmenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuxuryStayCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LuxuryStayCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuxuryStayRoom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LuxuryStayRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceLuxuryStay" (
    "id" SERIAL NOT NULL,
    "totalGuests" INTEGER NOT NULL,
    "checkIn" TEXT NOT NULL,
    "checkOut" TEXT NOT NULL,
    "cancelation" "LuxuryStayCancelation" NOT NULL,
    "luxuryStayCategoryId" INTEGER NOT NULL,
    "luxuryStayRoomId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceLuxuryStay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuxuryStayAmenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lucideIcon" TEXT,

    CONSTRAINT "LuxuryStayAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuxuryStayHasAmenities" (
    "id" SERIAL NOT NULL,
    "serviceLuxuryStayId" INTEGER NOT NULL,
    "luxuryStayAmenityId" INTEGER NOT NULL,

    CONSTRAINT "LuxuryStayHasAmenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceMedicalCare" (
    "id" SERIAL NOT NULL,
    "certifications" TEXT,
    "response" "MedicalCareResponse" NOT NULL,
    "isCleanupIncluded" BOOLEAN,
    "isServiceAndTravelIncluded" BOOLEAN,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceMedicalCare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalCareAttention" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MedicalCareAttention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalCareHasAttentions" (
    "id" SERIAL NOT NULL,
    "medicalCareAttentionId" INTEGER,
    "serviceMedicalCareId" INTEGER,

    CONSTRAINT "MedicalCareHasAttentions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalCareHasLanguages" (
    "id" SERIAL NOT NULL,
    "serviceMedicalCareId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "MedicalCareHasLanguages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalCareSpecialty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MedicalCareSpecialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalCareHasSpecialties" (
    "id" SERIAL NOT NULL,
    "serviceMedicalCareId" INTEGER NOT NULL,
    "medicalCareSpecialtyId" INTEGER NOT NULL,

    CONSTRAINT "MedicalCareHasSpecialties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalCareService" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lucideIcon" TEXT,

    CONSTRAINT "MedicalCareService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalCareHasServices" (
    "id" SERIAL NOT NULL,
    "serviceMedicalCareId" INTEGER NOT NULL,
    "medicalCareServiceId" INTEGER NOT NULL,

    CONSTRAINT "MedicalCareHasServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityGuardBackgroundType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SecurityGuardBackgroundType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceSecurityGuard" (
    "id" SERIAL NOT NULL,
    "isArmed" BOOLEAN DEFAULT false,
    "discretion" "SecurityGuardDiscretion" NOT NULL,
    "minContractUnity" "SecurityGuardMinContractUnity" NOT NULL,
    "minContractPeriod" INTEGER NOT NULL,
    "securityGuardBackgroundTypeId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceSecurityGuard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityGuardHasLanguages" (
    "id" SERIAL NOT NULL,
    "serviceSecurityGuardId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "SecurityGuardHasLanguages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityGuardProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SecurityGuardProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityGuardHasProfiles" (
    "id" SERIAL NOT NULL,
    "serviceSecurityGuardId" INTEGER NOT NULL,
    "securityGuardProfileId" INTEGER NOT NULL,

    CONSTRAINT "SecurityGuardHasProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateEventType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PrivateEventType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePrivateEvent" (
    "id" SERIAL NOT NULL,
    "capacity" INTEGER NOT NULL,
    "leadTimeDays" INTEGER NOT NULL,
    "privateEventTypeId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicePrivateEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateEventAmenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lucideIcon" TEXT,

    CONSTRAINT "PrivateEventAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateEventHasAmenities" (
    "id" SERIAL NOT NULL,
    "servicePrivateEventId" INTEGER NOT NULL,
    "privateEventAmenityId" INTEGER NOT NULL,

    CONSTRAINT "PrivateEventHasAmenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateStaffRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PrivateStaffRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePrivateStaff" (
    "id" SERIAL NOT NULL,
    "privateStaffRoleId" INTEGER NOT NULL,
    "regime" "PrivateStaffRegime" NOT NULL,
    "hasVetting" BOOLEAN NOT NULL DEFAULT false,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicePrivateStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateStaffHasLanguages" (
    "id" SERIAL NOT NULL,
    "servicePrivateStaffId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "PrivateStaffHasLanguages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateStaffQualification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lucideIcon" TEXT,

    CONSTRAINT "PrivateStaffQualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateStaffHasQualifications" (
    "id" SERIAL NOT NULL,
    "servicePrivateStaffId" INTEGER NOT NULL,
    "privateStaffQualificationId" INTEGER NOT NULL,

    CONSTRAINT "PrivateStaffHasQualifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceBeautySpa" (
    "id" SERIAL NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "hasEquipment" BOOLEAN NOT NULL DEFAULT false,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceBeautySpa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeautySpaTreatment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BeautySpaTreatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeautySpaHasTreatments" (
    "id" SERIAL NOT NULL,
    "serviceBeautySpaId" INTEGER NOT NULL,
    "beautySpaTreatmentId" INTEGER NOT NULL,

    CONSTRAINT "BeautySpaHasTreatments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeautySpaProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BeautySpaProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeautySpaHasProducts" (
    "id" SERIAL NOT NULL,
    "serviceBeautySpaId" INTEGER NOT NULL,
    "beautySpaProductId" INTEGER NOT NULL,

    CONSTRAINT "BeautySpaHasProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceGolf" (
    "id" SERIAL NOT NULL,
    "totalHoles" INTEGER NOT NULL,
    "handicapRequiredMale" INTEGER,
    "handicapRequiredFemale" INTEGER,
    "maxPlayers" INTEGER NOT NULL,
    "greenFee" DOUBLE PRECISION,
    "conciergeFee" DOUBLE PRECISION,
    "isElectricBuggyIncluded" BOOLEAN,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceGolf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GolfAmenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lucideIcon" TEXT,

    CONSTRAINT "GolfAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GolfHasAmenities" (
    "id" SERIAL NOT NULL,
    "serviceGolfId" INTEGER NOT NULL,
    "golfAmenityId" INTEGER NOT NULL,

    CONSTRAINT "GolfHasAmenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTrainingCoach" (
    "id" SERIAL NOT NULL,
    "level" "TrainingCoachLevel" NOT NULL,
    "place" "TrainingCoachPlace" NOT NULL,
    "equipment" "TrainingCoachEquipment" NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceTrainingCoach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingCoachHasLanguages" (
    "id" SERIAL NOT NULL,
    "serviceTrainingCoachId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "TrainingCoachHasLanguages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingCoachDiscipline" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TrainingCoachDiscipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingCoachHasDisciplines" (
    "id" SERIAL NOT NULL,
    "serviceTrainingCoachId" INTEGER NOT NULL,
    "trainingCoachDisciplineId" INTEGER NOT NULL,

    CONSTRAINT "TrainingCoachHasDisciplines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceRealEstate_serviceId_key" ON "ServiceRealEstate"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceLuxuryCar_serviceId_key" ON "ServiceLuxuryCar"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceYacht_serviceId_key" ON "ServiceYacht"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceJet_serviceId_key" ON "ServiceJet"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceLuxuryStay_serviceId_key" ON "ServiceLuxuryStay"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceMedicalCare_serviceId_key" ON "ServiceMedicalCare"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceSecurityGuard_serviceId_key" ON "ServiceSecurityGuard"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicePrivateEvent_serviceId_key" ON "ServicePrivateEvent"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicePrivateStaff_serviceId_key" ON "ServicePrivateStaff"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceBeautySpa_serviceId_key" ON "ServiceBeautySpa"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceGolf_serviceId_key" ON "ServiceGolf"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceTrainingCoach_serviceId_key" ON "ServiceTrainingCoach"("serviceId");

-- AddForeignKey
ALTER TABLE "MalagaCity" ADD CONSTRAINT "MalagaCity_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "MalagaRegion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceType" ADD CONSTRAINT "ServiceType_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "MalagaRegion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "MalagaCity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_serviceStatusId_fkey" FOREIGN KEY ("serviceStatusId") REFERENCES "ServiceStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceFile" ADD CONSTRAINT "ServiceFile_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceComment" ADD CONSTRAINT "ServiceComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceComment" ADD CONSTRAINT "ServiceComment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceComment" ADD CONSTRAINT "ServiceComment_serviceStatusId_fkey" FOREIGN KEY ("serviceStatusId") REFERENCES "ServiceStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRealEstate" ADD CONSTRAINT "ServiceRealEstate_realEstateTypeId_fkey" FOREIGN KEY ("realEstateTypeId") REFERENCES "RealEstateType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRealEstate" ADD CONSTRAINT "ServiceRealEstate_realEstateStayTypeId_fkey" FOREIGN KEY ("realEstateStayTypeId") REFERENCES "RealEstateStayType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRealEstate" ADD CONSTRAINT "ServiceRealEstate_realEstateHousingStatusId_fkey" FOREIGN KEY ("realEstateHousingStatusId") REFERENCES "RealEstateHousingStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRealEstate" ADD CONSTRAINT "ServiceRealEstate_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealEstateHasServices" ADD CONSTRAINT "RealEstateHasServices_serviceRealEstateId_fkey" FOREIGN KEY ("serviceRealEstateId") REFERENCES "ServiceRealEstate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealEstateHasServices" ADD CONSTRAINT "RealEstateHasServices_realEstateServiceId_fkey" FOREIGN KEY ("realEstateServiceId") REFERENCES "RealEstateService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealEstateHasAmenities" ADD CONSTRAINT "RealEstateHasAmenities_serviceRealEstateId_fkey" FOREIGN KEY ("serviceRealEstateId") REFERENCES "ServiceRealEstate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RealEstateHasAmenities" ADD CONSTRAINT "RealEstateHasAmenities_realEstateAmenityId_fkey" FOREIGN KEY ("realEstateAmenityId") REFERENCES "RealEstateAmenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceLuxuryCar" ADD CONSTRAINT "ServiceLuxuryCar_luxuryCarExteriorColorId_fkey" FOREIGN KEY ("luxuryCarExteriorColorId") REFERENCES "LuxuryCarColor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceLuxuryCar" ADD CONSTRAINT "ServiceLuxuryCar_luxuryCarInteriorColorId_fkey" FOREIGN KEY ("luxuryCarInteriorColorId") REFERENCES "LuxuryCarColor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceLuxuryCar" ADD CONSTRAINT "ServiceLuxuryCar_luxuryCarLegalSituationId_fkey" FOREIGN KEY ("luxuryCarLegalSituationId") REFERENCES "LuxuryCarLegalSituation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceLuxuryCar" ADD CONSTRAINT "ServiceLuxuryCar_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuxuryCarHasAmenities" ADD CONSTRAINT "LuxuryCarHasAmenities_serviceLuxuryCarId_fkey" FOREIGN KEY ("serviceLuxuryCarId") REFERENCES "ServiceLuxuryCar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuxuryCarHasAmenities" ADD CONSTRAINT "LuxuryCarHasAmenities_luxuryCarAmenityId_fkey" FOREIGN KEY ("luxuryCarAmenityId") REFERENCES "LuxuryCarAmenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceYacht" ADD CONSTRAINT "ServiceYacht_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceYacht" ADD CONSTRAINT "ServiceYacht_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YachtTripulation" ADD CONSTRAINT "YachtTripulation_yachtTripulationRoleId_fkey" FOREIGN KEY ("yachtTripulationRoleId") REFERENCES "YachtTripulationRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YachtTripulation" ADD CONSTRAINT "YachtTripulation_serviceYachtId_fkey" FOREIGN KEY ("serviceYachtId") REFERENCES "ServiceYacht"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YachtHasAmenities" ADD CONSTRAINT "YachtHasAmenities_serviceYachtId_fkey" FOREIGN KEY ("serviceYachtId") REFERENCES "ServiceYacht"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YachtHasAmenities" ADD CONSTRAINT "YachtHasAmenities_yachtAmenityId_fkey" FOREIGN KEY ("yachtAmenityId") REFERENCES "YachtAmenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceJet" ADD CONSTRAINT "ServiceJet_jetCategoryId_fkey" FOREIGN KEY ("jetCategoryId") REFERENCES "JetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceJet" ADD CONSTRAINT "ServiceJet_jetCateringId_fkey" FOREIGN KEY ("jetCateringId") REFERENCES "JetCatering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceJet" ADD CONSTRAINT "ServiceJet_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JetHasAmenities" ADD CONSTRAINT "JetHasAmenities_serviceJetId_fkey" FOREIGN KEY ("serviceJetId") REFERENCES "ServiceJet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JetHasAmenities" ADD CONSTRAINT "JetHasAmenities_jetAmenityId_fkey" FOREIGN KEY ("jetAmenityId") REFERENCES "JetAmenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceLuxuryStay" ADD CONSTRAINT "ServiceLuxuryStay_luxuryStayCategoryId_fkey" FOREIGN KEY ("luxuryStayCategoryId") REFERENCES "LuxuryStayCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceLuxuryStay" ADD CONSTRAINT "ServiceLuxuryStay_luxuryStayRoomId_fkey" FOREIGN KEY ("luxuryStayRoomId") REFERENCES "LuxuryStayRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceLuxuryStay" ADD CONSTRAINT "ServiceLuxuryStay_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuxuryStayHasAmenities" ADD CONSTRAINT "LuxuryStayHasAmenities_serviceLuxuryStayId_fkey" FOREIGN KEY ("serviceLuxuryStayId") REFERENCES "ServiceLuxuryStay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuxuryStayHasAmenities" ADD CONSTRAINT "LuxuryStayHasAmenities_luxuryStayAmenityId_fkey" FOREIGN KEY ("luxuryStayAmenityId") REFERENCES "LuxuryStayAmenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceMedicalCare" ADD CONSTRAINT "ServiceMedicalCare_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalCareHasAttentions" ADD CONSTRAINT "MedicalCareHasAttentions_medicalCareAttentionId_fkey" FOREIGN KEY ("medicalCareAttentionId") REFERENCES "MedicalCareAttention"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalCareHasAttentions" ADD CONSTRAINT "MedicalCareHasAttentions_serviceMedicalCareId_fkey" FOREIGN KEY ("serviceMedicalCareId") REFERENCES "ServiceMedicalCare"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalCareHasLanguages" ADD CONSTRAINT "MedicalCareHasLanguages_serviceMedicalCareId_fkey" FOREIGN KEY ("serviceMedicalCareId") REFERENCES "ServiceMedicalCare"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalCareHasLanguages" ADD CONSTRAINT "MedicalCareHasLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalCareHasSpecialties" ADD CONSTRAINT "MedicalCareHasSpecialties_serviceMedicalCareId_fkey" FOREIGN KEY ("serviceMedicalCareId") REFERENCES "ServiceMedicalCare"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalCareHasSpecialties" ADD CONSTRAINT "MedicalCareHasSpecialties_medicalCareSpecialtyId_fkey" FOREIGN KEY ("medicalCareSpecialtyId") REFERENCES "MedicalCareSpecialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalCareHasServices" ADD CONSTRAINT "MedicalCareHasServices_serviceMedicalCareId_fkey" FOREIGN KEY ("serviceMedicalCareId") REFERENCES "ServiceMedicalCare"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalCareHasServices" ADD CONSTRAINT "MedicalCareHasServices_medicalCareServiceId_fkey" FOREIGN KEY ("medicalCareServiceId") REFERENCES "MedicalCareService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceSecurityGuard" ADD CONSTRAINT "ServiceSecurityGuard_securityGuardBackgroundTypeId_fkey" FOREIGN KEY ("securityGuardBackgroundTypeId") REFERENCES "SecurityGuardBackgroundType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceSecurityGuard" ADD CONSTRAINT "ServiceSecurityGuard_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityGuardHasLanguages" ADD CONSTRAINT "SecurityGuardHasLanguages_serviceSecurityGuardId_fkey" FOREIGN KEY ("serviceSecurityGuardId") REFERENCES "ServiceSecurityGuard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityGuardHasLanguages" ADD CONSTRAINT "SecurityGuardHasLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityGuardHasProfiles" ADD CONSTRAINT "SecurityGuardHasProfiles_serviceSecurityGuardId_fkey" FOREIGN KEY ("serviceSecurityGuardId") REFERENCES "ServiceSecurityGuard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityGuardHasProfiles" ADD CONSTRAINT "SecurityGuardHasProfiles_securityGuardProfileId_fkey" FOREIGN KEY ("securityGuardProfileId") REFERENCES "SecurityGuardProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePrivateEvent" ADD CONSTRAINT "ServicePrivateEvent_privateEventTypeId_fkey" FOREIGN KEY ("privateEventTypeId") REFERENCES "PrivateEventType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePrivateEvent" ADD CONSTRAINT "ServicePrivateEvent_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateEventHasAmenities" ADD CONSTRAINT "PrivateEventHasAmenities_servicePrivateEventId_fkey" FOREIGN KEY ("servicePrivateEventId") REFERENCES "ServicePrivateEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateEventHasAmenities" ADD CONSTRAINT "PrivateEventHasAmenities_privateEventAmenityId_fkey" FOREIGN KEY ("privateEventAmenityId") REFERENCES "PrivateEventAmenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePrivateStaff" ADD CONSTRAINT "ServicePrivateStaff_privateStaffRoleId_fkey" FOREIGN KEY ("privateStaffRoleId") REFERENCES "PrivateStaffRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePrivateStaff" ADD CONSTRAINT "ServicePrivateStaff_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateStaffHasLanguages" ADD CONSTRAINT "PrivateStaffHasLanguages_servicePrivateStaffId_fkey" FOREIGN KEY ("servicePrivateStaffId") REFERENCES "ServicePrivateStaff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateStaffHasLanguages" ADD CONSTRAINT "PrivateStaffHasLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateStaffHasQualifications" ADD CONSTRAINT "PrivateStaffHasQualifications_servicePrivateStaffId_fkey" FOREIGN KEY ("servicePrivateStaffId") REFERENCES "ServicePrivateStaff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateStaffHasQualifications" ADD CONSTRAINT "PrivateStaffHasQualifications_privateStaffQualificationId_fkey" FOREIGN KEY ("privateStaffQualificationId") REFERENCES "PrivateStaffQualification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBeautySpa" ADD CONSTRAINT "ServiceBeautySpa_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeautySpaHasTreatments" ADD CONSTRAINT "BeautySpaHasTreatments_serviceBeautySpaId_fkey" FOREIGN KEY ("serviceBeautySpaId") REFERENCES "ServiceBeautySpa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeautySpaHasTreatments" ADD CONSTRAINT "BeautySpaHasTreatments_beautySpaTreatmentId_fkey" FOREIGN KEY ("beautySpaTreatmentId") REFERENCES "BeautySpaTreatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeautySpaHasProducts" ADD CONSTRAINT "BeautySpaHasProducts_serviceBeautySpaId_fkey" FOREIGN KEY ("serviceBeautySpaId") REFERENCES "ServiceBeautySpa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeautySpaHasProducts" ADD CONSTRAINT "BeautySpaHasProducts_beautySpaProductId_fkey" FOREIGN KEY ("beautySpaProductId") REFERENCES "BeautySpaProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceGolf" ADD CONSTRAINT "ServiceGolf_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GolfHasAmenities" ADD CONSTRAINT "GolfHasAmenities_serviceGolfId_fkey" FOREIGN KEY ("serviceGolfId") REFERENCES "ServiceGolf"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GolfHasAmenities" ADD CONSTRAINT "GolfHasAmenities_golfAmenityId_fkey" FOREIGN KEY ("golfAmenityId") REFERENCES "GolfAmenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTrainingCoach" ADD CONSTRAINT "ServiceTrainingCoach_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCoachHasLanguages" ADD CONSTRAINT "TrainingCoachHasLanguages_serviceTrainingCoachId_fkey" FOREIGN KEY ("serviceTrainingCoachId") REFERENCES "ServiceTrainingCoach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCoachHasLanguages" ADD CONSTRAINT "TrainingCoachHasLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCoachHasDisciplines" ADD CONSTRAINT "TrainingCoachHasDisciplines_serviceTrainingCoachId_fkey" FOREIGN KEY ("serviceTrainingCoachId") REFERENCES "ServiceTrainingCoach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCoachHasDisciplines" ADD CONSTRAINT "TrainingCoachHasDisciplines_trainingCoachDisciplineId_fkey" FOREIGN KEY ("trainingCoachDisciplineId") REFERENCES "TrainingCoachDiscipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
