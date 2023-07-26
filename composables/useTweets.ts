export default () => {
  const postTweet = (formData: { text: string }) => {
    const form = new FormData()
    form.append("text", formData.text)

    return useFetchApi("/api/user/tweets", {
      method: "POST",
      body: form,
    })
  }
  return {
    postTweet,
  }
}
