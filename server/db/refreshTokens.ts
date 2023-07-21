import { prisma } from "."

export const createRefreshToken = (refreshToken: {
  token: string
  userId: string
}) => {
  return prisma.refreshToken.create({
    data: refreshToken,
  })
}

export const getRefreshTokenByToken = async (token: string) => {
  return await prisma.refreshToken.findUnique({
    where: {
      token,
    },
  })
}

export const removeRefreshToken = (token: string) => {
  return prisma.refreshToken.delete({
    where: {
      token: token,
    },
  })
}
