import { getUserById } from "../db/users"

export default defineEventHandler(async (event) => {
  const endpoints = ["/api/auth/user", "/api/user/tweets"]

  const isHandledByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new RegExp(
      "^" + endpoint.replace(/\//g, "\\/").replace(/:\w+/g, "(\\w+)") + "$"
    )
    return pattern.test(event.path)
  })

  if (!isHandledByThisMiddleware) {
    return
  }

  const authToken = getHeader(event, "Authorization")?.split(" ")[1]
  const decoded = decodeAccessToken(authToken!)
  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      })
    )
  }
  try {
    const userId = decoded.userId
    const user = await getUserById(userId)
    event.context.auth = { user }
  } catch (error) {
    return
  }
})
