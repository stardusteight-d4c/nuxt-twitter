import { removeRefreshToken } from "../../db/refreshTokens"
import { sendRefreshToken } from "../../utils/jwt"

export default defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, "refresh_token")
    await removeRefreshToken(refreshToken!)
  } catch (error) {
    console.error(error)
  }
  sendRefreshToken(event, null)
  return { message: "Done" }
})
