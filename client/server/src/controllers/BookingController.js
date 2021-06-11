const { Booking, Room, Sequelize } = require("../models")

// Export operation class from Sequelize object
const Op = Sequelize.Op

module.exports = {
  get (req, res) {
    Booking.findAll({
      order: [
        ['booking_start_date', 'ASC'],
        ['booking_end_date', 'ASC']
      ]
    }).then((bookings) => {
      res.send(bookings)
    })
  },
  getStatistics (req, res) {
    // Group by month number + count bookings per month
    Booking.count({
      attributes: [
        [Sequelize.fn("month", Sequelize.col("updatedAt")), 'month']
      ],
      group: ['month']
    }).then((bookings) => {
      res.send(bookings)
    })
  },
  getMonthly (req, res) {
    Booking.findAll({
      order: [
        ['booking_start_date', 'ASC'],
        ['booking_end_date', 'ASC']
      ],
      where: [
        Sequelize.where(Sequelize.fn("month", Sequelize.col("updatedAt")), new Date().getMonth()+1)
      ]
    }).then((bookings) => {
      res.send(bookings)
    })
  },
  delete (req, res) {
    Booking.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => {
      if (result) {
        res.send({
          message: "Booking deleted successfully"
        })
      } else {
        res.status(400).send({
          error: "The specified booking does not exists (id: "+req.params.id+")",
          type: 'ER_BOOKING_NOT_FOUND',
          _err: result
        })
      }
    })
  },
  add (req, res) {
    Booking.create({
      client_name: req.body.client_name,
      client_surname: req.body.client_surname,
      client_email: req.body.client_email,
      client_phone: req.body.client_phone,
      client_address_country: req.body.address_country,
      client_address_city: req.body.address_city,
      client_address_street: req.body.address_street,
      client_address_housenumber: req.body.address_house_number,
      booking_start_date: req.body.booking_start_date,
      booking_end_date: req.body.booking_end_date,
      room_id: req.body.booking_room,
      total_price: req.body.total_price
    }).then((booking) => {
      if (!booking) {
        res.status(400).send({
          message: 'An error accurred during the booking process',
          _err: booking
        })
      } else {
        res.send({
          message: 'Booking registered correctly'
        })
      }
    })
  },
  getAvailables (req, res) {
    // Get start and end dates
    const START = req.params.start
    const END = req.params.end

    // Select all the used rooms in the timespan
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
      // Extract ids from dictionary
      const roomIds = booked_rooms.map(room => {
        return room.room_id
      })

      // Find all room id's not in the fetched list of the booked ones
      Room.findAll({
        where: {
          id: {[Op.notIn]: roomIds}
        }
      }).then((free_rooms) => {
        res.send(free_rooms)
      })
    })
  }
}