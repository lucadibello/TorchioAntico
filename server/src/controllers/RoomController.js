const { Room } = require('../models')

module.exports = {
  create (req, res) {
    // Add record to DB
    Room.create({
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
  },
  get (req, res) {
    Room.findAll().then((rooms) => {
      if (rooms) {
        // Send users back
        res.send(rooms)
      } else {
        res.status(400).send({
          error: 'There was an error during the fetch process',
          _err: rooms  
        })
      }
    })
  },
  delete (req, res) {
    Room.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => {
      if(result){
        res.send({
          message: "Room deleted successfully"
        })
      }
      else{
        res.status(400).send({
          error: "The specified room does not exists (id: "+req.params.id+")"
        })
      }
    })
  },
  update (req, res) {
    Room.update(
      { 
        name: req.body.name,
        description: req.body.description,
      },
      { where: { id: req.params.id }}
    ).then((result) => {
      if(result[0]){
        res.send({
          message: "Room information updated successfully"
        })
      }
      else{
        res.status(400).send({
          error: "The specified room does not exists (id: "+req.params.id+")"
        })
      }
    })
  }
}