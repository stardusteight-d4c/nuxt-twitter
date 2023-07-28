import { getTweetById } from "../../db/tweets"
import { tweetTransformer } from "../../transformers/tweet"

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as any

  const tweet = await getTweetById(id, {
    include: {
      author: true,
      mediaFiles: true,
      replyTo: {
        include: {
          author: true,
        },
      },
      replies: {
        include: {
          author: true,
          replyTo: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  })

  return {
    tweet: tweetTransformer(tweet),
  }
})
