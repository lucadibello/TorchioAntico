const Joi = require('joi')

module.exports = {
  create (req, res, next) {
    // Define data schema
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
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