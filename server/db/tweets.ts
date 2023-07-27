import { prisma } from "."

export const createTweet = async (tweetData: any) => {
  return await prisma.tweet.create({
    data: tweetData,
  })
}

export const getTweets = async (params = {}) => {
  return prisma.tweet.findMany({
    ...params,
  })
}
