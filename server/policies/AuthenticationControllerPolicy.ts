const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(5).max(32).required(),
        email: Joi.string().email().required(),
        age: Joi.number().min(18).max(200).required(),
        password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')).required(),
        role: Joi.string().default("client").required(),
        god_father: Joi.array().items(Joi.string()).min(1).unique(),
        god_son: Joi.array().items(Joi.string()).single().optional(),
        address: Joi.object({
          street: Joi.string(),
          city: Joi.string(),
          postal_code: Joi.number()
        }).optional(),
        notification: Joi.object({
          time: Joi.string(),
          message: Joi.string()
        }).optional(),
        status: Joi.string().default("active").required(),
        description: Joi.string().optional(),
        schedule: Joi.object({
          start: Joi.string(),
          end: Joi.string()
        })
    });
    const {error} = schema.validate(req.body)

    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: `The username provided failed to match the following rules:
                <br>
                1. It must contain only alphanumeric characters
                <br>
                2. It must be at least 5 characters in length and not greater than 32 characters in length.
              `
            })
            break
        case 'age':
          res.status(400).send({
            error: 'You must provide a valid age'
          })
          break
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
              <br>
              1. It must contain ONLY the following characters: lower case, upper case, numerics.
              <br>
              2. It must be at least 8 characters in length and not greater than 32 characters in length.
            `
          })
          break
        case 'role':
          res.status(400).send({
            error: `you idiot`
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}