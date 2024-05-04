import { Response, Request, NextFunction } from 'express'
import prisma from '../db/prisma'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export default async function findUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    res
      .json({
        message: ReasonPhrases.NOT_FOUND,
        description: `the user ${email} has not been contacted`,
      })
      .status(StatusCodes.NOT_FOUND)
    return
  }
  next()
}
