 interface ITweet {
  id: string
  text: string
  mediaFiles: any[]
  author: {
    id: string
    name: string
    username: string
    email: string
    profileImage: string
    handle: string
    createdAt: Date
    updatedAt: Date
  }
  replies: any[]
  replyTo: string | null
  repliesCount: number
  postedAtHuman: string
}
