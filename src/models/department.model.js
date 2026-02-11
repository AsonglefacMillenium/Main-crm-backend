// models/department.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Department = sequelize.define("Department", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
});

module.exports = Department;
