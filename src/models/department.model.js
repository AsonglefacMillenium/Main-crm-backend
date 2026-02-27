// models/department.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");

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

Department.associate = (models) => {
 
  Department.belongsTo(models.Workspace, {
    foreignKey: "WorkspaceId",
    allowNull: false,
    onDelete: "CASCADE",
  });
  Department.belongsToMany(models.User, {
    through: models.DepartmentMember,
    foreignKey: "DepartmentId",
    otherKey: "UserId",
  });
};

module.exports = Department;
