import express from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from '../services/users.services'
import validateID from '../middlewares/IDvalidate.middleware'
import validateKeys from '../middlewares/userValidateKeys.middleware'
import { StatusCodes } from 'http-status-codes'
import prisma from '../db/prisma'

const router = express.Router()

/**
 * The user must have an email and a name
 * at least, they can create a bio later
 */

router.post('/create', validateKeys, async (req, res) => {
  try {
    const { body } = req
    const user = await createUser(body)
    res.status(StatusCodes.CREATED).json({ user })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

router.get('/getallusers', async (req, res) => {
  try {
    const records = await getAllUsers()
    res.status(StatusCodes.OK).json({ records })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

router.delete('/delete/:userID', validateID, async (req, res) => {
  try {
    const {
      body,
      params: { userID },
    } = req
    const id = parseInt(userID)

    const content = Object.keys(body)

    if (content.includes('ids')) {
      let users_deleted = {}
      if (Array.isArray(body['ids'])) {
        users_deleted = await prisma.user.deleteMany({
          where: {
            id: {
              in: body['ids'],
            },
          },
        })
      }
      res.json({ users_deleted, message: 'users deleted' })
      return
    }

    const user_delete = await deleteUser(id)
    res.status(StatusCodes.OK).json({
      user_delete,
      message: `the user ${user_delete.name} successfully deleted`,
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

router.patch('/update/:userID', validateID, async (req, res) => {
  try {
    const {
      body,
      params: { userID },
    } = req

    const id = parseInt(userID)
    const user_update = await updateUser(id, body)

    res.status(StatusCodes.OK).json({ user_update, message: `user update` })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

export default router
