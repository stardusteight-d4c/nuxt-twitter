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

interface CloudinaryResource {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  folder: string
  original_filename: string
  api_key: string
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

  let tweetData: any = {
    text: fields.text[0],
    authorId: userId,
  }

  const replyTo = fields.replyTo[0]


  if (replyTo && replyTo !== 'null') {
    tweetData.replyToId = replyTo
  }

  const tweet = await createTweet(tweetData)

  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key][0]
    const cloudinaryResource: CloudinaryResource = (await uploadToCloudnary(
      file.filepath
    )) as any


    return await createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId,
      tweetId: tweet.id,
    })
  })

  await Promise.all(filePromises)

  return {
    tweet: tweetTransformer(tweet),
  }
})
