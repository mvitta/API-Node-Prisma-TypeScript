export interface User {
  bio: string
  name: string
  email: string
  readonly id: number
}

export interface Post {
  title: string
  content: string
  email: string
}

export interface ParamsDelete {
  userID: number
}
