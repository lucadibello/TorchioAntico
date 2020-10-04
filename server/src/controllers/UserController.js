const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = {
  update(req, res) {
    const userData = {
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
    }

    // Get if there is already a user with same email
    User.findAll({
      where: {email: req.body.email}
    }).then(users => {
      if (users.length > 1) {
        // User with same E-Mail address already exists
        res.status(400).send({
          error: 'An user with the same email address already exists',
          type: 'ER_USER_EXISTS'
        })
      } else {
        // User not found -> Proceed with update
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
      }
    }).catch((err) => {
      console.log(err)
      // Unknown error
      res.status(400).send({
        error: "There was an error during the fetch process"
      })
    })
  },
  create (req, res) {
    // Crypt password using bCrypt algo
    const encryptedPassword = bcrypt.hashSync(req.body.password, 12)
    
    if (encryptedPassword) {
      // Add record to DB
      User.findOrCreate({
        defaults: { 
          email: req.body.email,
          name: req.body.name,
          surname: req.body.surname,
          password: encryptedPassword
        },
        where: { email: req.body.email }
      }).then(result => {
        let isCreated = result[1]

        if(isCreated){
          // User created
          res.send({message: "User created successfully"})
        }
        else{
          // User already exists
          res.status(400).send({
            message: "User already exists",
            type: 'ER_USER_EXISTS'
          })
        }
      });
    } else {
      res.status(400).send({
        error: "There was an error during the password crypt process"
      })
    }
  },
  get (req, res) {
    User.findAll({
      attributes: ['name', 'surname', 'email', 'createdAt', 'updatedAt']
    }).then((users) => {
      if (users) {
        res.send(users)
      } else {
        res.status(400).send({
          error: "There was an error during the fetch process"
        })
      }
    })
  },
  delete (req, res) {
    // Decrypt token
    if (req.user.email !== req.params.email) {
      User.destroy({
        where: {
          email: req.params.email
        }
      }).then((result) => {
        if (result) {
          res.send({
            message: "User deleted successfully"
          })
        } else {
          res.status(400).send({
            error: "The specified user does not exists (email: "+req.params.email+")"
          })
        }
      })
    } else {
      res.status(400).send({
        error: 'Non puoi eliminare l\'utente con cui hai eseguito l\'accesso'
      })
    }
  },
};
