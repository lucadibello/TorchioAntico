const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  sample (req, res) {
    res.send(bcrypt.hashSync('root', 12))
  },
  getUser (req, res) {
    // Token saved in req.token
    jwt.verify(req.token, config.jwt.public_key, (err, user) => {
      if (err) {
        res.status(403).send({
          message: "Authorization token not valid"
        })
      } else {
        // Send back user information (truncate some useless values)
        res.send({
          name: user.name,
          surname: user.surname,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        })
      }
    })
  },
  login(req, res) {
    // Search user in User table (using it's username)
    User.findByPk(req.body.email).then((user) => {
      if (!user) {
        // User not found: send login error for privacy purpouses
        res.status(400).send({
          error: "Login failed",
          type: "ER_LOGIN_FAILED",
        });
      } else {
        bcrypt
          .compare(req.body.password, user.dataValues.password)
          .then((result) => {
            if (!result) {
              res.status(400).send({
                error: "Login failed",
                type: "ER_LOGIN_FAILED",
              });
            } else {
              // Generate JWT token for the logged user
              const jwt_token = jwt.sign(
                {
                  email: user.email,
                  name: user.name,
                  surname: user.surname,
                  createdAt: user.createdAt,
                  updatedAt: user.updatedAt
                },
                {
                  key: config.jwt.private_key,
                  passphrase: config.jwt.passphrase,
                },
                {
                  algorithm: "RS256",
                  expiresIn: "30m",
                }
              );

              // Send response
              res.send({
                message: "Logged in successfully",
                token: jwt_token
              });
            }
          });
      }
    });
  },
  isAlive (req, res) {
    // Read token
    const TOKEN = req.body.token

    // Check token
    if (TOKEN == null) {
      res.status(401).send({
          message: "Authorization token missing",
          type: "ER_JWT_MISSING"
      }) 
    } else {
      // Validate token using RSA Public Key
      jwt.verify(TOKEN, config.jwt.public_key, (err, user) => {
          if (err) {
            // Token dead (not valid)
            res.status(403).send({
              message: "Authorization token not valid",
              type: "ER_JWT_DEAD"
            })
          } else {
            // Send success message
            res.send({
              message: "Authorization token valid",
            })
          }  
      })
    }
  }
};
