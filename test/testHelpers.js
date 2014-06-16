// var co = require("co");
// var config = require("../config")("local");
// var dbWrap = require("./lib/dbWrap.js");
// var hospitalConfigs = dbWrap.getCollection(config.mongoUrl, "hospitalConfig");
// var kwitansis = dbWrap.getCollection(config.mongoUrl, "kwitansi");

// module.exports.kwitansis = kwitansis;
// module.exports.hospitalConfigs = hospitalConfigs;

// module.exports.removeAllDocs = function(done){
// 	co(function *(){
// 		yield kwitansis.remove({});
// 		yield hospitalConfigs.remove({});
// 	})(done);
// };

// var app = require("../app.js");
// module.exports.request = require("supertest").agent(app.listen());

// module.exports.testUser = config.user;