import type { Genre } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Genre } from "@prisma/client";

export function getGenres() {
  return prisma.genre.findMany({
    select: {
      _count: true,
      createdAt: true,
      description: true,
      id: true,
      movies: false,
      name: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export function getGenre({ id }: Pick<Genre, "id">) {
  return prisma.genre.findFirst({
    select: { id: true, name: true, description: true },
    where: { id },
  });
}

export function createGenre({ name }: Pick<Genre, "name">) {
  return prisma.genre.create({
    data: {
      name,
    },
  });
}

export function deleteGenre({ id }: Pick<Genre, "id">) {
  return prisma.genre.delete({
    where: { id },
  });
}
