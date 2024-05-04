import { Request, Response, NextFunction } from 'express'

const CHARACTER_LIMIT = 5

/**
 *
 * @param req the incoming request
 * @param res the response of the server
 * @param next if no error occurs pass the route /update/:userID o /delete/:userID
 * @returns void
 * validate the length of the userID and if the userID is a valid number
 */
export default function validateID(
  req: Request<{ userID: string }>,
  res: Response,
  next: NextFunction
) {
  const { userID } = req.params
  if (!(userID.length <= CHARACTER_LIMIT)) {
    res.json({ message: 'la longitud del id demasiado grande' })
  }

  for (let i = 0; i < userID.length; i++) {
    const ch = parseInt(userID[i])
    console.log(ch)

    if (!ch) {
      return res.json({ message: 'el id no es un numero valido' })
    }
  }

  next()
}
