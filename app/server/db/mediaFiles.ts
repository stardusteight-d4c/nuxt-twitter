import { prisma } from "."

export const createMediaFile = async (mediaFile: any) => {
  return await prisma.mediaFile.create({
    data: mediaFile,
  })
}
