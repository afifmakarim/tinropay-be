const axios = require("axios").default;
require("dotenv").config();

const LINKAJA_INSTANCES = axios.create({
  baseURL: process.env.LINKAJA_BASEURL,
  timeout: 30000,
});

const GENERATE_TOKEN = process.env.LINKAJA_GENERATE;
module.exports = { LINKAJA_INSTANCES, GENERATE_TOKEN };
