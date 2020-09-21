const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");

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
};
