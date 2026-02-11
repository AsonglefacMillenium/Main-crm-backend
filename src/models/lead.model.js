// models/lead.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Lead = sequelize.define("Lead", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  source: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM(
      "NEW",
      "CONTACTED",
      "QUALIFIED",
      "PROPOSAL",
      "CONVERTED",
      "LOST"
    ),
    defaultValue: "NEW",
  },
  valueEstimate: DataTypes.FLOAT,
});

module.exports = Lead;
