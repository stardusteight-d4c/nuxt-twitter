import { User } from "@prisma/client"

export const userTransformer = (user: User): Omit<User, "password"> => {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    profileImage: user.profileImage,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}
