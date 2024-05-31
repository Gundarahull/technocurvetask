const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const VendorUsers = sequelize.define(
  "VendorUsers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vendorOrganizationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserName: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "VendorUsers" }
);

module.exports = VendorUsers;
