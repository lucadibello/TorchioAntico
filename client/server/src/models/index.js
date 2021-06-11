const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../config");
const db = {};

// Conect to DB
const sequelize = new Sequelize(
  config.db.database_name,
  config.db.database_user,
  config.db.database_password,
  config.db.database_options
);

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    console.log("Loaded:", path.join(__dirname, file));
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// Setup foreign keys
db.Room.hasMany(db.Booking, {foreignKey: 'room_id'})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;