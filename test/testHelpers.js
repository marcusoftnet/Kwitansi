var co = require("co");
var config = require('../config')('local');
var app = require("../app.js");

module.exports.request = require("supertest").agent(app.listen());
module.exports.testUser = config.user;

var db = require("../lib/db.js");
var hospitalConfigs = module.exports.hospitalConfigs = db.hospitalConfigs;
var kwitansis = module.exports.kwitansis = db.kwitansis;

module.exports.cleanDb = function(){
	co(function *(){
		yield hospitalConfigs.remove({});
		yield kwitansis.remove({});
	});
};

module.exports.insertTestConfig = function(name){
	co(function *(){
		yield hospitalConfigs.insert({
			"name" : name,
			"imageName" : name + ".jpg",
			"forPayments" : [
				"Pemeriksaan dan Pengobatan (RI)",
				"Pemeriksaan dan Pengobatan (Rj)",
				"Pemeriksaan laboratorium (RI)",
				"Pemeriksaan Laboratorium (Rj)",
				"Pemeriksaan Rontgen (RI)",
				"Pemeriksaan Rontgen (Rj)",
				"Honor Dokter (RI)",
				"Honor Dokter (RJ)"
			],
			"cashiers" : [ "Mj Christine", "Marcus", "Anton" ]
		});
	});
};