const { Booking, Room, Sequelize } = require("../models")

// Export operation class from Sequelize object
const Op = Sequelize.Op

module.exports = {
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