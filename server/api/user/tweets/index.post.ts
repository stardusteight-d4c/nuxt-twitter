import { formidable } from "formidable"
import type { Fields, Files } from "formidable"
import { createTweet } from "../../../db/tweets"
import { tweetTransformer } from "../../../transformers/tweet"
import { createMediaFile } from "../../../db/mediaFiles"

export default defineEventHandler(async (event) => {
  const form = formidable({})

  const response = await new Promise<{
    fields: Fields
    files: Files
  }>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err)
      }
      resolve({ fields, files })
    })
  })

  const { fields, files } = response

  const userId = event.context?.auth?.user?.id

  const tweetData = {
    text: fields.text[0],
    authorId: userId,
  }

  const tweet = await createTweet(tweetData)

  const filePromises = Object.keys(files).map(async (key) => {
    return await createMediaFile({
      url: "",
      providerPublicId: "random_id",
      userId,
      tweetId: tweet.id,
    })
  })

  await Promise.all(filePromises)

  return {
    // tweet: tweetTransformer(tweet),
    files,
  }
})
