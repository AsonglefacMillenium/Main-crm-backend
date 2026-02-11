// models/product.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
  status: {
    type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
    defaultValue: "ACTIVE",
  },
});

module.exports = Product;
