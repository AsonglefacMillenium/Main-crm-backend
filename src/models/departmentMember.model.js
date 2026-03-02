const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DepartmentMember = sequelize.define("DepartmentMember", {
  DepartmentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Departments",
      key: "id",
    },
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: "member",
  },
});

DepartmentMember.associate = (models) => {
  DepartmentMember.belongsTo(models.Department, {
    foreignKey: "DepartmentId", 
    onDelete: "CASCADE",
  });
  DepartmentMember.belongsTo(models.User, {     
    foreignKey: "UserId",
    onDelete: "CASCADE",
  });
}

module.exports = DepartmentMember;

// module.exports = (sequelize, DataTypes) => {
//   const DepartmentMember = sequelize.define(
//     "DepartmentMember",
//     {
//       DepartmentId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//           model: "Departments",
//           key: "id",
//         },
//       },
//       UserId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//           model: "Users",
//           key: "id",
//         },
//       },
//       role: {
//         type: DataTypes.STRING,
//         defaultValue: "member",
//       },
//     },
//     {
//       tableName: "DepartmentMembers",
//     }
//   );

//   return DepartmentMember;
// };
