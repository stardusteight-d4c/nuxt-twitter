import { compare } from "bcrypt"
import { Login, getUserByUsername } from "../../db/users"
import { userTransformer } from "../../transformers/user"
import { generateTokens } from "../../utils/jwt"
import { createRefreshToken } from "../../db/refreshTokens"

export default defineEventHandler(async (event) => {
  const body: Login = await readBody(event)
  const { username, password } = body
  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid params",
      })
    )
  }
  const user = await getUserByUsername(username)
  const doesThePasswordMatch = user
    ? await compare(password, user?.password ?? "")
    : false
  if (!user || !doesThePasswordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or password is invalid",
      })
    )
  }
  const { accessToken, refreshToken } = generateTokens(user)

  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  })

  sendRefreshToken(event, refreshToken)
  return { user: userTransformer(user), access_token: accessToken }
})
