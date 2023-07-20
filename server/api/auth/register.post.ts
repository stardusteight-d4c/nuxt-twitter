import { sendError } from "h3"
import { User, createUser } from "../../db/users"
import { userTransformer } from "../../transformers/user"

export default defineEventHandler(async (event) => {
  const body: User = await readBody(event)
  const { name, username, email, password, profileImage } = body
  if (!name || !username || !email || !password || !profileImage) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    )
  }
  const user = await createUser(body)
  return { user: userTransformer(user) }
})
