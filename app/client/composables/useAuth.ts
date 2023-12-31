import { User } from "@prisma/client"
import jwt_decode from "jwt-decode"

interface LoginData {
  username: string
  password: string
}

export default () => {
  const useAuthToken = () => useState("auth_token")
  const useAuthUser = () => useState("auth_user")
  const useAuthLoading = () => useState("auth_loading", () => true)

  const setToken = (newToken: string | null) => {
    const authToken = useAuthToken()
    authToken.value = newToken
  }

  const setUser = (newUser: Omit<User, "password"> | null) => {
    const authUser = useAuthUser()
    authUser.value = newUser
  }

  const setIsAuthLoading = (newLoading: boolean) => {
    const authLoading = useAuthLoading()
    authLoading.value = newLoading
  }

  const signin = ({ username, password }: LoginData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/signin", {
          method: "POST",
          body: {
            username,
            password,
          },
        })
        setToken(data.access_token)
        setUser(data.user as unknown as Omit<User, "password">)
        resolve(true)
        navigateTo({
          path: "/"
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi("/api/auth/logout", {
          method: "POST",
        })
        setToken(null)
        setUser(null)
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
        const data = await useFetchApi("/api/auth/user")
        setUser(data.user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const reRefreshAccessToken = async () => {
    const authToken = useAuthToken().value as string
    if (!authToken) {
      return
    }
    const jwt: any = jwt_decode(authToken)
    const newRefreshTime = jwt.exp - 60000
    setTimeout(async () => {
      await refreshToken()
      await reRefreshAccessToken()
    }, newRefreshTime)
  }

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsAuthLoading(true)
      try {
        await refreshToken()
        await getUser()
        await reRefreshAccessToken()
        resolve(true)
      } catch (error) {
        reject(error)
      } finally {
        setIsAuthLoading(false)
      }
    })
  }

  return { signin, logout, useAuthUser, useAuthToken, useAuthLoading, initAuth }
}
