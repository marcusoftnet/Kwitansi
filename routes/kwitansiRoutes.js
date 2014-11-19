var parse = require("co-body");
var render = require("../lib/render.js");
var translateAmount = require("../lib/amountTranslator.js");
var formatRupiahs = require("../lib/formatRupiahs.js");
var utils = require("./utils.js");

var db = require("../lib/db.js");
var hospitalConfigs = db.hospitalConfigs;
var kwitansis = db.kwitansis;

module.exports.home = function *() {
	var pjson = require('../package.json');
	var vm = {
		version : pjson.version
	};
	vm.hospitals = yield hospitalConfigs.find({}, 'name');
	this.body = yield render("home.html", vm);
};

module.exports.showCreate = function *(hospital) {
	var vm = yield hospitalConfigs.findOne({name: hospital});
	vm.kwitansiDate = new Date().toISOString().slice(0,10);

	this.body = yield render("create.html", vm);
};

module.exports.printKwitansi = function *(hospital) {
	var postedData = yield parse(this);
	postedData.kwitansiDate = new Date();
	postedData.kwitansiNo = yield nextKwitansiNo(hospital);

	// Save to database
	yield kwitansis.insert(postedData);

	// Create viewmodel
	var kwitansiVm = postedData;
	kwitansiVm.hospitalName = hospital;
	kwitansiVm.imagePath = hospital + ".jpg"
	kwitansiVm.amountText = translateAmount(kwitansiVm.amount);
	kwitansiVm.amount = formatRupiahs(kwitansiVm.amount);
	kwitansiVm.kwitansiDate = utils.dateToYYMMDD(kwitansiVm.kwitansiDate);

	var vm = {
		hospitalName : hospital,
		copies : [kwitansiVm, kwitansiVm, kwitansiVm]
	};

	this.body = yield render("printKwitansi.html", vm);
};

function *nextKwitansiNo(name) {
	var highestKwitansi = yield kwitansis.findOne(
			{ hospitalName: name },
			{ sort : {kwitansiNo : -1 }});

	if(highestKwitansi === null)
		return 1;

	return parseInt(highestKwitansi.kwitansiNo) + 1;
};