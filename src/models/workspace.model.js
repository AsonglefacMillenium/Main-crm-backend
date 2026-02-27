// models/workspace.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Workspace = sequelize.define("Workspace", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inviteCode: {
    type: DataTypes.STRING,
    unique: true,
  },
});

Workspace.associate = (models) => {
  Workspace.hasMany(models.Department, {
    foreignKey: "WorkspaceId",
  });
  Workspace.belongsToMany(models.User, {
    through: models.UserWorkspace,
    foreignKey: "WorkspaceId",
  });
  

};  

module.exports = Workspace;
