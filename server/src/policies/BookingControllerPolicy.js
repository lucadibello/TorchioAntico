const Joi = require('joi')
const { Booking, Sequelize } = require('../models')

const Op = Sequelize.Op
module.exports = {
  add (req, res, next) {
    // Define data schema
    const schema = Joi.object({
      /* CLIENT INFORMATION */
      address_city: Joi.string().required(),
      address_street: Joi.string().required(),
      address_country: Joi.string().required(),
      // Not required: DB allows NULL value
      address_house_number: Joi.string(),
      client_email: Joi.string().email().required(),
      client_name: Joi.string().required(),
      client_phone: Joi.string().required(),
      client_surname: Joi.string().required(),

      /* BOOKING INFORMATION */
      booking_end_date: Joi.date().required(),
      booking_start_date: Joi.date().required(),
      // Allow string or number
      booking_room: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
      number_of_people: Joi.number().min(1).required(),
      total_price: Joi.number().required()
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
      // Check if room is valid
      const START = req.body.booking_start_date
      const END = req.body.booking_end_date

      // Get all booked room in the specified timespan
      Booking.findAll({
        attributes: ['room_id'],
        where: {
          [Op.or]: [{
            // Case 1
            [Op.and]: [
              { 
                booking_start_date: {
                  [Op.gte]: START
                }
              },
              { 
                booking_end_date: {
                  [Op.lte]: END
                }
              }
            ]
          }, 
          {
            // Case 2
            [Op.and]: [
              { 
                booking_start_date: {
                  [Op.gte]: START
                }
              },
              { 
                booking_start_date: {
                  [Op.lte]: END
                }
              },
              { 
                booking_end_date: {
                  [Op.gte]: END
                }
              }
            ]
          },
          {
            // Case 3
            [Op.and]: [
              { 
                booking_start_date: {
                  [Op.lte]: START
                }
              },
              { 
                booking_end_date: {
                  [Op.gte]: START
                }
              },
              { 
                booking_end_date: {
                  [Op.lte]: END
                }
              }
            ],
          },
          {
            // Case 4
            [Op.and]: [
              { 
                booking_start_date: {
                  [Op.lte]: START
                }
              },
              { 
                booking_end_date: {
                  [Op.gte]: END
                }
              }
            ]
          }]
        },
        raw: true
      }).then((booked_rooms) => {
        // Check if selected room is not in the list
        
        // Extract ids from dictionary
        const roomIds = booked_rooms.map(room => {
          return room.room_id
        })

        if (!roomIds.includes(req.body.booking_room)){
          // Room id is valid, proceed to controller
          next()
        } else {
          // Room is already taken
          res.status(400).send({
            message: 'The selected room is not available in the specified time span',
            type: 'ER_ROOM_UNAVAILABLE'
          })
        }
      })
    }
  },
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