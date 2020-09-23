module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Room', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
  },{
      tableName: 'room'
  })
}