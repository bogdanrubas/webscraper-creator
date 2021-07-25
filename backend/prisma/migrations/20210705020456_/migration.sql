-- CreateTable
CREATE TABLE "Crawler" (
    "actualVersion" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrawlerVersion" (
    "createdAt" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,
    "lastUsage" TEXT,
    "status" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "crawlerId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrawlerStartUrl" (
    "crawled" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "errorFields" TEXT,
    "errorsDescription" TEXT,
    "hasErrors" BOOLEAN,
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT,
    "crawlerVersionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spider" (
    "arguments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "depth" INTEGER,
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "requestType" TEXT,
    "template" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "crawlerVersionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "createdAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "id" SERIAL NOT NULL,
    "password" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Crawler" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrawlerVersion" ADD FOREIGN KEY ("crawlerId") REFERENCES "Crawler"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrawlerStartUrl" ADD FOREIGN KEY ("crawlerVersionId") REFERENCES "CrawlerVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spider" ADD FOREIGN KEY ("crawlerVersionId") REFERENCES "CrawlerVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
