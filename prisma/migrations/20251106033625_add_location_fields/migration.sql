-- CreateTable
CREATE TABLE "ContactRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "city" TEXT,
    "state" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "reportId" TEXT
);

-- CreateTable
CREATE TABLE "DataSubmissionForm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contactRequestId" TEXT NOT NULL,
    "systemType" TEXT NOT NULL,
    "vesselDiameter" REAL NOT NULL,
    "vesselHeight" REAL NOT NULL,
    "flowRate" REAL NOT NULL,
    "bedHeight" REAL NOT NULL,
    "vesselVolume" REAL NOT NULL,
    "bedVolume" REAL NOT NULL,
    "ebct" REAL NOT NULL,
    "toc" REAL NOT NULL,
    "sulfate" REAL NOT NULL,
    "chloride" REAL NOT NULL,
    "alkalinity" REAL NOT NULL,
    "hardness" REAL NOT NULL,
    "ph" REAL NOT NULL,
    "temperature" REAL NOT NULL,
    "pfoaConcentration" REAL NOT NULL,
    "pfosConcentration" REAL NOT NULL,
    "pfnaConcentration" REAL NOT NULL,
    "pfhxaConcentration" REAL NOT NULL,
    "pfhxsConcentration" REAL NOT NULL,
    "pfdaConcentration" REAL NOT NULL,
    "pfbsConcentration" REAL NOT NULL,
    "pfhpaConcentration" REAL NOT NULL,
    "pfundaConcentration" REAL NOT NULL,
    "pfdoaConcentration" REAL NOT NULL,
    "totalPfasConcentration" REAL NOT NULL,
    "gacType" TEXT NOT NULL,
    "gacDensity" REAL NOT NULL,
    "gacParticleSize" REAL NOT NULL,
    "gacIodineNumber" REAL NOT NULL,
    "gacSurfaceArea" REAL NOT NULL,
    "gacCostPerKg" REAL NOT NULL,
    "replacementCost" REAL NOT NULL,
    "laborCost" REAL NOT NULL,
    "disposalCost" REAL NOT NULL,
    "operatingDaysPerYear" REAL NOT NULL,
    "operatingHoursPerDay" REAL NOT NULL,
    "targetRemovalEfficiency" REAL NOT NULL,
    "safetyFactor" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DataSubmissionForm_contactRequestId_fkey" FOREIGN KEY ("contactRequestId") REFERENCES "ContactRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contactRequestId" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "projectedLifespanMonths" REAL NOT NULL,
    "capitalAvoidance" REAL NOT NULL,
    "p95SafeLifeMonths" REAL NOT NULL,
    "generatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Report_contactRequestId_fkey" FOREIGN KEY ("contactRequestId") REFERENCES "ContactRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactRequest_contactEmail_key" ON "ContactRequest"("contactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "ContactRequest_reportId_key" ON "ContactRequest"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "DataSubmissionForm_contactRequestId_key" ON "DataSubmissionForm"("contactRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_contactRequestId_key" ON "Report"("contactRequestId");
