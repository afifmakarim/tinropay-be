const productList = require("../models/ProductList.model");
const denomList = require("../models/DenomList.model");
const { log_error, log_info } = require("../utils/log");

const createProduct = async (req, res) => {
  const { productName, slugName, imageUrl, category } = req.body;
  try {
    const product = await productList.create({
      productName,
      slugName,
      imageUrl,
      category,
    });
    console.log("product's auto-generated ID:", product.id);
    res.status(200).send({ responseCode: "00", id: product.id });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createDenom = async (req, res) => {
  const { denomName, amount, productId } = req.body;
  try {
    const payload = { denomName, amount, productId };
    const denom = await denomList.create(payload);
    console.log("denom's auto-generated ID:", denom.id);
    res.status(200).send({ responseCode: "00", id: denom.id });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getDenomById = async (req, res) => {
  const { productId } = req.params;
  try {
    const denom = await denomList.findAll({
      attributes: ["denomName", "amount", "productId"],
      where: { productId: productId },
    });

    if (!denom) {
      const response = { status: "05", message: "failed to get denom data" };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const response = {
      responseCode: "00",
      message: "success",
      data: denom,
    };

    log_info(req.method, response);
    res.status(200).send(response);
  } catch (error) {
    const response = { status: "99", message: error };
    log_error(req.method, response);
    res.status(500).send(response);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productList.findAll({
      attributes: [
        "id",
        "productName",
        "slugName",
        "imageUrl",
        "category",
        "isPopular",
      ],
    });

    if (!products) {
      const response = { status: "05", message: "failed to get product data" };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const response = {
      responseCode: "00",
      message: "success",
      data: products,
    };

    log_info(req.method, response);
    res.status(200).send(response);
  } catch (error) {
    const response = { status: "99", message: error };
    log_error(req.method, response);
    res.status(500).send(response);
  }
};

const getProductDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productList.findOne({
      attributes: ["productName", "slugName", "imageUrl", "category"],
      where: { id },
    });

    const denom = await denomList.findAll({
      attributes: ["denomName", "amount", "productId"],
      where: { productId: id },
    });

    const paymentMethod = ["LinkAja", "Qris", "GoPay"];

    if (!product) {
      const response = { status: "05", message: "failed to get product data" };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    if (!denom) {
      const response = { status: "05", message: "failed to get denom data" };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const response = {
      responseCode: "00",
      message: "success",
      data: {
        ...product.dataValues,
        denomList: denom,
        paymentMethodList: paymentMethod,
      },
    };

    log_info(req.method, response);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    const response = { status: "99", message: error };
    log_error(req.method, response);
    res.status(500).send(response);
  }
};

const getProductsByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await productList.findAll({
      attributes: ["id", "productName", "slugName", "imageUrl", "category"],
      where: { category: id },
    });

    if (!products) {
      const response = { status: "05", message: "failed to get product data" };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const response = {
      responseCode: "00",
      message: "success",
      data: products,
    };

    log_info(req.method, response);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    const response = { status: "99", message: error };
    log_error(req.method, response);
    res.status(500).send(response);
  }
};

const getProductBySlugName = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productList.findOne({
      attributes: [
        "id",
        "productName",
        "slugName",
        "imageUrl",
        "category",
        "isRequiredID",
      ],
      where: { slugName: id },
    });

    if (!product) {
      const response = { status: "05", message: "failed to get product data" };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const denom = await denomList.findAll({
      attributes: ["denomName", "amount", "productId"],
      where: { productId: product.id },
    });

    const paymentMethod = [
      { name: "LinkAja", id: "LA" },
      { name: "Gopay", id: "GOPAY" },
      { name: "Qris", id: "QRIS" },
    ];

    if (!denom) {
      const response = { status: "05", message: "failed to get denom data" };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const response = {
      responseCode: "00",
      message: "success",
      data: {
        ...product.dataValues,
        denomList: denom,
        paymentMethodList: paymentMethod,
      },
    };

    log_info(req.method, response);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    const response = { status: "99", message: error };
    log_error(req.method, response);
    res.status(500).send(response);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  createDenom,
  getDenomById,
  getProductDetail,
  getProductsByCategory,
  getProductBySlugName,
};
