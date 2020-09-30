module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Booking', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      client_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      client_surname: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      client_email: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      client_phone: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      client_address_country: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      client_address_city: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      client_address_street: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      client_address_housenumber: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      booking_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      booking_end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      }
  },{
      tableName: 'booking'
  })
}