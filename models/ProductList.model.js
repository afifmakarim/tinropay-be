const { sequelize } = require("../database/db.config");
const { DataTypes } = require("sequelize");

const productList = sequelize.define(
  "productList",
  {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slugName: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "productList",
  }
);

// productList.sync({ force: true });
// console.log("The table for the User model was just (re)created!");

module.exports = productList;
