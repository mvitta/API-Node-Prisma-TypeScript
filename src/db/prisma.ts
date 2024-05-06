import { PrismaClient } from '@prisma/client'
import schemaUser from '../db/schemas/user.schema'

/**
 * Prisma allows you to make custom validations
 * https://www.prisma.io/docs/orm/prisma-client/queries/custom-validation
 */

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ args, query }) {
        args.data.name = args.data.name?.replace('.', '')
        console.log(args)
        const { error, value } = schemaUser.validate(args.data)
        if (error) {
          throw error
        }
        args.data = value
        const user = await query(args)
        return user
      },
    },

    /**
     * If you want to add more validations
     * for the models and their queries, you can
     * add them below
     */
  },
})

/**
 * Validations can be done with middleware
 * before giving access to the routes
 */

export default prisma
