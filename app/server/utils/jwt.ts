import { User } from "@prisma/client"
// @ts-ignore
import jwt from "jsonwebtoken"

const config = useRuntimeConfig()

const generateAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
    expiresIn: "10m",
  })
}

const generateRefreshToken = (user: User) => {
  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: "4h",
  })
}

export const decodeRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret)
  } catch (error) {
    return null
  }
}

export const decodeAccessToken = (token: string) => {
  try {
    return jwt.verify(token, config.jwtAccessSecret)
  } catch (error) {
    return null
  }
}

export const generateTokens = (user: User) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  }
}

export const sendRefreshToken = (event: any, token: string | null) => {
  setCookie(event, "refresh_token", String(token), {
    httpOnly: true,
    sameSite: true,
  })
}
