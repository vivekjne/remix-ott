import type { Director } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Director } from "@prisma/client";

export function getDirectors() {
  return prisma.director.findMany({
    select: {
      photo: true,
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

export function getDirector({ id }: Pick<Director, "id">) {
  return prisma.director.findFirst({
    select: {
      id: true,
      name: true,
      description: true,
      movies: true,
      photo: true,
    },
    where: { id },
  });
}

export function createDirector({
  name,
  description,
  photo,
}: Pick<Director, "name" | "description" | "photo">) {
  return prisma.director.create({
    data: {
      name,
      description,
      photo,
    },
  });
}

export function deleteDirector({ id }: Pick<Director, "id">) {
  return prisma.director.delete({
    where: { id },
  });
}
