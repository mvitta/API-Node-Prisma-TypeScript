import express from 'express'
import { StatusCodes } from 'http-status-codes'
import findUser from '../middlewares/findUser.middleware'
import prisma from '../db/prisma'

const router = express.Router()

/**
 * you can create middleware to check requests before
 * they enter the router, as was done with the user router
 */

router.post('/create_bio/:id', findUser, async (req, res) => {
  try {
    const {
      body: { bio },
      params: { id },
    } = req

    const profile = await prisma.profile.create({
      data: {
        bio,
        user: { connect: { id: parseInt(id) } },
      },
      include: { user: true },
    })
    res.json({ profile })
  } catch (error) {
    res.status(StatusCodes.CREATED).json({ error })
  }
})

router.get('/getallbios', async (req, res) => {
  try {
    const bios = await prisma.profile.findMany({
      include: { user: true },
      orderBy: { user: { name: 'asc' } },
    })
    res.status(StatusCodes.OK).json({ bios })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

router.patch('/update_bio/:id', async (req, res) => {
  try {
    const {
      body: { bio },
      params: { id },
    } = req

    const update_bio = await prisma.profile.update({
      where: { id: parseInt(id) },
      data: { bio },
      include: {
        user: true,
      },
    })

    res.json({ update_bio, message: 'bio update' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

router.delete('/delete_bio/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const bio_deleted = await prisma.profile.delete({
      where: {
        id,
      },
      include: { user: true },
    })
    const user_name = bio_deleted.user?.name ?? ''
    res.status(StatusCodes.OK).json({
      bio_deleted,
      message: `the bio of the user ${user_name} successfully delete`,
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

export default router
