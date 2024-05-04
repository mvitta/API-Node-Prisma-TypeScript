import { PrismaClient } from '@prisma/client'
import schemaUser from '../db/schemas/user.schema'

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ args, query }) {
        //If all fields are correct, eject the query.prisma.user.create()
        const { error, value } = schemaUser.validate(args.data)
        if (error) {
          throw error
        }
        args.data = value
        const user = await query(args)
        return user
      },
    },
  },
})

export default prisma
