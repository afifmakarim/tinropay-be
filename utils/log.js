const logger = require("../utils/logger");

let log_info = (appMethod, msg) => {
  let logTime = new Date();
  let messageLog = {
    logTime: logTime.toISOString(),
    appMethod,
    datas: msg,
  };

  logger.info(JSON.stringify(messageLog));
};

let log_error = (appMethod, msg) => {
  let logTime = new Date();
  let messageLog = {
    logTime: logTime.toISOString(),
    appMethod,
    datas: msg,
  };

  logger.error(JSON.stringify(messageLog));
};

module.exports = { log_info, log_error };
