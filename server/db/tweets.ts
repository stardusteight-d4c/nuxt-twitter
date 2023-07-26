import { prisma } from "."

export const createTweet = async (tweetData: any) => {
  return await prisma.tweet.create({
    data: tweetData,
  })
}
