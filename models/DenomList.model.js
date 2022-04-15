const { sequelize } = require("../database/db.config");
const { DataTypes } = require("sequelize");
const productList = require("../models/ProductList.model");

const denomList = sequelize.define(
  "denomList",
  {
    denomName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "denomList",
  }
);

productList.hasMany(denomList, {
  foreignKey: "productId",
});

// productList.sync({ force: true });
// console.log("The table for the User model was just (re)created!");

module.exports = denomList;
