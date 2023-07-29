export default () => {
  const usePostTweetModal = () => useState("post_tweet_modal", () => false)
  const useReplyTweet: any = () => useState("reply_tweet", () => null)

  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModal()
    postTweetModal.value = false
  }

  const setReplyTo = (tweet: any) => {
    const replyTweet = useReplyTweet()
    replyTweet.value = tweet
  }

  const openPostTweetModal = (tweet: any = null) => {
    const postTweetModal = usePostTweetModal()
    postTweetModal.value = true
    setReplyTo(tweet)
  }

  const postTweet = (formData: {
    text: string
    mediaFiles: [File]
    replyTo: any
  }) => {
    const form = new FormData()
    form.append("text", formData.text)
    form.append("replyTo", formData.replyTo)

    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append("media_file_" + index, mediaFile)
    })

    return useFetchApi("/api/user/tweets", {
      method: "POST",
      body: form,
    })
  }

  const getTweets = (params: any = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi("/api/tweets", {
          method: "GET",
          params,
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  const getTweetById = (tweetId: string) => {
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
    getTweets,
    getTweetById,
    closePostTweetModal,
    openPostTweetModal,
    useReplyTweet,
    usePostTweetModal,
  }
}
