interface SignUpData {
  name: string
  username: string
  profileImage: string
  email: string
  password: string
  confirmPassword: string
  loading: boolean
}

export function useSignUp() {
  function validateSignUpData(data: SignUpData) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const whitespaceRegex = /\s/
    const removeExtraSpaces = (str: string) => {
      str = str.replace(/\s+/g, " ")
      return str.trim()
    }
    const processedData = {
      name: removeExtraSpaces(data.name),
      username: removeExtraSpaces(data.username),
      email: removeExtraSpaces(data.email),
      profileImage: removeExtraSpaces(data.profileImage),
      password: removeExtraSpaces(data.password),
      confirmPassword: removeExtraSpaces(data.confirmPassword),
    }
    if (processedData.password !== processedData.confirmPassword) {
      alert("passwords do not match")
      return false
    }
    if (processedData.name.length < 3 || processedData.name.length >= 20) {
      alert("the name must be between 3 to 20 characters")
      return false
    }
    if (whitespaceRegex.test(processedData.username)) {
      alert("username cannot contain spaces")
      return false
    }
    if (
      processedData.username.length < 3 ||
      processedData.username.length > 13
    ) {
      alert("the username must be between 3 to 13 characters")
      return false
    }
    if (!emailRegex.test(processedData.email)) {
      alert("enter a valid email")
      return false
    }
    return true
  }

  function signup(
    signUpData: SignUpData,
    loginType: globalThis.Ref<"signup" | "signin">
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        if (validateSignUpData(signUpData)) {
          await $fetch("/api/auth/signup", {
            method: "POST",
            body: {
              name: signUpData.name,
              username: signUpData.username,
              email: signUpData.email,
              profileImage: signUpData.profileImage,
              password: signUpData.password,
            },
          })
          loginType.value = "signin"
          resolve(true)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    signup,
  }
}
