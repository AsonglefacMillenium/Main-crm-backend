// models/task.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  priority: {
    type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),
    defaultValue: "MEDIUM",
  },
  status: {
    type: DataTypes.ENUM("TODO", "IN_PROGRESS", "DONE"),
    defaultValue: "TODO",
  },
  dueDate: DataTypes.DATE,
});

module.exports = Task;
