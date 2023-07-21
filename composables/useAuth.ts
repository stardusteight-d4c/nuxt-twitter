import { User } from "@prisma/client"

interface LoginData {
  username: string
  password: string
}

export default () => {
  const useAuthToken = () => useState("auth_token")
  const useAuthUser = () => useState("auth_user")

  const setToken = (newToken: string) => {
    const authToken = useAuthToken()
    authToken.value = newToken
  }

  const setUser = (newUser: Omit<User, "password">) => {
    const authUser = useAuthUser()
    authUser.value = newUser
  }

  const login = ({ username, password }: LoginData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        })
        setToken(data.access_token)
        setUser(data.user as unknown as Omit<User, "password">)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh")
        setToken(data.access_token)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/user')
        setUser(data.user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await refreshToken()
        await getUser()
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  return { login, useAuthUser, useAuthToken, initAuth }
}
