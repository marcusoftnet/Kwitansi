var config = require('../config')();
var dbWrap = require("./dbWrap.js");

module.exports.hospitalConfigs = dbWrap.getCollection(config.mongoUrl, "hospitalConfig");
module.exports.kwitansis = dbWrap.getCollection(config.mongoUrl, "kwitansi");
