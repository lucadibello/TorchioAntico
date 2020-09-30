const Joi = require('joi')

module.exports = {
  getAvailables (req, res, next) {
    // Define data schema
    const schema = Joi.object({
      start: Joi.date().required(),
      end: Joi.date().required(),
    });

    // Validate data
    let result = schema.validate(req.params);

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