const { sequelize } = require("../database/db.config");
const { DataTypes } = require("sequelize");
const productList = require("../models/ProductList.model");

const payment = sequelize.define(
  "payment",
  {
    paymentMethod: {
      type: DataTypes.STRING,
    },
    trxId: {
      type: DataTypes.STRING,
    },
    WCORefnum: {
      type: DataTypes.STRING,
    },
    trxStatus: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.STRING,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "payment",
  }
);

productList.hasMany(payment, {
  foreignKey: "productId",
});
// productList.sync({ force: true });
// console.log("The table for the User model was just (re)created!");

module.exports = payment;
