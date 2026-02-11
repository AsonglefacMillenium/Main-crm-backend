// models/client.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Contact = sequelize.define("Client", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  company: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM("NEW", "CONTACTED", "QUALIFIED", "LOST", "WON"),
    defaultValue: "NEW",
  },
});

module.exports = Contact;
