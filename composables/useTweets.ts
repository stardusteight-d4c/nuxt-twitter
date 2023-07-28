export default () => {
  const postTweet = (formData: { text: string; mediaFiles: [File] }) => {
    const form = new FormData()
    form.append("text", formData.text)

    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append("media_file_" + index, mediaFile)
    })

    return useFetchApi("/api/user/tweets", {
      method: "POST",
      body: form,
    })
  }

  const getHomeTweets = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi("/api/tweets", {
          method: "GET",
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  const getTweetById =(tweetId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/tweets/${tweetId}`, {
          method: "GET",
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    postTweet,
    getHomeTweets,
    getTweetById
  }
}
