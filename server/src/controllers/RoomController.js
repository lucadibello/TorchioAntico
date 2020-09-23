const { Room } = require('../models')

module.exports = {
  create (req, res) {
    // Add record to DB
    users.create({
      name: req.body.name,
      description: req.body.description,
    }).then((status) => {
      if (status) {
        res.send({ message: 'Room created successfully' })
      } else {
        res.status(400).send({
          error: 'There was an error during the creation process',
          _err: status  
        })
      }
    })
  }
}