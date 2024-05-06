import prisma from '../db/prisma'
import { Post } from '../types/types'

/**
 *
 * it must receive an email to assign the post to a user
 * @param post receive a post with the content, title and email
 * @returns post return
 */
export async function createPost({ content, email, title }: Post) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  const post = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { id: user?.id } },
      published: true,
    },
  })

  return post
}

export async function getAllPosts() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: {
      createdAt: 'asc',
    },
  })
  return posts
}

export async function deletePost(id: string) {
  const post_deleted = await prisma.post.delete({
    where: { id: parseInt(id) },
    include: { author: true },
  })
  return post_deleted
}

export async function updatePost(id: string, data: Partial<Post>) {
  const post_update = await prisma.post.update({
    where: { id: parseInt(id) },
    data,
    include: { author: true },
  })
  return post_update
}
