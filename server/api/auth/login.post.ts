export default defineEventHandler(async (event) => {
  interface LoginRequest {
    username: string
    password: string
  }
  const body: LoginRequest = await readBody(event)
  const { username, password } = body
})
