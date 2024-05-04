import express from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getAllUsersWithPost,
} from '../services/users.services'
import validateID from '../middlewares/IDvalidate.middleware'
import validateKeys from '../middlewares/userValidateKeys.middleware'
import prisma from '../db/prisma'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

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
    const users = await getAllUsers()
    res.status(StatusCodes.OK).json({ users })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

router.get('/getalluserswithposts', async (req, res) => {
  try {
    const users = await getAllUsersWithPost()
    res.status(StatusCodes.OK).json({ users })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

router.delete('/delete/:userID', validateID, async (req, res) => {
  try {
    const { userID } = req.params
    const id = parseInt(userID)
    const user_delete = await deleteUser(id)
    res.status(StatusCodes.OK).json({
      user_delete,
      message: `the user ${user_delete} successfully deleted`,
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
