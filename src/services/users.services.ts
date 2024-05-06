import prisma from '../db/prisma'
import { User } from '../types/types'

export async function createUser({ bio, ...res }: User) {
  const user = await prisma.user.create({
    data: { ...res, profile: { create: { bio } } },
    include: { profile: true },
  })
  return user
}

export async function getAllUsers() {
  const users = await prisma.user.findMany({
    include: { profile: true, posts: true },
    orderBy: {
      id: 'asc',
    },
  })
  const count = await prisma.user.count()
  return { users, total: count }
}

export async function deleteUser(id: number) {
  const userDelete = await prisma.user.delete({
    where: {
      id,
    },
  })
  return userDelete
}

export async function updateUser(id: number, values: Partial<User>) {
  const updateUser = await prisma.user.update({
    where: {
      id,
    },
    data: values,
  })
  return updateUser
}
