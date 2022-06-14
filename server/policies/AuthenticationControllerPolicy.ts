const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(5).max(32).required(),
        email: Joi.string().email(),
        age: Joi.number().min(18).max(200),
        password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
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