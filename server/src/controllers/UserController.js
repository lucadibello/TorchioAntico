const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = {
  update(req, res) {
    const userData = {
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
    }

    // Upadte user
    User.update(
      userData,
      { where: { email: req.params.email } }
    ).then((result) => {
      // Check result status
      if (result) {
        // User updated
        res.send({
          message: "User information updated successfully",
          user: userData
        });
      } else {
        // Cannot update user
        res.status(400).send({
          error:
            "The specified user does not exists (email: " +
            req.params.email +
            ")",
        });
      }
    });
  },
  create (req, res) {
    // Crypt password using bCrypt algo
    const encryptedPassword = bcrypt.hashSync(req.body.password, 12)
    
    if (encryptedPassword) {
      // Add record to DB
      User.create({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        password: encryptedPassword
      }).then((status) => {
        if (status) {
          res.send({ message: 'User created successfully' })
        } else {
          res.status(400).send({
            error: 'There was an error during the user creation process',
            _err: status  
          })
        }
      })
    } else {
      res.status(400).send({
        error: "There was an error during the password crypt process"
      })
    }
  }
};
