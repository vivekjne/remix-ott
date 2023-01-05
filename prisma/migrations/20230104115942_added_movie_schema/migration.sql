-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "trailer_url" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "durationInMinutes" INTEGER,
    "year" INTEGER NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_slug_key" ON "Movie"("slug");
