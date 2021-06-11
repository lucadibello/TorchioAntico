const Joi = require('joi')

module.exports = {
  login(req, res, next) {
    // Define data schema
    const schema = Joi.object({
      email: Joi.string().email().required().error((errors) => new Error("L'email inserita non ha un formato valido")),
      password: Joi.string().required(),
    });

    // Validate data
    let result = schema.validate(req.body);

    // Check result
    if (result.error) {
      // Error found
      res.status(400).send({
        error: result.error.message
      });
    } else {
      // Validation success: pass to controller
      next()
    }
  },
  isAlive(req, res, next) {
    // Define data schema
    const schema = Joi.object({
      token: Joi.string().required()
    })

    // Validate data
    let result = schema.validate(req.body)

    // Check result
    if (result.error) {
      // Error found
      res.status(400).send({
        error: result.error.message
      });
    } else {
      // Validation success: pass to controller
      next()
    }
  }
}