import { getRefreshTokenByToken } from "../../db/refreshTokens"
import { decodeRefreshToken, generateTokens } from "../../utils/jwt"
import { getUserById } from "../../db/users"
import { User } from "@prisma/client"

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refresh_token")
  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      })
    )
  }
  
  const rToken = await getRefreshTokenByToken(refreshToken)
  if (!rToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Refresh token is invalid",
      })
    )
  }
  const token = decodeRefreshToken(refreshToken)
  try {
    const user = await getUserById(token.userId)
    const { accessToken } = generateTokens(user as unknown as User)
    return { access_token: accessToken }
  } catch (error) {
    createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    })
  }
})
