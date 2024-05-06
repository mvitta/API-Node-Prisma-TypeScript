import { Response, Request, NextFunction } from 'express'
import prisma from '../db/prisma'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export default async function findUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
    if (!user) {
      res
        .json({
          message: ReasonPhrases.NOT_FOUND,
          description: `the user with ID ${id} has not been contacted`,
        })
        .status(StatusCodes.NOT_FOUND)
      return
    }
    next()
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}
