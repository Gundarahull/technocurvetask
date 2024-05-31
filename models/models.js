const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const PrLineItems = sequelize.define(
  "PrLineItems",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    suppliers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    custorgid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchaseRequestid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "PrLineItems" }
);

module.exports = PrLineItems;
