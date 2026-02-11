// models/activity.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Activity = sequelize.define("Activity", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM("CALL", "EMAIL", "MEETING", "NOTE"),
  },
  description: DataTypes.TEXT,
});

module.exports = Activity;
