import Joi from 'joi'

const schemaUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  profile: Joi.object({
    create: Joi.object({
      bio: Joi.string().min(10).max(500),
    }),
  }),
})

/**
 * You can create validation schemas for your middleware, forms, or in this case for posts
 * and profiles. Additionally, you can use these same schemas in the Prisma client, as was
 * done with the create query for the User model.
 */

export default schemaUser
