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

export const getTweetById = async (tweetId: string, params: any = {}) => {
  return prisma.tweet.findUnique({
    ...params,
    where: {
      ...params.where,
      id: tweetId,
    },
  })
}
