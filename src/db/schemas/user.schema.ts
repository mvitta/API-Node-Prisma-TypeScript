import Joi from 'joi'

const schemaUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
})

export default schemaUser
