import express from 'express'
import { StatusCodes } from 'http-status-codes'
import findUser from '../middlewares/findUser.middleware'
import { Post } from '../types/types'
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from '../services/posts.services'

const router = express.Router()

/**
 * you can create middleware to check requests before
 * they enter the router, as was done with the user router
 */

router.post('/createpost', findUser, async (req, res) => {
  try {
    const thePost: Post = req.body
    const post = await createPost(thePost)
    res.status(StatusCodes.CREATED).json(post)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

router.get('/getallposts', async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.status(StatusCodes.OK).json({ posts })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

router.delete('/deletepost/:id', async (req, res) => {
  try {
    const { id } = req.params
    const post_deleted = await deletePost(id)
    res.status(StatusCodes.OK).json({
      post_deleted,
      message: `the post: ${post_deleted.title}. successfully deleted`,
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

router.patch('/updatepost/:id', async (req, res) => {
  try {
    const {
      body,
      params: { id },
    } = req
    const data: Partial<Post> = body
    const post_update = await updatePost(id, data)
    res.status(StatusCodes.OK).json({ post_update, message: 'post update' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
})

export default router
//PROBAR ENVIAR UN ARCHIVO ESTATICO PARA LOS ERRORES
