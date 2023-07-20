import { prisma } from "."
import { hashSync } from "bcrypt"

export interface User {
  name: string
  username: string
  password: string
  email: string
  profileImage: string
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
