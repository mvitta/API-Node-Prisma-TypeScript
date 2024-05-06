import { Request, Response, NextFunction } from 'express'

export default function validateKeys(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { body } = req
  const bodyKeys = Object.keys(body)
  const validKeys = ['name', 'email', 'bio']

  if (!bodyKeys.length) {
    res.json({ message: 'se requieren valores para crear un usuario' })
    return
  }

  if (!bodyKeys.includes(validKeys[0])) {
    res.json({ message: `falta el campo ${validKeys[0]}` })
    return
  }

  if (!bodyKeys.includes(validKeys[1])) {
    res.json({ message: `falta el campo ${validKeys[1]}` })
    return
  }

  for (let i = 0; i < bodyKeys.length; i++) {
    const key = bodyKeys[i]
    if (!validKeys.includes(key)) {
      res.json({ messahe: `el campo ${key} no es valido para el registro` })
      return
    }
  }
  next()
}
