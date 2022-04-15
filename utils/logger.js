let winston = require("winston");
require("winston-daily-rotate-file");

let moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta");

let hostname = "TinroPay";

let transport = new winston.transports.DailyRotateFile({
  dirname: process.env.DIR_LOGS || "logs/log_sys",
  filename: "apps_" + hostname + "_%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "1m",
  maxFiles: "14d",
  level: "info",
  timestamp: () => moment().format("YYYY-MM-DDTHH:mm:ss:SSSZ"),
});

let logger = winston.createLogger({
  transports: [transport],
});

module.exports = logger;
