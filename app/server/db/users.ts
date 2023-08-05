import { prisma } from "."
import { hashSync } from "bcrypt"

export interface User {
  name: string
  username: string
  password: string
  email: string
  profileImage: string
}

export interface SigIn {
  username: string
  password: string
}

export const createUser = async (input: User) => {
  const handledInput = {
    ...input,
    password: hashSync(input.password, 10),
  }
  return await prisma.user.create({
    data: handledInput,
  })
}

export const getUserByUsername = async (input: string) => {
  return prisma.user.findUnique({
    where: {
      username: input,
    },
  })
}

export const getUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
  })
}
