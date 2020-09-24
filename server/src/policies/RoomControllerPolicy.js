const Joi = require('joi')

module.exports = {
  createUpdate (req, res, next) {
    if (req.body.description == '') req.body.description = null

    // Define data schema
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().allow(null),
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