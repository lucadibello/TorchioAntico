const Joi = require('joi')

module.exports = {
  update(req, res, next) {
    // Define data schema
    const schema = Joi.object({
      email: Joi.string().email().required(),
      name: Joi.string().required().min(1),
      surname: Joi.string().required().min(1),
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
  create (req, res, next) {
    // Define data schema
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(3),
      name: Joi.string().required().min(1),
      surname: Joi.string().required().min(1),
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
  }
}