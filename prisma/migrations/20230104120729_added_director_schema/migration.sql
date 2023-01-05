-- CreateTable
CREATE TABLE "Director" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'No description available for the director',
    "photo" TEXT NOT NULL DEFAULT 'https://dummyimage.com/300x200/777/fff',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_DirectorToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DirectorToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Director" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DirectorToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_DirectorToMovie_AB_unique" ON "_DirectorToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_DirectorToMovie_B_index" ON "_DirectorToMovie"("B");
