import { formidable } from "formidable"
import type { Fields, Files } from "formidable"
import { createTweet } from "../../../db/tweets"
import { tweetTransformer } from "../../../transformers/tweet"
import { createMediaFile } from "../../../db/mediaFiles"
import { uploadToCloudnary } from "../../../utils/cloudinary"

interface IFiles {
  [key: string]: [
    {
      lastModifiedDate: Date
      filepath: string
      newFilename: string
      originalFilename: string
      mimetype: string
      hashAlgorithm: boolean
      size: number
      _writeStream: [WritableStream]
      hash: null
    }
  ]
}

export default defineEventHandler(async (event) => {
  const form = formidable({})

  const response = await new Promise<{
    fields: Fields
    files: IFiles
  }>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files: any) => {
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
    const file = files[key][0]
    const response = await uploadToCloudnary(file.filepath)


    console.log(response);
    
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
