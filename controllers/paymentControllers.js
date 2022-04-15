require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const qs = require("qs");
const payment = require("../models/Payment.model");
const { log_error, log_info } = require("../utils/log");
const {
  LINKAJA_INSTANCES,
  GENERATE_TOKEN,
} = require("../services/API_LinkAja");

const LinkAjaPay = async (req, res) => {
  const { amount, productId, trxId } = req.body;
  try {
    const trxStatus = "PENDING";
    const paymentMethod = "LINKAJA";

    const body = {
      terminalId: "test_linkaja_wco",
      userKey: "wcotest1090",
      password: "@wcotest12",
      signature: "wcotestsign",
      total: amount,
      successUrl: process.env.SUCCESS_URL,
      failedUrl: process.env.FAILED_URL,
      trxId: trxId,
    };

    const { data } = await LINKAJA_INSTANCES.post(
      GENERATE_TOKEN,
      qs.stringify(body),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!data.pgpToken) {
      const response = { status: "05", message: "failed to create payment" };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const payload = {
      trxStatus: trxStatus,
      paymentMethod: paymentMethod,
      productId: productId,
      amount: amount,
      trxId,
      WCORefnum: data.refNum,
    };

    const createPayment = await payment.create(payload);
    if (!createPayment) {
      const response = { status: "05", message: "failed to create payment" };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const response = {
      responseCode: "00",
      message: "success create payment",
      data: {
        trxStatus,
        amount: amount,
        id: createPayment.id,
        trxId: createPayment.trxId,
        ...data,
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

const getTransactionByTrxId = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await payment.findOne({
      where: { trxId: id },
    });
    if (!transaction) {
      const response = {
        status: "05",
        message: "failed to get transaction data",
      };
      log_error(req.method, response);
      res.status(500).send(response);
    }
    const response = {
      responseCode: "00",
      message: "success",
      data: transaction,
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

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const trxStatus = await payment.findOne({
      attributes: ["trxStatus"],
      where: { trxId: id },
    });

    if (!trxStatus) {
      const response = {
        status: "05",
        message: "failed to get transaction data",
      };
      log_error(req.method, response);
      res.status(200).send(response);
    }

    if (trxStatus.trxStatus === "SUCCESS") {
      const response = {
        status: "05",
        message: "transaction already completed",
      };
      log_error(req.method, response);
      res.status(500).send(response);
    }

    const transaction = await payment.update(
      { trxStatus: "SUCCESS" },
      {
        where: {
          trxId: id,
        },
      }
    );

    if (!transaction) {
      const response = {
        status: "05",
        message: "failed to update transaction data",
      };
      log_error(req.method, response);
      res.status(500).send(response);
    }
    const response = {
      responseCode: "00",
      message: "success",
      data: transaction,
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

module.exports = { LinkAjaPay, getTransactionByTrxId, updateTransaction };
