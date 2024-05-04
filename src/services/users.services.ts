import prisma from '../db/prisma'
import { User } from '../types/types'

export async function createUser(data: User) {
  const user = await prisma.user.create({
    data,
  })
  return user
}

export async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}

export async function getAllUsersWithPost() {
  const users = await prisma.user.findMany({ include: { posts: true } })
  return users
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
